import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrandSideBarComponent } from '../brand-side-bar/brand-side-bar.component';

@Component({
  selector: 'app-brand-landing',
  standalone: true,
  imports: [BrandSideBarComponent],
  templateUrl: './brand-landing.component.html',
  styleUrl: './brand-landing.component.css'
})
export class BrandLandingComponent {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // You can add logic here to fetch data if needed, like user session info.
  }

  // Navigate to the influencer list after login
  navigateToInfluencerList(): void {
    this.router.navigate(['/influencer-list']); // Navigate to influencer list
  }

  // Navigate to accepted influencers page
  navigateToAcceptedInfluencers(): void {
    this.router.navigate(['/brand/accepted-influencers']); // Navigate to brand accepted influencers
  }

}
