import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BookingRequest } from 'src/app/services/models';
import { BookingControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-hr-request-form',
  templateUrl: './hr-request-form.component.html',
  styleUrls: ['./hr-request-form.component.css']
})
export class HrRequestFormComponent implements OnInit{
  bookingForm!: FormGroup;
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private requestSubmitService: BookingControllerService
  ) {
    this.minDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
  }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      rows: this.fb.array([this.createBookingRow()])
    });
  }

  get rows(): FormArray {
    return this.bookingForm.get('rows') as FormArray;
  }

  createBookingRow(): FormGroup {
    return this.fb.group({
      guestName: ['', Validators.required],
      bookedToId: ['', Validators.required],
      roomType: ['', Validators.required],
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    },{ validators: this.checkDateValidator });
  }

  checkDateValidator(group: AbstractControl): { [key: string]: any } | null {
    const checkInDate = group.get('checkInDate')?.value;
    const checkOutDate = group.get('checkOutDate')?.value;

    if (checkInDate && checkOutDate && new Date(checkOutDate) < new Date(checkInDate)) {
      return { checkOutDateInvalid: true };  // Return an error object
    }
    return null;  // No error
  }


  addRow() {
    if (this.rows.length < 10) {
      this.rows.push(this.createBookingRow());
    }
  }

  removeRow(index: number) {
    if (this.rows.length > 1) {
      this.rows.removeAt(index);
    }
  }

  submitRequest() {
    if (this.bookingForm.valid) {
      const bookingData = this.rows.value.map((row: BookingRequest) => ({
        guestName: row.guestName,
        bookedToId: row.bookedToId,
        roomType: row.roomType,
        checkInDate: row.checkInDate,
        checkOutDate: row.checkOutDate
      }));
      this.requestSubmitService.createBookingRequest({body: bookingData}).subscribe(
        response => {
          alert('Request submitted successfully!');
          this.bookingForm.reset();
          while (this.rows.length !== 1) {
            this.rows.removeAt(0);
          }
        },
        error => {
          alert('An error occurred while submitting the request.');
          console.error(error);
        }
      );
    } else if (this.bookingForm.hasError('checkOutDateInvalid')) {
      alert('Check-out date cannot be earlier than check-in date.');
    } else {
      alert('Please enter valid details');
    }
  }
}
