import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private alertController: AlertController,
  ) {}

  ngOnInit(): void {}

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Login Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
  }

  login() {
    if (this.email === '') {
      this.presentAlert('Please enter an email');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.presentAlert('Please enter a valid email');
      return;
    }

    if (this.password === '') {
      this.presentAlert('Please enter a password');
      return;
    }

    this.auth.login(this.email, this.password);

    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn();
  }
}
