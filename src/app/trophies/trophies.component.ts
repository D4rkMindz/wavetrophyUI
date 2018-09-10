import { Component, OnInit } from '@angular/core';
import {Trophy} from '@app/shared/models/trophy.model';
import {MatTableDataSource} from '@angular/material';
import {TrophyService} from '@app/trophies/trophy.service';

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.scss']
})
export class TrophiesComponent implements OnInit {
  isLoading = true;
  trophies: Trophy[];
  dataSource: MatTableDataSource<Trophy> = new MatTableDataSource(null);
  displayedColumns = ['hash', 'name', 'country', 'action-edit', 'action-delete'];

  constructor(private trophyService: TrophyService) {
  }

  ngOnInit() {
    this.trophyService.getTrophies()
      .subscribe((trophies: Trophy[]) => {
        console.log(trophies);
        this.trophies = trophies;
        this.dataSource = new MatTableDataSource<Trophy>(this.trophies);
        this.isLoading = false;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteTrophy(hash: string) {

    return true;
  }

}
