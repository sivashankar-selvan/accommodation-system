// import { Component } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-add-room-popup',
  templateUrl: './add-room-popup.component.html',
  styleUrls: ['./add-room-popup.component.css']
})
export class AddRoomPopupComponent implements OnInit {
 

  @Input() room:any;
  roomForm:FormGroup = new FormGroup({}) ;

  isPopupVisible:boolean =false;

  

  constructor() { }

  ngOnInit(): void {
    this.roomForm = new FormGroup({
      id: new FormControl('', Validators.required),
      roomNumber: new FormControl('', Validators.required),
      roomType: new FormControl('', Validators.required),
      bedCount: new FormControl('', Validators.required),
      acAvailability: new FormControl('', Validators.required),
      employeeCount: new FormControl('', Validators.required),
      tower: new FormControl('', Validators.required),
      floor: new FormControl('', Validators.required),
      employees: new FormArray([]),
      furniture: new FormControl('')
    });
  }

  get employees(): FormArray {
    return this.roomForm.get('employees') as FormArray;
  }

  addEmployee(): void {
    this.employees.push(new FormGroup({
      bookedDate: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      checkin: new FormControl('', Validators.required),
      checkout: new FormControl('', Validators.required),
      bookId: new FormControl('', Validators.required),
      roomType: new FormControl('', Validators.required)
    }));
  }

  removeEmployee(index: number): void {
    this.employees.removeAt(index);
  }

  onSubmit(): void {
    if (this.roomForm.valid) {
      console.log(this.roomForm.value);
    } else {
      console.log('Form is invalid');
    }
  }



  closePopup(){
    this.isPopupVisible =false

  }

  openPopup(){
    this.isPopupVisible = true;
  }
}


