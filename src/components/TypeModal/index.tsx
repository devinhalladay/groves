import {
  Button,
  Callout,
  Classes,
  Colors,
  Dialog,
  Divider,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core';
import { useState } from 'react';

const TypeModal = (props) => {
  const { type, setTypeModalIsOpen, isOpen } = props;

  const [relationFields, setRelationFields] = useState(type);

  return (
    <Dialog
      isOpen={isOpen}
      title="New object type"
      icon="new-object"
      onClose={() => setTypeModalIsOpen(false)}
    >
      <div className={Classes.DIALOG_BODY}>
        <Callout
          title="Ontology for Are.na"
          intent="primary"
          style={{ marginBottom: 20 }}
        >
          <p>
            Objects are types of things. They could be Books, People, Fruits, or
            any other category. Objects allow you to find and organize blocks
            more efficiently.
          </p>
        </Callout>

        <FormGroup
          helperText="What is this object called? e.g. Book or Author"
          label="Object Name"
          labelFor="name-input"
          labelInfo="(required)"
        >
          <InputGroup placeholder="Book" fill={true} id="name-input" />
        </FormGroup>

        <Divider style={{ marginBottom: 20 }} />

        <Callout title="Relations" style={{ marginBottom: 20 }}>
          Relations are unique fields that describe the properties of an object.
          For example, a "Book" may have fields of "Author" and "Publication
          Year". <strong>Each field is its own channel.</strong>
        </Callout>

        {relationFields.map((field, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontSize: 12,
                border: '1px solid',
                borderColor: Colors.GRAY4,
                color: Colors.GRAY1,
                borderRadius: 100,
                display: 'flex',
                fontWeight: '600',
                alignItems: 'center',
                justifyContent: 'center',
                height: 26,
                padding: '6px 8px',
                backgroundColor: Colors.LIGHT_GRAY2,
                marginRight: 10,
              }}
            >
              {i + 1}
            </div>
            <InputGroup fill={true} defaultValue={field.title} key={field.id} />
            <Button
              icon="cross"
              fill={false}
              style={{ marginLeft: 10 }}
              onClick={() => {
                let newFields = relationFields;
                newFields = newFields.filter((f) => f.title !== field.title);
                setRelationFields(newFields);
              }}
            />
          </div>
        ))}
        <Button
          icon="add"
          onClick={() => {
            let newFields = relationFields;
            newFields.push({ id: relationFields.length + 1, title: '' });
            setRelationFields([...newFields]);
          }}
        >
          Add relation field
        </Button>
      </div>
      <Divider style={{ marginBottom: 20 }} />
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button
            icon="new-object"
            intent="primary"
            onClick={() => console.log(relationFields)}
          >
            Create Object Type
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default TypeModal;
