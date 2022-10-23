import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  response: any  
  errorMsg: string = ''

  constructor(private service: AuthService, private route: Router) { }

  login = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)    
  })  

  ngOnInit(): void {
  }
  proceedLogin() {
    if (this.login.valid) {
      this.service.proceedLogin({...this.login.value, personal_data_access: true}).subscribe(result => {
        if (result) {
            this.response = result
            localStorage.setItem('token', this.response.data.access_token)
            this.route.navigate(['devices'])
          }}, (error: any) => {          
          this.errorMsg = error.error.error.data.msg                 
      })
    } else {
      this.errorMsg = 'Введите почту и пароль'
    }
    this.login.reset()
  }

}
