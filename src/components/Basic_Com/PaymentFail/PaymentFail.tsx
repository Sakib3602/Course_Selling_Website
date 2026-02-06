import { Link } from "react-router";


const PaymentFail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full mx-4 border-t-4 border-red-500">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Failed</h2>
        <p className="text-gray-600 mb-2 font-medium">
          Oops! Something went wrong with your transaction.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          This could be due to insufficient funds, an expired card, or a temporary technical issue with the bank.
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <Link
            to="/" // যেখানে ইউজার আবার পেমেন্ট শুরু করতে পারবে
            className="block w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out shadow-md"
          >
          Return to Homepage
          </Link>
          
          <Link
            to="/" // আপনার কন্টাক্ট বা সাপোর্ট পেজ
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-lg transition duration-200"
          >
            Contact Support
          </Link>
        </div>


        {/* Help Note */}
        <div className="mt-8 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            If money was deducted from your account, it will be refunded within 5-7 business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;