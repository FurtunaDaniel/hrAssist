import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HolidayService {
	constructor(private apiService: ApiService) {}
	getAll(): Observable<any> {
		return this.apiService.getAll(`/holidays`).pipe(map(data => data));
	}
}
