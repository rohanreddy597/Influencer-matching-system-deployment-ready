import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandLandingComponent } from './brand-landing.component';

describe('BrandLandingComponent', () => {
  let component: BrandLandingComponent;
  let fixture: ComponentFixture<BrandLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
