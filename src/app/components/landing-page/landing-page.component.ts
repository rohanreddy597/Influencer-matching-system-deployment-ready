import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';  // Import provideHttpClient

@Component({
  selector: 'app-landing-page',
  standalone: true,// Correctly provideHttpClient here
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {
  constructor(private router: Router, private http: HttpClient) {}

  // Navigate to influencer login
  navigateToInfluencerLogin(): void {
    this.router.navigate(['/login']);
  }

  // Navigate to brand login
  navigateToBrandLogin(): void {
    this.router.navigate(['/brand/login']);
  }

  // Example HTTP request
  fetchData(): void {
    this.http.get('your-api-url').subscribe(response => {
      console.log(response);
    });
  }
}
