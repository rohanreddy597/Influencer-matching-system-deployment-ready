import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandSideBarComponent } from '../brand-side-bar/brand-side-bar.component';

@Component({
  selector: 'app-influencer-list',
  standalone: true,
  templateUrl: './influencer-list.component.html',
  styleUrls: ['./influencer-list.component.css'],
  imports: [CommonModule, FormsModule,BrandSideBarComponent]
})
export class InfluencerListComponent implements OnInit {
  influencers: any[] = [];
  locations: string[] = [];
  brands: string[] = [];
  selectedLocation: string = '';
  selectedCategory: string = '';
  minSubscribers: number | null = null;
  maxSubscribers: number | null = null;
  brandId ='';
  categories:any;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.getFilters(); // Load locations & brands
    this.getInfluencers();
    this.getLoggedInBrandId(); // Load influencers
  }

  // Fetch unique locations & brands
  getFilters(): void {
    this.brandService.getLocations().subscribe(
      (response) => { this.locations = response; },
      (error) => { console.error('Error fetching locations', error); }
    );

    this.brandService.getCategories().subscribe(
      (response) => {
        console.log("Raw API Response:", response); // Debugging log
        this.categories = response; // API already returns an array of categories
        console.log("Final Processed Categories:", this.categories);
      },
      (error) => {
        console.error("Error fetching categories", error);
      }
    );

    
    
  }

  // Fetch influencers with filters
  getInfluencers(): void {
    const filters = {
      location: this.selectedLocation || undefined,
      brand: this.selectedCategory|| undefined,
      minSubscribers: this.minSubscribers || undefined,
      maxSubscribers: this.maxSubscribers || undefined
    };

    this.brandService.getInfluencers(filters).subscribe(
      (response: any[]) => {
        this.influencers = response;
      },
      (error) => {
        console.error('Error fetching influencers', error);
      }
    );
  }

  getLoggedInBrandId(): void {
    const storedBrandId = localStorage.getItem("brandId");
    if (storedBrandId) {
      this.brandId = storedBrandId;
    } else {
      console.error("Brand ID not found. User might not be logged in.");
    }
  }

  sendRequest(influencerId: string): void {
    const requestData = {
      brandId: this.brandId, // Use the logged-in brand's ID
      influencerId: influencerId
    };

    this.brandService.sendRequest(requestData).subscribe(
      (response) => {
        alert("Request sent successfully!"); // You can replace this with a toast message
      },
      (error) => {
        alert("Failed to send request. " + error.error?.message || "Try again later.");
      }
    );
}
}