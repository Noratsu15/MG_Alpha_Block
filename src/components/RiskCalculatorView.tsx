import React, { useState, useEffect } from 'react';
import { SYNTHETIC_ASSETS, calculateSyntheticRisk, formatPrice, formatUSD } from '../utils/syntheticMath';
import { SyntheticAssetSpec, TradingSignal } from '../types';
import { 
  Calculator, AlertTriangle, ShieldCheck, DollarSign, 
  Percent, ArrowRight, Info, Check, RefreshCw, Zap
} from 'lucide-react';

interface RiskCalculatorViewProps {
  initialSignal?: TradingSignal | null;
  onClearInitialSignal?: () => void;
}

export const RiskCalculatorView: React.FC<RiskCalculatorViewProps> = ({
  initialSignal,
  onClearInitialSignal
}) => {
  // Selected asset
  const [selectedSymbol, setSelectedSymbol] = useState<string>(
    initialSignal ? (
      initialSignal.asset.includes('300') ? (initialSignal.asset.includes('Crash') ? 'CRASH_300' : 'BOOM_300') :
      initialSignal.asset.includes('500') ? (initialSignal.asset.includes('Crash') ? 'CRASH_500' : 'BOOM_500') :
      initialSignal.asset.includes('1000') ? (initialSignal.asset.includes('Crash') ? 'CRASH_1000' : 'BOOM_1000') :
      initialSignal.asset.includes('75') ? 'VOL_75' :
      initialSignal.asset.includes('100') ? 'VOL_100' :
      initialSignal.asset.includes('Step') ? 'STEP_INDEX' : 'CRASH_300'
    ) : 'CRASH_300'
  );

  const selectedAsset: SyntheticAssetSpec = SYNTHETIC_ASSETS.find(a => a.symbol === selectedSymbol) || SYNTHETIC_ASSETS[0];

  // Inputs
  const [balance, setBalance] = useState<number>(2500);
  const [riskMode, setRiskMode] = useState<'PERCENT' | 'USD'>('PERCENT');
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [riskUSD, setRiskUSD] = useState<number>(25);

  const [entryPrice, setEntryPrice] = useState<number>(
    initialSignal ? initialSignal.entryPrice : 2845.50
  );
  const [stopLossPrice, setStopLossPrice] = useState<number>(
    initialSignal ? initialSignal.stopLoss : 2860.50
  );
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(
    initialSignal ? initialSignal.takeProfit1 : 2800.50
  );

  // If initialSignal was passed, apply its values
  useEffect(() => {
    if (initialSignal) {
      setEntryPrice(initialSignal.entryPrice);
      setStopLossPrice(initialSignal.stopLoss);
      if (initialSignal.takeProfit1) {
        setTakeProfitPrice(initialSignal.takeProfit1);
      }
    }
  }, [initialSignal]);

  // Determine effective risk amount in USD
  const effectiveRiskUSD = riskMode === 'PERCENT' ? (balance * riskPercent) / 100 : riskUSD;

  // Run calculation engine
  const result = calculateSyntheticRisk(
    balance,
    effectiveRiskUSD,
    entryPrice,
    stopLossPrice,
    selectedAsset,
    takeProfitPrice
  );

  // Quick preset helper
  const handleSetPresetBalance = (amount: number) => {
    setBalance(amount);
  };

  const handleSetRiskPreset = (pct: number) => {
    setRiskMode('PERCENT');
    setRiskPercent(pct);
  };

  const handleApplyRRRatio = (ratio: number) => {
    const slDist = Math.abs(entryPrice - stopLossPrice);
    if (slDist <= 0) return;
    
    // Check if buy or sell
    const isSell = stopLossPrice > entryPrice;
    if (isSell) {
      setTakeProfitPrice(Number((entryPrice - (slDist * ratio)).toFixed(selectedAsset.tickSize < 0.01 ? 3 : 2)));
    } else {
      setTakeProfitPrice(Number((entryPrice + (slDist * ratio)).toFixed(selectedAsset.tickSize < 0.01 ? 3 : 2)));
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title & Import Signal Notification */}
      <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Calculadora Especializada de Lotaje & Riesgo (Deriv)
            </h1>
            <p className="text-xs text-slate-400">
              Calibrada con las fórmulas exactas de valor de punto y lotaje mínimo de índices sintéticos.
            </p>
          </div>
        </div>

        {initialSignal && (
          <div className="flex items-center gap-2 p-2 px-3 rounded-lg bg-blue-950/70 border border-blue-700/60 text-xs text-blue-300">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Datos cargados desde la señal: <strong>{initialSignal.asset}</strong></span>
            {onClearInitialSignal && (
              <button 
                onClick={onClearInitialSignal}
                className="ml-2 text-slate-400 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Form Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Step 1: Asset Selection & Specs */}
          <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                <span>01. Selecciona el Índice Sintético</span>
              </label>
              <span className="text-[11px] font-mono text-blue-400">
                Paso de lote: {selectedAsset.lotStep}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SYNTHETIC_ASSETS.map((asset) => {
                const isSelected = asset.symbol === selectedSymbol;
                return (
                  <button
                    key={asset.symbol}
                    onClick={() => {
                      setSelectedSymbol(asset.symbol);
                    }}
                    className={`p-2.5 rounded-lg text-left border transition-all text-xs ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white font-medium shadow-md shadow-blue-900/20'
                        : 'bg-[#0A0E17] border-[#1F2937] text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-semibold">{asset.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Lote Mín: <span className="text-slate-400 font-semibold">{asset.minLot}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-2.5 rounded-lg bg-[#0A0E17] border border-[#1F2937] flex items-center gap-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{selectedAsset.description}</span>
            </div>
          </div>

          {/* Step 2: Account Capital & Risk Budget */}
          <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono block">
              02. Capital de Cuenta & Tolerancia de Riesgo
            </label>

            {/* Balance Input & Presets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Balance de la Cuenta ($USD):</span>
                <span className="font-mono text-white font-semibold tabular-nums">{formatUSD(balance)}</span>
              </div>
              <div className="relative">
                <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={balance}
                  onChange={(e) => setBalance(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-[#0A0E17] border border-[#1F2937] focus:border-blue-500 rounded-lg pl-9 pr-3 py-2 text-sm text-white font-mono"
                />
              </div>

              {/* Quick presets for common synthetic accounts and funded challenges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-slate-500 mr-1 font-mono">Presets:</span>
                {[
                  { label: '$100 Reto', val: 100 },
                  { label: '$500 Growth', val: 500 },
                  { label: '$1,000 Pro', val: 1000 },
                  { label: '$5,000 Fondeo', val: 5000 },
                  { label: '$10,000 Challenge', val: 10000 }
                ].map((preset) => (
                  <button
                    key={preset.val}
                    type="button"
                    onClick={() => handleSetPresetBalance(preset.val)}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                      balance === preset.val
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-800/80 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Mode Switcher */}
            <div className="pt-3 border-t border-[#1F2937] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Modo de Asignación de Riesgo:</span>
                <div className="flex items-center gap-1 bg-[#0A0E17] p-1 rounded-lg border border-[#1F2937] text-xs">
                  <button
                    type="button"
                    onClick={() => setRiskMode('PERCENT')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      riskMode === 'PERCENT' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400'
                    }`}
                  >
                    Porcentaje (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRiskMode('USD')}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      riskMode === 'USD' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400'
                    }`}
                  >
                    Monto Fijo ($USD)
                  </button>
                </div>
              </div>

              {riskMode === 'PERCENT' ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Porcentaje a arriesgar:</span>
                    <span className="font-mono text-emerald-400 font-bold tabular-nums">
                      {riskPercent}% = {formatUSD(effectiveRiskUSD)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.25"
                    max="5.0"
                    step="0.25"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex items-center gap-1.5">
                    {[0.5, 1.0, 1.5, 2.0, 3.0].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => handleSetRiskPreset(pct)}
                        className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                          riskPercent === pct
                            ? 'bg-blue-600 text-white font-semibold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Monto fijo en dólares:</span>
                    <span className="font-mono text-emerald-400 font-bold tabular-nums">
                      {formatUSD(riskUSD)} ({(balance > 0 ? (riskUSD / balance) * 100 : 0).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      min="1"
                      step="5"
                      value={riskUSD}
                      onChange={(e) => setRiskUSD(Math.max(1, parseFloat(e.target.value) || 0))}
                      className="w-full bg-[#0A0E17] border border-[#1F2937] focus:border-blue-500 rounded-lg pl-9 pr-3 py-2 text-sm text-white font-mono"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Step 3: Trade Coordinates (Entry, SL, TP) */}
          <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                03. Coordenadas del Trade (Precios)
              </label>
              <span className="text-[11px] font-mono text-slate-500">
                Distancia SL: <strong className="text-rose-400 font-semibold tabular-nums">{result.pointsAtRisk} pts</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-400 mb-1 block font-mono text-[11px]">Precio de Entrada</label>
                <input
                  type="number"
                  step="any"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0A0E17] border border-[#1F2937] focus:border-blue-500 rounded-lg p-2.5 text-white font-mono text-xs tabular-nums"
                />
              </div>

              <div>
                <label className="text-rose-400 mb-1 block font-mono text-[11px]">Stop Loss (SL)</label>
                <input
                  type="number"
                  step="any"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0A0E17] border border-rose-900/60 focus:border-rose-500 rounded-lg p-2.5 text-rose-300 font-mono text-xs tabular-nums"
                />
              </div>

              <div>
                <label className="text-emerald-400 mb-1 block font-mono text-[11px]">Take Profit (TP)</label>
                <input
                  type="number"
                  step="any"
                  value={takeProfitPrice}
                  onChange={(e) => setTakeProfitPrice(parseFloat(e.target.value) || 0)}
                  className="w-full bg-[#0A0E17] border border-emerald-900/60 focus:border-emerald-500 rounded-lg p-2.5 text-emerald-300 font-mono text-xs tabular-nums"
                />
              </div>
            </div>

            {/* Quick R:R Preset Buttons */}
            <div className="flex items-center gap-1.5 pt-2">
              <span className="text-[11px] text-slate-500 font-mono mr-1">Calcular TP por ratio:</span>
              {[1.5, 2, 3, 5].map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => handleApplyRRRatio(ratio)}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  1:{ratio}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column: Mathematical Output & Safety Dashboard (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Main Sizing Result Card */}
          <div className="p-6 rounded-xl bg-gradient-to-b from-[#111827] to-[#0D131F] border border-blue-500/40 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2937]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-semibold block">
                  Resultado de la Frmula Deriv
                </span>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  TAMAO DE LOTE SUGERIDO
                </h3>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            {/* Prominent Lot Size Display */}
            <div className="text-center py-4 bg-[#0A0E17] rounded-xl border border-[#1F2937]">
              <span className="text-xs text-slate-400 font-mono uppercase block mb-1">
                Lote a colocar en MT5
              </span>
              <div className="text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                {result.lotSize}
              </div>
              <span className="text-[11px] text-slate-500 font-mono mt-1 block">
                Mín: {selectedAsset.minLot} · Máx: {selectedAsset.maxLot}
              </span>
            </div>

            {/* Breakdown Coordinates Grid */}
            <div className="space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0A0E17]/60 border border-[#1F2937]">
                <span className="text-slate-400">Pérdida si toca Stop Loss:</span>
                <span className="text-rose-400 font-bold tabular-nums">
                  -{formatUSD(result.actualRiskUSD)} ({result.riskPercentage}%)
                </span>
              </div>

              {result.potentialRewardUSD !== undefined && (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0A0E17]/60 border border-[#1F2937]">
                  <span className="text-slate-400">Ganancia si toca Take Profit:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    +{formatUSD(result.potentialRewardUSD)}
                  </span>
                </div>
              )}

              {result.rewardRiskRatio !== undefined && (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#0A0E17]/60 border border-[#1F2937]">
                  <span className="text-slate-400">Ratio Beneficio / Riesgo:</span>
                  <span className="text-blue-400 font-bold tabular-nums">
                    1:{result.rewardRiskRatio}
                  </span>
                </div>
              )}
            </div>

            {/* Visual Risk vs Reward Bar */}
            {result.potentialRewardUSD !== undefined && result.actualRiskUSD > 0 && (
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span className="text-rose-400">Riesgo: {formatUSD(result.actualRiskUSD)}</span>
                  <span className="text-emerald-400">Retorno: {formatUSD(result.potentialRewardUSD)}</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-rose-500 h-full"
                    style={{ 
                      width: `${Math.min(50, (result.actualRiskUSD / (result.actualRiskUSD + result.potentialRewardUSD)) * 100)}%` 
                    }}
                  />
                  <div 
                    className="bg-emerald-500 h-full flex-1"
                  />
                </div>
              </div>
            )}

            {/* Smart Warnings or Safeguards */}
            {result.warningMessage && (
              <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{result.warningMessage}</span>
              </div>
            )}

            {result.riskPercentage > 3.0 && (
              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 flex items-start gap-2.5 text-xs text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  <strong>Riesgo Elevado:</strong> Estás arriesgando {result.riskPercentage}% de tu capital. En índices sintéticos se recomienda mantener el riesgo entre 0.5% y 1.5% para proteger la cuenta.
                </span>
              </div>
            )}

          </div>

          {/* Quick Deriv Specification Reference Sheet */}
          <div className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Ficha Técnica del Activo ({selectedAsset.name})
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-[#0A0E17] border border-[#1F2937]">
                <span className="text-[10px] text-slate-500 block">Lote Mínimo</span>
                <span className="text-white font-semibold">{selectedAsset.minLot}</span>
              </div>
              <div className="p-2 rounded bg-[#0A0E17] border border-[#1F2937]">
                <span className="text-[10px] text-slate-500 block">Lote Máximo</span>
                <span className="text-white font-semibold">{selectedAsset.maxLot}</span>
              </div>
              <div className="p-2 rounded bg-[#0A0E17] border border-[#1F2937]">
                <span className="text-[10px] text-slate-500 block">Valor por Punto</span>
                <span className="text-white font-semibold">${selectedAsset.pointValue}.00 / lote</span>
              </div>
              <div className="p-2 rounded bg-[#0A0E17] border border-[#1F2937]">
                <span className="text-[10px] text-slate-500 block">Tamaño del Tick</span>
                <span className="text-white font-semibold">{selectedAsset.tickSize}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
