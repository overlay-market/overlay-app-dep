export default function getCharactersBeforeSlash(inputString: string) {
  // Use a regular expression to match any non-space characters before a slash
  const regex = /^[^\s]*\//
  const match = inputString.match(regex)

  // If there is a match, return the characters before the slash
  if (match) {
    return match[0].slice(0, -1)
  }

  // If there is no match, return an empty string
  return ''
}
