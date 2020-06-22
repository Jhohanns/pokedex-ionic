import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastController } from '@ionic/angular';

import { PROFILE } from '@constants/validation-constants';
import { ROUTES } from '@constants/shared-constants';
import { IUser } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';
import { capitalCountValidator } from '@validators/capital-count.validator';
import { numberCountValidator } from '@validators/number-count.validator';
import { specialCharacterValidator } from '@validators/special-character.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signUpForm: FormGroup;
  loggedUser: IUser;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ionViewWillEnter() {
    this.loggedUser = this.userService.userAuthenticated;
    if (this.loggedUser) {
      this.setCurrentUserInfo();
    }
  }

  setCurrentUserInfo() {
    this.formControls.name.setValue(this.loggedUser.name);
    this.formControls.password.setValue(this.loggedUser.password);
    this.formControls.confirmPassword.setValue(this.loggedUser.password);
    this.formControls.email.setValue(this.loggedUser.email);
    this.formControls.email.disable();
  }

  get goBack() {
    return this.loggedUser ? ROUTES.POKEMON_LIST : ROUTES.LOGIN;
  }

  buildForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          numberCountValidator(PROFILE.PASSWORD.MIN_NUMBERS_COUNT),
          specialCharacterValidator(PROFILE.PASSWORD.MIN_SPECIAL_CHARACTERS_COUNT),
          capitalCountValidator(PROFILE.PASSWORD.MIN_CAPITALS_COUNT),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.signUpForm.controls;
  }

  get passwordsMatch() {
    return this.formControls.password.value === this.formControls.confirmPassword.value;
  }

  submitForm() {
    if (this.signUpForm.valid) {
      const user: IUser = {
        name: this.formControls.name.value,
        email: this.formControls.email.value,
        password: this.formControls.password.value,
      };
      const succes = this.loggedUser ? this.userService.updateUser(user) : this.userService.registerUser(user);

      if (succes) {
        this.router.navigateByUrl(this.goBack);
        this.presentToast(PROFILE.ACTION.SUCCESS);
      } else {
        this.presentToast(PROFILE.ACTION.FAILED);
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
