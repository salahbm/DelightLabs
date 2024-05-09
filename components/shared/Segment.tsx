import { Colors } from '@/styles/colors';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export const Segment = ({
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
            onPress={() => setIsActive(label.toLocaleLowerCase())}
            style={[
              isActive.toLocaleLowerCase() === label.toLocaleLowerCase()
                ? styles.activeSegment
                : styles.segment,
            ]}
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
    width: 172,
    alignSelf: 'center',
    height: 34,
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: Colors.light.grey_background,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderRadius: 20,
    backgroundColor: Colors.light.grey_background,
  },
  activeSegment: {
    backgroundColor: Colors.light.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderRadius: 20,
  },
  activeText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'PoppinsSemiBold600',
    color: Colors.light.white,
  },
  inactiveText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'PoppinsSemiBold600',
    color: Colors.light.grey_subtitle,
  },
});
