import React, { useState, useEffect, useMemo } from 'react';
import { 
  StyleSheet, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getDreams } from '../utils/storage';
import { Dream } from '../types';
import { useTheme } from '../providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows } from '../utils/theme';
import Text from '../components/ui/Text';
import Card from '../components/ui/Card';
import Header from '../components/ui/Header';
import { EmptyState } from '../components/ui/EmptyState';
import { LineChart, PieChart } from 'react-native-chart-kit';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PatternsScreenProps {
  onBack?: () => void;
}

export default function PatternsScreen({ onBack }: PatternsScreenProps) {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  const router = useRouter();

  useEffect(() => {
    loadDreams();
  }, []);

  const loadDreams = async () => {
    setLoading(true);
    try {
      const loadedDreams = await getDreams();
      setDreams(loadedDreams);
    } catch (error) {
      console.error('Error loading dreams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  // Calculate pattern metrics
  const patternMetrics = useMemo(() => {
    if (dreams.length === 0) return null;

    // Count symbol occurrences
    const symbolCounts: Record<string, number> = {};
    let totalSymbols = 0;

    dreams.forEach(dream => {
      if (dream.analysis?.symbols) {
        dream.analysis.symbols.forEach(symbol => {
          symbolCounts[symbol.symbol] = (symbolCounts[symbol.symbol] || 0) + 1;
          totalSymbols++;
        });
      }
    });

    // Sort symbols by frequency
    const topSymbols = Object.entries(symbolCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Count dream frequency by month
    const dreamsByMonth: Record<string, number> = {};
    dreams.forEach(dream => {
      const date = new Date(dream.timestamp);
      const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
      dreamsByMonth[monthKey] = (dreamsByMonth[monthKey] || 0) + 1;
    });

    // Sort months chronologically
    const sortedMonths = Object.keys(dreamsByMonth).sort((a, b) => {
      const [aMonth, aYear] = a.split('/').map(Number);
      const [bMonth, bYear] = b.split('/').map(Number);
      if (aYear !== bYear) return aYear - bYear;
      return aMonth - bMonth;
    });

    // Get last 6 months or less if not enough data
    const recentMonths = sortedMonths.slice(-6);
    
    // Format months for display
    const monthLabels = recentMonths.map(key => {
      const [month] = key.split('/');
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return monthNames[parseInt(month) - 1];
    });

    // Get dream count for each month
    const monthData = recentMonths.map(key => dreamsByMonth[key]);

    // Get dream themes
    const themeCounts: Record<string, number> = {};
    dreams.forEach(dream => {
      if (dream.analysis?.theme) {
        themeCounts[dream.analysis.theme] = (themeCounts[dream.analysis.theme] || 0) + 1;
      } else {
        themeCounts['Other'] = (themeCounts['Other'] || 0) + 1;
      }
    });

    // Sort themes by frequency
    const topThemes = Object.entries(themeCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Prepare data for pie chart
    const themeData = topThemes.map((theme, index) => {
      // Colors for pie chart segments
      const colors = [
        isDark ? '#4299E1' : '#3182CE', // blue
        isDark ? '#48BB78' : '#38A169', // green
        isDark ? '#ED8936' : '#DD6B20', // orange
        isDark ? '#9F7AEA' : '#805AD5', // purple
        isDark ? '#F56565' : '#E53E3E', // red
      ];

      return {
        name: theme.name,
        count: theme.count,
        color: colors[index % colors.length],
        legendFontColor: isDark ? Colors.neutral[300] : Colors.neutral[700],
        legendFontSize: 12
      };
    });

    return {
      totalDreams: dreams.length,
      totalSymbols,
      topSymbols,
      dreamsByMonth: {
        labels: monthLabels,
        datasets: [{ data: monthData }]
      },
      topThemes,
      themeData
    };
  }, [dreams, isDark]);

  if (loading) {
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
      ]}>
        <Header 
          title="Dream Patterns" 
          leftIcon="arrow-back"
          onLeftPress={handleBack} 
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={isDark ? Colors.accent[300] : Colors.accent[500]} />
          <Text style={styles.loadingText}>Analyzing your dream patterns...</Text>
        </View>
      </View>
    );
  }

  if (dreams.length < 3) {
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
      ]}>
        <Header 
          title="Dream Patterns" 
          leftIcon="arrow-back"
          onLeftPress={handleBack}  
        />
        <ScrollView 
          contentContainerStyle={styles.emptyStateContainer}
          showsVerticalScrollIndicator={false}
        >
          <EmptyState
            icon="analytics-outline"
            title="Not Enough Dreams"
            description="Record at least 3 dreams to start discovering patterns and insights."
            actionLabel="Record a New Dream"
            onAction={() => router.push('/')}
          />
        </ScrollView>
      </View>
    );
  }

  // Chart configurations
  const chartConfig = {
    backgroundGradientFrom: isDark ? Colors.neutral[800] : Colors.neutral[50],
    backgroundGradientTo: isDark ? Colors.neutral[800] : Colors.neutral[50],
    decimalPlaces: 0,
    color: (opacity = 1) => isDark ? `rgba(80, 200, 200, ${opacity})` : `rgba(20, 150, 150, ${opacity})`,
    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: BorderRadius.md,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: isDark ? Colors.accent[600] : Colors.accent[400]
    }
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.neutral[900] : Colors.neutral[50] }
    ]}>
      <Header 
        title="Dream Patterns" 
        leftIcon="arrow-back"
        onLeftPress={handleBack} 
      />
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        <Text 
          variant="h3" 
          color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
          style={styles.subtitle}
        >
          Your Dream Patterns Overview
        </Text>

        {/* Dream Activity Timeline Card */}
        <Card
          variant="elevated"
          style={styles.card}
          backgroundColor={isDark ? Colors.neutral[800] : Colors.neutral[50]}
        >
          <View style={styles.cardHeader}>
            <Ionicons 
              name="calendar-outline" 
              size={28} 
              color={isDark ? Colors.neutral[100] : Colors.primary[700]} 
            />
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.cardTitle}
            >
              Dream Activity
            </Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text variant="h2" color={isDark ? Colors.accent[300] : Colors.accent[600]}>
                {patternMetrics?.totalDreams || 0}
              </Text>
              <Text variant="body2" color={isDark ? Colors.neutral[400] : Colors.neutral[600]}>
                Total Dreams
              </Text>
            </View>
            
            <View style={styles.verticalDivider} />
            
            <View style={styles.statItem}>
              <Text variant="h2" color={isDark ? Colors.accent[300] : Colors.accent[600]}>
                {patternMetrics?.totalSymbols || 0}
              </Text>
              <Text variant="body2" color={isDark ? Colors.neutral[400] : Colors.neutral[600]}>
                Total Symbols
              </Text>
            </View>
          </View>
          
          {/* Dream timeline chart */}
          {patternMetrics?.dreamsByMonth && patternMetrics.dreamsByMonth.labels.length > 1 ? (
            <LineChart
              data={patternMetrics.dreamsByMonth}
              width={SCREEN_WIDTH - 2 * spacing[4] - 2 * spacing[4]}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          ) : (
            <View style={[
              styles.chartPlaceholder,
              { backgroundColor: isDark ? Colors.neutral[700] : Colors.neutral[200] }
            ]}>
              <Text 
                variant="body2" 
                color={isDark ? Colors.neutral[400] : Colors.neutral[600]}
                style={styles.placeholderText}
              >
                Not enough data for timeline chart
              </Text>
            </View>
          )}
        </Card>

        {/* Top Recurring Symbols Card */}
        <Card
          variant="elevated"
          style={styles.card}
          backgroundColor={isDark ? Colors.neutral[800] : Colors.neutral[50]}
        >
          <View style={styles.cardHeader}>
            <Ionicons 
              name="bookmarks-outline" 
              size={28} 
              color={isDark ? Colors.neutral[100] : Colors.primary[700]} 
            />
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.cardTitle}
            >
              Top Recurring Symbols
            </Text>
          </View>
          
          <View style={styles.symbolsList}>
            {patternMetrics?.topSymbols && patternMetrics.topSymbols.length > 0 ? (
              patternMetrics.topSymbols.map((symbol, index) => (
                <View key={index} style={styles.symbolItem}>
                  <View style={styles.symbolRank}>
                    <Text 
                      variant="body2" 
                      color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
                    >
                      {index + 1}
                    </Text>
                  </View>
                  <View style={styles.symbolInfo}>
                    <Text 
                      variant="subtitle1" 
                      color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
                    >
                      {symbol.name}
                    </Text>
                    <View style={[
                      styles.symbolBar,
                      { backgroundColor: isDark ? Colors.neutral[700] : Colors.neutral[200] }
                    ]}>
                      <View 
                        style={[
                          styles.symbolBarFill,
                          { 
                            width: `${Math.min(100, (symbol.count / Math.max(...patternMetrics.topSymbols.map(s => s.count))) * 100)}%`,
                            backgroundColor: isDark ? Colors.accent[400] : Colors.accent[500]
                          }
                        ]} 
                      />
                    </View>
                    <Text 
                      variant="body2" 
                      color={isDark ? Colors.neutral[400] : Colors.neutral[600]}
                    >
                      Appeared in {symbol.count} dream{symbol.count !== 1 ? 's' : ''}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text 
                variant="body1" 
                color={isDark ? Colors.neutral[400] : Colors.neutral[600]}
                style={styles.emptyText}
              >
                No recurring symbols found
              </Text>
            )}
          </View>
        </Card>

        {/* Dream Themes Card */}
        <Card
          variant="elevated"
          style={styles.card}
          backgroundColor={isDark ? Colors.neutral[800] : Colors.neutral[50]}
        >
          <View style={styles.cardHeader}>
            <Ionicons 
              name="color-palette-outline" 
              size={28} 
              color={isDark ? Colors.neutral[100] : Colors.primary[700]} 
            />
            <Text 
              variant="h4" 
              color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
              style={styles.cardTitle}
            >
              Dream Themes
            </Text>
          </View>
          
          {patternMetrics?.themeData && patternMetrics.themeData.length > 1 ? (
            <View style={styles.pieChartContainer}>
              <PieChart
                data={patternMetrics.themeData}
                width={SCREEN_WIDTH - 2 * spacing[4] - 2 * spacing[4]}
                height={180}
                chartConfig={chartConfig}
                accessor="count"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
          ) : (
            <View style={[
              styles.chartPlaceholder,
              { backgroundColor: isDark ? Colors.neutral[700] : Colors.neutral[200] }
            ]}>
              <Text 
                variant="body2" 
                color={isDark ? Colors.neutral[400] : Colors.neutral[600]}
                style={styles.placeholderText}
              >
                Not enough data for theme chart
              </Text>
            </View>
          )}
          
          <View style={styles.themesList}>
            {patternMetrics?.topThemes && patternMetrics.topThemes.length > 0 ? (
              patternMetrics.topThemes.map((theme, index) => (
                <View key={index} style={styles.themeItem}>
                  <Text 
                    variant="subtitle1" 
                    color={isDark ? Colors.neutral[200] : Colors.neutral[700]}
                  >
                    {theme.name}
                  </Text>
                  <Text 
                    variant="body2" 
                    color={isDark ? Colors.neutral[400] : Colors.neutral[600]}
                  >
                    {theme.count} dream{theme.count !== 1 ? 's' : ''}
                  </Text>
                </View>
              ))
            ) : (
              <Text 
                variant="body1" 
                color={isDark ? Colors.neutral[400] : Colors.neutral[600]}
                style={styles.emptyText}
              >
                No recurring themes found
              </Text>
            )}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacing[4],
    paddingBottom: 60 + spacing[6], // Add extra padding for the tab bar
  },
  subtitle: {
    marginBottom: spacing[6],
    textAlign: 'center',
  },
  card: {
    marginBottom: spacing[6],
    padding: spacing[4],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  cardTitle: {
    marginLeft: spacing[3],
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: spacing[4],
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  verticalDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.neutral[300],
    opacity: 0.5,
  },
  chartPlaceholder: {
    height: 200,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing[3],
  },
  chart: {
    marginVertical: spacing[3],
    borderRadius: BorderRadius.md,
    alignSelf: 'center',
  },
  pieChartContainer: {
    alignItems: 'center',
    marginVertical: spacing[3],
  },
  placeholderText: {
    opacity: 0.6,
  },
  symbolsList: {
    marginTop: spacing[2],
  },
  symbolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  symbolRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.accent[400],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing[3],
  },
  symbolInfo: {
    flex: 1,
  },
  symbolBar: {
    height: 8,
    borderRadius: 4,
    marginVertical: spacing[2],
  },
  symbolBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  themesList: {
    marginTop: spacing[2],
  },
  themeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing[2],
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[300],
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: spacing[4],
    fontStyle: 'italic',
  },
  emptyStateContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing[4],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing[4],
    opacity: 0.7,
  },
}); 