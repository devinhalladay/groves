import Modal from './index';

const typeMock = {
  authors: 'Authors',
  subjects: 'Subjects',
  publicationDate: 'Publication Year'
};

const Story = (props) => <Modal {...props} />;

// Here we export a variant of the default template passing props
export const TypeModalStory = Story.bind({});
TypeModalStory.args = {
  type: typeMock
};

// Here we export a variant of the default template passing props
export const EmptyTypeModalStory = Story.bind({});
EmptyTypeModalStory.args = {
  type: null
};

// Here we export the default component that
// will be used by Storybook to show it inside the sidebar
export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    showImage: { control: 'boolean' }
  }
};
