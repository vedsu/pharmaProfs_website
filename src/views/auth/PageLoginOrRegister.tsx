import jsonToFormData from "json-form-data";
import { BaseSyntheticEvent, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCustom from "../../components/ButtonCustom";
import Input from "../../components/Input";
import InputPasswordCustom from "../../components/InputPassword";
import {
  FORM_DATA_OPTIONS,
  LOCAL_STORAGE_ITEMS,
  PHARMA_PROFS,
  USER_ROLE,
} from "../../constant";
import {
  LINK_ATTENDEE_DASHBOARD,
  LINK_PAGE_FORGOT_PASSWORD,
  LINK_SPEAKER_DASHBOARD,
} from "../../routes";
import AuthService from "../../services/AuthService";
import { validatePostRequest } from "../../utils/commonUtils";

const initialRegisterFormData = {
  name: "",
  email: "",
  password: "",
  role: {
    speaker: false,
    attendee: false,
  },
};

const initialLoginFormData = {
  email: "",
  password: "",
  role: {
    speaker: false,
    attendee: false,
  },
};

const PageLoginOrRegister = () => {
  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState(initialLoginFormData);
  const [registerFormData, setRegisterFormData] = useState(
    initialRegisterFormData
  );

  /*----------------------------------------Event Handlers----------------------------------------*/

  const handleLoginFormInputChange = (e: BaseSyntheticEvent) => {
    if (e.target.type === "checkbox") {
      setLoginFormData((prev) => {
        return {
          ...prev,
          role: {
            ...prev.role,
            [e.target.name]: e.target.checked,
          },
        };
      });
      return;
    } else {
      setLoginFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleRegisterFormInputChange = (e: BaseSyntheticEvent) => {
    if (e.target.type === "checkbox") {
      setRegisterFormData((prev) => {
        return {
          ...prev,
          role: {
            ...prev.role,
            [e.target.name]: e.target.checked,
          },
        };
      });
      return;
    } else {
      setRegisterFormData((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const onLogin = async () => {
    const jsonPayload = prepareLoginPayload();
    const loginDataAsFormData = jsonToFormData(jsonPayload, FORM_DATA_OPTIONS);

    try {
      const res = await AuthService.login("login", loginDataAsFormData);
      if (validatePostRequest(res)) {
        localStorage.setItem(
          LOCAL_STORAGE_ITEMS.USERINFO,
          JSON.stringify({
            email: loginFormData.email,
            role: loginFormData.role,
          })
        );

        if (loginFormData.role.attendee) navigate(`${LINK_ATTENDEE_DASHBOARD}`);
        else if (loginFormData.role.speaker)
          navigate(`${LINK_SPEAKER_DASHBOARD}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onRegister = async () => {
    const jsonPayload = prepareRegisterPayload();

    const regFormData = jsonToFormData(jsonPayload, FORM_DATA_OPTIONS);

    try {
      const res = await AuthService.register("register", regFormData);
      if (validatePostRequest(res)) {
        localStorage.setItem(
          LOCAL_STORAGE_ITEMS.USERINFO,
          JSON.stringify({
            name: registerFormData.name,
            email: registerFormData.email,
            role: registerFormData.role,
          })
        );

        if (registerFormData.role.attendee)
          navigate(`${LINK_ATTENDEE_DASHBOARD}`);
        else if (registerFormData.role.speaker)
          navigate(`${LINK_SPEAKER_DASHBOARD}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*-----------------------------------------utils-------------------------------------------------*/
  const prepareLoginPayload = () => {
    let payload = {
      Email: loginFormData.email,
      Password: loginFormData.password,
      UserType: loginFormData.role.attendee
        ? USER_ROLE.ATTENDEE
        : loginFormData.role.speaker
        ? USER_ROLE.SPEAKER
        : "",
      Website: PHARMA_PROFS.WEBSITE,
    };
    return payload;
  };

  const prepareRegisterPayload = () => {
    let payload = {
      Email: registerFormData.email,
      Password: registerFormData.password,
      ConfirmPassword: registerFormData.password,
      UserType: registerFormData.role.attendee
        ? USER_ROLE.ATTENDEE
        : registerFormData.role.speaker
        ? USER_ROLE.SPEAKER
        : "",
      Website: PHARMA_PROFS.WEBSITE,
    };
    return payload;
  };

  /*------------------------------- Sectional Renders------------------------------------------------*/
  const renderLoginSection = (): ReactNode => {
    return (
      <div className="flex flex-col gap-5">
        <div className="font-bold text-primary-pLabel">
          <h4>{"LOGIN HERE"}</h4>
          <div className="my-1 font-normal text-xs text-primary-pText">
            <p>{"Already have an account ? Login Here"}</p>
          </div>
        </div>

        <div className="w-72">
          <Input
            name={"email"}
            placeholder="Your Email Id"
            label={""}
            value={loginFormData.email}
            handler={handleLoginFormInputChange}
          />
        </div>
        <div className="w-72">
          <InputPasswordCustom
            name="password"
            placeholder="Your Password"
            label={""}
            value={loginFormData.password}
            handler={handleLoginFormInputChange}
          />
        </div>

        <div className="w-64 flex items-center justify-between">
          <div className="w-[50%]">
            <label htmlFor="checkbox-role-attendee" className="role-label">
              {"Attendee"}
              <input
                id="checkbox-role-attendee"
                name="attendee"
                type="checkbox"
                className="user-role-input"
                onChange={handleLoginFormInputChange}
                checked={loginFormData.role.attendee}
                value={USER_ROLE.ATTENDEE}
                disabled={loginFormData.role.speaker}
              />
              <span className="check-mark"></span>
            </label>
          </div>
          <div className="w-[50%]">
            <label htmlFor="checkbox-role-speaker" className="role-label">
              {"Speaker"}
              <input
                id="checkbox-role-speaker"
                name="speaker"
                type="checkbox"
                className="user-role-input"
                onChange={handleLoginFormInputChange}
                checked={loginFormData.role.speaker}
                value={USER_ROLE.SPEAKER}
                disabled={loginFormData.role.attendee}
              />
              <span className="check-mark"></span>
            </label>
          </div>
        </div>

        <div>
          <ButtonCustom
            className={`w-full h-8 px-5 py-2 flex items-center justify-center gap-2 text-secondary-sLabel bg-primary-bg-teal font-[600] text-xs border rounded-full`}
            label={"Login"}
            handleClickWithLoader={onLogin}
          />
        </div>

        <div className="text-xs">
          <p>{"Forgot password?"}</p>
          <button
            className="underline"
            onClick={() => navigate(LINK_PAGE_FORGOT_PASSWORD)}
          >
            {"Click here"}
          </button>
        </div>
      </div>
    );
  };

  const renderRegisterSection = (): ReactNode => {
    return (
      <div className="flex flex-col gap-5">
        <div className="font-bold text-primary-pLabel">
          <h4>{"REGISTER HERE"}</h4>
          <div className="my-1 font-normal text-xs text-primary-pText">
            <p>{"Don't have an account ? Register Here"}</p>
          </div>
        </div>

        <div className="w-72">
          <Input
            label={""}
            name={"name"}
            placeholder="Your name"
            value={registerFormData.name}
            handler={handleRegisterFormInputChange}
          />
        </div>
        <div className="w-72">
          <Input
            label={""}
            placeholder="Your Email Id"
            name={"email"}
            value={registerFormData.email}
            handler={handleRegisterFormInputChange}
          />
        </div>
        <div className="w-72">
          <InputPasswordCustom
            label={""}
            name={"password"}
            placeholder="Your Password"
            value={registerFormData.password}
            handler={handleRegisterFormInputChange}
          />
        </div>
        <div className="w-72 flex items-center justify-between">
          <div className="w-[50%]">
            <label htmlFor="checkbox-role-reg-attendee" className="role-label">
              {"Attendee"}
              <input
                id="checkbox-role-reg-attendee"
                name="attendee"
                type="checkbox"
                className="user-role-input"
                onChange={handleRegisterFormInputChange}
                checked={registerFormData.role.attendee}
                value={USER_ROLE.ATTENDEE}
                disabled={registerFormData.role.speaker}
              />
              <span className="check-mark"></span>
            </label>
          </div>
          <div className="w-[50%]">
            <label htmlFor="checkbox-role-reg-speaker" className="role-label">
              {"Speaker"}
              <input
                id="checkbox-role-reg-speaker"
                name="speaker"
                type="checkbox"
                className="user-role-input"
                onChange={handleRegisterFormInputChange}
                checked={registerFormData.role.speaker}
                value={USER_ROLE.SPEAKER}
                disabled={registerFormData.role.attendee}
              />
              <span className="check-mark"></span>
            </label>
          </div>
        </div>
        <div>
          <ButtonCustom
            className={`w-full h-8 px-5 py-2 flex items-center justify-center gap-2 text-secondary-sLabel bg-primary-bg-teal font-[600] text-xs border rounded-full`}
            label={"Register"}
            handleClickWithLoader={onRegister}
          />
        </div>
      </div>
    );
  };

  /*-------------------------Main Render-----------------------------------*/
  return (
    <div className="pp-login-wrapper">
      <div className="w-full flex items-center justify-center">
        <div className="my-20 px-5 py-10 flex gap-20 border border-primary-light-900 log-reg-box text-primary-pText">
          <div>{renderLoginSection()}</div>

          <div>{renderRegisterSection()}</div>
        </div>
      </div>
    </div>
  );
};

export default PageLoginOrRegister;
