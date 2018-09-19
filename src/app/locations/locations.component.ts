import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from '../core/snackbar.service';
import {LocationService} from './location.service';
import {Location} from '../shared/models/location.model';
import {Logger} from '../core';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  @ViewChild('table') table: MatTable<Location>;
  isLoading = true;
  locations: Location[];
  dataSource: MatTableDataSource<Location> = new MatTableDataSource(null);
  displayedColumns = ['hash', 'name', 'description', 'address', 'action-edit', 'action-delete'];
  trophyHash: string;
  groupHash: string;

  private logger = new Logger('LOCATIONS');

  constructor(public router: Router,
              private locationService: LocationService,
              private route: ActivatedRoute,
              private snackbar: SnackbarService) {
    this.trophyHash = this.route.snapshot.paramMap.get('trophyHash');
    this.groupHash = this.route.snapshot.paramMap.get('groupHash');
  }

  ngOnInit() {
    this.locationService.getLocations(this.trophyHash, this.groupHash)
      .subscribe((locations: Location[] | string) => {
        this.isLoading = false;
        this.logger.debug('loaded locations', locations);
        if (typeof locations === 'string') {
          this.dataSource = new MatTableDataSource<Location>(null);
          this.snackbar.info(locations);
          return;
        }
        this.locations = locations.reverse();
        this.dataSource = new MatTableDataSource<Location>(this.locations);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addLocation(location: Location) {
    let data = [];
    if (this.table.dataSource && this.table.dataSource['data']) {
      data = this.table.dataSource['data'];
    }
    data = data.reverse();
    this.logger.debug('Locationdata Data', data);
    data.push(location);
    data = data.reverse();
    this.dataSource = new MatTableDataSource<Location>(data);
  }

  deleteLocation(hash: string) {
    this.logger.debug(hash);
    this.locationService.deleteLocation(this.trophyHash, this.groupHash, hash)
      .subscribe((res: string) => {
        if (res) {
          let data = [];
          if (this.table.dataSource && this.table.dataSource['data']) {
            data = this.table.dataSource['data'];
          }
          data = data.filter((location: Location) => {
            return location.hash !== hash;
          });
          this.dataSource = new MatTableDataSource<Location>(data);
          this.snackbar.info(res);
        }
      });
  }

}
