import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private baseUrl = window.location.origin; // Backend API base URL - auto-detects localhost or production

  constructor(private http: HttpClient) {}

  // ✅ Get all registered influencers with optional filters
  getInfluencers(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    if (filters.location) params = params.set('location', filters.location);
    if (filters.brand) params = params.set('brand', filters.brand);
    if (filters.minSubscribers) params = params.set('minSubscribers', filters.minSubscribers.toString());
    if (filters.maxSubscribers) params = params.set('maxSubscribers', filters.maxSubscribers.toString());

    return this.http.get(`${this.baseUrl}/brand/influencers`, { params });
  }

  // ✅ Get unique locations dynamically
  getLocations(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/brand/influencers/locations`);
  }

  // ✅ Get unique brands dynamically
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/brand/influencers/categories`);
  }
  
  
  

  // ✅ Brand login
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/brand/login`, credentials);
  }

  // ✅ Brand signup
  signup(brandData: { username: string; password: string; brandName: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/brand/signup`, brandData);
  }

  sendRequest(requestData: { brandId: string; influencerId: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/brand/send-request`, requestData);
  }
}