export const defaultValues: Partial<FluidPlayerOptions> = {
  layoutControls: {
    primaryColor: '',
    posterImage: '',
    playButtonShowing: true,
    playPauseAnimation: true,
    fillToContainer: true,
    autoPlay: false,
    preload: 'auto',
    mute: false,
    doubleclickFullscreen: true,
    subtitlesEnabled: false,
    keyboardControl: true,
    title: '',
    loop: false,
    logo: {
      imageUrl: '',
      position: 'top left',
      clickUrl: '',
      opacity: 1,
      mouseOverImageUrl: '',
      imageMargin: '2px',
      hideWithControls: false,
      showOverAds: false,
    },
    miniPlayer: {
      enabled: true,
      width: 400,
      height: 225,
      widthMobile: 40,
      placeholderText: 'Playing in Miniplayer',
      position: 'bottom right',
      autoToggle: false,
    },
  },
};

export const completeConfiguration: Partial<FluidPlayerOptions> = {
  layoutControls: {
    miniPlayer: {
      enabled: true,
      width: 400
    },
  },
  onBeforeXMLHttpRequestOpen: (request: XMLHttpRequest) => console.log(request),
  vastOptions: {
    adList: [{
      roll: "preRoll",
      vastTag: "https://pubads.g.doubleclick.net/gampad/ads?iu=/21775744923/external/single_ad_samples&sz=640x480&cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator="
    }]
  }
};
