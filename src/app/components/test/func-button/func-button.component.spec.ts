import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncButtonComponent } from './func-button.component';

describe('FuncButtonComponent', () => {
  let component: FuncButtonComponent;
  let fixture: ComponentFixture<FuncButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
