import Link from "next/link";

const ThankYou = () => {
  return (
    <main className="md:bg-[#ebeded] min-h-screen">
      <div className="flex justify-center items-center">
        <div className="w-11/12 sm:w-1/2 bg-white mt-16 px-4 py-8 text-center rounded">
          <h1 className="text-3xl font-medium mb-4">
            Thanks for shopping with us!
          </h1>
          <p className="mb-2">
            Your Order No is <span className="text-bluish">#33443</span>
          </p>

          <Link
            href="/"
            className="text-bluish text-sm underline hover:font-bold focus:font-bold transition-all focus:outline-none"
          >
            Click here to continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
