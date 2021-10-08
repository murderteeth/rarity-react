import { createContext } from 'react';
import { Web3 } from './Web3';
const Web3Context = createContext<Web3>({} as Web3);
export default Web3Context;