import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  http = inject(HttpClient);

  onLogin(obj: any) {
    return this.http.post("https://freeapi.miniprojectideas.com/api/EmployeeLeave/Login",obj)
  }
}
