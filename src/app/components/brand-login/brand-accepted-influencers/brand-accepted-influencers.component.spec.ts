import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandAcceptedInfluencersComponent } from './brand-accepted-influencers.component';

describe('BrandAcceptedInfluencersComponent', () => {
  let component: BrandAcceptedInfluencersComponent;
  let fixture: ComponentFixture<BrandAcceptedInfluencersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandAcceptedInfluencersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandAcceptedInfluencersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
