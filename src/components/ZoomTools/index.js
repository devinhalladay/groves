import ZoomInIcon from '~/public/zoom-in.svg'
import { useSelection } from '~/src/context/selection-context';
import { useWorkspace } from '~/src/context/workspace-context';
import Slider from 'rc-slider';

const ZoomTools = (panZoomRef) => {
  const { zoomScale } = useWorkspace();
  const { selectedConnection } = useSelection();

  const onScaleUp = (scale) => {
    panZoomRef.current && panZoomRef.current.setScale(scale + 0.1);
  };

  const onScaleDown = (scale) => {
    panZoomRef.current && panZoomRef.current.setScale(scale - 0.1);
  };

  const onScale = (value) => {
    panZoomRef.current && panZoomRef.current.setScale(value);
  };

  return (
  <div
    className="zoomTools"
    style={{
      right: selectedConnection ? '330px' : '15px'
    }}>
    <button className="icon-button" onClick={() => onScaleUp(panZoomRef.current.scale)}>
      <ZoomInIcon />
    </button>
    <div className="sliderContainer">
      <Slider
        vertical="true"
        onChange={onScale}
        min={0.5}
        max={1.5}
        defaultValue={1}
        step={0.1}
        value={zoomScale}
      />
    </div>
    <button className="icon-button" onClick={() => onScaleDown(panZoomRef.current.scale)}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.875 11.875C9.63642 11.875 11.875 9.63642 11.875 6.875C11.875 4.11358 9.63642 1.875 6.875 1.875C4.11358 1.875 1.875 4.11358 1.875 6.875C1.875 9.63642 4.11358 11.875 6.875 11.875Z"
          stroke="#6F7B8A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.125 13.125L10.4062 10.4062"
          stroke="#6F7B8A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5 6.875H8.75" stroke="#6F7B8A" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>)
};


export default ZoomTools;