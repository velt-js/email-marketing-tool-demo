import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VeltService } from './services/velt.service';
import { AuthService } from './services/auth.service';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { DocumentComponent } from './components/document/document.component'
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, ToolbarComponent, DocumentComponent, SidebarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent implements OnInit {
	title = 'email';

	constructor(
		private veltService: VeltService,
		private authService: AuthService,
	) { }

	/**
	 * Initializes the Velt service and set up the collaboration environment.
	 */
	async ngOnInit(): Promise<void> {

		// Initialize Velt with the API key
		await this.veltService.initializeVelt('AN5s6iaYIuLLXul0X4zf');

		// Identify the current user if authenticated
		const user = this.authService.userSignal();
		if (user) {
			await this.veltService.identifyUser(user);
		}

	}
}
