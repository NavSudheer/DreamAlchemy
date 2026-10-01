import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useTheme } from '@/providers/ThemeProvider';
import { BorderRadius, Colors, spacing } from '@/utils/theme';
import Text from '@/components/ui/Text';
import Card from '@/components/ui/Card';

const AUDIO_SOURCE = require('../../../assets/audio/theta-6hz-loop.wav');
const PRESETS = [5, 10, 20];
const VOLUMES = [
  { label: 'Low', value: 0.18 },
  { label: 'Medium', value: 0.35 },
  { label: 'High', value: 0.5 },
];

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export function MeditationTimer() {
  const { isDark } = useTheme();
  const [durationMinutes, setDurationMinutes] = useState(10);
  const [remainingSeconds, setRemainingSeconds] = useState(10 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [volume, setVolume] = useState(0.35);
  const player = useAudioPlayer(AUDIO_SOURCE);

  const progress = useMemo(
    () => 1 - remainingSeconds / (durationMinutes * 60),
    [durationMinutes, remainingSeconds]
  );

  useEffect(() => {
    player.loop = true;
    player.volume = volume;
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => undefined);

    return () => player.pause();
  }, [player, volume]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setRemainingSeconds(current => {
        if (current <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          player.pause();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, player]);

  const selectDuration = (minutes: number) => {
    setIsRunning(false);
    player.pause();
    setDurationMinutes(minutes);
    setRemainingSeconds(minutes * 60);
  };

  const toggleSession = () => {
    if (remainingSeconds === 0) setRemainingSeconds(durationMinutes * 60);

    if (isRunning) {
      player.pause();
      setIsRunning(false);
      return;
    }

    if (audioEnabled) player.play();
    setIsRunning(true);
  };

  const resetSession = () => {
    player.pause();
    player.seekTo(0).catch(() => undefined);
    setIsRunning(false);
    setRemainingSeconds(durationMinutes * 60);
  };

  const toggleAudio = () => {
    if (audioEnabled) player.pause();
    else if (isRunning) player.play();
    setAudioEnabled(current => !current);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text
        variant="body1"
        color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
        style={styles.intro}
      >
        Use this quiet session for relaxation, visualization, or a gentle pre-sleep intention. It is optional: a quiet timer works just as well.
      </Text>

      <Card variant="elevated" style={styles.card} backgroundColor={isDark ? Colors.neutral[800] : Colors.neutral[50]}>
        <View style={styles.timerHeader}>
          <Ionicons name="timer-outline" size={24} color={isDark ? Colors.accent[300] : Colors.primary[600]} />
          <Text variant="h4" color={isDark ? Colors.neutral[100] : Colors.neutral[800]} style={styles.timerTitle}>
            Quiet visualization session
          </Text>
        </View>

        <View style={[styles.clock, { borderColor: isDark ? Colors.accent[400] : Colors.primary[500] }]}>
          <Text variant="h1" color={isDark ? Colors.neutral[50] : Colors.neutral[800]}>{formatTime(remainingSeconds)}</Text>
          <View style={[styles.progressTrack, { backgroundColor: isDark ? Colors.neutral[700] : Colors.neutral[200] }]}>
            <View style={[styles.progressFill, { width: `${Math.max(0, progress) * 100}%`, backgroundColor: isDark ? Colors.accent[400] : Colors.primary[500] }]} />
          </View>
        </View>

        <View style={styles.presetRow}>
          {PRESETS.map(minutes => {
            const selected = durationMinutes === minutes;
            return (
              <TouchableOpacity key={minutes} onPress={() => selectDuration(minutes)} style={[styles.chip, selected && styles.chipActive]} accessibilityRole="button" accessibilityState={{ selected }}>
                <Text variant="body2" color={selected ? Colors.neutral[50] : isDark ? Colors.neutral[200] : Colors.neutral[700]}>{minutes} min</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity onPress={toggleSession} style={[styles.primaryButton, { backgroundColor: isDark ? Colors.accent[600] : Colors.primary[600] }]} accessibilityRole="button">
          <Ionicons name={isRunning ? 'pause' : 'play'} size={20} color={Colors.neutral[50]} />
          <Text variant="button" color={Colors.neutral[50]} style={styles.primaryButtonText}>{isRunning ? 'Pause session' : remainingSeconds === 0 ? 'Start again' : 'Start session'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resetSession} style={styles.resetButton} accessibilityRole="button" accessibilityLabel="Reset meditation timer">
          <Ionicons name="refresh" size={18} color={isDark ? Colors.neutral[300] : Colors.neutral[600]} />
          <Text variant="body2" color={isDark ? Colors.neutral[300] : Colors.neutral[600]} style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </Card>

      <Card variant="elevated" style={styles.card} backgroundColor={isDark ? Colors.neutral[800] : Colors.neutral[50]}>
        <View style={styles.audioHeader}>
          <View style={styles.audioTitleRow}>
            <Ionicons name="headset-outline" size={22} color={isDark ? Colors.accent[300] : Colors.primary[600]} />
          <Text variant="h5" color={isDark ? Colors.neutral[100] : Colors.neutral[800]} style={styles.audioTitle}>Optional ambience</Text>
          </View>
          <TouchableOpacity onPress={toggleAudio} style={[styles.audioToggle, audioEnabled && styles.audioToggleActive]} accessibilityRole="switch" accessibilityState={{ checked: audioEnabled }} accessibilityLabel="Toggle theta audio">
            <Text variant="caption" color={audioEnabled ? Colors.neutral[50] : isDark ? Colors.neutral[300] : Colors.neutral[600]}>{audioEnabled ? 'On' : 'Off'}</Text>
          </TouchableOpacity>
        </View>
        <Text variant="body2" color={isDark ? Colors.neutral[400] : Colors.neutral[600]} style={styles.audioDescription}>
          This is a quiet, looping tone bed. Keep it at a comfortable volume, use headphones only if that feels comfortable, and turn it off whenever you prefer silence.
        </Text>
        <Text variant="body2" color={isDark ? Colors.neutral[400] : Colors.neutral[600]} style={styles.audioDescription}>
          You might settle on an image, a simple intention, or simply notice your breathing. Audio and visualization do not guarantee sleep or dream outcomes.
        </Text>
        <View style={styles.volumeRow}>
          {VOLUMES.map(option => {
            const selected = volume === option.value;
            return <TouchableOpacity key={option.label} onPress={() => setVolume(option.value)} style={[styles.chip, selected && styles.chipActive]} accessibilityRole="button" accessibilityState={{ selected }}><Text variant="body2" color={selected ? Colors.neutral[50] : isDark ? Colors.neutral[200] : Colors.neutral[700]}>{option.label}</Text></TouchableOpacity>;
          })}
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: spacing[4], paddingBottom: 110 },
  intro: { marginBottom: spacing[4], textAlign: 'center' },
  card: { marginBottom: spacing[4], padding: spacing[4] },
  timerHeader: { alignItems: 'center', flexDirection: 'row', marginBottom: spacing[4] },
  timerTitle: { marginLeft: spacing[2] },
  clock: { alignItems: 'center', borderRadius: BorderRadius.xl, borderWidth: 2, padding: spacing[5] },
  progressTrack: { borderRadius: BorderRadius.pill, height: 6, marginTop: spacing[3], overflow: 'hidden', width: '100%' },
  progressFill: { height: '100%' },
  presetRow: { flexDirection: 'row', gap: spacing[2], justifyContent: 'center', marginTop: spacing[4] },
  chip: { borderColor: Colors.neutral[300], borderRadius: BorderRadius.pill, borderWidth: 1, paddingHorizontal: spacing[3], paddingVertical: spacing[2] },
  chipActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  primaryButton: { alignItems: 'center', borderRadius: BorderRadius.lg, flexDirection: 'row', justifyContent: 'center', marginTop: spacing[4], paddingVertical: spacing[3] },
  primaryButtonText: { marginLeft: spacing[2] },
  resetButton: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: spacing[3], padding: spacing[2] },
  resetText: { marginLeft: spacing[1] },
  audioHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  audioTitleRow: { alignItems: 'center', flexDirection: 'row', flex: 1 },
  audioTitle: { marginLeft: spacing[2] },
  audioToggle: { borderColor: Colors.neutral[300], borderRadius: BorderRadius.pill, borderWidth: 1, paddingHorizontal: spacing[3], paddingVertical: spacing[1] },
  audioToggleActive: { backgroundColor: Colors.primary[600], borderColor: Colors.primary[600] },
  audioDescription: { lineHeight: 20, marginTop: spacing[3] },
  volumeRow: { flexDirection: 'row', gap: spacing[2], marginTop: spacing[4] },
});
