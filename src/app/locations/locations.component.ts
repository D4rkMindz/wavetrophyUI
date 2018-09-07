import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material';
import {Group} from '../shared/models/group.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackbarService} from '../core/snackbar.service';
import {LocationService} from '@app/locations/location.service';
import {Location} from '@app/shared/models/location.model';
import {Logger} from '@app/core';

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

  private _logger = new Logger('LOCATIONS');

  constructor(public router: Router,
              private locationService: LocationService,
              private route: ActivatedRoute,
              private snackbar: SnackbarService) {
    this.trophyHash = this.route.snapshot.paramMap.get('trophyHash');
    this.groupHash = this.route.snapshot.paramMap.get('groupHash');
  }

  uploadImages() {}

  ngOnInit() {
    this.locationService.getLocations(this.trophyHash, this.groupHash)
      .subscribe((locations: Location[]|string) => {
        this.isLoading = false;
        this._logger.debug('loaded locations', locations);
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
    // TODO addLocation implement method that inserts the locaiton into the dataset
  }

  deleteLocation(hash: string) {
    // TODO deleteLocation implement method that removes the location from the dataset
  }

}
