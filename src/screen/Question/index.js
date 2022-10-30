import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import Header from '../../components/Header';
import {LIST_QUESTIONS} from '../../dataRaw';
import Empty from '../../components/Empty';
import QuestionDetail from '../QuestionDetail';
import {useNavigation} from '@react-navigation/native';

const Question = ({route}) => {
  const ref = useRef({
    detailCateRaw: null,
  }).current;

  const navigation = useNavigation();
  const [detailCategory, setDetailCategory] = useState();
  const [currIndex, setCurrIndex] = useState(0);

  const cateId = useMemo(() => route.params?.categoryId, [route]);

  useEffect(() => {
    const result = LIST_QUESTIONS.find(item => item.categoryId === cateId);
    setDetailCategory(result);
    ref.detailCateRaw = result;
  }, [cateId]);

  const headerTitle = useMemo(() => {
    if (!detailCategory?.listQuestion) {
      return null;
    }
    return `${currIndex + 1}/${detailCategory?.listQuestion?.length}`;
  }, [detailCategory, currIndex]);

  const currQuestion = useMemo(() => {
    if (detailCategory) {
      return detailCategory.listQuestion[currIndex];
    }
    return null;
  }, [currIndex, detailCategory]);

  const itemDepedency = useMemo(() => {
    if (currQuestion) {
      const currQuestionId = currQuestion?.questionId;
      const listDependence = detailCategory.listQuestion.filter(
        item => item.dependentOn === currQuestionId,
      );
      return listDependence;
    }
  }, [currQuestion, detailCategory]);

  useEffect(() => {
    if (
      currIndex + 1 === detailCategory?.listQuestion?.length &&
      !detailCategory.listQuestion.some(item => !item.answer)
    ) {
      navigation.replace('AnswerResult', {
        result: detailCategory,
        detailCateRaw: ref.detailCateRaw,
      });
    }
  }, [currIndex, detailCategory]);

  const onNext = result => {
    const arr = itemDepedency
      .filter(item => item.valueDependentOn !== result.id)
      .map(item => item.questionId);
    setDetailCategory({
      ...detailCategory,
      listQuestion: detailCategory.listQuestion
        .map((item, index) => {
          if (index === currIndex) {
            return {...item, answer: result};
          }
          return {...item};
        })
        .filter(item => !arr.includes(item.questionId)),
    });
    if (currIndex + 1 === detailCategory?.listQuestion?.length) {
      return;
    }
    setCurrIndex(currIndex + 1);
  };

  const renderDetailQuestion = () => {
    if (!currQuestion) {
      return <Empty />;
    }
    return <QuestionDetail data={currQuestion} onSubmitAnswer={onNext} />;
  };

  return (
    <LayoutWrapper>
      <View style={styles.container}>
        <Header title={`Question ${headerTitle}`} />
        {renderDetailQuestion()}
      </View>
    </LayoutWrapper>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
