import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../report.service';
import {ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  reportId:string = this.ActivatedRouter.snapshot.params['id']
  loginform: FormGroup
   correctPassword = "fcab0453879a2b2281bc5073e3f5fe54";
  constructor(private rs:ReportService, private router:Router,  private ActivatedRouter:ActivatedRoute, private http: HttpClient) { 
    let formControls = {
      name: new FormControl('',[ Validators.required, Validators.nullValidator]),
      password: new FormControl('', [Validators.required, Validators.nullValidator, this.passwordValidator.bind(this)]),
    }
    this.loginform = new FormGroup(formControls)
  }

  passwordValidator(control: FormControl) {
    const enteredPassword = control.value;
  
    
    this.http.get(`https://api.hashify.net/hash/md5/hex?value=${enteredPassword}`)
      .subscribe(
        (response: any) => {
          const hashedPassword = response.Digest;
          console.log(response + " " + response.Digest);
          
          if (hashedPassword !== this.correctPassword) {
            control.setErrors({ incorrectPassword: true });
          }
        }
      );
  
    
    return null;
  }

  onSubmit1() {
    this.router.navigate([`report/${this.reportId}`]);
  }

  onBack() {
    this.router.navigate([`/main`]);
  }
}
