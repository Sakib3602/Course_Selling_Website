import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full mx-4">
        {/* Cancel/Info Icon */}
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600">
          <svg
            className="w-12 h-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
        <p className="text-gray-600 mb-8">
          You have cancelled the payment process. No worries, your items are still in the cart, and you haven't been charged.
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
          >
            Go Back to Home
          </Link>
          
        </div>

        {/* Help Link */}
        <p className="mt-8 text-sm text-gray-400">
          Changed your mind? You can always complete your purchase later.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancel;