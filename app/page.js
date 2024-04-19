"use client";

import "regenerator-runtime/runtime";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { MdOutlineSettingsVoice, MdKeyboardVoice } from "react-icons/md";

export default function Home() {
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
      handleCheckGrammar();
    } else {
      startListening();
    }
  };

  const handleReset = () => {
    resetTranscript();
  };

  return (
    <div
      className={`flex justify-center items-center grid-cols-1 mx-auto max-w-2xl gap-2 my-2`}
    >
      <div className="flex items-center w-full gap-2 border-2 rounded-xl hover:border-green-500">
        <input
          type="text"
          placeholder="Nhập sản phẩm tìm kiếm"
          className="outline-none w-full px-2 py-4 ml-2 border"
          value={transcript}
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
          className={`${
            listening ? "text-blue-500" : "text-red-500"
          } flex items-center justify-center gap-2 rounded-lg text-white font-bold text-xl pr-4`}
        >
          {!listening ? (
            <div className="flex items-center gap-1 justify-center">
              <MdKeyboardVoice size={30} />
            </div>
          ) : (
            <div className="flex items-center gap-1 justify-center">
              <MdOutlineSettingsVoice size={30} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
