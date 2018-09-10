import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTable, MatTableDataSource} from '@angular/material';
import {Location} from '@app/shared/models/location.model';
import {Logger} from '@app/core';
import {SnackbarService} from '@app/core/snackbar.service';
import {EventService} from '@app/events/event.service';
import {WaveEvent} from '@app/shared/models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  @ViewChild('table') table: MatTable<Location>;
  isLoading = true;
  events: WaveEvent[];
  dataSource: MatTableDataSource<WaveEvent> = new MatTableDataSource(null);
  displayedColumns = ['hash', 'title', 'description', 'startDay', 'endDay', 'day', 'action-edit', 'action-delete'];
  trophyHash: string;
  groupHash: string;
  locationHash: string;

  private _logger = new Logger('LOCATIONS');

  constructor(public router: Router,
              private eventService: EventService,
              private route: ActivatedRoute,
              private snackbar: SnackbarService) {
    this.trophyHash = this.route.snapshot.paramMap.get('trophyHash');
    this.groupHash = this.route.snapshot.paramMap.get('groupHash');
    this.locationHash = this.route.snapshot.paramMap.get('locationHash');
  }

  ngOnInit() {
    this.eventService.getEvents(this.trophyHash, this.groupHash, this.locationHash)
      .subscribe((events: WaveEvent[] | string) => {
        this.isLoading = false;
        this._logger.debug('loaded locations', events);
        if (typeof events === 'string') {
          this.dataSource = new MatTableDataSource<WaveEvent>(null);
          this.snackbar.info(events);
          return;
        }
        this.events = events.reverse();
        this.dataSource = new MatTableDataSource<WaveEvent>(this.events);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addEvent(event: WaveEvent) {
    let data = [];
    if (this.table.dataSource && this.table.dataSource['data']) {
      data = this.table.dataSource['data'];
    }
    data = data.reverse();
    this._logger.debug('Event Data', data);
    data.push(event);
    data = data.reverse();
    this.dataSource = new MatTableDataSource<WaveEvent>(data);
  }

  deleteEvent(hash: string) {
    console.log(hash);
    this.eventService.deleteEvent(this.trophyHash, this.groupHash, this.locationHash, hash)
      .subscribe((res: string) => {
        if (res) {
          let data = [];
          if (this.table.dataSource && this.table.dataSource['data']) {
            data = this.table.dataSource['data'];
          }
          data = data.filter((location: Location) => {
            return location.hash !== hash;
          });
          this.dataSource = new MatTableDataSource<WaveEvent>(data);
          this.snackbar.info(res);
        }
      });
  }

}
