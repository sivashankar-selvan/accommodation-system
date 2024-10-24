import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  @Input() room: any;
  @Input() selectedFloor:any;
  @Input() selectedTower:any;

  ngOnInit(): void {
    
  }

  removeRoom(room:any){

  }

}
