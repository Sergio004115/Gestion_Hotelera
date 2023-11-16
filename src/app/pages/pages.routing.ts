import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HotelManagementComponent } from './hotel-management/hotel-management.component';
import { RoomsManagementComponent } from './rooms-management/rooms-management.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ReservarComponent } from './customer/reservar/reservar.component';
import { ReservasComponent } from './customer/reservas/reservas.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
            { path: 'hotel', component: HotelManagementComponent },
            { path: 'rooms', component: RoomsManagementComponent },
            { path: 'reservas', component: BookingsComponent },
            { path: 'reservar', component: ReservarComponent },
            { path: 'misReservas', component: ReservasComponent },
            { path: 'account-settings', component: AccountSettingsComponent },
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


