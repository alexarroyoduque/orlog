import { css } from 'lit-element';
export const iconsStyles = css`

@font-face {
  font-family: 'icons';
  src: url('../font/icons.eot?17863021');
  src: url('../font/icons.eot?17863021#iefix') format('embedded-opentype'),
       url('../font/icons.woff2?17863021') format('woff2'),
       url('../font/icons.woff?17863021') format('woff'),
       url('../font/icons.ttf?17863021') format('truetype'),
       url('../font/icons.svg?17863021#icons') format('svg');
  font-weight: normal;
  font-style: normal;
}
/* Chrome hack: SVG is rendered more smooth in Windozze. 100% magic, uncomment if you need it. */
/* Note, that will break hinting! In other OS-es font will be not as sharp as it could be */
/*
@media screen and (-webkit-min-device-pixel-ratio:0) {
  @font-face {
    font-family: 'icons';
    src: url('../font/icons.svg?17863021#icons') format('svg');
  }
}
*/
 
 [class^="icon-"]:before, [class*=" icon-"]:before {
  font-family: "icons";
  font-style: normal;
  font-weight: normal;
  speak: never;
 
  display: inline-block;
  text-decoration: inherit;
  width: 1em;
  margin-right: .2em;
  text-align: center;
  /* opacity: .8; */
 
  /* For safety - reset parent styles, that can break glyph codes*/
  font-variant: normal;
  text-transform: none;
 
  /* fix buttons height, for twitter bootstrap */
  line-height: 1em;
 
  /* Animation center compensation - margins should be symmetric */
  /* remove if not needed */
  margin-left: .2em;
 
  /* you can be more comfortable with increased icons size */
  /* font-size: 120%; */
 
  /* Font smoothing. That was taken from TWBS */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  /* Uncomment for 3D effect */
  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */
}
 
.icon-heart:before { content: '\e800'; } /* '' */
.icon-music:before { content: '\e801'; } /* '' */
.icon-helmet:before { content: '\e802'; } /* '' */
.icon-power:before { content: '\e803'; } /* '' */
.icon-help:before { content: '\e804'; } /* '' */
.icon-hand:before { content: '\e805'; } /* '' */
.icon-arrow:before { content: '\e806'; } /* '' */
.icon-shield:before { content: '\e807'; } /* '' */
.icon-axe:before { content: '\e808'; } /* '' */
`;
