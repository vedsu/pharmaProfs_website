import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_ITEMS, PHARMA_PROFS, USER_ROLE } from "../../constant";
import UserDashboardLayout from "../../layout/UserDashboard";
import { LINK_PAGE_WEBINAR_LISTING } from "../../routes";
import DashboardService from "../../services/DashboardService";
import WebinarService from "../../services/WebinarService";
import {
  getInitialLetterUpperCase,
  validateGetRequest,
} from "../../utils/commonUtils";

const PageAttendeeDashboard = () => {
  const navigate = useNavigate();

  const [attendeeDashboardData, setAttendeeDashboardInfo] = useState([]);
  const [attendeeDashboardHistory, setAttendeeDashboardHistory] = useState([]);
  const [
    attendeeDashboardRecommendations,
    setAttendeeDashboardRecommendations,
  ] = useState([]);

  const accordionTemplateData = [
    {
      title: "History",
      description: (
        <React.Fragment>
          {attendeeDashboardHistory?.length ? (
            <div>
              <div className="mb-2 text-left font-semibold text-sm">
                <div>Purchased</div>
              </div>
              <ul className="text-sm font-normal">
                {attendeeDashboardHistory?.map((history: any) => (
                  <li className="my-2 px-2">{history}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-sm font-normal">
              <p className="my-2 px-2 text-center">Nothing to show here.</p>
            </div>
          )}
        </React.Fragment>
      ),
    },
    {
      title: "Recommendations",
      description: (
        <React.Fragment>
          {attendeeDashboardRecommendations?.length ? (
            <div className="mb-2 text-sm font-normal cursor-pointer">
              {attendeeDashboardRecommendations?.map((recommendation: any) => (
                <div
                  key={recommendation?.webinarUrl}
                  className="my-2 p-2 border-2 border-primary-light-900 rounded-lg flex flex-col gap-1 text-sm"
                  onClick={() =>
                    onClickRecommendation(recommendation?.webinarUrl)
                  }
                >
                  <div>
                    <span className="font-bold">{recommendation?.topic}</span>
                  </div>
                  <div>
                    <span className="font-bold">{"Industry : "}</span>
                    <span>
                      {getInitialLetterUpperCase(recommendation?.industry)}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">
                      {"Duration : "} {`${recommendation?.duration}`}
                    </span>
                    <span className="mx-1">minutes</span>
                  </div>
                  <div>
                    <span className="font-bold">{"Date : "}</span>
                    <span>
                      {new Date(recommendation?.date)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm font-normal">
              <p className="my-2 px-2 text-center">Nothing to show here.</p>
            </div>
          )}
        </React.Fragment>
      ),
    },
  ];

  useEffect(() => {
    const init = async () => {
      await getAttendeeDashBoardInfo();
      await getAllWebinars();
    };
    init();
  }, []);

  /*--------------------Service Calls----------------- */
  const getAttendeeDashBoardInfo = async () => {
    const userDataFromLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_ITEMS.USERINFO
    );

    if (userDataFromLocalStorage) {
      const userInfo = JSON.parse(userDataFromLocalStorage);
      const path = "/" + `${userInfo.email}` + "/" + USER_ROLE.ATTENDEE;
      try {
        const res = await DashboardService.getUserDashboardInfo(path);
        if (validateGetRequest(res)) {
          setAttendeeDashboardInfo(res?.data?.[0]);
          setAttendeeDashboardHistory(res?.data?.[1]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getAllWebinars = async () => {
    try {
      const res = await WebinarService.getWebinars();
      if (validateGetRequest(res)) {
        const currDate = new Date();
        const upcomingWebinarsPharma = res?.data?.[0]?.filter(
          (webinar: any) =>
            webinar?.website === PHARMA_PROFS.WEBSITE &&
            new Date(webinar?.date) < currDate
        );

        const recommendations = upcomingWebinarsPharma.map((webinar: any) => {
          return {
            topic: webinar?.topic,
            duration: webinar?.duration,
            industry: webinar?.industry,
            date: webinar?.date,
            webinarUrl: webinar?.webinar_url,
          };
        });
        setAttendeeDashboardRecommendations(recommendations);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*----------------------Events Handlers-------------------*/
  const onClickListCard = (e: any) => {
    console.log(e);
  };

  const onClickRecommendation = (webinarUrl: string) => {
    navigate(LINK_PAGE_WEBINAR_LISTING + "/" + webinarUrl);
  };

  /*-------------------Main Render------------------------*/

  return (
    <UserDashboardLayout
      userInterfaceData={{
        webinarData: attendeeDashboardData,
        onClickWebinarCardHandler: onClickListCard,
        accordionTemplateData: accordionTemplateData,
      }}
    />
  );
};

export default PageAttendeeDashboard;
