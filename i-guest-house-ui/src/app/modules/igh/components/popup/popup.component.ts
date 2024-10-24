import { Component, Input } from '@angular/core';
import { BookingControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  isPopupVisible: boolean = false;
  searchTerm: string = '';
  addedEmpArr: any[] = [];
  selectedRoom: any;
  showEmpCountExceedError: boolean = false;
  tempArr: any[] = [];
  alreadyLiving: any[] = [];
  customerRequests: any[] = []; // Employee booking requests

  @Input() room: any;

  constructor(
    private bookingService: BookingControllerService
  ) { }

openPopup(room: any) {
  this.selectedRoom = room;
  this.tempArr = room.employees || [];

  this.bookingService.getBookingRequestsByRoomType({ roomType: room?.roomType || 'N/A' }).subscribe(
    (requests: any[]) => {
      this.customerRequests = requests
        .filter(request => request.roomNumber === null || request.roomNumber === undefined)
        .map(request => ({
          id: request.bookingId,
          name: request.userName,
          checkin: request.checkInDate,
          checkout: request.checkOutDate
        }));
    },
    (error) => {
      console.error('Error fetching employee requests', error);
    }
  );

  this.isPopupVisible = true;
}

  closePopup() {
    this.isPopupVisible = false;
  }

  
  filteredRequests() {
    if (!this.searchTerm) {
      return this.customerRequests;
    }
    return this.customerRequests.filter(request =>
      request.id.toString().includes(this.searchTerm.toLowerCase())
    );
  }

  
  onClickEmployee(val: any) {
    if (this.tempArr.length < this.selectedRoom?.roomCapacity) {
      this.customerRequests = this.customerRequests.filter((emp: any) => val.id !== emp.id);
      this.tempArr.push(val);
    } else {
      this.showEmpCountExceedError = true;
    }
  }

  // Remove an employee from the temporary list
  onClickAddedEmployeeCross(val: any) {
    this.tempArr = this.tempArr.filter((emp: any) => emp.id !== val.id);
    this.customerRequests.push(val);

    if (this.tempArr.length < this.selectedRoom?.roomCapacity) {
      this.showEmpCountExceedError = false;
    }
  }

updateEmployees() {
  const updateRequests = this.tempArr.map(emp => ({
    bookingId: emp.id, 
    roomId: this.selectedRoom?.roomId || 0 
  }));

  const params = {
    body: updateRequests 
  };

  return this.bookingService.updateRoomNumber(params);
}

  onClickAdd() {
    const updateEmployeesObservable = this.updateEmployees();
  
    if (updateEmployeesObservable) {
      updateEmployeesObservable.subscribe({
        next: () => {
          console.log('Room employees updated successfully');
          alert('Room employees updated successfully')
          this.closePopup(); // Close popup after successful update
        },
        error: (err: any) => {
          console.error('Error updating room employees', err);
        }
      });
    } else {
      console.error('Failed to update employees - No observable returned');
    }
  }
}
