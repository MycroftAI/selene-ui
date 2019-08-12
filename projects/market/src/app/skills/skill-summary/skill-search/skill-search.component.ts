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

import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';

import { Subscription } from 'rxjs/internal/Subscription';
import { faArrowLeft, faSearch } from '@fortawesome/free-solid-svg-icons';

import { InstallService } from '../../install.service';
import { SkillsService } from '../../skills.service';

@Component({
    selector: 'market-skill-search',
    templateUrl: './skill-search.component.html',
    styleUrls: ['./skill-search.component.scss']
})
export class SkillSearchComponent implements OnInit, OnDestroy {
    public backArrow = faArrowLeft;
    public searchIcon = faSearch;
    @Output() public searchResults = new EventEmitter();
    public searchTerm: string;
    public skillsAreFiltered: Subscription;
    public showBackButton = false;

    constructor(
        private installService: InstallService,
        private skillsService: SkillsService
    ) {
    }

    ngOnInit() {
        this.skillsAreFiltered = this.skillsService.isFiltered.subscribe(
            (isFiltered) => { this.onFilteredStateChange(isFiltered); }
        );
    }

    ngOnDestroy() {
        this.skillsAreFiltered.unsubscribe();
    }

    /** Clear out the contents of the search bar. */
    clearSearch(): void {
        this.searchTerm = '';
        this.searchSkills();
    }

    /** Call the skill search API to return skills matching the search criteria. */
    searchSkills(): void {
        this.skillsService.searchSkills(this.searchTerm).subscribe(
            (skills) => {
                this.skillsService.availableSkills = skills;
                this.skillsService.getSkillCategories();
                this.searchResults.emit(skills);
                this.installService.getSkillInstallations();
            }
        );
    }

    /** Determine whether or not to show the back button. */
    onFilteredStateChange (isFiltered) {
        this.showBackButton = isFiltered;
    }
}
