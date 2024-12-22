// @ts-nocheck
/* eslint-disable import/order */
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

// ESLint v9に互換性を持たせる
import { fixupPluginRules } from "@eslint/compat";

import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks"; // ReactHooksのルール
import importPlugin from "eslint-plugin-import"; // importの順序を整理
import unusedImportsPlugin from "eslint-plugin-unused-imports"; // 未使用importを削除
import jsxA11yPlugin from "eslint-plugin-jsx-a11y"; // アクセシビリティを意識したい

// prettierとの重複した警告は不要なため無効化する
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist"], // ESLint のチェック対象外 (node_modules と .git はデフォルトで対象外)
  },
  {
    files: ["**/*.{ts,tsx}"],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  jsxA11yPlugin.flatConfigs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // eslint-plugin-unused-importsに任せる
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowObjectTypes: "always" },
      ],
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": false,
          "ts-nocheck": false,
          "ts-check": false,
        },
      ],
    },
  },
  {
    // eslint-plugin-react の設定
    rules: {
      "react/destructuring-assignment": "error", // Props などの分割代入を強制
      "react/function-component-definition": [
        // コンポーネントの定義方法をアロー関数に統一
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/hook-use-state": "error", // useState の返り値の命名を [value, setValue] に統一
      "react/jsx-boolean-value": "error", // boolean 型の Props の渡し方を統一
      "react/jsx-fragments": "error", // React Fragment の書き方を統一
      "react/jsx-curly-brace-presence": "error", // Props と children で不要な中括弧を削除
      "react/jsx-no-useless-fragment": "error", // 不要な React Fragment を削除
      "react/jsx-sort-props": "error", // Props の並び順をアルファベット順に統一
      "react/self-closing-comp": "error", // 子要素がない場合は自己終了タグを使う
      "react/jsx-pascal-case": "error", // コンポーネント名をパスカルケースに統一
      "react/no-danger": "error", // dangerouslySetInnerHTML を許可しない
      "react/prop-types": "off", // Props の型チェックは TS で行う & 誤検知があるため無効化
    },
  },
  {
    // eslint-plugin-react-hooks の設定
    plugins: { "react-hooks": fixupPluginRules(reactHooksPlugin) },
    rules: {
      "react-hooks/exhaustive-deps": "error",
    },
  },
  {
    // eslint-plugin-import の設定
    plugins: { import: fixupPluginRules(importPlugin) },
    rules: {
      "import/order": [
        // import の並び順を設定
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "object",
            "type",
            "index",
          ],
          "newlines-between": "always",
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
        },
      ],
    },
  },
  {
    // eslint-plugin-unused-imports の設定
    plugins: { "unused-imports": unusedImportsPlugin },
    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  // Prettierフォーマット関連のルールを無効化。
  prettierConfig
);
