import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorrisJsComponent } from './morris-js.component';

describe('MorrisJsComponent', () => {
  let component: MorrisJsComponent;
  let fixture: ComponentFixture<MorrisJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorrisJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorrisJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
