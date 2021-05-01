import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-buscador',
  templateUrl: './pais-buscador.component.html',
  styles: [
  ]
})
export class PaisBuscadorComponent implements OnInit {

  @Output() eventoTermino: EventEmitter<string>;
  @Output() eventoDebounce: EventEmitter<string>;
  @Input() placeholderBusqueda: string;

  debouncer: Subject<string>;
  termino: string;
  constructor() {
    this.eventoTermino = new EventEmitter();
    this.eventoDebounce = new EventEmitter();
    this.debouncer = new Subject();
    this.termino = "";
    this.placeholderBusqueda = "";
   }

  ngOnInit(): void {
    this.debouncer
    .pipe( debounceTime(500))
    .subscribe(valor => {
      this.eventoDebounce.emit(valor);
    });
  }


  buscar(){
    this.eventoTermino.emit(this.termino)
  }

  teclaPresionada(){
    this.debouncer.next(this.termino);
  }
}
