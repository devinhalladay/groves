import FunctionBlock from './index';

const inputsMock = [
  {
    __typename: 'channel',
    title: 'Books',
    id: 1,
  },
  {
    title: 'Artworks',
    id: 2,
  },
];

const Story = (props) => <FunctionBlock {...props} />;

// Here we export a variant of the default template passing props
export const FunctionBlockStory = Story.bind({});
FunctionBlockStory.args = {
  inputs: inputsMock,
};

// Here we export the default component that
// will be used by Storybook to show it inside the sidebar
export default {
  title: 'Function Block',
  component: FunctionBlock,
  // argTypes: {
  //   showImage: { control: 'boolean' }
  // }
};
