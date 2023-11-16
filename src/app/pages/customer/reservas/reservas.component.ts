import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/interfaces/hotel';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  public hotelList: Hotel[] = [];

  constructor( private hotelService: HotelService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  getHotels() {
    this.hotelList = this.hotelService.loadHotels();
  }

}
