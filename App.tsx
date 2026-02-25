
import React, { useState, useEffect } from 'react';
import { 
  AppTab, TimelineStep 
} from './types';
import { 
  COLORS, Calendar, Gavel, Users, Clock, ShieldCheck, 
  CheckCircle2, ChevronRight, Menu, X, Award, Scale, MapPin, Phone, Mail, Sparkles 
} from './constants';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('inicio');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    // Configurar fecha de elección para 2026 o similar
    const electionDate = new Date('2026-03-13T08:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = electionDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStepStatus = (start: Date, end: Date): 'past' | 'active' | 'upcoming' => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();

    if (today > endDate) return 'past';
    if (today >= startDate && today <= endDate) return 'active';
    return 'upcoming';
  };

  const currentYear = 2026;

  const timelineSteps: TimelineStep[] = [
    { 
      date: 'Feb 2 - 13', 
      title: 'Sensibilización', 
      desc: 'Convocatoria y pedagogía democrática en todas las sedes.', 
      start: new Date(currentYear, 1, 2), 
      end: new Date(currentYear, 1, 13) 
    },
    { 
      date: 'Feb 16 - 20', 
      title: 'Inscripción', 
      desc: 'Registro oficial de candidatos y sus propuestas.', 
      start: new Date(currentYear, 1, 16), 
      end: new Date(currentYear, 1, 20) 
    },
    { 
      date: 'Feb 23 - 27', 
      title: 'Verificación', 
      desc: 'Revisión de requisitos legales por el comité electoral.', 
      start: new Date(currentYear, 1, 23), 
      end: new Date(currentYear, 1, 27) 
    },
    { 
      date: 'Feb 23 - Mar 4', 
      title: 'Campaña', 
      desc: 'Presentación de propuestas y debates estudiantiles.', 
      start: new Date(currentYear, 1, 23), 
      end: new Date(currentYear, 2, 4) 
    },
    { 
      date: 'Mar 2 - 4', 
      title: 'Selección de Jurados', 
      desc: 'Sorteo y capacitación de jurados y testigos electorales.', 
      start: new Date(currentYear, 2, 2), 
      end: new Date(currentYear, 2, 4) 
    },
    { 
      date: 'Mar 13', 
      title: 'DÍA ELECTORAL', 
      desc: 'Jornada de votación democrática para todos los estudiantes.', 
      start: new Date(currentYear, 2, 13), 
      end: new Date(currentYear, 2, 13), 
      highlight: true 
    },
    { 
      date: 'Mar 16 - 18', 
      title: 'Escrutinio General', 
      desc: 'Comisión escrutadora totaliza los resultados oficiales.', 
      start: new Date(currentYear, 2, 16), 
      end: new Date(currentYear, 2, 18) 
    },
    { 
      date: 'Mar 20', 
      title: 'Resultados', 
      desc: 'Proclamación y posesión de los nuevos líderes.', 
      start: new Date(currentYear, 2, 20), 
      end: new Date(currentYear, 2, 20) 
    }
  ].map(step => ({
    date: step.date,
    title: step.title,
    desc: step.desc,
    status: getStepStatus(step.start, step.end),
    highlight: step.highlight
  }));

  const NavItem = ({ label, tab }: { label: string, tab: AppTab }) => (
    <button 
      onClick={() => { setActiveTab(tab); setIsMenuOpen(false); }}
      className={`px-4 py-2 font-bold text-xs uppercase tracking-widest rounded-xl border border-transparent transition-all ${
        activeTab === tab ? 'bg-[#F59E0B] text-[#1E3A8A] shadow-lg shadow-yellow-600/30' : 'hover:border-[#F59E0B] hover:text-[#F59E0B]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className={`${COLORS.primary} text-white sticky top-0 z-50 shadow-xl border-b-[6px] ${COLORS.accentBorder}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab('inicio')}>
            <div className="flex flex-col">
              <h1 className="font-black text-lg md:text-2xl leading-none tracking-tighter uppercase">I.E. Nuestra Señora de la Candelaria</h1>
              <p className="text-[10px] md:text-xs text-[#F59E0B] font-black uppercase tracking-[0.2em] mt-1.5">Ciencia · Virtud · Labor</p>
            </div>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors">
            {isMenuOpen ? <X size={28} className="text-[#F59E0B]" /> : <Menu size={28} className="text-[#F59E0B]" />}
          </button>

          <div className="hidden md:flex gap-1.5 items-center">
            <NavItem label="Inicio" tab="inicio" />
            <NavItem label="Normativa" tab="normativa" />
            <NavItem label="Cronograma" tab="cronograma" />
            <NavItem label="Roles" tab="roles" />
            <NavItem label="Candidatos" tab="candidatos" />
            <div className="w-px h-6 bg-white/20 mx-2"></div>
            <button 
              onClick={() => setActiveTab('ai-assistant')}
              className={`px-5 py-2.5 font-bold text-xs uppercase tracking-widest rounded-xl border border-transparent flex items-center gap-2 transition-all ${
                activeTab === 'ai-assistant' 
                  ? 'bg-white text-[#1E3A8A] shadow-xl' 
                  : 'bg-[#1E3A8A] border border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-[#1E3A8A]'
              }`}
            >
              <Sparkles size={16} /> Asistente IA
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#152C6B] border-t border-[#F59E0B]/30 animate-in slide-in-from-top duration-300">
            <div className="p-4 flex flex-col gap-2">
              {['Inicio', 'Normativa', 'Cronograma', 'Roles', 'Candidatos'].map((item) => (
                <button 
                  key={item}
                  onClick={() => { setActiveTab(item.toLowerCase() as AppTab); setIsMenuOpen(false); }}
                  className={`w-full text-left p-4 rounded-xl font-bold uppercase text-sm flex justify-between items-center transition-colors ${
                    activeTab === item.toLowerCase() ? 'bg-[#F59E0B] text-[#1E3A8A]' : 'text-white hover:bg-white/5'
                  }`}
                >
                  {item}
                  {activeTab === item.toLowerCase() && <CheckCircle2 size={18} />}
                </button>
              ))}
              <button 
                onClick={() => { setActiveTab('ai-assistant'); setIsMenuOpen(false); }}
                className={`w-full p-4 rounded-xl font-bold uppercase text-sm flex items-center gap-3 transition-colors ${
                  activeTab === 'ai-assistant' ? 'bg-white text-[#1E3A8A]' : 'bg-[#F59E0B] text-[#1E3A8A]'
                }`}
              >
                <Sparkles size={18} /> ASISTENTE IA
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 md:py-20 w-full">
        {activeTab === 'inicio' && (
          <div className="space-y-16">
            <section className={`relative ${COLORS.primary} rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white isolate group`}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-transparent to-black/30 pointer-events-none"></div>
              <div className="relative z-10 p-10 md:p-20 flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-3/5 space-y-10 text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 bg-[#0F2355] px-6 py-2.5 rounded-full border border-[#F59E0B]/50 shadow-2xl">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75 animate-ping"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F59E0B]"></span>
                    </span>
                    <span className="text-xs text-[#F59E0B] font-black uppercase tracking-widest">PROCESO ELECTORAL 2026</span>
                  </div>
                  
                  <div className="space-y-6">
                    <h2 className="font-black text-white leading-[0.9] tracking-tighter">
                      <span className="block text-5xl md:text-7xl lg:text-8xl">
                        GOBIERNO <span className="text-[#F59E0B]">ESCOLAR</span>
                      </span>
                      <span className="block text-3xl md:text-5xl lg:text-6xl text-blue-200 mt-2 md:mt-4 tracking-widest border-t-4 border-white/10 pt-4 inline-block">
                        ELECCIONES 2026
                      </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-blue-100 font-light border-l-[6px] border-[#F59E0B] pl-6 max-w-lg">
                      Liderazgo, transparencia y democracia en acción.
                    </p>
                  </div>

                  <p className="text-lg text-blue-200 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                    Participa activamente en la elección de Personero y Contralor Estudiantil. Tu voto es el primer paso para transformar nuestra institución.
                  </p>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-5 pt-4">
                    <button 
                      onClick={() => setActiveTab('cronograma')}
                      className="bg-[#F59E0B] text-[#1E3A8A] px-10 py-5 rounded-2xl font-black hover:bg-[#D97706] hover:text-white shadow-2xl transition-all active:scale-95 flex items-center gap-3"
                    >
                      VER CRONOGRAMA <ChevronRight size={22} />
                    </button>
                    <button 
                      onClick={() => setActiveTab('ai-assistant')}
                      className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl font-black hover:bg-white/20 shadow-2xl transition-all active:scale-95 flex items-center gap-3"
                    >
                      <Sparkles size={20} className="text-[#F59E0B]" /> ASISTENTE IA
                    </button>
                  </div>
                </div>

                <div className="w-full lg:w-2/5">
                  <div className="bg-white/10 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/20 shadow-3xl text-center relative overflow-hidden group-hover:border-white/40 transition-all duration-500">
                    <div className="absolute top-0 left-0 w-full h-2.5 bg-[#F59E0B]"></div>
                    <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 flex items-center justify-center gap-3">
                      <Clock size={18} className="text-[#F59E0B]" /> Conteo Regresivo
                    </h4>
                    
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: 'Días', val: timeLeft.days },
                        { label: 'Horas', val: timeLeft.hours },
                        { label: 'Min', val: timeLeft.mins },
                        { label: 'Seg', val: timeLeft.secs }
                      ].map((unit) => (
                        <div key={unit.label} className="flex flex-col items-center">
                          <div className="text-3xl md:text-5xl font-black bg-white text-[#1E3A8A] w-full aspect-square flex items-center justify-center rounded-2xl shadow-2xl border-b-[5px] border-[#F59E0B]">
                            {unit.val}
                          </div>
                          <span className="text-[10px] font-black uppercase mt-4 text-[#F59E0B] tracking-widest">{unit.label}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-10 bg-white/5 rounded-2xl p-4 flex items-center justify-center gap-3 text-xs text-white font-bold border border-white/10 uppercase tracking-widest">
                      <Calendar size={16} className="text-[#F59E0B]" /> Viernes, 13 de Marzo 2026
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                { icon: <Gavel size={36} />, title: "Marco Legal", desc: "Basado en la Ley 115 de 1994 y la Circular 007 de 2026 de la SED Valle.", color: "blue" },
                { icon: <Sparkles size={36} />, title: "Herramientas IA", desc: "Usa nuestro asistente para crear slogans, propuestas y mejorar tus argumentos de debate.", color: "yellow" },
                { icon: <ShieldCheck size={36} />, title: "Voto Transparente", desc: "Garantizamos procesos claros y participación de todos los estudiantes de la IENSECAN.", color: "blue" }
              ].map((feat, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 hover:border-[#F59E0B] transition-all group">
                  <div className={`p-5 rounded-3xl w-fit mb-8 group-hover:scale-110 transition-transform ${feat.color === 'blue' ? 'bg-[#1E3A8A] text-white shadow-lg shadow-blue-900/20' : 'bg-[#F59E0B] text-[#1E3A8A] shadow-lg shadow-yellow-600/20'}`}>
                    {feat.icon}
                  </div>
                  <h3 className="text-2xl font-black text-[#1E3A8A] mb-4 uppercase tracking-tighter">{feat.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'normativa' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[#1E3A8A] rounded-full mx-auto flex items-center justify-center text-[#F59E0B] shadow-2xl border-4 border-white mb-6">
                <Scale size={36} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#1E3A8A] uppercase tracking-tight">Marco Jurídico</h2>
              <p className="text-slate-500 max-w-xl mx-auto">La democracia escolar está protegida por leyes nacionales e institucionales que garantizan tu participación.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Circular N° 007 (2026)", subtitle: "SED Valle del Cauca", text: "Establece el cronograma unificado para las elecciones de los estamentos del Gobierno Escolar." },
                { title: "Constitución Política", subtitle: "Artículos 67 y 68", text: "Establecen la obligatoriedad de la participación de la comunidad educativa en la dirección de los centros educativos." },
                { title: "Ley 115 de 1994", subtitle: "Ley General de Educación", text: "Art. 142 obliga la conformación del Gobierno Escolar en todos los establecimientos educativos." },
                { title: "Ordenanza 595 de 2022", subtitle: "Asamblea Departamental", text: "Institucionaliza la figura del Contralor Estudiantil para vigilar los recursos en el departamento." }
              ].map((law, idx) => (
                <div key={idx} className="group relative bg-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl border border-slate-100 overflow-hidden transition-all">
                  <div className="absolute top-0 left-0 w-3 h-full bg-[#1E3A8A]"></div>
                  <div className="mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F59E0B] bg-[#FFFBEB] px-3 py-1.5 rounded-lg border border-yellow-100">
                      {law.subtitle}
                    </span>
                  </div>
                  <h4 className="font-black text-[#1E3A8A] text-2xl mb-4 uppercase tracking-tighter">{law.title}</h4>
                  <p className="text-slate-600 leading-relaxed font-medium">{law.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'cronograma' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="bg-[#1E3A8A] text-white p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden border-b-[10px] border-[#F59E0B]">
              <div className="absolute -right-20 -bottom-20 opacity-10">
                <Calendar size={300} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Cronograma 2026</h2>
              <p className="text-[#FCD34D] text-lg font-bold uppercase tracking-[0.3em]">Ruta de la Excelencia Democrática</p>
            </div>

            <div className="bg-white p-10 md:p-20 rounded-[3rem] shadow-2xl border border-slate-100">
              <div className="relative border-l-[4px] border-slate-100 ml-4 md:ml-10 space-y-16">
                {timelineSteps.map((step, idx) => (
                  <div key={idx} className="relative pl-12 md:pl-20">
                    <div className={`absolute -left-[14px] md:-left-[18px] top-0 w-8 h-8 md:w-10 md:h-10 rounded-full border-[6px] border-white shadow-xl z-10 transition-all ${
                      step.status === 'past' ? 'bg-slate-300' : step.status === 'active' ? 'bg-[#F59E0B] ring-8 ring-[#F59E0B]/20' : 'bg-[#1E3A8A]'
                    }`} />
                    
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <span className={`text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-xl border ${
                          step.status === 'active' ? 'bg-[#F59E0B] text-[#1E3A8A] border-yellow-400' : 'bg-slate-50 text-slate-500 border-slate-100'
                        }`}>
                          {step.date}
                        </span>
                        {step.highlight && (
                          <span className="text-[10px] font-black text-white bg-red-600 px-3 py-1 rounded-lg uppercase animate-pulse">
                            ¡Fecha Crítica!
                          </span>
                        )}
                        {step.status === 'active' && (
                          <span className="text-[10px] font-black text-[#F59E0B] uppercase bg-[#1E3A8A] px-3 py-1 rounded-lg">
                            Etapa en Curso
                          </span>
                        )}
                      </div>
                      
                      <h4 className={`text-3xl font-black uppercase tracking-tighter ${
                        step.status === 'active' ? 'text-[#1E3A8A]' : 'text-slate-800'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-2xl">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-[#1E3A8A] uppercase tracking-tight">Cargos Estudiantiles</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Conoce los perfiles y funciones según nuestro Manual de Convivencia vigente.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 group hover:border-[#1E3A8A] transition-all">
                <div className="bg-[#1E3A8A] p-12 text-white relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10 transform rotate-12 group-hover:rotate-6 transition-transform">
                    <Users size={200} />
                  </div>
                  <h3 className="text-4xl font-black mb-2 uppercase tracking-tight">Personero</h3>
                  <div className="inline-block bg-[#F59E0B] text-[#1E3A8A] text-xs font-black px-4 py-1.5 rounded-full uppercase mt-4 tracking-widest">
                    Grado 11°
                  </div>
                </div>
                <div className="p-12 space-y-6">
                  <p className="text-slate-600 font-bold uppercase text-xs tracking-widest mb-4">Principales Funciones:</p>
                  <ul className="space-y-4">
                    {[
                      "Promover el cumplimiento de los derechos y deberes de los estudiantes.",
                      "Recibir y evaluar quejas sobre el incumplimiento de los deberes de la comunidad.",
                      "Presentar ante el Rector las solicitudes que considere necesarias para proteger los derechos estudiantiles.",
                      "Apelar ante el Consejo Directivo las decisiones del Rector respecto a sus peticiones.",
                      "Promover la ejecución de las leyes, estatutos y reglamentos que rigen la institución.",
                      "Organizar foros u otras formas de deliberación estudiantil."
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4 text-slate-700 font-medium leading-relaxed">
                        <CheckCircle2 size={24} className="text-[#F59E0B] shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 group hover:border-[#F59E0B] transition-all">
                <div className="bg-[#F59E0B] p-12 text-[#1E3A8A] relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 opacity-10 transform -rotate-12 group-hover:-rotate-6 transition-transform">
                    <ShieldCheck size={200} />
                  </div>
                  <h3 className="text-4xl font-black mb-2 uppercase tracking-tight">Contralor</h3>
                  <div className="inline-block bg-[#1E3A8A] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase mt-4 tracking-widest">
                    Grado 10°
                  </div>
                </div>
                <div className="p-12 space-y-6">
                  <p className="text-slate-600 font-bold uppercase text-xs tracking-widest mb-4">Principales Funciones:</p>
                  <ul className="space-y-4">
                    {[
                      "Vigilar la correcta ejecución de los recursos y bienes de la institución.",
                      "Ejercer control social sobre los recursos del PAE (Alimentación Escolar).",
                      "Presentar informes periódicos sobre la gestión institucional al cuerpo estudiantil.",
                      "Velar por el cuidado del medio ambiente y los bienes físicos de la institución.",
                      "Canalizar las inquietudes de la comunidad sobre irregularidades en la gestión financiera.",
                      "Promover la cultura de la transparencia y el cuidado de lo público."
                    ].map((text, i) => (
                      <li key={i} className="flex gap-4 text-slate-700 font-medium leading-relaxed">
                        <CheckCircle2 size={24} className="text-[#1E3A8A] shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'candidatos' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
             <div className="bg-white rounded-[4rem] shadow-3xl border-t-[12px] border-[#F59E0B] p-12 md:p-24 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1E3A8A]/5 rounded-full -ml-32 -mb-32"></div>
                
                <Award size={80} className="text-[#1E3A8A] mx-auto mb-10" />
                
                <h2 className="text-4xl md:text-6xl font-black text-[#1E3A8A] uppercase mb-8 tracking-tighter">Inscripción Abierta</h2>
                
                <p className="text-slate-600 text-xl leading-relaxed max-w-3xl mx-auto font-medium mb-12">
                  Si eres estudiante de los grados finales y tienes vocación de servicio, acércate a la oficina del Proyecto de Democracia entre el <strong className="text-[#F59E0B]">16 y 20 de Febrero</strong> para formalizar tu candidatura.
                </p>
                
                <div className="bg-blue-50 rounded-3xl p-10 max-w-xl mx-auto border border-blue-100 shadow-inner">
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-6">¿Quieres destacar en tu campaña?</p>
                  <button 
                    onClick={() => setActiveTab('ai-assistant')}
                    className="w-full bg-[#1E3A8A] text-white px-8 py-5 rounded-2xl font-black hover:bg-blue-800 shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    <Sparkles size={22} className="text-[#F59E0B]" /> USAR ASISTENTE DE IA
                  </button>
                  <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Te ayudamos a redactar propuestas sólidas y slogans memorables.
                  </p>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'ai-assistant' && <AIAssistant />}
      </main>

      {/* Footer */}
      <footer className="bg-[#1E3A8A] text-white py-20 border-t-[12px] border-[#F59E0B]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="block font-black text-3xl tracking-tighter uppercase leading-none">IENSECAN</span>
              <span className="text-xs text-[#F59E0B] font-bold uppercase tracking-[0.4em] mt-2">Candelaria · Valle</span>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed font-medium opacity-80 max-w-sm">
              La Institución Educativa Nuestra Señora de la Candelaria promueve la formación integral basada en valores democráticos y excelencia académica.
            </p>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-[#F59E0B] font-black uppercase tracking-[0.2em] text-xs">Acceso Rápido</h4>
            <ul className="space-y-4 text-sm font-bold text-blue-100">
              <li className="hover:text-white cursor-pointer flex items-center gap-2 group" onClick={() => setActiveTab('normativa')}>
                <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full group-hover:scale-150 transition-transform"></div> Normativa Vigente
              </li>
              <li className="hover:text-white cursor-pointer flex items-center gap-2 group" onClick={() => setActiveTab('cronograma')}>
                <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full group-hover:scale-150 transition-transform"></div> Cronograma Electoral
              </li>
              <li className="hover:text-white cursor-pointer flex items-center gap-2 group" onClick={() => window.open('https://iensecan.edu.co/', '_blank')}>
                <div className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full group-hover:scale-150 transition-transform"></div> Web Institucional
              </li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="text-[#F59E0B] font-black uppercase tracking-[0.2em] text-xs">Contacto Oficial</h4>
            <div className="space-y-6 text-sm text-blue-100 font-medium">
              <p className="flex items-start gap-4">
                <MapPin size={20} className="text-[#F59E0B] shrink-0" />
                <span>Calle 10 # 7-06 Parque Principal,<br/>Candelaria, Valle del Cauca.</span>
              </p>
              <p className="flex items-center gap-4">
                <Phone size={20} className="text-[#F59E0B] shrink-0" />
                <span>+(57) 602 260 0968</span>
              </p>
              <p className="flex items-center gap-4">
                <Mail size={20} className="text-[#F59E0B] shrink-0" />
                <a href="mailto:rectoria@iensecan.edu.co" className="hover:text-white transition-colors">rectoria@iensecan.edu.co</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-10 border-t border-white/10 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-blue-300 opacity-60">
            © 2026 Institución Educativa Nuestra Señora de la Candelaria · Todos los Derechos Reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
