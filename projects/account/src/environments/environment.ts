// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    mycroftUrls: {
        account: 'https://account.mycroft.test',
        chat: 'https://chat.mycroft.ai',
        forum: 'https://community.mycroft.ai',
        marketplace: 'http://localhost:4202',
        mimic: 'http://mimic.mycroft,ai',
        singleSignOn: 'https://sso.mycroft.test',
        translate: 'https://translate-test.mycroft.ai',
        wordPress: 'https://test.mycroft.ai'
    },
    stripeApiKey: 'pk_test_TqHz3ZzSHLFAjlmamQvLgQ5F'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
