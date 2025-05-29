import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-enrolled-users-list',
  imports: [MatTableModule],
  templateUrl: './enrolled-users-list.component.html',
  styleUrl: './enrolled-users-list.component.scss'
})
export class EnrolledUsersListComponent implements OnInit {

  @Input() registerdUsers!: any[];
  displayedColumns: string[] = ['fullName', 'branch', 'email'];
  dataSource = this.registerdUsers || [];
  ngOnInit(): void {

    // {
    //     "fName": "test",
    //     "mName": "user",
    //     "lName": "hhkj",
    //     "mail": ",amp",
    //     "userBranch": "Civil"
    // }
    console.log('EnrolledUsersListComponent initialized with users:', this.registerdUsers);
    if(this.registerdUsers){
      this.dataSource = this.registerdUsers;
    }
  }
  getFullName(obj: any): string {
    return `${obj.fName} ${obj.mName} ${obj.lName}`.trim();
  }
}
