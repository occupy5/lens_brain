import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function extractLens(text: string): string | undefined {
  const regex = /\b\w+\.lens\b/g;
  const matches = text.match(regex);
  if (matches && matches.length > 0) {
    return matches[0];
  } else {
    return undefined;
  }
}
export const getSubstring = (string: string, length = 130) => {
  if (string.length <= length) {
    return string;
  } else {
    return `${string.substring(0, length)}...`;
  }
};

export const returnIpfsPathOrUrl = (
  uri: string,
  ipfsGateway: string = "https://gateway.ipfscdn.io/ipfs"
) => {
  if (uri.startsWith("ipfs://")) {
    let result = uri.substring(7, uri.length);
    return `${ipfsGateway}/${result}`;
  } else if (uri.startsWith("ar://")) {
    let result = uri.substring(5, uri.length);
    return `https://arweave.net/${result}`;
  } else {
    return uri;
  }
};

export const formatHandleColors = (text: string) => {
  const regex = /(\w+\.lens)/g;
  const result = text.replace(regex, '<span style="background-color: #afdfe0">$1</span>');
  return result;
};