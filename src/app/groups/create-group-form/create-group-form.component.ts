import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GroupService} from '@app/groups/group.service';
import {FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {SnackbarService} from '@app/core/snackbar.service';
import {extract} from '@app/core';
import {GroupModel} from '@app/shared/models/group.model';

@Component({
  selector: 'app-create-group-form',
  templateUrl: './create-group-form.component.html',
  styleUrls: ['./create-group-form.component.scss']
})
export class CreateGroupFormComponent implements OnInit {

  @Input('trophyHash') trophyHash: string;
  @Output('onGroupCreated') output: EventEmitter<{hash: string, name: string}> = new EventEmitter();
  @ViewChild('createGroupDirective') directive: NgForm;

  formGroup: FormGroup;

  constructor(private groupService: GroupService,
              private fb: FormBuilder,
              private snackbar: SnackbarService) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(250), Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    if (!(this.trophyHash)) {
      throw new Error('trophyHash is required on app-create-form-group');
    }
  }

  createGroup() {
    if (!this.formGroup.valid) {
      return;
    }
    const name = this.formGroup.controls['name'].value;
    this.groupService.createGroup(this.trophyHash, name)
      .subscribe((res: any) => {
        if (typeof res === 'string') {
          this.snackbar.info(extract(`Created group ${name}`));
          this.formGroup.reset();
          this.directive.resetForm();
          this.output.emit(new GroupModel(res, name, this.trophyHash));
          return;
        }
        if ('validation' in res) {
          for (const error of res.validation) {
            this.formGroup.controls[error.field].setErrors({'message': error.message});
          }
        }
      });
  }

}
