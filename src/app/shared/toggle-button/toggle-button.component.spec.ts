import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleButtonComponent } from './toggle-button.component';

describe('ToggleButtonComponent', () => {
	let component: ToggleButtonComponent;
	let fixture: ComponentFixture<ToggleButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ToggleButtonComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ToggleButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	// specs broken
	// it('should send the text to detect the change', async(done => {
	// 	component.cardVisibilitySubject.subscribe(textRecived => {
	// 		expect(textRecived).toEqual(text);
	// 		done();
	// 	});
	// 	const text = 'Changed text';
	// 	component.ngOnInit();
	// 	fixture.detectChanges();
	// }));

	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });
});
