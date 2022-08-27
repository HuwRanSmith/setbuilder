import { Component, OnInit } from '@angular/core';
import { Auth, signInWithCustomToken } from '@angular/fire/auth';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  code?: string;
  token: string = '';

  redirectFunction: (data: any) => Observable<any>;
  tokenFunction: (data: any) => Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private functions: Functions,
    private auth: Auth,
    private spotify: SpotifyService
  ) {
    this.redirectFunction = httpsCallableData(this.functions, 'redirect');
    this.tokenFunction = httpsCallableData(this.functions, 'token');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.code = params['code'];
    });
    if (!this.code) {
      this.redirectFunction({}).subscribe((response) => {
        window.location.href = response.authorizeURL;
      });
    } else {
      this.tokenFunction({ code: this.code }).subscribe((response) => {
        this.token = response.firebaseToken;
        this.login();
        this.router.navigate(['/']);
      });
    }
  }

  async login() {
    await signInWithCustomToken(this.auth, this.token);
  }
}
