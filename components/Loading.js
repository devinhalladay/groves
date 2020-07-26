export default ({ description }) => {
  console.log(description);
  return (
    <div className="loading-screen">
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
