import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfluencerService } from '../../services/influencer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-influencer-profile',
  standalone: true,
  templateUrl: './influencer-profile.component.html',
  styleUrls: ['./influencer-profile.component.css'],
  imports:[CommonModule,FormsModule,SideBarComponent],

})
export class InfluencerProfileComponent implements OnInit {
  influencerId: string= '';
  influencerDetails: any = {
    channelName: '',
    profileImage: '',
    subscribers: '',
    totalViews: '',
    videoCount: '',
    category: '',
    location: '',
    email: ''
  };
  isEditing: boolean = false;

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('collapsed');
    }
  }

  constructor(
    private route: ActivatedRoute,
    private influencerService: InfluencerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.influencerId = params['id'];
      console.log("Influencer Profile ID:", this.influencerId); // Check the ID
      if (this.influencerId) {
        this.loadInfluencerDetails();
      }
    });
  }
  
  // Load influencer details
  loadInfluencerDetails() {
    this.influencerService.getInfluencerById(this.influencerId).subscribe(
      (data) => {
        this.influencerDetails = data;
      },
      (error) => {
        console.error('Error fetching influencer details:', error);
      }
    );
  }

  // Toggle editing mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  // Update influencer details
  updateInfluencer() {
    this.influencerService.updateInfluencer(this.influencerId, this.influencerDetails).subscribe(
      (response) => {
        console.log('Influencer details updated successfully', response);
        this.isEditing = false;
        this.loadInfluencerDetails(); // Refresh details
      },
      (error) => {
        console.error('Error updating influencer details:', error);
      }
    );
  }
}
