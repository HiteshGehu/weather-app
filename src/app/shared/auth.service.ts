import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
  ) {}

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');

        if (res.user?.emailVerified == true) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        this.presentAlert('Login Error', err.message);
        this.router.navigate(['/login']);
      },
    );
  }

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        this.presentAlert('Registration', 'Registration Successful');
        this.sendEmailForVarification(res.user);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.presentAlert('Registration Error', err.message);
        this.router.navigate(['/register']);
      },
    );
  }

  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.presentAlert('Logout Error', err.message);
      },
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.presentAlert(
          'Reset Password',
          'Password reset email sent successfully.',
        );
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        this.presentAlert(
          'Reset Password Error',
          'Something went wrong. Please try again.',
        );
      },
    );
  }

  sendEmailForVarification(user: any) {
    user.sendEmailVerification().then(
      (res: any) => {
        this.presentAlert('Verification', 'Verification email sent.');
        this.router.navigate(['/verify-email']);
      },
      (err: any) => {
        this.presentAlert(
          'Verification Error',
          'Unable to send verification email.',
        );
      },
    );
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token', JSON.stringify(res.user?.uid));
      },
      (err) => {
        this.presentAlert('Google Sign-In Error', err.message);
      },
    );
  }
}
