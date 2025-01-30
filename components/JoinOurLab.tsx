"use client";
import Link from 'next/link';
import React from "react";
import { Button } from "./ui/moving-border";

export default function JoinOurLab() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mt-12 mb-12 text-3xl text-center dark:text-white">Join Our Team!</h1>
      <p className="text-center mb-6">
        Are you interested in joining our lab? Fill this Google Form to apply:
      </p>
      <Link href="https://forms.gle/DDEBnssQk5ZQZgB98" className="text-blue-500 hover:underline cursor-pointer">
        <Button
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 hover:bg-neutral-100 dark:hover:bg-slate-800 hover:border-neutral-300 dark:hover:border-slate-700 hover:text-black dark:hover:text-white transition-colors duration-150 ease-in-out"
        >
          APPLY NOW
        </Button>
      </Link>
    </div>
  );
};