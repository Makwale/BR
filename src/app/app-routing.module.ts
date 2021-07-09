import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenudriverPage } from './pages/driver/menudriver/menudriver.page';
import { HomePage } from './pages/home/home.page';
import { MenuPage } from './pages/menu/menu.page';
import { SigninPage } from './pages/signin/signin.page';
import { SignupPage } from './pages/signup/signup.page';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: '',
        component: HomePage
        
      },
      {
        path: 'signin',
        component: SigninPage
      },
      {
        path: 'signup',
        component: SignupPage
      },
      {
        path: 'bookings',
        loadChildren: () => import('./pages/bookings/bookings.module').then( m => m.BookingsPageModule)
      },
      {
        path: 'map',
        loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
      },
      
    ],
    
  },

  {
    path: 'searchbus',
    loadChildren: () => import('./pages/searchbus/searchbus.module').then( m => m.SearchbusPageModule)
  },
  {
    path: 'editpic',
    loadChildren: () => import('./pages/editpic/editpic.module').then( m => m.EditpicPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  
  {
    path: 'menudriver',
    component: MenudriverPage,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/driver/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/driver/home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/driver/account/account.module').then( m => m.AccountPageModule)
      },


    ]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/driver/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./pages/driver/scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
