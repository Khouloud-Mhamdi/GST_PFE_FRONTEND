import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient , private token : TokenStorageService) { }
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
  resetPassword (token :any,password:any) :Observable<boolean>{
    return this.http.get<boolean> (this.URL +"resetPassword/"+ token + "/" +password);
  }

  updateUser(user: any): Observable<any> {
    const url = `${this.userURL}/UpdateCurrentUser`;
    return this.http.put<any>(url, user);
  }
  ExistEmail (email :any) :Observable<boolean>{
    return this.http.get<boolean> (this.userURL +"/ExistEmail/" +email);
  }


  getCurrentUserById(id:number){
    return this.http.get(`${this.userURL}/${id}`)
  }

  // une méthode qui verifie le role d'un utilisateur connecté 
  public roleMatch(allowedRole : any ): boolean {
    let isMatch = false; 
    const userRole : any = this.token.getUser().role ; 
    if (userRole != null && userRole)
    {
      if (userRole===allowedRole){
         isMatch = true ; 
      }
    }
    return isMatch ; 
  }
}
