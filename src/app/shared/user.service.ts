import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url : string;
  public logueado : boolean;
  public user : User;

  constructor(private http : HttpClient) {
    this.logueado = false;
  }

  public register(user : User){
    this.url = "http://localhost:3000/register";
    
    return this.http.post(this.url,user);
  }

  public login(user : User){
    this.url = "http://localhost:3000/login";
    return this.http.post(this.url,user);
  }

  public update(user : User){
    this.url = "http://localhost:3000/modifyprofile";
    return this.http.put(this.url,user)
  }
}
