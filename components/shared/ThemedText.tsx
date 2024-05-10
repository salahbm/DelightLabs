import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/common/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?:
    | 'default'
    | 'title'
    | 'defaultSemiBold'
    | 'subtitle'
    | 'link'
    | 'body'
    | 'bodySemiBold'
    | 'bodyMSemiBold'
    | 'defaultBold';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'body' ? styles.body : undefined,
        type === 'bodySemiBold' ? styles.bodySemiBold : undefined,
        type === 'bodyMSemiBold' ? styles.bodyMSemiBold : undefined,
        type === 'defaultBold' ? styles.defaultBold : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'PoppinsRegular400',
  },
  defaultBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'PoppinsBold700',
  },
  body: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'PoppinsRegular400',
  },
  bodySemiBold: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'PoppinsSemiBold600',
  },
  bodyMSemiBold: {
    fontSize: 18,
    lineHeight: 27,
    fontFamily: 'PoppinsSemiBold600',
  },
  defaultSemiBold: {
    fontSize: 24,
    lineHeight: 36,
    fontFamily: 'PoppinsSemiBold600',
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: 'PoppinsBold700',
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'PoppinsBold700',
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    color: '#0a7ea4',
    fontFamily: 'PoppinsRegular400',
  },
});
