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
    this.url = "https://api-easy-winter-phase.vercel.app/register";
    
    return this.http.post(this.url,user);
  }

  public login(user : User){
    this.url = "https://api-easy-winter-phase.vercel.app/login";
    return this.http.post(this.url,user);
  }

  public update(user : User){
    this.url = "https://api-easy-winter-phase.vercel.app/modifyprofile";
    return this.http.put(this.url,user)
  }
}
