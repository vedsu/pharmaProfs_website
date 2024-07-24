import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonCustom from "../../components/ButtonCustom";
import {
  LOCAL_STORAGE_ITEMS,
  PHARMA_PROFS,
  SESSION_STORAGE_ITEMS,
} from "../../constant";
import { LINK_PAGE_CART, LINK_PAGE_LOGIN_REG } from "../../routes";
import WebinarService from "../../services/WebinarService";
import {
  getInitialLetterUpperCase,
  validateGetRequest,
} from "../../utils/commonUtils";

const initialPurchaseData = {
  sessionLive: false,
  sessionRecording: false,
  sessionDD: false,
  sessionTranscript: false,
};

const PageWebinarInfo: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoadingWebinar, setIsLoadingWebinar] = useState(true);
  const [webinarData, setWebinarData] = useState<any>(null);
  const [speakerData, setSpeakerData] = useState<any>(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [purchaseData, setPurchaseData] = useState(initialPurchaseData);

  /*---------------------------Service Calls------------------------------*/
  const getWebinarDetails = useCallback(async () => {
    try {
      const res1 = await WebinarService.getWebinarById(
        params?.webinar + "/" + PHARMA_PROFS.WEBSITE
      );
      if (validateGetRequest(res1)) {
        const webinar = res1?.data;
        // webinar info
        if (webinar) {
          setWebinarData(webinar);
          setIsLoadingWebinar(false);
        } else {
          setWebinarData({});
          setIsLoadingWebinar(false);
        }
        const res2 = await WebinarService.getWebinars();
        if (validateGetRequest(res2)) {
          const webinarSpeaker = res2?.data?.[1]?.find((speaker: any) => {
            return (
              speaker?.industry === PHARMA_PROFS.PHARMACEUTICAL &&
              speaker?.name === webinar?.speaker
            );
          });
          //speaker info
          if (webinarSpeaker) {
            setSpeakerData(webinarSpeaker);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [params?.webinar]);

  /*------------------------useEffect----------------------------*/
  useEffect(() => {
    const init = async () => {
      await getWebinarDetails();
    };
    init();
  }, [getWebinarDetails]);

  /*--------------------------Event Handlers-----------------*/
  const handlePurchaseInput = () => {
    let amt = 0;
    const isLiveChecked = (
      document.getElementById("checkbox-buy-live") as HTMLInputElement
    )?.checked;
    const isRecordingChecked = (
      document.getElementById("checkbox-buy-recording") as HTMLInputElement
    )?.checked;
    const isDDChecked = (
      document.getElementById("checkbox-buy-dd") as HTMLInputElement
    )?.checked;
    const isTranscriptChecked = (
      document.getElementById("checkbox-buy-trans") as HTMLInputElement
    )?.checked;

    const livePrice = Number(webinarData?.priceLive ?? "0");
    const recordingPrice = Number(webinarData?.priceRecording ?? "0");
    const ddPrice = Number(webinarData?.priceDigitalDownload ?? "0");
    const transcriptPrice = Number(webinarData?.priceTranscript ?? "0");

    if (isLiveChecked) amt += livePrice;
    if (isRecordingChecked) amt += recordingPrice;
    if (isDDChecked) amt += ddPrice;
    if (isTranscriptChecked) amt += transcriptPrice;

    setCartTotal(amt);
    setPurchaseData({
      sessionLive: Number(livePrice) ? true : false,
      sessionRecording: Number(recordingPrice) ? true : false,
      sessionDD: Number(ddPrice) ? true : false,
      sessionTranscript: Number(transcriptPrice) ? true : false,
    });
  };

  const onBuyNow = async () => {
    const isUserLoggedIn = localStorage.getItem(LOCAL_STORAGE_ITEMS.USERINFO);

    if (isUserLoggedIn && cartTotal > 0) {
      navigate(LINK_PAGE_CART);
      localStorage.setItem(
        LOCAL_STORAGE_ITEMS.PURCHASE_INFO,
        JSON.stringify({
          ...purchaseData,
          webinarUrl: params?.webinar,
          cartTotal: cartTotal,
        })
      );
    } else if (isUserLoggedIn && cartTotal === 0) {
      //
    } else {
      sessionStorage.setItem(
        SESSION_STORAGE_ITEMS.REG_BANNER,
        JSON.stringify({
          display: true,
        })
      );
      navigate(LINK_PAGE_LOGIN_REG, {
        state: {
          showRegCheckOutBanner: true,
        },
      });
    }
  };

  /*---------------------Sectional Renders------------------*/

  const renderWebinarInfo = (): ReactNode => {
    return (
      <div className="py-4 flex flex-col gap-2">
        <div className="text-left font-semibold">
          <div>{webinarData?.topic ?? "N.A."}</div>
        </div>
        <div className="text-left">
          <span className="font-semibold">{"Category : "}</span>
          <span>
            {getInitialLetterUpperCase(webinarData?.category) ?? "N.A."}
          </span>
        </div>
        <div className="text-left">
          <span className="font-semibold">{"Duration : "}</span>
          <span>
            {`${
              getInitialLetterUpperCase(webinarData?.duration) ?? "N.A."
            } minutes`}
          </span>
        </div>
        <div className="text-left">
          <span className="font-semibold">{"Industry : "}</span>
          <span>
            {`${getInitialLetterUpperCase(webinarData?.industry) ?? "N.A."}`}
          </span>
        </div>
        <div className="text-left">
          <span className="font-semibold">{"Date : "}</span>
          <span>
            {new Date(webinarData?.date).toLocaleDateString() ?? "N.A."}
          </span>
        </div>
        <div className="text-left">
          <span className="font-semibold">{"Time : "}</span>
          <span>
            {`${getInitialLetterUpperCase(webinarData?.time) ?? "N.A."}`}
          </span>
        </div>
        <div className="text-left">
          <span className="font-semibold">{"TimeZone : "}</span>
          <span>{webinarData?.timeZone ?? "N.A."}</span>
        </div>
      </div>
    );
  };

  const renderSpeakerInfo = (): ReactNode => {
    return (
      <div className="">
        <h4>{"Speaker"}</h4>
        <div className="my-2 flex gap-5">
          <div className="flex items-center justify-center text-xs">
            <img
              className="w-24 h-24 rounded-[50%]"
              src={speakerData?.photo}
              alt="speaker-image"
            />
          </div>
          <div>
            <div className="my-2 font-semibold text-xs">
              {getInitialLetterUpperCase(speakerData?.name) ?? "N.A."}
            </div>
            <div className="text-xs">
              <span className="mr-1 font-semibold">{`Industry :`}</span>
              {getInitialLetterUpperCase(speakerData?.industry) ?? "N.A."}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPurchaseDescription = (): ReactNode => {
    return (
      <div className="webinar-reg-table">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-6">{"Session"}</th>
              <th>{"Price ($)"}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label
                  htmlFor="checkbox-buy-live"
                  className="webinar-purchase-label"
                >
                  {"Live"}
                  <input
                    id="checkbox-buy-live"
                    type="checkbox"
                    className="buy-webinar-input"
                    onChange={handlePurchaseInput}
                    value={webinarData?.priceLive}
                  />
                  <span className="check-mark"></span>
                </label>
              </td>
              <td>{webinarData?.priceLive}</td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor="checkbox-buy-recording"
                  className="webinar-purchase-label"
                >
                  {"Recording"}
                  <input
                    id="checkbox-buy-recording"
                    type="checkbox"
                    className="buy-webinar-input"
                    onChange={handlePurchaseInput}
                  />
                  <span className="check-mark"></span>
                </label>
              </td>
              <td>{webinarData?.priceRecording}</td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor="checkbox-buy-dd"
                  className="webinar-purchase-label"
                >
                  {"Digital Download"}
                  <input
                    id="checkbox-buy-dd"
                    type="checkbox"
                    className="buy-webinar-input"
                    onChange={handlePurchaseInput}
                  />
                  <span className="check-mark"></span>
                </label>
              </td>
              <td>{webinarData?.priceDigitalDownload}</td>
            </tr>
            <tr>
              <td>
                <label
                  htmlFor="checkbox-buy-trans"
                  className="webinar-purchase-label"
                >
                  {"Transcript"}
                  <input
                    id="checkbox-buy-trans"
                    type="checkbox"
                    className="buy-webinar-input"
                    onChange={handlePurchaseInput}
                  />
                  <span className="check-mark"></span>
                </label>
              </td>
              <td>{webinarData?.priceTranscript}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-2 px-6 w-full h-8 flex flex-col items-start justify-center">
          <span className="text-xs font-bold">{"Order Amount"}</span>
          <span className="text-base flex-grow h-8 px-2 font-bold leading-8">
            {`$ ${cartTotal}`}
          </span>
        </div>
      </div>
    );
  };

  /*-------------------Main Render------------------------- */
  return (
    <div className="my-10 border border-primary-light-900 p-5 webinarInfo-container">
      <div className="w-full flex flex-col gap-5">
        {isLoadingWebinar ? (
          <div className="h-[400px] flex items-center justify-center">
            <span>
              <i className="pi pi-spinner text-primary-bg-teal text-4xl animate-spin" />
            </span>
          </div>
        ) : (
          <React.Fragment>
            <div className="flex flex-wrap items-start justify-between">
              <div className="w-[50%]">
                {renderWebinarInfo()}

                {renderSpeakerInfo()}
              </div>

              <div className="w-[50%] flex flex-col gap-5">
                {renderPurchaseDescription()}
                <div className="px-4">
                  <ButtonCustom
                    className="w-full h-8 py-2 bg-primary-bg-teal font-semibold text-sm text-white rounded-full leading-3"
                    label={"Buy Now"}
                    handleClickWithLoader={onBuyNow}
                  />
                </div>
              </div>
            </div>

            <div className="border border-primary-light-900 py-5 bg-primary-bg-mintCream font-semibold text-sm text-center">
              {"Overview"}
            </div>

            <div className="text-sm leading-6">
              <h4>{"Description"}</h4>
              <p>{webinarData?.description}</p>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default PageWebinarInfo;
