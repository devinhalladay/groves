import Tippy from "@tippyjs/react";
import { useState } from "react";

export default () => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <Tippy
      interactive={true}
      interactiveBorder={20}
      arrow={false}
      placement='top-end'
      delay={100}
      content={
        <>
          <p className="title">Import connections</p>
          <div className="input--inline">
            <label for="channel">Name</label>
            <input type="text" name="channel" id="channel" />
          </div>
          <div className="results">
            <ul>
              <li>
                <p className="channel-title"><strong>Liquid</strong> Disintegration</p>
                <p className="meta">Devin Halladay • 23 Blocks</p>
              </li>
              <li>
                <p className="channel-title"><strong>Liquid</strong>ation Chronicles</p>
                <p className="meta">Tanvi Sharma • 47 Blocks</p>
              </li>
            </ul>
          </div>
        </>
      }
      visible={visible}
      onClickOutside={hide}
    >
      <button className="action" onClick={visible ? hide : show}>
        <img src="/connect.svg" />
      </button>
    </Tippy>
  );
};
