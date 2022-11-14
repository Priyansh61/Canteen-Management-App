import { Component, OnInit } from '@angular/core';
import { MatDialog, matDialogAnimations, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { element } from 'protractor';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstant } from 'src/app/shared/global-constant';
import { CategoryComponent } from '../dialog/category/category.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProductComponent } from '../dialog/product/product.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description','category', 'price', 'action'];

  dataSource: any;

  responseMessage: any;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  statusCheck(element: any) {
    if (element.status == 1) {
      return true;
    }
    return false;
  }

  tableData() {
    this.productService.getProduct().subscribe((res: any) => {
      this.ngxService.stop();
      this.dataSource = res;
    }, (error: any) => {
      if (error.error?.message) {
        this.responseMessage = error.error.message;
      } else {
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackBarService.openSnackbar(this.responseMessage, 'error', 2000);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  AddProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    }
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe((res) => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onAddProduct.subscribe((res: any) => {
      this.tableData();
    });



  }

  EditProduct(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: element
    }
    dialogConfig.width = '890px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);

    // This is used to close the dialog when the navigation starts
    this.router.events.subscribe((res) => {
      dialogRef.close();
    });

    const sub = dialogRef.componentInstance.onEditProduct.subscribe((res: any) => {
      this.tableData();
    });
  }

  DeleteProduct(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Delete',
      data: element
    }
    dialogConfig.width = '500px';
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);

    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res: any) => {
      console.log(element.id)
      this.ngxService.start();
      this.productService.deleteProduct(element.id).subscribe((res: any) => {
        this.ngxService.stop();
        this.snackBarService.openSnackbar(res.message, 'success', 2000);
        this.tableData();
      }, (error: any) => {
        if (error.error?.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = GlobalConstant.genericErrorMessage;
        }
        this.snackBarService.openSnackbar(this.responseMessage, 'error', 2000);
      });
      dialogRef.close();
    });

  }

  onChangeStatus(element: any, id: any) {
    console.log(element)
    var status;
    if (element) {
      status = 1;
    }
    else {
      status = 0;
    }
    var data = {
      status: status,
      id: id
    }
    this.ngxService.start();
    this.productService.updateProductStatus(data).subscribe((res: any) => {
      this.ngxService.stop();
      this.snackBarService.openSnackbar(res.message, 'success', 2000);
      this.tableData();
    }, (error: any) => {
      if (error.error?.message) {
        this.responseMessage = error.error.message;
      } else {
        this.responseMessage = GlobalConstant.genericErrorMessage;
      }
      this.snackBarService.openSnackbar(this.responseMessage, 'error', 2000);
    });
  }
}






