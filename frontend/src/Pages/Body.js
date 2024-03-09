import React from 'react'
import {Link} from 'react-router-dom'
import cover from '../assets/cover.jpg'

const Body = () => {
  return (
    <div className='flex flex-col w-screen mt-14 sm:mt-0 gap-8'>
    <div className="bg-gray-200 py-12 flex flex-col w-full">
    <div className="w-full flex flex-col md:px-6 ">
      <div className="flex items-center justify-between gap-4">
        <div className="gap-3 text-center items-center lg:text-left flex flex-col z-10 sm:z-0">
          <div className="space-y-2 w-1/2">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Sparkling Clean
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Your car deserves the best. Experience the ultimate shine with our professional carwash and detailing
              services.
            </p>
          </div>
          <Link 
            className="flex h-10 w-36 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-md font-medium shadow-lg hover:bg-black hover:text-white" 
            to="#"
          >
            Book Now
          </Link>
        </div>
        <img
          alt="img"
          className="mx-auto w-full h-[400px] absolute sm:relative overflow-hidden sm:w-1/2 object-cover object-center transform opacity-60 sm:opacity-100 grayscale-40"
          src={cover}
        />
      </div>
    </div>
  </div>
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">The Perfect Wash</h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            We offer more than just a carwash. Our attention to detail and dedication to quality ensure that your
            vehicle shines inside and out.
          </p>
        </div>
      </div>
      <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-4">
        <div className="flex flex-col items-center justify-start space-y-2">
          <CheckSquareIcon className="h-10 w-10 rounded-sm" />
          <h3 className="text-xl font-bold">Exterior Wash</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Starting at $19.99</p>
        </div>
        <div className="flex flex-col items-center justify-start space-y-2">
          <CheckSquareIcon className="h-10 w-10 rounded-sm" />
          <h3 className="text-xl font-bold">Interior Clean</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Starting at $29.99</p>
        </div>
        <div className="flex flex-col items-center justify-start space-y-2">
          <CheckSquareIcon className="h-10 w-10 rounded-sm" />
          <h3 className="text-xl font-bold">Wax & Shine</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Starting at $24.99</p>
        </div>
        <div className="flex flex-col items-center justify-start space-y-2">
          <CheckSquareIcon className="h-10 w-10 rounded-sm" />
          <h3 className="text-xl font-bold">Deluxe Detailing</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Starting at $99.99</p>
        </div>
      </div>
    </div>
  </section>
  <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-200">
    <div className="container px-4 md:px-6">
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_800px] lg:gap-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Package</h2>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Select the perfect package for your car. Whether you want a quick wash or a complete makeover, we've got
            you covered.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="border rounded-lg overflow-hidden border-gray-200 border-gray-200 dark:border-gray-800 dark:border-gray-800">
            <div className="grid items-center gap-4 p-4 md:grid-cols-2 lg:gap-6 lg:p-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Basic Wash</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Our essential package includes a thorough exterior wash to remove dirt and grime.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">$19.99</span>
                <button size="sm">Book Now</button>
              </div>
            </div>
            <div />
            <div className="grid items-center gap-4 p-4 md:grid-cols-2 lg:gap-6 lg:p-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Premium Clean</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upgrade to our premium package for a complete interior cleaning and tire shine.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">$39.99</span>
                <button size="sm">Book Now</button>
              </div>
            </div>
            <div />
            <div className="grid items-center gap-4 p-4 md:grid-cols-2 lg:gap-6 lg:p-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Deluxe Detailing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Experience the ultimate treatment with our deluxe detailing package, including a full interior
                  deep clean and hand wax for a showroom shine.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold">$99.99</span>
                <button size="sm">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="w-full">
    <div className="h-[400px] lg:h-[500px]">
      <span reason="Something went wrong" />
    </div>
  </section>
</div>
)
}
export default Body

function CheckSquareIcon(props) {
  return (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
    )
  }