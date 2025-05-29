import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, FormsModule],
  standalone: true,
  providers: [Router],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  userName: string = '';
  userPwd: string = '';
  firstName: string = '';
  lastName: string = '';
  hasUserSignedUp: boolean = true;
  signupText: string = 'Sign Up ?';

  constructor(private storageService: StorageService, private router: Router) {
  }
  ngOnInit() {
    console.log('LoginComponent initialized');
    console.log("the router is: ", this.router);
    if (this.router.url === '/signup') {
      this.hasUserSignedUp = false;
      this.signupText = 'Register';
    }
  }

  async login() {
    this.hasUserSignedUp = true;
    this.signupText = 'Sign Up ?';
    console.log('Username:', this.userName);
    console.log('Password:', this.userPwd);
    if (this.storageService.keyExists(this.userName)) {
      this.router.navigate(['/use-form']);
      sessionStorage.setItem('userName', this.userName);
    }
    console.log('SHA-256 Hash of Password:', await this.getSHA256Hash(this.userPwd));
    // Here you can add your login logic, e.g., call an authentication service        
  }

  getSHA256Hash(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    return crypto.subtle.digest('SHA-256', data).then((hashBuffer) => {
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    });
  }

  async signup() {
    this.hasUserSignedUp = false;
    this.signupText = 'Register';
    this.router.navigate(['/signup']);
    if (!this.userName || !this.userPwd || !this.firstName || !this.lastName) {
      console.log('Please fill in all fields');
      return;
    }
    if (this.storageService.keyExists(this.userName)) {
      console.log('User already exists');
      return;
    }
    let hashedPwd = await this.getSHA256Hash(this.userPwd);
    this.storageService.saveData(this.userName, hashedPwd);
    sessionStorage.setItem('userName', this.userName);
    this.router.navigate(['/use-form']);
    console.log('User signed up successfully');
    this.reset();
  }

  reset() {
    this.userName = '';
    this.userPwd = '';
    this.firstName = '';
    this.lastName = '';
    this.hasUserSignedUp = true;
    this.signupText = 'Sign Up ?';
    console.log('Form reset');
  }
}
