import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constant';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm:any=FormGroup;
  responseMessage:any;

  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private dialogRef:MatDialogRef<SignupComponent>,
    private ngxservices:NgxUiLoaderService){ }
     
  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactRegex)]]
    })
  }

  handleSubmit(){
    this.ngxservices.start();
    var formData=this.signupForm.value;
    var data={
      name:formData.name,
      email:formData.email,
      password:formData.password,
      contactNumber:formData.contactNumber
    }
    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxservices.stop();
      this.responseMessage=response.message;
      this.snackbarService.openSnackBar(this.responseMessage,'success');
      this.dialogRef.close();
      this.router.navigate(['/']);
    }
    ,(error)=>{
      this.ngxservices.stop();
      if(error.error?.message){
        this.responseMessage=error.error.message;
      }
      else{
        this.responseMessage=GlobalConstants.genericError;
      }
      this.responseMessage=error.error.message;
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.genericError);
    }
    )
  }}