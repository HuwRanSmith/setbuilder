import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyTestComponent } from './spotify-test.component';

describe('SpotifyTestComponent', () => {
  let component: SpotifyTestComponent;
  let fixture: ComponentFixture<SpotifyTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
