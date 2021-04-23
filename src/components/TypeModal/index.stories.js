import Modal from './index';

const typeMock = [
  {
    title: 'Authors',
    id: 1
  },
  {
    title: 'Subjects',
    id: 2
  },
  { title: 'Publication Year', id: 3 }
];

const Story = (props) => <Modal {...props} />;

// Here we export a variant of the default template passing props
export const TypeModalStory = Story.bind({});
TypeModalStory.args = {
  type: typeMock
};

// Here we export the default component that
// will be used by Storybook to show it inside the sidebar
export default {
  title: 'Modal',
  component: Modal
  // argTypes: {
  //   showImage: { control: 'boolean' }
  // }
};
