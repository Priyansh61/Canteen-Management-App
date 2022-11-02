import { Component, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responseMessage: any;
	data:any;

	ngAfterViewInit() { }

	constructor( private dashboardService: DashboardService,
		private ngservice: NgxUiLoaderService,
		private snackbarService: SnackbarService )
		{
			this.ngservice.start();
			this.dashboardData();
		}

	dashboardData() {
		this.dashboardService.getDetails().subscribe(
			(data: any) => {
				this.data = data;
				this.ngservice.stop();
			},(error: any) => {
				this.ngservice.stop();
				this.snackbarService.openSnackbar(error.error.message, 'error',2000);
		}
	);
	}
}