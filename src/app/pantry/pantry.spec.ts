import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pantry } from './pantry';

describe('Pantry', () => {
  let component: Pantry;
  let fixture: ComponentFixture<Pantry>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pantry]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pantry);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
