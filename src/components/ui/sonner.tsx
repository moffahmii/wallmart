"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-center"
      toastOptions={{
        className: "text-center",
      }}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 mx-auto" />,
        info: <InfoIcon className="size-4 mx-auto" />,
        warning: <TriangleAlertIcon className="size-4 mx-auto" />,
        error: <OctagonXIcon className="size-4 mx-auto" />,
        loading: <Loader2Icon className="size-4 mx-auto animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
    />

  )
}

export { Toaster }
