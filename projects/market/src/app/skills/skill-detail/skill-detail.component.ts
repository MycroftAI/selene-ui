/*! *****************************************************************************
SPDX-License-Identifier: Apache-2.0


Copyright (c) Mycroft AI Inc. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, tap } from 'rxjs/operators';

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { InstallService } from '../install.service';
import { SkillDetail, SkillsService } from '../skills.service';

@Component({
  selector: 'market-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss']
})
export class SkillDetailComponent implements OnInit {
    public backArrow = faArrowLeft;
    public skill$: Observable<SkillDetail>;

    constructor(
        private installService: InstallService,
        private route: ActivatedRoute,
        private router: Router,
        private skillsService: SkillsService
    ) { }


    ngOnInit() {
        this.skill$ = this.route.paramMap.pipe(
            switchMap(
                (params: ParamMap) => this.skillsService.getSkillById(params.get('skillId'))
            ),
            tap(
                () => { this.installService.getSkillInstallations(); }
            )
        );
        this.installService.getSkillInstallations();
    }
}
