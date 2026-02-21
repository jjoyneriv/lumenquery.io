// ===========================================
// Wallet Library Exports
// ===========================================

// Types
export * from './types';

// Freighter integration
export {
  isFreighterInstalled,
  isFreighterAllowed,
  connectFreighter,
  getFreighterPublicKey,
  getFreighterNetwork,
  signWithFreighter,
  isCorrectNetwork,
  formatPublicKey,
} from './freighter';
