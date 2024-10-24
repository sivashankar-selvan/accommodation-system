import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthenticationControllerService } from 'src/app/services/services';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {email: "", password: ""};
  errorMsg: string = ""

  constructor(
    private router: Router,
    private authService: AuthenticationControllerService,
    private tokenService: TokenService
  ){}

  login() {
    this.errorMsg = "";
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        const roles = this.tokenService.userRoles;
        console.log('Full response:', res);

        // Redirect based on role
        if (roles.includes('ROLE_HR')) {
          this.router.navigate(['/igh/hr']);
        } else if (roles.includes('ROLE_EMPLOYEE')) {
          this.router.navigate(['/igh/employee']);
        } else if (roles.includes('ROLE_MANAGER')) {
          this.router.navigate(['/igh/manager']);
        }
      },
      error: (err) => {
        console.error('Error response:', err);
        this.errorMsg = "Incorrect Password or User doesn't exist";
      }
    });
  }
}