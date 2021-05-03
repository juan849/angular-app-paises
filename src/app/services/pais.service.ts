import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
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

   get parametros(){
     return new HttpParams()
     .set('fields', 'name;capital;alpha3Code;flag;population');
   }

   buscarPorNombre(name: string): Observable<Country[]>{
     return this.http.get<Country[]>(`${this.url}/name/${name}`, {params: this.parametros});
   }

   buscarPorRegion(region:string){

     return this.http.get<Country[]>(`${this.url}/region/${region}`, {params: this.parametros}).pipe(debounceTime(500)).toPromise()
     .then( data => {
       this.arrayPaisesRegion = [];
       this.arrayPaisesRegion = data;
       console.log('this.arrayPaisesRegion :>> ', this.arrayPaisesRegion);
     })     
     .catch(error => {
       this.arrayPaisesRegion = [];
       console.log('error región:>> ', error);
     })
   }

   buscarPorCapital(capital: string): Observable<Country[]>{
     return this.http.get<Country[]>(`${this.url}/capital/${capital}`, {params: this.parametros});
   }

   verPaisPoralpha3Code(codigo: string): Observable<Country>{
     return this.http.get<Country>(`${this.url}/alpha/${codigo}`);
   }



}
