// In packages/excalidraw/components/ExcalidrawLogo.tsx

// Replace existing code with:
import { ElvengenLogoIcon, ElvengenLogoText } from "./CustomLogo";

type LogoSize = "xs" | "small" | "normal" | "large" | "custom";

interface LogoProps {
  size?: LogoSize;
  withText?: boolean;
  style?: React.CSSProperties;
  isNotLink?: boolean;
}

export const ExcalidrawLogo = ({
  style,
  size = "small",
  withText,
}: LogoProps) => {
  return (
    <div className={`ElvengenLogo is-${size}`} style={style}>
      <ElvengenLogoIcon />
      {withText && <ElvengenLogoText />}
    </div>
  );
};
