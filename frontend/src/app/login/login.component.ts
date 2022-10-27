import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/global-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:any=FormBuilder;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userServices:UserService,
    private snackBarService:SnackbarService,
    private dialogRef:MatDialogRef<LoginComponent>,
    private ngxServices:NgxUiLoaderService) { }

    ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
        email:[null,[Validators.required,Validators.pattern(GlobalConstant.emailPattern)]],
        password:[null,[Validators.required,Validators.pattern(GlobalConstant.passwordPattern)]],
    });
  }
    
    onLoginClick() {
      this.ngxServices.start();
      var data:any = {
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
      }
      this.userServices.login(data).subscribe((response:any)=>{
        this.ngxServices.stop();
        this.dialogRef.close();
        localStorage.setItem('token',response.token);
        this.router.navigate(['/cafe/dahboard']);
      },(error:any)=>{
        this.ngxServices.stop();
        if(error.error.message){
          this.responseMessage = error.error.message;
        }
        else{
          this.responseMessage = GlobalConstant.genericErrorMessage;
        }
        this.snackBarService.openSnackBar(this.responseMessage,GlobalConstant.error);
      });
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}