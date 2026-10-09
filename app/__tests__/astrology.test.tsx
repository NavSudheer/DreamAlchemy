import React from 'react';
import { Alert } from 'react-native';
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
    jest.restoreAllMocks();
  });

  const field = (label: string) => screen.root.findByProps({ accessibilityLabel: label });
  const calculate = () => act(() => {
    const button = screen.root.findAllByType('Button' as never).find(node => node.props.children === 'Calculate Chart');
    if (!button) throw new Error('Calculate Chart button not found');
    button.props.onPress();
  });
  const visibleText = () => screen.root.findAllByType('Text' as never)
    .map(node => Array.isArray(node.props.children) ? node.props.children.join('') : node.props.children)
    .filter(value => typeof value === 'string');

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

  it('explains invalid leap-day dates precisely', () => {
    act(() => field('Birth date').props.onChangeText('1997-02-29'));

    calculate();

    expect(visibleText()).toContain('Birth date: 1997 is not a leap year. February has only 28 days in 1997.');
  });

  it('identifies a missing latitude after profile validation succeeds', () => {
    act(() => field('Birth date').props.onChangeText('1997-11-15'));

    calculate();

    expect(visibleText()).toContain('Latitude is required. Enter a value from -90 to 90.');
  });

  it('reveals accessible coordinate guidance on demand', () => {
    const toggle = screen.root.findByProps({ accessibilityLabel: 'Coordinate help' });
    expect(toggle.props.accessibilityState).toEqual({ expanded: false });

    act(() => toggle.props.onPress());

    expect(screen.root.findByProps({ accessibilityLabel: 'Coordinate help' }).props.accessibilityState).toEqual({ expanded: true });
    expect(visibleText()).toContain('Birth Location Coordinates Help');
    expect(visibleText()).toContain('Privacy & Storage Policy');
  });

  it('reveals IANA timezone guidance on demand', () => {
    const toggle = screen.root.findByProps({ accessibilityLabel: 'Timezone help' });
    expect(toggle.props.accessibilityState).toEqual({ expanded: false });

    act(() => toggle.props.onPress());

    expect(screen.root.findByProps({ accessibilityLabel: 'Timezone help' }).props.accessibilityState).toEqual({ expanded: true });
    expect(visibleText()).toContain('Birth Timezone Help');
    expect(visibleText()).toContain('Why Country Names & Abbreviations Are Rejected');
  });

  it('reveals optional birth-time guidance on demand', () => {
    const toggle = screen.root.findByProps({ accessibilityLabel: 'Birth time help' });
    expect(toggle.props.accessibilityState).toEqual({ expanded: false });

    act(() => toggle.props.onPress());

    expect(screen.root.findByProps({ accessibilityLabel: 'Birth time help' }).props.accessibilityState).toEqual({ expanded: true });
    expect(visibleText()).toContain('Birth Time Guidance');
    expect(visibleText()).toContain('Date-Only Mode & Unknown Times');
  });

  it('reveals birth-date format and privacy guidance on demand', () => {
    const toggle = screen.root.findByProps({ accessibilityLabel: 'Birth date help' });
    expect(toggle.props.accessibilityState).toEqual({ expanded: false });

    act(() => toggle.props.onPress());

    expect(screen.root.findByProps({ accessibilityLabel: 'Birth date help' }).props.accessibilityState).toEqual({ expanded: true });
    expect(visibleText()).toContain('Birth Date Guidance');
    expect(visibleText()).toContain('Why Full Names Are Unnecessary');
  });

  it('warns against entering a detailed address without blocking the optional label', () => {
    act(() => field('Private location label (optional)').props.onChangeText('123 Elm Street, Apt 4B'));

    expect(visibleText()).toContain('To protect your privacy, avoid entering street names, house numbers, or specific addresses.');
  });

  it('reveals local location-label privacy guidance on demand', () => {
    const toggle = screen.root.findByProps({ accessibilityLabel: 'Location label help' });
    expect(toggle.props.accessibilityState).toEqual({ expanded: false });

    act(() => toggle.props.onPress());

    expect(screen.root.findByProps({ accessibilityLabel: 'Location label help' }).props.accessibilityState).toEqual({ expanded: true });
    expect(visibleText()).toContain('Location Label Guidance');
    expect(visibleText()).toContain('Excluded From Network Requests');
  });

  it('reveals the sent-versus-local request summary before consent', () => {
    const toggle = screen.root.findByProps({ accessibilityLabel: 'Astrology data sharing summary' });
    expect(toggle.props.accessibilityState).toEqual({ expanded: false });

    act(() => toggle.props.onPress());

    expect(screen.root.findByProps({ accessibilityLabel: 'Astrology data sharing summary' }).props.accessibilityState).toEqual({ expanded: true });
    expect(visibleText()).toContain('Astrology Data Sharing Summary');
    expect(visibleText()).toContain('Sent for Chart Calculation · Sent to Server');
    expect(visibleText()).toContain('Never Included in Astrology Requests · Strictly Isolated');
  });

  it('explains deletion scope and the external-provider limitation before deletion', () => {
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => undefined);
    const button = screen.root.findAllByType('Button' as never)
      .find(node => node.props.children === 'Delete local astrology data');
    if (!button) throw new Error('Delete local astrology data button not found');

    act(() => button.props.onPress());

    expect(alert).toHaveBeenCalledWith(
      'Delete local astrology data?',
      expect.stringContaining('Your dream journals remain unaffected'),
      expect.any(Array),
    );
    expect(alert.mock.calls[0][1]).toContain('data previously sent to external providers cannot be retracted');
  });
});
