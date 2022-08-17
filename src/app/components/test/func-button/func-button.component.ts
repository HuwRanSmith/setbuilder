import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-func-button',
  templateUrl: './func-button.component.html',
  styleUrls: ['./func-button.component.css'],
})
export class FuncButtonComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  public callHelloWorld(): void {
    this.http
      .get(
        'https://us-central1-setbuilder-a706f.cloudfunctions.net/helloWorld',
        { responseType: 'text' }
      )
      .subscribe((a) => {
        console.log(a);
      });
  }
}
