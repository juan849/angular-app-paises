import { Component, OnInit } from '@angular/core';
import { PaisService } from '../../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
  ]
})
export class PorPaisComponent implements OnInit {

  termino: string;
  hayError: boolean;
  arrayPaises: Country[];
  placeholderPais: string;
  constructor(private paisService: PaisService) {
    this.termino = '';
    this.hayError = false;
    this.arrayPaises = [];
    this.placeholderPais = "Buscar País ...";
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

  sugerencias(termino: string){
    this.hayError = false
    console.log('termino :>> ', termino);
  }
}
