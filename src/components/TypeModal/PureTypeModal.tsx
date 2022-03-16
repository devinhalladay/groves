import { DialogStep, Intent, MultistepDialog } from '@blueprintjs/core';
import { DIALOG_STEP } from '@blueprintjs/core/lib/esm/common/classes';
import { FC, useState } from 'react';
import ChannelSelector from '../ChannelSelector';
import useToast from '../useToast';
import DefinitionPanel from './DefinitionPanel';
import PropertiesPanel from './PropertiesPanel';

type RelationField = {
  title: string;
  id: number;
};

interface IPureTypeModal {
  type: RelationField[];
  setTypeModalIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
}

const PureTypeModal: FC<IPureTypeModal> = ({
  type,
  setTypeModalIsOpen,
  isOpen,
}) => {
  const { showToast } = useToast();

  const [relationFields, setRelationFields] = useState(type);
  const [objectName, setObjectName] = useState<string | null>(null);
  const [objectDescription, setObjectDescription] = useState<string | null>(
    null,
  );

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
      // onChange={(step, previous) => {
      //   console.log(step);
      //   return null;
      //   // if (step ) {
      //   //   setTypeModalIsOpen(false);
      //   // }
      // }}
      onClose={() => setTypeModalIsOpen(false)}
    >
      <DialogStep
        id="select"
        panel={
          <DefinitionPanel
            objectName={objectName}
            setObjectName={setObjectName}
            objectDescription={objectDescription}
            setObjectDescription={setObjectDescription}
          />
        }
        title="Definition"
      />
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
