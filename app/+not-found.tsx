import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/providers/ThemeProvider';
import { Colors, spacing } from '@/utils/theme';
import Text from '@/components/ui/Text';

export default function NotFoundScreen() {
  const { isDark } = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
      ]}>
        <Ionicons
          name="cloud-outline"
          size={64}
          color={isDark ? Colors.neutral[500] : Colors.neutral[400]}
          style={styles.icon}
        />
        <Text variant="h3" color={isDark ? Colors.neutral[200] : Colors.neutral[700]}>
          This dream doesn't exist
        </Text>
        <Text
          variant="body1"
          color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
          style={styles.subtitle}
        >
          The screen you're looking for drifted away.
        </Text>
        <Link href="/" style={styles.link}>
          <Text variant="body1" color={isDark ? Colors.primary[300] : Colors.primary[600]}>
            Return to your journal
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[5],
  },
  icon: {
    marginBottom: spacing[4],
  },
  subtitle: {
    marginTop: spacing[1],
    textAlign: 'center',
  },
  link: {
    marginTop: spacing[5],
    paddingVertical: spacing[3],
  },
});
