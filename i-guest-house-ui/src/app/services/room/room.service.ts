import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BookingControllerService, RoomControllerService } from '../services';
import { Room } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private roomsSource = new BehaviorSubject<any[]>([])
  rooms$ = this.roomsSource.asObservable()

  constructor(
    private roomService: RoomControllerService,
    private bookingService: BookingControllerService
  ) {
    // const roomsData = room
    // this.roomsSource.next(roomsData)
    this.fetchRooms();
  }

  fetchRooms(): void {
    this.roomService.getAllRooms().subscribe((rooms: Room[]) => {
      this.roomsSource.next(rooms);
    }, error => {
      console.error("Error fetching rooms", error);
    });
  }

  updateRoomEmployees(roomId: any, employees: any[]): any {
    const roomsData = this.roomsSource.getValue();
    const room = roomsData.find((r: Room) => r.roomId === roomId); // Make sure to compare `roomId` correctly
    if (room) {
      room.employees = employees; // Update employees locally
  
      // Call backend to update room employees and return the observable
      return this.roomService.updateRoom({ id: roomId, body: room }).pipe(
        tap(() => {
          this.roomsSource.next(roomsData); // Update local BehaviorSubject after successful backend update
        })
      );
    }
    return null; // Return null if room is not found
  }
  

  updateRoomFurniture(roomId: any, furniture: string[]): void {
    const roomsData = this.roomsSource.getValue();
    const room = roomsData.find((r: Room) => r.roomNumber === roomId);
    if (room) {
      console.log("found the room");
      room.furniture = furniture.join(','); // Update furniture locally

      // Call backend to update room furniture
      this.roomService.updateRoom({ id: roomId, body: room }).subscribe(updatedRoom => {
        this.roomsSource.next(roomsData); // Update local BehaviorSubject
      }, error => {
        console.error("Error updating room furniture", error);
      });
    }
  }



  deleteRoom(roomId: any): void {
    console.log("inside service - deleting room");
    
    // Call backend to delete room
    this.roomService.deleteRoom({ id: roomId }).subscribe(() => {
      const roomsData = this.roomsSource.getValue();
      const updatedRoomsData = roomsData.filter((r: Room) => r.roomId !== roomId);
      
      // Check if any room was actually removed
      if (roomsData.length !== updatedRoomsData.length) {
        console.log("room deleted");
        this.roomsSource.next(updatedRoomsData); // Update local BehaviorSubject
      } else {
        console.log("room not found");
      }
    }, error => {
      console.error("Error deleting room", error);
    });
  }

  getBookingRequestsByRoomType(roomType: string) {
    return this.bookingService.getBookingRequestsByRoomType({ roomType });
  }
}
