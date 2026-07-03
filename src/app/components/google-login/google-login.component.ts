import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.css'
})
export class GoogleLoginComponent {
  constructor(private authService: AuthService) {}

  // Method to trigger Google OAuth login
  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
}
