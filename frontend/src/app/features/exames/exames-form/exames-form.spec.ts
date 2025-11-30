import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamesForm } from './exames-form';

describe('ExamesForm', () => {
  let component: ExamesForm;
  let fixture: ComponentFixture<ExamesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
