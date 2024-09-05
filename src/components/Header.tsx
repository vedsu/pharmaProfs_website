import React from "react";
import { Link, useNavigate } from "react-router-dom";
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

const resourcesVideos = [
  {
    title: "Demo 1",
    url: "https://vedsubrandwebsite.s3.amazonaws.com/demo/Human+Factors+Usability+Studies+following+ISO62366%2C+the+FDA+Guidance%2C+and+the+new+FDA+Draft+Guidance.mp4",
  },
  {
    title: "Demo 2",
    url: "https://vedsubrandwebsite.s3.amazonaws.com/demo/How+to+Write+SOPs+(Procedures)+for+Human+Error+Reduction+Prevention.mp4",
  },
  {
    title: "Demo 3",
    url: "https://vedsubrandwebsite.s3.amazonaws.com/demo/Data+Integrity+and+Privacy+Compliance+with+21+CFR+Part+11%2C+SaaSCloud%2C+EU+GDPR.mp4",
  },
];

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
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {
              navigate(LINK_HOME);
            }}
          >
            <img className="w-72" src={brandLogo} alt="logo" />
          </div>

          <div className="flex items-center justify-between">
            <ul className="nav-links inline-flex items-center justify-center gap-4 text-primary-pLabel">
              {isUserLoggedIn ? (
                <li className="nav-link-item">
                  <button onClick={gotoDashboard}>Dashboard</button>
                </li>
              ) : null}
              <li className="nav-link-item">
                <Link to={LINK_HOME}>Home</Link>
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
                              <ul
                                className="mega-menu-links category-list"
                                onClick={() => {
                                  window?.location?.reload();
                                }}
                              >
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=all`}
                                    className="font-thin"
                                  >
                                    {`All`}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=quality assurance`}
                                    className="font-thin"
                                  >
                                    {`Quality Assurance`}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=quality control`}
                                    className="font-thin"
                                  >
                                    {`Quality Control`}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=regulatory affairs`}
                                    className="font-thin"
                                  >
                                    {`Regulatory Affairs`}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=regulatory compliance`}
                                    className="font-thin"
                                  >
                                    {`Regulatory Compliance`}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=medical device`}
                                    className="font-thin"
                                  >
                                    {`Medical Devices`}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=research and development`}
                                    className="font-thin"
                                  >
                                    {`Research and Development (R&D)`}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=manufacturing compliance`}
                                    className="font-thin"
                                  >
                                    {`Manufacturing (GxP) Compliance`}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=pharmaceutical automation`}
                                    className="font-thin"
                                  >
                                    {`Pharmaceutical Automation (AI)`}
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?category=supply chain and warehousing`}
                                    className="font-thin"
                                  >
                                    {`Supply chain and Warehousing`}
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                              <div className="font-bold">Courses</div>
                              <ul
                                className="mega-menu-links courses-list"
                                onClick={() => {
                                  window?.location?.reload();
                                }}
                              >
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?courses=all`}
                                    className="font-thin"
                                  >
                                    All
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?courses=live`}
                                    className="font-thin"
                                  >
                                    Live
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to={`${LINK_PAGE_WEBINAR_LISTING}?courses=recording`}
                                    className="font-thin"
                                  >
                                    Recording
                                  </Link>
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
                            Pharma Profs aspires to be an indispensable resource
                            worldwide. With a commitment to excellence, our
                            company offers a platform for pharmaceutical
                            professionals to enhance their expertise, advance
                            their careers, and contribute meaningfully to
                            patient care.
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
                            Unlock World-Class Resources with Pharma Profs
                          </h4>
                          <p className="text-sm font-normal">
                            We at Pharma Profs provide comprehensive solutions
                            for the pharmaceutical industry domain and its
                            sub-domains. Our services offer online FDA
                            compliance training, GMP, QA,QC pharmaceutical
                            regulatory, medical device, and R&D training
                            encompassing various educational and support
                            offerings.
                          </p>
                        </div>
                        <div className="mega-menu-block stretched">
                          <div className="w-layout-grid mega-menu-grid _3-cols">
                            <div className="flex flex-col gap-3">
                              <div className="font-bold">Demo Videos</div>
                              <ul className="mega-menu-links resource-nav-links">
                                {resourcesVideos?.map((resource, idx) => {
                                  return (
                                    <li key={idx + 1}>
                                      <a
                                        className="font-thin"
                                        href={resource.url}
                                        target="_blank"
                                      >
                                        {resource.title}
                                      </a>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                              <div className="font-bold">
                                Publications (*coming soon)
                              </div>
                              <ul className="mega-menu-links resource-nav-links">
                                <li>
                                  <a className="font-thin" href={"#"}>
                                    Newsletter
                                  </a>
                                </li>
                                <li>
                                  <a className="font-thin" href={"#"}>
                                    E-book
                                  </a>
                                </li>
                              </ul>
                            </div>

                            <div className="flex flex-col gap-3">
                              <div className="font-bold">
                                Get Inspired (*coming soon)
                              </div>
                              <ul className="mega-menu-links resource-nav-links">
                                <li>
                                  <a className="font-thin" href={"#"}>
                                    Blog
                                  </a>
                                </li>
                                <li>
                                  <a className="font-thin" href={"#"}>
                                    Press
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
                >
                  <i className="mx-2 text-xs pi pi-sign-out"></i>
                </ButtonCustom>
              </div>
            ) : (
              <div>
                <Link
                  to={LINK_PAGE_LOGIN_REG}
                  className="nav-login-reg bg-primary-bg-obsidianBlack rounded-full"
                >
                  <span>Login / Register</span>
                  <i className="mx-2 text-xs pi pi-sign-in"></i>
                </Link>
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
