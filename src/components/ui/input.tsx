import * as React from 'react'
import { cn } from '@/lib/utils'

function Input({ className, type = 'text', ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'placeholder:text-black/50 selection:bg-white selection:text-black border-blue h-9 w-full min-w-0 border bg-transparent px-3 py-1 text-black transition-[color,box-shadow] outline-none',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
