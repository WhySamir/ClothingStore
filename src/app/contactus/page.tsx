"use client";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import PageHeader from "../components/PageHeader";
import dynamic from "next/dynamic";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactFormData } from "@/app/lib/validation";
import { useForm } from "react-hook-form";

const Map = dynamic(
  () => import("@/app/components/Map").then((component) => component.Map),
  { ssr: false }
);

const locations = [
  { id: "1", lat: 27.664906, lng: 85.329345 }, // Gwarko
  { id: "2", lat: 27.6581, lng: 85.3244 },
];

function Page() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSent(true);
        reset(); // Clear form
        setTimeout(() => setSent(false), 3000);
      } else {
        alert(
          "Failed to send message, rate limiter hitted success please send message tommorow"
        );
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Your Name *
                    </label>
                    <input
                      {...register("name")}
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="mt-2   pl-3 py-1  border rounded-sm border-gray-900 w-full"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      placeholder="exampe@gmail.com"
                      className="mt-2   pl-3 py-1  border rounded-sm border-gray-900 w-full"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-gray-700"
                  >
                    Subject *
                  </label>
                  <input
                    {...register("subject")}
                    id="subject"
                    type="text"
                    placeholder="Enter Subject"
                    className="mt-2   pl-3 py-1 border rounded-sm border-gray-900 w-1/2"
                  />
                  {errors.subject && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700"
                  >
                    Your Message *
                  </label>
                  <textarea
                    {...register("message")}
                    id="message"
                    placeholder="Enter here..."
                    rows={6}
                    className="mt-2 w-full px-2 py-1 pl-3   border rounded-sm border-gray-900resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-900 hover:bg-amber-800 text-white px-8 py-3 disabled:opacity-50"
                >
                  {sent
                    ? " Sent Successfully!"
                    : isSubmitting
                    ? "Sending..."
                    : "Send Message"}
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
                  <div className="w-10 h-10 bg-[#F5BD63] rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Facebook className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-[#F5BD63] rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Linkedin className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-[#F5BD63] rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Youtube className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-[#F5BD63] rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-[#F5BD63] rounded-full flex items-center justify-center hover:bg-amber-500 cursor-pointer transition-colors">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <p className="mb-4">We’re located in Lalitpur.</p>
            <Map
              center={{ lat: 27.6675, lng: 85.3258 }}
              locations={locations}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
