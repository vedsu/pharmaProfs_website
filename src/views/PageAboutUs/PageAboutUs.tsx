import React from "react";

const PageAboutUs: React.FC = () => {
  return (
    <div className="page-margin w-full">
      <section className="px-10 py-5 flex flex-col items-center justify-center gap-5 screen_var_one:px-0">
        <div className="flex flex-col gap-5 text-sm">
          <h4 className="font-semibold text-2xl text-primary-pTextTeal ">
            About Us
          </h4>
          <p className="text-left text-sm font-normal leading-6">
            <span>
              Welcome to Pharma Profs! The extraordinary pharmaceutical network,
              where the spark ignites your career and makes a remarkable
              difference. With a diverse global membership, we lead the charge
              in uniting industry trendsetters, creative minds, and committed
              professionals who drive the pharmaceutical landscape forward. To
              become a member, visit our website and complete the membership
              form. It's that easy to join our community of passionate
              professionals.
              <br />
              What sets us apart? We're an exclusive hub of resources,
              knowledge, and unique opportunities meticulously tailored for the
              pharmaceutical industry. This is why top professionals choose us.
              We're more than a network; we're a gateway to success in the
              pharmaceutical sector.
            </span>
          </p>

          <div className="flex flex-col gap-5 font-normal text-sm">
            <p>Email: support@pharmaprofs.com</p>
            <p>Contact us: +1-830-256-0384</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PageAboutUs;
