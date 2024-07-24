import { RouteObject } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import PPWebsite from "./layout/PPWebsite";
import { PageLoginOrRegister } from "./views/auth/PageLoginOrRegister";
import PageAboutUs from "./views/PageAboutUs";
import PageAttendeeDashboard from "./views/PageAttendeeDashboard";
import PageCart from "./views/PageCart";
import PageCheckout from "./views/PageCheckout";
import PageConfirmPayment from "./views/PageConfirmPayment";
import PageContactUs from "./views/PageContactUs";
import PageFAQ from "./views/PageFAQ";
import PageForgotPassword from "./views/PageForgotPassword";
import PageHome from "./views/PageHome";
import PagePrivacyPolicy from "./views/PagePrivacyPolicy";
import PageRefundCancellation from "./views/PageRefundCancellation/";
import { PageResources } from "./views/PageResources";
import PageSpeakerDashboard from "./views/PageSpeakerDashboard";
import PageSpeakers from "./views/PageSpeakers/";
import PageTermsAndConditions from "./views/PageTermsAndConditions";
import PageUnauthorized from "./views/PageUnauthorized";
import PageWebinarInfo from "./views/PageWebinarInfo";
import PageWebinarList from "./views/PageWebinarList";

export const LINK_HOME = "/";
export const LINK_PAGE_WEBINAR_LISTING = "/webinars";
export const LINK_PAGE_RESOURCES = "/resources";
export const LINK_PAGE_LOGIN_REG = "/login-reg";
export const LINK_PAGE_SPEAKERS = "/speakers";
export const LINK_PAGE_ABOUT_US = "/about-us";
export const LINK_PAGE_FAQ = "/faq";
export const LINK_PAGE_CONTACT_US = "/contact-us";
export const LINK_PAGE_PRIVACY_POLICY = "/privacy-policy";
export const LINK_PAGE_TERMS_AND_CONDITIONS = "/terms-and-conditions";
export const LINK_PAGE_REFUND_AND_CANCELLATION = "/refund-cancellation";
export const LINK_PAGE_FORGOT_PASSWORD = "/forgot-password";

/*-----------------------Payment-------------------------------------*/
export const LINK_PAGE_CART = "/cart";
export const LINK_PAGE_CHECKOUT = "/stripe-checkout";
export const LINK_PAGE_CONFIRM_PAYMENT = "/confirm-payment";

/*--------------------User Dashboard------------------- */
export const LINK_BASE_DASHBOARD = "/dashboard";
export const LINK_ATTENDEE_DASHBOARD = LINK_BASE_DASHBOARD + "/attendee";
export const LINK_SPEAKER_DASHBOARD = LINK_BASE_DASHBOARD + "/speaker";

/*---------------------Unauthorized Page-------------------------*/
export const LINK_UNAUTHORIZED_DASHBOARD =
  LINK_BASE_DASHBOARD + "/unauthorized";

const ppWebsiteChildrenRoutes = [
  {
    path: LINK_HOME,
    element: <PageHome />,
  },
  {
    path: LINK_PAGE_WEBINAR_LISTING,
    element: <PageWebinarList />,
  },
  {
    path: `${LINK_PAGE_WEBINAR_LISTING}/:webinar`,
    element: <PageWebinarInfo />,
  },
  {
    path: LINK_PAGE_SPEAKERS,
    element: <PageSpeakers />,
  },
  {
    path: LINK_PAGE_RESOURCES,
    element: <PageResources />,
  },
  {
    path: LINK_PAGE_LOGIN_REG,
    element: <PageLoginOrRegister />,
  },
  {
    path: LINK_PAGE_ABOUT_US,
    element: <PageAboutUs />,
  },
  {
    path: LINK_PAGE_FAQ,
    element: <PageFAQ />,
  },
  {
    path: LINK_PAGE_CONTACT_US,
    element: <PageContactUs />,
  },
  {
    path: LINK_PAGE_PRIVACY_POLICY,
    element: <PagePrivacyPolicy />,
  },
  {
    path: LINK_PAGE_TERMS_AND_CONDITIONS,
    element: <PageTermsAndConditions />,
  },
  {
    path: LINK_PAGE_REFUND_AND_CANCELLATION,
    element: <PageRefundCancellation />,
  },
  {
    path: LINK_SPEAKER_DASHBOARD,
    element: <PageSpeakerDashboard />,
  },
  {
    path: LINK_ATTENDEE_DASHBOARD,
    element: <PageAttendeeDashboard />,
  },
  {
    path: LINK_PAGE_CART,
    element: <PageCart />,
  },
  {
    path: LINK_PAGE_CHECKOUT,
    element: <PageCheckout />,
  },
  {
    path: LINK_PAGE_CONFIRM_PAYMENT,
    element: <PageConfirmPayment />,
  },
  {
    path: LINK_UNAUTHORIZED_DASHBOARD,
    element: <PageUnauthorized />,
  },
  {
    path: LINK_PAGE_FORGOT_PASSWORD,
    element: <PageForgotPassword />,
  },
];

const ppWebsiteRoutes: RouteObject[] = [
  {
    path: LINK_HOME,
    element: <PPWebsite />,
    children: ppWebsiteChildrenRoutes,
    errorElement: <ErrorBoundary />,
  },
];

export default ppWebsiteRoutes;
