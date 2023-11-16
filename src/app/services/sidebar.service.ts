import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Gestión Hotelera',
      icono: 'mdi mdi-gauge',
      submenu: [        
        { titulo: 'Hoteles', url: 'hotel' },
        { titulo: 'Habitaciones', url: 'rooms' },
        { titulo: 'Reservas', url: 'reservas' },
        
      ]
    },
    {
      titulo: 'Reservas',
      icono: 'mdi mdi-gauge',

      submenu: [        
        { titulo: 'Hoteles', url: 'hotel' },
        { titulo: 'Habitaciones', url: 'rooms' },
        { titulo: 'Reservas', url: 'reservas' },
        
      ]
    },

  ];

  constructor() { }
}
