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

 
  getReservationsByDate(date: string ,  terrainId: number ): Observable<string[][]> {
    return this.http.get<string[][]>(this.host + "/horaires/" + date + "/" + terrainId);
  }
  
  /*addReservation(reservation : any , idUser : any , idTerrain : any ) : Observable<any> {
    return this.http.post(this.host + "/ajouter?idUser=" + idUser + "&idTerrain" + idTerrain , reservation ) ; 
  }*/
  addReservation(reservation: any , idUser: number, idTerrain: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/reservation/ajouter?idUser=${idUser}&idTerrain=${idTerrain}`, reservation);
}

}