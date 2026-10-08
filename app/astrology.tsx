import React, { useEffect, useState } from 'react';
import { Alert, KeyboardTypeOptions, ScrollView, StyleSheet, Switch, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useTheme } from '@/providers/ThemeProvider';
import { BorderRadius, Colors, spacing } from '@/utils/theme';
import { createLocalBirthProfile } from '@/services/astrology';
import { calculateAstrologyChart, generateAstrologyReflection } from '@/services/astrologyRemote';
import { deleteLocalAstrologyData, readLocalAstrologyBundle, writeLocalAstrologyBundle } from '@/services/astrologyStorage';
import { AstrologyChart, AstrologyReflection, LocalAstrologyBundle } from '@/types/astrology';

const parseDate = (value: string) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  return match ? { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) } : undefined;
};

const parseTime = (value: string) => {
  if (!value.trim()) return undefined;
  const match = /^(\d{2}):(\d{2})$/.exec(value.trim());
  return match ? { hour: Number(match[1]), minute: Number(match[2]) } : { hour: undefined, minute: undefined };
};

export default function AstrologyScreen() {
  const router = useRouter();
  const { isDark } = useTheme();
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [timezone, setTimezone] = useState('');
  const [locationLabel, setLocationLabel] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [consented, setConsented] = useState(false);
  const [chart, setChart] = useState<AstrologyChart>();
  const [reflection, setReflection] = useState<AstrologyReflection>();
  const [busy, setBusy] = useState<'chart' | 'reflection' | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void readLocalAstrologyBundle().then(bundle => {
      if (!bundle) return;
      const { year, month, day } = bundle.profile.birthDate;
      setBirthDate(`${year.toString().padStart(4, '0')}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
      if (bundle.profile.birthTime) setBirthTime(`${bundle.profile.birthTime.hour.toString().padStart(2, '0')}:${bundle.profile.birthTime.minute.toString().padStart(2, '0')}`);
      setTimezone(bundle.profile.timezone ?? '');
      setLocationLabel(bundle.profile.locationLabel ?? '');
      setChart(bundle.chart);
      setReflection(bundle.reflection);
    }).catch(() => setMessage('Saved astrology data could not be read.'));
  }, []);

  const consent = {
    acknowledgedAt: Date.now(),
    reflectiveUseAcknowledged: true as const,
    externalProcessingAllowed: true,
  };

  const buildProfile = () => createLocalBirthProfile({
    birthDate: parseDate(birthDate),
    birthTime: parseTime(birthTime),
    timezone: timezone.trim() || undefined,
    locationLabel: locationLabel.trim() || undefined,
  });

  const calculate = async () => {
    setMessage('');
    const profile = buildProfile();
    const lat = Number(latitude);
    const lon = Number(longitude);
    if (!profile) return setMessage('Check the birth date, optional time, and timezone fields.');
    if (!Number.isFinite(lat) || lat < -90 || lat > 90 || !Number.isFinite(lon) || lon < -180 || lon > 180) return setMessage('Enter valid latitude and longitude values.');
    if (!consented) return setMessage('Consent is required before sending birth details for calculation.');

    setBusy('chart');
    try {
      const nextChart = await calculateAstrologyChart(profile, { latitude: lat, longitude: lon }, consent);
      const bundle: LocalAstrologyBundle = { profile, chart: nextChart };
      await writeLocalAstrologyBundle(bundle);
      setChart(nextChart);
      setReflection(undefined);
      setMessage('Chart calculated and saved on this device.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not calculate the chart.');
    } finally {
      setBusy(null);
    }
  };

  const createReflection = async () => {
    if (!chart || !consented) return;
    setBusy('reflection');
    setMessage('');
    try {
      const nextReflection = await generateAstrologyReflection(chart, consent);
      const profile = buildProfile();
      if (!profile) throw new Error('The local profile is no longer valid.');
      await writeLocalAstrologyBundle({ profile, chart, reflection: nextReflection });
      setReflection(nextReflection);
      setMessage('Reflection generated and saved on this device.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not create the reflection.');
    } finally {
      setBusy(null);
    }
  };

  const removeData = () => {
    Alert.alert(
      'Delete local astrology data?',
      'This removes the saved birth profile, chart, and reflection from this device.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            void deleteLocalAstrologyData().then(() => {
              setChart(undefined);
              setReflection(undefined);
              setBirthDate('');
              setBirthTime('');
              setTimezone('');
              setLocationLabel('');
              setLatitude('');
              setLongitude('');
              setConsented(false);
              setMessage('Local astrology data deleted.');
            }).catch(() => setMessage('Local astrology data could not be deleted.'));
          },
        },
      ],
    );
  };

  const surface = isDark ? Colors.neutral[800] : Colors.neutral[50];
  const inputSurface = isDark ? Colors.neutral[700] : Colors.neutral[100];
  const textColor = isDark ? Colors.neutral[100] : Colors.neutral[800];
  const muted = isDark ? Colors.neutral[300] : Colors.neutral[600];

  const field = (label: string, value: string, onChangeText: (value: string) => void, placeholder: string, keyboardType: KeyboardTypeOptions = 'default') => (
    <View style={styles.field}>
      <Text variant="subtitle2" color={textColor}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={isDark ? Colors.neutral[500] : Colors.neutral[400]} keyboardType={keyboardType} autoCapitalize="none" style={[styles.input, { backgroundColor: inputSurface, color: textColor }]} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }]}>
      <Header title="Optional Astrology" leftIcon="arrow-back" onLeftPress={() => router.back()} />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text variant="body1" color={muted} style={styles.intro}>A separate, optional reflection tool. Astrology is not used in your Jungian dream analysis and does not predict events.</Text>

        <Card style={styles.card} backgroundColor={surface}>
          <Text variant="h4" color={textColor}>Local birth profile</Text>
          {field('Birth date', birthDate, setBirthDate, 'YYYY-MM-DD')}
          {field('Birth time (optional)', birthTime, setBirthTime, 'HH:mm')}
          {field('Timezone when time is provided', timezone, setTimezone, 'America/Toronto')}
          {field('Private location label (optional)', locationLabel, setLocationLabel, 'Home city')}
          <Text variant="caption" color={muted}>The label stays on this device. Coordinates are sent only when you calculate a chart and are not saved.</Text>
          <View style={styles.coordinateRow}>
            <View style={styles.coordinate}>{field('Latitude', latitude, setLatitude, '43.65', 'numbers-and-punctuation')}</View>
            <View style={styles.coordinate}>{field('Longitude', longitude, setLongitude, '-79.38', 'numbers-and-punctuation')}</View>
          </View>
          <View style={styles.consentRow}>
            <Switch value={consented} onValueChange={setConsented} />
            <Text variant="body2" color={muted} style={styles.consentText}>I understand this is reflective, not factual or predictive, and I consent to sending the calculation fields to external services.</Text>
          </View>
          <Button fullWidth isLoading={busy === 'chart'} isDisabled={busy !== null} onPress={() => void calculate()}>Calculate chart</Button>
        </Card>

        {chart && (
          <Card style={styles.card} backgroundColor={surface}>
            <Text variant="h4" color={textColor}>Calculated chart</Text>
            <Text variant="body2" color={muted}>{chart.placements.length} placements · {chart.aspects.length} aspects · {chart.precision}</Text>
            {chart.placements.slice(0, 8).map(item => <Text key={item.body} variant="body2" color={textColor} style={styles.placement}>{item.body}: {item.sign}{item.house ? ` · House ${item.house}` : ''}</Text>)}
            {chart.uncertaintyNotes.map(note => <Text key={note} variant="caption" color={muted} style={styles.note}>{note}</Text>)}
            <Text variant="caption" color={muted} style={styles.disclosure}>{chart.reflectiveDisclosure}</Text>
            <Button fullWidth variant="secondary" isLoading={busy === 'reflection'} isDisabled={busy !== null || !consented} onPress={() => void createReflection()}>Create capped AI reflection</Button>
          </Card>
        )}

        {reflection && (
          <Card style={styles.card} backgroundColor={surface}>
            <Text variant="h4" color={textColor}>Your reflection</Text>
            <Text variant="body1" color={textColor} style={styles.reflection}>{reflection.reflection}</Text>
            <Text variant="caption" color={muted}>{reflection.disclosure}</Text>
          </Card>
        )}

        {!!message && <Text variant="body2" color={muted} style={styles.message} accessibilityLiveRegion="polite">{message}</Text>}
        <Button variant="outline" fullWidth onPress={removeData}>Delete local astrology data</Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing[4], paddingBottom: spacing[8] },
  intro: { lineHeight: 22, marginBottom: spacing[4], textAlign: 'center' },
  card: { marginBottom: spacing[4], padding: spacing[4] },
  field: { gap: spacing[1], marginTop: spacing[3] },
  input: { borderRadius: BorderRadius.md, fontSize: 16, paddingHorizontal: spacing[3], paddingVertical: spacing[3] },
  coordinateRow: { flexDirection: 'row', gap: spacing[3] },
  coordinate: { flex: 1 },
  consentRow: { alignItems: 'center', flexDirection: 'row', marginVertical: spacing[4] },
  consentText: { flex: 1, lineHeight: 20, marginLeft: spacing[2] },
  placement: { marginTop: spacing[2] },
  note: { marginTop: spacing[2] },
  disclosure: { lineHeight: 18, marginVertical: spacing[4] },
  reflection: { lineHeight: 23, marginVertical: spacing[3] },
  message: { marginBottom: spacing[3], textAlign: 'center' },
});
