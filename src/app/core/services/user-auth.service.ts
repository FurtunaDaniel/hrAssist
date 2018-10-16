import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { AuthUser, LoginUser } from '@app/core/models';

@Injectable()
export class UserAuthService {
	constructor(handler: HttpBackend, private http: HttpClient) {
		this.http = new HttpClient(handler);
	}
	login(data: LoginUser): Observable<AuthUser> {
		return this.http.post<AuthUser>(`${environment.api_url}/login`, data);
	}
}
