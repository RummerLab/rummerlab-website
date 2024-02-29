import Link from 'next/link';

export default function JoinOurLab() {
  return (
    <div>
      <h1 className="mt-12 mb-12 text-3xl text-center dark:text-white">Join Our Team!</h1>
      <p>
        Are you interested in joining our lab? Fill this Google Form to apply:&nbsp;
        <Link href="https://forms.gle/DDEBnssQk5ZQZgB98" className="text-blue-500 hover:underline cursor-pointer">Google Form</Link>
      </p>
    </div>
  );
};

