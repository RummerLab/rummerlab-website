import Link from "next/link";

export default function Publications() {
    return (
        <section className="w-full mx-auto dark:background-white">
            <p>A list of our <Link href="/publications">Publications</Link>.</p>
        </section>
    )
}