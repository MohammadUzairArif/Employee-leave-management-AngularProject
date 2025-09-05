import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APIResponseModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http = inject(HttpClient);

  onLogin(obj: any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login", obj);
  }

  getAllEmployees():Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetEmployees")
  }

  getDepartments(){
    return this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetDepartments").pipe(
      map((res:any)=>res.data)
    )
  }
   getRoles(){
    return this.http.get("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllRoles").pipe(
      map((res:any)=>res.data)
    )
  }
   onSaveNewEmployee(obj: any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/CreateEmployee", obj);
  }

  onAddLeave(obj: any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/AddLeave", obj);
  }

  getAllLeavesByEmpId(empId:number):Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>("https://freeapi.miniprojectideas.com/api/EmployeeLeave/GetAllLeavesByEmployeeId?id="+empId
      
    )
  }
}
