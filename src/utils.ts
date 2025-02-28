export const longDate = Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).format;

export const shortDate = Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "numeric",
  year: "numeric",
}).format;
