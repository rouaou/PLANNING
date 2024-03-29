import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileComponent } from './file.component';


const routes: Routes = [
  {
    path: 'file',
    component: FileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileRoutingModule {}
