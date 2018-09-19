import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component'; // dont replace this with @app/events -> circular dependency

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
