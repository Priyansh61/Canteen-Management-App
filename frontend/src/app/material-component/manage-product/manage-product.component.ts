import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'price', 'action'];

  dataSource : any;

  responseMessage:any;

  constructor(private productService:ProductService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackBarService:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.productService.getProduct().subscribe((res:any)=>{
      this.dataSource = res;
      this.ngxService.stop();
    },(error:any)=>{
      this.ngxService.stop();
      if(error.error.message){
        this.responseMessage = error.error.message;
      }else{
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackBarService.openSnackbar(this.responseMessage,'error',2000);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  AddProduct(){
    // const dialogRef=this.dialog.open(AddProductComponent);
    // this.router.events.subscribe((res)=>{
    //   dialogRef.close();
    // });
  }

  EditProduct(element:any){
    // const dialogRef=this.dialog.open(EditProductComponent,{
    //   data:element
    // });
    // this.router.events.subscribe((res)=>{
    //   dialogRef.close();
    // });
  }

  DeleteProduct(element:any){
    // const dialogRef=this.dialog.open(DeleteProductComponent,{
    //   data:element
    // });
    // this.router.events.subscribe((res)=>{
    //   dialogRef.close();
    // });
  }

  onChangeStatus(element:any,id:any){
    // const dialogRef=this.dialog.open(ChangeStatusComponent,{
    //   data:element
    // });
    // this.router.events.subscribe((    // const dialogRef=this.dialog.open(ChangeStatusComponent,{
    //   data:element
    // });
    // this.router.events.subscribe((res)=>{
    //   dialogRef.close();
    // });res)=>{
    //   dialogRef.close();
    // });
  }





}
