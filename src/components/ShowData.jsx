import React from "react";
import { CSVLink } from "react-csv";

const ShowData = ({ data }) => {
  const headers = [
    { label: "Group ID", key: "Group ID" },
    { label: "Group Name", key: "Group Name" },
  ];
  const csvReport = {
    filename: "BulkCheck.csv",
    headers: headers,
    data: data.data,
  };

  return (
    <div className="flex flex-col items-center justify-evenly h-[80vh] ">
      <h1 className="text-xl lg:text-3xl">Download Bulk WhatsApp Data</h1>

      <CSVLink
        {...csvReport}
        className="text-white bg-green-500 w-[20%] rounded-lg h-[60px] flex justify-center items-center text-lg hover:bg-green-600 transition-all duration-300 transform ease-in-out hover:scale-105"
      >
        Download
      </CSVLink>
    </div>
  );
};

export default ShowData;
