import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BaseSyntheticEvent, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AuthValidator from "../../components/AuthValidator";
import ButtonCustom from "../../components/ButtonCustom";
import DialogCustom from "../../components/DialogCustom";
import { ENV_VAR, LOCAL_STORAGE_ITEMS } from "../../constant";
import { LINK_PAGE_CONFIRM_PAYMENT } from "../../routes";
import { getEnvVariableValues } from "../../utils/commonUtils";

const stripePromise = loadStripe(
  getEnvVariableValues(ENV_VAR.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY)
);

const CheckoutForm = (props: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const [showPaymentFailure, setShowPaymentFailure] = useState(false);

  /*--------------------Event Handlers------------------*/
  const handleStripePay = async (event: BaseSyntheticEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin + LINK_PAGE_CONFIRM_PAYMENT}`,
        },
      });

      if (result.error) {
        setShowPaymentFailure(true);
      }
    } catch (error) {
      setShowPaymentFailure(true);
    }
  };

  const onRetry = () => {
    window.location.reload();
  };

  /*--------------------Sectional Renders---------------------------*/

  const renderPaymentFailureDialog = (): ReactNode => {
    return (
      <div className="pt-5 flex flex-col gap-10 items-center">
        <div className="text-sm text-center">
          <p>
            Unfortunately, the payment for this order has failed <br />
            we had an issue processing your payment. <br />
            Don't panic, it happens!
          </p>
        </div>
        <div>
          <ButtonCustom
            className="btn-custom-secondary w-32 px-2 flex gap-2 justify-center text-primary-pLabel border-2 border-primary-light-900 rounded-full bg-primary-bg-mintCream hover:bg-slate-50"
            label={"Retry"}
            handleClickWithLoader={onRetry}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="stripe-gateway-wrapper my-5 p-5">
      <form
        className="my-5 p-5 flex flex-col items-center justify-center"
        onSubmit={handleStripePay}
      >
        <div>
          <PaymentElement />
          <ButtonCustom
            containerClassName="my-8"
            className="w-full p-2 text-center bg-primary-bg-teal text-primary-pTextLight rounded-md"
            type={"submit"}
            label={`Pay $${props?.checkoutInfo?.amount}`}
            disabled={!stripe}
          />
        </div>
      </form>

      <DialogCustom
        dialogVisible={showPaymentFailure}
        containerClassName={
          "max-w-fit p-5 border border-primary-light-900 rounded-lg bg-white"
        }
        headerTemplate={
          <h1 className="text-2xl text-primary-error">Payment Failed !</h1>
        }
        headerTemplateClassName={`flex items-center justify-center`}
        bodyTemplate={renderPaymentFailureDialog()}
        onHideDialog={() => {
          if (!showPaymentFailure) return;
          window.location.reload();
          setShowPaymentFailure(false);
        }}
        position="top"
      />
    </div>
  );
};

const PageCheckout = () => {
  const location = useLocation();

  useEffect(() => {
    const onMount = async () => {
      localStorage.setItem(
        LOCAL_STORAGE_ITEMS.SESSION_INFO,
        JSON.stringify(location?.state)
      );
    };
    onMount();
  }, [location]);

  const options = {
    // passing the client secret obtained from the server
    clientSecret: location?.state?.clientSecret,
  };

  return (
    <AuthValidator>
      <div className="page-margin">
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm checkoutInfo={location?.state} />
        </Elements>
      </div>
    </AuthValidator>
  );
};

export default PageCheckout;
