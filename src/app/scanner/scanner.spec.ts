import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scanner } from './scanner';

describe('Scanner', () => {
  let component: Scanner;
  let fixture: ComponentFixture<Scanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
