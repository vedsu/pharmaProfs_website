import { Button, ButtonProps } from "primereact/button";
import { useState } from "react";

interface IButtonProps extends ButtonProps {
  className?: string;
  containerClassName?: string;
  loaderIconClassName?: string;
  label: string;
  handleClick?: any;
  handleClickWithLoader?: any;
  callbackSuccess?: any;
  type?: any;
}

const ButtonCustom = (props: IButtonProps) => {
  const {
    className,
    containerClassName,
    loaderIconClassName,
    label,
    handleClick,
    handleClickWithLoader,
    callbackSuccess,
    type,
    ...nativeProps
  } = props;

  const [showLoader, setShowLoader] = useState(false);

  const onClickCustomHandler = () => {
    if (handleClickWithLoader) {
      setShowLoader(true);
      handleClickWithLoader().then(() => {
        setShowLoader(false);
        if (callbackSuccess) {
          callbackSuccess();
        }
      });
    } else if (handleClick) {
      handleClick();
    }
  };

  return (
    <div
      className={`flex items-center justify-between ${
        containerClassName ?? ""
      }`}
    >
      <Button
        className={`btn-custom block text-base ${className ?? ""} relative`}
        onClick={onClickCustomHandler}
        // autoFocus
        type={type}
        {...nativeProps}
      >
        <span>{label}</span>
        {showLoader ? (
          <i
            className={`i-focus pi pi-spin pi-spinner text-xs ${
              loaderIconClassName ?? ""
            }`}
          ></i>
        ) : null}
      </Button>
    </div>
  );
};

export default ButtonCustom;
