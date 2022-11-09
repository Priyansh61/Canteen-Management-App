import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();

  categoryForm :any = FormGroup;
  dialogAction :String ="Add";
  action :String = "Add";

  respnseMessage :any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private categoryService:CategoryService,
  public dialogRef:MatDialogRef<CategoryComponent>,
  private snackBarService:SnackbarService) { }

  ngOnInit(): void {
    console.log(this.dialogData)
    this.categoryForm=this.formBuilder.group({
      name:[null,[Validators.required]]
    });

    if (this.dialogData.action=='Edit') {
      this.dialogAction="Edit";
      this.action="Update";
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  onSubmit() {
    if (this.dialogData.action=='Add') {
      this.addCategory();
    }else{
      this.editCategory();
    }
  }

  addCategory(){
    var FormData = this.categoryForm.value;
    this.categoryService.addCategory(FormData).subscribe(
      (response:any)=>{
        this.respnseMessage=response.message;
        this.snackBarService.openSnackbar(this.respnseMessage,'success',3000);
        this.onAddCategory.emit();
        this.dialogRef.close();
      },(error)=>{
        if(error.error.message){
          this.respnseMessage=error.error.message;
          this.snackBarService.openSnackbar(this.respnseMessage,'error',3000);
        }
        else {
          this.snackBarService.openSnackbar(GlobalConstant.genericErrorMessage,'error',3000);
        }
      });
    }

  editCategory(){
    console.log("call")
    var formData = this.categoryForm.value;
    console.log(this.dialogData.id);
    formData.id = this.dialogData.id;
    console.log(formData);
    this.categoryService.updateCategory(formData).subscribe(
      (response:any)=>{
        this.respnseMessage=response.message;
        this.snackBarService.openSnackbar(this.respnseMessage,'error',3000);
        this.onEditCategory.emit();
        this.dialogRef.close();
      },(error)=>{
        if(error.error.message){
          this.respnseMessage=error.error.message;
          this.snackBarService.openSnackbar(this.respnseMessage,'error',3000);
        }
        else {
          this.snackBarService.openSnackbar(GlobalConstant.genericErrorMessage,'error',3000);
        }
      });
  }
}
