import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedComponent } from './homed.component';

describe('HomeComponent', () => {
  let component: HomedComponent;
  let fixture: ComponentFixture<HomedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
