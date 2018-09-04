import { TestBed, inject } from '@angular/core/testing';

import { LangaugeService } from '../user-details/user-languages/langauge.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LangaugeService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			providers: [LangaugeService, HttpClient, HttpHandler]
		});
	});

	it('should be created', inject(
		[LangaugeService],
		(service: LangaugeService) => {
			expect(service).toBeTruthy();
		}
	));
});
