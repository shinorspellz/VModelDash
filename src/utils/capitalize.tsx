import React from "react";
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatString(inputString: string) {
  // Capitalize the first letter
  const capitalizedString =
    inputString.charAt(0).toUpperCase() + inputString.slice(1);

  // Replace underscores with spaces
  const formattedString = capitalizedString.replace(/_/g, " ");

  return formattedString;
}
