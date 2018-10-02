import { NgModule } from '@angular/core';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { UserLoginService } from '@app/core/services';

@NgModule({
	imports: [AuthRoutingModule, SharedModule],
	declarations: [AuthComponent],
	providers: [NoAuthGuard, UserLoginService],
})
export class AuthModule {}
