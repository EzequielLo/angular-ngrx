import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterCustomComponent } from './counter-custom.component';

describe('CounterCustomComponent', () => {
  let component: CounterCustomComponent;
  let fixture: ComponentFixture<CounterCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
