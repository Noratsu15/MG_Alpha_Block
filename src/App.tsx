/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  UserProfile, UserRole, TradingSignal, CommunityPost 
} from './types';
import { 
  INITIAL_USER, COURSE_MODULES, INITIAL_SIGNALS, INITIAL_COMMUNITY_POSTS 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { ClassroomView } from './components/ClassroomView';
import { SignalsView } from './components/SignalsView';
import { RiskCalculatorView } from './components/RiskCalculatorView';
import { CommunityView } from './components/CommunityView';
import { ArchitectureSecurityView } from './components/ArchitectureSecurityView';
import { SubscriptionModal } from './components/SubscriptionModal';
import { CheckCircle2, Shield, Radio, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'classroom' | 'signals' | 'calculator' | 'community' | 'architecture'>('classroom');
  
  // App state
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USER);
  const [signals, setSignals] = useState<TradingSignal[]>(INITIAL_SIGNALS);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [selectedSignalForCalc, setSelectedSignalForCalc] = useState<TradingSignal | null>(null);

  // Modals & Feedback
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [subscriptionTargetRole, setSubscriptionTargetRole] = useState<UserRole | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // RBAC Role Switcher
  const handleSetUserRole = (newRole: UserRole) => {
    setCurrentUser(prev => ({
      ...prev,
      role: newRole
    }));
    showToast(`Rol actualizado a: ${newRole}. Las restricciones de contenido se han recalculado.`);
  };

  // Classroom handlers
  const handleToggleLessonCompletion = (lessonId: string) => {
    setCurrentUser(prev => {
      const isAlready = prev.completedLessons.includes(lessonId);
      const nextCompleted = isAlready 
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      
      return {
        ...prev,
        completedLessons: nextCompleted
      };
    });
    showToast('Progreso de la lección actualizado');
  };

  const handleSaveLessonNote = (lessonId: string, note: string) => {
    setCurrentUser(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [lessonId]: note
      }
    }));
    showToast('Notas personales guardadas en el aula virtual');
  };

  const handleOpenSubscriptionModal = (targetRole?: UserRole) => {
    setSubscriptionTargetRole(targetRole);
    setIsSubscriptionModalOpen(true);
  };

  // Signals to Calculator transfer
  const handleSendToCalculator = (signal: TradingSignal) => {
    setSelectedSignalForCalc(signal);
    setActiveTab('calculator');
    showToast(`Parámetros de ${signal.asset} importados a la calculadora de lotaje`);
  };

  // Add new signal (Admin)
  const handlePublishSignal = (newSignalData: Omit<TradingSignal, 'id' | 'createdAt'>) => {
    const newSig: TradingSignal = {
      ...newSignalData,
      id: `sig_${Date.now()}`,
      createdAt: 'Hace un momento'
    };
    setSignals([newSig, ...signals]);
    showToast('Señal institucional publicada en vivo');
  };

  // Community handlers
  const handleAddPost = (newPostData: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'commentsCount'>) => {
    const newPost: CommunityPost = {
      ...newPostData,
      id: `post_${Date.now()}`,
      createdAt: 'Hace un momento',
      likes: 1,
      userLiked: true,
      commentsCount: 0,
      comments: []
    };
    setPosts([newPost, ...posts]);
    showToast('Análisis publicado con éxito en el muro de trading');
  };

  const handleAddComment = (postId: string, content: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: `c_${Date.now()}`,
          author: currentUser.name,
          avatar: currentUser.avatarUrl,
          role: currentUser.role,
          content,
          createdAt: 'Hace un momento'
        };
        const currentComments = p.comments || [];
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...currentComments, newComment]
        };
      }
      return p;
    }));
    showToast('Comentario añadido');
  };

  const handleToggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const isLiked = p.userLiked;
        return {
          ...p,
          likes: isLiked ? p.likes - 1 : p.likes + 1,
          userLiked: !isLiked
        };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0E17] text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation Bar with RBAC Switcher */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        setCurrentUserRole={handleSetUserRole}
        onOpenSubscriptionModal={() => handleOpenSubscriptionModal()}
        signalsCount={signals.filter(s => s.status === 'ACTIVE').length}
      />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {activeTab === 'classroom' && (
          <ClassroomView
            modules={COURSE_MODULES}
            currentUser={currentUser}
            onToggleLessonCompletion={handleToggleLessonCompletion}
            onSaveLessonNote={handleSaveLessonNote}
            onOpenSubscriptionModal={handleOpenSubscriptionModal}
          />
        )}

        {activeTab === 'signals' && (
          <SignalsView
            signals={signals}
            currentUser={currentUser}
            onSendToCalculator={handleSendToCalculator}
            onOpenSubscriptionModal={handleOpenSubscriptionModal}
            onPublishSignal={handlePublishSignal}
          />
        )}

        {activeTab === 'calculator' && (
          <RiskCalculatorView
            initialSignal={selectedSignalForCalc}
            onClearInitialSignal={() => setSelectedSignalForCalc(null)}
          />
        )}

        {activeTab === 'community' && (
          <CommunityView
            posts={posts}
            currentUser={currentUser}
            onAddPost={handleAddPost}
            onAddComment={handleAddComment}
            onToggleLike={handleToggleLike}
          />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureSecurityView />
        )}
      </main>

      {/* Subscription & Paywall Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        currentRole={currentUser.role}
        onSelectRole={handleSetUserRole}
        targetRole={subscriptionTargetRole}
      />

      {/* Floating Action Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-xs font-semibold shadow-2xl shadow-blue-900/50 border border-blue-400/40 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Institutional Footer */}
      <footer className="mt-16 border-t border-[#1F2937] bg-[#080B12] py-8 text-xs text-slate-500">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-white">MG Alpha Block</span>
            <span>·</span>
            <span>Comunidad & Academia Institucional de Índices Sintéticos</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Deriv MT5 Compatible</span>
            <span>·</span>
            <span>NestJS + PostgreSQL Architecture</span>
            <span>·</span>
            <span>© 2026 MG Alpha Block</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
