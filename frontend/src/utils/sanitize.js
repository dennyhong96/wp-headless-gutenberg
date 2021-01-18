import sanitizeHtml from "sanitize-html";

const sanitize = (html) =>
	process.browser
		? sanitizeHtml(html, {
				allowedAttributes: {
					a: ["href", "name", "target", "rel"],
				},
		  })
		: html;

export default sanitize;
