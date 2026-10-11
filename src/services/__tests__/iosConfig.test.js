/* global describe, it, expect */

const appConfig = require('../../../app.json');

describe('iOS release privacy configuration', () => {
  const infoPlist = appConfig.expo.ios.infoPlist;

  it('declares the permissions used by optional native voice dictation', () => {
    expect(infoPlist.NSMicrophoneUsageDescription).toContain('microphone');
    expect(infoPlist.NSSpeechRecognitionUsageDescription).toContain('speech recognition');
    expect(appConfig.expo.plugins).toContain('@react-native-voice/voice');
  });

  it('does not request photo-library access for unavailable Dream Image actions', () => {
    expect(infoPlist).not.toHaveProperty('NSPhotoLibraryUsageDescription');
  });
});
