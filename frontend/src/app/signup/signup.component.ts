import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import { GlobalConstant } from '../shared/global-constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:any=FormBuilder;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userServices:UserService,
    private snackBarService:SnackbarService,
    private dialogRef:MatDialogConfig<SignupComponent>,
    private ngxServices:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[null,Validators.required,Validators.pattern(GlobalConstant.namePattern)],
      email:[null,Validators.required,Validators.pattern(GlobalConstant.emailPattern)],
      password:[null,Validators.required,Validators.pattern(GlobalConstant.passwordPattern)],
      contactNumber:[null,Validators.required,Validators.pattern(GlobalConstant.contactNumberPattern)]
  });
}
  handleSubmit(){
    this.ngxServices.start();
    var data:any = {
      name:this.signupForm.value.name,
      email:this.signupForm.value.email,
      password:this.signupForm.value.password,
      contactNumber:this.signupForm.value.contactNumber
    }
    this.userServices.signup(data).subscribe((response:any)=>{
      this.ngxServices.stop();
      this.snackBarService.openSnackbar(response.message,GlobalConstant.genericSuccessMessage,2000);
      this.router.navigate(['/']); 
    },(error:any)=>{
      this.ngxServices.stop();
      this.responseMessage = error.error.message;
      this.snackBarService.openSnackbar(this.responseMessage,GlobalConstant.genericErrorMessage,2000);
    });
  }
}
