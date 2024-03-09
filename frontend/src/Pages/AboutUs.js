import React from 'react'

const AboutUs = () => {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Sparkling Clean is a leading cleaning service provider dedicated to ensuring your spaces are spotless and
          fresh.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Our mission is to provide top-notch cleaning services that exceed our customers' expectations, creating a
              clean and healthy environment for all.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-500 dark:text-gray-400">
              We envision a world where cleanliness is not just a choice but a way of life, promoting well-being and
              happiness in every space we touch.
            </p>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Quality</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We are committed to delivering the highest quality cleaning services to our clients.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Reliability</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our team is reliable and dedicated to ensuring your satisfaction with our services.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Customer satisfaction is our top priority, and we strive to exceed expectations.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We continuously innovate to provide cutting-edge cleaning solutions for our clients.
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default AboutUs