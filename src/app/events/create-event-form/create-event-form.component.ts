import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {WaveEvent} from '@app/shared/models/event.model';
import {EventService} from '@app/events/event.service';
import {ImageUploadComponent} from '@app/shared/image-upload/image-upload.component';
import {Image, ImageModel} from '@app/shared/models/image.model';
import {MatDialog} from '@angular/material';
import {SnackbarService} from '@app/core/snackbar.service';
import {environment} from '@env/environment';
import {toDate} from '@app/app.module';
import {extract} from '@app/core';

@Component({
  selector: 'app-create-event-form',
  templateUrl: './create-event-form.component.html',
  styleUrls: ['./create-event-form.component.scss']
})
export class CreateEventFormComponent implements OnInit {


  @Input('trophyHash') trophyHash: string;
  @Input('groupHash') groupHash: string;
  @Input('locationHash') locationHash: string;
  @Output('onEventCreated') output: EventEmitter<WaveEvent> = new EventEmitter();
  @ViewChild('createEventDirective') directive: NgForm;

  formGroup: FormGroup;
  images: Image[] = [];
  env = environment;
  isLoading = false;

  constructor(private eventService: EventService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private snackbar: SnackbarService) {
    this.formGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      day: ['', [Validators.required]],
      description: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  ngOnInit() {
    if (!this.trophyHash) {
      throw new Error('[trophyHash] must be provided for the create-event-form-component');
    }
    if (!this.groupHash) {
      throw new Error('[groupHash] must be provided for the create-event-form-component');
    }
    if (!this.locationHash) {
      throw new Error('[locationHash] must be provided for the create-event-form-component');
    }
  }


  uploadImages() {
    const dialogRef = this.dialog.open(ImageUploadComponent, {width: '50%', height: '50%'});
    dialogRef.afterClosed()
      .subscribe((images: Image[]) => {
        this.images.push(...images);
        console.log('images', this.images);
      });
  }

  removeImage(url: string) {
    this.images = this.images.filter((image: ImageModel) => {
      return image.url !== url;
    });
  }

  createEvent() {
    this.isLoading = true;
    if (this.formGroup.invalid === true) {
      this.isLoading = false;
      return;
    }
    const title = this.formGroup.controls['title'].value;
    const startDate = this.formGroup.controls['startDate'].value;
    const endDate = this.formGroup.controls['endDate'].value;
    const day = this.formGroup.controls['day'].value;
    const description = this.formGroup.controls['description'].value;

    const images: Image[] = [];

    for (const image of this.images) {
      images.push({url: image.url});
    }

    this.eventService.createEvent(
      this.trophyHash,
      this.groupHash,
      this.locationHash,
      title,
      day,
      startDate,
      endDate,
      description,
      images
    ).subscribe((res: any) => {

      console.log(res);
      if ('hash' in res) {
        this.snackbar.info(extract(`Created event ${res.title}`));
        this.formGroup.reset();
        this.directive.resetForm();
        this.images = [];
        this.isLoading = false;
        this.output.emit(res);
        return;
      }
      if ('validation' in res) {
        for (const error of res.validation) {
          this.formGroup.controls[error.field].setErrors({'message': error.message});
        }
      }
      this.isLoading = false;
    });
  }
}
