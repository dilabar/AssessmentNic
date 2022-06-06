import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/global.service';
import { Department } from 'src/app/model/department';
import { Employee } from 'src/app/model/employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  itemList:any
  depDetail:any=[];
  deptForm!:FormGroup
  formData:Employee=new Employee(); // make employee object
  deptList!: Department[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    public dialog: MatDialog,
    public global:GlobalService,
    private snackBar: MatSnackBar
    ) { }
  ngOnInit(): void {
    this.fetchDept();
    //if data id is pass
    if(this.data.id){
      this.fetchEmployee(this.data.id)
    }
  }
  // alert box
  openSnackBar(msg='',clr='mat-primary') {
    this.snackBar.open(msg, 'close', {
      duration: 3000,
      panelClass: ['mat-toolbar', clr]
    });
  }
  onSubmit(form:NgForm){
    console.log(form);

    //if employeeId is 0 we insert data other update
     if(this.formData.employeeId ==0){
      console.log("NEW");

       this.insertData(form);
     }else{
       console.log("UPDATE");

       this.updateData(form);
     }
  }
  insertData(form:NgForm){
    this.global.postData('Employee/AddEmp',form.value).subscribe((data:any)=>{
      if(data.employeeId){
        //if employeeId is response we will consider success response and close the modal
        this.openSnackBar("Successfully  Added",'mat-primary');
        this.resetForm(form);
        this.dismiss()
      }else{
        this.openSnackBar("Something went wrong",'mat-warn');
      }
    })
  }
  updateData(form:NgForm){
    this.global.putData('Employee/'+this.formData.employeeId,form.value).subscribe((data:any)=>{
      if(data.employeeId){
        //if employeeId is response we will consider success response,Reset form and close the modal
        this.openSnackBar("Successfully Updated",'mat-primary');
        this.resetForm(form);
        this.dismiss()
      }else{
        this.openSnackBar("Something went wrong",'mat-warn');
      }
    })
  }
  fetchEmployee(id:any){
    this.global.getData('Employee/'+id).subscribe((data:any)=>{
        this.formData = data as Employee;
    })
  }
  fetchDept(){
    this.global.getData('Department').subscribe((data:any)=>{
        this.deptList = data as Department[];
    })
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.formData=new Employee();
  }
  dismiss(){
    this.dialog.closeAll();
  }
}
