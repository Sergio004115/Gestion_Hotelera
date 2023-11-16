import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Modulos
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HotelManagementComponent } from './hotel-management/hotel-management.component';
import { RoomsManagementComponent } from './rooms-management/rooms-management.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ReservarComponent } from './customer/reservar/reservar.component';
import { ReservasComponent } from './customer/reservas/reservas.component';




@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    HotelManagementComponent,
    RoomsManagementComponent,
    BookingsComponent,
    ReservarComponent,
    ReservasComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ], 
  providers: [DatePipe]
})
export class PagesModule { }
