import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
// import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  
  constructor(
    // private authService: AuthService,
    private router: Router,
    // private toast: ToastService
  ){}

  ngOnInit(): void {
    localStorage.removeItem('token')
  }

  form: FormGroup<{ email:FormControl<string | null>, password:FormControl<string | null> }> = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  public async onSubmit() {
    // if(this.form.invalid) {
    //   this.toast.show({ body: 'Favor de completar todos los campos' })
    //   return
    // };

    try {
      // const {email, password} = this.form.value
      // const { token } = await this.authService.login({
      //   email: email ?? '',
      //   password: password ?? ''
      // })

      // localStorage.setItem('token', token);
      this.router.navigate(['/shop']);
    } catch (error: any) {
      // this.toast.show({ body: error.error.error || 'Ocurrió un error' })
      console.error(error)
    }
  }
}