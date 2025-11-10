import Image, { type ImageProps } from 'next/image'

const FEATURE_SIZES = '(min-width: 1024px) 65vw, (min-width: 768px) 50vw, 100vw'
const SIDEBAR_WIDE_SIZES = '(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw'

type ContentImageVariant = 'feature' | 'sidebarSquare' | 'sidebarWide'

type BaseProps = Omit<ImageProps, 'src' | 'alt' | 'fill' | 'className' | 'sizes' | 'width' | 'height'> & {
  src: string
  alt: string
  variant?: ContentImageVariant
  className?: string
  sizes?: string
  width?: number
  height?: number
}

export const ContentImage = ({
  src,
  alt,
  variant = 'feature',
  className = '',
  sizes,
  ...rest
}: BaseProps) => {
  if (variant === 'sidebarSquare') {
    return (
      <Image
        {...rest}
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? '80px'}
        className={className ? `object-cover ${className}` : 'object-cover'}
      />
    )
  }

  if (variant === 'sidebarWide') {
    return (
      <Image
        {...rest}
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? SIDEBAR_WIDE_SIZES}
        className={className ? `object-cover ${className}` : 'object-cover'}
      />
    )
  }

  return (
    <Image
      {...rest}
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? FEATURE_SIZES}
      className={className ? `object-cover ${className}` : 'object-cover'}
    />
  )
}

