import { Injectable } from '@angular/core';
import { IUser } from '@interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  registeredUsers: IUser[];
  userAuthenticated: IUser;

  constructor() {
    this.registeredUsers = [];
  }

  registerUser(user: IUser): boolean {
    const existUser = this.registeredUsers.find(userRegistered => userRegistered.email === user.email);
    if (!existUser) {
      this.registeredUsers.push(user);
      return true;
    }
    return false;
  }

  login(email: string, password: string): IUser {
    const existUser = this.registeredUsers.find(user => user.email === email && user.password === password);
    if (existUser) {
      this.userAuthenticated = existUser;
    }
    return existUser;
  }

  updateUser(user: IUser): IUser {
    for (let index = 0; index < this.registeredUsers.length; index++) {
      const userRegistered = this.registeredUsers[index];
      if (userRegistered.email === user.email) {
        this.registeredUsers[index] = user;
        return this.login(user.email, user.password);
      }
    }
    return null;
  }
}
