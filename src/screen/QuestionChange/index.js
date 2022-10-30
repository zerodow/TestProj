import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import Header from '../../components/Header';
import {useNavigation} from '@react-navigation/native';
import QuestionChangeDetail from './QuestionChangeDetail';

const QuestionChange = ({route}) => {
  const navigation = useNavigation();
  console.log('route question change', route);
  const [listDependence, setListDependence] = useState(
    route.params.listQuestion,
  );
  const [currIndex, setCurrIndex] = useState(0);

  const currQuestion = useMemo(() => {
    if (listDependence) {
      return listDependence[currIndex];
    }
    return null;
  }, [currIndex, listDependence]);

  const onNext = result => {
    const arr = listDependence.filter(
      item =>
        item.valueDependentOn === result.id ||
        item.questionId === currQuestion.questionId,
    );
    console.log('arr', arr);
    if (arr.length === 1) {
      navigation.goBack();
      route.params?.onDoneChange(result);
    } else {
      setListDependence(arr);
      setCurrIndex(currIndex + 1);
    }
  };

  return (
    <LayoutWrapper>
      <View style={styles.container}>
        <Header />
        {currQuestion && (
          <QuestionChangeDetail
            isChange
            haveInitValue
            data={currQuestion}
            onSubmitAnswer={onNext}
          />
        )}
      </View>
    </LayoutWrapper>
  );
};

export default QuestionChange;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
