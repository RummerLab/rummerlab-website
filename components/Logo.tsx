import Image from "next/image"

export default function Logo() {
    return (
        <section className="w-full mx-auto">
            <div className="relative w-[200px] h-[200px] mx-auto">
                <Image
                    className="dark:brightness-0 dark:invert"
                    src="/images/rummerlab_logo_transparent.png"
                    fill
                    style={{ objectFit: 'contain' }}
                    alt="RummerLab Logo"
                    priority={true}
                />
            </div>
        </section>
    )
}