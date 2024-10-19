// app/utils/contracts.js

import GyanPlatformContract from '../artifacts/GyanPlatform.json';

export const GYAN_PLATFORM_ADDRESS = process.env.NEXT_PUBLIC_GYAN_PLATFORM_ADDRESS;
export const GyanPlatformABI = GyanPlatformContract.abi;
