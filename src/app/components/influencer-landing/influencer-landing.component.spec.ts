import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerLandingComponent } from './influencer-landing.component';

describe('InfluencerLandingComponent', () => {
  let component: InfluencerLandingComponent;
  let fixture: ComponentFixture<InfluencerLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluencerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
