/**
 * The one react-dom API this site calls from a server component, typed by hand
 * because the project does not depend on @types/react-dom. If that package is ever
 * added, delete this file: its own `preload` declaration supersedes this one.
 */
declare module "react-dom" {
  export function preload(
    href: string,
    options: { as: "font" | "image" | "script" | "style"; type?: string; crossOrigin?: string },
  ): void;
}
