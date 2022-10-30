import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import {CATEGORY} from '../../dataRaw';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const onChooseCategory = item => {
    navigation.navigate('Question', {
      categoryId: item.id,
    });
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => onChooseCategory(item)}
        style={[
          styles.wrap,
          {
            backgroundColor: item.color,
          },
        ]}>
        <Text style={styles.itemStyle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <LayoutWrapper>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Let's Play</Text>
        <Text style={styles.des}>Choose question type</Text>
        {CATEGORY.map(item => renderItem(item))}
      </View>
    </LayoutWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleStyle: {
    fontSize: 30,
    fontWeight: '500',
    color: 'orange',
    marginTop: 20,
  },
  des: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: '400',
    color: 'red',
  },
  itemStyle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  wrap: {
    padding: 40,
    borderRadius: 20,
    marginVertical: 20,
  },
});
