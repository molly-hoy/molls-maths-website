import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "/" for a normal host. For GitHub Pages in a sub-folder use e.g. "/molls-maths/".
export default defineConfig({
  plugins: [react()],
  base: "/",
});
