import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { SharedModule } from "@shared";
import { ComponentsModule } from "@shared/components/components.module";
import { FeatherIconsModule } from "@shared/components/feather-icons/feather-icons.module";
import { NgxPaginationModule } from "ngx-pagination";
import { AdminRoutingModule } from "../admin-routing.module";
import { FileRoutingModule } from "./file/file.routing";
import { FileComponent } from "./file/file.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  declarations: [FileComponent],
  imports: [
    CommonModule,
    MatProgressBarModule,
    FormsModule,
    MatChipsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    MatIconModule,
    NgxPaginationModule,
    FileRoutingModule,
    AdminRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FeatherIconsModule
  ]
})
export class FileModule { }
