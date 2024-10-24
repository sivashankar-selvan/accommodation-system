import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  @Input() brandName: string = 'YourBrand';
  @Input() navItems: { label: string, link: string }[] = [];
  ngOnInit(): void {
    
  }
  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }
}
