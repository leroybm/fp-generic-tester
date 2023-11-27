import fluidPlayer from "fluid-player";
// import {
//   array,
//   boolean,
//   define,
//   Describe,
//   func,
//   nullable,
//   number,
//   object,
//   optional,
//   partial,
//   string,
//   union,
// } from "superstruct";

// export const VTTPreviewOptions: Describe<VTTPreviewOptions> = object({
//   file: string(),
//   type: define('VTT', x => x === 'VTT'),
//   spriteRelativePath: optional(boolean()),
//   sprite: optional(boolean())
// }) as unknown;
//
// export const LayoutControls: Describe<LayoutControls> = object({
//   layout: string(),
//   controlBar: partial(object({
//     autoHide: boolean(),
//     autoHideTimeout: number(),
//     animated: boolean(),
//   })),
//   miniPlayer: partial(object({
//     enabled: boolean(),
//     width: number(),
//     height: number(),
//     widthMobile: number(),
//     placeholderText: string(),
//     position: string(),
//     autoToggle: boolean(),
//   })),
//   allowDownload: boolean(),
//   autoPlay: boolean(),
//   allowTheatre: boolean(),
//   keyboardControl: boolean(),
//   mute: boolean(),
//   loop: boolean(),
//   preload: string(),
//   title: string(),
//   fillToContainer: boolean(),
//   doubleclickFullscreen: boolean(),
//   playbackRateEnabled: boolean(),
//   playButtonShowing: boolean(),
//   playerInitCallback: func(),
//   playPauseAnimation: boolean(),
//   posterImage: union([string(), boolean()]),
//   primaryColor: union([string(), boolean()]),
//   showCardBoardJoystick: boolean(),
//   showCardBoardView: boolean(),
//   subtitlesEnabled: boolean(),
//   logo: partial(object({
//     imageUrl: nullable(string()),
//     position: string(),
//     clickUrl: nullable(string()),
//     opacity: number(),
//     mouseOverImageUrl: nullable(string()),
//     imageMargin: string(),
//     hideWithControls: boolean(),
//     showOverAds: boolean(),
//   })),
//   contextMenu: partial(object({
//     controls: boolean(),
//     links: array(object({
//       href: string(),
//       label: string()
//     }))
//   })),
//   controlForwardBackward: partial(object({
//     show: boolean(),
//     doubleTapMobile: boolean(),
//   })),
//   htmlOnPauseBlock: partial(object({
//     html: nullable(string()),
//     height: nullable(number()),
//     width: nullable(number()),
//   })),
//   persistentSettings: partial(object({
//     volume: boolean(),
//     quality: boolean(),
//     speed: boolean(),
//     theatre: boolean(),
//   })),
//   theatreAdvanced: partial(object({
//     theatreElement: string(),
//     classToApply: string(),
//   })),
//   theatreSettings: partial(object({
//     width: string(),
//     height: string(),
//     marginTop: number(),
//     horizontalAlign: string(),
//   })),
//   timelinePreview: union([])
// });
//
// export const FluidPlayerOptions: Describe<FluidPlayerOptions> = object({
//   layoutControls: partial(LayoutControls),
//   debug: boolean(),
//   modules: object(),
//   vastOptions: object(),
//   captions: object(),
//   onBeforeXMLHttpRequest: func(),
//   onBeforeXMLHttpRequestOpen: func(),
// });

// Use fluidPlayer variable to avoid unused import error, we are just using types from the package here.
(() => typeof fluidPlayer === "function")();
