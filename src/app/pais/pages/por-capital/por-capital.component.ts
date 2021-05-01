import { Component, OnInit, Output } from '@angular/core';
import { PaisService } from '../../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent implements OnInit {
  arrayPaisesCapital: Country[];
  hayError: boolean;
  terminoCapital: string;
  placeholderCapital: string;

  constructor(private paisService: PaisService) {
    this.arrayPaisesCapital = [];
    this.hayError = false;
    this.terminoCapital = "";
    this.placeholderCapital = "Buscar Capital ...";
   }

  ngOnInit(): void {

  }

  async obtenerPaisesPorCapital(event: string){
    await this.paisService.buscarPorCapital(event).subscribe(
      data => {
        console.log('data capital:>> ', data);
        this.arrayPaisesCapital = data;
        this.hayError = false;
      },
    (error) => {
      this.arrayPaisesCapital = [];
      console.log('error capital :>> ', error);
      this.hayError = true;
    });
  }

  sugerenciasCapital(termino:string){
    this.terminoCapital = termino;
    console.log('termino capital :>> ', this.terminoCapital);
  }
}
