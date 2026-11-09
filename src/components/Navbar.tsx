import React from 'react';
import { UserProfile, UserRole } from '../types';
import { Shield, BookOpen, Radio, Calculator, MessageSquare, Terminal, ChevronDown, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'classroom' | 'signals' | 'calculator' | 'community' | 'architecture';
  setActiveTab: (tab: 'classroom' | 'signals' | 'calculator' | 'community' | 'architecture') => void;
  currentUser: UserProfile;
  setCurrentUserRole: (role: UserRole) => void;
  onOpenSubscriptionModal: () => void;
  signalsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  setCurrentUserRole,
  onOpenSubscriptionModal,
  signalsCount
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);

  const rolesList: { role: UserRole; label: string; badgeColor: string; desc: string }[] = [
    { role: 'FREE', label: 'Gratuito', badgeColor: 'bg-slate-700/60 text-slate-300 border-slate-600', desc: 'Módulos básicos y señales gratuitas' },
    { role: 'TRADER_PRO', label: 'Trader Pro', badgeColor: 'bg-blue-900/60 text-blue-300 border-blue-700', desc: 'Classroom completo + Señales en vivo' },
    { role: 'MASTER_VIP', label: 'Master VIP', badgeColor: 'bg-amber-900/60 text-amber-300 border-amber-700', desc: 'Mentorías privadas + Setups VIP' },
    { role: 'ADMIN', label: 'Mentor / Admin', badgeColor: 'bg-emerald-900/60 text-emerald-300 border-emerald-700', desc: 'Control total de la plataforma' }
  ];

  const currentRoleInfo = rolesList.find(r => r.role === currentUser.role) || rolesList[0];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0E17]/95 backdrop-blur-md border-b border-[#1F2937]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Brand Wordmark (Single text element wordmark in display face) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center border border-blue-500/30 shadow-lg shadow-blue-500/10">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
              MG ALPHA BLOCK
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-mono">
              Synthetic Indices Academy
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Clean single-line text tabs) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => setActiveTab('classroom')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'classroom'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Aula Virtual</span>
          </button>

          <button
            onClick={() => setActiveTab('signals')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 relative ${
              activeTab === 'signals'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>Señales en Vivo</span>
            <span className="ml-1 text-[10px] font-mono px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 rounded-sm">
              {signalsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'calculator'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Calculadora de Lotaje</span>
          </button>

          <button
            onClick={() => setActiveTab('community')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'community'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comunidad & Debate</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'architecture'
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Arquitectura NestJS</span>
          </button>
        </nav>

        {/* Zone 3: Role Switcher & User Account */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Interactive Role Switcher for Testing RBAC */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              title="Alternar rol de prueba para simular restricciones de contenido"
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-[#111827] border border-[#1F2937] hover:border-slate-600 transition-colors text-xs"
            >
              <span className="text-[11px] text-slate-400 hidden sm:inline">Rol activo:</span>
              <span className={`px-2 py-0.5 text-[11px] font-semibold rounded border ${currentRoleInfo.badgeColor}`}>
                {currentRoleInfo.label}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setRoleDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-72 rounded-lg bg-[#111827] border border-[#1F2937] shadow-xl z-50 p-2 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2 py-1.5 border-b border-[#1F2937] mb-1">
                    <p className="font-semibold text-white">Simulador de Roles (RBAC)</p>
                    <p className="text-[11px] text-slate-400">Prueba cómo responde la plataforma a cada nivel de suscripción:</p>
                  </div>
                  {rolesList.map((r) => (
                    <button
                      key={r.role}
                      onClick={() => {
                        setCurrentUserRole(r.role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-md flex items-start gap-2.5 transition-colors ${
                        currentUser.role === r.role ? 'bg-blue-600/20 text-white' : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="mt-0.5">
                        {currentUser.role === r.role ? (
                          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{r.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded border ${r.badgeColor}`}>
                            {r.role}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{r.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Upgrade / Subscription Action */}
          <button
            onClick={onOpenSubscriptionModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-md transition-all shadow-md shadow-blue-600/20 whitespace-nowrap shrink-0"
          >
            <span>Membresías</span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#1F2937]">
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-700"
            />
          </div>
        </div>

      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="lg:hidden flex items-center gap-1 px-4 py-2 border-t border-[#1F2937] overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('classroom')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'classroom' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400'
          }`}
        >
          Aula Virtual
        </button>
        <button
          onClick={() => setActiveTab('signals')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'signals' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400'
          }`}
        >
          Señales en Vivo ({signalsCount})
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'calculator' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400'
          }`}
        >
          Calculadora Lotaje
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'community' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400'
          }`}
        >
          Comunidad
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 ${
            activeTab === 'architecture' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400'
          }`}
        >
          Arquitectura NestJS
        </button>
      </div>
    </header>
  );
};
