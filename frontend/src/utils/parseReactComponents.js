import React from "react";
import Link from "next/link";
import HtmlToReact from "html-to-react";

import sanitize from "./sanitize";
import cleanObj from "./cleanObj";

const htmlToReactParser = new HtmlToReact.Parser();

const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const processingInstructions = [
  // Parse home banner video
  {
    shouldProcessNode: function (node) {
      return (
        node.type === "tag" && node.name === "video" && node.attribs.class === "banner__phone-video"
      );
    },
    processNode: function (node, children) {
      return React.createElement(
        "video",
        {
          ...cleanObj(node.attribs, "autoplay", "muted", "loop", "class"),
          className: node.attribs["class"],
          autoPlay: true,
          muted: true,
          loop: true,
        },
        children
      );
    },
  },
  // Parse Links
  {
    shouldProcessNode: function (node) {
      return (
        node.type === "tag" &&
        node.name === "a" &&
        node.attribs.href?.startsWith("http://lilo.local")
      );
    },
    processNode: function (node, children) {
      const href = node.attribs.href;
      return (
        <Link href={href.replace("http://lilo.local", "")} passHref>
          <a
            {...cleanObj(node.attribs, "href", "target", "rel", "class")}
            className={node.attribs.class}
          >
            {children}
          </a>
        </Link>
      );
    },
  },
  {
    shouldProcessNode: () => true,
    processNode: processNodeDefinitions.processDefaultNode,
  },
];

const parseReactComponents = (html) =>
  process.browser
    ? htmlToReactParser.parseWithInstructions(sanitize(html), () => true, processingInstructions)
    : null;

export default parseReactComponents;
