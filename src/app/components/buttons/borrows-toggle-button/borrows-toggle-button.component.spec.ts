import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowsToggleButtonComponent } from './borrows-toggle-button.component';

describe('BorrowsToggleButtonComponent', () => {
  let component: BorrowsToggleButtonComponent;
  let fixture: ComponentFixture<BorrowsToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowsToggleButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowsToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
