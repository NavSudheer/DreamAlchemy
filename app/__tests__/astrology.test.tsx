import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import AstrologyScreen from '../astrology';

jest.mock('expo-router', () => ({ useRouter: () => ({ back: jest.fn() }) }));
jest.mock('@/components/ui/Header', () => 'Header');
jest.mock('@/components/ui/Text', () => 'Text');
jest.mock('@/components/ui/Card', () => 'Card');
jest.mock('@/components/ui/Button', () => 'Button');
jest.mock('@/providers/ThemeProvider', () => ({ useTheme: () => ({ isDark: true }) }));
jest.mock('@/services/astrologyStorage', () => ({
  readLocalAstrologyBundle: jest.fn(() => Promise.resolve(null)),
  writeLocalAstrologyBundle: jest.fn(() => Promise.resolve()),
  deleteLocalAstrologyData: jest.fn(() => Promise.resolve()),
}));
jest.mock('@/services/astrologyRemote', () => ({
  AstrologyRemoteError: class AstrologyRemoteError extends Error {},
  calculateAstrologyChart: jest.fn(),
  generateAstrologyReflection: jest.fn(),
}));

describe('astrology form validation', () => {
  let screen: ReactTestRenderer;

  beforeEach(async () => {
    await act(async () => { screen = create(<AstrologyScreen />); });
  });

  afterEach(() => {
    act(() => screen.unmount());
  });

  const field = (label: string) => screen.root.findByProps({ accessibilityLabel: label });
  const calculate = () => act(() => {
    const button = screen.root.findAllByType('Button' as never).find(node => node.props.children === 'Calculate Chart');
    if (!button) throw new Error('Calculate Chart button not found');
    button.props.onPress();
  });
  const visibleText = () => screen.root.findAllByType('Text' as never).map(node => node.props.children).filter(value => typeof value === 'string');

  it('names the rejected timezone and gives an IANA example', () => {
    act(() => {
      field('Birth date').props.onChangeText('1997-11-15');
      field('Birth time (optional)').props.onChangeText('12:00');
      field('Timezone when time is provided').props.onChangeText('India');
    });

    calculate();

    expect(visibleText()).toContain('Timezone "India" is not valid. Use an IANA timezone such as "Asia/Kolkata".');
    expect(field('Timezone when time is provided').props.style).toEqual(expect.arrayContaining([
      expect.objectContaining({ borderWidth: 1 }),
    ]));
  });

  it('identifies a malformed birth date', () => {
    act(() => field('Birth date').props.onChangeText('11/15/1997'));

    calculate();

    expect(visibleText()).toContain('Birth date "11/15/1997" is not valid. Use YYYY-MM-DD.');
  });

  it('identifies a missing latitude after profile validation succeeds', () => {
    act(() => field('Birth date').props.onChangeText('1997-11-15'));

    calculate();

    expect(visibleText()).toContain('Latitude is required. Enter a value from -90 to 90.');
  });
});
