import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../global.service';
import { AddDepartmentComponent } from '../modal/add-department/add-department.component';
import { Department } from '../model/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  limit=5;
  offset=0;
  dataSource!:Department[];
  displayedColumns = ['departmentId','departmentName', 'modifiedDate','Action'];
  expandedElement: any | null;

  constructor(private global:GlobalService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchDepartment();
  }
  fetchDepartment(){
    this.global.getData('Department').subscribe((data:any)=>{
      this.dataSource=data as Department[];

    })
  }
  addDeprt(){

    const dialogRef = this.dialog.open(AddDepartmentComponent,{
      width: '900px',
      minWidth:360,
      position: {top:'5%'}

    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchDepartment();
    });

  }
  editDept(id:any){
    const dialogRef = this.dialog.open(AddDepartmentComponent,{
      width: '900px',
      minWidth:360,
      data: {'id':id},
      position: {top:'5%'}

    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchDepartment();
    });
  }
  deleteData(id:number){
    this.global.deleteData('Department/'+id).subscribe(data=>{
      this.fetchDepartment();
    })
  }

}
