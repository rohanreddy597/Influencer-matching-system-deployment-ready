import { Route } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrandLoginComponent } from './components/brand-login/brand-login.component';
import { BrandSignupComponent } from './components/brand-signup/brand-signup.component';
import { InfluencerDetailsComponent } from './components/influencer-details/influencer-details.component'; // Import the component
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { InfluencerListComponent } from './components/influencer-list/influencer-list.component';
import { InfluencerProfileComponent } from './components/influencer-profile/influencer-profile.component';
import { InfluencerRequestsComponent } from './components/influencer-requests/influencer-requests.component';
import { BrandAcceptedInfluencersComponent } from './components/brand-login/brand-accepted-influencers/brand-accepted-influencers.component';
import { InfluencerLandingComponent } from './components/influencer-landing/influencer-landing.component';
import { BrandLandingComponent } from './components/brand-landing/brand-landing.component';
import { BrandDashboardComponent } from './components/brand-dashboard/brand-dashboard.component';


export const routes: Route[] = [
  { path: '', component: LandingPageComponent },
  { path: 'brand/login', component: BrandLoginComponent },
  { path: 'signup', component: BrandSignupComponent },
  { path: 'influencer-details', component: InfluencerDetailsComponent } ,
  {path: 'login', component: GoogleLoginComponent},
  {path:'influencer-list',component:InfluencerListComponent},
  {path:'influencer-profile',component:InfluencerProfileComponent},
  { path: 'influencer-requests/:influencerId', component: InfluencerRequestsComponent},
  {path:'brand/accepted-influencers',component:BrandAcceptedInfluencersComponent},
  { path: 'influencer-dashboard', component: InfluencerLandingComponent },
  {path:'brand-landing',component:BrandLandingComponent},
  {path:'brand-dashboard',component:BrandDashboardComponent}

];
