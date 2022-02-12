import { CURRENT_USER } from '~/src/graphql/queries';
import TypeModal from './index';
import { MockedProvider } from '@apollo/client/testing';

const typeMock = [
  {
    title: 'Authors',
    id: 1,
  },
  {
    title: 'Subjects',
    id: 2,
  },
  { title: 'Publication Year', id: 3 },
];

const Story = (props) => (
  <MockedProvider>
    <TypeModal type={props.type} isOpen={props.isOpen} />
  </MockedProvider>
);

export const TypeModalStory = Story.bind({});

export default {
  title: 'Type Modal',
  component: TypeModal,
  argTypes: {
    isOpen: { control: 'boolean', defaultValue: true },
    type: { control: 'array', defaultValue: typeMock },
  },
  apolloClient: {
    // do not put MockedProvider here, you can, but its preferred to do it in preview.js
    mocks: [
      {
        request: {
          query: CURRENT_USER,
        },
        result: {
          data: {
            viewer: null,
          },
        },
      },
    ],
  },
};
