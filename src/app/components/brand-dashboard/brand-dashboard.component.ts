import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandSideBarComponent } from '../brand-side-bar/brand-side-bar.component';

@Component({
  selector: 'app-brand-dashboard',
  standalone: true,
  templateUrl: './brand-dashboard.component.html',
  styleUrls: ['./brand-dashboard.component.css'],
  imports :[CommonModule,FormsModule,BrandSideBarComponent]
})
export class BrandDashboardComponent implements OnInit {
  influencers: any[] = [];
  errorMessage: string = '';

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
   
  }

 
}
