import { Component, inject, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './leave.html',
  styleUrl: './leave.css'
})
export class Leave implements OnInit {
  isModalOpen: boolean = false; // modal flag
  activeTab: string = 'myLeave'; // 👈 Default tab

  employeeService = inject(EmployeeService)
  leaveList: any[] = []
  approvalleaveList: any[] = []

  leaveForm: FormGroup = new FormGroup({
    leaveId: new FormControl(0),
    employeeId: new FormControl(0),
    fromDate: new FormControl(''),
    toDate: new FormControl(''),
    noOfDays: new FormControl(''),
    leaveType: new FormControl(''),
    details: new FormControl(''),
    isApproved: new FormControl(false),
    approvedDate: new FormControl(null),
  });

  constructor() {
    const loggedData = localStorage.getItem("leaveUser")
    if (loggedData != null) {
      const loggedDataParse = JSON.parse(loggedData)
      this.leaveForm.controls['employeeId'].setValue(loggedDataParse.employeeId)
    }
  }

  ngOnInit(): void {
    this.loadLeaves()
    this.getAllLeaves()
  }

  // 👇 Fix: now changeTab works
  changeTab(tab: string) {
    this.activeTab = tab;
  }

  loadLeaves() {
    const empId = this.leaveForm.controls['employeeId'].value
    this.employeeService.getAllLeavesByEmpId(empId).subscribe({
      next: (result: any) => {
        this.leaveList = result.data
      }
    })
  }

  getAllLeaves() {
    this.employeeService.getAllLeaves().subscribe({
      next: (result: any) => {
        this.approvalleaveList = result.data.filter((m: any) => m.isApproved == null)
      }
    })
  }

  onSave() {
    const formValue = this.leaveForm.value
    this.employeeService.onAddLeave(formValue).subscribe({
      next: () => {
        this.loadLeaves()
        this.closeModal()
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

  approveRequest(id: number) {
    this.employeeService.getApproveLeaves(id).subscribe({
      next: () => {
        this.getAllLeaves()
      }
    })
  }

  rejectRequest(id: number) {
    this.employeeService.getRejectLeaves(id).subscribe({
      next: () => {
        this.getAllLeaves()
      }
    })
  }
}
