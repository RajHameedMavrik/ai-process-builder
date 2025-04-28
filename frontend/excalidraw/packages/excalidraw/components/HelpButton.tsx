type HelpButtonProps = {
  onClick: () => void;
};

export const HelpButton = ({ onClick }: HelpButtonProps) => {
  return (
    <button className="help-icon" onClick={onClick}>
      {/* Existing SVG/icon code */}
    </button>
  );
};
