import React, { useState } from 'react';
import { TradingSignal, UserProfile, UserRole } from '../types';
import { 
  Radio, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, 
  Calculator, CheckCircle2, AlertTriangle, Clock, Filter, 
  Plus, Lock, Sparkles, X, Activity, Target
} from 'lucide-react';
import { formatPrice } from '../utils/syntheticMath';

interface SignalsViewProps {
  signals: TradingSignal[];
  currentUser: UserProfile;
  onSendToCalculator: (signal: TradingSignal) => void;
  onOpenSubscriptionModal: (targetRole?: UserRole) => void;
  onPublishSignal: (newSignal: Omit<TradingSignal, 'id' | 'createdAt'>) => void;
}

const ROLE_RANK: Record<UserRole, number> = {
  FREE: 1,
  TRADER_PRO: 2,
  MASTER_VIP: 3,
  ADMIN: 4
};

export const SignalsView: React.FC<SignalsViewProps> = ({
  signals,
  currentUser,
  onSendToCalculator,
  onOpenSubscriptionModal,
  onPublishSignal
}) => {
  const [categoryFilter, setCategoryFilter] = useState<'ALL' | 'BOOM_CRASH' | 'VOLATILITY' | 'STEP'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'HIT_TP' | 'CLOSED'>('ALL');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState<boolean>(false);

  // New Signal Form State (for Admin/Mentor)
  const [newAsset, setNewAsset] = useState<string>('Crash 300 Index');
  const [newAction, setNewAction] = useState<'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT'>('SELL');
  const [newEntry, setNewEntry] = useState<string>('2845.50');
  const [newSL, setNewSL] = useState<string>('2862.00');
  const [newTP1, setNewTP1] = useState<string>('2810.00');
  const [newTP2, setNewTP2] = useState<string>('2780.00');
  const [newTimeframe, setNewTimeframe] = useState<string>('M15');
  const [newRoleReq, setNewRoleReq] = useState<UserRole>('TRADER_PRO');
  const [newRationale, setNewRationale] = useState<string>('');

  const userRank = ROLE_RANK[currentUser.role];

  // Filter signals
  const filteredSignals = signals.filter((sig) => {
    // Category match
    if (categoryFilter === 'BOOM_CRASH' && !sig.asset.includes('Boom') && !sig.asset.includes('Crash')) return false;
    if (categoryFilter === 'VOLATILITY' && !sig.asset.includes('Volatility')) return false;
    if (categoryFilter === 'STEP' && !sig.asset.includes('Step')) return false;

    // Status match
    if (statusFilter === 'ACTIVE' && sig.status !== 'ACTIVE') return false;
    if (statusFilter === 'HIT_TP' && sig.status !== 'HIT_TP1' && sig.status !== 'HIT_TP2') return false;
    if (statusFilter === 'CLOSED' && sig.status !== 'CLOSED' && sig.status !== 'HIT_SL') return false;

    return true;
  });

  const activeCount = signals.filter(s => s.status === 'ACTIVE').length;
  const tpCount = signals.filter(s => s.status === 'HIT_TP1' || s.status === 'HIT_TP2').length;

  const handleCreateSignal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry || !newSL || !newTP1) {
      alert('Por favor completa todos los precios de la operación.');
      return;
    }

    onPublishSignal({
      asset: newAsset,
      action: newAction,
      entryPrice: parseFloat(newEntry),
      stopLoss: parseFloat(newSL),
      takeProfit1: parseFloat(newTP1),
      takeProfit2: newTP2 ? parseFloat(newTP2) : undefined,
      timeframe: newTimeframe,
      status: 'ACTIVE',
      author: currentUser.name,
      rationale: newRationale || 'Setup validado confluencia de Order Block y desbalance en M15.',
      requiredRole: newRoleReq
    });

    setIsPublishModalOpen(false);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Operaciones en Monitoreo</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight tabular-nums">
            {activeCount}
          </div>
          <span className="text-[11px] text-emerald-400 font-medium">Spikes & Swings activos</span>
        </div>

        <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Take Profits Cumplidos</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-white tracking-tight tabular-nums">
            {tpCount}
          </div>
          <span className="text-[11px] text-blue-400 font-medium">85.7% Win Rate del mes</span>
        </div>

        <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>Puntos Totales Ganados</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400 tracking-tight tabular-nums">
            +682.6 pts
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Índices Deriv MT5</span>
        </div>

        <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gestión Recomendada</span>
            <Calculator className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            1.0% Riesgo Max
          </div>
          <span className="text-[11px] text-amber-400 font-medium">Usar siempre calculadora</span>
        </div>
      </div>

      {/* Control Bar: Filters & Action */}
      <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filtrar:
          </span>
          {[
            { id: 'ALL', label: 'Todos los Índices' },
            { id: 'BOOM_CRASH', label: 'Boom & Crash' },
            { id: 'VOLATILITY', label: 'Volatility' },
            { id: 'STEP', label: 'Step Index' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Filter & Admin Action */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#0A0E17] p-1 rounded-lg border border-[#1F2937] text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                statusFilter === 'ALL' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setStatusFilter('ACTIVE')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                statusFilter === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 font-medium border border-emerald-800/40' : 'text-slate-400'
              }`}
            >
              Activas
            </button>
            <button
              onClick={() => setStatusFilter('HIT_TP')}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                statusFilter === 'HIT_TP' ? 'bg-blue-950 text-blue-400 font-medium border border-blue-800/40' : 'text-slate-400'
              }`}
            >
              TP Hit
            </button>
          </div>

          {currentUser.role === 'ADMIN' && (
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md transition-all whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publicar Señal</span>
            </button>
          )}
        </div>

      </div>

      {/* Signals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredSignals.map((signal) => {
          const isAccessible = userRank >= ROLE_RANK[signal.requiredRole];
          const isBuy = signal.action.includes('BUY');

          // R:R Calculation
          const slDistance = Math.abs(signal.entryPrice - signal.stopLoss);
          const tp1Distance = Math.abs(signal.takeProfit1 - signal.entryPrice);
          const rrRatio = slDistance > 0 ? (tp1Distance / slDistance).toFixed(1) : '1:1';

          return (
            <div
              key={signal.id}
              className={`rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isAccessible 
                  ? 'bg-[#111827] border-[#1F2937] hover:border-slate-700 shadow-lg' 
                  : 'bg-[#0E1422] border-amber-900/40'
              }`}
            >
              {/* Card Header: Asset, Action & Status */}
              <div className="p-4 border-b border-[#1F2937]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white tracking-tight">
                      {signal.asset}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                      {signal.timeframe}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  {signal.status === 'ACTIVE' && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVA
                    </span>
                  )}
                  {signal.status === 'HIT_TP1' && (
                    <span className="text-[10px] font-semibold text-blue-400 bg-blue-950/60 border border-blue-800/60 px-2 py-0.5 rounded-full font-mono">
                      TP1 ALCANZADO
                    </span>
                  )}
                  {signal.status === 'HIT_TP2' && (
                    <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/80 border border-emerald-700 px-2 py-0.5 rounded-full font-mono">
                      TP2 ALCANZADO (+{signal.pipsGained} pts)
                    </span>
                  )}
                  {signal.status === 'CLOSED' && (
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-mono">
                      CERRADA
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  {/* Action Badge */}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold font-mono ${
                    isBuy 
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/60' 
                      : 'bg-rose-950/80 text-rose-400 border border-rose-700/60'
                  }`}>
                    {isBuy ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {signal.action}
                  </span>

                  {/* Risk:Reward Metric */}
                  <span className="text-xs font-mono text-slate-400">
                    Ratio R:R: <strong className="text-white font-semibold">1:{rrRatio}</strong>
                  </span>
                </div>
              </div>

              {/* Card Body: Gated Curtain or Execution Table */}
              <div className="p-4 flex-1">
                {isAccessible ? (
                  <div className="space-y-3">
                    
                    {/* Execution Coordinates in Tabular Numeral Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#0A0E17] p-2.5 rounded-lg border border-[#1F2937]">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase block">Precio Entrada</span>
                        <span className="font-semibold text-white tabular-nums">
                          {formatPrice(signal.entryPrice)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-rose-400 uppercase block">Stop Loss (SL)</span>
                        <span className="font-semibold text-rose-400 tabular-nums">
                          {formatPrice(signal.stopLoss)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-blue-400 uppercase block">Take Profit 1</span>
                        <span className="font-semibold text-blue-400 tabular-nums">
                          {formatPrice(signal.takeProfit1)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-400 uppercase block">Take Profit 2</span>
                        <span className="font-semibold text-emerald-400 tabular-nums">
                          {signal.takeProfit2 ? formatPrice(signal.takeProfit2) : 'Open'}
                        </span>
                      </div>
                    </div>

                    {/* Trading Thesis / Rationale */}
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {signal.rationale}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-[#1F2937]">
                      <span>Por: <strong className="text-slate-400">{signal.author}</strong></span>
                      <span className="font-mono">{signal.createdAt}</span>
                    </div>

                  </div>
                ) : (
                  /* Locked Signal Curtain */
                  <div className="py-6 px-3 text-center flex flex-col items-center justify-center space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Señal Exclusiva · {signal.requiredRole}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                        Este setup sniper requiere suscripción <strong className="text-white">{signal.requiredRole === 'MASTER_VIP' ? 'Master VIP' : 'Trader Pro'}</strong> con alertas en vivo y parámetros de entrada exactos.
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenSubscriptionModal(signal.requiredRole)}
                      className="px-3.5 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm"
                    >
                      Desbloquear Acceso
                    </button>
                  </div>
                )}
              </div>

              {/* Card Footer: Quick Calculator Import */}
              {isAccessible && (
                <div className="p-3 bg-[#0E1422] border-t border-[#1F2937]">
                  <button
                    onClick={() => onSendToCalculator(signal)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold text-blue-300 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800/40 transition-colors"
                  >
                    <Calculator className="w-3.5 h-3.5 text-blue-400" />
                    <span>Calcular Lotaje de este Setup</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Admin New Signal Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl bg-[#111827] border border-[#1F2937] shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#1F2937] mb-4">
              <div className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Publicar Nueva Señal Institucional</h3>
              </div>
              <button 
                onClick={() => setIsPublishModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSignal} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 mb-1 block">Activo de Deriv</label>
                  <select
                    value={newAsset}
                    onChange={(e) => setNewAsset(e.target.value)}
                    className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white"
                  >
                    <option value="Crash 300 Index">Crash 300 Index</option>
                    <option value="Crash 500 Index">Crash 500 Index</option>
                    <option value="Crash 1000 Index">Crash 1000 Index</option>
                    <option value="Boom 300 Index">Boom 300 Index</option>
                    <option value="Boom 500 Index">Boom 500 Index</option>
                    <option value="Boom 1000 Index">Boom 1000 Index</option>
                    <option value="Volatility 75 Index">Volatility 75 Index</option>
                    <option value="Volatility 100 Index">Volatility 100 Index</option>
                    <option value="Step Index">Step Index</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 mb-1 block">Acción</label>
                  <select
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value as any)}
                    className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white font-mono"
                  >
                    <option value="SELL">SELL (Venta / Spike Down)</option>
                    <option value="BUY">BUY (Compra / Spike Up)</option>
                    <option value="SELL_LIMIT">SELL LIMIT</option>
                    <option value="BUY_LIMIT">BUY LIMIT</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-slate-400 mb-1 block">Entrada</label>
                  <input
                    type="number"
                    step="any"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-rose-400 mb-1 block">Stop Loss</label>
                  <input
                    type="number"
                    step="any"
                    value={newSL}
                    onChange={(e) => setNewSL(e.target.value)}
                    className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-rose-400 font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-blue-400 mb-1 block">Take Profit 1</label>
                  <input
                    type="number"
                    step="any"
                    value={newTP1}
                    onChange={(e) => setNewTP1(e.target.value)}
                    className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-blue-400 font-mono text-xs"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-emerald-400 mb-1 block">Take Profit 2</label>
                  <input
                    type="number"
                    step="any"
                    value={newTP2}
                    onChange={(e) => setNewTP2(e.target.value)}
                    className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-emerald-400 font-mono text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 mb-1 block">Timeframe</label>
                  <select
                    value={newTimeframe}
                    onChange={(e) => setNewTimeframe(e.target.value)}
                    className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white font-mono"
                  >
                    <option value="M1">M1 (Sniper Spikes)</option>
                    <option value="M5">M5 (Scalping)</option>
                    <option value="M15">M15 (Intraday)</option>
                    <option value="H1">H1 (Swing)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 mb-1 block">Nivel Requerido</label>
                  <select
                    value={newRoleReq}
                    onChange={(e) => setNewRoleReq(e.target.value as any)}
                    className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white font-mono"
                  >
                    <option value="FREE">Gratuito (Público)</option>
                    <option value="TRADER_PRO">Trader Pro</option>
                    <option value="MASTER_VIP">Master VIP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">Tesis de Trading / Rationale</label>
                <textarea
                  value={newRationale}
                  onChange={(e) => setNewRationale(e.target.value)}
                  placeholder="Explica la confluencia (ej. Mitigación de FVG + Sweep de liquidez previa)..."
                  rows={3}
                  className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white text-xs resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1F2937]">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-md text-xs hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md text-xs shadow-md"
                >
                  Publicar Señal en Vivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
