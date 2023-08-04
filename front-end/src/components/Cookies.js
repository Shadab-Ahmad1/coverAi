import React from "react";
import "./Cookies.css";

function Cookies() {
  return (
    <>
      <section className="cookies-1">
        <div className="cookies-div1">
          <h1 className="cookies-h1"> Cookies </h1>{" "}
          <div className="cookies-div2">
            <p className="cookies-p">
              {" "}
              This website, like many others, uses cookies for a better internet
              browsing experience.In this section we tell you what they are,
              which ones we use and where how you can control them{" "}
            </p>{" "}
            <p className="cookies-p">
              {" "}
              Cookies used: When visiting our website, third - party cookies are
              generated.These third parties may set their own cookies in order
              to personalize the application and measure its functionality.Due
              to how these cookies work, Kogarashi cannot access it, in the same
              way that third parties cannot access the data of the cookies we
              use.Therefore, we recommend that you visit the websites of these
              third parties to find out how they work.{" "}
            </p>{" "}
            {/* <p className="cookies-p">
                                      {" "}
                                      Contact: For more information about this privacy policy or the use
                                      of cookies on our website, you can contact us at the address
                                      indicated on the website{" "}
                                    </p>{" "} */}{" "}
            <p className="cookies-p">
              {" "}
              Control the use of cookies in your browser: you have the option of
              accepting or rejecting cookies.Currently, all browsers allow you
              to adjust the settings to enable or disable storage or cookies or
              reject them from specific sites.{" "}
            </p>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </>
  );
}

export default Cookies;
