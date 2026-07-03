import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrandSideBarComponent } from '../../brand-side-bar/brand-side-bar.component';
@Component({
  selector: 'app-brand-accepted-influencers',
  standalone: true,
  imports: [CommonModule,BrandSideBarComponent],
  templateUrl: './brand-accepted-influencers.component.html',
  styleUrls: ['./brand-accepted-influencers.component.css']
})
export class BrandAcceptedInfluencersComponent implements OnInit {
  brandId: string | null = null;
  acceptedInfluencers: any[] = [];
  loading: boolean = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve brandId from localStorage
    this.brandId = localStorage.getItem('brandId');
    console.log('Brand ID from localStorage:', this.brandId); // Check if the brandId is retrieved correctly

    if (this.brandId) {
      this.fetchAcceptedInfluencers(this.brandId);
    } else {
      console.error('Brand ID not found in localStorage.');
    }
  }

  // Fetch accepted influencers from the backend
  fetchAcceptedInfluencers(brandId: string): void {
    this.loading = true;
    const url = `http://localhost:8080/brand/accepted-influencers/${brandId}`; // Replace with your actual API URL
    this.http.get<any[]>(url).subscribe(
      (data) => {
        console.log('API Response:', data); // Check the API response format
        if (data && data.length > 0) {
          this.acceptedInfluencers = data; // Assign response to the influencers array
        } else {
          console.log('No accepted influencers found.');
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching accepted influencers:', error);
        this.loading = false;
      }
    );
  }
}
