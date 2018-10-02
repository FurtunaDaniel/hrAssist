import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { ApiService } from '@app/core/services';
@Injectable()
export class LangaugesService {
	constructor(private apiService: ApiService) {}

	getLanguages(): Observable<any> {
		return this.apiService.getAll(`/languages`).pipe(
			map(data => {
				return data.items;
			})
		);
	}
}
