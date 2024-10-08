import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// 1. Define the loader function
export const loader = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  const json = JSON.stringify(data, null, 2);
  //console.log(data);
  // Return the data using the `json` helper
  return json;
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {

  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
            <nav style={{
              width : "100%", 
              display : "flex",
              backgroundColor : "pink",
              }}> 
              <Link style={{flex : 1}} to="/users"> USUARIOS </Link>
              <Link style={{flex : 1}} to="/coments"> COMENTARIOS </Link> 
              <Link style={{flex : 1}} to="/posts"> POSTS </Link> 
            </nav>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
