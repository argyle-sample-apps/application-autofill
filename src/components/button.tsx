import { forwardRef, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  as?: React.ElementType
  disabled?: boolean
  green?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

/*  eslint-disable @typescript-eslint/no-empty-function */
export const Button = forwardRef(
  (
    {
      onClick,
      href,
      children,
      as = 'button',
      disabled = false,
      green = false,
    }: ButtonProps,
    ref
  ) => {
    const Element = as
    return (
      <Element
        href={href}
        onClick={disabled ? () => {} : onClick}
        ref={ref}
        className={clsx('mt-20 block w-full py-3 px-6 text-xl', {
          'opacity-30': disabled,
          'bg-green text-white': green,
          'bg-black text-white': !green && !disabled,
        })}
        disabled={disabled}
      >
        {children}
      </Element>
    )
  }
)

Button.displayName = 'Button'
