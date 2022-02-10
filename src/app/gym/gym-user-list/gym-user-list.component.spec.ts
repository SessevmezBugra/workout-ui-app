import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymUserListComponent } from './gym-user-list.component';

describe('GymUserListComponent', () => {
  let component: GymUserListComponent;
  let fixture: ComponentFixture<GymUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GymUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GymUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
