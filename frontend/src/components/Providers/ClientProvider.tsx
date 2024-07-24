"use client";

import client from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { useTheme } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ToasterProps } from "sonner";
import { AlertTriangle, CheckCircle, Info, Loader, XCircle } from "lucide-react";

export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme = "system" } = useTheme();
  return (
    <ApolloProvider client={client}>
      <Toaster
        theme={theme as ToasterProps["theme"]}
        icons={{
          success: <CheckCircle className="h-4 w-4 text-green-500" />,
          info: <Info className="h-4 w-4 text-blue-500" />,
          warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
          error: <XCircle className="h-4 w-4 text-red-500" />,
          loading: <Loader className="h-4 w-4 text-gray-500 animate-spin" />,
        }}
      />
      {children}
    </ApolloProvider>
  );
}
