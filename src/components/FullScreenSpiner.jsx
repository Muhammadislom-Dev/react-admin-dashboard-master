import "./index.css";

function FullScreenSpinner() {
  return (
    <div className="loader-wrapper">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default FullScreenSpinner;
