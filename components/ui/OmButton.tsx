import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../ui/button";
import { Loader, LucideProps } from "lucide-react";

type Props = PropsWithChildren & {
  loading?: boolean;
  icon?: React.ComponentType<LucideProps>;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: ButtonProps["variant"];
  type?: ButtonProps["type"];
};

const OmButton: React.FC<Props> = ({
  children,
  loading,
  icon: Icon,
  disabled,
  onClick,
  className,
  variant,
  type = "button",
}) => {
  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <Button
      type={type}
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      className={cn(className, {
        "text-gray-600": loading,
      })}
    >
      {loading ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : Icon ? (
        <Icon className="mr-2 h-4 w-4" />
      ) : null}
      {children}
    </Button>
  );
};

export default OmButton;
