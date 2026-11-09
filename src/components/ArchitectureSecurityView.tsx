import React, { useState } from 'react';
import { ArchitectureDoc } from '../types';
import { ARCHITECTURE_DOCS } from '../data/mockData';
import { 
  Terminal, ShieldCheck, Database, Lock, Code2, 
  Copy, Check, Layers, Server, Cpu, CheckCircle2,
  FileCode, Sparkles
} from 'lucide-react';

export const ArchitectureSecurityView: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState<string>(ARCHITECTURE_DOCS[0].id);
  const [copied, setCopied] = useState<boolean>(false);

  const currentDoc = ARCHITECTURE_DOCS.find(d => d.id === selectedDocId) || ARCHITECTURE_DOCS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentDoc.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-[#111827] via-[#0E1524] to-[#111827] border border-blue-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/40 text-blue-300 border border-blue-700/50">
                PROD-READY ARCHITECTURE SPEC
              </span>
              <span className="text-xs text-slate-400">Senior Full-Stack 15+ Años</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Arquitectura Escalable & Seguridad para MG Alpha Block
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Recomendación técnica oficial: <strong className="text-white">NestJS + TypeScript + PostgreSQL + Prisma ORM + Sanitización DTO</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyCode}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all self-start md:self-auto shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Copiado al Portapapeles</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar {currentDoc.filename}</span>
            </>
          )}
        </button>
      </div>

      {/* 4 Pillars of Institutional Security */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            1. Sanitización de Inputs
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            ValidationPipe global con <code className="text-blue-300">whitelist: true</code> y <code className="text-rose-300">forbidNonWhitelisted</code>. DTOs tipados que descartan ataques de inyección y XSS antes de tocar controladores.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            2. Autenticación & RBAC
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Contraseñas con <strong>Argon2id</strong>. JWT de acceso efímero (15 min) + Refresh Token rotativo en cookie <code className="text-amber-300">HttpOnly SameSite=Strict</code>. Decorador <code className="text-blue-300">@Roles</code> con RolesGuard.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            3. PostgreSQL Relacional
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Integridad referencial ACID para auditoría de pagos de membresía y señales. Prisma ORM parametriza todas las consultas evitando vulnerabilidades de SQL Injection.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            4. Protección de Red & DoS
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Cabeceras <code className="text-white">Helmet</code> (CSP, HSTS, No-Sniff) y limitación de tasa con <code className="text-amber-300">@nestjs/throttler</code> (100 req/min por IP) para mitigar fuerza bruta.
          </p>
        </div>

      </div>

      {/* Interactive Code Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: File Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="pb-2 border-b border-[#1F2937]">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Archivos del Backend de Producción
            </h2>
          </div>

          <div className="space-y-2">
            {ARCHITECTURE_DOCS.map((doc) => {
              const isSelected = doc.id === selectedDocId;
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full p-3.5 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-blue-600/15 border-blue-500 text-white shadow-md'
                      : 'bg-[#111827] border-[#1F2937] text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileCode className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                    <span className="text-xs font-mono font-semibold text-white">{doc.filename}</span>
                  </div>
                  <h4 className="text-xs font-medium text-slate-300 line-clamp-1">{doc.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{doc.description}</p>
                </button>
              );
            })}
          </div>

          {/* Technical Rationale Summary */}
          <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              ¿Por qué NestJS sobre Express puro?
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Express carece de estructura arquitectónica estricta, lo que suele derivar en código espagueti al crecer la plataforma. NestJS impone el patrón <strong>Controller-Service-Repository</strong>, facilitando pruebas unitarias, modularización de pagos/suscripciones y mantenibilidad a 5+ años.
            </p>
          </div>
        </div>

        {/* Right Column: Code Editor Viewport (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* File Tab Header */}
          <div className="p-3 px-4 rounded-t-xl bg-[#0E1422] border border-[#1F2937] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span className="font-mono text-xs font-bold text-white">{currentDoc.filename}</span>
              <span className="text-[10px] font-mono text-slate-500">· {currentDoc.language}</span>
            </div>

            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          {/* Code Body */}
          <div className="rounded-b-xl border border-t-0 border-[#1F2937] bg-[#0A0E17] overflow-hidden">
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed max-h-[580px] scrollbar-thin">
              <code>{currentDoc.code}</code>
            </pre>
          </div>

          {/* Key Architecture Highlights */}
          <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Puntos Clave de Seguridad Implementados en este Archivo
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {currentDoc.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{h}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
