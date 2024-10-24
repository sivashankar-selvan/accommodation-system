import { Component, OnInit } from '@angular/core';
import { BookingHistory, DailyMeal, FoodPreferenceDto } from 'src/app/services/models';
import { BookingControllerService, DailyMealControllerService, FoodPreferenceControllerService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-employee-bookings',
  templateUrl: './employee-bookings.component.html',
  styleUrls: ['./employee-bookings.component.css']
})
export class EmployeeBookingsComponent implements OnInit {

  bookingHistory: BookingHistory[] = [];
  mealOptions = [
    { title: 'Breakfast', options: '', selected: false },
    { title: 'Lunch', options: '', selected: false },
    { title: 'Dinner', options: '', selected: false }
  ];
  mealPreferences = '';
  isSaved = false;
  mealBookingDate = new Date();
  showPopup = false;
  username:string = "";
  localStorageKey = 'mealBookingData';
  constructor(
    private bookingService: BookingControllerService,
    private dailyMealService: DailyMealControllerService,
    private foodPreferenceService: FoodPreferenceControllerService,
    private authService: TokenService
  ) { }

  ngOnInit() {
    this.findBooking();
    this.clearMealDataAt6PM();
    this.mealBookingDate.setDate(this.mealBookingDate.getDate() + 1); // Setting tomorrow's date
    this.loadDailyMeals();
    this.username = this.authService.userName
    // Load saved meal data from localStorage on initialization
    this.loadMealBookingFromLocalStorage();
  }

  private findBooking() {
    this.bookingService.getBookingHistory()
      .subscribe({
        next: (res) => {
          this.bookingHistory = res.filter(booking => booking.roomNumber);  // Filter for bookings with roomNumber
        },
        error: (err) => {
          console.error("Error fetching booking history", err);
        }
      });
  }

  private loadDailyMeals() {
    this.dailyMealService.getMeal()
      .subscribe({
        next: (res: DailyMeal) => {
          this.mealOptions = [
            { title: 'Breakfast', options: res.breakfast || '', selected: false },
            { title: 'Lunch', options: res.lunch || '', selected: false },
            { title: 'Dinner', options: res.dinner || '', selected: false }
          ];
        },
        error: (err) => {
          console.error("Error fetching daily meal options", err);
        }
      });
  }

  isMealBookingAllowed(booking: BookingHistory) {
    const today = new Date();
    const checkInDate = booking.checkInDate ? new Date(booking.checkInDate) : null;
    const checkOutDate = booking.checkOutDate ? new Date(booking.checkOutDate) : null;

    return checkInDate && checkOutDate ? this.mealBookingDate >= checkInDate && this.mealBookingDate <= checkOutDate : false;
  }

  openSavePopup() {
    this.showPopup = true;
  }

  confirmSave() {
    this.showPopup = false;
    this.saveMealBooking();
  }

  cancelSave() {
    this.showPopup = false;
  }

  saveMealBooking() {
    if (!this.isSaved) {
      const foodPreference: FoodPreferenceDto = {
        breakfast: this.mealOptions[0].selected,
        lunch: this.mealOptions[1].selected,
        dinner: this.mealOptions[2].selected,
        preferences: this.mealPreferences,
        mealDate: this.mealBookingDate.toISOString()
      };

      this.foodPreferenceService.createFoodPreference({ body: foodPreference })
        .subscribe({
          next: (res) => {
            this.isSaved = true;
            console.log("Meal booking saved:", res);

            // Save meal booking data to localStorage
            this.saveMealBookingToLocalStorage();
          },
          error: (err) => {
            console.error("Error saving meal booking", err);
          }
        });
    }
  }

  private saveMealBookingToLocalStorage() {
    const mealBookingData = {
      mealOptions: this.mealOptions,
      mealPreferences: this.mealPreferences,
      isSaved: this.isSaved,
      mealBookingDate: this.mealBookingDate
    };
    localStorage.setItem(this.localStorageKey, JSON.stringify(mealBookingData));
  }

  private loadMealBookingFromLocalStorage() {
    const savedData = localStorage.getItem(this.localStorageKey);
    if (savedData) {
      const mealBookingData = JSON.parse(savedData);
      this.mealOptions = mealBookingData.mealOptions;
      this.mealPreferences = mealBookingData.mealPreferences;
      this.isSaved = mealBookingData.isSaved;
      this.mealBookingDate = new Date(mealBookingData.mealBookingDate);
    }
  }

  clearMealDataAt6PM() {
    const now = new Date();
    const sixPM = new Date();
    sixPM.setHours(18, 0, 0, 0); // Setting 6 PM time

    if (now >= sixPM) {
      this.clearMealSelections();
      this.mealBookingDate.setDate(this.mealBookingDate.getDate() + 1);
    }

    setTimeout(() => {
      this.clearMealSelections();
    }, sixPM.getTime() - now.getTime()); // Time left until 6 PM
  }

  clearMealSelections() {
    this.mealOptions.forEach(option => option.selected = false);
    this.mealPreferences = '';
    this.isSaved = false;

    // Clear localStorage data after 6 PM
    localStorage.removeItem(this.localStorageKey);

    console.log("Meal selections cleared for the next day.");
  }
}
