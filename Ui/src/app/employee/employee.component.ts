import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../global.service';
import { AddEmployeeComponent } from '../modal/add-employee/add-employee.component';
import { Employee } from '../model/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  limit=5;
  offset=0;
  dataSource!:Employee[];
  displayedColumns = ['employeeId','firstName','employeePhone','employeeGender','department', 'updatedDate','Action'];
  expandedElement: any | null;

  constructor(private global:GlobalService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchEmployee();
  }
  fetchEmployee(){
    this.global.getData('Employee/AllEmp').subscribe((data:any)=>{
      this.dataSource=data as Employee[];

    })
  }
  addEmployee(){

    const dialogRef = this.dialog.open(AddEmployeeComponent,{
      width: '900px',
      minWidth:360,
      position: {top:'5%'}

    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchEmployee();
    });

  }
  editEmp(id:any){
    const dialogRef = this.dialog.open(AddEmployeeComponent,{
      width: '900px',
      minWidth:360,
      data: {'id':id},
      position: {top:'5%'}

    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchEmployee();
    });
  }
  deleteData(id:number){
    this.global.deleteData('Employee/'+id).subscribe(data=>{
      this.fetchEmployee();
    })
  }

}
