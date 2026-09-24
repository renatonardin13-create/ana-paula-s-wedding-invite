import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "João Carlos & Ana Paula | 07 de novembro de 2026" },
      {
        name: "description",
        content:
          "Convite de casamento de João Carlos Marques e Ana Paula Fortunato, realizado em 7 de novembro de 2026 às 20h.",
      },
      { property: "og:title", content: "João Carlos & Ana Paula | 07 de novembro de 2026" },
      {
        property: "og:description",
        content:
          "Com a bênção de Deus, convidamos você para celebrar conosco o nosso casamento em 7 de novembro de 2026 às 20h.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/src/assets/convite-final.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "João Carlos & Ana Paula | 07 de novembro de 2026" },
      {
        name: "twitter:description",
        content:
          "Convite de casamento de João Carlos Marques e Ana Paula Fortunato, realizado em 7 de novembro de 2026 às 20h.",
      },
      { name: "twitter:image", content: "/src/assets/convite-final.jpg" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Parisienne&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: 'class',
                theme: {
                  extend: {
                    colors: {
                      border: 'rgba(184, 149, 82, 0.35)',
                      input: 'rgba(184, 149, 82, 0.45)',
                      ring: '#B89552',
                      background: '#F8F5ED',
                      foreground: '#123D2C',
                      primary: {
                        DEFAULT: '#123D2C',
                        foreground: '#F8F5ED',
                      },
                      secondary: {
                        DEFAULT: '#E8DFC8',
                        foreground: '#123D2C',
                      },
                      muted: {
                        DEFAULT: '#EFE9DD',
                        foreground: '#5E7467',
                      },
                      accent: {
                        DEFAULT: '#B89552',
                        foreground: '#123D2C',
                      },
                      gold: '#B89552',
                      'gold-soft': '#E8DFC8',
                      forest: '#123D2C',
                      'forest-foreground': '#F8F5ED',
                      paper: '#F8F5ED',
                    },
                    fontFamily: {
                      display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
                      body: ['Montserrat', 'sans-serif'],
                      script: ['Parisienne', 'cursive'],
                    }
                  }
                }
              }
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              body {
                background-color: #123D2C;
                background-image: linear-gradient(rgba(18, 61, 44, 0.92), rgba(18, 61, 44, 0.92)), url('/wedding-background.jpg');
                background-size: cover;
                background-position: center;
                background-attachment: fixed;
                color: #123D2C;
                font-family: Montserrat, sans-serif;
              }
              .paper-texture {
                background-color: #F8F5ED;
              }
              .invitation-shadow {
                box-shadow: 0 24px 70px rgba(0, 0, 0, 0.4);
              }
            `,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
