import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-brand-login',
  standalone: true,
  templateUrl: './brand-login.component.html',
  styleUrls: ['./brand-login.component.css'],
  imports:[FormsModule,CommonModule]
})
export class BrandLoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void {}

  // Handle brand login
  login(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }
  
    this.brandService.login({ username: this.username, password: this.password }).subscribe(
      (response) => {
        if (response && response.brandId) { // Ensure brandId exists in response
          localStorage.setItem("brandId", response.brandId); // Store Brand ID
        }
  
        this.successMessage = 'Logged in successfully!';
        this.router.navigate(['/brand-dashboard']); // Navigate after login
        //this.router.navigate(['brand/accepted-influencers'])
      },
      (error) => {
        this.errorMessage = 'Invalid username or password.';
        console.error(error);
      }
    );
  }
  
}
