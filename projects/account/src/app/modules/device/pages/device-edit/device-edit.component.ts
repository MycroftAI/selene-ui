import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '@account/http/device.service';
import { Device } from '@account/models/device.model';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


const fiveSeconds = 5000;

@Component({
    selector: 'account-device-edit',
    templateUrl: './device-edit.component.html',
    styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {
    public deviceForm: FormGroup;
    private deviceId: string;
    public device$ = new Observable<Device>();
    private snackbarConfig = new MatSnackBarConfig();

    constructor(
            private deviceService: DeviceService,
            private formBuilder: FormBuilder,
            private route: ActivatedRoute,
            private router: Router,
            private snackbar: MatSnackBar
    ) {
        this.snackbarConfig.panelClass = 'mycroft-no-action-snackbar';
        this.snackbarConfig.duration = fiveSeconds;
    }

    ngOnInit() {
        this.device$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => this.deviceService.getDevice(params.get('deviceId'))),
            tap((device) => {
                    this.deviceId = device.id;
                    this.buildDeviceForm(device);
                })
        );
    }

    buildDeviceForm(device) {
        this.deviceForm = this.formBuilder.group(
            {
                city: [device.city.name, Validators.required],
                name: [device.name, Validators.required],
                country: [device.country.name, Validators.required],
                placement: [device.placement],
                region: [device.region.name, Validators.required],
                timezone: [device.timezone.name, Validators.required],
                wakeWord: [device.wakeWord.displayName, Validators.required],
                voice: [device.voice.displayName, Validators.required]
            }
        );
    }

    onExit(save: boolean) {
        if (save) {
            this.deviceService.updateDevice(this.deviceId, this.deviceForm).subscribe(
                () => {
                    this.snackbar.open(
                        'Device ' + this.deviceForm.controls['name'].value + ' updated' ,
                        null,
                        this.snackbarConfig
                    );
                    this.router.navigate(['/devices']);
                },
                () => {
                    this.snackbar.open(
                        'Error updating device',
                        null,
                        this.snackbarConfig
                    );
                }
            );
        } else {
            this.router.navigate(['/devices']);
        }
    }
}
