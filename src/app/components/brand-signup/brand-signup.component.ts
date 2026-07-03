import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-brand-signup',
  standalone: true,
  templateUrl: './brand-signup.component.html',
  styleUrls: ['./brand-signup.component.css'],
  imports:[CommonModule,FormsModule],
  providers: [HttpClient, BrandService]

})
export class BrandSignupComponent {
  username: string = '';
  password: string = '';
  brandName: string = '';
  errorMessage: string = '';
  signupSuccess: boolean = false;

  constructor(private brandService: BrandService, private router: Router) {}

  onSubmit() {
    const brandData = {
      username: this.username,
      password: this.password,
      brandName: this.brandName
    };
  
    this.brandService.signup(brandData).subscribe(
      (response) => {
        console.log('Brand signup successful:', response);
        // Set signupSuccess to true to display the success message

        this.signupSuccess = true;
      
        
        // Optionally, redirect to the brand login page or dashboard after a successful signup
        setTimeout(() => {
          this.router.navigate(['/brand/login']);
        }, 2000);  // Wait for 2 seconds before redirecting (can be adjusted as needed)
      },
      (error) => {
        console.error('Brand signup error:', error);
        this.errorMessage = 'Failed to create brand. Please try again.';
      }
    );
  }
  
}
