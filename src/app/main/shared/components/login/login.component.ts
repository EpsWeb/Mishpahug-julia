import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {Message} from '../../models/message.model';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'max-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  @Output() cancel = new EventEmitter<any>();
  @Output() registrationFromLogin = new EventEmitter<any>();

  @Output() login = new EventEmitter<any>();

  constructor(private router: Router, private userService: UserService, private authService: AuthService) {
  }

  form: FormGroup;
  message: Message;

  ngOnInit() {
    this.message = new Message('', 'danger');
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  showMessage(text, type = 'danger') {
    this.message.text = text;
    this.message.type = type;
    setTimeout(() => {
      this.message.text = '';
    }, 2500);
  }

  cancelLogin() {
    this.cancel.emit();
  }

  registration() {
    this.registrationFromLogin.emit();
  }

  onSubmit(form: NgForm) {
    const {email, password} = form.value;
    this.userService.getUserByEmail(email)
      .subscribe((user: User) => {
        if (!user) {
          this.showMessage('Email or password is wrong', 'warning');
        } else {
          if (user.password === password) {
            this.cancelLogin();
            this.authService.login();
            window.localStorage.setItem('user', JSON.stringify(user));
            this.login.emit();
            this.router.navigate(['main/fill-profile']);
            console.log(user);
          } else {
            this.showMessage('Email ot password is wrong', 'warning');
          }
        }
      });
  }

}

















