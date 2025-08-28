import { Component, inject } from '@angular/core';
import { FormControl, FormGroup,  ReactiveFormsModule } from '@angular/forms';

import { EmployeeService } from '../../services/employee-service';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginData: LoginModel = new LoginModel()

  loginForm: FormGroup = new FormGroup({
    emailId: new FormControl(this.loginData.emailId),
    password: new FormControl(this.loginData.password)
  })


  employeeService = inject(EmployeeService)
  router = inject(Router)
  onLogin() {
    console.log(this.loginForm.value);
    this.employeeService.onLogin(this.loginForm).subscribe({
      next: (response: any) => {
        if(response.result){
          alert("Login Successfully")
          localStorage.setItem("leaveUser",JSON.stringify(response.data))
          this.router.navigateByUrl("/dashboard")
        }else{
          alert(response.message)
        }
      },
      error: () => {
        alert("API Error")
      }
    })

  }
}
