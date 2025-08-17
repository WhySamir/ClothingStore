import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import PageHeader from "../components/PageHeader";

function Page() {
  return (
    <>
      <PageHeader title="Contact Us" path="contact us" />
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form - Left Side */}
            <div className="lg:col-span-2 bg-white p-8 rounded-lg ">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-sm text-gray-600 mb-8">
                Your email address will not be published. Required fields are
                marked *
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Your Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="mt-2 ml-2 pl-3 py-1 outline-none bg-gray-50 border-gray-200"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      className="mt-2 ml-2 pl-3 py-1 outline-none bg-gray-50 border-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-700"
                  >
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Enter Subject"
                    className="mt-2 ml-2 pl-3 py-1 outline-none bg-gray-50 border-gray-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter here..."
                    rows={6}
                    className="mt-2 w-full px-2 py-1 pl-3 bg-gray-50 outline-none border-gray-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-orange-900 hover:bg-amber-800 text-white px-8 py-3 rounded-md"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info - Right Side */}
            <div className=" bg-[#f6f6f6]">
              {/* Address */}
              <div className=" p-6  ">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Address
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  4517 Washington Ave. Manchester, Kentucky 39495
                </p>
              </div>

              {/* Contact */}
              <div className=" p-6  ">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Phone : +0123-456-789</p>
                  <p>Email : example@gmail.com</p>
                </div>
              </div>

              {/* Open Time */}
              <div className=" p-6  ">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Open Time
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Monday - Friday : 10:00 - 20:00</p>
                  <p>Saturday - Sunday : 11:00 - 18:00</p>
                </div>
              </div>

              {/* Stay Connected */}
              <div className=" p-6  ">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Stay Connected
                </h3>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
