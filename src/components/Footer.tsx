import { BaseSyntheticEvent, ReactNode, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LINK_PAGE_ABOUT_US,
  LINK_PAGE_CONTACT_US,
  LINK_PAGE_FAQ,
  LINK_PAGE_PRIVACY_POLICY,
  LINK_PAGE_REFUND_AND_CANCELLATION,
  LINK_PAGE_SPEAKER_OPPORTUNITY,
  LINK_PAGE_TERMS_AND_CONDITIONS,
} from "../routes";
import SubscriptionService from "../services/SubscriptionService";
import { validatePostRequest } from "../utils/commonUtils";
import ButtonCustom from "./ButtonCustom";
import DialogCustom from "./DialogCustom";
import Input from "./Input";
import SimpleReactValidator from "simple-react-validator";

// const initialSpeakerFormData = {
//   name: "",
//   email: "",
//   education: "",
//   country: "",
//   phone: "",
//   industry: "",
//   bio: "",
// };

const Footer = () => {
  const currYear = new Date().getFullYear();

  const [showUnsubscribeForm, setShowUnsubscribeForm] = useState(false);
  const [formUnsubscribeData, setFormUnsubscribeData] = useState({
    email: "",
  });
  const [showUnsubscribePopUp, setShowUnsubscribePopUp] = useState({
    isSuccess: false,
    showPopUp: false,
    headerContent: <div />,
    bodyContent: <div />,
  });
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: "text-danger" }),
  );
  const [_, forceUpdate] = useState<any>();

  /*------------Event Handlers----------- */

  const onSubmitUnsubscribeForm = async () => {
    const formValid = simpleValidator.current.allValid();
    if (!formValid) {
      simpleValidator.current.showMessages();
      forceUpdate("");
      return;
    }

    const payload = {
      Unsubscriber: formUnsubscribeData.email,
    };

    try {
      const res = await SubscriptionService.unsubscribe(payload);
      if (validatePostRequest(res)) {
        setShowUnsubscribePopUp({
          isSuccess: true,
          showPopUp: true,
          headerContent: <h1 className="text-2xl" />,
          bodyContent: (
            <div className="p-5">
              <p>You have {res?.data?.message}.</p>
            </div>
          ),
        });
        setShowUnsubscribeForm(false);
        setFormUnsubscribeData({ email: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*--------------Sectional Renders---------------- */

  const renderUnSubscribeDialog = (): ReactNode => {
    const { email } = formUnsubscribeData;
    return (
      <div className="pt-5 flex flex-col gap-5">
        <div className="px-2">
          <Input
            className=""
            name={"email"}
            label={"Email"}
            type={"email"}
            value={email}
            handler={(e: BaseSyntheticEvent) =>
              setFormUnsubscribeData({ email: e.target.value })
            }
            mandatory
            onBlur={() => {
              simpleValidator.current.showMessageFor("email");
            }}
            validationMessage={simpleValidator.current.message(
              "email",
              email,
              "required|email",
            )}
          />
        </div>
        <div className="self-center">
          <ButtonCustom
            className="w-32 px-2 flex gap-2 justify-center text-primary-pTextLight bg-primary-bg-teal border border-primary-light-900 rounded-full hover:bg-primary-bg-lightTeal"
            label={"Submit"}
            handleClickWithLoader={onSubmitUnsubscribeForm}
          />
        </div>
      </div>
    );
  };

  return (
    <footer className="pp-footer text-primary-pText">
      <div className="footer-nav-wrapper py-5">
        {/* <div className="w-64 flex items-center justify-center">
          <img className="" src={brandLogo} alt="logo" />
        </div> */}

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 screen_var_one:grid-cols-3 xl:grid-cols-4 text-sm">
          <div className="footer-links flex flex-col place-items-center screen_var_one:place-items-start">
            <div className="pb-3">
              <h3 className="text-primary-bg-purple text-lg">Get To Know Us</h3>
            </div>

            <Link to={LINK_PAGE_PRIVACY_POLICY}>Privacy Policy</Link>
            <Link to={LINK_PAGE_TERMS_AND_CONDITIONS}>Terms & Conditions</Link>
            <Link to={LINK_PAGE_REFUND_AND_CANCELLATION}>
              Refund & Cancellation
            </Link>
          </div>

          <div className="footer-links flex flex-col place-items-center screen_var_one:place-items-start">
            <div className="pb-3">
              <h3 className="text-primary-bg-purple text-lg">Useful Links</h3>
            </div>
            <Link to={LINK_PAGE_CONTACT_US}>Contact Us</Link>
            <Link to={LINK_PAGE_ABOUT_US}>About Us</Link>
            <Link to={LINK_PAGE_FAQ}>FAQ's</Link>
          </div>

          <div className="footer-links flex flex-col place-items-center screen_var_one:place-items-start">
            <div className="pb-3">
              <h3 className="text-primary-bg-purple text-lg">
                Let Us Help You
              </h3>
            </div>

            <div className="mb-4 text-left">
              <Link to={LINK_PAGE_SPEAKER_OPPORTUNITY}>
                Speaker's Opportunity
              </Link>
            </div>

            <button
              className="mb-4 text-left"
              onClick={() => {
                setShowUnsubscribeForm(true);
              }}
            >
              <a>UnSubscribe</a>
            </button>

            <p className="org-address">
              Pharma Profs,
              <br />
              2438 Industrial Blvd #802,
              <br />
              Abilene, TX 79605,
              <br />
              Contact Us: +1-302-803-4775
            </p>
          </div>

          <div className="footer-social-group font-normal text-xs">
            <div className="pb-3">
              <h3 className="text-primary-bg-purple text-lg">Follow Us</h3>
            </div>

            <div className="flex gap-4 text-white text-sm">
              <a
                className="social-favicon pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="https://www.linkedin.com/company/pharma-profs"
                target="_blank"
              >
                <i className="pi pi-linkedin"></i>
              </a>
              <a
                className="social-favicon pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="https://x.com"
                target="_blank"
              >
                <i className="pi pi-twitter"></i>
              </a>
              <a
                className="social-favicon pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="https://www.youtube.com/@PharmaProfs"
                target="_blank"
              >
                <i className="pi pi-youtube"></i>
              </a>
              <a
                className="social-favicon pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="https://www.facebook.com/people/Pharma-Profs/61561140721641"
                target="_blank"
              >
                <i className="pi pi-facebook"></i>
              </a>
              <a
                className="social-favicon pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="#"
                target="_blank"
              >
                <i className="pi pi-instagram"></i>
              </a>
            </div>

            <div className="my-3 font-medium text-sm">
              <p className="text-center">
                We are shaping the next generation
                <br />
                of medical professionals.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-2 border-white" />

      <div className="py-4 text-center text-xs">
        <p>© {currYear} Copyright PharmaProfs. All Rights Reserved</p>
      </div>

      <DialogCustom
        dialogVisible={showUnsubscribeForm}
        containerClassName={
          "max-w-[668px] p-5 border border-primary-light-900 rounded-lg bg-white"
        }
        headerTemplate={<h1 className="text-2xl">Unsubscribe</h1>}
        headerTemplateClassName={`flex items-center justify-center`}
        bodyTemplate={renderUnSubscribeDialog()}
        onHideDialog={() => {
          if (!showUnsubscribeForm) return;
          setShowUnsubscribeForm(false);
        }}
      />

      <DialogCustom
        dialogVisible={showUnsubscribePopUp.showPopUp}
        containerClassName={
          "max-w-[500px] p-5 border border-primary-light-900 rounded-lg bg-white"
        }
        headerTemplate={showUnsubscribePopUp.headerContent}
        headerTemplateClassName={`flex items-center justify-center`}
        bodyTemplate={showUnsubscribePopUp.bodyContent}
        onHideDialog={() => {
          setShowUnsubscribePopUp((prev) => ({ ...prev, showPopUp: false }));
        }}
      />
    </footer>
  );
};

export default Footer;
