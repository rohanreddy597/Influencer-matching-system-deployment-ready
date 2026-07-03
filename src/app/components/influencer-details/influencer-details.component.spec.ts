import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerDetailsComponent } from './influencer-details.component';

describe('InfluencerDetailsComponent', () => {
  let component: InfluencerDetailsComponent;
  let fixture: ComponentFixture<InfluencerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluencerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
