import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { Favorite } from 'src/app/models/favorite';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];
  userId: number = 0;
  apiURL = environment.apiURL;

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
    });
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

    const addBtn = document.getElementById('addBtn') as HTMLAnchorElement;
    addBtn.classList.add('d-none');
    const delBtn = document.getElementById('delBtn') as HTMLAnchorElement;
    delBtn.classList.remove('d-none');
    delBtn.classList.add('d-flex');
  }

  deleteFav(movie: Movie): void {
    const favorite: Favorite = {
      movieId: movie.id,
      userId: this.userId,
    };

    const movies = this.movies;

    // if (movies.id === favorite.movieId) {
    //   this.http
    //   .delete<Favorite>(`http://localhost:4201/favorites/${id}`, favorite)
    //   .subscribe((response) => {
    //     console.log('Eliminato dai preferiti:', response);
    //   });
    // }
  }
}
