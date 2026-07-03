import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './brand-side-bar.component.html',
  styleUrl: './brand-side-bar.component.css'
})
export class BrandSideBarComponent {

  isCollapsed = false;
  constructor(private router: Router) {}

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  navigatetoDashboard():void{

    this.router.navigate(['/brand-dashboard'])

  }

  

  logOut(){
    this.router.navigate(['']);
  }

  navigateToInfluencerList(): void {
    this.router.navigate(['/influencer-list']); // Navigate to influencer list
  }

  // Navigate to accepted influencers page
  navigateToAcceptedInfluencers(): void {
    this.router.navigate(['/brand/accepted-influencers']); // Navigate to brand accepted influencers
  }

}
