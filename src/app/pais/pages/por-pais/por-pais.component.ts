import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `li{
      cursor: pointer;
    }`
  ]
})
export class PorPaisComponent implements OnInit {

  termino: string;
  hayError: boolean;
  arrayPaises: Country[];
  arrayPaisesSugerencias: Country[];
  placeholderPais: string;
  mostrarSugerencias: boolean;
  constructor(private paisService: PaisService) {
    this.termino = '';
    this.hayError = false;
    this.arrayPaises = [];
    this.arrayPaisesSugerencias = [];
    this.placeholderPais = "Buscar País ...";
    this.mostrarSugerencias = false;
   }

  ngOnInit(): void {
  }

  async buscar(event: string){
    this.termino = event;
    console.log('this.termino :>> ', this.termino);
    this.hayError = false;
    const peticion = await this.paisService.buscarPorNombre(this.termino)
    .pipe(debounceTime(500)).subscribe(
      paises => {
        this.arrayPaises = paises;
      }, (error) => {
        console.log('error :>> ', error);
        this.hayError = true;
        this.arrayPaises = [];
      });
  }

  /**
   * Llenamos la lista de sugerencias
   * @param termino : lo que escribe el usuario
   */
  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    console.log('termino :>> ', termino);
    this.paisService.buscarPorNombre(termino)
    .subscribe(paises => {
      this.arrayPaisesSugerencias = paises.splice(0,5)
    }, (error) => this.arrayPaisesSugerencias = [])
  }

  /**
   * Sirve para ocultar y mostrar la lista de sugerencias
   * @param termino lo que escribe el usuario
   */
  buscarSugerido(termino: string){
    this.mostrarSugerencias = false;
    this.buscar(termino);
    
  }
}
