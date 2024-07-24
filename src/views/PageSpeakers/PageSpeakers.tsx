import React, { ReactNode, useEffect, useState } from "react";
import SpeakerService from "../../services/SpeakerService";
import {
  getInitialLetterUpperCase,
  validateGetRequest,
} from "../../utils/commonUtils";

const PageSpeakers: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    const init = async () => {
      await getAllSpeakers();
    };
    init();
  }, []);

  /*---------------------------Service Calls------------------------------*/

  const getAllSpeakers = async () => {
    try {
      const res = await SpeakerService.getSpeakers();
      if (validateGetRequest(res)) {
        const speakersList = res?.data?.[1];
        setSpeakers(speakersList);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  /*------------------------------Sectional Render---------------------------*/

  const speakerGalleryCard = (speakerInfo: any): ReactNode => {
    return (
      <div className="col-span-1 border border-primary-light-900 rounded-lg p-2 flex flex-col items-center justify-center gap-2 cursor-pointer hover:opacity-70">
        <div className="flex items-center justify-center text-xs">
          <img
            className="w-[320px] h-[220px] object-fill rounded-lg"
            src={speakerInfo?.photo}
            alt="speaker's image"
          />
        </div>
        <div className="w-[320px] font-semibold text-sm text-ellipsis overflow-hidden">
          <span className="py-2">{`Name :`}</span>
          <span
            className="px-1 py-2 font-medium"
            title={getInitialLetterUpperCase(speakerInfo?.name) ?? "N.A."}
          >
            {getInitialLetterUpperCase(speakerInfo?.name) ?? "N.A."}
          </span>
        </div>
        <div className="w-[320px] font-semibold text-sm text-ellipsis overflow-hidden">
          <span className="py-2">{`Industry :`}</span>
          <span
            className="px-1 py-2 font-medium"
            title={getInitialLetterUpperCase(speakerInfo?.industry) ?? "N.A."}
          >
            {getInitialLetterUpperCase(speakerInfo?.industry) ?? "N.A."}
          </span>
        </div>
      </div>
    );
  };

  /*-------------------------Main Render-----------------------------------*/

  return (
    <div className="m-10">
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <i className="pi pi-spinner text-4xl animate-spin text-primary-bg-teal"></i>
        </div>
      ) : (
        <React.Fragment>
          {speakers?.length ? (
            <div className="grid grid-cols-4 gap-8">
              {speakers?.map((speaker) => speakerGalleryCard(speaker))}
            </div>
          ) : (
            <div className="h-screen text-xs text-center">
              {"No speakers found"}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default PageSpeakers;
