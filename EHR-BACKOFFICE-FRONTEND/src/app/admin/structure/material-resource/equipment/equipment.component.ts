import { Component, OnInit } from '@angular/core';
import { Equipment } from './equipment.model';
import { Room } from '../room/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { EquipmentService } from './equipment.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from './delete/delete/delete.component';
import { HttpResponse } from '@angular/common/http';
import { Direction } from '@angular/cdk/bidi';
import { FormComponent as EquipmentFormComponent, FormComponent } from './form/form/form.component';
import { RoomService } from '../room/room.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  equipments: Equipment[] = [];
  roomKey: number | undefined;

  room: Room | undefined;

  filtredEquipments: Equipment[] = [];

  fixedEquipments: Equipment[] = [];
  mobileEquipments: Equipment[] = [];

  page = 1;
  items = 5;
  searchQuery = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private roomService : RoomService,
    private dialog: MatDialog,
    private equipmentService: EquipmentService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.displayEquipments();
  //  this.getParent();
  this.getFixedEquipments();
  this.getMobileEquipments();
  }

  displayEquipments(): void {
    {
      this.equipmentService.getAllEquipments().subscribe(
        (data: Equipment[]) => {
          this.equipments = [...data];;
         this.filtredEquipments = [...data];
          console.log(this.filtredEquipments); // You can do something with the data here
        },
        error => {
          console.error('Error fetching services', error);
        }
      );
    }}

    getFixedEquipments(): void {
      this.equipmentService.getAllEquipments().subscribe(
        (data: Equipment[]) => {
          // Filter equipment with a specific type (replace 'desiredType' with your actual type)
          this.fixedEquipments = data.filter(equipment => equipment.typeFM === 'fixed');
        },
        error => {
          console.error('Error fetching services', error);
        }
      );
    }


    getMobileEquipments(): void {
      this.equipmentService.getAllEquipments().subscribe(
        (data: Equipment[]) => {
          // Filter equipment with a specific type (replace 'desiredType' with your actual type)
          this.mobileEquipments = data.filter(equipment => equipment.typeFM === 'mobile');
        },
        error => {
          console.error('Error fetching services', error);
        }
      );
    }


  openAddEditForm() {
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        action: 'add-equipment',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("equipment Added Successfully!");
        this.refresh();
      }
    });
  }

  refresh(){
    this.displayEquipments();
  }

  searchEquipments(): void {
    this.filtredEquipments = this.equipments.filter(equipment =>
      equipment.equipmentLabel.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      equipment.equipmentType.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      equipment.addressIp.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      equipment.addressMac.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  // getParent(): void {
  //   this.roomKey = this.getCurrentRoomKey();
  //   this.roomService.getRoomByKy(this.roomKey).subscribe(
  //     (room: Room) => {
  //       this.room = room;
  //     },
  //     (error: any) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // getCurrentRoomKey(): number {
  //   const urlSegments = this.route.snapshot.url;
  //   const roomKeyIndex = urlSegments.findIndex(segment => segment.path === 'room');
  //   if (roomKeyIndex !== -1 && roomKeyIndex + 1 < urlSegments.length) {
  //     return +urlSegments[roomKeyIndex + 1].path;
  //   }
  //   return 0;
  // }

  onDelete(equipment: Equipment): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: equipment // Pass the name as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.equipmentService.deleteEquipment(equipment.equipmentKy)
        .subscribe(
          (response: HttpResponse<any>) => {
            this.refresh();
            this.openSuccessSnackBar(equipment.equipmentLabel + ' : deleted successfully');
          },
          (error: any) => {
            console.error('Error deleting equipment :', error);
            this.openErrorSnackBar('Error deleting equipment : '+equipment.equipmentLabel);
          }
        );
      }
    });
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
}

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-error"]
    });
  }

  edit(equipment : Equipment) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(EquipmentFormComponent, {
      data: {
        equipments: this.filtredEquipments,
        equipment: equipment,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Equipment Updated Successfully !")
      }
    });
  }

  handleDeleteClick(event: Event, equipment: Equipment) {
    event.stopPropagation(); // This will prevent the click event from propagating to the parent td
    this.onDelete(equipment); // Handle the delete logic here
  }

}
