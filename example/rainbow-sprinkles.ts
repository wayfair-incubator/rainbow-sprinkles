import { createRainbowSprinkles } from 'rainbow-sprinkles';
import { vars } from './vars.css';

export const {
  getBoxProps,
  createRainbowSprinklesCss,
  extractSprinklesFromProps,
} = createRainbowSprinkles({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  dynamicProperties: {
    // display: true,
    // flexDirection: true,
    // alignItems: true,
    // justifyContent: true,
    // gap: vars.space,
    // padding: vars.space,
    // paddingLeft: vars.space,
    // paddingRight: vars.space,
    // paddingTop: vars.space,
    // paddingBottom: vars.space,
    // width: true,
    // height: true,
    // borderRadius: vars.borderRadius,
    // fontFamily: vars.fontFamily,
    // fontSize: vars.fontSize,
    // lineHeight: vars.lineHeight,
    // textAlign: true,
    // color: vars.color,
    // background: vars.color,
    // margin: true,
    // marginBottom: true,
    // marginLeft: true,
    // marginRight: true,
    // marginTop: true,
    // zIndex: true,
    // position: true,
    // top: vars.space,
    // left: vars.space,
    // right: vars.space,
    // bottom: vars.space,
    // verticalAlign: true,
    // animation: true,
    border: {
      big: '3px',
      little: '1px',
    },
    color: vars.color,
    margin: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    marginTop: vars.space,
  },
  // staticProperties: {
  //   display: ['block', 'flex', 'inline-block', 'inline-flex'],
  //   margin: vars.space,
  //   marginBottom: vars.space,
  //   marginLeft: vars.space,
  //   marginRight: vars.space,
  //   marginTop: vars.space,
  // },
  // shorthands: {
    // p: ['padding'],
    // pl: ['paddingLeft'],
    // pr: ['paddingRight'],
    // pt: ['paddingTop'],
    // pb: ['paddingBottom'],
    // paddingX: ['paddingLeft', 'paddingRight'],
    // paddingY: ['paddingTop', 'paddingBottom'],
    // px: ['paddingLeft', 'paddingRight'],
    // py: ['paddingTop', 'paddingBottom'],
    // bg: ['background'],
    // placeItems: ['alignItems', 'justifyContent'],
    // typeSize: ['fontSize', 'lineHeight'],
    // m: ['margin'],
    // mr: ['marginRight'],
    // ml: ['marginLeft'],
    // mt: ['marginTop'],
    // mb: ['marginBottom'],
    // marginX: ['marginLeft', 'marginRight'],
    // marginY: ['marginTop', 'marginBottom'],
    // mx: ['marginLeft', 'marginRight'],
    // my: ['marginTop', 'marginBottom'],
    // size: ['height', 'width'],
  // },
});

export type Sprinkles = Parameters<typeof getBoxProps>[1];
