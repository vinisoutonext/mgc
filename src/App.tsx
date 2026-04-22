/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';
import { Sparkles, BookOpen, Zap, MessageSquare, Search, Circle as XCircle, ArrowRight, Monitor, Video, Users, Brain, Layers, CircleCheck as CheckCircle2, ChevronDown, Mic, Dumbbell, UserSearch, Swords, FileText, Rocket } from 'lucide-react';
import React, { useState, useEffect, useRef, type ReactNode } from 'react';

// --- Constants & Types ---

const NAVIGATION_HEIGHT = 80;

// --- Components ---

const FadeUp = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; key?: React.Key; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: [0.21, 0.45, 0.32, 0.9], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerContainer = ({ children, className = "" }: { children: ReactNode; className?: string; key?: React.Key }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }: { children: ReactNode; className?: string; key?: React.Key }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const Slide = ({ children, glowColor = "rgba(79, 255, 176, 0.05)" }: { children: ReactNode; glowColor?: string; key?: React.Key }) => {
  const slideRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: slideRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={slideRef} className="snap-slide relative overflow-hidden flex flex-col justify-center px-6 md:px-20 lg:px-32">
      <div className="ambient-glow" style={{ "--glow-color": glowColor } as any} />
      
      {/* Parallax Decorative Elements */}
      <motion.div 
        style={{ y: y1, rotate, "--accent-color": glowColor } as any}
        className="accent-glow top-1/4 -left-10 opacity-20" 
      />
      <motion.div 
        style={{ y: y2, rotate: -rotate, "--accent-color": glowColor } as any}
        className="accent-glow bottom-1/4 -right-10 opacity-10" 
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

const Card = ({ title, description, icon: Icon, color = "var(--color-aqua)" }: { title: string; description: string; icon?: any; color?: string }) => (
  <div className="glass-card glass-card-hover p-8 rounded-3xl group h-full">
    {Icon && <Icon className="w-8 h-8 mb-4 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color }} />}
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/70 transition-colors">{description}</p>
  </div>
);

const Header = ({ currentSlide, totalSlides, scrollProgress }: { currentSlide: number; totalSlides: number; scrollProgress: any }) => {
  const isScrolled = currentSlide > 0;
  
  // Slide current accent color for progress bar
  const accentColors = [
    "#4FFFB0", // Slide 1
    "#7B61FF", // Slide 2
    "#4285F4", // Slide 3 - Gargalo 1
    "#4285F4", // Slide 4 - Raio-X
    "#4FFFB0", // Slide 5 - Antes x Depois
    "#CC785C", // Slide 6 - Gargalo 2
    "#20C0C0", // Slide 7 - Ringue
    "#FF5C35", // Slide 8 - Gargalo 3
    "#34A853", // Slide 9 - NotebookLM
    "#FFFFFF", // Slide 10 - O que a IA NÃO faz
    "#4FFFB0", // Slide 11 - Plano de Ação
  ];

  return (
    <>
      <motion.nav 
        animate={{ 
          height: isScrolled ? 64 : 80,
          backgroundColor: isScrolled ? "rgba(5, 6, 10, 0.8)" : "rgba(5, 6, 10, 0.4)",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(10px)"
        }}
        className="fixed top-0 left-0 w-full z-50 glass-nav flex items-center justify-between px-6 md:px-12"
      >
        <div className="flex items-center gap-3">
          <motion.div 
            animate={{ scale: isScrolled ? 0.8 : 1 }}
            className="w-8 h-8 bg-aqua rounded flex items-center justify-center shrink-0"
          >
            <Sparkles className="w-5 h-5 text-bg-dark" />
          </motion.div>
          <motion.span 
            animate={{ fontSize: isScrolled ? "1.25rem" : "1.5rem" }}
            className="font-display tracking-wider pt-1 whitespace-nowrap"
          >
            MGC — Next Fit
          </motion.span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 w-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? 'dot-active scale-125' : 'bg-white/20'}`}
              />
            ))}
          </div>
          <span className="font-mono text-sm opacity-50">
            {String(currentSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
          </span>
        </div>

      </motion.nav>

      {/* Scroll Progress Bar */}
      <motion.div 
        animate={{ top: isScrolled ? 64 : 80 }}
        className="fixed left-0 w-full z-50 h-px bg-white/5"
      >
        <motion.div 
          className="h-full origin-left"
          style={{ 
            scaleX: scrollProgress,
            backgroundColor: accentColors[currentSlide] || "#4FFFB0",
            boxShadow: `0 0 10px ${accentColors[currentSlide] || "#4FFFB0"}`
          }}
        />
      </motion.div>
    </>
  );
};

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollPos = containerRef.current.scrollTop;
      const height = containerRef.current.offsetHeight;
      const index = Math.round(scrollPos / height);
      setActiveSlide(index);
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const slides = [
    // Slide 1: Capa
    <Slide key={0} glowColor="rgba(79, 255, 176, 0.1)">
      <div className="flex flex-col items-center md:items-start space-y-6">
        <FadeUp>
          <span className="font-mono text-purple text-sm tracking-[0.3em] uppercase">Momento de Gestão Comercial</span>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h1 className="font-display text-7xl md:text-[9rem] leading-[0.85] text-center md:text-left tracking-tighter">
            A Produtividade da IA <br />
            <span className="text-aqua drop-shadow-[0_0_15px_rgba(79,255,176,0.3)]">Aplicada no Comercial</span>
          </h1>
        </FadeUp>
        <FadeUp delay={0.4}>
          <p className="text-white/50 text-lg md:text-2xl max-w-2xl leading-relaxed text-center md:text-left">
            Não é sobre tecnologia. É sobre o que o time faz com o <strong>tempo</strong> e o impacto direto no seu <strong>pipeline</strong>.
          </p>
        </FadeUp>
      </div>
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </Slide>,

    // Slide 2: Abertura (O Gancho)
    <Slide key={1} glowColor="rgba(123, 97, 255, 0.08)">
      <div className="text-center space-y-12">
        <FadeUp>
          <span className="font-mono text-purple text-sm tracking-[0.2em] uppercase">O Recurso mais caro</span>
        </FadeUp>
        <FadeUp delay={0.2}>
          <h2 className="text-4xl md:text-7xl font-sans font-normal max-w-5xl mx-auto leading-tight italic">
            "Quantas horas por semana o time gasta com tarefas que <span className="text-purple font-medium not-italic underline decoration-purple/30 underline-offset-8">não são vender?</span>"
          </h2>
        </FadeUp>
        <FadeUp delay={0.4}>
          <div className="max-w-xl mx-auto glass-card p-8 rounded-3xl border-l-4 border-purple italic text-white/70">
            <p className="text-xl md:text-2xl leading-relaxed text-left">
              O vendedor caro está fazendo trabalho administrativo. Fiz a conta do desperdício, e o resultado me trouxe aqui.
            </p>
          </div>
        </FadeUp>
      </div>
    </Slide>,

    // Slide 3: Gargalo 1 (SDR Travado) — Redesigned
    <Slide key={2} glowColor="rgba(66, 133, 244, 0.15)">
      <div className="flex flex-col justify-start pt-20 items-center text-center space-y-8">
        {/* Problem Statement - Big and Bold */}
        <FadeUp className="w-full max-w-4xl">
          <div className="space-y-6 mb-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-google-blue/15 border border-google-blue/30 text-google-blue font-mono text-[10px] uppercase mb-3">
              Gargalo 1: SDR Travado
            </div>
            <h2 className="text-5xl md:text-6xl font-display leading-[0.95] font-black tracking-tight">
              O Lead<br />
              <span className="text-google-blue drop-shadow-[0_0_30px_rgba(66,133,244,0.4)]">Esfria</span>
            </h2>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-3xl border border-red-500/20 bg-red-500/5 max-w-2xl mx-auto mb-4">
            <p className="text-lg md:text-2xl font-sans leading-relaxed text-white/90 italic">
              O SDR gasta <span className="font-bold text-red-400">15 minutos</span> pensando no que responder.<br />
              <span className="text-white/50 text-base">O lead visualizou a mensagem e sumiu.</span>
            </p>
          </div>
        </FadeUp>

        {/* Solution Block */}
        <FadeUp delay={0.3} className="w-full max-w-4xl">
          <div className="glass-card p-8 md:p-10 rounded-3xl border-2 border-google-blue/40 bg-google-blue/[0.08]">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-google-blue" />
              <span className="font-mono text-sm text-google-blue uppercase tracking-widest font-bold">Solução com Gemini</span>
            </div>

            {/* Prompt Card */}
            <div className="bg-white/[0.03] rounded-2xl p-6 mb-6 border border-google-blue/20">
              <span className="text-[9px] uppercase font-mono text-white/40 block mb-3">Você pergunta ao Gemini:</span>
              <p className="text-lg md:text-xl text-white/80 italic leading-relaxed">
                "Contorne a objeção: <span className="text-google-blue font-semibold">'Gostei do sistema, mas meu sócio achou a mensalidade puxada agora'.</span>"
              </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-5 rounded-2xl border border-google-blue/30 bg-google-blue/10">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-google-blue" />
                  <span className="font-bold text-white">5 Segundos</span>
                </div>
                <p className="text-sm text-white/60">Resposta personalizada gerada em tempo real</p>
              </div>
              <div className="glass-card p-5 rounded-2xl border border-google-blue/30 bg-google-blue/10">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-google-blue" />
                  <span className="font-bold text-white">Timing Preservado</span>
                </div>
                <p className="text-sm text-white/60">Lead ainda está lendo, você já tem a resposta</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </Slide>,

    // Slide 4: Raio-X Arsenal SDR WhatsApp
    <Slide key={3} glowColor="rgba(66, 133, 244, 0.08)">
      <div className="space-y-10">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-google-blue/10 border border-google-blue/20 text-google-blue font-mono text-[10px] uppercase mb-4">
            Raio-X: Arsenal do SDR
          </div>
          <h2 className="text-5xl md:text-[5rem] font-display leading-[0.9] text-google-blue drop-shadow-[0_0_20px_rgba(66,133,244,0.3)]">
            O Gemini vai <br />muito além.
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mt-4 leading-relaxed">
            Responder rápido é só o começo. Veja o que o Gemini faz pelo SDR no WhatsApp antes, durante e depois da conversa.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeUp delay={0.2}>
            <div className="glass-card glass-card-hover p-8 rounded-3xl group h-full border-google-blue/10 hover:border-google-blue/30">
              <UserSearch className="w-8 h-8 mb-4 text-google-blue opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-semibold mb-3">Desenterrar Leads</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">O lead visualizou e sumiu há 5 dias? Gere uma mensagem de quebra de padrão em segundos.</p>
              <div className="glass-card p-4 rounded-xl border-l-2 border-google-blue/40">
                <span className="text-[9px] uppercase font-mono text-white/30 block mb-1">Prompt</span>
                <p className="text-xs italic text-white/70 leading-snug">"O lead visualizou e ignorou há 5 dias. Crie uma mensagem curta de quebra de padrão para o WhatsApp."</p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.35}>
            <div className="glass-card glass-card-hover p-8 rounded-3xl group h-full border-google-blue/10 hover:border-google-blue/30">
              <Mic className="w-8 h-8 mb-4 text-google-blue opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-semibold mb-3">Resumo de Áudio Longo</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">Sabe aquele áudio de 3 minutos do cliente contando a vida? A IA extrai os 3 pontos de dor em segundos, sem você ouvir tudo.</p>
              <div className="glass-card p-4 rounded-xl bg-google-blue/5">
                <p className="text-xs text-white/50 leading-snug">Transcreva o áudio e peça ao Gemini: <span className="text-google-blue italic">"Liste as 3 principais objeções ou dores mencionadas."</span></p>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="glass-card glass-card-hover p-8 rounded-3xl group h-full border-google-blue/10 hover:border-google-blue/30">
              <Dumbbell className="w-8 h-8 mb-4 text-google-blue opacity-60 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-semibold mb-3">Roleplay de Negociação</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">Treine o contorno de objeção simulando o WhatsApp do cliente antes de mandar a mensagem real. Erre com a IA, não com o lead.</p>
              <div className="glass-card p-4 rounded-xl border-l-2 border-google-blue/40">
                <span className="text-[9px] uppercase font-mono text-white/30 block mb-1">Prompt</span>
                <p className="text-xs italic text-white/70 leading-snug">"Simule ser um cliente resistente a preço. Responda como ele responderia no WhatsApp."</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </Slide>,

    // Slide 5: Antes x Depois no WhatsApp
    <Slide key={4} glowColor="rgba(79, 255, 176, 0.06)">
      <div className="space-y-8">
        <FadeUp>
          <h2 className="text-5xl md:text-7xl font-display tracking-tight uppercase leading-none">
            Antes <span className="text-white/20">x</span> Depois
          </h2>
          <p className="text-xl text-white/50 mt-4">Show, don't tell. A diferença está na mensagem.</p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Sem IA - WhatsApp Mockup */}
          <FadeUp delay={0.2}>
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-bold">Sem IA — O "Textão"</span>
              </div>
              <div className="flex-1 bg-gray-900/50 rounded-3xl p-6 border border-white/5 backdrop-blur-sm overflow-hidden flex flex-col">
                {/* WhatsApp Header */}
                <div className="text-center mb-6 pb-4 border-b border-white/10">
                  <p className="text-[10px] font-mono text-white/40">João Silva — 14:32</p>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4">
                  <div className="flex justify-start">
                    <div className="bg-red-900/30 rounded-t-3xl rounded-br-3xl px-4 py-3 max-w-xs border border-red-500/20">
                      <p className="text-sm text-white/70 leading-relaxed">
                        Olá João tudo bom? Sou da Next Fit e quero apresentar nosso sistema completo de gestão de academia com controle financeiro módulo de treinos agendamento de aulas fichas de alunos controle de frequência relatórios de inadimplência e muito mais temos planos a partir de R$299 por mês e fazemos treinamento completo temos suporte 24h e já atendemos mais de 500 academias no Brasil inteiro quer que eu mande o link do nosso site para você ver tudo?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap pt-4 border-t border-white/10">
                  <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-[9px] font-mono">Sem quebra de linha</span>
                  <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-[9px] font-mono">Panfleto</span>
                  <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 text-[9px] font-mono">Lead desaparece</span>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Com IA - WhatsApp Mockup */}
          <FadeUp delay={0.4}>
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <span className="font-mono text-xs uppercase tracking-widest text-aqua font-bold">Com IA — Conversacional</span>
              </div>
              <div className="flex-1 bg-gray-900/50 rounded-3xl p-6 border border-white/5 backdrop-blur-sm overflow-hidden flex flex-col relative">
                {/* Subtle green glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-aqua/5 to-transparent pointer-events-none" />

                {/* WhatsApp Header */}
                <div className="text-center mb-6 pb-4 border-b border-white/10 relative z-10">
                  <p className="text-[10px] font-mono text-white/40">João Silva — 14:32</p>
                </div>

                {/* Messages */}
                <div className="flex-1 space-y-4 overflow-y-auto mb-4 relative z-10">
                  <div className="flex justify-start">
                    <div className="bg-aqua/20 rounded-t-3xl rounded-br-3xl px-4 py-3 max-w-xs border border-aqua/40">
                      <p className="text-sm text-white/90 leading-relaxed">
                        Fala João, vi que a taxa de evasão dos alunos é seu maior problema hoje.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-start mt-2">
                    <div className="bg-aqua/20 rounded-t-3xl rounded-br-3xl px-4 py-3 max-w-xs border border-aqua/40">
                      <p className="text-sm text-white/90 leading-relaxed">
                        Posso te mostrar como o Next Fit automatiza essa retenção?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Checkmarks and Status */}
                <div className="flex items-center justify-end gap-2 text-aqua/60 mb-4 text-[9px] relative z-10">
                  <span>14:32</span>
                  <span className="text-aqua drop-shadow-[0_0_4px_rgba(79,255,176,0.5)]">✓✓</span>
                </div>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap pt-4 border-t border-white/10 relative z-10">
                  <span className="px-2 py-1 rounded-full bg-aqua/10 text-aqua text-[9px] font-mono">Direto ao ponto</span>
                  <span className="px-2 py-1 rounded-full bg-aqua/10 text-aqua text-[9px] font-mono">2 linhas</span>
                  <span className="px-2 py-1 rounded-full bg-aqua/10 text-aqua text-[9px] font-mono">Lead engaja</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </Slide>,

    // Slide 6: Gargalo 2 (Líder sem tempo)
    <Slide key={5} glowColor="rgba(204, 120, 92, 0.12)">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <StaggerContainer className="grid grid-cols-1 gap-4">
            <StaggerItem>
              <div className="glass-card p-8 rounded-3xl border-claude-salmon/20">
                <Brain className="w-10 h-10 text-claude-salmon mb-4" />
                <h4 className="text-2xl font-bold mb-2">Seu Par Sênior</h4>
                <p className="text-white/40 leading-relaxed">Use o Claude para validar hipóteses de queda no Win Rate e testes rápidos com a equipe.</p>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="glass-card p-8 rounded-3xl bg-claude-salmon/5 border-claude-salmon/10 italic">
                "Não quebre a cabeça sozinho. A IA te dá o rascunho, você coloca a sua vivência."
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        <div className="space-y-8 order-1 lg:order-2">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-claude-salmon/10 border border-claude-salmon/20 text-claude-salmon font-mono text-[10px] uppercase mb-4">
              Gargalo 2: Líder Operacional
            </div>
            <h2 className="text-5xl md:text-[5rem] font-display leading-[0.9] text-claude-salmon drop-shadow-[0_0_20px_rgba(204,120,92,0.3)]">
              Tempo de <br />Estratégia
            </h2>
            <p className="text-xl text-white/50 max-w-md mt-6 leading-relaxed">
              O operacional consome o dia. O Claude atua como um parceiro de diretoria para analisar cenários de churn e resgate.
            </p>
          </FadeUp>
        </div>
      </div>
    </Slide>,

    // Slide 7: O Ringue — Gemini vs Claude
    <Slide key={6} glowColor="rgba(150, 100, 80, 0.1)">
      <div className="space-y-10">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono text-[10px] uppercase mb-4">
            Escolha a arma certa
          </div>
          <h2 className="text-5xl md:text-7xl font-display tracking-tight uppercase leading-none">
            O Ringue: <br />
            <span className="text-google-blue">Gemini</span> <span className="text-white/20">vs</span> <span className="text-claude-salmon">Claude</span>
          </h2>
          <p className="text-xl text-white/50 mt-4 max-w-2xl leading-relaxed">
            Não são concorrentes — são especialistas. Saber qual usar em cada momento é o diferencial do líder.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Gemini */}
          <FadeUp delay={0.2}>
            <div className="glass-card p-8 rounded-3xl h-full border border-google-blue/20 bg-google-blue/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-google-blue/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-google-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-display text-google-blue tracking-wide">GEMINI</h3>
                  <span className="text-[10px] font-mono uppercase text-white/40">Agilidade no campo</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-google-blue shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">Acesso à internet em tempo real</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-google-blue shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">Pesquisa leads antes da abordagem</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-google-blue shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">Gera respostas rápidas para WhatsApp</span>
                </li>
              </ul>
              <div className="glass-card p-4 rounded-xl border-l-2 border-google-blue/50">
                <span className="text-[9px] uppercase font-mono text-white/30 block mb-1">Caso de Uso Ideal</span>
                <p className="text-xs italic text-white/70 leading-snug">"Pesquise a academia do lead no Instagram e me dê um gancho para puxar assunto no WhatsApp."</p>
              </div>
            </div>
          </FadeUp>

          {/* Claude */}
          <FadeUp delay={0.4}>
            <div className="glass-card p-8 rounded-3xl h-full border border-claude-salmon/20 bg-claude-salmon/[0.03]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-claude-salmon/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-claude-salmon" />
                </div>
                <div>
                  <h3 className="text-2xl font-display text-claude-salmon tracking-wide">CLAUDE</h3>
                  <span className="text-[10px] font-mono uppercase text-white/40">Profundidade na estratégia</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-claude-salmon shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">Raciocínio complexo e contextual</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-claude-salmon shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">Analisa documentos e históricos longos</span>
                </li>
                <li className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-claude-salmon shrink-0 mt-0.5" />
                  <span className="text-sm text-white/70">Identifica padrões em vendas perdidas</span>
                </li>
              </ul>
              <div className="glass-card p-4 rounded-xl border-l-2 border-claude-salmon/50">
                <span className="text-[9px] uppercase font-mono text-white/30 block mb-1">Caso de Uso Ideal</span>
                <p className="text-xs italic text-white/70 leading-snug">"Exportei o histórico de conversa do WhatsApp (TXT) de uma venda perdida. Analise onde o SDR errou na condução."</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </Slide>,

    // Slide 8: Gargalo 3 (Liderança sem treinar)
    <Slide key={7} glowColor="rgba(255, 92, 53, 0.12)">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
          <FadeUp className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gamma-orange/10 border border-gamma-orange/20 text-gamma-orange font-mono text-[10px] uppercase mb-6">
              Gargalo 3: Falta de Treinamento
            </div>
            <h2 className="text-5xl md:text-[5rem] font-display leading-[0.9] text-gamma-orange drop-shadow-[0_0_20px_rgba(255,92,53,0.3)]">
              Cultura de <br />Execução
            </h2>
            <p className="text-xl text-white/50 mt-6 leading-relaxed">
              Treinar cansa e consome tempo de criação. O Gamma e NotebookLM criam materiais e apresentações de MGC em minutos.
            </p>
          </FadeUp>
          
          <FadeUp delay={0.2} className="w-full md:w-auto">
            <div className="glass-card p-8 rounded-3xl bg-gamma-orange/5 border-gamma-orange/10 max-w-sm">
              <Zap className="w-8 h-8 text-gamma-orange mb-4 animate-pulse" />
              <p className="text-sm text-white/60 leading-relaxed italic">
                "Nosso trabalho é definir a mensagem. O trabalho de mastigar slides e resumos é da máquina."
              </p>
            </div>
          </FadeUp>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StaggerItem>
            <div className="glass-card p-6 rounded-2xl border border-white/5 flex gap-5 items-center">
              <div className="w-12 h-12 rounded-xl bg-gamma-orange/10 flex items-center justify-center shrink-0">
                <Monitor className="w-6 h-6 text-gamma-orange" />
              </div>
              <div>
                <h4 className="font-bold">Gamma</h4>
                <p className="text-xs text-white/40">Slides prontos em 2 min para diretoria ou time.</p>
              </div>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="glass-card p-6 rounded-2xl border border-white/5 flex gap-5 items-center">
              <div className="w-12 h-12 rounded-xl bg-notebook-green/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-notebook-green" />
              </div>
              <div>
                <h4 className="font-bold">NotebookLM</h4>
                <p className="text-xs text-white/40">Transforma manuais densos em podcasts de estudo.</p>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </Slide>,

    // Slide 9: NotebookLM — O Clone do Produto
    <Slide key={8} glowColor="rgba(52, 168, 83, 0.1)">
      <div className="space-y-10">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-notebook-green/10 border border-notebook-green/20 text-notebook-green font-mono text-[10px] uppercase mb-4">
            NotebookLM na prática
          </div>
          <h2 className="text-5xl md:text-7xl font-display leading-[0.9] text-notebook-green drop-shadow-[0_0_20px_rgba(52,168,83,0.3)] uppercase">
            O Clone <br />do Produto.
          </h2>
          <p className="text-xl text-white/50 mt-4 max-w-2xl leading-relaxed">
            A resposta exata, com o cliente na linha.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Setup */}
          <FadeUp delay={0.2}>
            <div className="space-y-4">
              <h3 className="text-white/40 font-mono text-xs uppercase tracking-widest mb-4">A liderança faz o upload uma vez:</h3>
              <StaggerContainer className="space-y-3">
                {[
                  { icon: BookOpen, label: "Manual do Next Fit", desc: "Funcionalidades, fluxos e integrações" },
                  { icon: FileText, label: "Regras de Negócio", desc: "Planos, condições especiais e política comercial" },
                  { icon: Layers, label: "Tabela de Preços", desc: "Todos os planos e comparativos atualizados" }
                ].map(({ icon: Icon, label, desc }) => (
                  <StaggerItem key={label}>
                    <div className="glass-card p-5 rounded-2xl flex items-center gap-4 border-notebook-green/10 hover:border-notebook-green/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-notebook-green/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-notebook-green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{label}</h4>
                        <p className="text-xs text-white/40">{desc}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </FadeUp>

          {/* Caso de uso */}
          <FadeUp delay={0.4}>
            <div className="glass-card p-8 rounded-3xl border-notebook-green/20 bg-notebook-green/[0.03] h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-notebook-green animate-pulse" />
                <span className="font-mono text-xs text-notebook-green uppercase tracking-widest">Caso de uso real</span>
              </div>

              <div className="space-y-4">
                {/* Lead pergunta */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 shrink-0 flex items-center justify-center text-xs font-bold">J</div>
                  <div>
                    <span className="text-[10px] font-mono text-white/30 block mb-1">João (Lead) — agora</span>
                    <div className="bg-white/10 rounded-2xl rounded-tl-sm p-3 text-sm text-white/80 leading-relaxed max-w-xs">
                      Mas o sistema integra com a maquininha Stone e exporta para o meu contador no formato SPED?
                    </div>
                  </div>
                </div>

                {/* SDR consulta */}
                <div className="glass-card p-4 rounded-xl border-notebook-green/20 bg-notebook-green/5 flex gap-3 items-start">
                  <Search className="w-4 h-4 text-notebook-green shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-mono text-notebook-green/70 block mb-1">SDR pergunta ao NotebookLM</span>
                    <p className="text-xs italic text-white/60">"Next Fit integra com Stone e exporta SPED?"</p>
                  </div>
                </div>

                {/* NotebookLM responde */}
                <div className="flex items-start gap-3 justify-end">
                  <div>
                    <span className="text-[10px] font-mono text-white/30 block mb-1 text-right">NotebookLM — 3 segundos</span>
                    <div className="bg-notebook-green/20 rounded-2xl rounded-tr-sm p-3 text-sm text-white/90 leading-relaxed max-w-xs text-right">
                      Sim. Integra nativo com Stone (pag. 14 do Manual). Export SPED disponível no modulo Financeiro (pag. 31).
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-notebook-green/20 shrink-0 flex items-center justify-center text-xs font-bold text-notebook-green">N</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-sm text-white/50 leading-relaxed">A venda <span className="text-notebook-green font-semibold">não esfria</span>. O SDR não interrompe o gerente. O cliente recebe a resposta certa, na hora certa.</p>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Foguete no Onboarding Card */}
        <FadeUp delay={0.6} className="w-full max-w-4xl">
          <div className="glass-card p-8 rounded-3xl border-2 border-notebook-green/40 bg-notebook-green/[0.1]">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-notebook-green/20 flex items-center justify-center shrink-0">
                <Rocket className="w-8 h-8 text-notebook-green animate-bounce" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-notebook-green mb-2">Foguete no Onboarding</h3>
                <p className="text-white/80 leading-relaxed">
                  Reduza o ramp-up de meses para dias. Um vendedor com 1 semana de casa consulta o "oráculo" e responde com a <span className="font-semibold">autoridade de um sênior</span>.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </Slide>,

    // Slide 10: Honestidade (O que a IA NÃO faz)
    <Slide key={9} glowColor="rgba(255, 255, 255, 0.05)">
      <div className="space-y-12">
        <FadeUp>
          <h2 className="text-5xl md:text-8xl font-display leading-tight tracking-tight uppercase">O que a IA <span className="text-purple opacity-50">NÃO</span> faz</h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { t: "Não substitui Julgamento", d: "Ela não lê a sala nem entende a pausa emocional no telefone. O senso crítico é seu." },
            { t: "Não cria Relação", d: "Venda é confiança. Pessoas compram de pessoas. O olho no olho é insubstituível." },
            { t: "Não salva processo ruim", d: "Se o seu método for ruim, a IA só miltiplica o erro. Multiplicar zero resulta em zero." }
          ].map((item, i) => (
            <FadeUp key={item.t} delay={0.2 + i * 0.1}>
              <div className="flex gap-4">
                <XCircle className="w-6 h-6 text-purple shrink-0 mt-1" />
                <div>
                  <h4 className="text-xl font-medium mb-2">{item.t}</h4>
                  <p className="text-white/40 text-sm leading-relaxed">{item.d}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.6}>
          <div className="text-center py-12 border-y border-white/5">
            <p className="text-3xl md:text-5xl font-sans leading-tight">
              "A IA não vai salvar um vendedor sem processo. <br />
              <span className="text-aqua">Mas vai multiplicar o bom vendedor que já temos.</span>"
            </p>
          </div>
        </FadeUp>
      </div>
    </Slide>,

    // Slide 11: Fechamento (Plano de Ação)
    <Slide key={10} glowColor="rgba(79, 255, 176, 0.1)">
      <div className="space-y-12">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua/10 border border-aqua/20 text-aqua font-mono text-[10px] uppercase mb-4">
            Plano de Ação de 3 Passos
          </div>
          <h2 className="text-5xl md:text-8xl font-display leading-[0.95] tracking-tight">O DIFERENCIAL É <br /><span className="text-aqua">QUEM COMEÇA.</span></h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Ache o seu Gargalo", d: "Pare de olhar para as IAs e olhe para sua operação agora. Onde o ralo de tempo é maior?" },
            { n: "02", t: "Escolha UMA ferramenta", d: "Não tente aplicar tudo. Se o problema é SDR, foque no Gemini. Se é treinamento, Gamma." },
            { n: "03", t: "Piloto de 7 Dias", d: "Escolha os 2 vendedores mais rápidos. Teste, meça a taxa de resposta e depois escale." }
          ].map((step, i) => (
            <FadeUp key={step.n} delay={0.2 + i * 0.2}>
              <div className="glass-card p-10 h-full rounded-3xl relative overflow-hidden group border-white/5 hover:border-aqua/30 transition-all">
                <span className="font-display text-8xl absolute -right-4 -bottom-6 text-white/[0.03] group-hover:text-aqua/5 transition-colors">{step.n}</span>
                <h4 className="text-2xl font-bold mb-4">{step.t}</h4>
                <p className="text-white/40 leading-relaxed">{step.d}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.8} className="flex justify-center md:justify-start">
          <button className="flex items-center gap-3 px-12 py-5 bg-aqua text-bg-dark rounded-full font-bold text-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(79,255,176,0.3)] group">
            Começar Piloto amanha
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </FadeUp>
      </div>
    </Slide>
  ];

  return (
    <div className="bg-bg-dark text-white selection:bg-aqua/20 selection:text-aqua">
      <Header currentSlide={activeSlide} totalSlides={slides.length} scrollProgress={scaleX} />
      <main ref={containerRef} className="snap-container">
        {slides}
      </main>

      {/* Slide Navigation Dots (Vertical) */}
      <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40 hidden md:flex">
        {Array.from({ length: slides.length }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              containerRef.current?.scrollTo({
                top: i * containerRef.current.offsetHeight,
                behavior: 'smooth'
              });
            }}
            className="group flex items-center justify-end gap-3"
          >
            <span className={`font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ${activeSlide === i ? 'text-aqua opacity-100' : 'text-white/40'}`}>
              SLIDE {String(i + 1).padStart(2, '0')}
            </span>
            <div 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeSlide === i ? 'dot-active scale-125' : 'bg-white/20 hover:bg-white/40'}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
