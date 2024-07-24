import React from "react";
import AccordionCustom from "../components/AccordionCustom";
import AuthValidator from "../components/AuthValidator";

interface IUserDashboard {
  userInterfaceData: {
    webinarData: any[];
    accordionTemplateData: any;
    onClickWebinarCardHandler: any;
  };
}

const UserDashboardLayout = (props: IUserDashboard) => {
  const { webinarData, accordionTemplateData, onClickWebinarCardHandler } =
    props.userInterfaceData;

  /*-----------------Sectional Renders-----------------------*/

  const renderWebinarCards = (data: any) => {
    return (
      <div
        className="p-3 flex flex-col gap-2 border-2 text-sm rounded-md cursor-pointer"
        onClick={onClickWebinarCardHandler}
      >
        <div>
          <span className="font-semibold">Topic : </span>
          <span className="">{data?.webinar ?? ""}</span>
        </div>
        <div>
          <span className="font-semibold">Live URL : </span>
          <span className="">{data?.urlLive ?? ""}</span>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1">
            <span className="font-semibold">Duration : </span>
            <span className="">{Number(data?.duration ?? "")} mins</span>
          </div>
          <div className="col-span-1">
            <span className="font-semibold">Date : </span>
            <span className="">
              {new Date(data?.date ?? "")?.toLocaleDateString()}
            </span>
          </div>
          <div className="col-span-1">
            <span className="font-semibold">TimeZone : </span>
            <span className="">{data?.timezone}</span>
          </div>{" "}
        </div>
      </div>
    );
  };

  return (
    <AuthValidator>
      <div className="user-dash-layout">
        <div className="user-dash-content">
          <div className="user-webinar-list flex flex-col gap-2">
            {webinarData?.length ? (
              <React.Fragment>
                {webinarData.map((data) => {
                  return renderWebinarCards(data);
                })}
              </React.Fragment>
            ) : null}
          </div>
        </div>

        <aside className="side-menu-wrapper">
          <section className="py-2">
            <span className="inline-block w-full">
              <AccordionCustom
                accordionData={accordionTemplateData}
                accordionClassName={"flex flex-col gap-5"}
                accordionHeaderClassName={"border-2 p-4 rounded-full"}
                accordionTabClassName={"text-primary-pLabel font-semibold"}
              />
            </span>
          </section>
        </aside>
      </div>
    </AuthValidator>
  );
};

export default UserDashboardLayout;
