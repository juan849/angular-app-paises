import { Component } from '@angular/core';
import { PaisService } from '../../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
  ]
})
export class PorRegionComponent {

  placeholderRegion: string
  constructor(private paisService: PaisService) {
    this.placeholderRegion = "Buscar Región ...";
   }

  get obtenerArrayPaisesPorRegion(){
    return this.paisService.getListadoPaisesRegion;
  }

  async obtenerPaisesPorRegion(region: string){
    console.log('Buscar Por region');
    await this.paisService.buscarPorRegion(region)
    console.log('terminé');
  }

}
