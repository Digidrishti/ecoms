import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssTrickComponent } from './css-trick.component';

describe('CssTrickComponent', () => {
  let component: CssTrickComponent;
  let fixture: ComponentFixture<CssTrickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssTrickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssTrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
