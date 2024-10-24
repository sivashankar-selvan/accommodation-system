import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  roomsData: any[] = [];
  originalRoomsData: any[] = []; // Store original data to avoid mutation
  selectedFloor: string = 'all';
  selectedTower: string = 'all';

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    // Subscribe to the room data from the service
    this.roomService.rooms$.subscribe(rooms => {
      this.roomsData = rooms;
      this.originalRoomsData = rooms; // Keep original data intact
    });

    this.selectedFloor = 'all';
    this.selectedTower = 'all';
  }

  // Filtering logic based on selected floor and tower
  onClickSortFloorAndTower() {
    this.roomsData = this.originalRoomsData.filter(room => {
      const matchesFloor = this.selectedFloor === 'all' || room.floor === parseInt(this.selectedFloor);
      const matchesTower = this.selectedTower === 'all' || room.tower === parseInt(this.selectedTower);
      return matchesFloor && matchesTower;
    });
  }
}
