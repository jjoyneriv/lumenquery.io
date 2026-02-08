'use client';

interface RiskBadgeProps {
  score: 'low' | 'medium' | 'high';
  factors?: {
    authRequired: boolean;
    authRevocable: boolean;
    authClawback: boolean;
    authImmutable: boolean;
  };
  showTooltip?: boolean;
}

export function RiskBadge({ score, factors, showTooltip = true }: RiskBadgeProps) {
  const colors = {
    low: 'bg-green-100 text-green-800 border-green-200',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    high: 'bg-red-100 text-red-800 border-red-200',
  };

  const labels = {
    low: 'Low Risk',
    medium: 'Medium Risk',
    high: 'High Risk',
  };

  const getTooltipText = () => {
    if (!factors) return '';
    const risks: string[] = [];
    if (factors.authImmutable) {
      risks.push('Flags are immutable (locked)');
    } else {
      if (factors.authClawback) risks.push('Clawback enabled');
      if (factors.authRevocable) risks.push('Authorization revocable');
      if (factors.authRequired) risks.push('Authorization required');
    }
    return risks.length > 0 ? risks.join(', ') : 'No special flags';
  };

  return (
    <div className="relative group inline-block">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[score]}`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
            score === 'low' ? 'bg-green-500' : score === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
          }`}
        />
        {labels[score]}
      </span>
      {showTooltip && factors && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
          {getTooltipText()}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
}
