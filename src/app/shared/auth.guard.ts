import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {

  if(localStorage.getItem("token") != null){
    return true;
  }
  
  return false;
};
