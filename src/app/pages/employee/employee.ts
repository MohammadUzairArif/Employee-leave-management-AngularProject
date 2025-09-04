import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee-service';
import { APIResponseModel, EmployeeList, EmployeeModel } from '../../models/login.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [AsyncPipe, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  employeeService = inject(EmployeeService);
  employeeList: EmployeeList[] = [];
  isModalOpen: boolean = false; // modal flag
  employeeObj: EmployeeModel = new EmployeeModel();

  deptList$: Observable<any[]> = new Observable<any[]>();
  roleList$: Observable<any[]> = new Observable<any[]>();

  ngOnInit(): void {
    this.getEmployee();
    this.deptList$ = this.employeeService.getDepartments();
    this.roleList$ = this.employeeService.getRoles();
  }

  getEmployee() {
    this.employeeService.getAllEmployees().subscribe({
      next: (response: APIResponseModel) => {
        this.employeeList = response.data;
      },
      error: () => {},
    });
  }

  // Open modal
  openModal() {
    this.isModalOpen = true;
  }

  // Close modal
  closeModal() {
    this.isModalOpen = false;
  }

  onSaveEmployee() {
    this.employeeService.onSaveNewEmployee(this.employeeObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.getEmployee();
          alert('Employee Created Successfully');
        } else {
          alert(res.message);
        }
      },
      error: () => {},
    });
  }
}
