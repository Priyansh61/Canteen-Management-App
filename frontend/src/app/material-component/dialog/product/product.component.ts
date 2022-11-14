import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogRole, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  onDeleteProduct = new EventEmitter();

  productForm:any = FormGroup;
  dialogAction:any;
  action:any;
  responseMessage:any;
  public categoryList:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private productService:ProductService,
  public dialogRef:MatDialogRef<ProductComponent>,
  private categoryService:CategoryService,
  private snackBarService:SnackbarService) { }

  ngOnInit(): void {
    this.dialogAction = this.dialogData.action;
    this.getCategory();
    this.productForm = this.formBuilder.group({
      name:[null,[Validators.required]],
      categoryId:[null,[Validators.required]],
      description:[null,[Validators.required]],
      price:[null,[Validators.required]]

    });

    if (this.dialogAction == 'Edit') {
      this.productForm.patchValue(this.dialogData.data);
      this.dialogAction = 'Edit';
      this.action = 'Update';
    } else if (this.dialogAction == 'Add') {
      this.productForm.patchValue(this.dialogData.data);
      this.dialogAction = 'Add';
      this.action = 'Save';
    } 
    else {
      this.dialogAction = 'Delete';
      this.action = 'Delete';
    }
  }

  onSubmit(){
    console.log("on submit");
    console.log(this.dialogAction)
    if (this.dialogAction == 'Add') {
      this.addProduct();
    } else if(this.dialogAction == 'Edit') {
      this.editProduct();
    }
    else {
      this.deleteProduct();
    }
  }


  getCategory(){
    this.categoryService.getCategory().subscribe((res:any)=>{
      this.categoryList = res;
    },(error:any)=>{
      if(error.error.message){
        this.responseMessage = error.error.message;
      }else{
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackBarService.openSnackbar(this.responseMessage,'error',2000);
    })
  }

  addProduct(){
    var formData=this.productForm.value;
    var data = {
      name:formData.name,
      category_id:formData.categoryId,
      description:formData.description,
      price:formData.price
    }
    this.productService.addProduct(data).subscribe((res:any)=>{
      this.responseMessage=res.message;
      this.snackBarService.openSnackbar(this.responseMessage,'success',2000);
      this.onAddProduct.emit();
      this.dialogRef.close();
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error.message;
      }else{
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackBarService.openSnackbar(this.responseMessage,'error',2000);
    });
  }

  editProduct(){
    var formData=this.productForm.value;
    console.log(formData.categoryId);
    console.log(formData.name);
    console.log(formData.description);
    console.log(formData.price);
    console.log(this.dialogData.data.id);
    var data = {
      id: this.dialogData.data.id,
      name:formData.name,
      category_id:formData.categoryId,
      description:formData.description,
      price:formData.price
    
    }
    this.productService.updateProduct(data).subscribe((res:any)=>{
      this.responseMessage=res.message;
      this.snackBarService.openSnackbar(this.responseMessage,'success',2000);
      this.onEditProduct.emit();
      this.dialogRef.close();
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error.message;
      }else{
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackBarService.openSnackbar(this.responseMessage,'error',2000);
    });
  }

  deleteProduct(){
    console.log('hello');
    this.productService.deleteProduct(this.dialogData.data.id).subscribe((res:any)=>{
      this.responseMessage=res.message;
      this.snackBarService.openSnackbar(this.responseMessage,'success',2000);
      this.onDeleteProduct.emit();
      this.dialogRef.close();
    },(error:any)=>{
      if(error.error?.message){
        this.responseMessage = error.error.message;
      }else{
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackBarService.openSnackbar(this.responseMessage,'error',2000);
    });
  }
}
