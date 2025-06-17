import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

// Tabs Container
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value, onValueChange, defaultValue, orientation = 'horizontal', ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || defaultValue || '')

    const currentValue = value !== undefined ? value : internalValue

    const handleValueChange = (newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-col',
          className
        )}
        data-orientation={orientation}
        data-value={currentValue}
        {...props}
      >
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === TabsList || child.type === TabsTrigger) {
              return React.cloneElement(child, {
                // @ts-ignore
                value: currentValue,
                onValueChange: handleValueChange,
              })
            }
            if (child.type === TabsContent) {
              return React.cloneElement(child, {
                // @ts-ignore
                currentValue: currentValue,
              })
            }
            return child
          }
          return child
        })}
      </div>
    )
  }
)
Tabs.displayName = 'Tabs'

// Tabs List
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  onValueChange?: (value: string) => void
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, value, onValueChange, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
          className
        )}
        {...props}
      >
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            if (child.type === TabsTrigger) {
              return React.cloneElement(child, {
                // @ts-ignore
                currentValue: value,
                onValueChange,
              })
            }
            return child
          }
          return child
        })}
      </div>
    )
  }
)
TabsList.displayName = 'TabsList'

// Tabs Trigger
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  currentValue?: string
  onValueChange?: (value: string) => void
  asChild?: boolean
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, currentValue, onValueChange, asChild = false, ...props }, ref) => {
    const isActive = currentValue === value

    const handleClick = () => {
      onValueChange?.(value)
    }

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          isActive
            ? 'bg-background text-foreground shadow-sm border border-border'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
          className
        )}
        onClick={handleClick}
        data-state={isActive ? 'active' : 'inactive'}
        {...props}
      />
    )
  }
)
TabsTrigger.displayName = 'TabsTrigger'

// Tabs Content
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  currentValue?: string
  forceMount?: boolean
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, currentValue, forceMount = false, ...props }, ref) => {
    const isActive = currentValue === value

    console.log('isActive', isActive)

    if (!isActive && !forceMount) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          !isActive && 'hidden',
          className
        )}
        data-state={isActive ? 'active' : 'inactive'}
        {...props}
      >
        {props.children}
      </div>
    )
  }
)
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent } 