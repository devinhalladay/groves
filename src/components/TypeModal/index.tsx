import PureTypeModal from './PureTypeModal';

const TypeModal = (props) => {
  const { type, setTypeModalIsOpen, isOpen } = props;

  return (
    <PureTypeModal
      isOpen={isOpen}
      setTypeModalIsOpen={setTypeModalIsOpen}
      type={type}
    />
  );
};

export default TypeModal;
