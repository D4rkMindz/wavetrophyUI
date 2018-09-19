import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LocationService} from '../location.service';
import {SnackbarService} from '@app/core';
import {Coordinate, CoordinateModel} from '@app/shared/models/coordinate.model';
import {ImageUploadComponent} from '@app/shared/image-upload/image-upload.component';
import {MatDialog} from '@angular/material';
import {extract, Logger} from '../../core';
import {Image, ImageModel} from '@app/shared/models/image.model';
import {environment} from '@env/environment';
import {Location} from '@app/shared/models/location.model';

@Component({
  selector: 'app-create-location-form',
  templateUrl: './create-location-form.component.html',
  styleUrls: ['./create-location-form.component.scss']
})
export class CreateLocationFormComponent implements OnInit {

  @Input('trophyHash') trophyHash: string;
  @Input('groupHash') groupHash: string;
  @Output('onLocationCreated') output: EventEmitter<Location> = new EventEmitter();
  @ViewChild('createLocationDirective') directive: NgForm;

  formGroup: FormGroup;
  addLocations: Coordinate[] = [];
  images: Image[] = [];
  env = environment;
  private logger: Logger = new Logger('CREATE LOCATION FORM');

  constructor(private locationService: LocationService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private snackbar: SnackbarService) {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      coordinateLat: ['', [Validators.required]],
      coordinateLon: ['', [Validators.required]],
      description: ['', [Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

    ngOnInit() {
      if (!this.trophyHash) {
        throw new Error('[trophyHash] must be provided for the create-location-form component');
      }
      if (!this.groupHash) {
        throw new Error('[groupHash] must be provided for the create-location-form component');
      }
  }

  keys(obj: any) {
    return Object.keys(obj);
  }

  parseInt(i: string) {
    return parseInt(i, 10);
  }


  addNewLocation() {
    this.addLocations.push({lat: null, lon: null});
  }

  removeNewLocation() {
    this.addLocations.pop();
  }

  uploadImages() {
    const dialogRef = this.dialog.open(ImageUploadComponent, {width: '50%', height: '50%'});
    dialogRef.afterClosed()
      .subscribe((images: Image[]) => {
        this.images.push(...images);
        this.logger.debug('images', this.images);
      });
  }

  removeImage(url: string) {
    this.images = this.images.filter((image: ImageModel) => {
      return image.url !== url;
    });
  }

  createLocation() {
    if (this.formGroup.invalid === true) {
      return;
    }
    const zip = this.formGroup.controls['zip'].value;
    const name = this.formGroup.controls['name'].value;
    const street = this.formGroup.controls['street'].value;
    const city = this.formGroup.controls['city'].value;
    const coordinateLat = this.formGroup.controls['coordinateLat'].value;
    const coordinateLon = this.formGroup.controls['coordinateLon'].value;
    const description = this.formGroup.controls['description'].value;
    const images: Image[] = [];

    for (const image of this.images) {
      images.push({url: image.url});
    }

    const coordinates = new CoordinateModel(coordinateLat, coordinateLon);

    const additionalStops = this.addLocations;
    this.logger.debug(this.trophyHash, this.groupHash);

    this.locationService.createLocation(
      this.trophyHash,
      this.groupHash,
      zip,
      name,
      street,
      city,
      coordinates,
      additionalStops,
      description,
      images,
    )
      .subscribe((res: any) => {
        this.logger.debug(res);
        if ('hash' in res) {
          this.snackbar.info(extract(`Created location ${res.title}`));
          this.formGroup.reset();
          this.directive.resetForm();
          this.images = [];
          this.addLocations = [];
          this.output.emit(res);
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
