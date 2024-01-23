/*import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocList } from '../doc-list.model';
import { DocListService } from '../doc-list.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
/*import { UploadDocComponent } from '../upload-doc/upload-doc.component';*/


/*export interface DialogData {
  id : number;
  action: string;
  Document: DocList;
}
@Component({
  selector: 'app-doc-add-edit',
  templateUrl: './doc-add-edit.component.html',
  styleUrls: ['./doc-add-edit.component.scss']
})
export class DocAddEditComponent implements OnInit {
  documentForm!: FormGroup;
  document: DocList = {} as DocList;
  isLoading: boolean = false;
  dialogTitle?: string;
  @Input('data') documents: DocList[] = [];
  action?: string ;
  filteredDocuments: DocList[] = [];
  selectedFilePath: string = '';
constructor( private docListService: DocListService ,
  private formBuilder: FormBuilder,
  public dialogRef: MatDialogRef<DocAddEditComponent>,
  private dialog: MatDialog,
@Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {}
ngOnInit(): void {
this.initForm();
this.documentForm.patchValue(this.dialogData);
  console.log('Received data:', this.dialogData);
  }


  /*populateForm(document: DocList) {
    this.documentForm.patchValue({
      title: document.title,
      document_Key: document.document_Key,
      desc: document.desc,
      format: document.format,
      item: document.item,
      itemNm: document.itemNm,
      path:document.path,
      documentRcrdSts :document.documentRcrdSts,
    });
  }
  onSubmit() {
    if (this.documentForm.valid){
        this.docListService.createDocument(this.documentForm.value).subscribe({
          next: (val: any) => {
            alert('document added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) =>{
            console.error(err);
          },
        });

    }
}
initForm() {
  this.documentForm = this.formBuilder.group({
    document_Key: ['', Validators.required],
    title: ['', Validators.required],
    desc: ['', Validators.required],
    format: ['', Validators.required],
    item: ['', Validators.required],
    itemNm: ['', Validators.required],
    path:['', Validators.required],
    documentRcrdSts:['', Validators.required],
  });
}
onNoClick(): void {
  this.dialogRef.close(); // Fermer la boîte de dialogue lorsque le bouton "Cancel" est cliqué
}
closeDialog(): void {
  this.dialogRef.close(); // Appeler la méthode close() de MatDialogRef pour fermer la boîte de dialogue
}
addFileFromDesktop(event: any) {
  /*const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    this.docListService.addFileToDatabase(file).subscribe(() => {
      // Mettez à jour l'affichage des rapports médicaux après l'ajout réussi
      this.getAllDocuments();
    });
  } else {
    console.error("Aucun fichier sélectionné.");
  }
}*/



