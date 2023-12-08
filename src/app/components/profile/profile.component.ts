import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { Favorite } from 'src/app/models/favorite';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthData } from 'src/app/auth/auth-data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  movies!: Movie[];
  // userInfo: AuthData;
  apiURL = environment.apiURL;

  constructor(
    private movieSrv: MovieService,
    private authSrv: AuthService,
    private http: HttpClient
  ) // private userInfo: AuthData
  {}

  ngOnInit(): void {
    this.authSrv.restore();

    // this.userInfo = this.authSrv.getUserInfo()
  }
}
