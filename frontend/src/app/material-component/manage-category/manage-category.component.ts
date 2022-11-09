import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstant } from 'src/app/shared/global-constant';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'action'];
  dataSource:any;
  responseMessage:any;

  constructor(private categoryService:CategoryService,
    private dialog:MatDialog,
    private ngxService:NgxUiLoaderService,
    private snackBar:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.categoryService.getCategory().subscribe((res:any)=>{
      this.dataSource = res;
      this.ngxService.stop();
    },(error:any)=>{
      this.ngxService.stop();
      if(error.errror.message){
        this.responseMessage = error.error.message;
      }else{
        this.responseMessage = error.message;
      }
      this.snackBar.openSnackbar(this.responseMessage,GlobalConstant.error,2000);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  AddCategory(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Add',
    }
    const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe((res)=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddCategory.subscribe((response)=>{
      this.tableData();
    });
  }




  EditCategory(element:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Edit',
      id:element.id,
    }
    const dialogRef=this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe((res)=>{
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditCategory.subscribe((response)=>{
      this.tableData();
    });


  }

  DeleteCategory(){
  }

}
