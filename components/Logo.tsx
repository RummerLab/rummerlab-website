import Image from "next/image"

export default function Logo() {
    return (
        <section className="w-full mx-auto">
            <Image
                className="drop-shadow-xl shadow-black mx-auto mt-2"
                src="/images/rummerlab_logo_transparent.png"
                width={200}
                height={200}
                alt="RummerLab Logo"
                priority={true}
            />
        </section>
    )
}