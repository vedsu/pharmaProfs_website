import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { BaseSyntheticEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import brandLogo from "../assets/images/pp_brand_logo.png";
import {
  LINK_PAGE_ABOUT_US,
  LINK_PAGE_CONTACT_US,
  LINK_PAGE_FAQ,
  LINK_PAGE_PRIVACY_POLICY,
  LINK_PAGE_REFUND_AND_CANCELLATION,
  LINK_PAGE_TERMS_AND_CONDITIONS,
} from "../routes";
import SubscriptionService from "../services/SubscriptionService";
import { validatePostRequest } from "../utils/commonUtils";
import ButtonCustom from "./ButtonCustom";
import DialogCustom from "./DialogCustom";
import Input from "./Input";

const initialSpeakerFormData = {
  name: "",
  email: "",
  education: "",
  country: "",
  phone: "",
  industry: "",
  bio: "",
};

const Footer = () => {
  const currYear = new Date().getFullYear();

  const [showSpeakerOpportunityForm, setShowSpeakerOpportunityForm] =
    useState(false);
  const [speakerFormData, setSpeakerFormData] = useState(
    initialSpeakerFormData
  );

  const [showUnsubscribeForm, setShowUnsubscribeForm] = useState(false);
  const [formUnsubscribeData, setFormUnsubscribeData] = useState({
    email: "",
  });
  /*------------Event Handlers----------- */
  const onClickSpeakerOpportunity = () => {
    setShowSpeakerOpportunityForm(true);
  };

  const handleSpeakerFormInputChange = (e: BaseSyntheticEvent) => {
    setSpeakerFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleIndustryChange = (e: DropdownChangeEvent) => {
    setSpeakerFormData((prev) => ({
      ...prev,
      [e.target.name]: e.value,
    }));
  };

  const onSubmitSpeakerOpportunityForm = () => {
    //
  };

  const onSubmitUnsubscribeForm = async () => {
    const payload = {
      email: formUnsubscribeData.email,
    };
    try {
      const res = await SubscriptionService.unsubscribe(payload);
      if (validatePostRequest(res)) {
        setShowUnsubscribeForm(false);
        setFormUnsubscribeData({ email: "" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*--------------Sectional Renders---------------- */

  const renderSpeakerFormDialogHeader = (): ReactNode => {
    return <h1 className="text-2xl">Speaker Opportunity</h1>;
  };

  const renderSpeakerFormDialog = (): ReactNode => {
    const { name, email, education, phone, bio } = speakerFormData;

    return (
      <div className="py-2 px-5 flex items-center justify-center">
        <div className="w-full flex flex-col gap-2 text-sm">
          <div className="grid grid-cols-2 gap-5">
            <Input
              className="col-span-1"
              name={"name"}
              label={"Name"}
              value={name}
              handler={handleSpeakerFormInputChange}
            />
            <Input
              className="col-span-1"
              name={"email"}
              label={"Email"}
              type={"email"}
              value={email}
              handler={handleSpeakerFormInputChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Input
              className="col-span-1"
              name={"education"}
              label={"Education"}
              value={education}
              handler={handleSpeakerFormInputChange}
            />
            <Input
              className="col-span-1"
              name={"phone"}
              label={"Contact"}
              value={phone}
              handler={handleSpeakerFormInputChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>{"Industry"}</label>
            <Dropdown
              className="p-2 w-full border border-primary-light-900 text-gray-500 text-xs"
              name="industry"
              placeholder="Select Industry"
              options={[{ label: "Option1", value: "val1" }]}
              optionLabel="label"
              optionValue="value"
              value={""}
              onChange={handleIndustryChange}
            />
            {/* <small>{"validationMessage"}</small> */}
          </div>

          <div className="w-full flex flex-col gap-1">
            <label>{"Bio"}</label>
            <InputTextarea
              className={"w-full min-h-40 p-2 border border-primary-light-900"}
              name="bio"
              value={bio}
              onChange={handleSpeakerFormInputChange}
              maxLength={5000}
            />
            {/* <small>{"validationMessage"}</small> */}
          </div>
        </div>
      </div>
    );
  };

  const renderSpeakerFormDialogFooter = (): ReactNode => {
    return (
      <div className="mt-5 w-full flex items-center justify-center">
        <ButtonCustom
          className="w-32 px-2 flex gap-2 justify-center text-primary-pTextLight bg-primary-bg-teal border border-primary-light-900 rounded-full hover:bg-primary-bg-lightTeal"
          label={"Submit"}
          handleClickWithLoader={onSubmitSpeakerOpportunityForm}
        />
      </div>
    );
  };

  const renderUnSubscribeDialog = (): ReactNode => {
    const { email } = formUnsubscribeData;
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
              setFormUnsubscribeData({ email: e.target.value })
            }
            mandatory
          />
          {/* <small></small> */}
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
    <footer className="temp-primary-footer text-primary-pText">
      <div className="footer-nav-wrapper py-5">
        <div className="w-64 flex items-center justify-center">
          <img className="" src={brandLogo} alt="logo" />
        </div>

        <div className="mt-6 flex gap-10 justify-between text-sm">
          <div className="footer-social-group gap-4 font-normal text-xs">
            <div className="flex gap-4 text-white text-sm">
              <a
                className="pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="#"
                target="_blank"
              >
                <i className="pi pi-linkedin"></i>
              </a>
              <a
                className="pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="#"
                target="_blank"
              >
                <i className="pi pi-twitter"></i>
              </a>
              <a
                className="pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="#"
                target="_blank"
              >
                <i className="pi pi-youtube"></i>
              </a>
              <a
                className="pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="#"
                target="_blank"
              >
                <i className="pi pi-facebook"></i>
              </a>
              <a
                className="pt-[1px] inline-block w-8 h-8 text-center leading-8 rounded-full"
                href="#"
                target="_blank"
              >
                <i className="pi pi-instagram"></i>
              </a>
            </div>

            <div className="mb-4 font-normal text-sm">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius et
                officiis ipsa consequuntur iusto ab commodi aspernatur id
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="footer-links flex flex-col justify-start">
              <button
                className="mb-4 text-left"
                onClick={() => {
                  setShowUnsubscribeForm(true);
                }}
              >
                <a>UnSubscribe</a>
              </button>
              <Link to={LINK_PAGE_PRIVACY_POLICY}>Privacy Policy</Link>
              <Link to={LINK_PAGE_TERMS_AND_CONDITIONS}>
                Terms & Conditions
              </Link>
              <Link to={LINK_PAGE_REFUND_AND_CANCELLATION}>
                Refund & Cancellation
              </Link>
            </div>

            <div className="footer-links flex flex-col justify-start">
              <Link to={LINK_PAGE_CONTACT_US}>Contact Us</Link>
              <Link to={LINK_PAGE_ABOUT_US}>About Us</Link>
              <Link to={LINK_PAGE_FAQ}>FAQ's</Link>
            </div>

            <div className="footer-links flex flex-col justify-start">
              <button
                className="mb-4 text-left"
                onClick={onClickSpeakerOpportunity}
              >
                <a>Speaker's Opportunity</a>
              </button>

              <Link to="#" />
              <p className="org-address">
                <span className="inline-block w-full">Pharma Profs,</span>
                <span className="inline-block w-full">
                  2438 Industrial Blvd #802,
                </span>
                <span className="inline-block w-full">Abilene, TX 79605,</span>
                <span className="inline-block w-full">
                  Contact Us: +1-302-803-4775
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="w-3/4 mx-auto border-2 border-white" />

      <div className="py-4 text-center">
        <p>© {currYear} Copyright PharmaProfs. All Rights Reserved</p>
      </div>

      <DialogCustom
        dialogVisible={showSpeakerOpportunityForm}
        containerClassName={
          "max-w-[668px] p-5 border border-primary-light-900 rounded-lg bg-white"
        }
        headerTemplate={renderSpeakerFormDialogHeader()}
        headerTemplateClassName={`flex items-center justify-center`}
        bodyTemplate={renderSpeakerFormDialog()}
        footerTemplate={renderSpeakerFormDialogFooter()}
        onHideDialog={() => {
          if (!showSpeakerOpportunityForm) return;
          setShowSpeakerOpportunityForm(false);
        }}
      />

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
    </footer>
  );
};

export default Footer;
