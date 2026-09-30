import Image from 'next/image'

interface RummerLabMarkProps {
    className?: string
    imageClassName?: string
}

export function RummerLabMark({ className, imageClassName }: RummerLabMarkProps) {
    return (
        <span className={['inline-flex shrink-0 items-center', className].filter(Boolean).join(' ')}>
            <Image
                src="/RummerLab_icon.svg"
                alt=""
                width={261}
                height={123}
                unoptimized
                className={['max-w-none shrink-0', imageClassName ?? 'h-full w-auto'].filter(Boolean).join(' ')}
            />
        </span>
    )
}
