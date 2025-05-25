import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-form',
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, FormsModule, MatSelectModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  branch: string = '';

  registerUser(){}
}
