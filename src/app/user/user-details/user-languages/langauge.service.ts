import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
@Injectable()
export class LangaugeService {
	private APIURL = environment.api_url;

	constructor(private http: HttpClient) {}

	getLanguages(): Observable<any> {
		const url = `${this.APIURL}/languages`;
		return this.http.get<any>(url).pipe(
			map(data => {
				return data.items;
			})
		);
	}
}
