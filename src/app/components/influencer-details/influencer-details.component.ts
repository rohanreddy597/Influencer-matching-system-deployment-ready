import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfluencerService } from '../../services/influencer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-influencer-details',
  standalone: true,
  templateUrl: './influencer-details.component.html',
  styleUrls: ['./influencer-details.component.css'],
  imports: [CommonModule, FormsModule]
})
export class InfluencerDetailsComponent implements OnInit {
  influencerData: any = {};
  category: string = '';
  location: string = '';
  email: string = '';  // ✅ Added email field

  constructor(
    private route: ActivatedRoute,
    private influencerService: InfluencerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch influencer data from URL parameters
    this.route.queryParams.subscribe((params) => {
      this.influencerData.channelName = params['channelName'];
      this.influencerData.profileImage = params['profileImage'];
      this.influencerData.subscribers = params['subscribers'];
      this.influencerData.totalViews = params['totalViews'];
      this.influencerData.videoCount = params['videoCount'];
    });
  }

  // Method to register the influencer
  registerInfluencer(): void {
    if (!this.email || !this.category || !this.location) {
      alert('Please fill in all fields!');
      return;
    }

    const influencer = {
      ...this.influencerData,
      email: this.email,  // ✅ Include email in the request
      category: this.category,
      location: this.location,
    };

    this.influencerService.registerInfluencer(influencer).subscribe(
      (response) => {
        alert('Influencer registered successfully!');
        this.router.navigate(['/']);
      },
      (error) => {
        alert('Failed to register influencer.');
        console.error(error);
      }
    );
  }
}
