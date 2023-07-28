import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnDocumentButtonComponent } from './return-document-button.component';

describe('ReturnDocumentButtonComponent', () => {
  let component: ReturnDocumentButtonComponent;
  let fixture: ComponentFixture<ReturnDocumentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnDocumentButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnDocumentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
