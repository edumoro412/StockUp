import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegister } from './login-register';

describe('LoginRegister', () => {
  let component: LoginRegister;
  let fixture: ComponentFixture<LoginRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
