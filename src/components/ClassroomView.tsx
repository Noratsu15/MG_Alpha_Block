import React, { useState } from 'react';
import { CourseModule, Lesson, UserProfile, UserRole } from '../types';
import { 
  Play, Pause, CheckCircle2, Lock, FileText, Download, 
  Sparkles, Award, Clock, ChevronRight, BookmarkCheck,
  RotateCcw, ShieldAlert, BarChart2, Tv, Activity, Volume2, RefreshCw
} from 'lucide-react';

interface ClassroomViewProps {
  modules: CourseModule[];
  currentUser: UserProfile;
  onToggleLessonCompletion: (lessonId: string) => void;
  onSaveLessonNote: (lessonId: string, note: string) => void;
  onOpenSubscriptionModal: (targetRole?: UserRole) => void;
}

const ROLE_RANK: Record<UserRole, number> = {
  FREE: 1,
  TRADER_PRO: 2,
  MASTER_VIP: 3,
  ADMIN: 4
};

export const ClassroomView: React.FC<ClassroomViewProps> = ({
  modules,
  currentUser,
  onToggleLessonCompletion,
  onSaveLessonNote,
  onOpenSubscriptionModal
}) => {
  // Find first accessible or default lesson
  const [selectedModuleId, setSelectedModuleId] = useState<string>(modules[0].id);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(modules[0].lessons[0].id);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'resources'>('overview');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [playerMode, setPlayerMode] = useState<'video' | 'simulator'>('simulator');
  const [videoError, setVideoError] = useState<boolean>(false);
  const [simProgressSec, setSimProgressSec] = useState<number>(45);
  const [userNote, setUserNote] = useState<string>('');
  const [noteSavedToast, setNoteSavedToast] = useState<boolean>(false);

  const currentModule = modules.find(m => m.id === selectedModuleId) || modules[0];
  const currentLesson = currentModule.lessons.find(l => l.id === selectedLessonId) || currentModule.lessons[0];

  // Reset video error on lesson change
  React.useEffect(() => {
    setVideoError(false);
    setIsPlaying(false);
    setSimProgressSec(15);
  }, [selectedLessonId]);

  // Simulation timer when playing in simulator mode
  React.useEffect(() => {
    let interval: any;
    if (isPlaying && (playerMode === 'simulator' || videoError)) {
      interval = setInterval(() => {
        setSimProgressSec(prev => (prev >= 600 ? 15 : prev + 1));
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playerMode, videoError, playbackSpeed]);

  // Check if current user has access to selected lesson
  const userRank = ROLE_RANK[currentUser.role];
  const requiredRank = ROLE_RANK[currentLesson.requiredRole];
  const hasAccess = userRank >= requiredRank;

  // Sync user note when selecting lesson
  React.useEffect(() => {
    setUserNote(currentUser.notes[currentLesson.id] || '');
  }, [currentLesson.id, currentUser.notes]);

  const handleSaveNote = () => {
    onSaveLessonNote(currentLesson.id, userNote);
    setNoteSavedToast(true);
    setTimeout(() => setNoteSavedToast(false), 2500);
  };

  // Calculate total stats
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = currentUser.completedLessons.length;
  const progressPercent = Math.round((completedCount / Math.max(totalLessons, 1)) * 100);

  const isCompleted = currentUser.completedLessons.includes(currentLesson.id);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Academy Progress Banner */}
      <div className="mb-6 p-4 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Academia de Índices Sintéticos MG Alpha
            </h1>
            <p className="text-xs text-slate-400">
              {completedCount} de {totalLessons} lecciones completadas · Nivel actual: <span className="text-blue-400 font-semibold">{currentUser.role}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 min-w-[280px]">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Progreso de Maestría</span>
              <span className="text-blue-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Classroom Layout (Left: Module Navigator, Right: Player & Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Curriculum Modules Accordion (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#1F2937]">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Programa de Estudio ({modules.length} Módulos)
            </h2>
            <span className="text-[11px] text-slate-500 font-mono">
              {totalLessons} clases
            </span>
          </div>

          <div className="space-y-3">
            {modules.map((module) => {
              const isModuleAccessible = userRank >= ROLE_RANK[module.requiredRole];
              const isSelectedModule = module.id === selectedModuleId;
              const moduleLessonsCompleted = module.lessons.filter(l => currentUser.completedLessons.includes(l.id)).length;

              return (
                <div 
                  key={module.id}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isSelectedModule 
                      ? 'bg-[#111827] border-blue-500/40 shadow-lg shadow-blue-900/10' 
                      : 'bg-[#111827]/70 border-[#1F2937] hover:border-slate-700'
                  }`}
                >
                  {/* Module Header Bar */}
                  <button
                    onClick={() => {
                      setSelectedModuleId(module.id);
                      setSelectedLessonId(module.lessons[0].id);
                    }}
                    className="w-full p-3.5 text-left flex items-start justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {module.level}
                        </span>
                        {!isModuleAccessible && (
                          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded">
                            <Lock className="w-2.5 h-2.5" />
                            {module.requiredRole}
                          </span>
                        )}
                        <span className="text-[11px] text-slate-500 font-mono ml-auto">
                          {moduleLessonsCompleted}/{module.lessons.length}
                        </span>
                      </div>
                      <h3 className="text-xs font-semibold text-white leading-snug">
                        {module.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {module.description}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isSelectedModule ? 'rotate-90 text-blue-400' : ''}`} />
                  </button>

                  {/* Lessons in Module */}
                  {isSelectedModule && (
                    <div className="border-t border-[#1F2937] divide-y divide-[#1F2937]/60 bg-[#0E1422]">
                      {module.lessons.map((lesson, idx) => {
                        const isLessonAccessible = userRank >= ROLE_RANK[lesson.requiredRole];
                        const isSelectedLesson = lesson.id === selectedLessonId;
                        const isLessonCompleted = currentUser.completedLessons.includes(lesson.id);

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setSelectedLessonId(lesson.id);
                              setIsPlaying(false);
                            }}
                            className={`w-full p-3 text-left flex items-center justify-between gap-3 text-xs transition-colors ${
                              isSelectedLesson 
                                ? 'bg-blue-600/15 text-blue-300 border-l-2 border-blue-500 font-medium' 
                                : 'text-slate-300 hover:bg-slate-800/40 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-[11px] font-mono text-slate-500 w-4">
                                {String(idx + 1).padStart(2, '0')}
                              </span>
                              <span className="truncate">
                                {lesson.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {lesson.duration}
                              </span>
                              
                              {isLessonAccessible ? (
                                isLessonCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-slate-600 shrink-0" />
                                )
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Video Stage, Controls & Study Deck (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Top Lesson Title Header */}
          <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <span>{currentModule.title}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-slate-300">{currentLesson.duration}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {currentLesson.title}
              </h2>
            </div>

            {hasAccess && (
              <button
                onClick={() => onToggleLessonCompletion(currentLesson.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                  isCompleted 
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/80 hover:bg-emerald-900' 
                    : 'bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/20'
                }`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Completada</span>
                  </>
                ) : (
                  <>
                    <BookmarkCheck className="w-4 h-4" />
                    <span>Marcar como vista</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Video Player or Gated Curtain */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-[#1F2937] shadow-2xl flex items-center justify-center">
            {hasAccess ? (
              <>
                {/* Mode 1: Video HD (with graceful error handling) */}
                {playerMode === 'video' && !videoError ? (
                  <div className="relative w-full h-full">
                    <video
                      key={currentLesson.id}
                      id="classroom-video"
                      poster={currentLesson.previewThumbnail}
                      controls={false}
                      className="w-full h-full object-cover"
                      autoPlay={false}
                      playsInline
                      preload="metadata"
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onError={() => {
                        // Prevent unhandled browser error by switching to interactive simulator
                        setVideoError(true);
                      }}
                    >
                      <source src={currentLesson.videoUrl} type="video/mp4" />
                    </video>

                    {/* Video Overlay Play Trigger */}
                    <div 
                      onClick={() => {
                        const videoEl = document.getElementById('classroom-video') as HTMLVideoElement;
                        if (videoEl) {
                          if (videoEl.paused) {
                            videoEl.play().catch(() => setVideoError(true));
                            setIsPlaying(true);
                          } else {
                            videoEl.pause();
                            setIsPlaying(false);
                          }
                        }
                      }}
                      className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all flex items-center justify-center cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-full bg-blue-600/90 group-hover:bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 transform group-hover:scale-105 transition-transform text-white">
                        {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Mode 2: Interactive MT5 Chart & Candlestick Replay Simulator */
                  <div className="relative w-full h-full bg-[#070A11] flex flex-col justify-between p-4 overflow-hidden select-none">
                    
                    {/* Simulator Top Header */}
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950/80 border border-blue-700/60 text-blue-300 font-mono text-[10px] font-semibold">
                          <BarChart2 className="w-3 h-3 text-blue-400" />
                          MT5 CHART REPLAY · M15
                        </span>
                        <span className="text-xs font-mono font-bold text-white tabular-nums">
                          Crash 300: 2,845.50
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <Activity className="w-3 h-3" /> SMC Activo
                        </span>
                      </div>

                      {/* Mode switch button */}
                      <button
                        onClick={() => {
                          setVideoError(false);
                          setPlayerMode(playerMode === 'simulator' ? 'video' : 'simulator');
                        }}
                        className="px-2.5 py-1 rounded bg-[#111827] hover:bg-slate-800 border border-[#1F2937] text-[11px] text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
                      >
                        <Tv className="w-3 h-3 text-blue-400" />
                        <span>{playerMode === 'simulator' ? 'Probar Video HD' : 'Modo Simulador MT5'}</span>
                      </button>
                    </div>

                    {/* Candlestick & Technical Geometry Chart Canvas */}
                    <div className="relative flex-1 my-2 flex items-center justify-center">
                      <svg viewBox="0 0 800 320" className="w-full h-full">
                        {/* Horizontal Price Grid Lines */}
                        <line x1="0" y1="40" x2="800" y2="40" stroke="#1F2937" strokeDasharray="4 4" strokeWidth="1" />
                        <text x="740" y="36" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">2,865.00</text>
                        
                        <line x1="0" y1="120" x2="800" y2="120" stroke="#1F2937" strokeDasharray="4 4" strokeWidth="1" />
                        <text x="740" y="116" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">2,850.00</text>
                        
                        <line x1="0" y1="200" x2="800" y2="200" stroke="#1F2937" strokeDasharray="4 4" strokeWidth="1" />
                        <text x="740" y="196" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">2,835.00</text>
                        
                        <line x1="0" y1="280" x2="800" y2="280" stroke="#1F2937" strokeDasharray="4 4" strokeWidth="1" />
                        <text x="740" y="276" fill="#64748B" fontSize="10" fontFamily="JetBrains Mono">2,820.00</text>

                        {/* Institutional Order Block Zone */}
                        <rect x="240" y="45" width="460" height="42" fill="#EF4444" fillOpacity="0.12" stroke="#EF4444" strokeDasharray="3 3" strokeWidth="1" rx="2" />
                        <text x="250" y="62" fill="#F87171" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                          BEARISH ORDER BLOCK (POI INSTITUCIONAL H1)
                        </text>

                        {/* Fair Value Gap (FVG) Zone */}
                        <rect x="120" y="140" width="380" height="35" fill="#3B82F6" fillOpacity="0.10" stroke="#3B82F6" strokeDasharray="3 3" strokeWidth="1" rx="2" />
                        <text x="130" y="156" fill="#60A5FA" fontSize="9" fontFamily="JetBrains Mono">
                          IMBALANCE · FAIR VALUE GAP (FVG M15)
                        </text>

                        {/* Candlestick Series */}
                        {/* Candle 1 (Bull) */}
                        <line x1="60" y1="240" x2="60" y2="290" stroke="#10B981" strokeWidth="1.5" />
                        <rect x="52" y="250" width="16" height="30" fill="#10B981" rx="1" />

                        {/* Candle 2 (Bull) */}
                        <line x1="100" y1="220" x2="100" y2="270" stroke="#10B981" strokeWidth="1.5" />
                        <rect x="92" y="225" width="16" height="35" fill="#10B981" rx="1" />

                        {/* Candle 3 (Impulse into FVG) */}
                        <line x1="140" y1="160" x2="140" y2="240" stroke="#10B981" strokeWidth="1.5" />
                        <rect x="132" y="170" width="16" height="55" fill="#10B981" rx="1" />

                        {/* Candle 4 (Consolidation) */}
                        <line x1="180" y1="150" x2="180" y2="190" stroke="#EF4444" strokeWidth="1.5" />
                        <rect x="172" y="155" width="16" height="20" fill="#EF4444" rx="1" />

                        {/* Candle 5 (Bullish Continuation) */}
                        <line x1="220" y1="110" x2="220" y2="170" stroke="#10B981" strokeWidth="1.5" />
                        <rect x="212" y="115" width="16" height="45" fill="#10B981" rx="1" />

                        {/* Candle 6 (Sweep high into Order Block) */}
                        <line x1="260" y1="42" x2="260" y2="130" stroke="#10B981" strokeWidth="1.5" />
                        <rect x="252" y="65" width="16" height="50" fill="#10B981" rx="1" />
                        <text x="252" y="36" fill="#FBBF24" fontSize="8" fontFamily="JetBrains Mono">BSL SWEEP</text>

                        {/* Candle 7 (Rejection pinbar in OB) */}
                        <line x1="300" y1="45" x2="300" y2="110" stroke="#EF4444" strokeWidth="1.5" />
                        <rect x="292" y="70" width="16" height="25" fill="#EF4444" rx="1" />

                        {/* Candle 8 (Massive Crash Spike) */}
                        <line x1="340" y1="80" x2="340" y2="235" stroke="#EF4444" strokeWidth="2.5" />
                        <rect x="331" y="85" width="18" height="145" fill="#EF4444" rx="1" />
                        <text x="355" y="160" fill="#EF4444" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                          CRASH SPIKE (-45.2 pts)
                        </text>

                        {/* Candle 9 (Tick consolidation) */}
                        <line x1="380" y1="220" x2="380" y2="250" stroke="#10B981" strokeWidth="1.5" />
                        <rect x="372" y="228" width="16" height="15" fill="#10B981" rx="1" />

                        {/* Candle 10 (Second Spike) */}
                        <line x1="420" y1="230" x2="420" y2="295" stroke="#EF4444" strokeWidth="2" />
                        <rect x="412" y="235" width="16" height="55" fill="#EF4444" rx="1" />

                        {/* Dynamic Live Price Line */}
                        <line x1="0" y1="270" x2="800" y2="270" stroke="#3B82F6" strokeDasharray="2 2" strokeWidth="1.5" />
                        <circle cx="440" cy="270" r="4" fill="#3B82F6" className="animate-ping" />
                        <circle cx="440" cy="270" r="3" fill="#60A5FA" />
                        <rect x="710" y="260" width="85" height="20" fill="#3B82F6" rx="3" />
                        <text x="720" y="274" fill="#FFFFFF" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
                          2,826.40
                        </text>
                      </svg>

                      {/* Center Play Button Overlay when Paused */}
                      {!isPlaying && (
                        <div 
                          onClick={() => setIsPlaying(true)}
                          className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-all flex items-center justify-center cursor-pointer group"
                        >
                          <div className="w-16 h-16 rounded-full bg-blue-600/90 group-hover:bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 transform group-hover:scale-105 transition-transform text-white">
                            <Play className="w-7 h-7 ml-1" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Educational Synchronized Subtitle / Concept Banner */}
                    <div className="z-10 p-2.5 rounded-lg bg-[#0E1422]/90 border border-blue-900/50 flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-blue-400 font-semibold">Explicación en Vivo:</span>
                        <span className="text-slate-200">
                          {simProgressSec < 60
                            ? 'Mapeando fractales y liquidez en máximos iguales antes de la mitigación del Order Block.'
                            : simProgressSec < 180
                            ? 'El precio penetra el 50% del bloque institucional. La orden Sell Limit queda ejecutada con Stop Loss protegido.'
                            : 'Spike masivo generado por el algoritmo de Crash. Toma de ganancias completada en TP1.'}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">
                        Paso {Math.min(3, Math.floor(simProgressSec / 60) + 1)} de 3
                      </span>
                    </div>

                  </div>
                )}

                {/* Unified Player Bottom Control Deck */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex items-center justify-between text-xs text-white z-20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (playerMode === 'video' && !videoError) {
                          const videoEl = document.getElementById('classroom-video') as HTMLVideoElement;
                          if (videoEl) {
                            if (videoEl.paused) {
                              videoEl.play().catch(() => setVideoError(true));
                              setIsPlaying(true);
                            } else {
                              videoEl.pause();
                              setIsPlaying(false);
                            }
                          }
                        } else {
                          setIsPlaying(!isPlaying);
                        }
                      }}
                      className="p-1 hover:text-blue-400 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-blue-400" /> : <Play className="w-4 h-4" />}
                    </button>
                    
                    <span className="font-mono text-[11px] text-slate-300 tabular-nums">
                      {isPlaying ? 'Reproduciendo sesión de trading' : 'Pausado'} · {currentLesson.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Mode label */}
                    <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
                      {playerMode === 'simulator' || videoError ? 'Simulador MT5 Activo' : 'Video HD'}
                    </span>

                    {/* Playback speed selector */}
                    <div className="flex items-center gap-1 bg-black/60 px-2 py-1 rounded-md border border-slate-700">
                      <span className="text-[10px] text-slate-400 mr-1">Velocidad:</span>
                      {[1, 1.25, 1.5, 2].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => {
                            setPlaybackSpeed(speed);
                            const videoEl = document.getElementById('classroom-video') as HTMLVideoElement;
                            if (videoEl) videoEl.playbackRate = speed;
                          }}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                            playbackSpeed === speed ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Institutional Paywall Curtain */
              <div className="absolute inset-0 bg-[#0E1422] p-8 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 shadow-xl shadow-amber-500/5">
                  <Lock className="w-7 h-7" />
                </div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold mb-1">
                  Contenido Exclusivo · Nivel {currentLesson.requiredRole}
                </span>
                <h3 className="text-xl font-bold text-white max-w-md mb-2">
                  {currentLesson.title}
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mb-6 leading-relaxed">
                  Esta lección avanzada requiere la suscripción <strong className="text-white">{currentLesson.requiredRole === 'MASTER_VIP' ? 'Master VIP' : 'Trader Pro'}</strong>. Incluye estrategias de Order Blocks, setups sniper y plantillas institucionales de MetaTrader 5.
                </p>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onOpenSubscriptionModal(currentLesson.requiredRole)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Desbloquear Nivel {currentLesson.requiredRole === 'MASTER_VIP' ? 'Master VIP' : 'Trader Pro'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Study Deck Tabs */}
          <div className="rounded-xl bg-[#111827] border border-[#1F2937] overflow-hidden">
            
            {/* Tab Controls */}
            <div className="flex items-center gap-2 px-4 pt-3 border-b border-[#1F2937] text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2.5 px-2 font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Resumen & Puntos Clave
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`pb-2.5 px-2 font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'notes'
                    ? 'border-blue-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Mis Notas</span>
                {currentUser.notes[currentLesson.id] && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`pb-2.5 px-2 font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'resources'
                    ? 'border-blue-500 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Recursos & Descargas</span>
                {currentLesson.resources && (
                  <span className="text-[10px] font-mono px-1 rounded bg-slate-800 text-slate-400">
                    {currentLesson.resources.length}
                  </span>
                )}
              </button>
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="p-5 space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-2">
                    Objetivo de la Lección
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentLesson.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#1F2937]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-3">
                    Conocimientos & Reglas Clave a Dominar
                  </h4>
                  <ul className="space-y-2">
                    {currentLesson.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        <span className="leading-normal">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 2: Notes Editor */}
            {activeTab === 'notes' && (
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    Cuaderno personal de trading. Tus anotaciones se guardan asociadas a esta lección:
                  </p>
                  {noteSavedToast && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium animate-in fade-in">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Guardado
                    </span>
                  )}
                </div>

                <textarea
                  value={userNote}
                  onChange={(e) => setUserNote(e.target.value)}
                  placeholder="Escribe tus observaciones del gráfico, reglas de entrada o dudas para la sesión en vivo..."
                  rows={6}
                  className="w-full bg-[#0A0E17] border border-[#1F2937] focus:border-blue-500 rounded-lg p-3 text-xs text-white placeholder-slate-600 focus:outline-none leading-relaxed resize-none"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold transition-colors"
                  >
                    Guardar Apuntes
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Resources */}
            {activeTab === 'resources' && (
              <div className="p-5">
                {currentLesson.resources && currentLesson.resources.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLesson.resources.map((res, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-[#0A0E17] border border-[#1F2937] flex items-center justify-between gap-3 hover:border-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-md bg-blue-900/30 text-blue-400 border border-blue-800/40 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-white truncate">
                              {res.name}
                            </p>
                            <p className="text-[11px] text-slate-500 font-mono">
                              {res.size} · {res.description}
                            </p>
                          </div>
                        </div>

                        <a
                          href={`#download-${res.name}`}
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Descargando material: ${res.name}`);
                          }}
                          className="p-2 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white transition-colors shrink-0"
                          title="Descargar archivo"
                        >
                          <Download className="w-4 h-4 text-blue-400" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-slate-500">
                    No hay archivos descargables adjuntos para esta lección específica.
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
