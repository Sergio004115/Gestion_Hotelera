import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public users: User;

  constructor( private sidebarService: SidebarService ) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit(): void {
    this.user;
  }

  get user() {
    this.users = JSON.parse(localStorage.getItem('Usuario')); 
    console.log(this.users);
    return this.users;
  }

}
