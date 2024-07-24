import jsonToFormData from "json-form-data";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthValidator from "../../components/AuthValidator";
import ButtonCustom from "../../components/ButtonCustom";
import {
  FORM_DATA_OPTIONS,
  LOCAL_STORAGE_ITEMS,
  PAYMENT_STATUS,
  PHARMA_PROFS,
} from "../../constant";
import { LINK_ATTENDEE_DASHBOARD, LINK_SPEAKER_DASHBOARD } from "../../routes";
import OrderService from "../../services/OrderService";
import { validatePostRequest } from "../../utils/commonUtils";

const PageConfirmPayment = () => {
  const navigate = useNavigate();

  const [cartData, setCartData] = useState<any>(null);
  const [orderDoc, setOrderDoc] = useState<any>(null);

  /*---------------------------Service Calls------------------------------*/
  console.log(orderDoc);

  const createWebinarOrder = useCallback(async () => {
    const currDate = new Date();
    const sessionInfo = localStorage.getItem(LOCAL_STORAGE_ITEMS.SESSION_INFO);
    if (sessionInfo) {
      const parsedSessionInfo = JSON.parse(sessionInfo);
      debugger;
      const jsonPayload = {
        customeremail: cartData?.email,
        paymentstatus: PAYMENT_STATUS.PURCHASED,
        billingemail: cartData?.billingEmail,
        website: PHARMA_PROFS.WEBSITE,
        orderamount: cartData?.cartTotal,
        order_datetimezone: parsedSessionInfo?.date_time,
        topic: cartData?.topic,
        webinardate: cartData?.date,
        sessionLive: cartData?.sessionLive,
        priceLive: cartData?.priceLive,
        sessionRecording: cartData?.sessionRecording,
        priceRecording: cartData?.priceRecording,
        sessionDigitalDownload: cartData?.sessionDigitalDownload,
        priceDigitalDownload: cartData?.priceDigitalDownload,
        sessionTranscript: cartData?.sessionTranscript,
        priceTranscript: cartData?.priceTranscript,
        customername: cartData?.customerName,
        country: cartData?.country,
        state: cartData?.state,
        city: cartData?.city,
        zipcode: cartData?.zipcode,
        address: cartData?.address,
        invoice_number: `${new Date().toDateString()}pharmaprofs${
          cartData?.webinarUrl
        }${Math.random().toString(36).substring(2)}`,
      };

      const formDataPayload = jsonToFormData(jsonPayload, FORM_DATA_OPTIONS);
      debugger;
      try {
        const res = await OrderService.createOrder(formDataPayload);
        if (validatePostRequest(res)) {
          const { data } = res;
          debugger;
          setOrderDoc(data?.document);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [cartData]);

  useEffect(() => {
    const onMount = async () => {
      const cartData = localStorage.getItem(LOCAL_STORAGE_ITEMS.CART_DATA);
      if (cartData) {
        const parsedCartInfo = JSON.parse(cartData);
        setCartData(parsedCartInfo);
        await createWebinarOrder();
      }
    };
    onMount();
  }, [createWebinarOrder]);

  /*--------------------------Event Handlers-------------------------*/

  const onDownloadInvoice = () => {};

  const onCancel = () => {
    if (cartData?.role?.attendee) navigate(`${LINK_ATTENDEE_DASHBOARD}`);
    else if (cartData?.role?.speaker) navigate(`${LINK_SPEAKER_DASHBOARD}`);
  };

  return (
    <AuthValidator>
      <div className="page-margin">
        <div className="w-full h-screen flex flex-col items-center justify-center">
          <div className="text-2xl">
            <h4>Payment Success !</h4>
          </div>
          <div className="flex flex-wrap gap-10">
            <ButtonCustom
              className=""
              label={"Download Invoice"}
              handleClick={onDownloadInvoice}
            />
            <ButtonCustom
              className=""
              label={"Cancel"}
              handleClick={onCancel}
            />
          </div>
        </div>
      </div>
    </AuthValidator>
  );
};

export default PageConfirmPayment;
