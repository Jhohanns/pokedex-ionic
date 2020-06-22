import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastController, ViewWillEnter } from '@ionic/angular';

import { ROUTES } from '@constants/shared-constants';
import { PROFILE } from '@constants/validation-constants';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, ViewWillEnter {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private userService: UserService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loginForm.reset();
    this.userService.userAuthenticated = null;
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  login() {
    this.router.navigateByUrl(ROUTES.POKEMON_LIST);
    if (this.loginForm.valid) {
      const user = this.userService.login(
        this.loginForm.controls.email.value,
        this.loginForm.controls.password.value
      );
      if (user) {
        this.presentToast(PROFILE.LOGIN.SUCCESS);
        this.router.navigateByUrl(ROUTES.POKEMON_LIST);
      } else {
        this.presentToast(PROFILE.LOGIN.FAILED);
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
