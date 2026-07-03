import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandLoginComponent } from './brand-login.component';

describe('BrandLoginComponent', () => {
  let component: BrandLoginComponent;
  let fixture: ComponentFixture<BrandLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
