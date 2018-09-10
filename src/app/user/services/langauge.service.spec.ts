import { TestBed, inject } from '@angular/core/testing';

import { LangaugesService } from '../user-details/user-languages/langauges.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LangaugeService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [LangaugesService, HttpClient, HttpHandler]
		});
	});

	it(
		'should be created',
		inject([LangaugesService], (service: LangaugesService) => {
			expect(service).toBeTruthy();
		})
	);
});
