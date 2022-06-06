import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from 'src/app/global.service';
import { Department } from 'src/app/model/department';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  itemList:any
  depDetail:any=[];
  deptForm!:FormGroup
  formData:Department=new Department(); // make department object
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {id: number},
    public dialog: MatDialog,
    public global:GlobalService,
    public formBuilder: FormBuilder,
    private snackBar: MatSnackBar
    ) { }
  ngOnInit(): void {
    //if data id is pass
    if(this.data.id){
      this.fetchDepartment(this.data.id)
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
    //if departmentId is 0 we insert data other update
     if(this.formData.departmentId ==0){
       this.insertData(form);
     }else{
       this.updateData(form);
     }
  }
  insertData(form:NgForm){
    this.global.postData('Department/AddDept',form.value).subscribe((data:any)=>{
      if(data.departmentId){
        //if DepartmentId is response we will consider success response and close the modal
        this.openSnackBar("Successfully  Added1",'mat-primary');
        this.resetForm(form);
        this.dismiss()
      }else{
        this.openSnackBar("Something went wrong",'mat-warn');
      }
    })
  }
  updateData(form:NgForm){
    this.global.putData('Department/'+this.formData.departmentId,form.value).subscribe((data:any)=>{
      if(data.departmentId){
        //if DepartmentId is response we will consider success response,Reset form and close the modal
        this.openSnackBar("Successfully  Added1",'mat-primary');
        this.resetForm(form);
        this.dismiss()
      }else{
        this.openSnackBar("Something went wrong",'mat-warn');
      }
    })
  }
  fetchDepartment(id:any){
    this.global.getData('Department/'+id).subscribe((data:any)=>{
        this.formData = data;
    })
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.formData=new Department();
  }
  dismiss(){
    this.dialog.closeAll();
  }
}
