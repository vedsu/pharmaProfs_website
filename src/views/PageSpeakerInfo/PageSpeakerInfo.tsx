import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import SpeakerService from "../../services/SpeakerService";
import {
  getInitialLetterUpperCase,
  validateGetRequest,
} from "../../utils/commonUtils";

const PageSpeakerInfo: React.FC = () => {
  const params = useParams();

  const [isLoadingSpeaker, setIsLoadingSpeaker] = useState(true);
  const [speakerData, setSpeakerData] = useState<any>(null);

  /*---------------------------Service Calls------------------------------*/
  const getSpeakerDetails = useCallback(async () => {
    try {
      const response = await SpeakerService.getSpeakerById(
        `speaker/${params?.speakerId}`
      );
      if (validateGetRequest(response)) {
        const speaker = response?.data;
        // speaker info
        if (speaker) {
          setSpeakerData(speaker);
          setIsLoadingSpeaker(false);
        } else {
          setSpeakerData({});
          setIsLoadingSpeaker(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [params?.speakerId]);

  /*------------------------useEffect----------------------------*/
  useEffect(() => {
    const onMount = async () => {
      await getSpeakerDetails();
    };
    onMount();
  }, [getSpeakerDetails]);

  return (
    <div className="page-margin">
      <section className="my-10 p-5 border border-primary-light-900">
        <div className="w-full flex items-center justify-center gap-5">
          {isLoadingSpeaker ? (
            <div className="h-[400px] flex items-center justify-center">
              <span>
                <i className="pi pi-spinner text-primary-bg-teal text-4xl animate-spin" />
              </span>
            </div>
          ) : (
            <>
              {Object.keys(speakerData)?.length ? (
                <React.Fragment>
                  <div className="w-full flex items-start justify-between gap-5">
                    <div className="w-[30%] p-5 flex flex-col gap-5">
                      <div className="w-[150px] h-[150px] flex items-center justify-center  border border-primary-light-900 rounded-lg">
                        <img
                          className="w-full h-full border rounded-lg object-fill text-xs"
                          src={speakerData?.photo}
                          alt={getInitialLetterUpperCase(speakerData?.name)}
                        />
                      </div>

                      <div className="w-full text-sm leading-6">
                        <div className="py-1">
                          {getInitialLetterUpperCase(speakerData?.name)}
                        </div>
                        <div>
                          ( {getInitialLetterUpperCase(speakerData?.industry)} )
                        </div>
                      </div>
                    </div>

                    <div className="w-[70%] py-5 text-sm leading-6">
                      <p>{speakerData?.bio}</p>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <div className="h-screen">
                  <ErrorBoundary />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PageSpeakerInfo;
