import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatMenuModule, MatButtonModule } from '@angular/material';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent],
			imports: [RouterTestingModule, MatButtonModule, MatMenuModule]
		}).compileComponents();
	}));
	it('should create the app', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
	it(`should have as title 'HR APP'`, async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('HR APP');
	}));
	it('should render title in a h1 tag', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('h1').textContent).toContain(
			'Welcome to HR APP!'
		);
	}));

	it('should render app-nav-bar', async(() => {
		const fixture = TestBed.createComponent(AppComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector('app-nav-bar').textContent).toBeTruthy();
	}));
});
