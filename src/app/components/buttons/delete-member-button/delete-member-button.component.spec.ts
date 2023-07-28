import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMemberButtonComponent } from './delete-member-button.component';

describe('DeleteMemberButtonComponent', () => {
  let component: DeleteMemberButtonComponent;
  let fixture: ComponentFixture<DeleteMemberButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteMemberButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteMemberButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
