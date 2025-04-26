import { Routes } from '@angular/router';

import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent},
  { path: 'login', component: LoginComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'sign-up', component: SignUpComponent},
  { path: '**', redirectTo: 'login' }
];
