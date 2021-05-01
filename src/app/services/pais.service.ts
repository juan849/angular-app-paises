import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Country } from '../pais/interfaces/pais.interface';
@Injectable({
  providedIn: 'root'
})
export class PaisService {

  url: string;
  private arrayPaisesRegion: any[];

  constructor(private http: HttpClient) {
    this.url = 'https://restcountries.eu/rest/v2';
    this.arrayPaisesRegion = [];
   }

   get getListadoPaisesRegion(){
     return this.arrayPaisesRegion = [... this.arrayPaisesRegion];
   }

   buscarPorNombre(name: string): Observable<Country[]>{
     return this.http.get<Country[]>(`${this.url}/name/${name}`);
   }

   buscarPorRegion(region:string){
     return this.http.get<Country[]>(`${this.url}/region/${region}`).pipe(debounceTime(500)).toPromise()
     .then( data => {
       this.arrayPaisesRegion = data;
     })
     .catch(error => {
       this.arrayPaisesRegion = [];
       console.log('error región:>> ', error);
     })
   }

   buscarPorCapital(capital: string): Observable<Country[]>{
     return this.http.get<Country[]>(`${this.url}/capital/${capital}`);
   }

   verPaisPoralpha3Code(codigo: string): Observable<Country>{
     return this.http.get<Country>(`${this.url}/alpha/${codigo}`);
   }



}
