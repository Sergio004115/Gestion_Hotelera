import { Component, OnInit, ViewChild } from '@angular/core';
import { HotelService } from '../../../services/hotel.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { DatePipe } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {
  @ViewChild('closModal') closeModal: any;
  public hotelList: Hotel[] = [];
  public fechaActual: string;
  public respRooms: any[] = [];
  public formSubmitted: boolean = false;
  public datosRoom;
  public datosHotel;
  public nombresContacto: string;
  public telefonoContacto: number;
  public arrCantPersonas: any[] = [];
  public btnAdd: boolean = false;
  public formularioHuesped: boolean = false;
  public existingDataString: any;
  public hotelEncontrado: any;

  public searchHotel = this.fb.group({
    fechaIngreso: [, Validators.required],
    fechaSalida: [, Validators.required],
    cantidadPersonas: [, Validators.required],
    ciudadDestino: [, Validators.required]
  });

  public reservaForm = this.fb.group({
    id: [,],
    nombres: [, Validators.required],
    fechaNacimiento: [, Validators.required],
    genero: [, Validators.required],
    tipoDocumento: [, Validators.required],
    nroDocumento: [, Validators.required],
    email: [, [Validators.required, Validators.email]],
    telefonoContacto: [, Validators.required],
    fechaIngreso:[,],
    fechaSalida:[,],
    
  });

  constructor(private hotelService: HotelService, private datePipe: DatePipe,
    private fb: FormBuilder, private messageService: MessagesService,
    private router: Router) { }

  ngOnInit(): void {
    this.getHotels();
    this.fechaActual = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  getHotels() {
    this.hotelList = this.hotelService.loadHotels();
  }

  searchRooms() {
    if(this.searchHotel.invalid)return this.messageService.mensajeInformativoPerzonalizado("todos los campos son obligatorios");
    this.respRooms = [];
    let ciudadRoom = this.searchHotel.get('ciudadDestino').value;
    let resp = this.hotelList.find(hotel => hotel.ciudadHotel === ciudadRoom);

    if (resp && resp.rooms) {
      this.respRooms.push(resp);
    } else {
      this.respRooms = [];
      this.messageService.mensajeInformativoPerzonalizado('No se encontraron habitaciones')
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.reservaForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  reservarRoom(room, hotel) {
    this.datosRoom = room
    this.datosHotel = hotel

  }

  reservaRoom() {
    this.formularioHuesped = false;
    this.reservaForm.get('fechaIngreso').setValue(this.searchHotel.get('fechaIngreso').value);
    this.reservaForm.get('fechaSalida').setValue(this.searchHotel.get('fechaSalida').value);
    this.arrCantPersonas.push(this.reservaForm.value);

    this.existingDataString = JSON.parse(localStorage.getItem('data'));
    this.hotelEncontrado = this.existingDataString.find(hotel => hotel.id === this.datosHotel.id);

    if (this.hotelEncontrado) {
      const roomEncontrado = this.hotelEncontrado.rooms.find(room => room.id === this.datosRoom.id);
      if (roomEncontrado) {
        roomEncontrado.disponibilidad = false;
      }
 
      if (!this.hotelEncontrado.reservas) {
        this.hotelEncontrado.reservas = [];
      }
      this.reservaForm.get('id').setValue(this.getNextId());
      this.hotelEncontrado.reservas.push(this.arrCantPersonas);
      this.messageService.mensajeSuccess();

      localStorage.setItem('data', JSON.stringify(this.existingDataString));
      this.router.navigate(['/dashboard/misReservas']);
    }
  }

  private getNextId(): number {
    const maxId = this.hotelEncontrado.reservas && this.hotelEncontrado.reservas.length > 0
      ? Math.max(...this.hotelEncontrado.reservas.map(reservas => reservas.id))
      : 0;
    return maxId + 1;
  }

  continueReserva() {
    this.formularioHuesped = true;
    this.closeModal.nativeElement.click()
    let cantidadHuesped = this.searchHotel.get('cantidadPersonas').value;
    if (cantidadHuesped == 1) return this.btnAdd = false;
    if (cantidadHuesped > this.arrCantPersonas.length) {
      this.btnAdd = true;
    } else {
      this.reservaRoom();
    }
  }

  addHuesped() {
    this.arrCantPersonas.push(this.reservaForm.value);
    this.btnAdd = false;
    this.reservaForm.reset();
  }

}

