// This file is based on textlint-plugin-markdown (Author: azu)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { TextlintKernel } from "@textlint/kernel";
import { describe, expect, test } from "@jest/globals";
import NoHankakuKana from "textlint-rule-no-hankaku-kana";
import XliffPlugin from "../main";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function lintFile(filePath: string) {
  return lintText(fs.readFileSync(filePath, "utf8"), filePath);
}

function lintText(text: string, filePath = "") {
  const kernel = new TextlintKernel();
  const lintOptions = {
    filePath,
    ext: ".xlf",
    plugins: [
      {
        pluginId: "xliff",
        plugin: XliffPlugin,
      },
    ],
    rules: [{
      ruleId: "no-hankaku-kana",
      rule: NoHankakuKana,
    }],
  };

  return kernel.lintText(text, lintOptions);
}

describe("XliffPlugin", () => {
  describe("If the target file is an XLIFF", () => {
    test("textlint reports errors", async () => {
      const fixturePath = path.join(__dirname, "/sample.xlf");
      const results = await lintFile(fixturePath);
      expect(results.messages.length).toBeGreaterThan(0);
      expect(results.filePath).toBe(fixturePath);
    });
  });

  describe("If there is no file path", () => {
    test("textlint reports errors", async () => {
      const results = await lintText("<target>ﾛｰﾚﾑｲﾌﾟｻﾑ</target>");
      expect(results.messages.length).toBeGreaterThan(0);
      expect(results.filePath).toBe("<xml>");
    });
  });
});
