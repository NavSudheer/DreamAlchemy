import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

const CulturalPerspectives = () => {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const cultures = [
    {
      name: 'Ancient Egyptian',
      period: '3150 BCE - 30 BCE',
      beliefs: [
        'Dreams were messages from the gods',
        'Dream temples were used for healing',
        'Professional dream interpreters advised pharaohs',
      ],
      significance: 'Dreams were seen as divine guidance and used for both spiritual and practical purposes.',
      practices: 'Dream incubation in sacred temples, recording dreams on papyrus',
      icon: '🏛️',
    },
    {
      name: 'Native American',
      period: 'Traditional - Present',
      beliefs: [
        'Dreams connect to the spirit world',
        'Vision quests through dreams',
        'Animal spirits as guides',
      ],
      significance: 'Dreams are considered a vital part of spiritual growth and community guidance.',
      practices: 'Dream sharing in tribal councils, vision quest ceremonies',
      icon: '🪶',
    },
    {
      name: 'Chinese',
      period: 'Traditional - Present',
      beliefs: [
        'Dreams reflect balance of yin and yang',
        'Ancestral communication through dreams',
        'Prophetic dream interpretation',
      ],
      significance: 'Dreams are viewed as connections to ancestors and indicators of health and fortune.',
      practices: 'Dream-based medicine, consulting dream books',
      icon: '☯️',
    },
    {
      name: 'Islamic',
      period: '7th Century - Present',
      beliefs: [
        'True dreams come from Allah',
        'Prophetic dreams (ru\'ya)',
        'Morning prayer importance',
      ],
      significance: 'Dreams are considered one of the forty-six parts of prophecy.',
      practices: 'Recording dreams after morning prayer, consulting dream interpreters',
      icon: '🌙',
    },
    {
      name: 'Australian Aboriginal',
      period: 'Traditional - Present',
      beliefs: [
        'Dreamtime as creation period',
        'Dreams as access to ancestral wisdom',
        'Connection to the land through dreams',
      ],
      significance: 'Dreams are integral to understanding creation stories and maintaining cultural knowledge.',
      practices: 'Dreamtime storytelling, ceremonial dream sharing',
      icon: '🪃',
    },
  ];

  const cardBackgroundColor = isDark ? '#1E1E1E' : colors.surface;
  const textColor = isDark ? '#FFFFFF' : colors.onSurface;
  const subtitleColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';
  const dividerColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingBottom: 80 + insets.bottom } // Add padding for tab bar
        ]}
      >
        <View style={styles.header}>
          <Text variant="headlineMedium" style={[styles.title, { color: textColor }]}>
            Cultural Perspectives
          </Text>
          <Text variant="bodyLarge" style={[styles.subtitle, { color: subtitleColor }]}>
            How different cultures understand dreams
          </Text>
        </View>

        {cultures.map((culture, index) => (
          <Card key={index} style={[styles.section, { backgroundColor: cardBackgroundColor }]}>
            <Card.Content>
              <View style={styles.cultureHeader}>
                <Text style={styles.cultureIcon}>{culture.icon}</Text>
                <View style={styles.cultureTitleContainer}>
                  <Text variant="titleLarge" style={[styles.cultureTitle, { color: textColor }]}>
                    {culture.name}
                  </Text>
                  <Text variant="bodyMedium" style={[styles.period, { color: subtitleColor }]}>
                    {culture.period}
                  </Text>
                </View>
              </View>

              <Divider style={[styles.divider, { backgroundColor: dividerColor }]} />

              <Text variant="titleMedium" style={[styles.sectionTitle, { color: textColor }]}>
                Key Beliefs
              </Text>
              {culture.beliefs.map((belief, idx) => (
                <Text key={idx} style={[styles.belief, { color: textColor }]}>
                  • {belief}
                </Text>
              ))}

              <Text variant="titleMedium" style={[styles.sectionTitle, styles.significanceTitle, { color: textColor }]}>
                Cultural Significance
              </Text>
              <Text variant="bodyMedium" style={[styles.significance, { color: subtitleColor }]}>
                {culture.significance}
              </Text>

              <Text variant="titleMedium" style={[styles.sectionTitle, styles.practicesTitle, { color: textColor }]}>
                Traditional Practices
              </Text>
              <Text variant="bodyMedium" style={[styles.practices, { color: subtitleColor }]}>
                {culture.practices}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    margin: 16,
    marginBottom: 8,
    elevation: 2,
  },
  cultureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cultureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  cultureTitleContainer: {
    flex: 1,
  },
  cultureTitle: {
    marginBottom: 4,
  },
  period: {
    marginBottom: 4,
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  belief: {
    marginLeft: 16,
    marginBottom: 4,
  },
  significanceTitle: {
    marginTop: 16,
  },
  significance: {
    marginBottom: 16,
  },
  practicesTitle: {
    marginTop: 8,
  },
  practices: {
    marginBottom: 8,
  },
});

export default CulturalPerspectives; 