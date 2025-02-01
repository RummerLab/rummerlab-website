"use client";

import React, { useState, useEffect } from 'react';
import { FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Get in touch with the Rummer Lab team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <section className="bg-white rounded-lg shadow-xs p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start space-x-4">
              <FaEnvelope className="text-blue-600 h-6 w-6 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <a href="mailto:jodie.rummer@rummerlab.com" className="text-blue-600 hover:text-blue-800">
                  jodie.rummer@rummerlab.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-4">
              <FaMapMarkerAlt className="text-blue-600 h-6 w-6 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900">Location</h3>
                <p className="text-gray-600">
                  James Cook University<br />
                  Townsville, Queensland<br />
                  Australia
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://twitter.com/physiologyfish"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-500 hover:text-blue-400 transition-colors"
                >
                  <FaTwitter className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/rummerlab/"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-500 hover:text-pink-500 transition-colors"
                >
                  <FaInstagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.youtube.com/@Physioshark"
                  target="_blank"
                  rel="noopener"
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <FaYoutube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Contact Form */}
        <section className="bg-white rounded-lg shadow-xs p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isLoading}
              />
            </div>

            {submitStatus === 'success' && (
              <div className="text-green-600 text-sm">
                Message sent successfully! We&apos;ll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="text-red-600 text-sm">
                Failed to send message. Please try again or email us directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md transition-colors duration-200 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </section>
      </div>

      {/* Map Section */}
      <section className="mt-12 bg-white rounded-lg shadow-xs p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Location</h2>
        <div className="aspect-w-16 aspect-h-9">
          {isMounted && (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14678292.975656847!2d123.20973833833085!3d-24.992915322526945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6bd5fa65f3557291%3A0xa7901f3d26c63dba!2sJCU%3A%20James%20Cook%20University%2C%20Australia%2C%20Townsville%2C%20Bebegu%20Yumba%20campus%2C%20Douglas!5e0!3m2!1sen!2sau!4v1707372547375!5m2!1sen!2sau"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            />
          )}
          {!isMounted && (
            <div className="w-full h-[450px] bg-gray-100 rounded-lg animate-pulse" />
          )}
        </div>
      </section>
    </div>
  );
} 
