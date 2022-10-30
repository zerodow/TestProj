import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

const CheckBox = ({onCheck, content, index}, _ref) => {
  useImperativeHandle(_ref, () => ({unCheck, check}));

  const [isCheck, setCheck] = useState(false);

  const unCheck = useCallback(() => {
    setCheck(false);
  }, []);

  const check = () => {
    setCheck(true);
  };

  const _onPress = () => {
    setCheck(true);
    onCheck(index);
  };

  return (
    <TouchableOpacity style={styles.wrapper} onPress={_onPress}>
      <View style={styles.container}>
        {isCheck && <View style={styles.circle} />}
      </View>
      <Text style={{fontSize: 16, marginLeft: 10}}>{content}</Text>
    </TouchableOpacity>
  );
};

export default forwardRef(CheckBox);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#333333',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#33ccff',
  },
});
