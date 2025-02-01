"use client";
import Link from 'next/link';
import React from "react";
import { Button } from "./ui/moving-border";

export default function JoinOurLab() {
  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-12">
      <div className="w-full bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 leading-tight mb-6">
          Join Our Team!
        </h1>
        <p className="text-center mb-8 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Are you passionate about marine biology and conservation? We&apos;re looking for motivated researchers to join our lab.
        </p>
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
            <Link 
              href="https://forms.gle/DDEBnssQk5ZQZgB98" 
              className="relative block"
            >
              <Button
                borderRadius="0.5rem"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-blue-500 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-600 dark:hover:border-blue-300 transition-all duration-200 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                APPLY NOW
              </Button>
            </Link>
          </div>
        </div>
        <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
          Fill out our application form to get started
        </p>
      </div>
    </div>
  );
};