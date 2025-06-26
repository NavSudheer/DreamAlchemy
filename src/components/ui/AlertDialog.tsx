import React from 'react';
import { 
  Modal, 
  View, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  ViewStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../providers/ThemeProvider';
import { Colors, spacing, BorderRadius, Shadows, typography } from '../../utils/theme';
import Text from './Text';
import Button from './Button';

interface AlertDialogProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

const { width } = Dimensions.get('window');

const AlertDialog: React.FC<AlertDialogProps> = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false
}) => {
  const { isDark } = useTheme();

  const handleConfirm = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onConfirm();
  };

  const handleCancel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCancel();
  };

  const cancelButtonStyle: ViewStyle = {
    minWidth: 100,
    backgroundColor: isDark ? Colors.neutral[700] : Colors.neutral[100],
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
      presentationStyle="overFullScreen"
    >
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onCancel}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View 
                style={[
                  styles.container, 
                  { 
                    backgroundColor: isDark ? Colors.neutral[800] : Colors.neutral[50],
                    ...Platform.select({
                      ios: Shadows.xl,
                      android: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 8 },
                        shadowOpacity: 0.4,
                        shadowRadius: 10,
                        elevation: 24
                      },
                    })
                  }
                ]}
              >
                <View style={styles.header}>
                  <Text
                    variant="h3"
                    color={isDark ? Colors.neutral[100] : Colors.neutral[800]}
                    style={styles.title}
                  >
                    {title}
                  </Text>
                  
                  <TouchableOpacity
                    onPress={handleCancel}
                    style={styles.closeButton}
                    hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <Ionicons
                      name="close"
                      size={24}
                      color={isDark ? Colors.neutral[400] : Colors.neutral[500]}
                    />
                  </TouchableOpacity>
                </View>
                
                <Text
                  variant="body1"
                  color={isDark ? Colors.neutral[300] : Colors.neutral[600]}
                  style={styles.message}
                >
                  {message}
                </Text>
                
                <View style={styles.actions}>
                  {cancelText && (
                    <Button
                      variant="outline"
                      size="md"
                      onPress={handleCancel}
                      style={{
                        minWidth: 100,
                        backgroundColor: 'transparent',
                        borderWidth: 1,
                        borderColor: isDark ? Colors.neutral[400] : Colors.neutral[400],
                      }}
                      hapticFeedback
                    >
                      {cancelText}
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="md"
                    onPress={handleConfirm}
                    style={{
                      minWidth: 100,
                      backgroundColor: 'transparent',
                      borderWidth: 1,
                      borderColor: destructive ? Colors.error[500] : (isDark ? Colors.primary[400] : Colors.primary[500]),
                    }}
                    textStyle={{
                      color: destructive ? Colors.error[500] : (isDark ? Colors.primary[400] : Colors.primary[500])
                    }}
                    hapticFeedback
                  >
                    {confirmText}
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1001,
  },
  container: {
    width: width * 0.85,
    maxWidth: 400,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: spacing[5],
    paddingTop: spacing[5],
    paddingBottom: spacing[5],
    zIndex: 1002,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[3],
  },
  title: {
    flex: 1,
    paddingRight: spacing[4],
  },
  closeButton: {
    padding: spacing[1],
  },
  message: {
    marginBottom: spacing[5],
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: spacing[3],
  }
});

export default AlertDialog; 