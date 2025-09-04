import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee-service';
import { APIResponseModel, EmployeeList } from '../../models/login.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [AsyncPipe],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit {
  employeeService = inject(EmployeeService)
  employeeList: EmployeeList[]=[]
   isModalOpen: boolean = false; // modal flag

  deptList$:Observable<any[]> = new Observable<any[]>

 ngOnInit(): void {
  this.getEmployee()
   this.deptList$ = this.employeeService.getDepartments()
 }

 getEmployee(){
  this.employeeService.getAllEmployees().subscribe({
    next: (response: APIResponseModel) =>{
      this.employeeList = response.data
    },
    error:()=>{

    }
  })
 }

 
  // Open modal
  openModal() {
    this.isModalOpen = true;
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
  }
}
