import React from 'react';
import '../styles/ContactUs.css'
const ContactUs = () => {
  return (
    <div className="contactus-container min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h1>
      <div className="contactus-content flex flex-wrap justify-center gap-8 max-w-4xl w-full">
        {/* Call Us Box */}
        <div className="contact-box bg-white shadow-lg border border-gray-300 rounded-2xl p-8 w-80 transition-transform transform hover:-translate-y-1">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Call Us📞</h2>
          <div className="space-y-4 text-gray-700">
            <p className="text-sm font-semibold mb-1">Phone Number:</p>
            <p className="text-blue-600 hover:underline">
              <a href="tel:+1234567890">+1 234 567 890</a>
            </p>
          </div>
        </div>

        {/* Email Us Box */}
        <div className="contact-box bg-white shadow-lg border border-gray-300 rounded-2xl p-8 w-80 transition-transform transform hover:-translate-y-1">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Email Us✉</h2>
          <div className="space-y-4 text-gray-700">
            <p className="text-sm font-semibold mb-1">Email Address:</p>
            <p className="text-blue-600 hover:underline">
              <a href="mailto:info@haventrace.com">info@haventrace.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;