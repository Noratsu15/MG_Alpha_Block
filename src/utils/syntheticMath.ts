import { SyntheticAssetSpec } from '../types';

export const SYNTHETIC_ASSETS: SyntheticAssetSpec[] = [
  {
    symbol: 'CRASH_300',
    name: 'Crash 300 Index',
    category: 'BOOM_CRASH',
    minLot: 0.50,
    maxLot: 25.0,
    lotStep: 0.01,
    pointValue: 1.0,
    tickSize: 0.001,
    description: 'Caídas bruscas cada 300 tics promedio. Alta velocidad y spikes pronunciados.',
    defaultSlPoints: 12.0
  },
  {
    symbol: 'CRASH_500',
    name: 'Crash 500 Index',
    category: 'BOOM_CRASH',
    minLot: 0.20,
    maxLot: 50.0,
    lotStep: 0.01,
    pointValue: 1.0,
    tickSize: 0.001,
    description: 'Caídas cada 500 tics promedio. Ideal para Price Action y Order Blocks.',
    defaultSlPoints: 18.0
  },
  {
    symbol: 'CRASH_1000',
    name: 'Crash 1000 Index',
    category: 'BOOM_CRASH',
    minLot: 0.20,
    maxLot: 50.0,
    lotStep: 0.01,
    pointValue: 1.0,
    tickSize: 0.001,
    description: 'El clásico de caídas. Movimientos limpios y estructuras macro predecibles.',
    defaultSlPoints: 25.0
  },
  {
    symbol: 'BOOM_300',
    name: 'Boom 300 Index',
    category: 'BOOM_CRASH',
    minLot: 0.50,
    maxLot: 25.0,
    lotStep: 0.01,
    pointValue: 1.0,
    tickSize: 0.001,
    description: 'Spikes alcistas explosivos cada 300 tics. Exige gestión de riesgo milimétrica.',
    defaultSlPoints: 15.0
  },
  {
    symbol: 'BOOM_500',
    name: 'Boom 500 Index',
    category: 'BOOM_CRASH',
    minLot: 0.20,
    maxLot: 50.0,
    lotStep: 0.01,
    pointValue: 1.0,
    tickSize: 0.001,
    description: 'Equilibrio perfecto entre frecuencia de spikes y tendencias de retroceso.',
    defaultSlPoints: 20.0
  },
  {
    symbol: 'BOOM_1000',
    name: 'Boom 1000 Index',
    category: 'BOOM_CRASH',
    minLot: 0.20,
    maxLot: 50.0,
    lotStep: 0.01,
    pointValue: 1.0,
    tickSize: 0.001,
    description: 'Rango amplio y spikes limpios en confluencia con Fair Value Gaps (FVG).',
    defaultSlPoints: 30.0
  },
  {
    symbol: 'VOL_75',
    name: 'Volatility 75 Index',
    category: 'VOLATILITY',
    minLot: 0.001,
    maxLot: 20.0,
    lotStep: 0.001,
    pointValue: 1.0,
    tickSize: 0.01,
    description: 'Volatilidad constante al 75%. El rey del scalping y swing con lotes micro.',
    defaultSlPoints: 850.0
  },
  {
    symbol: 'VOL_75_1S',
    name: 'Volatility 75 (1s) Index',
    category: 'VOLATILITY',
    minLot: 0.005,
    maxLot: 20.0,
    lotStep: 0.001,
    pointValue: 1.0,
    tickSize: 0.01,
    description: 'Generación de velas cada 1 segundo con volatilidad continua.',
    defaultSlPoints: 600.0
  },
  {
    symbol: 'VOL_100',
    name: 'Volatility 100 Index',
    category: 'VOLATILITY',
    minLot: 0.20,
    maxLot: 50.0,
    lotStep: 0.01,
    pointValue: 1.0,
    tickSize: 0.01,
    description: 'Máxima volatilidad del mercado continuo. Gran expansión de rangos diarios.',
    defaultSlPoints: 45.0
  },
  {
    symbol: 'STEP_INDEX',
    name: 'Step Index',
    category: 'STEP',
    minLot: 0.10,
    maxLot: 50.0,
    lotStep: 0.10,
    pointValue: 10.0,
    tickSize: 0.1,
    description: 'Pasos fijos de 0.1 con probabilidad constante. Excelente para grid y quiebres.',
    defaultSlPoints: 12.0
  }
];

export interface CalculationResult {
  lotSize: number;
  actualRiskUSD: number;
  riskPercentage: number;
  pointsAtRisk: number;
  isLotCapped: boolean;
  isBelowMinLot: boolean;
  potentialRewardUSD?: number;
  rewardRiskRatio?: number;
  tpPoints?: number;
  warningMessage?: string;
}

export function calculateSyntheticRisk(
  balance: number,
  riskAmount: number,
  entryPrice: number,
  stopLossPrice: number,
  asset: SyntheticAssetSpec,
  takeProfitPrice?: number
): CalculationResult {
  const pointsAtRisk = Math.abs(entryPrice - stopLossPrice);

  if (pointsAtRisk <= 0) {
    return {
      lotSize: asset.minLot,
      actualRiskUSD: 0,
      riskPercentage: 0,
      pointsAtRisk: 0,
      isLotCapped: false,
      isBelowMinLot: false,
      warningMessage: 'El Stop Loss debe ser diferente al precio de entrada.'
    };
  }

  // Raw theoretical lot size: Risk USD / (Points * PointValue)
  const rawLot = riskAmount / (pointsAtRisk * asset.pointValue);

  // Round to nearest lotStep precision
  const stepDecimals = asset.lotStep.toString().split('.')[1]?.length || 0;
  const factor = Math.pow(10, stepDecimals);
  let lotSize = Math.floor(rawLot * factor) / factor;

  let isBelowMinLot = false;
  let isLotCapped = false;
  let warningMessage: string | undefined;

  if (lotSize < asset.minLot) {
    lotSize = asset.minLot;
    isBelowMinLot = true;
    const minRisk = lotSize * pointsAtRisk * asset.pointValue;
    warningMessage = `El lote teórico (${rawLot.toFixed(4)}) es inferior al mínimo permitido (${asset.minLot}). Con el lote mínimo arriesgas $${minRisk.toFixed(2)}.`;
  } else if (lotSize > asset.maxLot) {
    lotSize = asset.maxLot;
    isLotCapped = true;
    warningMessage = `El lote calculado superó el máximo de ${asset.maxLot} del activo. Se ajustó al tope permitido.`;
  }

  const actualRiskUSD = lotSize * pointsAtRisk * asset.pointValue;
  const riskPercentage = balance > 0 ? (actualRiskUSD / balance) * 100 : 0;

  let potentialRewardUSD: number | undefined;
  let rewardRiskRatio: number | undefined;
  let tpPoints: number | undefined;

  if (takeProfitPrice && takeProfitPrice > 0) {
    tpPoints = Math.abs(takeProfitPrice - entryPrice);
    potentialRewardUSD = lotSize * tpPoints * asset.pointValue;
    if (actualRiskUSD > 0) {
      rewardRiskRatio = Number((potentialRewardUSD / actualRiskUSD).toFixed(2));
    }
  }

  return {
    lotSize: Number(lotSize.toFixed(stepDecimals)),
    actualRiskUSD: Number(actualRiskUSD.toFixed(2)),
    riskPercentage: Number(riskPercentage.toFixed(2)),
    pointsAtRisk: Number(pointsAtRisk.toFixed(stepDecimals > 2 ? 3 : 2)),
    isLotCapped,
    isBelowMinLot,
    potentialRewardUSD: potentialRewardUSD ? Number(potentialRewardUSD.toFixed(2)) : undefined,
    rewardRiskRatio,
    tpPoints: tpPoints ? Number(tpPoints.toFixed(stepDecimals > 2 ? 3 : 2)) : undefined,
    warningMessage
  };
}

/**
 * Robust input sanitization for user posts, comments, and form fields
 * Eliminates script tags, html entities injection and trims whitespace
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/on\w+=\S+/gi, '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
}

export function formatPrice(price: number, decimals: number = 2): string {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
