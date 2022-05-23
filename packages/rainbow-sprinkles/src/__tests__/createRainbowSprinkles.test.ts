import { createRainbowSprinkles } from '../createRainbowSprinkles';

const vars = {
  space: {
    none: '0',
    '1x': '5px',
    '2x': '10px',
    '3x': '15px',
  },
  color: {
    white: '#fff',
    gray50: '#efefef',
    gray100: '#fefefe',
    gray200: '#333333',
  },
  borderRadius: {
    '0x': '0px',
    '1x': '3px',
    '2x': '8px',
    full: '99999px',
  },
  fontFamily: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  fontSize: {
    '0x': '10px',
    '1x': '15px',
    '2x': '20px',
  },
};

describe('dynamic properties only', () => {
  const rainbowSprinkles = createRainbowSprinkles({
    conditions: {
      mobile: {},
      tablet: { '@media': 'screen and (min-width: 768px)' },
      desktop: { '@media': 'screen and (min-width: 1024px)' },
    },
    defaultCondition: 'mobile',
    dynamicProperties: {
      display: true,
      flexDirection: true,
      alignItems: true,
      justifyContent: true,
      gap: vars.space,
      padding: vars.space,
      paddingLeft: vars.space,
      paddingRight: vars.space,
      paddingTop: vars.space,
      paddingBottom: vars.space,
      width: true,
      height: true,
      borderRadius: vars.borderRadius,
      fontFamily: vars.fontFamily,
      fontSize: vars.fontSize,
      textAlign: true,
      color: vars.color,
      background: vars.color,
    },
    shorthands: {
      p: ['padding'],
      pl: ['paddingLeft'],
      pr: ['paddingRight'],
      pt: ['paddingTop'],
      pb: ['paddingBottom'],
      paddingX: ['paddingLeft', 'paddingRight'],
      paddingY: ['paddingTop', 'paddingBottom'],
      px: ['paddingLeft', 'paddingRight'],
      py: ['paddingTop', 'paddingBottom'],
      bg: ['background'],
      placeItems: ['alignItems', 'justifyContent'],
    },
  });

  describe('rainbowSprinkles', () => {
    it('handles scale values and non-scale values', () => {
      expect(
        rainbowSprinkles({ color: '$gray50', padding: '40px' }),
      ).toMatchObject({
        className: 'color-mobile padding-mobile',
        style: {
          '--color-mobile': vars.color['gray50'],
          '--padding-mobile': '40px',
        },
      });
    });

    it('handles shorthands', () => {
      expect(rainbowSprinkles({ px: '$1x' })).toMatchObject({
        className: 'paddingLeft-mobile paddingRight-mobile',
        style: {
          '--paddingLeft-mobile': vars.space['1x'],
          '--paddingRight-mobile': vars.space['1x'],
        },
      });
    });

    it('handles conditionals', () => {
      expect(
        rainbowSprinkles({
          px: { mobile: '$1x', tablet: '$2x' },
          fontSize: { mobile: '$1x', desktop: '$2x' },
        }),
      ).toMatchObject({
        className:
          'paddingLeft-mobile paddingLeft-tablet paddingRight-mobile paddingRight-tablet fontSize-mobile fontSize-desktop',
        style: {
          '--paddingLeft-mobile': vars.space['1x'],
          '--paddingRight-mobile': vars.space['1x'],
          '--paddingLeft-tablet': vars.space['2x'],
          '--paddingRight-tablet': vars.space['2x'],
          '--fontSize-mobile': vars.fontSize['1x'],
          '--fontSize-desktop': vars.fontSize['2x'],
        },
      });
    });
  });
});

describe('static and dynamic properties', () => {
  const rainbowSprinkles = createRainbowSprinkles({
    dynamicProperties: {
      display: true,
    },
    staticProperties: {
      display: ['block', 'inline-block'],
      textAlign: ['left', 'right'],
    },
    conditions: {
      mobile: {},
      tablet: { '@media': 'screen and (min-width: 768px)' },
      desktop: { '@media': 'screen and (min-width: 1024px)' },
    },
    defaultCondition: 'mobile',
  });

  describe('rainbowSprinkles', () => {
    describe('props with static and dynamic values', () => {
      it('creates just static classes', () => {
        expect(rainbowSprinkles({ display: 'block' })).toMatchObject({
          className: 'display-block-mobile',
        });
      });

      it('creates class and var for dynamic value', () => {
        expect(rainbowSprinkles({ display: 'flex' })).toMatchObject({
          className: 'display-mobile',
          style: {
            '--display-mobile': 'flex',
          },
        });
      });

      it('handles static and dynamic values within conditional object', () => {
        expect(
          rainbowSprinkles({
            display: {
              mobile: 'block',
              tablet: 'flex',
              desktop: 'inline-block',
            },
          }),
        ).toMatchObject({
          className:
            'display-block-mobile display-tablet display-inline-block-desktop',
          style: {
            '--display-tablet': 'flex',
          },
        });
      });

      it('handles just static values in a conditional object', () => {
        expect(
          rainbowSprinkles({
            display: { mobile: 'block', tablet: 'inline-block' },
          }),
        ).toMatchObject({
          className: 'display-block-mobile display-inline-block-tablet',
        });
      });
    });

    describe('props with just static values', () => {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(rainbowSprinkles({ textAlign: 'left' })).toMatchObject({
        className: 'textAlign-left-mobile',
        otherProps: {},
        style: {},
      });
      // @ts-expect-error
      expect(rainbowSprinkles({ textAlign: 'center' })).toMatchObject({
        className: '',
        otherProps: {},
        style: {},
      });
      expect(
        rainbowSprinkles({
          // @ts-expect-error
          textAlign: { mobile: 'left', tablet: 'center' },
        }),
      ).toMatchObject({
        className: 'textAlign-left-mobile',
      });
      expect(console.error).toHaveBeenCalledTimes(2);

      consoleError.mockRestore();
    });
  });
});

describe('static and dynamic properties and shorthands', () => {
  const rainbowSprinkles = createRainbowSprinkles({
    dynamicProperties: {
      backgroundColor: true,
      marginLeft: true,
      marginRight: true,
    },
    staticProperties: {
      backgroundColor: vars.color,
      marginLeft: vars.space,
      marginRight: vars.space,
    },
    shorthands: {
      mx: ['marginLeft', 'marginRight'],
      bg: ['backgroundColor'],
    },
    conditions: {
      mobile: {},
      tablet: { '@media': 'screen and (min-width: 768px)' },
      desktop: { '@media': 'screen and (min-width: 1024px)' },
    },
    defaultCondition: 'mobile',
  });

  describe('rainbowSprinkles', () => {
    it('handles shorthands', () => {
      expect(
        rainbowSprinkles({
          bg: '$gray50',
          mx: '24px',
        }),
      ).toMatchObject({
        className:
          'backgroundColor-gray50-mobile marginLeft-mobile marginRight-mobile',
        style: {
          '--marginLeft-mobile': '24px',
          '--marginRight-mobile': '24px',
        },
      });
    });

    it('handles responsive shorthands', () => {
      expect(
        rainbowSprinkles({
          bg: { mobile: '$gray50', tablet: 'seagreen' },
          mx: { mobile: '$2x', desktop: '50px' },
        }),
      ).toMatchObject({
        className:
          'backgroundColor-gray50-mobile backgroundColor-tablet marginLeft-2x-mobile marginLeft-desktop marginRight-2x-mobile marginRight-desktop',
        style: {
          '--backgroundColor-tablet': 'seagreen',
          '--marginLeft-desktop': '50px',
          '--marginRight-desktop': '50px',
        },
      });
    });
  });
});
