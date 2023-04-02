import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventsURL = "http://localhost:8080/api/events";
  public  host = "http://localhost:8080" ; 
  public dataForm !:  FormGroup; 
  public listData :  any ; 
  constructor(private http : HttpClient) { }
  getAll(): Observable<any> {
   
    return this.http.get(`${this.eventsURL}`);
  }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.eventsURL}/${id}`);
  }
 
}
