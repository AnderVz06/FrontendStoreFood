import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitecrediteComponent } from './limitecredite.component';

describe('LimitecrediteComponent', () => {
  let component: LimitecrediteComponent;
  let fixture: ComponentFixture<LimitecrediteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitecrediteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitecrediteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
