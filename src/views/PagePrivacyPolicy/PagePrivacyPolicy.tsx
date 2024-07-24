import React from "react";

const PagePrivacyPolicy: React.FC = () => {
  const statements = [
    "Your privacy is our utmost priority at Pharma Profs. We do not sell or share your information with third parties, companies, or other organizations. Your information is solely used to inform you of webinars or compliance training via e-mail and to assist you in participating in the webinars should you decide to register. We respect your privacy and are committed to protecting your data.",

    "You can remind us anytime to refrain from receiving e-mail notices on webinars, and we will remove you from our notification list.",

    "We gather data like browser and domain names for internal analysis to enhance our website's performance.",

    "Our site employs cookies to track user activities for statistical insights. You have the option to turn off cookies in your browser settings.",

    "Your personal information remains confidential and is only shared under strict confidentiality agreements or when required by law.",

    "We may disclose information in cases of legal obligations, collaborations with trusted partners, or business acquisitions with your consent only.",

    "Links to third-party websites are provided for convenience, but we do not endorse their privacy policies. Users should review these policies independently.",

    "Feel free to contact us with any concerns or queries regarding our Privacy Policies.",
  ];

  return (
    <div className="page-margin">
      <section className="py-5 flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col gap-5 text-sm">
          <div className="text-left">
            <h4 className="mb-1 font-semibold text-2xl text-primary-pTextTeal ">
              Privacy Policy
            </h4>
            <p className="text-sm font-semibold leading-6">
              {
                "At Pharma Profs, safeguarding your privacy is at the core of our values. Here's how we're committed to protecting your data"
              }
            </p>
          </div>

          <div>
            <ul className="list-disc font-normal">
              {statements?.map((statement, idx: number) => (
                <li className="mb-2 leading-6" key={idx}>
                  {statement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PagePrivacyPolicy;
