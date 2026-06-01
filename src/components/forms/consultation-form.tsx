"use client";

import React, { useState } from "react";
import SiteContainer from "@/components/layout/site-container";

export default function ConsultationForm() {
  const [option, setOption] = useState<"Free Consultation" | "Get a Quotation">("Free Consultation");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm) {
      setStatus({ type: "error", text: "Please confirm that the details provided are accurate." });
      return;
    }
    
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ option, name, phone, email, areaOfInterest, message, confirm }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: "success", text: "Message sent successfully! We'll be in touch." });
        setName("");
        setPhone("");
        setEmail("");
        setAreaOfInterest("");
        setMessage("");
        setConfirm(false);
      } else {
        setStatus({ type: "error", text: data.message || "Failed to send message. Please try again." });
      }
    } catch {
      setStatus({ type: "error", text: "Something went wrong. Please check your connection." });
    }

    setLoading(false);
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section className="w-full bg-[#f8f9fc] py-16 lg:py-24 font-sans">
      <SiteContainer>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            {/* Logo Icon */}
            <div className="flex items-center justify-center space-x-1 mb-4">
              <div className="w-4 h-4 rounded-full bg-[#5eb6f6]"></div>
              <div className="w-4 h-4 rounded-full bg-[#2462eb]"></div>
              <div className="w-4 h-4 rounded-full bg-[#f48b3b]"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1a1a1a] mb-4 tracking-tight" style={{ fontWeight: 400 }}>
              Let's Start the Conversation
            </h2>
            <p className="text-[#333333] text-lg max-w-2xl mx-auto">
              Choose the option that fits your needs, share your details, and our team will get back shortly.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 md:p-12">
            
            {/* Toggle */}
            <div className="flex justify-center mb-10">
              <div className="bg-[#f0f2f5] p-1 rounded-md inline-flex">
                <button
                  type="button"
                  onClick={() => setOption("Free Consultation")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    option === "Free Consultation"
                      ? "bg-[#2462eb] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Free Consultation
                </button>
                <button
                  type="button"
                  onClick={() => setOption("Get a Quotation")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    option === "Get a Quotation"
                      ? "bg-[#2462eb] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Get a Quotation
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {/* Name */}
                <div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="w-full border-b border-gray-200 pb-3 text-[15px] text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#2462eb]"
                  />
                </div>
                
                {/* Phone */}
                <div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full border-b border-gray-200 pb-3 text-[15px] text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#2462eb]"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="w-full border-b border-gray-200 pb-3 text-[15px] text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#2462eb]"
                  />
                </div>

                {/* Area of Interest */}
                <div className="relative">
                  <select
                    value={areaOfInterest}
                    onChange={(e) => setAreaOfInterest(e.target.value)}
                    className="w-full border-b border-gray-200 pb-3 text-[15px] text-gray-800 outline-none transition-colors focus:border-[#2462eb] appearance-none bg-transparent cursor-pointer"
                    style={{ color: areaOfInterest ? '#1f2937' : '#9ca3af' }}
                  >
                    <option value="" disabled hidden>Area of Interest</option>
                    <option value="Web Development" className="text-gray-800">Web Development</option>
                    <option value="Mobile App Development" className="text-gray-800">Mobile App Development</option>
                    <option value="UI/UX Design" className="text-gray-800">UI/UX Design</option>
                    <option value="Digital Marketing" className="text-gray-800">Digital Marketing</option>
                    <option value="Other" className="text-gray-800">Other</option>
                  </select>
                  <div className="absolute right-0 top-1 pointer-events-none text-gray-400">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mt-2">
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  placeholder="Let's talk about your idea"
                  required
                  rows={1}
                  className="w-full resize-none overflow-hidden border-b border-gray-200 pb-3 text-[15px] text-gray-800 outline-none transition-colors placeholder:text-gray-400 focus:border-[#2462eb]"
                />
              </div>

              {/* Checkbox */}
              <div className="mt-4">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={confirm}
                      onChange={(e) => setConfirm(e.target.checked)}
                      className="peer appearance-none w-4 h-4 border border-gray-300 rounded-[2px] checked:bg-[#2462eb] checked:border-[#2462eb] transition-all cursor-pointer"
                    />
                    <svg
                      className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[13px] text-gray-500">I confirm that the details provided are accurate and complete.</span>
                </label>
              </div>

              {/* Status Message */}
              {status && (
                <div className={`px-4 py-3 text-sm rounded-md transition-opacity duration-300 ${
                  status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {status.text}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-8 py-3 rounded-[4px] font-medium transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
