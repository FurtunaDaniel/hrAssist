import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class HolidayService {
	constructor(private apiService: ApiService) {}
	getAll(): Observable<any> {
		return this.apiService.getAll(`/holidays`).pipe(map(data => data));
	}
}
