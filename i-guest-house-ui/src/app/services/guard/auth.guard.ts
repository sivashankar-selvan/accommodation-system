import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../token/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const tokenService: TokenService = inject(TokenService);
  const router: Router = inject(Router);
  if (tokenService.isTokenValid()) {
    const roles = tokenService.userRoles;
    // Redirect based on role
    if (roles.includes('ADMIN')) {
      router.navigate(['/admin']);
    } else if (roles.includes('HR')) {
      router.navigate(['/igh/hr']);
    } else if (roles.includes('EMPLOYEE')) {
      router.navigate(['/igh/employee']);
    }

    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
