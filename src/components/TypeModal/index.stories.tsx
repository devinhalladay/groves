import TypeModal from './index';

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

const Story = (props) => <TypeModal type={props.type} isOpen={props.open} />;

export const TypeModalStory = Story.bind({});

export default {
  title: 'Type Modal',
  component: TypeModal,
  argTypes: {
    open: { control: 'boolean', defaultValue: true },
    type: { control: 'array', defaultValue: typeMock },
  },
};
