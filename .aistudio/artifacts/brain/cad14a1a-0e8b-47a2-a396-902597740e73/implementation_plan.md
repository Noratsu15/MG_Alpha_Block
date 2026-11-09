# MG Alpha Block — Classroom & Plataforma de Trading para Índices Sintéticos

Plataforma educativa y operativa de nivel institucional diseñada para la comunidad **MG Alpha Block**, especializada en índices sintéticos (Boom, Crash, Volatility, Step Index). Integra un aula virtual modular (Classroom) con seguimiento de progreso, canal de señales y análisis técnico en tiempo real, calculadora de gestión de riesgo y lotaje adaptada a los algoritmos de Deriv, sala de debate comunitario y un sistema de suscripción con control de acceso basado en roles (RBAC).

---

### User Review & Critical Decisions

> [!IMPORTANT]
> Se han incorporado las decisiones confirmadas en la fase de clarificación interactiva. A continuación se detallan las elecciones aprobadas y la recomendación técnica para producción:

- **Niveles de Membresía Confirmados**:
  - `Gratuito (Free Tier)`: Acceso al módulo introductorio de índices sintéticos, calculadora básica de riesgo y canal de señales con retraso/educativo.
  - `Trader Pro`: Acceso a la academia completa (Estructura de Mercado, Liquidez, Bloques de Órdenes), señales en vivo con TP/SL interactivo, calculadora de lotaje con autocompletado y canal de análisis comunitario.
  - `Master VIP`: Acceso a masterclasses en vivo grabadas, mentorías semanales, plantillas institucionales y canal exclusivo de setups de alta probabilidad.
  - `Mentor / Admin`: Panel de gestión para publicar módulos, registrar señales con métricas y administrar usuarios.
- **Funcionalidades Clave Confirmadas**:
  - Classroom con video player, lecciones jerarquizadas, checkpoints de progreso y notas por clase.
  - Terminal de Señales en Vivo con status dinámico (En Espera, Activa, TP1, TP2, Stop Loss) y botón de "Enviar a Calculadora".
  - Calculadora de Lotes y Gestión de Capital calibrada para las fórmulas de puntos/ticks de índices sintéticos (Boom/Crash 300, 500, 1000; Volatility 75, 100, 25; Step Index).
  - Hub de Discusión y Debate de Trading con filtrado por activo y análisis técnico con imágenes/gráficos.
- **Estilo Visual Confirmado**:
  - Dark mode institucional estilo terminal financiera premium (fondo obsidiana `#0A0E17`, superficies `#111827`, bordes sutiles `#1F2937`, acentos esmeralda `#10B981` y carmesí `#EF4444`, tipografía display `Plus Jakarta Sans` y cifras numéricas en `JetBrains Mono` con `tabular-nums`).
- **Arquitectura de Backend y Seguridad Recomendada para Producción**:
  - **Stack**: Node.js con NestJS + TypeScript + PostgreSQL + Prisma ORM.
  - **Sanitización & Validación**: `class-validator` y `class-transformer` en el backend con ValidationPipe global (`whitelist: true`, `forbidNonWhitelisted: true`, `transform: true`), sanitización DOM con `DOMPurify` y Zod schemas en cliente.
  - **Seguridad**: Autenticación JWT con rotación de Refresh Tokens en cookies HttpOnly SameSite=Strict, `helmet` para cabeceras HTTP, rate limiting con `@nestjs/throttler` (protección DDoS/Brute-force) y hashing de contraseñas con Argon2id.

---

### 1. Overview & Core Concept

- **Qué es**: Una plataforma integral tipo academia/terminal financiera SaaS para la comunidad **MG Alpha Block**, donde los miembros aprenden estrategias cuantitativas y de Price Action aplicadas a índices sintéticos, reciben señales auditadas y calculan su gestión monetaria con precisión matemática.
- **Audiencia Objetivo**: Traders de índices sintéticos (desde novatos hasta operadores experimentados con cuentas de fondeo o capital propio en Deriv/MT5) y mentores de la academia MG Alpha Block.
- **Valor Principal**: Centralizar la educación estructurada, la operativa en tiempo real y la disciplina de riesgo en una sola suite profesional, evitando la dispersión de información en chats de Telegram o carpetas de Drive desordenadas.

---

### 2. User Experience & Visual Design

#### A. Flujos de Usuario Principales

1. **Exploración & Dashboard del Estudiante**:
   - Resumen del plan actual del usuario (`Gratuito`, `Trader Pro`, `Master VIP`).
   - Métrica de avance del curso (% completado, horas estudiadas, última clase vista).
   - Widget de "Señales Recientes" con alertas en vivo y estado del mercado.
2. **Aula Virtual (Classroom & Player)**:
   - Panel izquierdo con árbol de módulos (Fundamentos de Índices Sintéticos, Estructura Algorítmica, Order Blocks & Imbalances, Psicotrading & Gestión).
   - Reproductor de video central con selector de velocidad (1x, 1.25x, 1.5x, 2x), botón de "Marcar como completada", recursos descargables (PDFs, plantillas MT5) y cuaderno de notas personales.
   - Bloqueo visual elegante de contenido con badge de suscripción requerida y botón de upgrade para lecciones no permitidas según el rol.
3. **Terminal de Señales en Vivo**:
   - Tabla de operaciones en tiempo real: Par/Índice (ej: `Crash 300`, `Boom 1000`, `Vol 75`), Tipo (`BUY LIMIT`, `SELL SPIKE`, `EXECUTION MARKET`), Entrada, Stop Loss, TP1, TP2, Ratio R:R.
   - Badge de estado dinámico (`Pendiente`, `En Curso`, `TP1 Alcanzado`, `TP2 Alcanzado`, `SL`).
   - Botón directo `"Calcular Riesgo"` que transfiere los valores directamente a la calculadora de lotaje.
4. **Calculadora Especializada de Índices Sintéticos**:
   - Selector de índice con parámetros precargados de contrato y tamaño de lote mínimo/máximo según las reglas de Deriv.
   - Entradas: Capital de la cuenta ($USD), Porcentaje o monto a arriesgar (ej: 1% o $50), Precio de entrada, Precio de Stop Loss.
   - Salida inmediata: Tamaño de lote exacto recomendado, pérdida máxima proyectada, ganancia en cada Take Profit y ratio Beneficio/Riesgo.
5. **Comunidad & Sala de Debate**:
   - Muro de análisis técnico categorizado por índice (ej. `#BoomCrash`, `#Volatility75`, `#Psicologia`).
   - Publicación de ideas de trade con imagen/captura de pantalla, tesis de trading y comentarios interactivos.
6. **Selector de Roles / Demo de Suscripción**:
   - Barra de conmutación de roles rápida en modo de prueba para alternar entre `Gratuito`, `Trader Pro`, `Master VIP` y `Mentor/Admin`, demostrando de inmediato cómo el sistema RBAC restringe o habilita vistas y acciones.

#### B. Identidad Visual & Sistema de Diseño

- **Atmósfera**: Terminal financiera institucional dark mode, limpia, tecnológica y libre de elementos distractores.
- **Paleta de Colores (Tailwind Tokens)**:
  - Fondo Canvas Primario: `#0A0E17` (Obsidiana profundo)
  - Superficies y Paneles: `#111827` (Gris azulado muy oscuro)
  - Bordes y Divisores: `#1F2937` (Líneas finas hairline de 1px)
  - Acento Primario / Marca: `#2563EB` / `#3B82F6` (Azul institucional Alpha)
  - Estado Alcista / Ganancias / Éxito: `#10B981` (Verde esmeralda nítido)
  - Estado Bajista / Stop Loss / Alertas: `#EF4444` (Rojo carmesí de precisión)
  - Texto Principal: `#F9FAFB` (Blanco suave de alta legibilidad)
  - Metadatos Muted: `#9CA3AF` (Gris medio legible con separadores `·`)
- **Tipografía**:
  - Títulos y Branding: `Plus Jakarta Sans`, SemiBold/Bold con `tracking-tight`.
  - Contenido y Lectura: `Plus Jakarta Sans` / `DM Sans` con interlineado generoso.
  - Datos Numéricos, Tiempos y Precios: `JetBrains Mono` con clase `tabular-nums` obligatoria para alineación perfecta de decimales.
- **Disciplina Anti-Slop**:
  - Cero badges píldora redundantes en metadatos (separadores limpios `·` o `/`).
  - Cero números o métricas falsas inventadas.
  - Sin animaciones lentas o elementos flotantes invasivos; transiciones $\le 200\text{ms}$.

---

### 3. Key Product Decisions & Trade-Offs

#### Decisión 1: Arquitectura de Backend — Node.js + NestJS + TypeScript + PostgreSQL
- **Enfoque Recomendado**:
  - **NestJS** ofrece una arquitectura modular enterprise orientada a controladores, servicios, repositorios y módulos fuertemente tipados, ideal para escalar equipos y código.
  - **PostgreSQL** mediante Prisma o Drizzle ORM ofrece integridad referencial estricta, soporte ACID para transacciones de pagos y suscripciones, y consultas eficientes para historiales de señales y progreso del estudiante.
- **Seguridad & Sanitización Integral**:
  - **Validación de Entradas**: DTOs de NestJS con decoradores de `class-validator` (`@IsString()`, `@IsEmail()`, `@IsNumber()`, `@Min()`, `@Max()`, `@IsOptional()`) junto a `@nestjs/common` `ValidationPipe` global con `{ whitelist: true, forbidNonWhitelisted: true }` para impedir inyección de propiedades maliciosas.
  - **Sanitización XSS**: `sanitize-html` o `dompurify` para cualquier texto enriquecido o comentario en la comunidad antes de almacenar o renderizar.
  - **Protección SQL Injection**: Prisma/Drizzle parametriza automáticamente todas las consultas SQL preparadas, erradicando inyecciones SQL.
  - **Autenticación & Autorización**: JWT (Access Token 15m + Refresh Token 7d rotativo en cookie `HttpOnly`, `Secure`, `SameSite=Strict`), guards de NestJS (`@UseGuards(JwtAuthGuard, RolesGuard)`) y decorador personalizado `@Roles(Role.VIP, Role.PRO)`.
  - **Cabeceras Seguras**: `helmet` (CSP, X-Frame-Options, HSTS, No-Sniff) y CORS configurado con lista blanca estricta.

#### Decisión 2: Motor de Gestión de Riesgo para Índices Sintéticos
- **Enfoque**:
  - A diferencia de Forex tradicional (donde el pip tiene un valor casi estándar de $10 en lotes estándar de 1.0), los índices sintéticos de Deriv tienen fórmulas específicas:
    - *Boom / Crash*: Cálculo de pips por caída/subida brusca de spikes y tics de recuperación; tamaño de tick de 0.001 o 0.01; lotes mínimos desde 0.20 hasta 0.50 según la versión (300, 500, 1000).
    - *Volatility 75 (1s) & 100*: Gran apalancamiento, lotes mínimos desde 0.001 / 0.005 con fluctuaciones de puntos amplias.
  - Se creará un motor cliente en TypeScript (`syntheticMath.ts`) que contiene la tabla de especificaciones de contratos de Deriv, permitiendo a los miembros ingresar su Stop Loss en puntos o precio y obtener el lote exacto sin errores humanos costosos.

---

### 4. Technical Architecture & Data Strategy

#### Diagrama de Arquitectura del Sistema

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENTE: REACT 19 SPA                           │
│  ┌──────────────────────┬──────────────────────┬────────────────────┐  │
│  │     TopBar Zone      │  Role Switcher Demo  │ User Subscription  │  │
│  └──────────────────────┴──────────────────────┴────────────────────┘  │
│  ┌──────────────────┬───────────────────────────────────────────────┐  │
│  │ Sidebar Nav      │ Main Viewport Container                       │  │
│  │ · Classroom      │ ┌───────────────────────────────────────────┐ │  │
│  │ · Live Signals   │ │ Classroom: Video Player + Modules + Notes │ │  │
│  │ · Calculator     │ ├───────────────────────────────────────────┤ │  │
│  │ · Community Hub  │ │ Signals: Live Feed + TP/SL + Filter       │ │  │
│  │ · VIP Mentorship │ ├───────────────────────────────────────────┤ │  │
│  │ · Settings/Plan  │ │ Risk Calculator: Deriv Formulas Engine    │ │  │
│  │                  │ ├───────────────────────────────────────────┤ │  │
│  │                  │ │ Community Hub: Trading Ideas + Discussions│ │  │
│  └──────────────────┴─┴───────────────────────────────────────────┴─┘  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ HTTPS / REST / WS
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│               BACKEND RECOMENDADO: NESTJS + TYPESCRIPT                 │
│  ┌──────────────────┬──────────────────┬────────────────────────────┐  │
│  │ Helmet / CORS    │ RateLimiter (100)│ ValidationPipe (Whitelist) │  │
│  └────────┬─────────┴────────┬─────────┴────────────┬───────────────┘  │
│           │                  │                      │                  │
│  ┌────────▼──────────────────▼──────────────────────▼───────────────┐  │
│  │ Core Modules: Auth · Classroom · Signals · Users · Community     │  │
│  │ Guards: JwtAuthGuard, RolesGuard (Free, TraderPro, MasterVIP)    │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
│                                     │ Prisma ORM (Prepared Queries)   │
│                                     ▼                                  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                DATABASE: POSTGRESQL MULTI-SCHEMA                 │  │
│  │  users · courses · lessons · user_progress · signals · posts     │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

#### Modelo de Datos Principal (PostgreSQL / TypeScript Interfaces)

```typescript
// Roles y Niveles de Suscripción
export type UserRole = 'FREE' | 'TRADER_PRO' | 'MASTER_VIP' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  subscriptionExpiresAt?: string;
  tradingAccountType?: 'DEMO' | 'REAL_DERIV';
}

// Classroom: Cursos, Módulos y Lecciones
export interface Lesson {
  id: string;
  title: string;
  duration: string; // ej. "24:15"
  videoUrl: string;
  requiredRole: UserRole;
  summary: string;
  keyPoints: string[];
  downloads?: { name: string; size: string; url: string }[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  requiredRole: UserRole;
  lessons: Lesson[];
}

// Terminal de Señales
export type SignalAction = 'BUY' | 'SELL' | 'BUY_LIMIT' | 'SELL_LIMIT';
export type SignalStatus = 'PENDING' | 'ACTIVE' | 'HIT_TP1' | 'HIT_TP2' | 'HIT_SL' | 'CLOSED';

export interface TradingSignal {
  id: string;
  asset: string; // ej. "Crash 300", "Boom 1000", "Volatility 75"
  action: SignalAction;
  entryPrice: number;
  stopLoss: number;
  takeProfit1: number;
  takeProfit2: number;
  timeframe: string; // ej. "M5", "M15", "H1"
  status: SignalStatus;
  pipsGained?: number;
  author: string;
  createdAt: string;
  rationale: string;
  requiredRole: UserRole;
}

// Especificación de Índices Sintéticos para la Calculadora
export interface SyntheticAssetSpec {
  symbol: string;
  name: string;
  category: 'BOOM_CRASH' | 'VOLATILITY' | 'STEP' | 'JUMP';
  minLot: number;
  maxLot: number;
  lotStep: number;
  pointValue: number; // Factor de valor por punto
  tickSize: number;
  description: string;
}
```

#### Componentes Interactivos y Mapeo de Estado

1. **`Navbar` & `Sidebar`**:
   - Navegación fluida con indicador de rol activo, selector para alternar rol en vivo (probar restricciones VIP/Pro), y estado de cuenta.
2. **`ClassroomView`**:
   - Acordeón de módulos con badges de acceso según el rol actual.
   - Si el usuario tiene plan `FREE` y selecciona una clase `MASTER_VIP`, se despliega un modal descriptivo con los beneficios del nivel VIP y llamado a la acción.
   - Registro de progreso en `localStorage` (o estado persistente) guardando lecciones completadas con barra porcentual global.
3. **`SignalsTerminalView`**:
   - Filtros por activo (Todos, Boom/Crash, Volatilidad) y estado (Activas, Finalizadas).
   - Botón directo `"Cargar en Calculadora"` que activa la vista de calculadora prellenando los datos del trade.
4. **`RiskCalculatorView`**:
   - Formulario interactivo con validación numérica estricta en tiempo real.
   - Cálculo instantáneo con visualización de barra de riesgo (Riesgo vs. Retorno 1:2, 1:3).
5. **`CommunityView`**:
   - Feed interactivo para publicar y comentar análisis técnicos con sanitización estricta de texto.
6. **`ArchitectureGuideView`**:
   - Sección técnica dedicada donde se expone la guía arquitectónica completa (código de ejemplo de NestJS con Controller, Service, DTO con `class-validator`, Auth Guard con JWT y Schema de Prisma PostgreSQL), lista para que el equipo de desarrollo de MG Alpha Block implemente su backend de producción.
