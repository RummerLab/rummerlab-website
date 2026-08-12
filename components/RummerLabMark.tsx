import Image from 'next/image'

interface RummerLabMarkProps {
    className?: string
    imageClassName?: string
}

export function RummerLabMark({ className, imageClassName }: RummerLabMarkProps) {
    return (
        <span className={['inline-flex items-center', className].filter(Boolean).join(' ')}>
            <Image
                src="/RummerLab_icon.svg"
                alt=""
                width={261}
                height={123}
                unoptimized
                className={imageClassName ?? 'h-full w-auto'}
            />
        </span>
    )
}
