import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserLoginService {
	constructor(handler: HttpBackend, private http: HttpClient) {
		this.http = new HttpClient(handler);
	}

	login(data): Observable<any> {
		return this.http.post(`${environment.api_url}/login`, data);
	}
}
