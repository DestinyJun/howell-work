import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRsComponent } from './register-rs.component';

describe('RegisterRsComponent', () => {
  let component: RegisterRsComponent;
  let fixture: ComponentFixture<RegisterRsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
