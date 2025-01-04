import React from 'react';
import IconBtn from './IconBtn'; // Ensure the correct path to IconBtn

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 text-black">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
        <p className="text-lg font-semibold mb-4">{modalData.text1}</p>
        <p className="text-gray-700 mb-6">{modalData.text2}</p>
        <div className="flex justify-end gap-4">
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          <button
            onClick={modalData?.btn2Handler}
            className="px-4 py-2 bg-gray-300 rounded-lg text-sm hover:bg-gray-400"
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
