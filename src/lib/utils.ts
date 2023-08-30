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
  text = text.replaceAll(".lens", "");
  text = text.replace(
    /(https\S+)/g,
    `<a target="__blank" style="color: #E88185;">$1</a>`
  );
  return text.replace(
    /@(\w+)/g,
    `<a href="/profile/$1.lens" style="color: #E88185;">@$1</a>`
  );
};