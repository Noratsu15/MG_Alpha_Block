export type UserRole = 'FREE' | 'TRADER_PRO' | 'MASTER_VIP' | 'ADMIN';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  memberSince: string;
  completedLessons: string[];
  notes: Record<string, string>; // lessonId -> markdown/notes
  accountType: 'DEMO' | 'REAL_DERIV';
  tradingBalance: number;
}

export interface ResourceAttachment {
  name: string;
  size: string;
  type: 'pdf' | 'template' | 'indicator' | 'doc';
  description: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  duration: string;
  videoUrl: string;
  previewThumbnail: string;
  requiredRole: UserRole;
  summary: string;
  keyPoints: string[];
  resources?: ResourceAttachment[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  level: 'Iniciación' | 'Intermedio' | 'Avanzado' | 'Mastery Institucional';
  requiredRole: UserRole;
  lessonsCount: number;
  totalDuration: string;
  thumbnail: string;
  lessons: Lesson[];
}

export type SignalAction = 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT';
export type SignalStatus = 'PENDING' | 'ACTIVE' | 'HIT_TP1' | 'HIT_TP2' | 'HIT_SL' | 'CLOSED';

export interface TradingSignal {
  id: string;
  asset: string;
  action: SignalAction;
  entryPrice: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2?: number;
  takeProfit3?: number;
  timeframe: string;
  status: SignalStatus;
  pipsGained?: number;
  author: string;
  createdAt: string;
  rationale: string;
  chartUrl?: string;
  requiredRole: UserRole;
}

export type AssetCategory = 'BOOM_CRASH' | 'VOLATILITY' | 'STEP' | 'JUMP';

export interface SyntheticAssetSpec {
  symbol: string;
  name: string;
  category: AssetCategory;
  minLot: number;
  maxLot: number;
  lotStep: number;
  pointValue: number; // USD per point at 1.0 lot
  tickSize: number;
  description: string;
  defaultSlPoints: number;
}

export interface CommunityComment {
  id: string;
  author: string;
  avatar: string;
  role: UserRole;
  content: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  role: UserRole;
  title: string;
  assetTag: string;
  content: string;
  createdAt: string;
  likes: number;
  userLiked?: boolean;
  commentsCount: number;
  comments?: CommunityComment[];
  chartUrl?: string;
  verifiedSetup?: boolean;
}

export interface ArchitectureDoc {
  id: string;
  title: string;
  category: 'NESTJS_SETUP' | 'SECURITY_PIPES' | 'DATABASE_SCHEMA' | 'RBAC_GUARDS' | 'SANITIZATION';
  description: string;
  filename: string;
  language: string;
  code: string;
  highlights: string[];
}
