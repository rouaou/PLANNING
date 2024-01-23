/*import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DocListService } from '../doc-list.service';
import { DocAddEditComponent } from '../doc-add-edit/doc-add-edit.component';
export interface DialogData {
  document_Key : number,
  title: string;

}
@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.component.html',
  styleUrls: ['./upload-doc.component.scss']
})
export class UploadDocComponent {
  selectedFilePath: string = '';


  constructor(
    public dialogRef: MatDialogRef<UploadDocComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public docListService: DocListService,
    private dialog: MatDialog
  ){}


  BrowseButton() {
    // Handle the logic for opening the file explorer here
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const selectedFile = input.files[0];
    console.log('Selected file:', selectedFile);

    const selectedFileField = document.getElementById('selectedFileField');
  if (selectedFileField) {
    selectedFileField.textContent = selectedFile.name;
    this.selectedFilePath = selectedFile.name;
    console.log('Selected file path:', this.selectedFilePath);
  }
}


onValidateClick() {
  // Open the doc-add-edit dialog and pass the selected file path
  const dialogRef = this.dialog.open(DocAddEditComponent, {
    data: {
      // Other data you want to pass to the dialog
      selectedFilePath: this.selectedFilePath
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed', result);
    // Handle any actions you want to take after the dialog closes
  });
}


}*/
