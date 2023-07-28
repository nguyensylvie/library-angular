import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowDocumentButtonComponent } from './borrow-document-button.component';

describe('BorrowDocumentButtonComponent', () => {
  let component: BorrowDocumentButtonComponent;
  let fixture: ComponentFixture<BorrowDocumentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowDocumentButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowDocumentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
