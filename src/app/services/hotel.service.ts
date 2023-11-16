import { Injectable } from '@angular/core';
import { Hotel } from '../interfaces/hotel';
import { TipoImpuesto } from '../interfaces/impuestos';
import { typesRooms } from '../interfaces/rooms';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  public hotelList: Hotel[] = [];
  public typesTaxes: TipoImpuesto[] = [
    {
      id: 1,
      tipo: 'IVA'
    }
  ];
  public typesRooms: typesRooms[] = [
    {
      id: 1,
      tipo: 'Junior'
    },
    {
      id: 2,
      tipo: 'Matrimonial'
    },
    {
      id: 3,
      tipo: 'Sencilla'
    },
    {
      id: 4,
      tipo: 'Suite'
    }
  ];


  constructor() { }

  createHotel(formData: Hotel) {
    this.loadHotels();
    this.assingId(formData);
    this.hotelList.push(formData);
    this.saveHotel();
  }

  loadHotels() {
    const existingData = localStorage.getItem('data');
    return this.hotelList = existingData ? JSON.parse(existingData) : [];
  }

  assingId(formData: Hotel) {
    formData.id = this.getNextId();
  }

  saveHotel() {
    localStorage.setItem('data', JSON.stringify(this.hotelList));
  }

  private getNextId(): number {
    const maxId = this.hotelList.length > 0 ? Math.max(...this.hotelList.map(hotel => hotel.id)) : 0;
    return maxId + 1;
  }


}
