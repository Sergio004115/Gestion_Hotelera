import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { TipoImpuesto } from '../../interfaces/impuestos';
import { typesRooms } from 'src/app/interfaces/rooms';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-rooms-management',
  templateUrl: './rooms-management.component.html',
  styleUrls: ['./rooms-management.component.css']
})
export class RoomsManagementComponent implements OnInit {
  @ViewChild('closModal') closeModal: any;
  public formSubmitted: boolean = false;
  public isBtnCreate: boolean = true;
  public hotelList: Hotel[] = [];
  public listTaxes: TipoImpuesto[] = [];
  public listTypesRooms: typesRooms[] = [];
  public existingDataString: any;
  public hotelEncontrado: any;
  public idRoomlSelected: number;

  public registerRoom = this.fb.group({
    id: [,],
    idHotel: [, Validators.required],
    tipo: [, Validators.required],
    costo: [, Validators.required],
    impuesto: [Validators.required],
    tipoHabitacion: [Validators.required],
    ubicacion: [, Validators.required],
    disponibilidad: [, Validators.required]
  });

  constructor(private fb: FormBuilder, private hotelService: HotelService,
    private messagesServices: MessagesService) { }

  ngOnInit(): void {
    this.getHotels();
    this.getTypes();
  }

  getHotels() {
    this.hotelList = this.hotelService.loadHotels();
  }

  campoNoValido(campo: string): boolean {
    if (this.registerRoom.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  getTypes() {
    this.listTaxes = this.hotelService.typesTaxes;
    this.listTypesRooms = this.hotelService.typesRooms;
  }

  createRoom() {
    const idSelected = parseInt(this.registerRoom.get('idHotel').value);
    this.existingDataString = JSON.parse(localStorage.getItem('data'));
    this.hotelEncontrado = this.existingDataString.find(hotel => hotel.id === idSelected);

    if (this.hotelEncontrado) {
      if (!this.hotelEncontrado.rooms) {
        this.hotelEncontrado.rooms = [];
      }

      this.registerRoom.get('id').setValue(this.getNextId());
      this.hotelEncontrado.rooms.push(this.registerRoom.value);
      localStorage.setItem('data', JSON.stringify(this.existingDataString));
      this.getHotels();
      this.closModal();
      this.formSubmitted = false;
      this.messagesServices.mensajeSuccess();
    }
  }

  isEditRoom(room) {
    this.idRoomlSelected = room.id;
    this.isBtnCreate = false;
    this.registerRoom.patchValue(room);
    this.registerRoom.get('idHotel').disable();
  }

  updateRoom() {
    const update = this.hotelList.map((hotel: any) => {
      if (hotel.rooms) {
        hotel.rooms = hotel.rooms.map((room: any) => {
          if (room.id == this.idRoomlSelected && room.idHotel == this.registerRoom.get('idHotel').value) {
            room.costo = this.registerRoom.get('costo').value;
            room.disponibilidad = this.registerRoom.get('disponibilidad').value;
            room.id = this.idRoomlSelected;
            room.idHotel = this.registerRoom.get('idHotel').value;
            room.impuesto = this.registerRoom.get('impuesto').value;
            room.tipoHabitacion = this.registerRoom.get('tipoHabitacion').value;
            room.ubicacion = this.registerRoom.get('ubicacion').value;
          }
          return room;
        });
      }
      return hotel;
    });

    localStorage.setItem('data', JSON.stringify(update));
    this.getHotels();
    this.closModal();
    this.messagesServices.mensajeSuccess();
    this.idRoomlSelected = null;
  }

  private getNextId(): number {
    const maxId = this.hotelEncontrado.rooms && this.hotelEncontrado.rooms.length > 0
      ? Math.max(...this.hotelEncontrado.rooms.map(room => room.id))
      : 0;
    return maxId + 1;
  }

  closModal() {
    this.closeModal.nativeElement.click();
  }

  deleteRoom(id, idHotel) {
    const existingData = localStorage.getItem('data');

    if (existingData) {
      const currentData = JSON.parse(existingData);

      const updatedData = currentData.map((hotel) => {
        if (hotel.rooms && hotel.id == idHotel) {
          hotel.rooms = hotel.rooms.filter((room) => room.id !== id);
        }
        return hotel;
      });
      localStorage.setItem('data', JSON.stringify(updatedData));
      this.messagesServices.mensajeSuccess();
      this.getHotels()
    }
  }
}
