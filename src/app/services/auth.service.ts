import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  userURL: string = "http://localhost:8080/api/auth";
  URL : string ="http://localhost:8080/utilisateurs/"

  login(user : any ) {
    return this.http.post<{accessToken:any}>(this.userURL + "/login", user);
  }

  register(user : any ): Observable<any> {
    return this.http.post(this.userURL + "/signup", user);
  }
  forgetPassword (email :any) :Observable<boolean>{
    return this.http.get<boolean> (this.URL +"forgot-password/" +email);
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.userURL}/UpdateCurrentUser`;
    return this.http.put<any>(url, user);
  }
 
 
  getCurrentUserById(id:number){
    return this.http.get(`${this.userURL}/${id}`)
  }
}
