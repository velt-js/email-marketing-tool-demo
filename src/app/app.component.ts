import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VeltService } from './services/velt.service';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { DocumentComponent } from './components/document/document.component'

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, SidebarComponent, ToolbarComponent, DocumentComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppComponent implements OnInit {
	title = 'email';

	constructor(
		private veltService: VeltService,
	) { }


	async ngOnInit(): Promise<void> {
		await this.veltService.initializeVelt('AN5s6iaYIuLLXul0X4zf');
		await this.veltService.setDocument('email', { documentName: 'email' });
		this.veltService.setDarkMode(true);
	}
}
