import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartEntryComponent } from './cart-entry.component';

describe('CartEntryComponent', () => {
  let component: CartEntryComponent;
  let fixture: ComponentFixture<CartEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
