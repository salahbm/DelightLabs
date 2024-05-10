import { Colors } from '@/styles/colors';
import { Fonts } from '@/styles/fonts';
import { Spacing } from '@/styles/globals';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export const SegmentOutlined = ({
  labels,
  setIsActive,
  isActive,
  containerStyle,
}: {
  labels: string[];
  setIsActive: (val: string) => void;
  isActive: string;
  containerStyle?: ViewStyle;
}) => {
  return (
    <View style={[styles.segmentContainer, { ...containerStyle }]}>
      {labels.map((label, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.segment}
            onPress={() => setIsActive(label.toLocaleLowerCase())}
          >
            <Text
              style={
                isActive.toLocaleLowerCase() === label.toLocaleLowerCase()
                  ? styles.activeText
                  : styles.inactiveText
              }
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  segmentContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  segment: {
    paddingBottom: 12,
    alignItems: 'center',
    marginEnd: Spacing.m,
  },
  activeText: {
    ...Fonts.subtitle,
    color: Colors.light.primary,
  },
  inactiveText: {
    ...Fonts.subtitle,
    color: Colors.light.grey_title,
  },
});
