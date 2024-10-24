import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/room/room.service';

@Component({
  selector: 'app-popup-furniture',
  templateUrl: './popup-furniture.component.html',
  styleUrls: ['./popup-furniture.component.css']
})
export class PopupFurnitureComponent implements OnInit {

  @Input() room:any;
  isPopupVisible: boolean = false;
  roomId: any;
  furniture: string='';
  furnitureList: string[] = [];

  hardFurnitureList:string[]=["TV","Fridge","Microwave","AC","Sofa","Desk"];

  showAllFurnitureList:string[]=[];

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
   
   
  
  }

  openPopup(room:any){
    this.furnitureList = this.room.furniture.split(',');
    
    this.furnitureList = this.furnitureList.map(str => str.trim());
    this.showAllFurnitureList = this.hardFurnitureList.filter((item:any) => !this.furnitureList.includes(item));
    

    this.isPopupVisible =  true;

  }

  closePopup() {
    this.isPopupVisible = false;
  }

  updateFurniture() {
    this.roomService.updateRoomFurniture(this.room.roomNumber, this.furnitureList);
    this.isPopupVisible = false;
  }

  ngOnChanges() {
    if (this.furniture) {
      this.furnitureList = this.furniture.split(',').map(item => item.trim());
    }
  }

  onClickFurniture(val: any) {
      this.showAllFurnitureList = this.showAllFurnitureList.filter((e:any)=> e != val)
      this.furnitureList.push(val);
    
  }

  onClickAdd(){
    this.updateFurniture()
    this.closePopup()
  }


  onClickAddedFurnitureCross(fur:any){
    this.furnitureList = this.furnitureList.filter((furniture:any)=> fur!=furniture)
    this.showAllFurnitureList.push(fur)

  }

  filteredRequests() {
    if (!this.furniture) {
      return this.showAllFurnitureList;
    }
    return this.showAllFurnitureList.filter(request =>
      request.toLowerCase().includes(this.furniture.toLowerCase())
    );
  }

}
