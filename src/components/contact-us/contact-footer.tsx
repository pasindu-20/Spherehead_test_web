"use client";

import React from "react";
import SiteContainer from "@/components/layout/site-container";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function ContactFooter() {
  return (
    <footer className="w-full bg-transparent text-white pt-0 pb-8 flex flex-col justify-end">
      <SiteContainer>
        {/* Mobile divider */}
        <div className="w-full border-t border-white md:hidden mb-6" />

        {/* Mobile: stacked layout / Desktop: row layout */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-6">
          
          {/* Social Icons + Legal Links stacked */}
          <div className="flex flex-col items-start md:items-end gap-5 md:gap-3 order-1 md:order-2">
            {/* Social Icons */}
            <div className="flex items-center gap-6 md:gap-5 text-white">
              <a href="#" className="hover:opacity-70 transition"><FaFacebook className="w-5 h-5 md:w-[18px] md:h-[18px]" /></a>
              <a href="#" className="hover:opacity-70 transition"><FaInstagram className="w-5 h-5 md:w-[18px] md:h-[18px]" /></a>
              <a href="#" className="hover:opacity-70 transition"><FaXTwitter className="w-5 h-5 md:w-[18px] md:h-[18px]" /></a>
              <a href="#" className="hover:opacity-70 transition"><FaLinkedin className="w-5 h-5 md:w-[18px] md:h-[18px]" /></a>
            </div>

            {/* Legal Links */}
            <p className="body-extra-small text-white flex gap-3 md:gap-2">
              <a href="#" className="hover:opacity-100 transition">Legal Policies</a> /
              <a href="#" className="hover:opacity-100 transition">Terms of Services</a> /
              <a href="#" className="hover:opacity-100 transition">Privacy Policies</a>
            </p>
          </div>

          {/* Copyright */}
          <p className="body-extra-small text-white order-2 md:order-1 md:max-w-none pr-8 md:pr-0 leading-relaxed">
            © 2026 All Rights Reserved. Designed and Developed by <br className="md:hidden" />
            Spherehead
          </p>
        </div>
      </SiteContainer>
    </footer>
  );
}