import React, { useState } from "react";

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your logic here to send the form data to a server or perform any other actions.
    // For now, we'll just set a flag to indicate that the form has been submitted.
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <h1 className="text-2xl font-semibold">Contact Us</h1>

      <div className="mt-4 w-1/2 rounded-lg shadow-md bg-white p-4">
        <p className="text-center">
          We’re all ears when it comes to our customers. We are here to attend to any questions or feedback you have. To get in touch, leave us a message, send us an email, or give us a call, and we’ll get back to you soon.
        </p>
        
        <div className="mt-4 text-center">
          <p>
            Email: invest@pitchcrest.com<br />
            Phone No.: +254 704785937
          </p>
        </div>
      </div>

      <div className="mt-8 w-1/2 rounded-lg shadow-md bg-white p-4">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold mb-4">Send Us A Message</h1>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Name:</label>
            <input
              type="text"
              className="border rounded-md py-2 px-3 w-full"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email:</label>
            <input
              type="email"
              className="border rounded-md py-2 px-3 w-full"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">How can we help you?</label>
            <textarea
              className="border rounded-md py-2 px-3 w-full h-32 resize-none"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        {isSubmitted && (
          <p className="mt-4 font-semibold">
            We will get back to you soon.
          </p>
        )}
      </div>
    </div>
  );
}

export default Contact;
