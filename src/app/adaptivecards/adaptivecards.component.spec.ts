import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdaptivecardsComponent } from './adaptivecards.component';

describe('AdaptivecardsComponent', () => {
  let component: AdaptivecardsComponent;
  let fixture: ComponentFixture<AdaptivecardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdaptivecardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdaptivecardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
