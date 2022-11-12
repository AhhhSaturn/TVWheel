function shadeColor(color, percent) {
    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

function getPageType() {
    if (document.URL == 'https://www.twitch.tv/') {
        console.log('TwitchWheel: on home');
        return 'home';
    } else {
        console.log('TwitchWheel: on channel');
        return 'channel';
}};

function registerCustomElements() {
    // overwrite chatHeader with cusChatHeader
    document.getElementsByClassName('iFaqlo stream-chat-header')[0].setAttribute('class', 'cusChatHeader');
    document.getElementsByClassName('cusChatHeader')[0].style.cssText = 'background-color: #18181b; border-bottom: var(--border-width-default) solid var(--color-border-base)  !important; display: flex !important; width: 100% !important; -webkit-box-pack: center !important; justify-content: center !important; -webkit-box-align: center !important; align-items: center !important; flex-shrink: 0 !important; padding-left: 1rem !important; padding-right: 1rem !important; z-index: var(--z-index-above)  !important; height: 5rem;';
    // document.getElementsByClassName('haEUCL channel-leaderboard-header-rotating')[0].setAttribute('class', 'cusLeaderboardHeader');
    // document.getElementsByClassName('cusLeaderboardHeader')[0].style.cssText = 'background-color: #18181b; border-bottom: var(--border-width-default) solid var(--color-border-base)  !important; display: flex !important; width: 100% !important; -webkit-box-pack: center !important; justify-content: center !important; -webkit-box-align: center !important; align-items: center !important; flex-shrink: 0 !important; padding-left: 1rem !important; padding-right: 1rem !important; z-index: var(--z-index-above)  !important; height: 5rem;';
    // document.getElementsByClassName('fvsqaR')[0].setAttribute('class', 'cusChatTray');
    // document.getElementsByClassName('cusChatTray')[0].style.cssText = 'background-color: var(--color-background-alt); border-top: var(--border-width-default) solid var(--color-border-base)  !important; border-left: var(--border-width-default) solid var(--color-border-base)  !important; border-right: var(--border-width-default) solid var(--color-border-base)  !important; border-top-left-radius: 0.6rem !important; border-top-right-radius: 0.6rem !important; display: block !important; padding: 0rem !important; position: relative !important; right: 0px !important; left: 0px !important;';
    // document.getElementsByClassName('jBiZVA about-section__panel--content')[0].setAttribute('class', 'cusChannelInfo'); // old old one
    // document.getElementsByClassName('jBiZVA about-section__panel--content')[0].setAttribute('class', 'cusChannelInfo'); // old one
    // document.querySelectorAll('div.jBiZVA')[0].setAttribute('class', 'cusChannelInfo'); // new one
    // document.getElementsByClassName('cusChannelInfo')[0].style.cssText = 'background-color: var(--color-background-base); border-radius: 0.4rem !important; display: flex !important; padding: 4rem !important; -webkit-box-flex: 1 !important; flex-grow: 1 !important;';
};

function changeThemeColor(color, pageType) {
    let lighterColor = shadeColor(color, 40); // makes dimmer version of the users color
        if (pageType == 'channel') {
            console.log('TwitchWheel: Theme for channel')
            if (typeof document.getElementsByClassName('cusChatHeader')[0] == 'undefined') {
                console.log('TwitchWheel: making custom elements')
                registerCustomElements();
            };
        document.getElementsByClassName('cusChatHeader')[0].style.backgroundColor = color; // chat header
        document.getElementsByClassName('InjectLayout-sc-588ddc-0 chat-list--default font-scale--default hklDpq')[0].style.backgroundColor = color; // chat background
        document.getElementsByClassName('fwjUjn chat-input')[0].style.backgroundColor = color; // user chat input parent
        document.getElementsByClassName('InjectLayout-sc-588ddc-0 chat-list--default font-scale--default hklDpq')[0].style.color = shadeColor(color, 300); // chat text
        document.getElementsByClassName('channel-info-content')[0].style.backgroundColor = lighterColor; // channel info
        // document.getElementsByClassName('cusChannelInfo')[0].style.backgroundColor = lighterColor; // channel info
        };
    document.body.style.color = shadeColor(color, 300); // text
    document.body.style.backgroundColor = lighterColor; // body
    document.getElementsByClassName('simplebar-content side-nav__scrollable_content')[0].style.backgroundColor = color; // more left nav ?
    document.getElementsByClassName('cusNavBar')[0].style.backgroundColor = lighterColor; // top nav
    document.getElementsByTagName('nav')[1].style.backgroundColor = color; // left nav
    document.cookie = `color=${color}; expires=Thu, 18 Dec 2024 12:00:00 UTC; path=/`;
};


function init() {
    pageType = getPageType();
    let cookieColor = document.cookie;
    cookieColor = cookieColor.search('color')
    if (cookieColor !== -1) {
        cookieColor = document.cookie.slice(document.cookie.search('color') + 6, document.cookie.search('color') + 13); // get just hex code from cookie
        changeThemeColor(cookieColor, pageType);
        document.getElementById('colorInputHTML').value = shadeColor(cookieColor, 40);
    } else {
    };
};

//  build HTML Element
const colorForm = document.createElement('form');
const colorInput = document.createElement('input');
colorInput.setAttribute('type', 'color');
colorInput.setAttribute('id', 'colorInputHTML');
colorForm.appendChild(colorInput);
document.getElementsByClassName("Layout-sc-nxg1ff-0 hWJFll")[0].appendChild(colorForm); // places button on screen
// change button css
document.getElementById('colorInputHTML').style.backgroundColor = '#00000000';
document.getElementById('colorInputHTML').style.borderStyle = 'none';
document.getElementById('colorInputHTML').style.width = '25px';
document.getElementById('colorInputHTML').style.height = '30px';
// default twitch colors

// overwrite nav bar class with cusNavBar
document.getElementsByClassName('fMxWnV')[0].setAttribute('class', 'cusNavBar');
document.getElementsByClassName('cusNavBar')[0].style.cssText = 'background-color: var(--color-background-base); display: flex !important; box-shadow: var(--shadow-elevation-1)  !important; -webkit-box-align: stretch !important; align-items: stretch !important; flex-wrap: nowrap !important; height: 100% !important;';

init();
document.getElementById('colorInputHTML').addEventListener('input', () => {
    changeThemeColor(document.getElementById('colorInputHTML').value, pageType);
});

let oldLocation = location.href;
setInterval(function() {
     if(location.href != oldLocation) {
          init();
          oldLocation = location.href;
     }
}, 1000);

// document.getElementsByClassName('Layout-sc-nxg1ff-0 aleoz chat-scrollable-area__message-container')[0].style.backgroundColor = dimColor; changes color of chat messages (works once ???)
// Layout-sc-nxg1ff-0 bFocoO chat-room__viewer-card - makes all chat object white (not what we want)
// InjectLayout-sc-588ddc-0 fVetfg viewer-card-layer - makes all chat object white (not what we want)


// document.cookie = "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/"; - cookies


