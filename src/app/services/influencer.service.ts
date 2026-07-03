import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfluencerService {

  private baseUrl = window.location.origin; // Backend API base URL - auto-detects localhost or production

  constructor(private http: HttpClient) {}

  // Register influencer details
  registerInfluencer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register-influencer`, data);
  }

  // Fetch all registered influencers (for the brand)
  getAllInfluencers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/brand/influencers`);
  }

   // Update influencer details by ID
   updateInfluencer(id: string, influencerDetails: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/influencers/${id}`, influencerDetails);
  }
   // Get influencer details by ID
   getInfluencerById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/influencers/${id}`);
  }
}
