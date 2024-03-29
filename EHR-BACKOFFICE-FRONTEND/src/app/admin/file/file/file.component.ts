import { Component, OnInit } from '@angular/core';
import { FileService } from './file.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { UnsubscribeOnDestroyAdapter } from '@shared';



@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],

})
export class FileComponent extends UnsubscribeOnDestroyAdapter implements OnInit{

    filenames: string[] = [];
    fileStatus = { status: '', requestType: '', percent: 0 };



    constructor(private fileService: FileService) {
      super()
    }
ngOnInit(): void {
  this.loadFiles();
}
    // define a function to upload files
    onUploadFiles(files: File[]): void {
      const formData = new FormData();
      for (const file of files) { formData.append('files', file, file.name); }
      this.fileService.upload(formData).subscribe(
        event => {
          console.log(event);
          this.resportProgress(event);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }

    // define a function to download files
    onDownloadFile(filename: string): void {
      this.fileService.download(filename).subscribe(
        event => {
          console.log(event);
          this.resportProgress(event);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }

    deleteFile(filename: string) {
      this.fileService.deleteFile(filename).subscribe(() => {
        // Mettez à jour la liste des rapports médicaux après la suppression réussie
       this.loadFiles()
      });
    }

    loadFiles() {
      // Appelez le service pour obtenir les rapports médicaux
      this.fileService.getAllFiles().subscribe((filename) => {
        this.filenames = this.filenames;
      });
    }

    private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
      switch(httpEvent.type) {
        case HttpEventType.UploadProgress:
          this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
          break;
        case HttpEventType.DownloadProgress:
          this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Header returned', httpEvent);
          break;
        case HttpEventType.Response:
          if (httpEvent.body instanceof Array) {
            this.fileStatus.status = 'done';
            for (const filename of httpEvent.body) {
              this.filenames.unshift(filename);
            }
          } else {
            saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                    {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
            // saveAs(new Blob([httpEvent.body!],
            //   { type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
            //    httpEvent.headers.get('File-Name'));
          }
          this.fileStatus.status = 'done';
          break;
          default:
            console.log(httpEvent);
            break;

      }
    }

    private updateStatus(loaded: number, total: number, requestType: string): void {
      this.fileStatus.status = 'progress';
      this.fileStatus.requestType = requestType;
      this.fileStatus.percent = Math.round(100 * loaded / total);
    }
  }



