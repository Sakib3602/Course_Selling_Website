import { Link } from "react-router";


const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full mx-4">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your payment has been processed successfully and your course is now available in your dashboard.
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
          >
            Go to Dashboard
          </Link>
          
          <Link
            to="/"
            className="block w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition duration-200"
          >
            Back to Home
          </Link>
        </div>

        {/* Extra Info */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Order Confirmed via Shurjopay
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;