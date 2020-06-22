import { ROUTES } from '@constants/shared-constants';
import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';

import { NavController } from '@ionic/angular';

import { UserService } from '@services/user.service';

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(
        public user: UserService,
        private navCtrl: NavController
    ) { }

    canLoad(): boolean {
        const isAuthenticated = this.user.userAuthenticated;
        if (!isAuthenticated) {
            this.navCtrl.navigateRoot(ROUTES.LOGIN);
            return false;
        }
        return true;
    }

}
