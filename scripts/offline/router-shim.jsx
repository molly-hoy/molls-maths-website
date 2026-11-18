/* ==========================================================================
   A tiny stand-in for react-router-dom, used ONLY for the "open in your
   browser" copy of the site (the offline-site folder).

   Why it exists: a page opened straight from your computer (file://...) can't
   use normal web addresses like /worksheets, so this version keeps the page
   address after a # instead, e.g. index.html#/worksheets. It offers the same
   pieces the site uses: BrowserRouter, Routes, Route, Link, NavLink,
   useLocation and useParams.

   Your real project still uses the real react-router-dom; nothing in src/
   changes.
   ========================================================================== */
import { createContext, useContext, useEffect, useState, Children, isValidElement } from "react";

const RouterCtx = createContext({ pathname: "/" });
const ParamsCtx = createContext({});

// Read the page address from the part after "#", e.g. "#/unit/3" -> "/unit/3".
const currentPath = () => (window.location.hash.replace(/^#/, "") || "/").split("?")[0];

export function BrowserRouter({ children }) {
  const [pathname, setPathname] = useState(currentPath());
  useEffect(() => {
    const onChange = () => {
      setPathname(currentPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return <RouterCtx.Provider value={{ pathname, search: "", hash: "" }}>{children}</RouterCtx.Provider>;
}

// Does "/unit/:unitId" match "/unit/5"? If so, return { unitId: "5" }.
function match(pattern, path) {
  if (pattern === "*") return {};
  const p = pattern.split("/").filter(Boolean);
  const a = path.split("/").filter(Boolean);
  if (p.length !== a.length) return null;
  const params = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(":")) params[p[i].slice(1)] = decodeURIComponent(a[i]);
    else if (p[i] !== a[i]) return null;
  }
  return params;
}

export function Routes({ children }) {
  const { pathname } = useContext(RouterCtx);
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;
    const params = match(child.props.path, pathname);
    if (params) return <ParamsCtx.Provider value={params}>{child.props.element}</ParamsCtx.Provider>;
  }
  return null;
}

export const Route = () => null;   // Routes reads its props; it never draws itself
export const useLocation = () => useContext(RouterCtx);
export const useParams = () => useContext(ParamsCtx);

export function Link({ to, children, ...rest }) {
  return <a href={"#" + to} {...rest}>{children}</a>;
}

export function NavLink({ to, end, className, children, ...rest }) {
  const { pathname } = useContext(RouterCtx);
  const isActive = end || to === "/" ? pathname === to : pathname === to || pathname.startsWith(to + "/");
  const cls = typeof className === "function" ? className({ isActive }) : className;
  return <a href={"#" + to} className={cls} aria-current={isActive ? "page" : undefined} {...rest}>{children}</a>;
}
