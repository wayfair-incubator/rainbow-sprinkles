import * as VE from '@vanilla-extract/css';
import { createStyles } from '../createStyles';
import { BaseConditions } from '../types';

const TABLET = 'screen and (min-width: 768px)';
const DESKTOP = 'screen and (min-width: 1024px)';

const conditions: BaseConditions = {
  mobile: {},
  tablet: { '@media': TABLET },
  desktop: { '@media': DESKTOP },
};

const scale = {
  primary: 'primary-color',
  secondary: 'secondary-color',
};

it('returns expected configuration with vars scale', () => {
  const style = jest.spyOn(VE, 'style');
  const result = createStyles('backgroundColor', scale, conditions);

  const calledArgs = style.mock.calls;
  expect(calledArgs.length).toBe(3);

  expect(calledArgs[0][0]).toMatchObject({
    backgroundColor: '--backgroundColor-mobile',
  });
  expect(calledArgs[1][0]).toMatchObject({
    '@media': { [TABLET]: { backgroundColor: '--backgroundColor-tablet' } },
  });
  expect(calledArgs[2][0]).toMatchObject({
    '@media': { [DESKTOP]: { backgroundColor: '--backgroundColor-desktop' } },
  });

  expect(result).toMatchObject({
    classes: {
      dynamic: {
        mobile: expect.stringContaining(''),
        tablet: expect.stringContaining(''),
        desktop: expect.stringContaining(''),
      },
    },
    name: 'backgroundColor',
    vars: {
      mobile: expect.stringContaining(''),
      tablet: expect.stringContaining(''),
      desktop: expect.stringContaining(''),
    },
    scale,
  });

  style.mockClear();
});

it('returns expected configuration with scale: true', () => {
  const style = jest.spyOn(VE, 'style');
  const result = createStyles('backgroundColor', true, conditions);

  const calledArgs = style.mock.calls;
  expect(calledArgs.length).toBe(3);

  expect(calledArgs[0][0]).toMatchObject({
    backgroundColor: '--backgroundColor-mobile',
  });
  expect(calledArgs[1][0]).toMatchObject({
    '@media': { [TABLET]: { backgroundColor: '--backgroundColor-tablet' } },
  });
  expect(calledArgs[2][0]).toMatchObject({
    '@media': { [DESKTOP]: { backgroundColor: '--backgroundColor-desktop' } },
  });

  expect(result).toMatchObject({
    classes: {
      dynamic: {
        mobile: expect.stringContaining(''),
        tablet: expect.stringContaining(''),
        desktop: expect.stringContaining(''),
      },
    },
    name: 'backgroundColor',
    vars: {
      mobile: expect.stringContaining(''),
      tablet: expect.stringContaining(''),
      desktop: expect.stringContaining(''),
    },
  });

  style.mockClear();
});
