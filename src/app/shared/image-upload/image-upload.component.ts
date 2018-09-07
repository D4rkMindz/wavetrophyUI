import {Component, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {forkJoin} from 'rxjs';
import {ImageUploadService} from '@app/shared/image-upload/image-upload.service';
import {extract} from '@app/core';
import {Image, ImageModel} from '@app/shared/models/image.model';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  // @ts-ignore
  progress;
  canBeClosed = true;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  progressFinished = false;
  pathFinished = false;
  paths: string[] = [];

  // @ts-ignore
  @ViewChild('file') file;
  public files: Set<File> = new Set<File>();

  constructor(public dialogRef: MatDialogRef<ImageUploadComponent>, public imageService: ImageUploadService) {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }

  closeDialog() {
    if (this.uploadSuccessful) {
      return this.dialogRef.close(this.progress);
    }

    this.uploading = true;

    this.progress = this.imageService.upload(this.files);

    const allProgressObservables = [];
    const allImageObservables = [];
    for (const key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
      allImageObservables.push(this.progress[key].path);
    }


    this.primaryButtonText = extract('Finish');

    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    this.showCancelButton = false;

    forkJoin(allProgressObservables).subscribe(end => {
      this.progressFinished = true;
      if (this.progressFinished && this.pathFinished) {
        this.close();
      }
    });
    forkJoin(allImageObservables).subscribe(paths => {
      this.pathFinished = true;
      this.paths = paths;
      if (this.progressFinished && this.pathFinished) {
        this.close();
      }
    });
  }

  private close() {
    this.canBeClosed = true;
    this.dialogRef.disableClose = false;

    this.uploadSuccessful = true;

    this.uploading = false;

    const images: Image[] = [];
    for (const url of this.paths) {
      images.push(new ImageModel(url));
    }
    this.dialogRef.close(images);
  }
}
