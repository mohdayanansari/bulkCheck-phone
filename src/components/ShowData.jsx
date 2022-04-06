import axios from "axios";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import bulkData from "../assets/demoData";

const ShowData = () => {
  const [data, setData] = useState(null);
  //* Fetching data and making it into csv format:::
  const bulkGET = async () => {
    try {
      const response = await axios.get("http://143.244.136.108:5006/allgroups");
      console.log(response);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("⚠️⚠️::BULK SHOW TAB::⚠️⚠️");
    bulkGET();
  }, []);

  const headers = [
    { label: "Group ID", key: "groupId" },
    { label: "Group Name", key: "groupName" },
  ];
  const csvReport = {
    filename: "BulkCheck.csv",
    headers: headers,
    data: bulkData,
  };

  return (
    <div className="flex flex-col items-center justify-evenly h-[80vh] ">
      <h1 className="text-xl lg:text-3xl">Download Bulk WhatsApp Data</h1>
      <CSVLink
        {...csvReport}
        // onClick={bulkGET}
        className="text-white bg-green-500 w-[20%] rounded-lg h-[60px] flex justify-center items-center text-lg hover:bg-green-600 transition-all duration-300 transform ease-in-out hover:scale-105"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default ShowData;
