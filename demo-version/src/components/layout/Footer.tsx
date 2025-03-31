import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaWeixin, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background-dark pt-16 pb-8 text-text-primary border-t border-border">
      {/* Call to Action Section */}
      <div className="container-custom mb-12">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/5 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-text-primary">Ready to start your cross-border trade journey?</h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Join the HoloCAN platform today to connect Canadian and Chinese businesses, reduce trade barriers, and expand into international markets
          </p>
          <button className="btn btn-primary rounded-full">
            Register for Free
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <Image 
                  src="/holocanlogo-nobg.svg" 
                  alt="HoloCAN Logo"
                  width={150}
                  height={40}
                  priority
                />
              </Link>
            </div>
            <p className="text-gray-700 mb-6">
              HoloCAN是连接中国与加拿大企业的智能贸易平台，通过AI匹配和虚拟展示技术，破除贸易壁垒，创造商业机会。
            </p>
            <div className="flex space-x-4">
              <a 
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="#"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="WeChat"
              >
                <FaWeixin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Virtual Exhibition', 'AI Matching', 'Business Connection', 'About Us'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {['Business Matching', 'Virtual Exhibition', 'Cross-border Logistics', 'Legal Support', 'Financing Connection', 'Market Analysis'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-text-secondary hover:text-primary transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 mr-3" />
                <div className="text-sm text-text-secondary">
                  <p>Canada Office: Financial District, Toronto, Ontario</p>
                  <p className="mt-1">China Office: Chaoyang District, Beijing, China</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary mr-3" />
                <span className="text-sm text-text-secondary">+1 (416) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-3" />
                <span className="text-sm text-text-secondary">contact@holocan.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} HoloCAN. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-xs text-text-secondary">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 