import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ppHomeBackground from "../../assets/images/pp_home_background.png";
import CarouselCustom from "../../components/CarouselCustom";
import { PHARMA_PROFS } from "../../constant";
import { LINK_PAGE_SPEAKERS } from "../../routes";
import SpeakerService from "../../services/SpeakerService";
import {
  getInitialLetterUpperCase,
  getLabel,
  validateGetRequest,
} from "../../utils/commonUtils";
import "./pageHome.css";

const videoURL = "https://vedsubrandwebsite.s3.amazonaws.com/Pharma+Profs.mp4";

const PageHome: React.FC = () => {
  const navigate = useNavigate();
  const [speakerCarouselData, setSpeakerCarouselData] = useState([]);

  useEffect(() => {
    const init = async () => {
      await getSpeakersInfo();
    };
    init();
  }, []);

  /*---------------------------Service Calls------------------------------*/

  const getSpeakersInfo = async () => {
    try {
      const res = await SpeakerService.getSpeakers();
      if (validateGetRequest(res)) {
        const speakersList = res?.data?.[1];
        const speakerForPharma = speakersList.filter(
          (speaker: any) => speaker.industry === PHARMA_PROFS.PHARMACEUTICAL
        );
        setSpeakerCarouselData(speakerForPharma);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /*------------------------------Sectional Render---------------------------*/
  const carouselSpeakerTemplate = (carouselItem: any) => {
    return (
      <div
        className="p-2 mx-2 flex flex-col gap-2 relative text-xs border border-primary-light-900 rounded-lg cursor-pointer"
        onClick={() => {
          navigate(LINK_PAGE_SPEAKERS + "/" + `${carouselItem.id}`);
        }}
      >
        <div className="flex items-center justify-center">
          <img
            className="speaker-carousel-image w-[240px] h-[300px] object-cover"
            src={carouselItem.photo}
            alt="speaker's image"
          />
        </div>
        <div className="font-normal text-center text-primary-pSlateGray">
          <pre className="text-base">
            {getInitialLetterUpperCase(carouselItem.name)}
          </pre>
          <pre className="text-xs">{getLabel(carouselItem.industry)}</pre>
        </div>
      </div>
    );
  };

  /*-------------------------Main Render-----------------------------------*/

  return (
    <div className="w-full">
      <section className="hero-s-one mb-20 py-10">
        <div className="hero-bg-one-wrapper">
          <img alt="wallpaper" src={ppHomeBackground} />
        </div>

        <div className="page-margin">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full relative flex flex-col gap-10">
              <div className="text-3xl text-pretty">
                <h1 className="text-center text-primary-pLabel tracking-wider">
                  We are sharing our deep passion
                  <br />
                  and dedication to the world
                  <br />
                  of pharmaceuticals.
                </h1>
              </div>

              <div className="w-full px-3 flex flex-col gap-10 items-center justify-center screen_var_one:px-10 screen_var_one:flex-row">
                <div className="screen_var_one:w-[50%] text-base">
                  Journey towards a world where healthcare isn't a
                  privilege—it's a right. Together, let's rewrite the script of
                  pharmaceuticals and create a future where equality isn't just
                  a dream—it's a reality
                </div>

                <div className="screen_var_one:w-[50%] hero-sec-vid-box">
                  <video controls autoPlay={true} loop={true}>
                    <source src={videoURL} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-margin">
        <div className="flex flex-col gap-20 items-center justify-center">
          <section className="w-full px-3 flex flex-col gap-10 items-stretch justify-around sm:px-10 sm:flex-nowrap screen_var_one:flex-row">
            <div className="p-5 border rounded-lg">
              <div className="flex flex-col gap-2">
                <h2 className="py-2 text-xl text-center bg-primary-bg-mintCream">
                  Our Mission
                </h2>
                <p className="text-sm font-normal text-justify screen_var_one:text-left">
                  The mission statement is about your high-level purpose. We aim
                  to empower pharmaceutical professionals globally by offering
                  unmatched resources, the latest industry insights, and
                  extensive networking opportunities that boost careers and
                  expand their influence on global health. Pharma Profs is all
                  about transforming individual potential into collective
                  advancement.
                </p>
              </div>
            </div>
            <div className="p-5 border rounded-lg">
              <div className="flex flex-col gap-2">
                <h2 className="py-2 text-xl text-center bg-primary-bg-mintCream">
                  Our Vision
                </h2>
                <p className="text-sm font-normal text-justify screen_var_one:text-left">
                  The Vision articulates the future state of what we aspire to
                  be. Envision a world where every pharmaceutical professional
                  has everything they need to thrive. That's the future we're
                  striving for at Pharma Profs. We aim to focus and become the
                  go-to global hub for pharmaceutical expertise, empowering
                  professionals to innovate, collaborate, and propel the
                  healthcare industry forward. We firmly believe in the power of
                  teamwork to tackle the toughest challenges facing healthcare
                  today, and we invite you to be a part of this collective
                  effort.
                </p>
              </div>
            </div>
            <div className="p-5 border rounded-lg">
              <div className="flex flex-col gap-2">
                <h2 className="py-2 text-xl text-center bg-primary-bg-mintCream">
                  Our Goal
                </h2>
                <p className="text-sm font-normal text-justify screen_var_one:text-left">
                  Business goals are those that represent a company's
                  overarching mission. We aim to give you a peek into our vast
                  experience and unwavering commitment to this field. We're here
                  to showcase our expertise, share our research interests, and
                  highlight how we drive pharmaceutical science and knowledge
                  forward
                </p>
              </div>
            </div>
          </section>

          <div className="highlights-line"></div>

          <section className="w-full mb-10 px-3 sm:px-10 flex flex-col items-center justify-center gap-5">
            <h4 className="text-xl text-primary-pText">Meet our speakers</h4>

            {speakerCarouselData.length ? (
              <div className="w-full">
                <div className="speaker-carousel-wrapper">
                  <CarouselCustom
                    className="speaker-carousel"
                    carouselItems={speakerCarouselData}
                    carouselItemTemplate={carouselSpeakerTemplate}
                    numVisible={4}
                    numScroll={1}
                  />
                </div>
              </div>
            ) : null}
          </section>

          <div className="highlights-line"></div>

          <section className="mb-10 px-3 sm:px-10 flex flex-col items-center justify-center gap-5">
            <h4 className="text-xl text-primary-pText">History</h4>
            <div className="w-full flex items-center justify-center">
              <div className="text-base font-normal text-left text-pretty">
                <p>
                  Over the past years, our company, Pharma Profs, has improved
                  the health and wellness of patients through expert guidance
                  tailored for individuals and pharmaceutical entities alike.
                  Our commitment lies in equipping professionals with
                  cutting-edge insights, trends, and indispensable knowledge
                  necessary to excel in today's dynamic and competitive
                  landscape. Together, we are shaping the future of healthcare,
                  one informed decision at a time.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PageHome;
