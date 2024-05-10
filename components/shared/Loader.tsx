import { Colors } from '@/styles/colors';
import React from 'react';
import { View, ImageStyle, ActivityIndicator } from 'react-native';

interface LoadingProps {
  visible: boolean;
  top?: number;
}

const Loader: React.FC<LoadingProps & ImageStyle> = ({ visible, top, ...style }) => {
  if (!visible) return null;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: top || 0,
        zIndex: 999,
      }}
    >
      <ActivityIndicator color={Colors.light.primary} />
    </View>
  );
};

export default Loader;
