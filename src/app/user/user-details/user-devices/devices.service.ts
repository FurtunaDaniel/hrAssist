import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../core/services/api.service';

@Injectable()
export class DevicesService {
	private APIURL = environment.api_url;

	constructor(private apiService: ApiService) {}
	getAll(): Observable<any> {
		return this.apiService.getAll('/devices').pipe(map(data => data));
	}
	getAllComponents(): Observable<any> {
		return this.apiService
			.getAll('/components')
			.pipe(map(data => data.items));
	}
}
