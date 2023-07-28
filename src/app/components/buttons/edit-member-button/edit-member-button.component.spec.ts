import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberButtonComponent } from './edit-member-button.component';

describe('EditMemberButtonComponent', () => {
  let component: EditMemberButtonComponent;
  let fixture: ComponentFixture<EditMemberButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMemberButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMemberButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
