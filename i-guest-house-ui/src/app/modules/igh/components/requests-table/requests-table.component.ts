import { Component, OnInit } from '@angular/core';
import { BookingControllerService } from 'src/app/services/services';
import { BookingRequest } from 'src/app/services/models';

@Component({
  selector: 'app-requests-table',
  templateUrl: './requests-table.component.html',
  styleUrls: ['./requests-table.component.css']
})
export class RequestsTableComponent implements OnInit{

  requestedRooms: BookingRequest[] = [];

  constructor(private bookingService: BookingControllerService) {}

  ngOnInit(): void {
    this.getRequestedRooms();
  }

  getRequestedRooms() {
    this.bookingService.getBookingsOfHr().subscribe(
      (data: BookingRequest[]) => {
        this.requestedRooms = data;
      },
      (error) => {
        console.error('Error fetching room requests:', error);
      }
    );
  }
}
