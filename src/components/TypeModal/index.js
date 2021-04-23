import {
  Button,
  Callout,
  Classes,
  Colors,
  ControlGroup,
  Dialog,
  Divider,
  FormGroup,
  InputGroup,
  Label
} from '@blueprintjs/core';

const Modal = (props) => {
  const { type } = props;
  return (
    <Dialog isOpen={true} title="Add a new object type" icon="new-object">
      <div className={Classes.DIALOG_BODY}>
        <Callout title="Objects in Groves" intent="primary" style={{ marginBottom: 20 }}>
          <p>
            Objects are types of things. They could be Books, People, Fruits, or any other category.
            Objects allow you to find and organize blocks more efficiently.
          </p>
        </Callout>

        <Label>
          Object Name
          <InputGroup fill={true} />
        </Label>

        <Divider style={{ marginBottom: 20 }} />

        <Callout title="Relations">
          Relations are unique fields that describe the properties of an object. For example, a
          "Book" may have fields of "Author" and "Publication Year".{' '}
          <strong>Each field is its own channel.</strong>
        </Callout>

        {Object.keys(type).map((field, i) => (
          <>
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                marginBottom: 20
              }}>
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
                  marginRight: 10
                }}>
                {i + 1}
              </div>
              <InputGroup fill={true} defaultValue={type[field]} key={i} />
              <Button icon="cross" fill={false} style={{ marginLeft: 10 }} />
            </div>
          </>
        ))}
        <Button icon="add">Add relation field</Button>
      </div>
      <Divider style={{ marginBottom: 20 }} />
      <div className={Classes.DIALOG_FOOTER}>
        <div className={Classes.DIALOG_FOOTER_ACTIONS}>
          <Button icon="new-object" intent="primary">
            Create Object Type
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
