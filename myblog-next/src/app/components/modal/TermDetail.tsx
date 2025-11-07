import React from 'react';

interface TermDetailProps {
  title?: string;
  content?: string;
}

const TermDetail: React.FC<TermDetailProps> = ({ title = '', content = '' }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <a 
        onClick={openModal} 
        className="cursor-pointer text-indigo-500 inline-flex items-center"
      >
        More Detail 
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </a>

      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true" 
              onClick={closeModal} 
            />
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-lg">
              
              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {title}
                </h3>
                <button 
                    type="button" 
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                >
                    &times;
                </button>
              </div>

              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <article 
                  className="mx-auto px-4 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl whitespace-pre-line"
                >
                  {content}
                </article>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TermDetail;