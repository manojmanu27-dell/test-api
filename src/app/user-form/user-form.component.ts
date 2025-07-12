import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
// import { EnrolledUsersListComponent } from '../enrolled-users-list/enrolled-users-list.component';
import { StorageService } from '../storage.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-user-form',
  imports: [NgIf, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, FormsModule, MatSelectModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  branch: string = '';
  email: string = '';
  uniqueId: string = '';
  data: any = [];

  constructor(private storageService: StorageService) { }
  registerUser(form: any) {
    console.log('Form reset', form.form.value);
    let userName = sessionStorage.getItem('userName') || '';
    let userData = form.form.value;
    if (userName && sessionStorage.getItem(userName)) {
      console.log('User already exists, updating data');
      let existingData = sessionStorage.getItem(userName) || '[]';
      existingData = JSON.parse(existingData);
      this.data = [...existingData, userData];
      let updatedData = JSON.stringify(this.data);
      sessionStorage.setItem(userName, updatedData);
    } else {
      this.data = [userData];
      let updatedData = JSON.stringify(this.data);
      sessionStorage.setItem(userName, updatedData);
    }
    this.uniqueId = uuidv4();

    this.reset(form);
  }

  reset(form: any) {
    console.log('Form reset', form);
    form.resetForm();
    // this.firstName = '';
    // this.middleName = '';
    // this.lastName = '';
    // this.branch = '';
    // this.email = '';
  }

}
