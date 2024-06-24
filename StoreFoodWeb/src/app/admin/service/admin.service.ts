import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
const BASIC_URL = "http://localhost:8080/"
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

addCategory(categoryDto: any): Observable<any>{
  return this.http.post(BASIC_URL + 'api/admin/category', categoryDto,{
    headers: this.createAuthorizationHeader(),
  })

}
getAllCategories(): Observable<any>{
  return this.http.get(BASIC_URL + 'api/admin/categories',{
    headers: this.createAuthorizationHeader(),
  })

}


addFactory(productDto: any): Observable<any>{
  return this.http.post(BASIC_URL + 'api/admin/product', productDto,{
    headers: this.createAuthorizationHeader(),
  })

}

getAllFactory(): Observable<any>{
  return this.http.get(BASIC_URL + 'api/admin/products',{
    headers: this.createAuthorizationHeader(),
  })

}

getAllFactoryByName(name: any): Observable<any>{
  return this.http.get(BASIC_URL + `api/admin/search/${name}` , {
    headers: this.createAuthorizationHeader(),
  })

}

deleteFactory(factoryId: any): Observable<any>{
  return this.http.delete(BASIC_URL + `api/admin/product/${factoryId}`,{
    headers: this.createAuthorizationHeader(),
  })

}


addCredito(creditoDto: any): Observable<any>{
  return this.http.post(BASIC_URL + 'api/admin/create/credit', creditoDto,{
    headers: this.createAuthorizationHeader(),
  })

}


getAllCreditos(): Observable<any>{
  return this.http.get(BASIC_URL + 'api/admin/creditos',{
    headers: this.createAuthorizationHeader(),
  })

}




private createAuthorizationHeader(): HttpHeaders{
  return new HttpHeaders().set(
    'Authorization', 'Bearer ' + UserStorageService.getToken()
  )

}
}
