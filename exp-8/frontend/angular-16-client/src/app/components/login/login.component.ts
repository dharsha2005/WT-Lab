import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  adminLogin() {
    const username = (document.getElementById('adminUsername') as HTMLInputElement).value;
    const password = (document.getElementById('adminPassword') as HTMLInputElement).value;

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', 'true');
      this.router.navigate(['/home']); 
    } else {
      const errorMsg = document.getElementById('error-msg');
      if (errorMsg) {
        errorMsg.style.display = 'block';
      }
    }
  }
}