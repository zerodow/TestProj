export const CATEGORY = [
  {
    id: 0,
    name: 'ANIMALS',
    totalScore: 0,
    color: '#D5A34D',
  },
  {
    id: 1,
    name: 'TRAVEL',
    totalScore: 0,
    color: '#0FBD71',
  },
  {
    id: 2,
    name: 'FOODS',
    totalScore: 0,
    color: '#1679FF',
  },
];

export const LIST_QUESTIONS = [
  {
    categoryId: 0,
    totalScore: 0,
    categoryName: 'ANIMALS',
    listQuestion: [
      {
        questionId: 0,
        title: 'Do you have a dog?',
        description: '',
        listAnswer: [
          {
            id: 0,
            content: 'No',
          },
          {
            id: 1,
            content: 'Yes',
          },
        ],
        haveRawAnswer: false,
      },
      {
        questionId: 3,
        title: 'What is your favorite dog2?',
        description: 'Let us know your favorite dog!',
        haveRawAnswer: true,
      },
      {
        questionId: 4,
        title: 'What is your favorite dog3?',
        description: 'Let us know your favorite dog!',
        listAnswer: [
          {
            id: 0,
            content: 'Husky',
          },
          {
            id: 1,
            content: 'Husky2',
          },
          {
            id: 2,
            content: 'Husky3',
          },
          {
            id: 3,
            content: 'Husk4',
          },
        ],
        haveRawAnswer: false,
      },
    ],
    listDependency: [
      {
        questionId: 1,
        title: 'what’s your dog’s name?',
        dependentOn: 0,
        valueDependentOn: 1,
        description: '',
        haveRawAnswer: true,
      },
      {
        questionId: 2,
        title: 'What type is your dog?',
        dependentOn: 0,
        valueDependentOn: 1,
        description: '',
        listAnswer: [
          {
            id: 0,
            content: 'Husky',
          },
          {
            id: 1,
            content: 'Cesky',
          },
          {
            id: 2,
            content: 'Lowchen',
          },
          {
            id: 3,
            content: 'Komondor',
          },
        ],
        haveRawAnswer: false,
      },
    ],
  },
];
