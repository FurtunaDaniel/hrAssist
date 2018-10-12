import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '@app/core/services';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Project } from '@app/project/models/project.model';

@Injectable()
export class ProjectService {
	constructor(private apiService: ApiService) { }

	getAll(): Observable<any> {
		const parameters = [
			'application_types',
			'activities',
			'industries',
			'customers',
			'users',
			'technologies',
		];
		let params = new HttpParams();
		parameters.forEach(element => {
			params = params.append('with[]', element.toString());
		});
		return this.apiService.get(`/projects`, params).pipe(
			map(data => data.items),
			catchError(this.handleError<any>(`getAll faild`)),
		);
	}
	getProjects(): Observable<Project[]> {
		return this.apiService.get(`/projects`).pipe(
			map(data => {
				return data.items as Project;
			}),
			catchError(this.handleError<any>(`getAll faild`)),
		);
	}
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
