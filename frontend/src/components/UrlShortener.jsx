import React, { useState } from "react";
import axios from "axios";

export default function UrlShortener() {
  // declare useStates
  const [errorMessage, setErrorMessage] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  // button onclick function
  const generateShortURL = async () => {
    // check isEmpty
    if (!longUrl) {
      setErrorMessage("Please enter an URL");
      return;
    }

    // POST long url to /url endpoint
    const response = await axios.post("http://localhost:8000/url", {
      url: longUrl,
    });

    // check response
    if (response.status === 201) {
      // http response code is 201
      setShortUrl(response.data.key);
      setErrorMessage("");
    } else {
      // http response code is 200
      setShortUrl("");
      setErrorMessage(response.data.errorDescription);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center">
      <div class="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
        <p class="text-xl mb-4 text-indigo-800 font-semibold ">
          URL Shortener
        </p>
        <div class="mb-4">
          <label class="block text-left text-indigo-800 text-xs font-semibold mb-2">
            Paste URL
          </label>
          <div class="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              class="flex-grow p-2 border border-gray-300 rounded-xl mb-2 md:mb-0"
              placeholder="http://localhost:8000/"
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <button
              class="p-2.5 bg-indigo-600 text-white rounded-xl"
              onClick={generateShortURL}
            >
              Generate
            </button>
          </div>
        </div>
        {shortUrl && (
          <div class="mt-12">
            <a
              href={`http://localhost:8000/url/${shortUrl}`}
              target="_blank"
              class=" text-indigo-600 font-medium underline"
            >
              {shortUrl}
            </a>
          </div>
        )}
        {errorMessage && (
          <div class="mt-12">
            <p class="text-red-600 font-medium">{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
