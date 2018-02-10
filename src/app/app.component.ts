import { Component, OnInit } from "@angular/core";
import { ApiService } from "./services/api.service";
import { HostListener } from '@angular/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  url = "https://uinames.com/api/?ext";
  uinames: IUinames;
  space: boolean;
  bounceIn: boolean
  constructor(public _apiService: ApiService) {
    this.uinames = {
      name: '',
      surname: '',
      gender: '',
      region: '',
      age: 0,
      title: '',
      phone: '',
      birthday: {
        dmy: '',
        mdy: '',
        raw: 0
      },
      email: '',
      password: '',
      photo: ''
    }
  }

  ngOnInit() {
    this.space = false;
  }

  petition() {
    this.bounceIn = false;
    this._apiService.getUinames()
      .subscribe((data: any) => {
        this.uinames = {
          name: data.name,
          surname: data.surname,
          gender: data.gender,
          region: data.region,
          age: data.age,
          title: data.title,
          phone: data.phone,
          birthday: {
            dmy: data.birthday.dmy,
            mdy: data.birthday.mdy,
            raw: data.birthday.raw
          },
          email: data.email,
          password: data.password,
          photo: data.photo
        }
        setTimeout(() => {
          this.bounceIn = true;
          this.space = true;
        }, 500);
      }, err => console.log(err));
  }

  @HostListener('window:keydown', ['$event'])
  eventHandler(keyCode) {
    if (keyCode.code == 'Space') {
      this.petition()
    }
  }

  close() {
    this.space = false;
  }
}

export interface IUinames {
  name: string;
  surname: string;
  gender: string
  region: string,
  age: number,
  title: string,
  phone: string,
  birthday: {
    dmy: string
    mdy: string
    raw: number
  },
  email: string,
  password: string
  credit_card?: {
    expiration: string,
    number: string,
    pin: string,
    security: string
  },
  photo: string
}
