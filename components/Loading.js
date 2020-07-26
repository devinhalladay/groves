export default ({ description, fullScreen }) => {
  return (
    <div className={`loading-screen ${!!fullScreen && 'fullscreen'}`}>
      <div class="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
};
