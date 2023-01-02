import type { TextNodeRange, TxtNode, TxtNodeLineLocation, TxtParentNode } from "@textlint/ast-node-types";
import { ASTNodeTypes } from "@textlint/ast-node-types";
import type { Position } from "unist";
import { map } from "unist-util-map";
import { fromXml } from "xast-util-from-xml";
import { toXml } from "xast-util-to-xml";
import { location } from "vfile-location";

export function parse(text: string): TxtParentNode {
  const tree = fromXml(text);

  // @ts-expect-error: Suppresses the error as it does not return the expected type information.
  const ast = map(tree, (xast) => {
    if (xast.type === "root") {
      const place = location(text);
      xast.position = {
        start: place.toPoint(0),
        end: place.toPoint(text.length),
      };
    }

    if (xast.position) {
      const node: TxtNode = {
        type: getNodeType("name" in xast ? xast.name : xast.type),
        loc: getNodeLineLocation(xast.position),
        range: getTextNodeRange(xast.position),
        raw: toXml(xast),
      };

      return node;
    }
  }) as TxtParentNode;

  // Fix root node range
  ast.range = [0, text.length];

  return ast;
}

const SyntaxMap: Record<string, string> = {
  root: ASTNodeTypes.Document,
  body: ASTNodeTypes.Paragraph,
  source: ASTNodeTypes.CodeBlock,
  target: ASTNodeTypes.Paragraph,
  text: ASTNodeTypes.Str,
};

function getNodeType(data: string): string {
  return SyntaxMap[data] || ASTNodeTypes.Html;
}

function getNodeLineLocation(pos: Position): TxtNodeLineLocation {
  const loc = {
    start: {
      line: pos.start.line,
      column: Math.max(pos.start.column - 1, 0),
    },
    end: {
      line: pos.end.line,
      column: Math.max(pos.end.column - 1, 0),
    },
  };

  return loc;
}

function getTextNodeRange(pos: Position): TextNodeRange {
  const startOffset = Number(pos.start.offset);
  const endOffset = Number(pos.end.offset);

  return [startOffset, endOffset];
}
