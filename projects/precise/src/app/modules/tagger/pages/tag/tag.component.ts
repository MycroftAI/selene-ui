import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { NgWaveformComponent} from 'ng-waveform';

import { FileTag, TaggerService } from '../../../../core/http/tagger.service';
import { TagEvent } from '../../../../shared/models/tag-event.model';
import { environment } from '../../../../../environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'precise-tagger-tag',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
    animations: [
        trigger('newQuestion', [
            state('untagged', style({opacity: 1})),
            state('tagged', style({opacity: 0})),
            transition(':enter', [
                style({opacity: 0}),
                animate('0.5s', style({opacity: 1}))
            ]),
            transition('untagged => tagged', animate('0.5s')),
            transition('tagged => untagged', animate('0.5s'))
        ])
    ]
})
export class TagComponent implements OnInit {
    @ViewChild('waveform', { static: false }) waveform: NgWaveformComponent;
    public audioUrl: string;
    public tagButtonsDisabled: boolean;
    public playbackButtonsDisabled: boolean;
    public isTagged = false;
    public playIcon = faPlay;
    public pauseIcon = faPause;
    public tagEvent: TagEvent;
    public preciseUrl = environment.mycroftUrls.precise;
    public wakeWord: string;

    constructor(private route: ActivatedRoute, private taggerService: TaggerService) { }

    ngOnInit(): void {
        this.tagButtonsDisabled = true;
        this.playbackButtonsDisabled = true;
        this.route.data.subscribe(
            (data: {tagEvent: TagEvent}) => {
                this.tagEvent = data.tagEvent;
                this.audioUrl = this.preciseUrl + '/api/audio/' + this.tagEvent.audioFileName;
                this.playbackButtonsDisabled = false;
            }
        );
        this.route.paramMap.subscribe(
            (params) => this.wakeWord = params.get('wakeWord')
        );
    }

    onPlayButtonClick(): void {
        this.tagButtonsDisabled = false;
        this.waveform.play();
    }

    onPauseButtonClick(): void {
        this.waveform.pause();
    }

    saveTagResult(tagValueId: string): void {
        const fileTag: FileTag = {
            audioFileId: this.tagEvent.audioFileId,
            sessionId: this.tagEvent.sessionId,
            tagId: this.tagEvent.tagId,
            tagValueId: tagValueId
        };
        this.waveform.pause();
        this.tagButtonsDisabled = true;
        this.playbackButtonsDisabled = true;
        this.taggerService.addTagEvent(fileTag).subscribe(
            () => { this.isTagged = true; }
        );
    }

    onAnimationDone() {
        if (this.isTagged) {
            this.getNextTaggableFile();
        }
    }

    getNextTaggableFile(): void {
        this.taggerService.getTagEvent(this.wakeWord, this.tagEvent.sessionId).subscribe(
            (tagEvent: TagEvent) => {
                this.isTagged = false;
                this.tagEvent = tagEvent;
                this.audioUrl = this.preciseUrl + '/api/audio/' + this.tagEvent.audioFileName;
                this.playbackButtonsDisabled = false;
            }
        );
    }

    skipToNextEvent(): void {
        this.waveform.pause();
        this.tagButtonsDisabled = true;
        this.isTagged = true;
    }
}
