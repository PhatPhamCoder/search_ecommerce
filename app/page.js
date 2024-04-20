"use client";

import "regenerator-runtime/runtime";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { MdOutlineSettingsVoice, MdKeyboardVoice } from "react-icons/md";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
export default function Home() {
  const [keySearch, setKeySearch] = useState("");
  const {
    transcript,
    browserSupportsSpeechRecognition,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      interimResults: true,
      language: "vi-VN",
    });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const handleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      startListening();
    }
  };

  const handleReset = () => {
    resetTranscript();
    setKeySearch("");
  };

  const handleClickSearch = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    }
    if (keySearch) {
      console.log("keySearch::", keySearch.trim());
    } else {
      console.log("speech to text:::", transcript.trim());
    }
  };

  return (
    <div
      className={`flex justify-center items-center grid-cols-1 mx-auto max-w-2xl gap-2 my-2`}
    >
      <div className="flex items-center w-full gap-2 px-4 py-2 border-2 rounded-xl hover:border-green-500">
        <input
          type="text"
          placeholder="Nhập sản phẩm tìm kiếm"
          className="outline-none w-full ml-2"
          value={keySearch || transcript}
          onChange={(e) => setKeySearch(e.target.value)}
        />
        <div className={`${transcript ? "block" : "hidden"}`}>
          <button
            onClick={transcript ? handleReset : null}
            className={`${
              transcript ? "bg-gray-300" : "bg-[#746C6B]"
            } gap-2 w-6 h-6 p-1 rounded-full font-bold text-[0.7rem] text-black`}
          >
            X
          </button>
        </div>

        <button
          type="button"
          onClick={handleListening}
          className={`flex items-center justify-center gap-2 rounded-lg text-white font-bold text-xl pr-4`}
        >
          {!listening ? (
            <div className="flex items-center gap-1 justify-center">
              <MdKeyboardVoice size={30} color="red" />
            </div>
          ) : (
            <div className="flex items-center gap-1 justify-center">
              <MdOutlineSettingsVoice size={30} color="red" />
            </div>
          )}
        </button>
        <div
          className="mr-4 cursor-pointer font-bold"
          onClick={() => handleClickSearch()}
        >
          <AiOutlineSearch size={20} />
        </div>
      </div>
    </div>
  );
}
