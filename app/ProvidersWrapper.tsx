"use client";
import { SessionProvider } from "next-auth/react"

import { ReactNode } from "react";

interface Props {
    children?: ReactNode
    // any props that come into the component
}


export default function ProvidersWrapper({ children }:Props) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
