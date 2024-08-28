import React, { useEffect, useState } from "react";
import AccordionCustom from "../components/AccordionCustom";
import AuthValidator from "../components/AuthValidator";
import CardTemplates from "../components/CardTemplates";
import { CARD_SUGGESTIONS, LOCAL_STORAGE_ITEMS } from "../constant";
import ButtonCustom from "../components/ButtonCustom";

interface IUserDashboard {
  userInterfaceData: {
    webinarData: any[];
    accordionTemplateData: any;
    onClickWebinarCardHandler: any;
  };
}

const userInstructions = [
  "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, necessitatibus? Et labore hic debitis deserunt quo? Beatae, amet dolores ratione, perferendis illo voluptate molestiae, iure fugiat quam exercitationem similique magni.",
  "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, necessitatibus? Et labore hic debitis deserunt quo? Beatae, amet dolores ratione, perferendis illo voluptate molestiae, iure fugiat quam exercitationem similique magni.",
  "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, necessitatibus? Et labore hic debitis deserunt quo? Beatae, amet dolores ratione, perferendis illo voluptate molestiae, iure fugiat quam exercitationem similique magni.",
  "   Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, necessitatibus? Et labore hic debitis deserunt quo? Beatae, amet dolores ratione, perferendis illo voluptate molestiae, iure fugiat quam exercitationem similique magni.",
];

const UserDashboardLayout = (props: IUserDashboard) => {
  const { webinarData, accordionTemplateData, onClickWebinarCardHandler } =
    props.userInterfaceData;

  const [showCardContinuePurchase, setShowCardContinuePurchase] =
    useState(false);
  const [continuePurchaseCardData, setContinuePurchaseCardData] =
    useState<any>(null);

  useEffect(() => {
    const onMount = async () => {
      const userInfo = localStorage.getItem(LOCAL_STORAGE_ITEMS.USERINFO);
      const cardContinuePurchaseInfo = localStorage.getItem(
        LOCAL_STORAGE_ITEMS.CARD_CONTINUE_PURCHASE
      );

      if (userInfo && cardContinuePurchaseInfo) {
        const parsedUserInfo = JSON.parse(userInfo);
        const parsedCardContinuePurchaseInfo = JSON.parse(
          cardContinuePurchaseInfo
        );
        if (
          parsedUserInfo?.role?.attendee &&
          parsedCardContinuePurchaseInfo.display
        ) {
          setShowCardContinuePurchase(true);
          setContinuePurchaseCardData({
            webinarTitle: parsedCardContinuePurchaseInfo.topic,
            webinarUrl: parsedCardContinuePurchaseInfo.webinar_url,
          });
        }
      }
    };
    onMount();
  }, []);

  /*-----------------Sectional Renders-----------------------*/
  const renderWebinarCards = (data: any) => {
    return (
      <div
        className="p-3 flex flex-col gap-2 border-2 text-sm rounded-md cursor-pointer"
        onClick={onClickWebinarCardHandler}
      >
        <div>
          <span className="font-semibold">Topic : </span>
          <span className="font-medium">{data?.webinar ?? ""}</span>
        </div>

        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <span className="font-semibold">Duration : </span>
            <span className="">{Number(data?.duration ?? "")} mins</span>
          </div>
          <div className="col-span-1">
            <span className="font-semibold">Date : </span>
            <span className="">{data?.date}</span>
          </div>
          <div className="col-span-1">
            <span className="font-semibold">Time : </span>
            <span className="">{data?.time}</span>
          </div>
          <div className="col-span-1">
            <span className="font-semibold">TimeZone : </span>
            <span className="">{data?.timeZone}</span>
          </div>
        </div>

        {data?.live_url ? (
          <div>
            <span className="font-semibold">Live URL : </span>
            <a className="text-blue-500" href={data?.live_url}>
              {data?.live_url ?? ""}
            </a>
          </div>
        ) : null}

        {data?.recording_url ? (
          <div>
            <span className="font-semibold">Recording URL : </span>
            <a className="text-blue-500" href={data?.recording_url}>
              {data?.recording_url ?? ""}
            </a>
          </div>
        ) : null}
        {data?.digitaldownload_url ? (
          <div>
            <span className="font-semibold">DD URL : </span>
            <a className="text-blue-500" href={data?.digitaldownload_url}>
              {data?.digitaldownload_url ?? ""}
            </a>
          </div>
        ) : null}
        {data?.transcript_url ? (
          <div>
            <span className="font-semibold">Transcript URL : </span>
            <a className="text-blue-500" href={data?.transcript_url}>
              {data?.transcript_url ?? ""}
            </a>
          </div>
        ) : null}

        <div>
          <ButtonCustom
            className="py-1 px-2 max-w-fit font-semibold text-sm bg-primary-bg-lightCyan rounded-full"
            handleClick={() => {
              window.location.href = data?.document;
            }}
            label={"Download Receipt"}
          >
            <i className="mx-1 pi pi-download text-sm"></i>
          </ButtonCustom>
        </div>
      </div>
    );
  };

  return (
    <AuthValidator>
      <div className="user-dash-layout">
        <div className="user-dash-webinars">
          {showCardContinuePurchase ? (
            <div className="relative border-4 border-primary-light-900 bg-transparent rounded-lg">
              <CardTemplates
                variant={CARD_SUGGESTIONS.CONTINUE_PURCHASE}
                cardData={continuePurchaseCardData}
                callBack={() => {
                  setShowCardContinuePurchase(false);
                }}
              />
            </div>
          ) : null}

          {webinarData?.length ? (
            <div className="user-webinar-list flex flex-col gap-2">
              <React.Fragment>
                <div className="w-full">
                  <h4 className="font-bold text-xl">INSTRUCTIONS :</h4>
                  <ul className="list-disc">
                    {userInstructions?.map((instruction, idx) => (
                      <li key={idx} className="my-2 font-bold text-sm">
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>

                {webinarData.map((data) => {
                  return renderWebinarCards(data);
                })}
              </React.Fragment>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center relative">
              <h4 className="font-bold text-xl">No webinars to show.</h4>
            </div>
          )}
        </div>

        <aside className="side-menu-wrapper">
          <section className="py-2">
            <span className="inline-block w-full">
              <AccordionCustom
                accordionData={accordionTemplateData}
                accordionClassName={"flex flex-col gap-5"}
                accordionHeaderClassName={"border-2 p-4 rounded-full"}
                accordionTabClassName={"text-primary-pLabel font-semibold"}
                activeIndex={1}
              />
            </span>
          </section>
        </aside>
      </div>
    </AuthValidator>
  );
};

export default UserDashboardLayout;
