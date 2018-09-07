import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LocationService} from '@app/locations/location.service';
import {SnackbarService} from '@app/core/snackbar.service';
import {Coordinate, CoordinateModel} from '@app/shared/models/coordinate.model';
import {ImageUploadComponent} from '@app/shared/image-upload/image-upload.component';
import {MatDialog} from '@angular/material';
import {extract} from '@app/core';
import {GroupModel} from '@app/shared/models/group.model';
import {Image, ImageModel} from '@app/shared/models/image.model';
import {environment} from '@env/environment';

@Component({
  selector: 'app-create-location-form',
  templateUrl: './create-location-form.component.html',
  styleUrls: ['./create-location-form.component.scss']
})
export class CreateLocationFormComponent implements OnInit {

  @Input('trophyHash') trophyHash: string;
  @Input('groupHash') groupHash: string;
  @Output('onGroupCreated') output: EventEmitter<{ hash: string, name: string }> = new EventEmitter();
  @ViewChild('createGroupDirective') directive: NgForm;

  console = console;
  formGroup: FormGroup;
  addLocations: Coordinate[] = [];
  images: Image[] = [new ImageModel('img/cache/i_180906/wt5b91574b590d59.02408967.JPG')];
  env = environment;

  constructor(private locationService: LocationService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private snackbar: SnackbarService) {
    this.formGroup = this.fb.group({
      name: ['Möhlin Bürgerhaus', [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      zip: ['4313', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      city: ['Möhlin', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      street: ['Ulmenstrasse 24', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      coordinateLat: ['8.00', [Validators.required]],
      coordinateLon: ['47.00', [Validators.required]],
      description: ['Beschreibung', [Validators.minLength(10), Validators.maxLength(1000)]],
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
        console.log('images', this.images);
      });
  }

  removeImage(url: string) {
    this.images = this.images.filter((image: ImageModel) => {
      return image.url !== url;
    });
  }

  createLocation() {
    if (this.formGroup.dirty) {
      return;
    }
    const zip = this.formGroup.controls['zip'].value;
    const name = this.formGroup.controls['name'].value;
    const street = this.formGroup.controls['street'].value;
    const city = this.formGroup.controls['city'].value;
    const coordinateLat = this.formGroup.controls['coordinateLat'].value;
    const coordinateLon = this.formGroup.controls['coordinateLon'].value;
    const description = this.formGroup.controls['description'].value;
    const images = this.images;

    const coordinates = new CoordinateModel(coordinateLat, coordinateLon);

    const additionalStops = this.addLocations;
    console.log(this.trophyHash, this.groupHash);

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
