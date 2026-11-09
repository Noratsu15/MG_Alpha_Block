import React from 'react';
import { UserRole } from '../types';
import { X, Check, Sparkles, Shield, Lock, Award } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  targetRole?: UserRole;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onSelectRole,
  targetRole
}) => {
  if (!isOpen) return null;

  const tiers: {
    role: UserRole;
    name: string;
    price: string;
    period: string;
    description: string;
    highlight?: boolean;
    features: string[];
    buttonText: string;
  }[] = [
    {
      role: 'FREE',
      name: 'Plan Gratuito',
      price: '$0',
      period: 'Para siempre',
      description: 'Ideal para traders que inician en el mundo de los índices sintéticos.',
      features: [
        'Módulo 1: Fundamentos y Mecánica Algorítmica',
        'Calculadora Básica de Lotaje y Riesgo Deriv',
        '1 Señal pública de cortesía por semana',
        'Acceso de lectura a la comunidad de debate',
        'Soporte comunitario en Discord'
      ],
      buttonText: currentRole === 'FREE' ? 'Nivel Actual' : 'Cambiar a Gratuito'
    },
    {
      role: 'TRADER_PRO',
      name: 'Trader Pro',
      price: '$49',
      period: 'por mes',
      description: 'Nivel recomendado para traders activos que buscan rentabilidad y consistencia.',
      highlight: true,
      features: [
        'Acceso a todos los Módulos 1, 2 y 3 (SMC & Scalping)',
        'Canal de Señales en Vivo 24/7 (Boom, Crash, Vol, Step)',
        'Alertas inmediatas de TP1, TP2 y Stop Loss',
        'Calculadora de Lotaje Avanzada con importación directa',
        'Plantillas institucionales MT5 y detector de FVG',
        'Publicación y debate activo en el muro de análisis',
        'Sesión grupal de análisis semanal en vivo'
      ],
      buttonText: currentRole === 'TRADER_PRO' ? 'Nivel Actual' : 'Activar Trader Pro'
    },
    {
      role: 'MASTER_VIP',
      name: 'Master VIP',
      price: '$129',
      period: 'por mes',
      description: 'Acceso institucional completo, cuentas de fondeo y mentorías 1-a-1.',
      features: [
        'Todo lo incluido en Trader Pro',
        'Módulo 4: Masterclass VIP & Cuantitativo',
        'Plan paso a paso para Aprobar Cuentas de Fondeo ($10k-$100k)',
        'Setups Sniper VIP en M1 (Boom 300 / Crash 300)',
        'Revisión y auditoría de tu bitácora de trading',
        'Llamada 1-a-1 mensual con el Mentor Miguel Gómez',
        'Grupo privado de Telegram VIP con respuesta prioritaria'
      ],
      buttonText: currentRole === 'MASTER_VIP' ? 'Nivel Actual' : 'Ascender a Master VIP'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-5xl rounded-2xl bg-[#111827] border border-[#1F2937] shadow-2xl p-6 sm:p-8 relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-700/40 text-blue-400 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Membresías & Niveles de Acceso MG Alpha Block</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Invierte en tu Educación y Rentabilidad
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Elige el plan adaptado a tu etapa como operador. Puedes cambiar de nivel en cualquier momento para desbloquear lecciones y señales sniper.
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => {
            const isCurrent = currentRole === tier.role;
            const isTarget = targetRole === tier.role;

            return (
              <div
                key={tier.role}
                className={`rounded-xl border p-6 flex flex-col justify-between transition-all relative ${
                  tier.highlight
                    ? 'bg-gradient-to-b from-[#131D31] to-[#111827] border-blue-500 shadow-xl shadow-blue-900/20 ring-1 ring-blue-500/50'
                    : 'bg-[#0E1422] border-[#1F2937] hover:border-slate-700'
                } ${isTarget ? 'border-amber-400 ring-2 ring-amber-400/30' : ''}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow-md">
                    Más Elegido por Traders
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white">{tier.name}</h3>
                    {isCurrent && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Nivel Activo
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mb-4 min-h-[32px] leading-relaxed">
                    {tier.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                      {tier.price}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {tier.period}
                    </span>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-[#1F2937] text-xs">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                      Beneficios incluidos:
                    </span>
                    {tier.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#1F2937]">
                  <button
                    onClick={() => {
                      onSelectRole(tier.role);
                      onClose();
                    }}
                    disabled={isCurrent}
                    className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-slate-800 text-slate-500 cursor-default'
                        : tier.highlight
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    {tier.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Guarantee Note */}
        <div className="mt-8 pt-4 border-t border-[#1F2937] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Pagos encriptados con Stripe y USDT/Cripto. Facturación mensual cancelable en 1 clic.</span>
          </div>
          <span className="font-mono text-slate-400">MG Alpha Block Ecosystem</span>
        </div>

      </div>
    </div>
  );
};
