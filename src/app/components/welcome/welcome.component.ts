import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  user$: any;

  constructor(private auth: Auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user$ = user;
      } else {
        this.user$ = null;
      }
    });
  }

  ngOnInit(): void {}
}
