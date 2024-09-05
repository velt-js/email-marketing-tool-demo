import { Component, CUSTOM_ELEMENTS_SCHEMA, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { VeltService } from '../../services/velt.service';

@Component({
	selector: 'app-document',
	standalone: true,
	imports: [RouterOutlet, NgIf, NgFor],
	templateUrl: './document.component.html',
	styleUrl: './document.component.scss',

	// Schemas are required to add Velt html tags
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DocumentComponent {
	title = 'email';
	recordingId = ''
	recordingIds: string[] = []

	// Getting Velt Client
	client = this.veltService.clientSignal();

	constructor(
		private veltService: VeltService
	) {
		// Set Document when the velt client is initialized
		effect(() => {
			this.client = this.veltService.clientSignal();
			if (this.client) {
				// Contain your comments in a document by setting a Document ID & Name
				this.client.setDocument('email', { documentName: 'email' });
			}
		});
	}

	async ngOnInit(): Promise<void> {

		// Load Old Recordings
		const oldRecordingId: string[] = JSON.parse(localStorage.getItem('recordingIds') || '[]') as string[]
		if (oldRecordingId) {
			this.recordingIds = oldRecordingId
		}

		// After recording is completed, we set the recorder id
		const recorderControlPanel = document.querySelector('velt-recorder-control-panel');
		recorderControlPanel?.addEventListener('onRecordedData', (s: any) => {
			this.recordingId = s.detail.id
			this.recordingIds.push(s.detail.id)
			localStorage.setItem('recordingIds', JSON.stringify(this.recordingIds))
		});

	}

}
