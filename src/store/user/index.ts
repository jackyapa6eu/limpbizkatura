import { makeAutoObservable } from 'mobx';

export interface IUser {
  // name: string;
  email?: string | null;
  uid?: string;
  // role: 'user' | 'admin';
}

class AuthStore {
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.user = null;
  }

  logIn(newUser: IUser | null) {
    this.user = newUser;
  }

  logOut() {
    this.user = null;
  }
}

export const authStore = new AuthStore();
