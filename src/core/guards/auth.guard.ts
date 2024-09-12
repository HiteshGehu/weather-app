import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLogin = localStorage.getItem('token') === 'true'; // Check if the token is explicitly 'true'

  if (isLogin) {
    return true; // User is logged in, allow navigation
  }

  router.navigate(['/']); // User not logged in, redirect to home
  return false;
};

export default authGuard;
