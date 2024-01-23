import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { DocList } from './doc-list.model';
import { DocListService } from './doc-list.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent extends UnsubscribeOnDestroyAdapter implements OnInit {
  page = 1;
  items = 5;
  searchQuery: string = '';
  filteredDocuments: DocList[] = [];
  documents: DocList[] = [];
  isLoading: boolean = false;
  documentForm! : FormGroup;
  document: DocList = {} as DocList;
  paginator: any;
  selectedFile: File | null = null;

  constructor(private docListService : DocListService,
    private dialog: MatDialog,
     private formBuilder: FormBuilder,
     private snackBar : MatSnackBar){

    super()
  }

  ngOnInit(): void {
/*this.getDocuments();
this.fetchData();
  this.initForm();*/
  this.loadDocuments();

  }
  /*searchDocuments(): void {
    const query = this.searchQuery.toLowerCase();

    this.filteredDocuments = this.documents.filter(document =>
       document.title.toLowerCase().includes(query)
    );
  }


  addNew() {
    const dialogRef = this.dialog.open(DocAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {


      if (val) {
        // Logique à exécuter après la fermeture de la fenêtre de dialogue
        // Par exemple, vous pouvez appeler la méthode loadData() pour rafraîchir les données
        this.getDocuments();
      }
    },
  });
  }

  refresh() {
    this.getDocuments();
  }

  getDocuments(): void {
    this.isLoading = true;
    this.docListService.getAllDocuments().subscribe(
      (documents: DocList[]) => {
        this.isLoading = false;
        this.filteredDocuments = documents;
        this.documents = documents;
      },
      (error) => {
        console.error('Error loading allergies:', error);
        this.isLoading = false;
      }
    );
  }
  hasDocuments(): boolean {
    return this.filteredDocuments.length > 0;
  }
  onDelete(document: DocList){

    const dialogRef = this.dialog.open(DeleteComponent, {
      data: document,
    });
    dialogRef.afterClosed().subscribe((result: number) => {
      if (result === 1) {
        this.docListService.deleteDocument(document.document_Key).subscribe(
          ()=>{

            // Refresh the allergies list
            this.getDocuments();
            // Optionally, display a success message
          },
          (error: any) => {
            console.error('Error deleting allergy:', error);
          }
        );
      }
    });
        }
        edit(data: any) {
          const dialogRef = this.dialog.open(DocAddEditComponent, {
            data,
          });

          dialogRef.afterClosed().subscribe((result: number) => {
            if (result === 1) {
              const updatedDocumentData: DocList = this.documentForm.value;
              updatedDocumentData.documentRcrdSts = 1;

              console.log('Updated Allergy Data:', updatedDocumentData); // Check the updated data

              this.docListService.updateDocument(this.document.document_Key, updatedDocumentData).subscribe(
                (updatedDocument: DocList) => {
                  console.log('Allergy mise à jour :', updatedDocument);
                  this.getDocuments();
                  this.refreshTable();
                  this.fetchData();
                  this.showNotification(
                'black',
                'Edit Record Successfully...!!!',
                'bottom',
                'center'
              );

                },
                error => {
                  console.error('Erreur lors de la mise à jour de', error);
                  // Handle the error here
                }
              );
            }
          });
        }
        showNotification(
          colorName: string,
          text: string,
          placementFrom: MatSnackBarVerticalPosition,
          placementAlign: MatSnackBarHorizontalPosition
        ) {
          this.snackBar.open(text, '', {
            duration: 2000,
            verticalPosition: placementFrom,
            horizontalPosition: placementAlign,
            panelClass: colorName,
          });
        }

        private refreshTable() {
          this.paginator?._changePageSize(this.paginator.pageSize);
        }


        fetchData(): void {
          this.isLoading = true;

          this.docListService.getAllDocuments().subscribe(
            (data: DocList[]) => {
              this.documents = data;
              this.filteredDocuments = data; // Assurez-vous que la propriété filteredInsurances est définie dans votre composant
              this.isLoading = false;
            },
            (error: any) => {
              console.error('Error fetching data:', error);
              this.isLoading = false; // Assurez-vous que loading state est également réinitialisé en cas d'erreur
            }
          );
          }
            private initForm() {
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

  download(document : DocList){
    const dialogRef = this.dialog.open(DownloadDocComponent, {
      data: document,
    });
  }

}*/


loadDocuments() {
  // Appelez le service pour obtenir les rapports médicaux
  this.docListService.getAllDocuments().subscribe((documents) => {
    this.documents = documents;
  });
}
// Méthode pour ajouter un fichier depuis le bureau
addFileFromDesktop(event: any) {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    /*this.docListService.addFileToDatabase(file).subscribe(() => {
      // Mettez à jour l'affichage des rapports médicaux après l'ajout réussi*/
      this.loadDocuments();
    }
   else {
    console.error("Aucun fichier sélectionné.");
  }
}
// Méthode pour télécharger un fichier
downloadFile(document_Key: number) {
  this.docListService.downloadDocuments(document_Key).subscribe((response) => {
    const contentDispositionHeader = response.headers.get('content-disposition');
    const filename = contentDispositionHeader
      ? contentDispositionHeader
          .split(';')[1]
          .trim()
          .split('=')[1]
      : 'downloaded-file';
    const blob = response.body as Blob;
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
// Méthode pour supprimer un fichier
deleteFile(document_Key: number) {
  this.docListService.deleteDocument(document_Key).subscribe(() => {
    // Mettez à jour la liste des rapports médicaux après la suppression réussie
    this.loadDocuments();
  });
}
// Méthode pour gérer l'ajout de fichiers depuis le bureau
/* uploadFileFromDesktop() {
  if (this.selectedFile) {
    this.reportService.addFileFromDesktop(this.selectedFile).subscribe(() => {
      // Mettez à jour la liste des rapports médicaux après l'ajout réussi
      this.loadMedicalReports();
      this.selectedFile = null; // Réinitialisez la sélection de fichier après l'ajout
    });
  }
}*/
/*addFileToDatabase() {
  // Vérifiez si un fichier est sélectionné
  if (this.selectedFile) {
    this.docListService.addFileToDatabase(this.selectedFile).subscribe((result) => {
      // Mettez à jour l'affichage des rapports médicaux après l'ajout réussi
      this.loadDocuments();
      this.selectedFile = null; // Réinitialisez la sélection de fichier après l'ajout
    });
  }
}*/

}

