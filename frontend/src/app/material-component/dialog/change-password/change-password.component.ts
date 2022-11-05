import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxUiLoaderComponent } from 'ngx-ui-loader/lib/core/ngx-ui-loader.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm:any =FormGroup;
  responseMessage:any;


  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    public dialogRef:MatDialogRef<ChangePasswordComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService)
    { }

  ngOnInit(): void {
    this.changePasswordForm=this.formBuilder.group({
      oldPassword:[null,[Validators.required,Validators.pattern(GlobalConstant.passwordPattern)]],
      newPassword:[null,[Validators.required,Validators.pattern(GlobalConstant.passwordPattern)]],
      confirmPassword:[null,[Validators.required,Validators.pattern(GlobalConstant.passwordPattern)]],
    })
  }

  checkPassword():boolean{
    if(this.changePasswordForm.value.newPassword!=this.changePasswordForm.value.confirmPassword){
      this.responseMessage="Password does not match";
      return true;
    }
    else{
      this.responseMessage="";
      return false;
    }
  }

  submitChangePassword(){
    if(this.checkPassword()){
      this.ngxService.start();
      this.userService.changePassword(this.changePasswordForm.value).subscribe((response:any)=>{
        this.ngxService.stop();
        this.snackbarService.openSnackbar(response.message,'success',3000);
        this.dialogRef.close();
      },(error:any)=>{
        this.ngxService.stop();
        if(error.error.message){
          this.snackbarService.openSnackbar(error.error.message,'error',3000);
        }
        else{
          this.snackbarService.openSnackbar(GlobalConstant.genericErrorMessage,'error',3000);
        }
        
      });
    }
    else {
      this.snackbarService.openSnackbar("Password does not match",'error',3000);
    }
  }


}
