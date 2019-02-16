import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

const accountUrl = '/api/account';
const agreementUrl = '/api/agreement/';

export interface Agreement {
    type: string;
    version: string;
    content: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

    constructor(private http: HttpClient) {
    }

    getAgreement(agreementType: string) {
        let url_suffix: string;
        if (agreementType === 'Terms of Use') {
            url_suffix = 'terms-of-use';
        } else {
            url_suffix = 'privacy-policy';
        }
        return this.http.get<Agreement>(agreementUrl + url_suffix);
    }

    addAccount(newAcctForm: FormGroup) {
        return this.http.post<any>(accountUrl, newAcctForm.value);
    }
}
