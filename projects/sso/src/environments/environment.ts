// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    mycroftUrls: {
        account: 'https://account.mycroft.test',
        chat: 'https://chat.mycroft.ai',
        forum: 'https://community.mycroft.ai',
        marketplace: 'https://market.mycroft.test',
        mimic: 'https://mimic.mycroft.ai',
        singleSignOn: 'https://sso.mycroft.test',
        translate: 'https://translate-test.mycroft.ai',
        wordPress: 'https://test.mycroft.ai'
    },
    facebookClientId: '2266714353557295',
    githubClientId: '752bb0864dd667c902f4',
    googleClientId: '17489788035-6jpef494tdpiidg80vvfldh2biueiqfi.apps.googleusercontent.com'

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
