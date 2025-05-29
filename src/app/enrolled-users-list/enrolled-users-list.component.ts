import { Component, Input, OnChanges } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-enrolled-users-list',
  imports: [MatTableModule],
  templateUrl: './enrolled-users-list.component.html',
  styleUrl: './enrolled-users-list.component.scss'
})
export class EnrolledUsersListComponent implements OnChanges {

  @Input() registerdUsers!: any[];
  displayedColumns: string[] = ['fullName', 'branch', 'email'];
  dataSource = this.registerdUsers || [];
 

  ngOnChanges(): void {
  if(this.registerdUsers){
      this.dataSource = this.registerdUsers;
    }
  }
  getFullName(obj: any): string {
    return `${obj.fName} ${obj.mName} ${obj.lName}`.trim();
  }
}
