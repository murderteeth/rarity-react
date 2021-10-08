export function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const fetcher = async (input: RequestInfo, init: RequestInit) => await fetch(input, init).then(res => res.json());

export const chunk = (arr: any[], size: number) => arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);
