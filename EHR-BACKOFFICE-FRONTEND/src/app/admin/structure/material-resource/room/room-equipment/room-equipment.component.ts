import { Component, OnInit } from '@angular/core';
import { Equipment } from '../../equipment/equipment.model';
import { Room } from 'app/admin/room/allroom/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomService } from '../room.service';
import { EquipmentService } from '../../equipment/equipment.service';


@Component({
  selector: 'app-room-equipment',
  templateUrl: './room-equipment.component.html',
  styleUrls: ['./room-equipment.component.scss']
})
export class RoomEquipmentComponent implements OnInit {


  equipments: Equipment[] = [];
  roomKy: number | undefined;

  room: Room | undefined;

  filteredServiceAreas: Equipment[] = [];

  page = 1;
  items = 5;
  searchQuery = '';
  isLoading: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private roomService: RoomService,
    private equipmentService: EquipmentService
  ) { }

  ngOnInit(): void {
    this. displayEquipments();
  }

  displayEquipments(): void {
    this.isLoading = true;
    const roomKyParam = this.route.snapshot.paramMap.get('roomKy');
    if (roomKyParam) {
      const roomKy = +roomKyParam;
      this.roomKy = roomKy;
      this.roomService.getChildElements(roomKy).subscribe(
        (data: Equipment[]) => {
          this.equipments = [...data];;
          this.filteredServiceAreas = [...data];
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching equipments : ', error);
          this.isLoading = false;
        }
      );
    }
  }

  liberate(equipment: Equipment): void {
    this.roomService.unassignEquipment(this.roomKy,equipment).subscribe((equipment)=>{
      this.roomService.getChildElements(this.roomKy).subscribe(
        (data: Equipment[]) => {
          this.equipments = [...data];;
          this.filteredServiceAreas = [...data];
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching equipments : ', error);
          this.isLoading = false;
        }
      );
    })
  }

}
