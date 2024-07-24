import "primeicons/primeicons.css";
import React, {
  BaseSyntheticEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Outlet, useLocation } from "react-router-dom";
import ButtonCustom from "../components/ButtonCustom";
import DialogCustom from "../components/DialogCustom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Input from "../components/Input";
import { SESSION_STORAGE_ITEMS } from "../constant";
import { LINK_PAGE_CHECKOUT } from "../routes";
import SubscriptionService from "../services/SubscriptionService";
import { validatePostRequest } from "../utils/commonUtils";

const registerBeforeCheckOutBanner = (
  <div className="site-banner">
    <div className="text-sm">
      <p>{"Please login or register to continue !"}</p>
    </div>
  </div>
);

const PPWebsite: React.FC = () => {
  const location = useLocation();
  const [showRegistrationBanner, setShowRegistrationBanner] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [showSubscribeFormDialog, setShowSubscribeFormDialog] = useState(false);
  const [subscribeFormData, setSubscribeFormData] = useState({
    email: "",
  });

  useEffect(() => {
    if (location.state && location.state?.showRegCheckOutBanner) {
      let bannerInfoFromSession = sessionStorage.getItem(
        SESSION_STORAGE_ITEMS.REG_BANNER
      );
      if (bannerInfoFromSession) {
        const bannerInfo = JSON.parse(bannerInfoFromSession);
        bannerInfo?.display ? setShowRegistrationBanner(true) : null;
        setTimeout(() => {
          setShowRegistrationBanner(false);
          sessionStorage.removeItem(SESSION_STORAGE_ITEMS.REG_BANNER);
        }, 2000);
      }
    }
  }, [location.state]);

  const onSubmitSubscriptionForm = async () => {
    const payload = {
      email: subscribeFormData.email,
    };
    try {
      const res = await SubscriptionService.subscribe(payload);
      if (validatePostRequest(res)) {
        setShowSubscribeFormDialog(false);
        setIsSubscribed(true);
        setSubscribeFormData({
          email: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderSubscriptionDialog = (): ReactNode => {
    const { email } = subscribeFormData;
    return (
      <div className="pt-5 flex flex-col">
        <div className="px-2">
          <Input
            className=""
            name={"email"}
            label={"Email"}
            type={"email"}
            value={email}
            handler={(e: BaseSyntheticEvent) =>
              setSubscribeFormData({ email: e.target.value })
            }
            mandatory
          />
          {/* <small></small> */}
        </div>
        <div className="self-center">
          <ButtonCustom
            className="w-32 px-2 flex gap-2 justify-center text-primary-pTextLight bg-primary-bg-teal border border-primary-light-900 rounded-full hover:bg-primary-bg-lightTeal"
            label={"Submit"}
            handleClickWithLoader={onSubmitSubscriptionForm}
          />
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {showRegistrationBanner ? registerBeforeCheckOutBanner : null}
      <Header />
      <main>
        <Outlet />
      </main>

      {isSubscribed ? (
        <div>
          <button
            className="vertical-btn"
            onClick={() => {
              setShowSubscribeFormDialog(true);
            }}
          >
            {"Subscribe"}
          </button>
        </div>
      ) : null}

      <DialogCustom
        dialogVisible={showSubscribeFormDialog}
        containerClassName={
          "max-w-[668px] p-5 border border-primary-light-900 rounded-lg bg-white"
        }
        headerTemplate={<h1 className="text-2xl">Subscribe</h1>}
        headerTemplateClassName={`flex items-center justify-center`}
        bodyTemplate={renderSubscriptionDialog()}
        onHideDialog={() => {
          if (!showSubscribeFormDialog) return;
          setShowSubscribeFormDialog(false);
        }}
      />

      {location?.pathname?.includes(LINK_PAGE_CHECKOUT) ? null : <Footer />}
    </React.Fragment>
  );
};
export default PPWebsite;
