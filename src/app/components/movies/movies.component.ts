import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { Favorite } from 'src/app/models/favorite';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserInfo } from 'src/app/models/user-info';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];
  userId: number = 0;
  apiURL = environment.apiURL;
  favorities!: Favorite[];
  userInfo: UserInfo | null = null;

  constructor(
    private movieSrv: MovieService,
    private authSrv: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authSrv.restore();

    this.movieSrv.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      console.log(movies);
      this.userId = this.authSrv.getUserId() || 0;

      this.http
        .get<Favorite[]>(`${this.apiURL}/favorites`)
        .subscribe((response) => {
          console.log('Lista preferiti:', response);
          let update: Favorite[] = response.filter(
            (movie) => movie.userId === this.userId
          );
          this.favorities = update;
        });
    });
  }

  isFavorite(movieId: number): boolean {
    return (
      Array.isArray(this.favorities) &&
      this.favorities.some((movie) => movieId === movie.movieId)
    );
  }

  addToFavs(movie: Movie): void {
    const favorite: Favorite = {
      movieId: movie.id,
      userId: this.userId,
    };

    this.http
      .post<Favorite>(`${this.apiURL}/favorites`, favorite)
      .subscribe((response) => {
        console.log('Aggiunto ai preferiti:', response);
      });
    this.http
      .get<Favorite[]>(`${this.apiURL}/favorites`)
      .subscribe((response) => {
        console.log('Lista preferiti:', response);
        let update: Favorite[] = response.filter(
          (movie) => movie.userId === this.userId
        );
        this.favorities = update;
      });
  }

  deleteFav(movie: Movie): void {
    let selectedItem: any = this.favorities.find(
      (movie) => movie.movieId === movie.movieId
    );

    this.http
      .delete<Favorite>(`http://localhost:4201/favorites/${selectedItem.id}`)
      .subscribe((response) => {
        console.log('Eliminato dai preferiti:', response);
      });

    this.http
      .get<Favorite[]>(`${this.apiURL}/favorites`)
      .subscribe((response) => {
        console.log('Lista preferiti:', response);
        let update: Favorite[] = response.filter(
          (movie) => movie.userId === this.userId
        );
        this.favorities = update;
      });
  }
}
