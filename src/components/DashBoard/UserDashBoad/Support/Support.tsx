const Support = () => {
  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row gap-6 p-4">
      {/* Left Side - Modal */}
      <div className="w-full lg:w-1/2">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold">
              Get Support Within 2-4 Hours
            </span>
            <button className="p-1 rounded hover:bg-gray-100">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></path>
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="space-y-5">
            <div>
              <label className="block font-medium mb-1">Subject</label>
              <input
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
                type="text"
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum 32 characters
              </p>
            </div>

            <div>
              <label className="block font-medium mb-1">Description</label>
              <textarea className="w-full border border-gray-300 rounded p-2 h-24 focus:outline-none focus:ring-2 focus:ring-amber-400"></textarea>
              <p className="text-sm text-gray-500 mt-1">
                Provide a clear description of your issues
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6">
            <button className="bg-amber-400 text-white px-4 py-2 rounded hover:bg-amber-500 w-full lg:w-auto">
              Post Now
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - FAQ */}
      <div className="w-full lg:w-1/2">
        <h3 className="text-xl font-bold mb-4">Replies To Support Request</h3>

        <div className="card">
          <span className="title">Comments</span>
          <div className="comments">
            <div className="comment-react"></div>
            <div className="comment-container">
              <div className="user">
                <div className="user-pic"></div>
                <div className="user-info">
                  <span>Yassine Zanina</span>
                  <p>Wednesday, March 13th at 2:45pm</p>
                </div>
              </div>
              <p className="comment-content">
                I've been using this product for a few days now and I'm really
                impressed! The interface is intuitive and easy to use, and the
                features are exactly what I need to streamline my workflow.
              </p>
            </div>
          </div>
          <div className="comments">
            <div className="comment-react"></div>
            <div className="comment-container">
              <div className="user">
                <div className="user-pic"></div>
                <div className="user-info">
                  <span>Yassine Zanina</span>
                  <p>Wednesday, March 13th at 2:45pm</p>
                </div>
              </div>
              <p className="comment-content">
                I've been using this product for a few days now and I'm really
                impressed! The interface is intuitive and easy to use, and the
                features are exactly what I need to streamline my workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
