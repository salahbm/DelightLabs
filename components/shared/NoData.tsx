import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { Colors } from '@/styles/colors';
import { AntDesign } from '@expo/vector-icons';

export const NoDataView = () => {
  return (
    <View style={{ marginVertical: 50, alignItems: 'center', gap: 10 }}>
      <AntDesign name="exclamationcircle" size={24} color={Colors.light.primary} />
      <ThemedText style={{ color: Colors.light.grey_subtitle }}>No Data</ThemedText>
    </View>
  );
};
