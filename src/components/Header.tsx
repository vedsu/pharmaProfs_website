import React from "react";
import { useNavigate } from "react-router-dom";
import brandLogo from "../assets/images/pp_brand_logo.png";
import { ENV_VAR, LOCAL_STORAGE_ITEMS } from "../constant";
import {
  LINK_ATTENDEE_DASHBOARD,
  LINK_HOME,
  LINK_PAGE_ABOUT_US,
  LINK_PAGE_FAQ,
  LINK_PAGE_LOGIN_REG,
  LINK_PAGE_SPEAKERS,
  LINK_PAGE_WEBINAR_LISTING,
  LINK_SPEAKER_DASHBOARD,
} from "../routes";
import { getEnvVariableValues } from "../utils/commonUtils";
import ButtonCustom from "./ButtonCustom";

const orderFormURL = getEnvVariableValues(ENV_VAR.VITE_ORDER_FORM_URL);

const Header: React.FC = () => {
  const navigate = useNavigate();

  const isUserLoggedIn = localStorage.getItem(LOCAL_STORAGE_ITEMS.USERINFO);

  const onLogout = async () => {
    await new Promise((res) => {
      setTimeout(() => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = LINK_HOME;
      }, 1000);

      res("Logged Out");
    });
  };

  const gotoDashboard = () => {
    let storedUserInfo = localStorage.getItem(LOCAL_STORAGE_ITEMS.USERINFO);
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      if (userInfo?.role?.attendee) navigate(`${LINK_ATTENDEE_DASHBOARD}`);
      else if (userInfo?.role.speaker) navigate(`${LINK_SPEAKER_DASHBOARD}`);
    }
  };

  return (
    <header className="navbar-wrapper font-bold text-sm">
      <nav>
        <div className="flex items-center justify-between">
          <div className="w-72 flex items-center justify-center">
            <img className="" src={brandLogo} alt="logo" />
          </div>

          <div className="flex items-center justify-between">
            <ul className="nav-links inline-flex items-center justify-center gap-4 text-primary-pLabel">
              {isUserLoggedIn ? (
                <li className="nav-link-item">
                  <button onClick={gotoDashboard}>Dashboard</button>
                </li>
              ) : null}
              <li className="nav-link-item">
                <a href={LINK_HOME}>Home</a>
              </li>
              <li className="nav-link-item">
                <div
                  className="nav-mega-menu-wrapper relative"
                  data-hover="false"
                  data-delay="0"
                >
                  <div className="mega-menu-dropdown">
                    <a>Webinar</a>
                    <div className="sub-menu-arrow"></div>
                  </div>
                  <div className="mega-box">
                    <div className="mega-box-content-wrapper">
                      <div className="content">
                        <div className="mega-menu-intro-block">
                          <h4 className="text-2xl">
                            For Individuals & For Organizations
                          </h4>
                          <p className="text-sm font-normal">
                            Keeping things straightforward so that individuals
                            and organizations delve into the latest regulatory
                            expectations, operational trends, and technologies
                            that win the pharmaceutical industry.
                          </p>
                        </div>
                        <div className="mega-menu-block stretched">
                          <div className="w-layout-grid mega-menu-grid _2-cols">
                            <div className="flex flex-col gap-3">
                              <div className="font-bold">Category</div>
                              <ul className="mega-menu-links category-list">
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=all`}
                                    className="font-thin"
                                  >
                                    {`All`}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=quality assurance`}
                                    className="font-thin"
                                  >
                                    {`Quality Assurance`}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=quality control`}
                                    className="font-thin"
                                  >
                                    {`Quality Control`}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=regulatory affairs`}
                                    className="font-thin"
                                  >
                                    {`Regulatory Affairs`}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=regulatory compliance`}
                                    className="font-thin"
                                  >
                                    {`Regulatory Compliance`}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=medical device`}
                                    className="font-thin"
                                  >
                                    {`Medical Devices`}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=research and development`}
                                    className="font-thin"
                                  >
                                    {`Research and Development (R&D)`}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=manufacturing compliance`}
                                    className="font-thin"
                                  >
                                    {`Manufacturing (GxP) Compliance`}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=pharmaceutical automation`}
                                    className="font-thin"
                                  >
                                    {`Pharmaceutical Automation (AI)`}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?category=supply chain and warehousing`}
                                    className="font-thin"
                                  >
                                    {`Supply chain and Warehousing`}
                                  </a>
                                </li>
                              </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                              <div className="font-bold">Courses</div>
                              <ul className="mega-menu-links courses-list">
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?courses=all`}
                                    className="font-thin"
                                  >
                                    All
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?courses=live`}
                                    className="font-thin"
                                  >
                                    Live
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={`${LINK_PAGE_WEBINAR_LISTING}?courses=recording`}
                                    className="font-thin"
                                  >
                                    Recording
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-link-item">
                <div
                  className="nav-mega-menu-wrapper relative"
                  data-hover="false"
                  data-delay="0"
                >
                  <div className="mega-menu-dropdown">
                    <a>Company</a>
                    <div className="sub-menu-arrow"></div>
                  </div>
                  <div className="mega-box">
                    <div className="mega-box-content-wrapper">
                      <div className="content">
                        <div className="mega-menu-intro-block">
                          <h4 className="text-2xl">
                            Learn more about PharmaProfs to get in touch
                          </h4>
                          <p className="text-sm font-normal">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Dignissimos totam quisquam commodi deleniti
                            deserunt eveniet. Dolorem quia vitae, consequatur,
                            mollitia recusandae molestiae iusto autem esse eos
                            sint modi fugiat laborum.
                          </p>
                        </div>
                        <div className="mega-menu-block stretched">
                          <div className="w-layout-grid mega-menu-grid _2-cols">
                            <div />
                            <ul className="mega-menu-links nav-company-list">
                              <li>
                                <a href={LINK_PAGE_ABOUT_US}>About Us</a>
                              </li>
                              <li>
                                <a href={LINK_PAGE_FAQ}>FAQ's</a>
                              </li>
                              <li>
                                <a href={LINK_PAGE_SPEAKERS}>Teams</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-link-item">
                <div
                  className="nav-mega-menu-wrapper relative"
                  data-hover="false"
                  data-delay="0"
                >
                  <div className="mega-menu-dropdown">
                    <a>Resources</a>
                    <div className="sub-menu-arrow"></div>
                  </div>
                  <div className="mega-box">
                    <div className="mega-box-content-wrapper">
                      <div className="content">
                        <div className="mega-menu-intro-block">
                          <h4 className="text-2xl">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit
                          </h4>
                          <p className="text-sm font-normal">
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Dignissimos totam quisquam commodi deleniti
                            mollitia recusandae molestiae iusto autem esse eos
                            sint modi fugiat laborum.
                          </p>
                        </div>
                        <div className="mega-menu-block stretched">
                          <div className="w-layout-grid mega-menu-grid _2-cols">
                            <div />
                            <ul className="mega-menu-links nav-company-list">
                              <li>
                                <a href={LINK_PAGE_ABOUT_US}>Resource 1</a>
                              </li>
                              <li>
                                <a href={LINK_PAGE_FAQ}>Resource 2</a>
                              </li>
                              <li>
                                <a href={"#"}>Resource 3</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li className="nav-link-item">
                <a
                  href={orderFormURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Form
                </a>
              </li>
            </ul>

            {isUserLoggedIn ? (
              <div>
                <ButtonCustom
                  className="nav-logout bg-primary-bg-obsidianBlack rounded-full"
                  label={"Logout"}
                  handleClickWithLoader={onLogout}
                />
              </div>
            ) : (
              <div className="nav-login-reg bg-primary-bg-obsidianBlack rounded-full">
                <a href={LINK_PAGE_LOGIN_REG}>Login / Register</a>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="mobile-menu">
        <div className="mobile-menu-wrapper"></div>
      </div>
    </header>
  );
};

export default Header;
