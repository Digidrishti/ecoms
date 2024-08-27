import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomePopupComponent } from './custome-popup.component';

describe('CustomePopupComponent', () => {
  let component: CustomePopupComponent;
  let fixture: ComponentFixture<CustomePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
