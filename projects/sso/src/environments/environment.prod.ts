export const environment = {
    production: true,
    mycroftUrls: {
        account: 'https://account.mycroft.ai',
        chat: 'https://chat.mycroft.ai',
        forum: 'https://community.mycroft.ai',
        marketplace: 'https://market.mycroft.ai',
        mimic: 'https://mimic.mycroft.ai',
        singleSignOn: 'https://sso.mycroft.ai',
        translate: 'https://translate.mycroft.ai',
        wordPress: 'https://mycroft.ai'
    },
    facebookClientId: '1143261735743485',
    githubClientId: '096babe444e7da546977',
    googleClientId: '1009582741969-0lbv68ahlqq4bblpna0rhu0fuq33df90.apps.googleusercontent.com'
};

document.write(
    '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-101772425-11"></script>'
);
document.write(
    '<script>' +
        'window.dataLayer = window.dataLayer || []; ' +
        'function gtag(){dataLayer.push(arguments);} ' +
        'gtag("js", new Date()); ' +
        'gtag("config", "UA-101772425-11"); ' +
    '</script>'
);
