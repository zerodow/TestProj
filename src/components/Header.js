import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
const Header = ({title, noBack}) => {
  const navigation = useNavigation();

  const _onIconPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {noBack ? (
        <View style={styles.sideView} />
      ) : (
        <TouchableOpacity style={styles.sideView} onPress={_onIconPress}>
          <Icon name="arrowleft" size={20} />
        </TouchableOpacity>
      )}
      <View style={styles.center}>
        {title && <Text style={styles.titleStyle}>{title}</Text>}
      </View>
      <View style={styles.sideView} />
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: '100%',
    flexDirection: 'row',
  },
  sideView: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 20,
  },
});
