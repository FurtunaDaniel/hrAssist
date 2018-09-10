import { TestBed, inject } from '@angular/core/testing';

import { AuthentificatHelper } from './AuthentificationHelper.service';

describe('AuthentificationService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthentificatHelper],
		});
	});

	it(
		'should be created',
		inject([AuthentificatHelper], (service: AuthentificatHelper) => {
			expect(service).toBeTruthy();
		}),
	);
});
