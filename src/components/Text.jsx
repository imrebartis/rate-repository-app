import { memo } from 'react';
import { Text as NativeText, StyleSheet, Platform } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System'
    }),
    fontWeight: theme.fontWeights.normal
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary
  },
  colorPrimary: {
    color: theme.colors.primary
  },
  colorTextWhite: {
    color: theme.colors.textWhite
  },
  colorTertiary: {
    color: theme.colors.tertiary
  },
  backgroundPrimary: {
    backgroundColor: theme.colors.backgroundPrimary
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  }
});

const Text = ({ color, fontSize, fontWeight, background, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'textWhite' && styles.colorTextWhite,
    color === 'tertiary' && styles.colorTertiary,
    background === 'backgroundPrimary' && styles.backgroundPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style
  ];

  return <NativeText style={textStyle}
    {...props} />;
};

export default memo(Text);
