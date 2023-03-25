import { Injectable,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor() { }
  $emitter = new EventEmitter();

    emitirEvento() {
        this.$emitter.emit();
    }   
}
