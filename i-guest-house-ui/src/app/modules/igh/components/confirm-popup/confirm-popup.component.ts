import { Component, Input } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';


@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent {

  constructor(private roomService: RoomService) { }

  @Input() room:any;

  isPopupVisible:any = false;

 openConfirmPopup(){
  this.isPopupVisible=true;

 }

//  you have to handle the employees staying there
 onConfirmDelete(){
  this.roomService.deleteRoom(this.room.id)
  this.isPopupVisible = false;

 }

 closePopup(){
  this.isPopupVisible=false;
 }

}
