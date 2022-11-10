import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  addProduct(data:any){
    return this.httpClient.post(this.url+'product/add',data,{
      headers:{
        'Content-Type':'application/json'
    }
    })
  }

  updateProduct(data:any){
    return this.httpClient.patch(this.url+'product/update',data,{
      headers:{
        'Content-Type':'application/json'
    }
    })
  }

  getProduct(){
    return this.httpClient.get(this.url+'product/get');
  }

  updateProductStatus(data:any){
    return this.httpClient.patch(this.url+'product/updateStatus',data,{
      headers:{
        'Content-Type':'application/json'
    }
    })
  }

  deleteProduct(data:any){
    return this.httpClient.delete(this.url+'product/delete/'+data);
  }
  
}
