import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluencerRequestsComponent } from './influencer-requests.component';

describe('InfluencerRequestsComponent', () => {
  let component: InfluencerRequestsComponent;
  let fixture: ComponentFixture<InfluencerRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfluencerRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfluencerRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
