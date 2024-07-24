import { InputTextarea } from "primereact/inputtextarea";
import React, { BaseSyntheticEvent, ReactNode, useState } from "react";
import ButtonCustom from "../../components/ButtonCustom";
import DialogCustom from "../../components/DialogCustom";
import Input from "../../components/Input";
import ContactUsService from "../../services/ContactUsService";
import { validatePostRequest } from "../../utils/commonUtils";

const initialContactUsFormData = {
  name: "",
  email: "",
  message: "",
};

const PageContactUs: React.FC = () => {
  const [showContactFormDialog, setShowContactFormDialog] = useState(false);
  const [formContactUsData, setFormContactUsData] = useState(
    initialContactUsFormData
  );

  const handleContactUsFormChange = (e: BaseSyntheticEvent) => {
    setFormContactUsData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitContactUsForm = async () => {
    const payload = {
      name: formContactUsData.name,
      email: formContactUsData.email,
      message: formContactUsData.message,
    };

    try {
      const res = await ContactUsService.contactUs(payload);
      if (validatePostRequest(res)) {
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*---------------------Sectional Renders--------------------------*/

  const renderContactUsForm = (): ReactNode => {
    const { name, email, message } = formContactUsData;
    return (
      <div className="pt-5 flex flex-col gap-5">
        <div className="px-2">
          <Input
            className=""
            name={"name"}
            label={"Name"}
            type={"text"}
            value={name}
            handler={handleContactUsFormChange}
            mandatory
          />
          {/* <small></small> */}
        </div>
        <div className="px-2">
          <Input
            className=""
            name={"email"}
            label={"Email"}
            type={"email"}
            value={email}
            handler={handleContactUsFormChange}
            mandatory
          />
          {/* <small></small> */}
        </div>
        <div className="px-2 flex flex-col gap-1">
          <label>
            {"Message"}
            <span className="text-primary-asterisk">*</span>
          </label>
          <InputTextarea
            className={"w-full min-h-40 p-2 border border-primary-light-900"}
            name="message"
            value={message}
            onChange={handleContactUsFormChange}
            maxLength={5000}
          />
          {/* <small>{"validationMessage"}</small> */}
        </div>

        <div className="self-center">
          <ButtonCustom
            className="w-32 px-2 flex gap-2 justify-center text-primary-pTextLight bg-primary-bg-teal border border-primary-light-900 rounded-full hover:bg-primary-bg-lightTeal"
            label={"Submit"}
            handleClickWithLoader={onSubmitContactUsForm}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="page-margin">
      <section className="py-5 flex flex-col items-center justify-center">
        <div className="flex flex-col gap-5">
          <div className="mb-1 w-full text-left">
            <h4 className="font-semibold text-2xl text-primary-pTextTeal ">
              How can we help you?
            </h4>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <p className="text-sm font-normal leading-6">
                <span className="text-base font-semibold">Please Note:</span>
                <br />
                <span>
                  Feel free to reach out to us during working hours. Our team
                  will be happy to assist you! We are open from Mon to Fri
                  (except on major US holidays) from 10 AM to 7 PM EST. Our
                  response time for most queries is within 24 Hrs.
                </span>
                <br />
                <span>
                  Visit our website to complete the details and become a part of
                  our dynamic force shaping the future of pharmaceuticals.
                </span>
              </p>
            </div>

            <div className="px-5">
              <div className="text-base font-normal leading-8">
                <span>We are here to assist you</span>
                <br />
                <p className="text-primary-pLabel">Call Us</p>
                <p className="text-sm">xxxxxxxxx</p>
                <p className="text-primary-pLabel">Email Us</p>
                <p className="text-sm">support@profscompliance.com</p>
              </div>
            </div>

            <div>
              <button
                className="px-5 h-8 border border-primary-light-900 rounded-full bg-primary-bg-teal text-primary-pTextLight"
                onClick={() => setShowContactFormDialog(true)}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      <DialogCustom
        dialogVisible={showContactFormDialog}
        containerClassName={
          "max-w-[668px] p-5 border border-primary-light-900 rounded-lg bg-white"
        }
        headerTemplate={<h1 className="text-2xl">Contact Us</h1>}
        headerTemplateClassName={`flex items-center justify-center`}
        bodyTemplate={renderContactUsForm()}
        onHideDialog={() => {
          if (!showContactFormDialog) return;
          setShowContactFormDialog(false);
        }}
      />
    </div>
  );
};

export default PageContactUs;
