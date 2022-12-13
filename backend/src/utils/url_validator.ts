export function urlValidator(url: string): boolean {
  // check if the url is valid
  const urlExpression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  const urlRegex = new RegExp(urlExpression);
  const matches = url.match(urlRegex);

  // there is a match and it is the only match
  if (matches && matches.length === 1 && matches[0] === url) {
    return true;
  }

  return false;
}
