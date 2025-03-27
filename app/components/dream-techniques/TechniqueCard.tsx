import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TechniqueCardProps {
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  duration: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  progress?: number;
  isCompleted?: boolean;
  onPress: () => void;
}

export const TechniqueCard: React.FC<TechniqueCardProps> = ({
  title,
  description,
  difficulty,
  duration,
  icon,
  progress,
  isCompleted,
  onPress,
}) => {
  // New indigo and gold color scheme
  const gradientStart = '#242852';  // Darker indigo
  const gradientEnd = '#343b7c';    // Lighter indigo
  const iconColor = '#FFD700';      // Gold
  const titleColor = '#FFFFFF';     // White
  const descriptionColor = '#E1E6FF'; // Light lavender
  const progressColor = '#FFD700';  // Gold

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <LinearGradient
        colors={[gradientStart, gradientEnd]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={icon} size={40} color={iconColor} />
        </View>
        
        <View style={styles.content}>
          <Text style={[styles.title, {color: titleColor}]}>{title}</Text>
          <Text style={[styles.description, {color: descriptionColor}]} numberOfLines={2}>
            {description}
          </Text>
          
          <View style={styles.footer}>
            <View style={styles.difficultyContainer}>
              {[...Array(3)].map((_, index) => (
                <MaterialCommunityIcons
                  key={index}
                  name="star"
                  size={16}
                  color={index < difficulty ? iconColor : 'rgba(225, 230, 255, 0.3)'}
                />
              ))}
            </View>
            
            <View style={styles.durationContainer}>
              <MaterialCommunityIcons name="clock-outline" size={16} color={descriptionColor} />
              <Text style={[styles.durationText, {color: descriptionColor}]}>{duration}</Text>
            </View>
          </View>

          {progress !== undefined && !isCompleted && (
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: progressColor }]} />
            </View>
          )}

          {isCompleted && (
            <View style={styles.completedBadge}>
              <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
            </View>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  gradient: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  difficultyContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 14,
  },
  progressContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  completedBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(36, 40, 82, 0.9)',
    borderRadius: 12,
    padding: 2,
  },
}); 