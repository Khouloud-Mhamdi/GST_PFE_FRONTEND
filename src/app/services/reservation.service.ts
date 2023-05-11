import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public  host = "http://localhost:8080/reservation" ;
  constructor(private http : HttpClient) { }

 /* getReservationsByDate(date: any ): Observable<string[][]> {
    const url = `${this.host}/horaires?date=${date}`;
    return this.http.get<string[][]>(url);
  }*/
  getReservationsByDate(date: string ,  terrainId: number ): Observable<string[][]> {
    //const url = `${this.host}/horaires?date=${date}&terrainId=${terrainId}`;

    return this.http.get<string[][]>(this.host + "/horaires/" + date + "/" + terrainId);
  }
  /*getReservationsByDateAndTerrain(date: string, terrainId: number): Observable<any> {
    const url = `${this.host}/reservations?date=${date}&terrainId=${terrainId}`;
    return this.http.get(url);
  }*/
  getReservtionsByAdherent(id: number): Observable<Object> {
    return this.http.get(this.host +"/consultation/"+ id);
  }
  annulerReservatiion(resId:any) :Observable<Object> {
    return this.http.get(this.host +"/annuler/"+ resId);
  }
}
