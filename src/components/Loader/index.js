const Index = ({ description, fullScreen }) => {
  return (
    <div className={`loading-screen ${!!fullScreen && 'fullscreen'}`}>
      <div className="lds-grid">
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

export default Index;
