import { CanActivateFn } from '@angular/router';

export const sharedGuard: CanActivateFn = (route, state) => {
  return true;
};
