import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedBorrowsComponent } from './returned-borrows.component';

describe('ReturnedBorrowsComponent', () => {
  let component: ReturnedBorrowsComponent;
  let fixture: ComponentFixture<ReturnedBorrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnedBorrowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnedBorrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
