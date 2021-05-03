import { Component } from '@angular/core';
import { PaisService } from '../../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `button{
      margin-right: 5px;
    }`
  ]
})
export class PorRegionComponent {

  placeholderRegion: string;

  //Mostramos las opciones de las regiones que se pueden buscar
  regiones: string[];
  regionActiva: string;
  constructor(private paisService: PaisService) {
    this.placeholderRegion = "Buscar Región ...";
    this.regiones = ['africa','americas','asia','europe','oceania'];
    this.regionActiva = '';
   }

   //obtener el listado de paises a través del arreglo de regiones
   async activarRegion(region: string){
     if (region !== this.regionActiva) {
       this.regionActiva = region;
       console.log('Buscar Por region');
       await this.paisService.buscarPorRegion(this.regionActiva);
       console.log('terminé');
      }

   }

  get obtenerArrayPaisesPorRegion(){
    return this.paisService.getListadoPaisesRegion;

  }

  /**
   * Se obtiene el listado de regiones por la primera forma
   * (todo se hace desde el pais.service)
   * @param region región por la que se va a buscar
   */
  async obtenerPaisesPorRegion(region: string){
    console.log('Buscar Por region');
    await this.paisService.buscarPorRegion(region)
    console.log('terminé');
  }

  /**
   * Se subraya de color gris el botón que ha sido seleccionado
   * esto lo hace el [class] del botón
   * 
   */
  obtenerClaseActiva(region: string){
    return (region === this.regionActiva) ? 'btn btn-secondary': 'btn btn-outline-primary';
  }

}
