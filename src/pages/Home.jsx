import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
// import crypto from "crypto";
import ClipLoader from "react-spinners/ClipLoader";
import { CSVLink } from "react-csv";
import PhoneInput from "react-phone-input-2";
import { Tab } from "@headlessui/react";
// BULK SHOW COMPONENTS
import ShowData from "../components/ShowData";

const Home = ({ logedIn, setLogedIn }) => {
  // phone input states
  const [PhoneValue, setPhoneValue] = useState("");

  // bulk states
  const [bulkPhone, setBulkPhone] = useState(null);
  const [bulkData, setBulkData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadBulkData, setLoadBulkData] = useState(true);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // Google captcha State
  const [isVerified, setIsVerified] = useState(false);
  // Bulk Show Data
  const [dataWhatsApp, setDataWhatsApp] = useState();

  const checkLogin = () => {
    if (logedIn === false) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);
  // Google Captcha
  // const handleOnChange = (value) => {
  //   console.log("Captcha :::", value);
  //   setIsVerified(true);
  // };

  const bulkSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    var id = "id" + Math.random().toString(16).slice(2);
    // let ids = crypto.randomBytes(16).toString("hex");
    let formData = new FormData();
    formData.append("file", bulkPhone);
    formData.append("phone", PhoneValue);

    // const finalData = formData

    try {
      
      const url = "https://krish.notbot.in/addingroups";
      console.log(PhoneValue);

      await axios({
        url: url,
        method: "POST",
        headers: {
          authorization: id,
        },
        data: formData,
      })?.then((Response) => {
        setBulkData(Response);
        console.log(Response);
      });
      setLoading(false);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const data = bulkData?.data?.contacts;
  const headers = [
    { label: "Input", key: "input" },
    { label: "Status", key: "status" },
    { label: "Wa_ID", key: "wa_id" },
  ];
  const csvReport = {
    filename: "BulkWhatsAppCheck.csv",
    headers: headers,
    data: data,
  };

  // !=======================================================================
  //* Fetching data and making it into csv format:::
  const bulkGET = async () => {
    try {
      const response = await axios.get("https://krish.notbot.in/allgroups");
      setLoadBulkData(false);
      // console.log(response);
      setDataWhatsApp(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log("⚠️⚠️::BULK SHOW TAB::⚠️⚠️");
    bulkGET();
  }, []);

  return (
    <>
      <Tab.Group>
        <Tab.List className="flex justify-between p-[5px] items-center  w-[95%] lg:w-[60%] mx-auto rounded-lg h-[100px] lg:h-[60px] font-black lg:text-lg glasss transition-all duration-300 transform ease-in-out mt-[20px]">
          <Tab
            className={({ selected }) =>
              ` ${
                selected
                  ? "bg-green-400 bg-opacity-40 text-green-700 "
                  : " text-black"
              } rounded-md h-[50px] p-[10px] flex justify-center items-center w-1/2 font-bold transition-all duration-300 transform ease-linear`
            }
          >
            Send Bulk
          </Tab>
          <Tab
            className={({ selected }) =>
              ` ${
                selected
                  ? "bg-green-400 bg-opacity-40 text-green-700"
                  : " text-black"
              } rounded-md h-[50px] p-[10px] flex justify-center items-center w-1/2 font-bold transition-all duration-300 transform ease-linear`
            }
            disabled={loadBulkData ? true : false}
          >
            {loadBulkData
              ? (
                <div className="flex flex-col lg:flex-row justify-center items-center gap-[10px]">
                  <ClipLoader color="#22c55e" /> 
                  <h1>Please wait we are fetching data...</h1>
                </div>
              )
              : " Download Group List"}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          {/* Tab---1 */}
          <Tab.Panel>
            <div className="container">
              <div>
                <h1 className="heading">Go ahead, Check WhatsApp Numbers</h1>
              </div>
              <div>
                <form className="form-container">
                  {/* ========= */}
                  <PhoneInput
                    specialLabel={""}
                    value={PhoneValue}
                    placeholder="Enter Phone Number"
                    onChange={(PhoneValue) => {
                      setPhoneValue(PhoneValue);
                      setIsVerified(true);
                      // console.log(PhoneValue);
                    }}
                    country={"in"}
                    inputStyle={{
                      placeholder: "+91 XX XXX XXXX",
                      // borderColor: props.touched && props.error && "red",
                    }}
                  />
                  <div className="file-input">
                    <input
                      type="file"
                      id="file-input"
                      className="file-input__input"
                      accept=".csv"
                      onChange={(e) => setBulkPhone(e.target.files[0])}
                    />
                    <label className="file-input__label" for="file-input">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="upload"
                        className="svg-inline--fa fa-upload fa-w-16"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                        ></path>
                      </svg>
                      <span>
                        {(() => {
                          if (bulkPhone) {
                            return <>{bulkPhone?.name}</>;
                          } else {
                            return "Select a file";
                          }
                        })()}
                      </span>
                    </label>
                  </div>
                  {/* ========= */}
                  {/* <ReCAPTCHA
              sitekey="6LcPmLMeAAAAAP3GvuekXoYJes8hQXHu8O5WuXYd"
              onChange={handleOnChange}
            /> */}
                  <div className="btn-container">
                    {/* <p className="text">Upload only 100 contacts per CSV</p> */}
                    <button
                      onClick={bulkSend}
                      disabled={!isVerified}
                      type="submit"
                      className="btn disabled:bg-red-100 disabled:text-red-500 disabled:shadow-none !max-w-max px-[20px] flex justify-center items-center gap-[10px]"
                    >
                      {/* {isVerified ? "" : "Please Check reCAPTCHA"} */}
                      {loading ? <ClipLoader color="#ffffff" /> : ""}
                      {isVerified && !loading ? "Check" : ""}
                      {!isVerified && "Fill required details!"}
                    </button>
                  </div>
                </form>
                <div>
                  {/* {show === true && (
                    <div className="flex justify-center mt-5">
                      <CSVLink
                        {...csvReport}
                        className="bg-gradient-to-b from-green-500 to-green-700 rounded-lg text-white font-semibold text-lg transBulkForm hover:scale-95 transition-all ease-in-out duration-300 px-[30px] py-[15px]"
                      >
                        Download List
                      </CSVLink>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </Tab.Panel>
          {/* ====================================================== */}
          {/* Tab---2 */}
          <Tab.Panel>
            <ShowData data={dataWhatsApp} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Home;
