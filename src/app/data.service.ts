import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = "http://localhost:4200";
  currerntUser: any = {
    email:"",
    firstName:"",
    lastName:""
  };

  constructor(private http : HttpClient) { }

  // GET heroes whose name contains search term
  getPosts(data: any): Observable<any>{
    return this.http.request('POST', this.url+'/api/products', 
    {responseType:'json', headers: {'Content-Type': 'application/json'},body:data});
 }
 getAllOrders(data: any): Observable<any>{
  return this.http.request('POST', this.url+'/api/getAllOrders', 
  {responseType:'json', headers: {'Content-Type': 'application/json'},body:data});
}
mapReduce(data: any): Observable<any>{
  return this.http.request('POST', this.url+'/api/mapReduce', 
  {responseType:'json', headers: {'Content-Type': 'application/json'},body:data});
}
login(data: any): Observable<any>{
  return this.http.request('POST', this.url+'/api/login', 
  {responseType:'json', headers: {'Content-Type': 'application/json'},body:data});
}
signUp(data: any): Observable<any>{
  return this.http.request('POST', this.url+'/api/signUp', 
  {responseType:'json', headers: {'Content-Type': 'application/json'},body:data});
}
changePassword(data: any): Observable<any>{
  return this.http.request('POST', this.url+'/api/changePassword', 
  {responseType:'json', headers: {'Content-Type': 'application/json'},body:data});
}
getGPTResponse(data: any): Observable<any>{
  return this.http.request('POST', this.url+'/api/getGPTResponse', 
  {responseType:'json', headers: {'Content-Type': 'application/json'},body:data});
}
getSessionInfo(data: any): Observable<any>{
  return this.http.request('POST', this.url+'/api/getSessionInfo', 
  {responseType:'json',observe: 'response', headers: {'Content-Type': 'application/json'},body:data});
}
getCurrentUser(){
  return this.currerntUser;
}
setCurrentUser(user:any){
  this.currerntUser = user;
}
}
