import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { User, Position, Language, Device } from '@app/user/models';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '@app/core/services';
@Injectable()
export class UserService {
	public id: number;
	constructor(private route: ActivatedRoute, private apiService: ApiService) {
		this.route.params.subscribe(params => {
			this.id = params.id;
		});
	}

	// ~~~~~~~~ Employees General Info HTTP Requests ~~~~~~~
	// START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	getUserInfo(): Observable<User> {

		return this.apiService
			.getAll(`/users/${this.id}`)
			.pipe(
				map(data => data),
				catchError(this.handleError<any>(`getUserInfo faild`))
			);
	}

	getUsers(): Observable<User[]> {
		return this.apiService
			.getAll(`/users/`)
			.pipe(
				map(data =>
					data.items.map((item: User) => new User().deserialize(item))
				),
				catchError(this.handleError<any>(`getUsers faild`))
			);
	}

	getAll(): Observable<any> {
		// route-> /users?with[]=languages&with[]=technologies&with[]=projects&with[]=certifications`;

		const parameters = [
			'languages',
			'technologies',
			'projects',
			'certifications',
		];
		let params = new HttpParams();
		parameters.forEach(element => {
			params = params.append('with[]', element.toString());
		});

		return this.apiService
			.get(`/users`, params)
			.pipe(
				map(data => data.items),
				catchError(this.handleError<any>(`getAll faild`))
			);
	}

	updateUserInfo(data): Observable<User> {
		return this.apiService.put(`/users/${this.id}`, data);
	}

	getUserPosition(): Observable<Position> {
		return this.apiService
			.getAll(`/users/${this.id}/position`)
			.pipe(
				map(data => data),
				catchError(this.handleError<any>(`getUserPosition faild`))
			);
	}

	updateUserPosition(data): Observable<Position> {
		data.user_id = this.id;
		return this.apiService.put(`/users/${this.id}/position`, data);
	}
	// ~~~~~~~~ Employees General Info HTTP Requests ~~~~~~~
	// END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// ~~~~~~~~ Employees Languages Card HTTP Requests ~~~~~~~
	// START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	getUserLanguages(): Observable<Language[]> {

		return this.apiService
			.getAll(`/users/${this.id}/languages`)
			.pipe(
				map(data => data.items),
				catchError(this.handleError<any>(`getUserLanguages faild`))
			);
	}

	updateUserLanguages(languages): Observable<Language[]> {
		// @TODO Here should be used an interface but our Language has so much models...
		const data: any = {};
		data.languages = [];
		languages.forEach(element => {
			data.languages.push({
				id: element.language.id,
				level: element.level,
			});
		});
		return this.apiService.put(`/users/${this.id}/languages`, data);
	}

	deleteUserLanguages(data: number[]): Observable<Language[]> {

		let params = new HttpParams();
		data.forEach(element => {
			params = params.append(
				'language_ids[]'.toString(),
				element.toString(),
			);
		});
		return this.apiService.delete(`/users/${this.id}/languages`, params);
	}
	// ~~~~~~~~ Employees Languages Card HTTP Requests ~~~~~~~
	// END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// ~~~~~~~~ Employees Devices Card HTTP Requests ~~~~~~~
	// START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	getUserDevices(): Observable<Device[]> {
		return this.apiService
			.getAll(`/users/${this.id}/devices`)
			.pipe(map(data => data.items));
	}

	updateUserDevice(device): Observable<any> {
		if (!device.components.length) {
			delete device.components;
		}
		return this.apiService.put(`/users/${this.id}/devices`, device);
	}
	deleteUserDevices(devices): Observable<any> {
		let params = new HttpParams();
		devices.forEach(element => {
			params = params.append(
				'device_ids[]'.toString(),
				element.toString(),
			);
		});
		return this.apiService.delete(`/users/${this.id}/devices`, params);
	}
	// ~~~~~~~~ Employees Devices Card HTTP Requests ~~~~~~~
	// END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	// ~~~~~~~~ Employees Devices Card HTTP Requests ~~~~~~~
	// START ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	getUserHolidays(): Observable<any> {
		return this.apiService
			.getAll(`/users/${this.id}/holidays`)
			.pipe(map(data => data));
	}

	saveUserHoliday(holiday): Observable<any> {
		return this.apiService.post(`/users/${this.id}/holidays`, holiday);
	}
	deleteUserHolidays(holidays): Observable<any> {
		let params = new HttpParams();
		holidays.forEach(element => {
			params = params.append(
				'holiday_ids[]'.toString(),
				element.toString(),
			);
		});
		return this.apiService.delete(`/users/${this.id}/holidays`, params);
	}
	// ~~~~~~~~ Employees Devices Card HTTP Requests ~~~~~~~
	// END ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	/**
	 * Returns a function that handles Http operation failures.
	 * This error handler lets the app continue to run as if no error occurred.
	 * @param operation - name of the operation that failed
	 */
	private handleError<T>(operation = 'operation') {
		return (error: HttpErrorResponse): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			const message =
				error.error instanceof ErrorEvent
					? error.error.message
					: `server returned code ${error.status} with body "${
					error.error
					}"`;

			// TODO: better job of transforming error for user consumption
			throw new Error(`${operation} failed: ${message}`);
		};
	}
}
