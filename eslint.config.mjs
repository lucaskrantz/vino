import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "dist/**",
    "coverage/**",
    ".venv/**",
    "data/**",
    "htmlcov/**",
    "reports/**",
    "next-env.d.ts",
    "src/vino_animals/**",
  ]),
]);
