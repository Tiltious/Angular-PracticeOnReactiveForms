import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform:any;
  constructor(private formBuilder:FormBuilder,private  router:Router,private userv:UserServiceService) { 
    this.loginform = this.formBuilder.group({
      logusername:['',[Validators.required,Validators.minLength(6),Validators.maxLength(15)]],
      // Regex pattern allows only passwords with at least 8 characters, 1 upper case, 1 digit, 1 special character
      logpassword:['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$')]]
    })
  }
  get logusername(){return this.loginform.get('logusername');}


  get logpassword(){return this.loginform.get('logpassword');}

  hidden:boolean = true;
  ngOnInit(): void {
  }
  onLogin(){
      if (this.loginform.valid) {
      this.userv.getUsers().subscribe(
        (users:any)=>{
          for(let token in users){          
            if (users[token].username==this.loginform.value.logusername&&users[token].password==this.loginform.value.logpassword) {
              //asq1a112!A22
              localStorage.setItem('token',token);
              console.log(localStorage.getItem('token'));
              this.router.navigate(['dashboard']);
            }            
          }
          this.loginform.reset();
        }
      )
    }
    
    //console.log(localStorage.getItem('token'),'this.loginform.value.logusername');
    //!!localStorage.getItem('token')?this.router.navigate(['dashboard']):this.router.navigate(['main']);
  }
  

}
