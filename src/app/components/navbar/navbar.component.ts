import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signOut } from '@firebase/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user$: any;

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user$ = user;
      } else {
        this.user$ = null;
      }
    });
  }

  ngOnInit(): void {}

  async logout(): Promise<any> {
    await signOut(this.auth);
    this.router.navigate(['']);
  }
}
