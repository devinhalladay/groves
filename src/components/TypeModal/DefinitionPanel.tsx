import {
  Callout,
  Classes,
  Divider,
  FormGroup,
  InputGroup,
  TextArea,
} from '@blueprintjs/core';
import { FC, useEffect, useRef } from 'react';

export interface IDefinitionPanelProps {
  objectName: string | null;
  setObjectName: (name: string) => void;
  objectDescription: string | null;
  setObjectDescription: (description: string) => void;
}

const DefinitionPanel: FC<IDefinitionPanelProps> = ({
  objectName,
  setObjectName,
  objectDescription,
  setObjectDescription,
  ...props
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className={Classes.DIALOG_BODY}>
      <h3 className="bp4-heading mb-5">New block type</h3>

      <Divider className="my-5" style={{ marginBottom: 20 }} />

      <Callout
        title="Create your own Are.na ontology"
        intent="primary"
        style={{ marginBottom: 20 }}
      >
        <p>
          Objects are types of things. They could be Books, People, Fruits, or
          any other category. Objects allow you to find and organize blocks more
          efficiently.
        </p>
      </Callout>

      <FormGroup
        helperText="What is this object called? e.g. Book or Author"
        label="Name"
        labelFor="name-input"
        labelInfo="(required)"
      >
        <InputGroup
          placeholder="Book"
          fill={true}
          id="name-input"
          intent="primary"
          large={true}
          defaultValue={objectName}
          inputRef={nameInputRef}
          onChange={(e) => setObjectName(e.currentTarget.value)}
        />
      </FormGroup>

      <FormGroup
        helperText="Describe this object"
        label="Description"
        labelFor="description-input"
      >
        <TextArea
          fill={true}
          growVertically={true}
          defaultValue={objectDescription}
          required={false}
          large={false}
          inputRef={descriptionInputRef}
          onChange={(e) => setObjectDescription(e.currentTarget.value)}
        />
      </FormGroup>
    </div>
  );
};

export default DefinitionPanel;
