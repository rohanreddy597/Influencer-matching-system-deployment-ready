import { Component } from '@angular/core';
import { InfluencerService } from '../../services/influencer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  influencerId: string | null = null;
    influencerData: any = null; // Store fetched influencer data
  
    constructor(
      private route: ActivatedRoute,
      private http: HttpClient,
      private router: Router , // Inject Router to handle navigation
      private influencerService: InfluencerService,
    ) {}
  
    isSidebarCollapsed = false;

    ngOnInit(): void {
      // Retrieve the influencer ID from query parameters
      this.route.queryParamMap.subscribe(params => {
        this.influencerId = params.get('id');  // Get the influencer ID from the query parameter
        if (this.influencerId) {
          console.log("Fetching data for Influencer ID:", this.influencerId);
          this.fetchInfluencerData(this.influencerId);
        }
      });
    }

  fetchInfluencerData(id: string): void {
    this.influencerService.getInfluencerById(id).subscribe(
      (data: any) => {
        console.log('Fetched Influencer Data:', data);
        this.influencerData = data; // Store the fetched data in the component
      },
      (error: any) => {
        console.error('Error fetching influencer data:', error);
      }
    );
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  }

  navigatetoDashboard() {
    if (this.influencerId) {
      this.router.navigate(['/influencer-dashboard'], { queryParams: { id: this.influencerId } });
    }
  }

  logOut(){
    this.router.navigate(['']);
  }
  // Method to navigate to influencer profile
  navigateToProfile(): void {
    if (this.influencerId) {
      this.router.navigate(['/influencer-profile'], { queryParams: { id: this.influencerId } });
    }
  }

  // Method to navigate to influencer requests
  navigateToRequests(): void {
    if (this.influencerId) {
      this.router.navigate(['/influencer-requests', this.influencerId]);
    }
  }

}
