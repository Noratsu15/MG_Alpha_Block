import React, { useState } from 'react';
import { CommunityPost, UserProfile, UserRole } from '../types';
import { 
  MessageSquare, Heart, Share2, Plus, Search, 
  CheckCircle2, X, Send, Sparkles, Filter
} from 'lucide-react';
import { sanitizeInput } from '../utils/syntheticMath';

interface CommunityViewProps {
  posts: CommunityPost[];
  currentUser: UserProfile;
  onAddPost: (post: Omit<CommunityPost, 'id' | 'createdAt' | 'likes' | 'commentsCount'>) => void;
  onAddComment: (postId: string, content: string) => void;
  onToggleLike: (postId: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  posts,
  currentUser,
  onAddPost,
  onAddComment,
  onToggleLike
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState<boolean>(false);
  const [expandedCommentsPostId, setExpandedCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');

  // New post modal form state
  const [postTitle, setPostTitle] = useState<string>('');
  const [postAssetTag, setPostAssetTag] = useState<string>('CRASH_300');
  const [postContent, setPostContent] = useState<string>('');
  const [postChartUrl, setPostChartUrl] = useState<string>('/src/assets/images/course_smc_liquidity_1794190653438.jpg');

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    if (selectedTag !== 'ALL' && p.assetTag !== selectedTag) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      alert('Por favor completa el título y el análisis del trade.');
      return;
    }

    // Strict sanitization of user inputs
    const cleanTitle = sanitizeInput(postTitle);
    const cleanContent = sanitizeInput(postContent);

    onAddPost({
      author: currentUser.name,
      avatar: currentUser.avatarUrl,
      role: currentUser.role,
      title: cleanTitle,
      assetTag: postAssetTag,
      content: cleanContent,
      chartUrl: postChartUrl || undefined,
      verifiedSetup: currentUser.role === 'MASTER_VIP' || currentUser.role === 'ADMIN'
    });

    setPostTitle('');
    setPostContent('');
    setIsNewPostModalOpen(false);
  };

  const handleSendComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const clean = sanitizeInput(commentInput);
    onAddComment(postId, clean);
    setCommentInput('');
  };

  const tagList = [
    { id: 'ALL', label: '#Todos' },
    { id: 'CRASH_300', label: '#Crash300' },
    { id: 'BOOM_1000', label: '#Boom1000' },
    { id: 'VOL_75', label: '#Volatility75' },
    { id: 'BOOM_300', label: '#Boom300' }
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Community Header & Action Bar */}
      <div className="p-4 rounded-xl bg-[#111827] border border-[#1F2937] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight">
              Comunidad & Foro de Debate Técnico
            </h1>
            <p className="text-xs text-slate-400">
              Comparte análisis de Order Blocks, desgloses de trades y debate estrategias con los miembros.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsNewPostModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-blue-600/20 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publicar Análisis</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Asset Tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {tagList.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                selectedTag === tag.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-[#111827] text-slate-400 border border-[#1F2937] hover:text-white'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por activo, autor o concepto..."
            className="w-full bg-[#111827] border border-[#1F2937] focus:border-blue-500 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500"
          />
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isCommentsOpen = expandedCommentsPostId === post.id;

          return (
            <div
              key={post.id}
              className="p-5 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-slate-700 transition-all space-y-4"
            >
              {/* Author & Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-9 h-9 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{post.author}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                        post.role === 'ADMIN' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                        post.role === 'MASTER_VIP' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                        post.role === 'TRADER_PRO' ? 'bg-blue-950 text-blue-400 border-blue-800' :
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {post.role}
                      </span>
                      {post.verifiedSetup && (
                        <span className="flex items-center gap-0.5 text-[10px] text-emerald-400 font-mono">
                          <CheckCircle2 className="w-3 h-3" /> Setup Verificado
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{post.createdAt}</span>
                  </div>
                </div>

                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  #{post.assetTag}
                </span>
              </div>

              {/* Title & Body */}
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Attached Chart Image (if present) */}
              {post.chartUrl && (
                <div className="rounded-lg overflow-hidden border border-[#1F2937] max-h-96 bg-black">
                  <img
                    src={post.chartUrl}
                    alt="Gráfico técnico del trade"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Interactions Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1F2937] text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.userLiked ? 'text-rose-400 font-semibold' : 'hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.userLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    <span className="font-mono tabular-nums">{post.likes}</span>
                  </button>

                  <button
                    onClick={() => setExpandedCommentsPostId(isCommentsOpen ? null : post.id)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-mono tabular-nums">{post.comments?.length || post.commentsCount}</span>
                    <span>Comentarios</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono text-slate-500">
                  MG Alpha Community
                </span>
              </div>

              {/* Expanded Comments Thread */}
              {isCommentsOpen && (
                <div className="pt-3 border-t border-[#1F2937] space-y-3 bg-[#0A0E17]/60 -mx-5 -mb-5 p-5 rounded-b-xl">
                  {/* Comments List */}
                  {post.comments && post.comments.length > 0 ? (
                    <div className="space-y-2.5">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="p-2.5 rounded-lg bg-[#111827] border border-[#1F2937] text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-white">{comment.author}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{comment.role}</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono">{comment.createdAt}</span>
                          </div>
                          <p className="text-slate-300 leading-normal">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 py-1">Sé el primero en aportar a este análisis técnico.</p>
                  )}

                  {/* Add Comment Input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Escribe un comentario o consulta sobre este trade..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendComment(post.id);
                      }}
                      className="flex-1 bg-[#111827] border border-[#1F2937] focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500"
                    />
                    <button
                      onClick={() => handleSendComment(post.id)}
                      className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-xl bg-[#111827] border border-[#1F2937] shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-3 border-b border-[#1F2937] mb-4">
              <h3 className="text-base font-bold text-white">Publicar Análisis o Debate</h3>
              <button 
                onClick={() => setIsNewPostModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">Título del Análisis</label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="Ej: Setup en Crash 300 con Order Block de H1..."
                  className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">Activo de Referencia</label>
                <select
                  value={postAssetTag}
                  onChange={(e) => setPostAssetTag(e.target.value)}
                  className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white font-mono"
                >
                  <option value="CRASH_300">Crash 300 Index</option>
                  <option value="CRASH_500">Crash 500 Index</option>
                  <option value="BOOM_1000">Boom 1000 Index</option>
                  <option value="BOOM_300">Boom 300 Index</option>
                  <option value="VOL_75">Volatility 75 Index</option>
                  <option value="STEP_INDEX">Step Index</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">Tesis Técnica / Observaciones</label>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Detalla tu entrada, el Stop Loss, la confirmación de fractales o tu consulta para la comunidad..."
                  rows={4}
                  className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white leading-relaxed resize-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 mb-1 block">Captura del Gráfico</label>
                <select
                  value={postChartUrl}
                  onChange={(e) => setPostChartUrl(e.target.value)}
                  className="w-full bg-[#0A0E17] border border-[#1F2937] rounded-md p-2 text-white font-mono"
                >
                  <option value="/src/assets/images/course_smc_liquidity_1794190653438.jpg">Gráfico de Order Blocks & FVG</option>
                  <option value="/src/assets/images/course_indices_foundations_1794190654251.jpg">Gráfico de Generador Algorítmico</option>
                  <option value="/src/assets/images/hero_trading_terminal_1794190653353.jpg">Captura de Terminal Multimonitor</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1F2937]">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-md text-xs hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-md text-xs shadow-md"
                >
                  Publicar en el Muro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
