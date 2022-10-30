import {View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LayoutWrapper = ({containerStyle, children}) => {
  const insets = useSafeAreaInsets();
  const defaultStyle = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    flex: 1,
    backgroundColor: 'white',
  };

  return <View style={[defaultStyle, containerStyle]}>{children}</View>;
};

export default LayoutWrapper;
