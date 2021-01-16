import DOMPurify from "dompurify";

const sanitize = (html) => (process.browser ? DOMPurify.sanitize(html) : html);

export default sanitize;
