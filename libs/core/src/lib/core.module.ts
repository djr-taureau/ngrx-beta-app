import { NgModule } from '@angular/core';
import { ShellComponent } from './shell/shell.component';
import { AppNavigationComponent } from './components';
import { CoreRoutingModule } from './+modules/core-routing.module';
import { CoreCoreModule, CoreUIModule } from './+modules';

@NgModule({
	imports: [CoreCoreModule, CoreUIModule, CoreRoutingModule],
	declarations: [ShellComponent, AppNavigationComponent],
	exports: [ShellComponent, AppNavigationComponent]
})
export class CoreModule {}