import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListDialogComponent } from './newlist-dialog.component';

describe('NewlistDialogComponent', () => {
  let component: NewListDialogComponent;
  let fixture: ComponentFixture<NewListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewListDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
