import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsManagementComponent } from './rooms-management.component';

describe('RoomsManagementComponent', () => {
  let component: RoomsManagementComponent;
  let fixture: ComponentFixture<RoomsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
