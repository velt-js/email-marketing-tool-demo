import { Component, CUSTOM_ELEMENTS_SCHEMA, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
	selector: 'app-document',
	standalone: true,
	imports: [RouterOutlet, NgIf, NgFor],
	templateUrl: './document.component.html',
	styleUrl: './document.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class DocumentComponent {
	title = 'email';
	recordingId = ''
	recordingIds: string[] = []
	async ngOnInit(): Promise<void> {

		const oldRecordingId: string[] = JSON.parse(localStorage.getItem('recordingIds') || '[]') as string[]
		console.log(oldRecordingId);

		if (oldRecordingId) {
			this.recordingIds = oldRecordingId
		}


		const recorderControlPanel = document.querySelector('velt-recorder-control-panel');
		recorderControlPanel?.addEventListener('onRecordedData', (s: any) => {
			this.recordingId = s.detail.id
			this.recordingIds.push(s.detail.id)
			localStorage.setItem('recordingIds', JSON.stringify(this.recordingIds))

			console.log('onRecordedData', s.detail.id);
			console.log(this.recordingId);
		});

	}

}
