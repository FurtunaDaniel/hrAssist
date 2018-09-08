import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { UserLoginService } from '../core/services';

@NgModule({
	imports: [SharedModule, AuthRoutingModule],
	declarations: [AuthComponent],
	providers: [NoAuthGuard, UserLoginService],
})
export class AuthModule {}
