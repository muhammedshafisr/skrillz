import { IoCheckmarkSharp } from "@react-icons/all-files/io5/IoCheckmarkSharp";


const popupModalSuccess = () => {

  const handleOk = () => {
    const popup_modal = document.querySelector("#popup-modal-success");
    popup_modal.classList.add("collapse");  
  }
    return (
        <>
          <div
        id="popup-modal-success"
        tabindex="-1"
        className="flex justify-center collapse fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:w-full md:inset-0 h-modal md:h-full"
      >
        <div className="relative w-8/12 md:w-full h-full max-w-md md:h-auto">
          <div className="relative bg-gradient-to-r from-cyan-600 to-slate-900 rounded-lg shadow dark:bg-gray-700">
            
            <div className="p-6 text-center">
              <svg
                aria-hidden="true"
                className="mx-auto text-green-600 w-14 h-10 dark:text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <IoCheckmarkSharp />
              </svg>
              <h3 id="popup-head" className="text-lg font-normal text-green-600 dark:text-gray-400">
                
              </h3>
              <h5 id="popup-body" className="mb-3 text-white">
                
              </h5>
              <button
                onClick={ handleOk }
                data-modal-hide="popup-modal"
                type="button"
                className="text-cyan-600 bg-white focus:ring-4 focus:outline-none focus:ring-green-600 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
        </>
    );
}
 
export default popupModalSuccess;