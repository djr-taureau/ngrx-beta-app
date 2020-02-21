import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
	imports: [
		RouterModule.forChild([
      // {
      //   path: 'addNote',
      //   component: DialogHostComponent,
      //   outlet: 'dialog'
      // },
		])
	],
	exports: [RouterModule]
})
export class CoreRoutingModule {}
