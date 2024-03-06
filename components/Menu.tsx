import Link from "next/link"

export default function Menu() {
    return (
        <div className="prose prose-xl mx-auto flex justify-between flex-col sm:flex-row text-center">
            <p><Link href="/collaborators" className="text-blue-500 hover:underline cursor-pointer">Collaborators</Link></p>
            <p><Link href="/physioshark-project" className="text-blue-500 hover:underline cursor-pointer">Physioshark Project</Link></p>
            <p><Link href="/rummerlab" className="text-blue-500 hover:underline cursor-pointer">Rummerlab</Link></p>
            <p><Link href="/posts" className="text-blue-500 hover:underline cursor-pointer">Posts</Link></p>
            <p><Link href="/publications" className="text-blue-500 hover:underline cursor-pointer">Publications</Link></p>
        </div>
    )
}