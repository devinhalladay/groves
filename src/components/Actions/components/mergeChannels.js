import { Button, ControlGroup, Icon, InputGroup, Menu, MenuItem, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useSelection } from '~/src/context/selection-context';

const MergeChannelsAction = () => {
  const { selections, setSelections } = useSelection();

  const handleMerge = () => {
    console.log(selections);
  };

  if (selections.length) {
    return (
      <Popover position="bottom-right">
        <Button className="action">
          <Icon icon={IconNames.GIT_MERGE} />
        </Button>
        <section style={{ padding: 15, width: 450, paddingTop: 25 }}>
          <p style={{ marginBottom: 15 }}>
            <span style={{ paddingRight: 6 }}>
              <Icon icon={IconNames.GIT_MERGE} />
            </span>
            <strong>Merging {selections.length} channels</strong>
          </p>
          <ControlGroup
            fill={true}
            vertical={true}
            style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
            <InputGroup
              disabled={true}
              large={true}
              fill={true}
              value={`Merge ${selections.length - 1} of ${selections.length} channel${
                selections.length - 1 !== 1 ? 's' : ''
              } into`}
              style={{ textAlign: 'center', justifyContent: 'center' }}
              className="merge-input-disabled"
            />
            <Popover position="bottom" fill={true}>
              <Button
                large={true}
                // minimal={true}
                fill={true}
                rightIcon="caret-down"
                // intent="primary"
                style={{ textOverflow: 'ellipsis' }}>
                {selections[0].title}
              </Button>
              <Menu fill={true} large={true}>
                {selections.map((selection, i) => (
                  <MenuItem
                    active={i == 0}
                    icon={i == 0 ? IconNames.TICK : 'blank'}
                    text={selection.title}
                    key={selection.id}
                  />
                ))}
              </Menu>
            </Popover>
          </ControlGroup>
          <Button
            large={true}
            // minimal={true}
            fill={true}
            leftIcon="caret-down"
            intent="primary">
            Merge channels
          </Button>
        </section>
      </Popover>
    );
  }

  return null;
};

export default MergeChannelsAction;
