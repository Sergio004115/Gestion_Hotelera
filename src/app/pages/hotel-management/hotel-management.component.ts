import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from 'src/app/interfaces/hotel';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-hotel-management',
  templateUrl: './hotel-management.component.html',
  styleUrls: ['./hotel-management.component.css']
})
export class HotelManagementComponent implements OnInit {

  @ViewChild('closeModal') closeModal: any;
  public formSubmitted: boolean = false;
  public isBtnCreate: boolean = true;
  public idHotelSelected: number;
  public hotelList: Hotel[] = [];
  
  public registerHotel = this.fb.group({
    nombreHotel: [, Validators.required],
    ciudadHotel: [, Validators.required],
    disponiblidadHotel: [, Validators.required],
    descripcionHotel: [, Validators.required],
  });

  constructor(private fb: FormBuilder, private hotelService: HotelService,
    private messagesServices: MessagesService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  campoNoValido(campo: string): boolean {
    if (this.registerHotel.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  createHotel() {
    this.formSubmitted = true;
    if (this.registerHotel.invalid) return this.registerHotel.markAllAsTouched;
    this.hotelService.createHotel(this.registerHotel.value);
    this.messagesServices.mensajeSuccess();
    this.getHotels();
    this.closModal();
    this.registerHotel.reset();
    this.formSubmitted = false;
  }

  getHotels() {
    this.hotelList = this.hotelService.loadHotels().map(hotel => {
      return {
        ...hotel,
        rooms: hotel.rooms ? hotel.rooms.filter(room => room.disponibilidad === "true") : []
      };
    });

  }

  isEditHotel(hotel) {
    this.idHotelSelected = hotel.id;
    this.isBtnCreate = false;
    this.registerHotel.patchValue(hotel);
  }

  deleteHotel(id: number) {
    const existingData = localStorage.getItem('data');
    if (existingData) {
      const currentData = JSON.parse(existingData);

      const updatedData = currentData.filter((hotel: Hotel) => hotel.id !== id);

      localStorage.setItem('data', JSON.stringify(updatedData));
      this.messagesServices.mensajeSuccess();
      this.getHotels();
    }

  }

  updateHotel() {
    const update = this.hotelList.map((hotel: Hotel) => {
      if (hotel.id == this.idHotelSelected) {
        hotel = this.registerHotel.value;
        hotel.id = this.idHotelSelected;
      }
      return hotel;
    });
    localStorage.setItem('data', JSON.stringify(update));
    this.getHotels();
    this.closModal();
    this.messagesServices.mensajeSuccess();
    this.idHotelSelected = null;
  }

  closModal() {
    this.closeModal.nativeElement.click();
  }

}
