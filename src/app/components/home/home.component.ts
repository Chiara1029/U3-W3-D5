import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MovieService } from 'src/app/service/movie.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  topMovies!: Movie[];

  constructor(private authSrv: AuthService, private movieSrv: MovieService) {}

  ngOnInit(): void {
    this.authSrv.restore();

    this.movieSrv.getTopMovies().subscribe((topMovies: Movie[]) => {
      this.topMovies = topMovies;
    });
  }
}
