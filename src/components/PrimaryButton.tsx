import "./PrimaryButton.css";

type PropTypes = {
  isDisble: boolean;
  text: string;
  buttonHandler: VoidFunction;
};
export default function PrimaryButton({
  isDisble,
  text,
  buttonHandler,
}: PropTypes) {
  return (
    <div className="cta-wrapper">
      <button
        disabled={isDisble}
        className="main-cta login-btn"
        onClick={buttonHandler}
      >
        {text}
      </button>
    </div>
  );
}
