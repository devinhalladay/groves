import {
  Button,
  Callout,
  Classes,
  Colors,
  Divider,
  InputGroup,
} from '@blueprintjs/core';
import ChannelSelector from '../ChannelSelector';
import PureChannelSelector from '../ChannelSelector/PureChannelSelector';

export interface IPropertiesPanel {
  relationFields: {
    title: string;
    id: number;
  }[];
  setRelationFields: any;
  handleAddField: () => void;
  channelSelector: any;
}

const PropertiesPanel: React.FunctionComponent<IPropertiesPanel> = ({
  relationFields,
  setRelationFields,
  handleAddField,
  channelSelector,
}) => {
  return (
    <div className={Classes.DIALOG_BODY}>
      <h3 className="bp4-heading mb-5">Add properties</h3>
      <Divider className="my-5" style={{ marginBottom: 20 }} />

      <Callout
        title="Relation properties"
        intent="primary"
        style={{ marginBottom: 20 }}
      >
        <p>
          Relations are unique fields that describe the properties of an object.
          For example, a "Book" may have fields of "Author" and "Publication
          Year". <strong>Each field is its own channel.</strong>
        </p>
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
          {/* {channelSelector ? channelSelector : <PureChannelSelector />} */}
          <ChannelSelector />
          {/* <InputGroup fill={true} defaultValue={field.title} key={field.id} /> */}
          <Button
            icon="cross"
            fill={false}
            style={{ marginLeft: 10 }}
            onClick={() => {
              let newFields = relationFields;
              newFields.splice(i, 1);
              setRelationFields([...newFields]);
            }}
          />
        </div>
      ))}
      <Button icon="add" onClick={handleAddField}>
        Add relation field
      </Button>
    </div>
  );
};

export default PropertiesPanel;
