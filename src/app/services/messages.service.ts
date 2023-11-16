import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  mensajeSuccess(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Operación realizada con éxito',
      showConfirmButton: false,
      timer: 1500
    })
  }

  mensajeInformativoPerzonalizado(title: string){
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
  }

  
}
