import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../../../../firebase-config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Router, RouterLink } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import Swal from 'sweetalert2';
import { AuthLoginService } from '../../../services/auth-login.service';
import { Admin } from '../../../interface/users/admin';

@Component({
  selector: 'app-page-login',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule, Toast, FloatLabelModule, InputGroupAddonModule, InputTextModule, SelectModule, InputNumberModule, PasswordModule, ButtonModule, CardModule],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css',
  providers: [MessageService]
})
export class PageLoginComponent {

  private isLoading : boolean = false
  private formLogin! : FormGroup
  private admin : Admin = {
    username : '',
    password : ''
  }

  constructor(private router: Router, private authLoginService : AuthLoginService, private messageService: MessageService){
    this.formLogin = new FormGroup({
      login : new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  get FormLogin() { return this.formLogin }

  login()
  {
    
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    this.isLoading = true
    this.admin = {
      username : this.formLogin.value.login,
      password : this.formLogin.value.password
    }
    

    
    if(this.formLogin.valid) {
      signInWithEmailAndPassword(auth, this.admin.username, this.admin.password)
      .then((response) => {
        this.authLoginService.postLoginAuth(this.admin).subscribe((response_auth) => {
          if (response_auth.success == true) {
            this.isLoading = false
            this.router.navigate(['/admin/dashboard'])
          }
        },
        (error) => {
          this.showMessage("error", "Acceso denegado", "No cuentas con las credenciales adecuadas para entrar al Dashboard")
        })
      })
      .catch((error) => {
        this.isLoading = false
        this.showMessage("error", "Autenticacíon fallida", "No existen las credenciales proporcionadas.")
      })
    }
    else {
      this.showMessage("info", "Datos erroneos", "Rellene los campos respectivos")
    }
  }

  showMessage(type: string, title : string, message: string) {
    this.messageService.add({ severity: type, summary: title, detail: message });
  }
}
