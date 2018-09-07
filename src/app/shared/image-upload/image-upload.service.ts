import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  constructor(private http: HttpClient) {
  }

  public upload(files: Set<File>): { [key: string]: Observable<number> } {
    const status = {};

    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('image', file, file.name);

      const progress = new Subject<number>();
      const path = new BehaviorSubject(null);

      const url = '/upload/image';
      const req = new HttpRequest('POST', url, formData, {reportProgress: true});

      this.http.request(req)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            const percentageDone = Math.round(100 * event.loaded / event.total);
            progress.next(percentageDone);
          } else if (event instanceof HttpResponse) {
            progress.complete();
            // @ts-ignore
            path.next(event.body.url);
            path.complete();
          }
        });

      status[file.name] = {
        progress: progress.asObservable(),
        path: path.asObservable(),
      };
    });

    console.log(status);
    return status;
  }
}
