import React, { useEffect, useState } from 'react';
import { Alert, KeyboardTypeOptions, ScrollView, StyleSheet, Switch, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/ui/Header';
import Text from '@/components/ui/Text';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useTheme } from '@/providers/ThemeProvider';
import { BorderRadius, Colors, spacing } from '@/utils/theme';
import { createLocalBirthProfile } from '@/services/astrology';
import { AstrologyRemoteError, calculateAstrologyChart, generateAstrologyReflection } from '@/services/astrologyRemote';
import { deleteLocalAstrologyData, readLocalAstrologyBundle, writeLocalAstrologyBundle } from '@/services/astrologyStorage';
import { AstrologyChart, AstrologyReflection, LocalAstrologyBundle } from '@/types/astrology';
import { getBodyGlossaryEntry, getSignGlossaryEntry } from '@/data/astrologyPlacementGlossary';
import { getAspectGlossaryEntry } from '@/data/astrologyAspectGlossary';
import {
  ASTROLOGY_CONSENT_COPY,
  ASTROLOGY_DELETION_COPY,
  ASTROLOGY_PENDING_COPY,
  ASTROLOGY_UNAVAILABLE_COPY,
} from '@/data/astrologyConsentCopy';
import { ASTROLOGY_UNCERTAINTY_COPY, getUncertaintyCopyByPrecision } from '@/data/astrologyUncertaintyCopy';

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
  const [expandedPlacement, setExpandedPlacement] = useState<string>();
  const [expandedAspect, setExpandedAspect] = useState<string>();
  const [showPrecisionDetails, setShowPrecisionDetails] = useState(false);
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
    setMessage(ASTROLOGY_PENDING_COPY.calculatingDescription);
    try {
      const nextChart = await calculateAstrologyChart(profile, { latitude: lat, longitude: lon }, consent);
      const bundle: LocalAstrologyBundle = { profile, chart: nextChart };
      await writeLocalAstrologyBundle(bundle);
      setChart(nextChart);
      setReflection(undefined);
      setExpandedPlacement(undefined);
      setExpandedAspect(undefined);
      setShowPrecisionDetails(false);
      setMessage('Chart calculated and saved on this device.');
    } catch (error) {
      setMessage(error instanceof AstrologyRemoteError && error.code === 'not_available'
        ? `${ASTROLOGY_UNAVAILABLE_COPY.title}. ${ASTROLOGY_UNAVAILABLE_COPY.description}`
        : error instanceof Error ? error.message : 'Could not calculate the chart.');
    } finally {
      setBusy(null);
    }
  };

  const createReflection = async () => {
    if (!chart || !consented) return;
    setBusy('reflection');
    setMessage(ASTROLOGY_PENDING_COPY.reflectionDescription);
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
      ASTROLOGY_DELETION_COPY.dialogTitle,
      ASTROLOGY_DELETION_COPY.dialogMessage,
      [
        { text: ASTROLOGY_DELETION_COPY.cancelButtonLabel, style: 'cancel' },
        {
          text: ASTROLOGY_DELETION_COPY.confirmButtonLabel,
          style: 'destructive',
          onPress: () => {
            void deleteLocalAstrologyData().then(() => {
              setChart(undefined);
              setReflection(undefined);
              setExpandedPlacement(undefined);
              setExpandedAspect(undefined);
              setShowPrecisionDetails(false);
              setBirthDate('');
              setBirthTime('');
              setTimezone('');
              setLocationLabel('');
              setLatitude('');
              setLongitude('');
              setConsented(false);
              setMessage(ASTROLOGY_DELETION_COPY.successMessage);
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
  const precisionCopy = chart ? getUncertaintyCopyByPrecision(chart.precision) : undefined;

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
        <Text variant="body1" color={muted} style={styles.intro}>{ASTROLOGY_CONSENT_COPY.summary}</Text>
        <Text variant="caption" color={muted} style={styles.intro}>{ASTROLOGY_CONSENT_COPY.nonPredictiveDisclaimer}</Text>

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
            <Text variant="body2" color={muted} style={styles.consentText}>{ASTROLOGY_CONSENT_COPY.consentCheckboxLabel}</Text>
          </View>
          <Text variant="caption" color={muted} style={styles.disclosure}>{ASTROLOGY_CONSENT_COPY.externalProcessingNotice}</Text>
          <Text variant="caption" color={muted} style={styles.localNotice}>{ASTROLOGY_CONSENT_COPY.localStorageReassurance}</Text>
          <Button fullWidth isLoading={busy === 'chart'} isDisabled={busy !== null} onPress={() => void calculate()}>{ASTROLOGY_CONSENT_COPY.confirmButtonLabel}</Button>
        </Card>

        {chart && (
          <Card style={styles.card} backgroundColor={surface}>
            <Text variant="h4" color={textColor}>Calculated chart</Text>
            <Text variant="body2" color={muted}>{chart.placements.length} placements · {chart.aspects.length} aspects · {chart.precision}</Text>
            {precisionCopy && (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ expanded: showPrecisionDetails }}
                accessibilityLabel={`${ASTROLOGY_UNCERTAINTY_COPY.title}: ${precisionCopy.label}`}
                accessibilityHint={precisionCopy.accessibilityDescription}
                onPress={() => setShowPrecisionDetails(value => !value)}
                style={[styles.precision, { backgroundColor: inputSurface }]}
              >
                <Text variant="subtitle2" color={textColor}>{precisionCopy.label} · {showPrecisionDetails ? 'Hide details' : 'Why this matters'}</Text>
                <Text variant="caption" color={muted} style={styles.optionText}>{precisionCopy.summary}</Text>
                {showPrecisionDetails && (
                  <View>
                    <Text variant="caption" color={muted} style={styles.optionText}>{precisionCopy.explanation}</Text>
                    {precisionCopy.uncertainFactors.slice(0, 3).map(factor => <Text key={factor} variant="caption" color={muted} style={styles.note}>• {factor}</Text>)}
                    <Text variant="caption" color={muted} style={styles.symbolicNote}>{ASTROLOGY_UNCERTAINTY_COPY.generalDisclaimer}</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
            {chart.placements.slice(0, 8).map(item => {
              const expanded = expandedPlacement === item.body;
              const bodyGlossary = getBodyGlossaryEntry(item.body);
              const signGlossary = getSignGlossaryEntry(item.sign);
              return (
                <TouchableOpacity
                  key={item.body}
                  accessibilityRole="button"
                  accessibilityState={{ expanded }}
                  accessibilityLabel={`${item.body} in ${item.sign}${item.house ? `, house ${item.house}` : ''}`}
                  accessibilityHint={bodyGlossary || signGlossary ? 'Shows or hides optional symbolic glossary notes' : undefined}
                  disabled={!bodyGlossary && !signGlossary}
                  onPress={() => setExpandedPlacement(expanded ? undefined : item.body)}
                  style={styles.placement}
                >
                  <Text variant="body2" color={textColor}>{item.body}: {item.sign}{item.house ? ` · House ${item.house}` : ''}{bodyGlossary || signGlossary ? (expanded ? ' · Hide notes' : ' · Explore') : ''}</Text>
                  {expanded && (bodyGlossary || signGlossary) && (
                    <View style={[styles.glossary, { backgroundColor: inputSurface }]}>
                      {bodyGlossary && <Text variant="caption" color={muted}><Text variant="subtitle2" color={textColor}>{bodyGlossary.archetypalTheme}: </Text>{bodyGlossary.contemplativePerspective}</Text>}
                      {signGlossary && <Text variant="caption" color={muted} style={styles.signNote}><Text variant="subtitle2" color={textColor}>{item.sign} · {signGlossary.element} · {signGlossary.modality}: </Text>{signGlossary.contemplativePerspective}</Text>}
                      <Text variant="caption" color={muted} style={styles.symbolicNote}>Optional symbolic traditions only—not facts about you or predictions.</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
            {!!chart.aspects.length && <Text variant="subtitle1" color={textColor} style={styles.sectionLabel}>Major aspects</Text>}
            {chart.aspects.slice(0, 6).map((item, index) => {
              const itemKey = `${item.fromBody}-${item.type}-${item.toBody}-${index}`;
              const expanded = expandedAspect === itemKey;
              const glossary = getAspectGlossaryEntry(item.type);
              return (
                <TouchableOpacity
                  key={itemKey}
                  accessibilityRole="button"
                  accessibilityState={{ expanded }}
                  accessibilityLabel={`${item.fromBody} ${item.type} ${item.toBody}${item.orbDegrees != null ? `, orb ${item.orbDegrees} degrees` : ''}`}
                  accessibilityHint={glossary?.accessibilityDescription}
                  disabled={!glossary}
                  onPress={() => setExpandedAspect(expanded ? undefined : itemKey)}
                  style={styles.placement}
                >
                  <Text variant="body2" color={textColor}>{item.fromBody} · {item.type} · {item.toBody}{item.orbDegrees != null ? ` · ${item.orbDegrees.toFixed(2)}°` : ''}{glossary ? (expanded ? ' · Hide notes' : ' · Explore') : ''}</Text>
                  {expanded && glossary && (
                    <View style={[styles.glossary, { backgroundColor: inputSurface }]}>
                      <Text variant="caption" color={muted}><Text variant="subtitle2" color={textColor}>{glossary.archetypalTheme}: </Text>{glossary.contemplativePerspective}</Text>
                      <Text variant="caption" color={muted} style={styles.symbolicNote}>Traditional symbolic metaphor only—not a fact, diagnosis, or prediction.</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
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
  precision: { borderRadius: BorderRadius.md, marginTop: spacing[3], padding: spacing[3] },
  optionText: { lineHeight: 18, marginTop: spacing[2] },
  sectionLabel: { marginTop: spacing[4] },
  glossary: { borderRadius: BorderRadius.md, marginTop: spacing[2], padding: spacing[3] },
  signNote: { marginTop: spacing[2] },
  symbolicNote: { fontStyle: 'italic', marginTop: spacing[2] },
  note: { marginTop: spacing[2] },
  disclosure: { lineHeight: 18, marginVertical: spacing[4] },
  localNotice: { lineHeight: 18, marginBottom: spacing[4] },
  reflection: { lineHeight: 23, marginVertical: spacing[3] },
  message: { marginBottom: spacing[3], textAlign: 'center' },
});
