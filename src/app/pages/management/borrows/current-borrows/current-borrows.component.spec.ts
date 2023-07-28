import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBorrowsComponent } from './current-borrows.component';

describe('CurrentBorrowsComponent', () => {
  let component: CurrentBorrowsComponent;
  let fixture: ComponentFixture<CurrentBorrowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentBorrowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentBorrowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
