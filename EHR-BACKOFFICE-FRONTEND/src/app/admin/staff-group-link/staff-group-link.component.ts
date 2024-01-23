import { Component, OnInit } from '@angular/core';
import { StaffGrpLinkService } from './staff-group-link.service';
import { StaffGroupLink } from './staff-group-link.model';
import { ActivatedRoute } from '@angular/router';
import { StaffGroupService } from '../staff-group/staff-group.service';


@Component({
  selector: 'app-staff-group-link',
  templateUrl: './staff-group-link.component.html',
  styleUrls: ['./staff-group-link.component.scss']
})
export class StaffGroupLinkComponent implements OnInit {


  staffGrpLinks: StaffGroupLink[] = [];

    constructor(private staffGrpLinkService: StaffGrpLinkService,
      private route: ActivatedRoute,
      private staffGroupService: StaffGroupService
      ) { }

    ngOnInit(): void {
      
    }



}
