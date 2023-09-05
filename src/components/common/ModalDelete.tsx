import { FC, useRef, useState } from "react";

interface Props {
  id: number;
  text: string;
  deleteFunc: (id: number) => void;
}

const ModalDelete: FC<Props> = ({ id, text, deleteFunc }) => {
  const modalRef = useRef<HTMLDivElement>(null); // Provide the correct type here

  const [showModal, setShowModal] = useState(false);

  const confirmDelete = () => {
    setShowModal(false);
    deleteFunc(id);
  };

  return (
    <div className="relative inline-block">
      <button
        className="ml-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        onClick={() => setShowModal(true)}
      >
        Видалити
      </button>

      {showModal && (
        
        <div className="fixed inset-0 z-50 overflow-x-hidden overflow-y-auto flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <button
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              onClick={() => setShowModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                {/* SVG path here */}
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete {text}?
              </h3>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-800 text-white rounded-lg py-2 px-4 mr-2"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="border border-gray-200 text-gray-500 hover:text-gray-900 rounded-lg py-2 px-4"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalDelete;