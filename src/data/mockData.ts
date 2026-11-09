import { CourseModule, TradingSignal, CommunityPost, ArchitectureDoc, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_alpha_99',
  name: 'Alejandro Morales',
  email: 'a.morales@mgalpha.io',
  role: 'TRADER_PRO',
  avatarUrl: '/src/assets/images/avatar_mentor_lead_1794190654694.jpg',
  memberSince: 'Octubre 2024',
  completedLessons: ['les_1_1', 'les_1_2', 'les_2_1'],
  notes: {
    'les_1_1': 'El generador pseudo-aleatorio de Deriv responde a probabilidades invariables. No hay manipulación bancaria directa sino algoritmos de liquidez continuos.',
    'les_2_1': 'Clave: Esperar el ChoCH en M5 antes de entrar al Order Block en M1 para minimizar el SL en Crash 300.'
  },
  accountType: 'REAL_DERIV',
  tradingBalance: 3450.00
};

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'mod_1',
    title: '01. Fundamentos & Mecánica Algorítmica',
    description: 'Comprende el funcionamiento matemático de los índices sintéticos de Deriv, spreads fijos, tick rate y configuración óptima de terminales.',
    level: 'Iniciación',
    requiredRole: 'FREE',
    lessonsCount: 3,
    totalDuration: '1h 07m',
    thumbnail: '/src/assets/images/course_indices_foundations_1794190654251.jpg',
    lessons: [
      {
        id: 'les_1_1',
        moduleId: 'mod_1',
        title: 'Mecánica de los Índices Sintéticos: Generadores Pseudo-Aleatorios',
        duration: '18:40',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        previewThumbnail: '/src/assets/images/course_indices_foundations_1794190654251.jpg',
        requiredRole: 'FREE',
        summary: 'Explicación técnica de cómo Deriv simula la volatilidad del mercado real mediante algoritmos criptográficos sin intervención de noticias macroeconómicas.',
        keyPoints: [
          'Diferencias entre Forex tradicional (mercado interbancario) e Índices Sintéticos (algoritmos matemáticos 24/7).',
          'Concepto de Spikes en Boom/Crash: distribución probabilística de caídas y subidas cada 300, 500 y 1000 tics.',
          'Por qué no les afectan eventos de noticias como NFP, IPC o tasas de interés de la FED.',
          'Configuración de cuentas en Deriv y conexión segura a MetaTrader 5 (MT5).'
        ],
        resources: [
          { name: 'Manual_Indices_Sinteticos_MG.pdf', size: '2.4 MB', type: 'pdf', description: 'Guía oficial de especificaciones de contratos de Deriv' },
          { name: 'Template_MT5_AlphaBlock.tpl', size: '14 KB', type: 'template', description: 'Plantilla de visualización oscura con rejilla institucional' }
        ]
      },
      {
        id: 'les_1_2',
        moduleId: 'mod_1',
        title: 'Configuración Profesional de MT5 y Tipos de Órdenes',
        duration: '22:15',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        previewThumbnail: '/src/assets/images/course_indices_foundations_1794190654251.jpg',
        requiredRole: 'FREE',
        summary: 'Aprende a ejecutar órdenes pendientes Buy Stop, Sell Limit y órdenes de mercado gestionando el deslizamiento (slippage) típico en los spikes.',
        keyPoints: [
          'Diferencia entre ejecución por mercado y órdenes límites en Crash y Boom.',
          'Cómo se comporta el Stop Loss ante un spike (deslizamiento inevitable y cómo mitigar el riesgo).',
          'Configuración de atajos de teclado y One-Click Trading en MT5.',
          'Visualización de spreads y comisiones transparentes.'
        ],
        resources: [
          { name: 'CheatSheet_Ordenes_MT5.pdf', size: '1.1 MB', type: 'pdf', description: 'Resumen de ejecución y gestión de slippage' }
        ]
      },
      {
        id: 'les_1_3',
        moduleId: 'mod_1',
        title: 'Gestión Monetaria Básica y Psicología de los Spikes',
        duration: '26:30',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        previewThumbnail: '/src/assets/images/course_indices_foundations_1794190654251.jpg',
        requiredRole: 'FREE',
        summary: 'La regla de oro para no quemar cuentas: cómo calcular el lote mínimo y mantener la calma durante los retrocesos sostenidos.',
        keyPoints: [
          'La regla del 1% máximo de riesgo por operación.',
          'Cómo los traders novatos queman cuentas operando en contra de la tendencia del spike.',
          'Bitácora de trading recomendada y métricas clave de rendimiento.',
          'Plan de trading diario con drawdown máximo permitido.'
        ],
        resources: [
          { name: 'Plantilla_Bitacora_Trading_MG.xlsx', size: '380 KB', type: 'doc', description: 'Hoja de cálculo para registro y cálculo de drawdown' }
        ]
      }
    ]
  },
  {
    id: 'mod_2',
    title: '02. Smart Money Concepts (SMC) en Sintéticos',
    description: 'Estructuras de mercado avanzadas, Order Blocks institucionales, Fair Value Gaps y barridos de liquidez aplicados a los gráficos de Deriv.',
    level: 'Intermedio',
    requiredRole: 'TRADER_PRO',
    lessonsCount: 4,
    totalDuration: '2h 24m',
    thumbnail: '/src/assets/images/course_smc_liquidity_1794190653438.jpg',
    lessons: [
      {
        id: 'les_2_1',
        moduleId: 'mod_2',
        title: 'Estructura de Mercado: BoS y CHoCH en Timeframes Menores',
        duration: '34:10',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        previewThumbnail: '/src/assets/images/course_smc_liquidity_1794190653438.jpg',
        requiredRole: 'TRADER_PRO',
        summary: 'Aprende a identificar fractales limpios, quiebres de estructura (Break of Structure) y cambios de carácter (Change of Character) para anticipar reversiones.',
        keyPoints: [
          'Identificación de fractales alcistas y bajistas en velas de 15 minutos (M15) y 1 hora (H1).',
          'Diferenciación entre un sweep falso y un verdadero rompimiento con cuerpo de vela.',
          'Mapeo estructural paso a paso en Crash 300 y Volatility 75.',
          'Puntos de interés (POI) de alta relevancia matemática.'
        ],
        resources: [
          { name: 'Guia_Visual_CHoCH_BoS.pdf', size: '3.2 MB', type: 'pdf', description: 'Diagramas de alta resolución con casos de estudio' }
        ]
      },
      {
        id: 'les_2_2',
        moduleId: 'mod_2',
        title: 'Order Blocks de Alta Probabilidad vs. Bloques Trampa',
        duration: '38:50',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        previewThumbnail: '/src/assets/images/course_smc_liquidity_1794190653438.jpg',
        requiredRole: 'TRADER_PRO',
        summary: 'Filtra únicamente los Order Blocks originadores de movimiento con desbalance volumétrico para entradas sniper con Stop Loss milimétrico.',
        keyPoints: [
          'La última vela contraria antes de un impulso con ineficiencia.',
          'Order Blocks mitigados vs. no mitigados (zonas frescas).',
          'Refinamiento de bloques de H1 a M5 y M1 para reducir el riesgo en dólares.',
          'Cómo validar si el bloque tiene probabilidad de originar un spike en Crash 500 y Boom 1000.'
        ],
        resources: [
          { name: 'Checklist_Validacion_OrderBlocks.pdf', size: '1.4 MB', type: 'pdf', description: 'Criterios de 5 pasos para filtrar bloques de calidad' }
        ]
      },
      {
        id: 'les_2_3',
        moduleId: 'mod_2',
        title: 'Fair Value Gaps (FVG) e Imbalances en Volatility 75',
        duration: '41:20',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
        previewThumbnail: '/src/assets/images/course_smc_liquidity_1794190653438.jpg',
        requiredRole: 'TRADER_PRO',
        summary: 'Descubre cómo los vacíos de liquidez de 3 velas actúan como imanes de precio en Volatility 75 y Volatility 100.',
        keyPoints: [
          'Anatomía del FVG de 3 velas y cálculo del 50% (Consecutive Consequent Encroachment).',
          'Confluencia entre FVG y retrocesos de Fibonacci (zona OTE 61.8% - 79%).',
          'Estrategia de entrada en mitigación con confirmación en velas de 5 minutos.',
          'Reglas de salida cuando el gap queda completamente cerrado.'
        ],
        resources: [
          { name: 'Indicador_FVG_Alpha_MT5.ex5', size: '45 KB', type: 'indicator', description: 'Indicador para marcar desbalances automáticos en MT5' }
        ]
      },
      {
        id: 'les_2_4',
        moduleId: 'mod_2',
        title: 'Barridos de Liquidez (Sweeps) y Trampas de Inducción',
        duration: '29:45',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        previewThumbnail: '/src/assets/images/course_smc_liquidity_1794190653438.jpg',
        requiredRole: 'TRADER_PRO',
        summary: 'Detecta los altos y bajos iguales (Equal Highs / Equal Lows) donde se acumula la liquidez minorista para esperar la toma de liquidez institucional.',
        keyPoints: [
          'Buy-Side Liquidity (BSL) y Sell-Side Liquidity (SSL) en Step Index.',
          'Inducción de rompimiento falso (Fake Breakout) y reversión inmediata.',
          'Paciencia operativa: no entrar en la ruptura, sino en el testeo posterior.',
          'Ratio Beneficio:Riesgo medio de 1:4 en setups de barrido.'
        ]
      }
    ]
  },
  {
    id: 'mod_3',
    title: '03. Estrategias de Scalping & Caza de Spikes',
    description: 'Sistemas operativos específicos para capturar caídas en Crash y explosiones en Boom con ratios superiores a 1:5 y SL controlado.',
    level: 'Avanzado',
    requiredRole: 'TRADER_PRO',
    lessonsCount: 3,
    totalDuration: '1h 54m',
    thumbnail: '/src/assets/images/hero_trading_terminal_1794190653353.jpg',
    lessons: [
      {
        id: 'les_3_1',
        moduleId: 'mod_3',
        title: 'Caza de Spikes en Boom 300 y Crash 300: Método Alpha-Sniper',
        duration: '45:10',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
        previewThumbnail: '/src/assets/images/hero_trading_terminal_1794190653353.jpg',
        requiredRole: 'TRADER_PRO',
        summary: 'El activo más reactivo del mercado: operativa en M1 con ventanas de riesgo de máximo 8 a 12 tics de espera.',
        keyPoints: [
          'Zona de reacción estimada basada en fractales de 15 minutos.',
          'Regla estricta de las 8 velas: si no hay spike en la ventana, cierre manual inmediato.',
          'Aprovechamiento de cadenas de spikes dobles y triples.',
          'Gestión de tomas parciales: cerrar 70% en el primer spike y dejar correr el 30% a breakeven.'
        ]
      },
      {
        id: 'les_3_2',
        moduleId: 'mod_3',
        title: 'Trading de Tendencia y Retrocesos en Step Index',
        duration: '32:00',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4',
        previewThumbnail: '/src/assets/images/hero_trading_terminal_1794190653353.jpg',
        requiredRole: 'TRADER_PRO',
        summary: 'El Step Index se mueve a pasos de 0.1 exactos; domina los patrones de continuación de tendencia con medias móviles exponenciales y Price Action.',
        keyPoints: [
          'Estrategia de pullback a la EMA 50 en gráficos de M15.',
          'Cálculo exacto del valor por paso ($1 por lote 0.1 en cada punto entero).',
          'Trailing Stop dinámico para maximizar ganancias en tendencias fuertes.',
          'Evitar el mercado lateral en horarios de baja liquidez.'
        ]
      },
      {
        id: 'les_3_3',
        moduleId: 'mod_3',
        title: 'Confluencia Multi-Temporal: De H4 a M1 en Volatility 75',
        duration: '37:25',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
        previewThumbnail: '/src/assets/images/hero_trading_terminal_1794190653353.jpg',
        requiredRole: 'TRADER_PRO',
        summary: 'La metodología institucional completa: sesgo direccional en H4, zona de confluencia en M15 y gatillo en vela de confirmación M1.',
        keyPoints: [
          'Top-down analysis institucional paso a paso.',
          'Determinación del sesgo diario (Daily Bias).',
          'Eliminación del ruido de mercado en temporalidades ultra-cortas.',
          'Ejemplos reales grabados de entradas en vivo.'
        ]
      }
    ]
  },
  {
    id: 'mod_4',
    title: '04. Masterclass VIP & Cuentas de Fondeo',
    description: 'Acceso reservado a Master VIP: modelado cuantitativo, preparación para pruebas de fondeo de $10,000 a $100,000 y sesiones de mentoría privadas.',
    level: 'Mastery Institucional',
    requiredRole: 'MASTER_VIP',
    lessonsCount: 4,
    totalDuration: '3h 24m',
    thumbnail: '/src/assets/images/avatar_mentor_lead_1794190654694.jpg',
    lessons: [
      {
        id: 'les_4_1',
        moduleId: 'mod_4',
        title: 'Modelado Matemático de Spikes y Ratios de Drawdown Cuantitativo',
        duration: '52:10',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        previewThumbnail: '/src/assets/images/course_smc_liquidity_1794190653438.jpg',
        requiredRole: 'MASTER_VIP',
        summary: 'Análisis estocástico y probabilístico de las frecuencias de spikes en Boom 300, 500 y 1000 para optimizar el sizing de cada posición.',
        keyPoints: [
          'Distribución de probabilidad exponencial en Deriv.',
          'Cómo calcular el Valor Esperado Matemático (EV+) de una estrategia.',
          'Curva de crecimiento de capital y control estricto de Drawdown Máximo.',
          'Estrategia de amortiguación de pérdidas con hedging calculado.'
        ]
      },
      {
        id: 'les_4_2',
        moduleId: 'mod_4',
        title: 'Auditoría y Plan para Aprobar Pruebas de Fondeo en Sintéticos',
        duration: '48:30',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
        previewThumbnail: '/src/assets/images/hero_trading_terminal_1794190653353.jpg',
        requiredRole: 'MASTER_VIP',
        summary: 'Estrategia probada para superar Fase 1 y Fase 2 sin rozar los límites de pérdida diaria del 5% y total del 10%.',
        keyPoints: [
          'Reglamento de firmas de fondeo que permiten índices sintéticos.',
          'Límites de drawdown estático vs. trailing drawdown relativo.',
          'División del objetivo mensual en 10 operaciones de alta probabilidad.',
          'Psicología de la gestión de capital ajeno y retiro regular de utilidades.'
        ],
        resources: [
          { name: 'Plan_Fondeo_MG_Alpha_VIP.pdf', size: '4.8 MB', type: 'pdf', description: 'Hoja de ruta institucional para cuentas de $50k' }
        ]
      },
      {
        id: 'les_4_3',
        moduleId: 'mod_4',
        title: 'Desglose de Operaciones Reales de Mentoría ($10,000+ profit)',
        duration: '59:00',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        previewThumbnail: '/src/assets/images/avatar_mentor_lead_1794190654694.jpg',
        requiredRole: 'MASTER_VIP',
        summary: 'Grabación de la sesión privada semanal analizando 5 operaciones de alta escala en Crash 300 y Volatility 75 ejecutadas con los miembros VIP.',
        keyPoints: [
          'Entrada en vivo en el Order Block mayor de Crash 300.',
          'Manejo de la incertidumbre durante 30 minutos de drawdown controlado.',
          'Ejecución del spike de 120 puntos y trailing stop coordinado.',
          'Ronda de preguntas y respuestas con corrección de gráficos de alumnos.'
        ]
      },
      {
        id: 'les_4_4',
        moduleId: 'mod_4',
        title: 'Matriz de Correlación Oculta y Volatilidad en Índices Deriv',
        duration: '44:15',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        previewThumbnail: '/src/assets/images/course_indices_foundations_1794190654251.jpg',
        requiredRole: 'MASTER_VIP',
        summary: 'Aunque los índices sintéticos son teóricamente independientes, existen pautas de correlación de horario de trading y clusters de volatilidad que dan ventaja.',
        keyPoints: [
          'Análisis de la dispersión de tics por minuto en horarios de alta afluencia.',
          'Por qué ciertos pares responden con mayor limpieza en fines de semana.',
          'Plantilla de matriz de correlación en tiempo real para MT5.'
        ]
      }
    ]
  }
];

export const INITIAL_SIGNALS: TradingSignal[] = [
  {
    id: 'sig_01',
    asset: 'Crash 300 Index',
    action: 'SELL',
    entryPrice: 2845.50,
    stopLoss: 2862.00,
    takeProfit1: 2810.00,
    takeProfit2: 2775.00,
    takeProfit3: 2740.00,
    timeframe: 'M15',
    status: 'ACTIVE',
    pipsGained: 18.5,
    author: 'Master Miguel Gómez',
    createdAt: 'Hace 18 minutos',
    rationale: 'Rechazo limpio en Order Block H1 tras barrido de liquidez en 2855.00. Esperamos reacción bajista de 40+ puntos.',
    chartUrl: '/src/assets/images/course_smc_liquidity_1794190653438.jpg',
    requiredRole: 'TRADER_PRO'
  },
  {
    id: 'sig_02',
    asset: 'Boom 1000 Index',
    action: 'BUY',
    entryPrice: 8214.20,
    stopLoss: 8185.00,
    takeProfit1: 8275.00,
    takeProfit2: 8340.00,
    timeframe: 'M5',
    status: 'HIT_TP1',
    pipsGained: 60.8,
    author: 'MG Alpha Desk',
    createdAt: 'Hace 1 hora',
    rationale: 'Confluencia de FVG M5 no mitigado con soporte institucional diario. Primer spike capturado con +60.8 puntos.',
    chartUrl: '/src/assets/images/course_indices_foundations_1794190654251.jpg',
    requiredRole: 'FREE'
  },
  {
    id: 'sig_03',
    asset: 'Volatility 75 Index',
    action: 'SELL',
    entryPrice: 341850.00,
    stopLoss: 343200.00,
    takeProfit1: 338900.00,
    takeProfit2: 335000.00,
    takeProfit3: 331200.00,
    timeframe: 'H1',
    status: 'ACTIVE',
    pipsGained: 420.0,
    author: 'Quant Alpha Bot & Mentor',
    createdAt: 'Hace 45 minutos',
    rationale: 'Quiebre estructural de soporte diario (CHoCH) y retroceso al 61.8% OTE. Setup de alta confluencia institucional.',
    chartUrl: '/src/assets/images/hero_trading_terminal_1794190653353.jpg',
    requiredRole: 'TRADER_PRO'
  },
  {
    id: 'sig_04',
    asset: 'Step Index',
    action: 'BUY',
    entryPrice: 8842.1,
    stopLoss: 8828.0,
    takeProfit1: 8870.0,
    takeProfit2: 8895.0,
    timeframe: 'M15',
    status: 'HIT_TP2',
    pipsGained: 52.9,
    author: 'MG Alpha Desk',
    createdAt: 'Hace 3 horas',
    rationale: 'Ruptura de compresión y confirmación sobre EMA 50. Operación cerrada con 1:3.7 R:R completado.',
    requiredRole: 'TRADER_PRO'
  },
  {
    id: 'sig_05',
    asset: 'Boom 300 Index',
    action: 'BUY',
    entryPrice: 3120.40,
    stopLoss: 3105.00,
    takeProfit1: 3160.00,
    takeProfit2: 3215.00,
    timeframe: 'M1',
    status: 'ACTIVE',
    pipsGained: 12.0,
    author: 'Master Miguel Gómez (VIP Live)',
    createdAt: 'Hace 5 minutos',
    rationale: 'Setup Sniper VIP en M1: mitigación de decisional Order Block tras sweep de liquidez asiática.',
    requiredRole: 'MASTER_VIP'
  },
  {
    id: 'sig_06',
    asset: 'Crash 1000 Index',
    action: 'SELL',
    entryPrice: 6240.80,
    stopLoss: 6265.00,
    takeProfit1: 6190.00,
    takeProfit2: 6130.00,
    timeframe: 'M30',
    status: 'CLOSED',
    pipsGained: 78.4,
    author: 'Mentor Daniel Torres',
    createdAt: 'Ayer',
    rationale: 'Estructura bajista mayor respetando línea de tendencia institucional y 3 spikes consecutivos.',
    requiredRole: 'TRADER_PRO'
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_01',
    author: 'Carlos Trader',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'TRADER_PRO',
    title: 'Desglose de trade en Crash 300: 42 puntos con el FVG de M15',
    assetTag: 'CRASH_300',
    content: 'Compañeros de MG Alpha Block, comparto mi entrada de hoy en Crash 300. Esperé pacientemente a que el precio mitigara el Fair Value Gap que marcó el mentor en la clase 2.3. Entrada en 2845 con SL en 2855 (10 puntos de riesgo arriesgando $20). Reaccionó al tercer minuto y cayó con 2 spikes limpios hasta los 2803. Ratio 1:4.2 completado.',
    createdAt: 'Hace 35 minutos',
    likes: 19,
    userLiked: true,
    commentsCount: 4,
    chartUrl: '/src/assets/images/course_smc_liquidity_1794190653438.jpg',
    verifiedSetup: true,
    comments: [
      {
        id: 'c_01',
        author: 'Miguel Gómez (Mentor)',
        avatar: '/src/assets/images/avatar_mentor_lead_1794190654694.jpg',
        role: 'ADMIN',
        content: '¡Excelente ejecución, Carlos! El respeto a la regla de los 10 puntos de SL es lo que marca la diferencia entre un apostador y un trader consistente.',
        createdAt: 'Hace 20 minutos'
      },
      {
        id: 'c_02',
        author: 'Valeria R.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        role: 'TRADER_PRO',
        content: 'Yo también la tomé, cerré el 80% en el primer spike y el resto corrió solo. Gran sesión.',
        createdAt: 'Hace 12 minutos'
      }
    ]
  },
  {
    id: 'post_02',
    author: 'Esteban Méndez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'MASTER_VIP',
    title: 'Consejo para la prueba de fondeo de $10,000 en Volatility 75',
    assetTag: 'VOL_75',
    content: 'Muchos cometen el error de usar lotes de 0.01 o 0.02 con SL de 1000 puntos en Volatility 75. En una cuenta de $10k con límite diario de $500, un movimiento en falso te deja fuera en 2 horas. Usen la calculadora de la plataforma con lote 0.003 - 0.005 máximo. Si arriesgan el 0.5% por trade ($50) tienen 10 oportunidades diarias sin rozar el límite de drawdown.',
    createdAt: 'Hace 2 horas',
    likes: 34,
    userLiked: false,
    commentsCount: 6,
    chartUrl: '/src/assets/images/hero_trading_terminal_1794190653353.jpg',
    verifiedSetup: true
  },
  {
    id: 'post_03',
    author: 'Javier S.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'FREE',
    title: '¿Cuál es la diferencia real entre Boom 1000 y Boom 300?',
    assetTag: 'BOOM_300',
    content: 'Hola comunidad, apenas voy iniciando en el módulo gratuito 1. Veo que en Boom 300 los spikes salen con mucha más frecuencia que en el 1000, pero ¿es más difícil de predecir el punto exacto de giro?',
    createdAt: 'Hace 4 horas',
    likes: 8,
    userLiked: false,
    commentsCount: 3,
    comments: [
      {
        id: 'c_03',
        author: 'Andrés Quant',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        role: 'TRADER_PRO',
        content: 'Boom 300 tira un spike cada 300 tics promedio, por lo que la acción es muy rápida. Requiere timeframes de M1 o M5 y nunca dejar órdenes abiertas sin Stop Loss.',
        createdAt: 'Hace 3 horas'
      }
    ]
  }
];

export const ARCHITECTURE_DOCS: ArchitectureDoc[] = [
  {
    id: 'arch_01',
    title: 'Arquitectura Global de NestJS & Configuración de Seguridad',
    category: 'NESTJS_SETUP',
    description: 'Archivo principal bootstrap con Helmet, CORS estricto, Throttler rate limiting (100 req/min) y ValidationPipe global con filtrado de propiedades.',
    filename: 'src/main.ts',
    language: 'typescript',
    highlights: [
      'Helmet habilitado para protección X-Frame-Options, CSP y HSTS',
      'ValidationPipe con whitelist: true y forbidNonWhitelisted: true',
      'Rate limiter integrado para mitigar ataques DDoS y fuerza bruta en login',
      'Cookie-parser para manejo seguro de Refresh Tokens HttpOnly'
    ],
    code: `import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Cabeceras HTTP de máxima seguridad
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'", 'wss:']
      }
    },
    crossOriginEmbedderPolicy: false
  }));

  // 2. Cookie parser para Refresh Tokens seguros HttpOnly
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // 3. CORS con lista blanca estricta
  app.enableCors({
    origin: [process.env.APP_URL || 'https://mgalpha.io'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  });

  // 4. Sanitización y validación estricta de todos los payloads DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true,   // Lanza 400 si envían campos sospechosos o maliciosos
      transform: true,              // Convierte tipos automáticamente (string -> number)
      transformOptions: { enableImplicitConversion: true }
    })
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(\`[MG-Alpha-Core] Servidor seguro activo en puerto \${port}\`);
}
bootstrap();`
  },
  {
    id: 'arch_02',
    title: 'Control de Acceso Basado en Roles (RBAC) & Guards JWT',
    category: 'RBAC_GUARDS',
    description: 'Implementación de roles jerárquicos (Free, Trader Pro, Master VIP, Admin) con decorador @Roles y RolesGuard que verifica claims en el JWT.',
    filename: 'src/auth/guards/roles.guard.ts',
    language: 'typescript',
    highlights: [
      'Jerarquía estricta: ADMIN > MASTER_VIP > TRADER_PRO > FREE',
      'Decorador personalizado @Roles(Role.MASTER_VIP)',
      'Extracción de usuario desde JWT verificado en el contexto HTTP',
      'Lanza ForbiddenException con mensaje de seguridad estandarizado'
    ],
    code: `import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

// Nivel jerárquico numérico para validación simple
const ROLE_HIERARCHY: Record<Role, number> = {
  FREE: 1,
  TRADER_PRO: 2,
  MASTER_VIP: 3,
  ADMIN: 4
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no especifica roles, es de acceso libre para autenticados
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.role) {
      throw new ForbiddenException('Acceso restringido: no se detectó rol de suscripción.');
    }

    // El administrador siempre tiene acceso universal
    if (user.role === Role.ADMIN) return true;

    // Verificar si el usuario cumple con alguno de los roles o el nivel mínimo
    const userLevel = ROLE_HIERARCHY[user.role as Role] || 0;
    const hasRole = requiredRoles.some((role) => userLevel >= ROLE_HIERARCHY[role]);

    if (!hasRole) {
      throw new ForbiddenException(
        \`Se requiere membresía \${requiredRoles.join(' o ')} para acceder a este recurso.\`
      );
    }

    return true;
  }
}`
  },
  {
    id: 'arch_03',
    title: 'Sanitización de Inputs & Validación DTO con Class-Validator',
    category: 'SECURITY_PIPES',
    description: 'DTO para publicación de señales y análisis técnicos con validación matemática de precios, filtrado XSS y prevención de inyección.',
    filename: 'src/signals/dto/create-signal.dto.ts',
    language: 'typescript',
    highlights: [
      'Decoradores @IsNumber, @Min, @Max para garantizar coherencia en precios',
      'Transformadores @Transform con sanitizeHtml para limpiar texto de ataques XSS',
      'Validación de ENUMs estrictos para evitar valores desconocidos en base de datos',
      'Lógica personalizada para asegurar que Stop Loss != Entry Price'
    ],
    code: `import { IsString, IsNotEmpty, IsNumber, IsEnum, Min, Max, IsOptional, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import sanitizeHtml from 'sanitize-html';

export enum SignalAction {
  BUY = 'BUY',
  SELL = 'SELL',
  BUY_LIMIT = 'BUY_LIMIT',
  SELL_LIMIT = 'SELL_LIMIT'
}

export enum SyntheticAsset {
  CRASH_300 = 'Crash 300 Index',
  CRASH_500 = 'Crash 500 Index',
  CRASH_1000 = 'Crash 1000 Index',
  BOOM_300 = 'Boom 300 Index',
  BOOM_500 = 'Boom 500 Index',
  BOOM_1000 = 'Boom 1000 Index',
  VOLATILITY_75 = 'Volatility 75 Index',
  STEP_INDEX = 'Step Index'
}

export class CreateSignalDto {
  @IsEnum(SyntheticAsset, { message: 'El activo proporcionado no es válido en Deriv.' })
  asset: SyntheticAsset;

  @IsEnum(SignalAction, { message: 'Tipo de orden no reconocida.' })
  action: SignalAction;

  @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El precio de entrada debe ser numérico.' })
  @Min(0.001)
  @Max(10000000)
  entryPrice: number;

  @IsNumber({ maxDecimalPlaces: 4 }, { message: 'El Stop Loss debe ser un número válido.' })
  @Min(0.001)
  @Max(10000000)
  stopLoss: number;

  @IsNumber({ maxDecimalPlaces: 4 })
  @Min(0.001)
  @Max(10000000)
  takeProfit1: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 4 })
  takeProfit2?: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  timeframe: string; // 'M1', 'M5', 'M15', 'H1'

  // Sanitización obligatoria en la tesis de trading para erradicar scripts o XSS
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @Transform(({ value }) => sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim())
  rationale: string;
}`
  },
  {
    id: 'arch_04',
    title: 'Esquema Relacional PostgreSQL con Prisma ORM',
    category: 'DATABASE_SCHEMA',
    description: 'Diseño de base de datos relacional PostgreSQL con relaciones ACID para usuarios, membresías, cursos, progreso de video, señales y auditoría.',
    filename: 'prisma/schema.prisma',
    language: 'prisma',
    highlights: [
      'Tipos ENUM nativos de PostgreSQL para Role, SubscriptionStatus y SignalStatus',
      'Índices de alta velocidad en asset, status, userId y createdAt',
      'Relación 1:N entre Cursos -> Módulos -> Lecciones y N:M con Progreso',
      'Campos seguros para control de sesiones con rotación de refresh tokens'
    ],
    code: `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  FREE
  TRADER_PRO
  MASTER_VIP
  ADMIN
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  EXPIRED
}

enum SignalStatus {
  PENDING
  ACTIVE
  HIT_TP1
  HIT_TP2
  HIT_SL
  CLOSED
}

model User {
  id                    String              @id @default(uuid())
  email                 String              @unique
  passwordHash          String              // Hashed con Argon2id
  name                  String
  role                  Role                @default(FREE)
  avatarUrl             String?
  tradingAccountId      String?             // Deriv CR Account
  refreshTokenHash      String?             // Hash del token rotativo
  subscriptionStatus    SubscriptionStatus  @default(ACTIVE)
  subscriptionExpiresAt DateTime?
  createdAt             DateTime            @default(now())
  updatedAt             DateTime            @updatedAt

  progress              UserProgress[]
  lessonNotes           LessonNote[]
  posts                 CommunityPost[]
  comments              PostComment[]

  @@index([email])
  @@index([role])
}

model CourseModule {
  id          String   @id @default(uuid())
  title       String
  description String
  sortOrder   Int      @default(0)
  minRole     Role     @default(FREE)
  createdAt   DateTime @default(now())
  
  lessons     Lesson[]
}

model Lesson {
  id          String       @id @default(uuid())
  moduleId    String
  title       String
  videoUrl    String       // URL firmada en Cloud Storage / CDN
  durationSec Int
  summary     String       @db.Text
  minRole     Role         @default(FREE)
  sortOrder   Int          @default(0)
  createdAt   DateTime     @default(now())

  module      CourseModule @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  progress    UserProgress[]
  notes       LessonNote[]

  @@index([moduleId])
}

model UserProgress {
  id          String   @id @default(uuid())
  userId      String
  lessonId    String
  completed   Boolean  @default(false)
  watchSec    Int      @default(0)
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson      Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
}

model LessonNote {
  id        String   @id @default(uuid())
  userId    String
  lessonId  String
  content   String   @db.Text
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson    Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  @@unique([userId, lessonId])
}

model TradingSignal {
  id          String       @id @default(uuid())
  asset       String       // 'Crash 300 Index', 'Boom 1000 Index', etc.
  action      String       // 'BUY', 'SELL', 'BUY_LIMIT', 'SELL_LIMIT'
  entryPrice  Decimal      @db.Decimal(12, 4)
  stopLoss    Decimal      @db.Decimal(12, 4)
  takeProfit1 Decimal      @db.Decimal(12, 4)
  takeProfit2 Decimal?     @db.Decimal(12, 4)
  timeframe   String       // 'M5', 'M15', 'H1'
  status      SignalStatus @default(PENDING)
  pipsGained  Decimal?     @db.Decimal(10, 2)
  rationale   String       @db.Text
  chartUrl    String?
  minRole     Role         @default(TRADER_PRO)
  authorId    String
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@index([status])
  @@index([asset])
  @@index([minRole])
}`
  }
];
