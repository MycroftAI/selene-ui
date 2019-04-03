export const environment = {
    production: true,
    mycroftUrls: {
        account: 'https://home.mycroft.ai',
        chat: 'https://chat.mycroft.ai',
        forum: 'https://community.mycroft.ai',
        marketplace: 'https://market.mycroft.ai',
        mimic: 'https://mimic.mycroft.ai',
        singleSignOn: 'https://sso.mycroft.ai',
        translate: 'https://translate.mycroft.ai',
        wordPress: 'https://mycroft.ai'
    }
};

document.write(
    '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-101772425-10"></script>'
);
document.write(
    '<script>' +
    'window.dataLayer = window.dataLayer || []; ' +
    'function gtag(){dataLayer.push(arguments);} ' +
    'gtag("js", new Date());' +
    'gtag("config", "UA-101772425-10"); ' +
    '</script>'
);
