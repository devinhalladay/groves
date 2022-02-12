import { DialogStep, Intent, MultistepDialog } from '@blueprintjs/core';
import { useState } from 'react';
import ChannelSelector from '../ChannelSelector';
import useToast from '../useToast';
import DefinitionPanel from './DefinitionPanel';
import PropertiesPanel from './PropertiesPanel';

const PureTypeModal = ({ type, setTypeModalIsOpen, isOpen }) => {
  const { showToast } = useToast();

  const [relationFields, setRelationFields] = useState(type);

  return (
    <MultistepDialog
      finalButtonProps={{
        onClick: () => {
          showToast({
            message: 'Successfully created a new type.',
            intent: Intent.SUCCESS,
            icon: 'tick',
          });
          setTypeModalIsOpen(false);
        },
      }}
      isOpen={isOpen}
      title="New object type"
      icon="new-object"
      onClose={() => setTypeModalIsOpen(false)}
    >
      <DialogStep id="select" panel={<DefinitionPanel />} title="Definition" />
      <DialogStep
        id="confirm"
        panel={
          <PropertiesPanel
            channelSelector={ChannelSelector}
            handleAddField={() => {
              let newFields = relationFields;
              newFields.push({ id: relationFields.length + 1, title: '' });
              setRelationFields([...newFields]);
            }}
            setRelationFields={setRelationFields}
            relationFields={relationFields}
          />
        }
        title="Properties"
      />
    </MultistepDialog>
  );
};

export default PureTypeModal;
