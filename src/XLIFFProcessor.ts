// This file is based on textlint-plugin-markdown (Author: azu)
import type { TextlintPluginOptions } from "@textlint/types";

export class XLIFFProcessor {
  config: TextlintPluginOptions;

  constructor(config = {}) {
    this.config = config;
  }

  availableExtensions() {
    return [".xlf"];
  }

  processor(_ext: string) {
    return {
      async preProcess(text: string, _filePath?: string) {
        const { parse } = await import("./xliff-to-ast/parser.mjs");
        return parse(text);
      },
      postProcess(messages: string[], filePath?: string) {
        return {
          messages,
          filePath: filePath ? filePath : "<xml>",
        };
      },
    };
  }
}
