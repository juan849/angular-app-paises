import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { PaisService } from 'src/app/services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  /**
   * Con el signo !, le decimos a typescript que el objeto puede ser nulo
   */
  pais!: Country;
  constructor(private router: ActivatedRoute, private paisService: PaisService) { }

  async ngOnInit(): Promise<void> {
    /**
     * Puedo hacer la desestructuración del objeto; ya que en la url
     * obtenemos un objeto con la propiedad codigoPais. Lo que se hace es 
     * obtener el codigoPais solamente.
     */
    console.log('Entre');
 /*    await this.router.params.subscribe(  async ( {codigoPais } ) => {
      console.log('data :>> ', codigoPais);
        const peticion = await this.paisService.verPaisPoralpha3Code(codigoPais)
          .subscribe( data => {
            console.log('data verPaisPoralpha3Code :>> ', data);
          })
    }); */
    this.router.params
        .pipe(
          switchMap( ( params ) => 
           this.paisService.verPaisPoralpha3Code(params.codigoPais)
          ),
          tap(console.log)
        )
        .subscribe( (pais ) => {
          this.pais = pais;
          
    });
  
  }

}
