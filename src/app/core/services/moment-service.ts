import { Injectable } from '@angular/core';
import * as m from 'moment';

// tslint:disable-next-line:max-line-length
/* better implementation of moment inspired by https://stackoverflow.com/questions/39780378/making-moment-injectable-in-angular2?answertab=active#tab-top */
@Injectable()
export class MomentService {
	moment = m;
}
