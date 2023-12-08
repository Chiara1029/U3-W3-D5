import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { Favorite } from 'src/app/models/favorite';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  movies!: Movie[];
  userId: number = 0;
  apiURL = environment.apiURL;
  userInfo: UserInfo | null = null;
  favorites: Favorite[] = [];
  userFavs: Movie[] = [];

  constructor(
    private movieSrv: MovieService,
    private authSrv: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authSrv.restore();
    this.userId = this.authSrv.getUserId() || 0;

    this.userInfo = this.authSrv.getUserInfo(this.userId);
    this.getUserFavs(this.userId);
  }

  getUserFavs(userId: number) {
    this.http
      .get<Favorite[]>(`${this.apiURL}/favorites`)
      .subscribe((response) => {
        console.log('Lista preferiti:', response);
        this.favorites = response.filter(
          (favorite) => favorite.userId === userId
        );

        this.movieSrv.getMovies().subscribe((movies) => {
          this.movies = movies.filter((movie) =>
            this.favorites.some((fav) => fav.movieId === movie.id)
          );

          this.userFavs = this.movies.map((movie) => ({
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
          }));
        });
      });
  }
}
