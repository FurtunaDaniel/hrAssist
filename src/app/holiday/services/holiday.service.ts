import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

// keep an empty line between third party imports and application imports
// The empty line separates your stuff from their stuff. Style 03-06
import { ApiService } from '@app/core/services';
@Injectable()
export class HolidayService {
	public id: number;

	constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
		// Hacky way I suppose to get the parameter from service
		// I have no idea why on UserService worked much simple
		this.router.events.subscribe((event: any) => {
			let route_ = this.route;
			// suffix route_ because it's about route variable (not the class)
			while (route_.firstChild) {
				route_ = route_.firstChild;
			}
			route_.params.subscribe(params => {
				this.id = params.id;
			});
		});
	}

	getAll(): Observable<any> {
		return this.apiService.getAll(`/holidays`).pipe(map(data => data));
	}

	getHoliday(): Observable<any> {
		return this.apiService.getAll(`/holidays/${this.id}`).pipe(map(data => data));
	}

}
