import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material';
import {GroupService} from '@app/groups/group.service';
import {Group} from '@app/shared/models/group.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Logger} from '@app/core';
import {SnackbarService} from '@app/core/snackbar.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  @ViewChild('table') table: MatTable<Group>;
  isLoading = true;
  groups: Group[];
  dataSource: MatTableDataSource<Group> = new MatTableDataSource(null);
  displayedColumns = ['hash', 'name', 'action-edit', 'action-delete'];
  trophyHash: string;

  private logger: Logger = new Logger('Groups');

  constructor(public router: Router,
              private groupService: GroupService,
              private route: ActivatedRoute,
              private snackbar: SnackbarService) {
    this.trophyHash = this.route.snapshot.paramMap.get('trophyHash');
  }

  ngOnInit() {
    this.groupService.getGroups(this.trophyHash)
      .subscribe((groups: Group[]) => {
        this.groups = groups.reverse();
        this.dataSource = new MatTableDataSource<Group>(this.groups);
        this.isLoading = false;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addGroup(group: Group) {
    let data = [];
    if (this.table.dataSource) {
      // @ts-ignore
      data = this.table.dataSource.data;
    }
    data = data.reverse();
    this.logger.debug('Group Data', data);
    data.push(group);
    data = data.reverse();
    this.dataSource = new MatTableDataSource<Group>(data);
  }

  deleteGroup(hash: string) {
    this.logger.debug(hash);
    this.groupService.deleteGroup(this.trophyHash, hash)
      .subscribe((res: string) => {
        if (res) {
          let data = [];
          if (this.table.dataSource) {
            // @ts-ignore
            data = this.table.dataSource.data;
          }
          data = data.filter((group: Group) => {
            return group.hash !== hash;
          });
          this.dataSource = new MatTableDataSource<Group>(data);
          this.snackbar.info(res);
        }
      });
  }

}
