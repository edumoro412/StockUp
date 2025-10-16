import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFilter } from './input-filter';

describe('InputFilter', () => {
  let component: InputFilter;
  let fixture: ComponentFixture<InputFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
