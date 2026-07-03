import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Import Router here
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-influencer-requests',
  standalone: true,
  templateUrl: './influencer-requests.component.html',
  styleUrls: ['./influencer-requests.component.css'],
  imports: [CommonModule, FormsModule, SideBarComponent]  // Remove Router from here
})
export class InfluencerRequestsComponent implements OnInit {
  influencerId: string | null = null;
  collaborationRequests: any[] = [];
  loading: boolean = true;
  isSidebarCollapsed = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}  // Inject Router here

  ngOnInit(): void {
    // Get the influencerId from route parameters
    this.route.paramMap.subscribe(params => {
      this.influencerId = params.get('influencerId');
      if (this.influencerId) {
        this.fetchCollaborationRequests(this.influencerId);
      }
    });
  }

  // Fetch collaboration requests from the backend
  fetchCollaborationRequests(influencerId: string): void {
    this.loading = true;
    const url = `http://localhost:8080/influencer/requests/${influencerId}`;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.collaborationRequests = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching collaboration requests:', error);
        this.loading = false;
      }
    );
  }

  // Accept a collaboration request
  acceptRequest(requestId: string): void {
    if (this.influencerId) {
      this.http.put(`http://localhost:8080/influencer/requests/${this.influencerId}/${requestId}/accept`, {}).subscribe(
        (updatedRequest) => {
          // Find and update the request in the local list
          const index = this.collaborationRequests.findIndex(req => req._id === requestId);
          if (index !== -1) {
            this.collaborationRequests[index] = updatedRequest;
          }
        },
        (error) => {
          console.error('Error accepting request:', error);
          alert('Failed to accept the request.');
        }
      );
    }
  }

  // Reject a collaboration request
  rejectRequest(requestId: string): void {
    if (this.influencerId) {
      this.http.put(`http://localhost:8080/influencer/requests/${this.influencerId}/${requestId}/reject`, {}).subscribe(
        (updatedRequest) => {
          // Find and update the request in the local list
          const index = this.collaborationRequests.findIndex(req => req._id === requestId);
          if (index !== -1) {
            this.collaborationRequests[index] = updatedRequest;
          }
        },
        (error) => {
          console.error('Error rejecting request:', error);
          alert('Failed to reject the request.');
        }
      );
    }
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
