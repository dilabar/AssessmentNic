import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';




const HttpOptions = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'Bearer '+accessToken
  }),

  withCredentials: true,
};
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient,) { }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if(error.status == 401 ){
        errorMessage ="Please login again"
      }else{
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    // alert(errorMessage);
    alert(errorMessage);
    return throwError(errorMessage);
  }


  api_url = 'http://localhost:5019/';



  postParams='';

  getData(path:any) {
    return this.http.get(this.api_url + path).pipe(retry(0), catchError(this.handleError));
  }
  postData(path:any, postdata:any) {
    // this.postParams = "token=" + localStorage.getItem('token') + "&key=" + localStorage.getItem('key');//keep it inside becoz it dont changes if logged in..values changes on page load only so
    // console.log(this.api_url + path + "?" + this.postParams, postdata);
    return this.http.post(this.api_url + path,postdata).pipe(retry(0), catchError(this.handleError));
  }
  putData(path:any, postdata:any){
    //keep it inside becoz it dont changes if logged in..values changes on page load only so
    return this.http.put(this.api_url + path,postdata).pipe(retry(0), catchError(this.handleError));
  }
  deleteData(path:any){
  //keep it inside becoz it dont changes if logged in..values changes on page load only so
    return this.http.delete(this.api_url + path).pipe(retry(0), catchError(this.handleError));
  }






}
