import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UrlTable() {
  const [urlRecords, setUrlRecords] = useState([]);

  useEffect(() => {
    const getShortURLRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/shorten_url_records"
        );
        setUrlRecords(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getShortURLRecords();
  }, []);

  return (
    <div class="shadow-xl rounded-xl overflow-hidden mx-4 md:mx-10 mt-12 text-left">
      <div class="overflow-x-auto">
        <table class="w-full table-fixed">
          <thead>
            <tr class="bg-indigo-500">
              <th class="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">
                Long URL
              </th>
              <th class="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">
                Short URL
              </th>
              <th class="w-1/4 py-4 px-6 text-left text-white font-bold uppercase">
                Number of visits
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            {urlRecords.map((urlRecord) => (
              <tr key={urlRecord.key}>
                <td class="py-4 px-6 border-b border-gray-200">
                  {urlRecord.long_url}
                </td>
                <td class="py-4 px-6 border-b border-gray-200">
                  <a
                    href={`http://localhost:8000/url/${urlRecord.key}`}
                    target="_blank"
                    class=" text-indigo-600 font-medium underline"
                  >
                    http://localhost:8000/url/{urlRecord.key}
                  </a>
                </td>
                <td class="py-4 px-6 border-b border-gray-200">
                  {urlRecord.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
