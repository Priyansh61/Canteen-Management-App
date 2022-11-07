import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode';
import { GlobalConstant } from '../shared/global-constant';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private auth:AuthService,
    private router:Router,
    private snackbarService:SnackbarService) { }


  canActivate(route:ActivatedRouteSnapshot):boolean{
    let expectedRoleArray= route.data;
    expectedRoleArray=expectedRoleArray.expectedRole;

    const token:any=localStorage.getItem('token');
    var token_payload:any;


    try{
      token_payload=jwt_decode(token);
    }
    catch(err){
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let checkRole:boolean=false;

    for(let i=0;i<expectedRoleArray.length;i++){
      if(token_payload.role==expectedRoleArray[i]){
        checkRole=true;
        break;
      }
    }

    // When user is not logged in
    if(!this.auth.isAuthenticated()){
      this.snackbarService.openSnackbar(GlobalConstant.loginAgainMessage,'OK',3000);
      this.router.navigate(['/']);
      return false;
    }
    // When user is logged in but not authorized
    else if(!checkRole){
      this.snackbarService.openSnackbar(GlobalConstant.unauthorizedErrorMessage,'OK',3000);
      this.router.navigate(['/canteen/dashboard']);
      return false;
    }
    // When user is logged in and authorized
    else{
      return true;
    }
  }
}
