import React, { useEffect, useState } from "react";
import { LOCAL_STORAGE_ITEMS, USER_ROLE } from "../../constant";
import UserDashboardLayout from "../../layout/UserDashboard";
import DashboardService from "../../services/DashboardService";
import { validateGetRequest } from "../../utils/commonUtils";

const PageSpeakerDashboard = () => {
  const [speakerDashboardData, setSpeakerDashboardInfo] = useState([]);

  const [
    speakerDashboardHistoryPurchased,
    setSpeakerDashboardHistoryPurchased,
  ] = useState([]);
  const [speakerDashboardHistoryPending, setSpeakerDashboardHistoryPending] =
    useState([]);

  const accordionTemplateData = [
    {
      title: "History",
      description: (
        <React.Fragment>
          {speakerDashboardHistoryPurchased?.length ? (
            <div className="px-2 flex flex-col gap-5">
              <div>
                <div className="my-2 text-left font-semibold text-sm">
                  <div className="px-2">Purchased</div>
                </div>
                <ul className="text-sm font-normal">
                  {speakerDashboardHistoryPurchased?.map(
                    (historyPurchase: any, idx: number) => (
                      <li key={idx + 1} className="my-2 px-2">
                        <span>◈ {historyPurchase}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
              {speakerDashboardHistoryPending?.length ? (
                <div>
                  <div className="my-2 text-left font-semibold text-sm">
                    <div className="px-2">Pending</div>
                  </div>
                  <ul className="text-sm font-normal">
                    {speakerDashboardHistoryPending?.map(
                      (historyPending: any, idx: number) => (
                        <li key={idx + 1} className="my-2 px-2">
                          <span>◈ {historyPending}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ) : null}
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
    const onMount = async () => {
      await getSpeakersDashBoardInfo();
    };
    onMount();
  }, []);

  /*--------------------Service Calls----------------- */
  const getSpeakersDashBoardInfo = async () => {
    const userDataFromLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_ITEMS.USERINFO
    );

    if (userDataFromLocalStorage) {
      const userInfo = JSON.parse(userDataFromLocalStorage);
      const path = "/" + `${userInfo.email}` + "/" + USER_ROLE.SPEAKER;
      try {
        const res = await DashboardService.getUserDashboardInfo(path);

        if (validateGetRequest(res)) {
          setSpeakerDashboardInfo(res?.data?.[0]);
          setSpeakerDashboardHistoryPending(res?.data?.[1]);
          setSpeakerDashboardHistoryPurchased(res?.data?.[2]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  /*----------------------Events Handlers-------------------*/
  const onClickListCard = (e: any) => {
    console.log(e);
  };

  /*-------------------Main Render------------------------*/
  return (
    <UserDashboardLayout
      userInterfaceData={{
        webinarData: speakerDashboardData,
        onClickWebinarCardHandler: onClickListCard,
        accordionTemplateData: accordionTemplateData,
      }}
    />
  );
};

export default PageSpeakerDashboard;
