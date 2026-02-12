import { rulesEngine } from '../rules-engine';
import { velocityEvaluator } from './velocity-evaluator';
import { volumeEvaluator } from './volume-evaluator';
import { sanctionsEvaluator } from './sanctions-evaluator';
import { circularPaymentEvaluator } from './circular-payment-evaluator';
import { mixerEvaluator } from './mixer-evaluator';
import { structuringEvaluator } from './structuring-evaluator';
import { counterpartyEvaluator } from './counterparty-evaluator';
import { patternEvaluator } from './pattern-evaluator';
import { contractAbuseEvaluator } from './contract-abuse-evaluator';

// Register all evaluators with the rules engine
export function registerEvaluators(): void {
  rulesEngine.registerEvaluator(velocityEvaluator);
  rulesEngine.registerEvaluator(volumeEvaluator);
  rulesEngine.registerEvaluator(sanctionsEvaluator);
  rulesEngine.registerEvaluator(circularPaymentEvaluator);
  rulesEngine.registerEvaluator(mixerEvaluator);
  rulesEngine.registerEvaluator(structuringEvaluator);
  rulesEngine.registerEvaluator(counterpartyEvaluator);
  rulesEngine.registerEvaluator(patternEvaluator);
  rulesEngine.registerEvaluator(contractAbuseEvaluator);
}

// Export individual evaluators for direct use
export {
  velocityEvaluator,
  volumeEvaluator,
  sanctionsEvaluator,
  circularPaymentEvaluator,
  mixerEvaluator,
  structuringEvaluator,
  counterpartyEvaluator,
  patternEvaluator,
  contractAbuseEvaluator,
};
