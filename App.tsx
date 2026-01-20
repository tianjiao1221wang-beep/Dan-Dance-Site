
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Youtube, 
  Instagram, 
  MessageCircle, 
  Phone, 
  Globe,
  Star,
  Award,
  BookOpen,
  Camera,
  MapPin,
  Calendar,
  Compass,
  Heart,
  Sparkles
} from 'lucide-react';
import { translations, Language } from './translations';

// --- Helper Components ---

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={sectionRef} className={`scroll-reveal py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};

const Navbar: React.FC<{ lang: Language; setLang: (l: Language) => void; onNav: (id: string) => void }> = ({ lang, setLang, onNav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations.nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = Object.entries(t);

  const handleClick = (id: string) => {
    onNav(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'py-4 bg-white/95 backdrop-blur-md shadow-sm' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <button onClick={() => handleClick('home')} className="flex flex-col group shrink-0 text-left">
          <span className="font-calligraphy text-2xl md:text-3xl text-[var(--mineral-red)] transition-colors group-hover:text-[var(--lapis-blue)]">丹·舞蹈学院</span>
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-sans-gentle">Dan Dance Academy</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-3">
          {navItems.map(([key, label]) => (
            <button 
              key={key} 
              onClick={() => handleClick(key)}
              className="nav-link"
            >
              {label[lang]}
            </button>
          ))}
          <div className="w-[1px] h-4 bg-[var(--sandstone)] opacity-20 mx-3"></div>
          <button 
            onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}
            className="nav-link !bg-[var(--lapis-blue)]/5 !text-[var(--lapis-blue)] hover:!bg-[var(--lapis-blue)]/15"
          >
            <Globe size={14} className="opacity-70" />
            {lang === 'cn' ? 'EN' : '中文'}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-3 text-[var(--lapis-blue)] hover:bg-[var(--lapis-blue)]/10 rounded-full transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/98 backdrop-blur-3xl z-[60] flex flex-col items-center justify-center gap-6 transition-all duration-500 lg:hidden ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <button className="absolute top-8 right-8 p-4 text-[var(--mineral-red)]" onClick={() => setIsOpen(false)}>
          <X size={32} strokeWidth={1.2} />
        </button>
        {navItems.map(([key, label]) => (
          <button 
            key={key} 
            onClick={() => handleClick(key)}
            className="text-2xl font-serif text-[var(--lapis-blue)] px-12 py-4 rounded-full bg-[var(--lapis-blue)]/5 hover:bg-[var(--lapis-blue)]/10 transition-colors w-72 text-center"
          >
            {label[lang]}
          </button>
        ))}
        <button 
          onClick={() => { setLang(lang === 'cn' ? 'en' : 'cn'); setIsOpen(false); }}
          className="mt-6 block-button bg-blue text-sm w-72"
        >
          {lang === 'cn' ? 'English Version' : '中文版本'}
        </button>
      </div>
    </nav>
  );
};

const Footer: React.FC<{ lang: Language; onNav: (id: string) => void }> = ({ lang, onNav }) => (
  <footer className="bg-white py-32 px-6 md:px-12 border-t border-[var(--lapis-blue)]/10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
      <div className="col-span-1 md:col-span-2 space-y-10">
        <div className="space-y-2">
          <h3 className="font-calligraphy text-4xl text-[var(--mineral-red)]">丹·舞蹈学院</h3>
          <p className="text-[11px] uppercase tracking-[0.5em] opacity-30">Dan Dance Academy</p>
        </div>
        <p className="text-sm opacity-60 leading-loose font-light max-w-sm">
          {lang === 'cn' 
            ? '融合中国舞的千年雅韵与现代舞步。在这里，我们不仅教授技艺，更在塑造充满文化内涵的灵魂。' 
            : 'Merging the ancient elegance of Chinese Dance with modern steps. We do not just teach technique; we shape souls filled with cultural depth.'}
        </p>
      </div>
      <div className="space-y-8">
        <h4 className="text-[11px] uppercase tracking-[0.4em] font-semibold opacity-30 text-[var(--lapis-blue)]">{lang === 'cn' ? '快速导航' : 'Explore'}</h4>
        <div className="flex flex-col gap-5">
     {(['about', 'classes', 'instructors', 'events', 'contact'] as const).map(item => (
            <button key={item} onClick={() => onNav(item)} className="text-sm opacity-50 hover:opacity-100 hover:text-[var(--lapis-blue)] transition-all text-left">
              {translations.nav[item][lang]}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-8">
        <h4 className="text-[11px] uppercase tracking-[0.4em] font-semibold opacity-30 text-[var(--lapis-blue)]">{lang === 'cn' ? '社交动态' : 'Connect'}</h4>
        <div className="flex gap-8">
          <Youtube size={22} className="opacity-40 hover:opacity-100 hover:text-[var(--mineral-red)] cursor-pointer transition-all" />
          <Instagram size={22} className="opacity-40 hover:opacity-100 hover:text-[var(--mineral-red)] cursor-pointer transition-all" />
          <MessageCircle size={22} className="opacity-40 hover:opacity-100 hover:text-[var(--mineral-red)] cursor-pointer transition-all" />
        </div>
      </div>
    </div>
    <div className="mt-32 pt-12 border-t border-[var(--lapis-blue)]/5 text-center text-[10px] opacity-30 font-sans-gentle uppercase tracking-[0.5em]">
      © {new Date().getFullYear()} Dan Dance Academy · Dunhuang Inspired · Professional Excellence
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('cn');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('parentName') ?? '');
    const childAge = String(formData.get('childAge') ?? '');
    const phone = String(formData.get('phone') ?? '');
    const message = String(formData.get('message') ?? '');
    const subject = lang === 'cn' ? '丹·舞蹈学院咨询' : 'Dan Dance Academy Inquiry';
    const body = [
      `${lang === 'cn' ? '家长姓名' : 'Parent Name'}: ${name}`,
      `${lang === 'cn' ? '孩子年龄' : "Child's Age"}: ${childAge}`,
      `${lang === 'cn' ? '联系电话' : 'Phone'}: ${phone}`,
      `${lang === 'cn' ? '咨询内容' : 'Message'}: ${message}`
    ].join('\n');
    window.location.href = `mailto:sipbrush@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  
  return (
    <div className="relative">
      <Navbar lang={lang} setLang={setLang} onNav={scrollToSection} />

      {/* Hero Section */}
      <section id="home" className="h-[105vh] flex items-center justify-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 opacity-90"></div>
          <img 
            src="https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=2000&auto=format&fit=crop" 
            alt="Dunhuang Aesthetic" 
            className="w-full h-full object-cover opacity-[0.25] filter grayscale-[0.1] sepia-[0.2]" 
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto space-y-16">
          <div className="space-y-8">
             <span className="text-[11px] uppercase tracking-[0.8em] opacity-40 font-bold block text-[var(--sandstone)]">
               Since 2014 · Cultural Heritage
             </span>
             <h1 className="text-6xl md:text-9xl font-serif text-[var(--ink)] leading-[1.1] tracking-tight">
               {lang === 'cn' ? (
                 <>
                   <span className="text-[var(--mineral-red)]">丹青</span>绘舞 <br className="hidden md:block" />
                   <span className="font-calligraphy italic md:ml-4 text-[var(--lapis-blue)]">意在千年</span>
                 </>
               ) : (
                 <>
                   Artistry in <br />
                   <span className="font-calligraphy italic text-[var(--lapis-blue)]">Every Step</span>
                 </>
               )}
             </h1>
          </div>
          <p className="text-lg md:text-2xl opacity-60 max-w-2xl mx-auto leading-relaxed font-light">
            {translations.home.heroSubtitle[lang]}
          </p>
          <div className="pt-10 flex flex-col md:flex-row gap-10 justify-center items-center">
            <button onClick={() => scrollToSection('contact')} className="block-button bg-blue text-sm group">
              {translations.home.cta[lang]}
              <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => scrollToSection('about')} className="nav-link py-4 px-10 text-xs shadow-sm bg-white/50 backdrop-blur-sm border border-[var(--lapis-blue)]/10">
              {lang === 'cn' ? '学馆哲学' : 'Our Story'}
            </button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <Section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.5em] text-[var(--lapis-blue)] font-bold flex items-center gap-3">
               <Compass size={16} /> {lang === 'cn' ? '学馆哲学' : 'Philosophy'}
            </h4>
            <h2 className="text-5xl md:text-6xl font-serif text-[var(--lapis-blue)] leading-tight">{translations.about.title[lang]}</h2>
          </div>
          <div className="w-20 h-1 bg-[var(--lapis-blue)]/20 rounded-full"></div>
          <p className="text-xl leading-loose opacity-70 font-light text-justify">
            {translations.about.content[lang]}
          </p>
          <div className="grid grid-cols-2 gap-12 pt-10 border-t border-[var(--sandstone)]/10">
            <div className="space-y-2">
              <span className="block text-4xl font-serif text-[var(--turquoise)]">12+</span>
              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{lang === 'cn' ? '载艺积淀' : 'Years Heritage'}</p>
            </div>
            <div className="space-y-2">
              <span className="block text-4xl font-serif text-[var(--mineral-red)]">3K+</span>
              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{lang === 'cn' ? '学员成长' : 'Alumni Growth'}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 relative">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6 pt-12">
               <img src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=1200" className="rounded-[3.5rem] h-[500px] w-full object-cover shadow-2xl" alt="Dance Art" />
               <div className="rounded-[2.5rem] h-[250px] w-full bg-soft-blue flex items-center justify-center p-8 text-center italic opacity-70 font-serif border border-[var(--lapis-blue)]/10 text-[var(--lapis-blue)]">
                  {lang === 'cn' ? '“舞如丹青，身如墨笔”' : '"Dance like a painting, the body as the ink brush"'}
               </div>
            </div>
            <div className="space-y-6">
               <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200" className="rounded-[3.5rem] h-[400px] w-full object-cover shadow-xl" alt="Stage Moment" />
               <img src="https://images.unsplash.com/photo-1545624442-a08365113d50?q=80&w=1200" className="rounded-[2.5rem] h-[350px] w-full object-cover shadow-lg opacity-90 filter brightness-[1.1]" alt="Dunhuang Step" />
            </div>
          </div>
        </div>
      </Section>

      {/* Classes Section */}
      <Section id="classes" className="bg-soft-blue !max-w-none px-6 md:px-24 border-y border-[var(--lapis-blue)]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.6em] opacity-40 font-bold text-[var(--lapis-blue)]">{lang === 'cn' ? '课程体系' : 'Our Curriculum'}</h4>
            <h2 className="text-5xl md:text-6xl font-serif text-[var(--lapis-blue)]">{translations.classes.title[lang]}</h2>
            <p className="text-base opacity-50 font-light italic text-[var(--lapis-blue)]">{translations.classes.ageGroups[lang]}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { 
                icon: <BookOpen size={28} />, 
                title: translations.classes.chineseDance[lang], 
                desc: lang === 'cn' ? '涵盖古典舞、敦煌舞与民族民间。在舞韵中培养深厚文化底蕴与优雅身姿。' : 'Encompassing Classical, Dunhuang, and Folk. Cultivate cultural depth and graceful posture.',
                color: 'var(--mineral-red)',
                img: 'https://images.unsplash.com/photo-1545624442-a08365113d50?q=80&w=800'
              },
              { 
                icon: <Camera size={28} />, 
                title: translations.classes.kpop[lang], 
                desc: lang === 'cn' ? '前沿流行编舞。提升舞台表现力、爆发力与身体协调性，展现现代自信。' : 'Cutting-edge pop choreography. Enhance stage presence, power, and coordination for modern confidence.',
                color: 'var(--lapis-blue)',
                img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800'
              },
              { 
                icon: <Award size={28} />, 
                title: lang === 'cn' ? '专业集训与比赛' : 'Advanced & Elite', 
                desc: lang === 'cn' ? '为寻求专业突破的学员设计的晋阶课程，接轨国内外权威赛事与等级考试。' : 'Advanced courses for professional breakthroughs, connecting to authoritative dance events.',
                color: 'var(--sandstone)',
                img: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?q=80&w=800'
              }
            ].map((cls, i) => (
              <div key={i} className="museum-card group h-full flex flex-col bg-white overflow-hidden shadow-sm">
                <div className="h-72 overflow-hidden relative">
                   <img src={cls.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={cls.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                </div>
                <div className="p-12 space-y-8 flex-grow flex flex-col">
                  <div className="w-14 h-14 rounded-3xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${cls.color}10`, color: cls.color }}>
                    {cls.icon}
                  </div>
                  <div className="space-y-4 flex-grow">
                    <h3 className="text-3xl font-serif" style={{ color: cls.color }}>{cls.title}</h3>
                    <p className="text-base opacity-60 leading-loose font-light">{cls.desc}</p>
                  </div>
                  <div className="pt-6">
                    <button onClick={() => scrollToSection('contact')} className="nav-link py-4 px-8 font-bold text-[10px] w-full" style={{ color: cls.color, backgroundColor: `${cls.color}08` }}>
                      {lang === 'cn' ? '咨询预约 / Book Now' : 'Inquire Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Instructors Section */}
      <Section id="instructors" className="bg-white">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.6em] opacity-40 font-bold text-[var(--mineral-red)]">
              {lang === 'cn' ? '导师团队' : 'Faculty'}
            </h4>
            <h2 className="text-5xl md:text-6xl font-serif text-[var(--mineral-red)]">{translations.instructors.title[lang]}</h2>
            <p className="text-base md:text-lg opacity-60 font-light max-w-3xl mx-auto">
              {translations.instructors.subtitle[lang]}
            </p>
          </div>

           <div className="grid grid-cols-1 gap-12">
            {[
              {
                id: 'dan-wu',
                name: lang === 'cn' ? '吴丹' : 'Dan Wu',
                role: lang === 'cn' ? '中国舞主教 · 创始人' : 'CHINESE DANCE TEACHING LEAD · FOUNDER',
                desc: lang === 'cn'
                  ? `毕业于首都师范大学，获学士学位。自四岁起学习中国舞基本功，大学期间专注于中国舞与舞台表演及文化表达的融合。
                  曾荣获中国舞蹈界最高奖项之一——荷花奖，并多次登上中国官方春节联欢晚会舞台；同时参与河北空军某部文艺慰问演出志愿活动。
                  少年时期参演《小蝌蚪》《闪闪的红星》《雨中舞蹈》等多项节目，获中央电视台“最受欢迎演员”称号；主演作品《渔家乐》荣获省级奖项。
                  曾被多所重点舞蹈院校录取，包括首都师范大学、东北师范大学。成为一名致力于传承中国舞艺术的教师，始终是她心中最坚定的梦想`.trim()
                  : `Graduated from Capital Normal University with a bachelor’s degree. Dan began studying Chinese dance fundamentals at the age of four and later focused on integrating Chinese dance with stage performance and cultural expression in university.
                  She has received the prestigious Lotus Award and performed multiple times in China’s official Spring Festival Gala. She also volunteered for performance tours with the Hebei Air Force District.
                  As a young dancer, she participated in programs such as Frog Play, Sparkling Red Star, and Dancing in the Rain, receiving CCTV’s “Most Popular Performer” award. Her leading performance in Fisherman's Joy won a provincial award.
                  She was accepted into multiple prestigious dance programs including Capital Normal University and Northeast Normal University. Her biggest dream has always been to become a teacher dedicated to passing on the art of Chinese dance.`.trim(),
                color: 'var(--mineral-red)',
                img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=1200&auto=format&fit=crop'
              },
              {
                id: 'angel-zhao',
                name: lang === 'cn' ? 'Angel Zhao' : 'Angel Zhao',
                role: lang === 'cn' ? 'K-POP｜爵士｜Hip Hop｜拉丁舞导师' : 'K-POP|JAZZ|HIP HOP|LATIN DANCE INSTRUCTOR',
                desc: lang === 'cn'
                   ? `Angel 长期从事舞蹈表演与教学，舞种涵盖 K-POP、Jazz、Hip Hop 及拉丁舞，并持有拉丁舞银牌等级认证。
                  她自幼开始系统学习拉丁舞，随后逐步接触并深入学习爵士舞与 Hip Hop，并因个人兴趣进一步拓展了 K-POP 舞蹈。在大学期间，Angel 组建并带领舞团，策划、拍摄了多支专业舞蹈 MV，并在 Midwest 地区 K-POP 赛事中多次获得第一名。
                  她拥有 6 年以上的舞蹈教学经验，曾教授不同年龄层与不同基础水平的学生。从童年到成年，Angel 持续参与各类舞台演出与舞蹈赛事。2024 年，她参与了芝加哥公牛队（Chicago Bulls）NBA 比赛的开场表演，积累了大型商业舞台的演出经验。
                  除舞蹈领域外，Angel 亦拥有丰富的 T 台及平面模特经验，并于 2024 年参与好莱坞 International Fashion Supermodel（IFSM）时装秀。此外，她曾获得 Miss Chinatown Chicago 第一公主，并在 Miss Chinatown USA 全国赛中获得第四公主 的头衔。`.trim()
                  : `Angel Zhao is a multi-style dancer and instructor trained in K-POP, Jazz, Hip Hop, and Latin dance, and holds a Silver Medal certification in Latin. 
                  She began her dance training at a young age with Latin dance, later expanding into Jazz and Hip Hop, and eventually focusing on K-POP. During her university years, Angel founded and led a dance team, producing multiple professional dance MVs and earning multiple 1st Place titles at Midwest K-POP competitions. 
                  She brings over 6 years of teaching experience, working with dancers of different ages and levels. She has participated in numerous stage performances and dance competitions from childhood through adulthood. In 2024, she performed in the opening show of a Chicago Bulls NBA game, adding large-scale commercial stage experience to her background.
                  In addition to dance, Angel has an extensive runway and print modeling background, including participation in the International Fashion Supermodel (IFSM) Hollywood show in 2024. She also holds national pageant titles, including 1st Princess of Miss Chinatown Chicago and 4th Princess at Miss Chinatown USA.`.trim(),
                color: 'var(--lapis-blue)',
                img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop'
              },
              {
                id: 'Fengyuan-liu',
                name: lang === 'cn' ? '刘逢源' : 'Fengyuan Liu',
                role: lang === 'cn' ? '中国舞助教' : 'CHINESE DANCE TEACHING ASSISTANT',
                desc: lang === 'cn'
                 ? `5岁开始学习中国舞，小学至高中作为北京金帆舞蹈团核心成员，曾获4届北京市舞蹈艺术节金奖及荷花奖、第30届加泰罗尼亚国际舞蹈大赛最佳表演奖、CCTV全国舞蹈大赛最佳作品奖等重要奖项。 
                 演出足迹跨越艺术交流与文化传播的广阔舞台：曾参与中共中央国务院春节团拜会演出，两次受邀赴爱丁堡艺术节演出，并先后出访俄罗斯、韩国、澳大利亚、新加坡等多国，在赤塔中学文化交流、首尔北京建交20周年庆典、澳大利亚猴年春晚、新加坡国立小学艺术交流等重要场合展现中国舞蹈魅力。 
                 本科就读于加州大学戴维斯分校期间，担任校中国舞蹈团副团长及编舞，负责日常排练、作品编创与团队管理。带领舞团连续三年夺得加州大学戴维斯分校舞蹈大赛冠军，并参与华人春晚演出、组织舞蹈专场演出等活动，始终致力于以舞蹈传承与弘扬中国传统文化。`.trim()
                  : ` Starting her journey in Chinese dance at the age of five, Ariel was a core member of the Beijing Jinfan Dance Troupe throughout her elementary and high school years. Her exceptional talent has been recognized with top honors, including the Lotus Award (China’s highest dance accolade), four Gold Awards at the Beijing Student Art Festival, the Best Performance Award at the 30th Catalonia International Dance Competition, and the Best Work Award at the CCTV National Dance Competition. 
                  Ariel possesses extensive stage experience in high-level cultural exchanges. She has performed at the National Spring Festival Group Greeting for state leaders and was invited twice to the renowned Edinburgh Festival Fringe. Her artistic footprint spans Russia, South Korea, Australia, and Singapore, featuring prominent roles in events such as the 20th Anniversary of Seoul-Beijing Diplomatic Relations and the Australian Year of the Monkey Spring Gala. 
                  During Ariel's undergraduate studies at the University of California, Davis, she served as Vice President and Choreographer of the Chinese Dance Troupe. Combining management with artistry, she led her team to three consecutive championships at the UC Davis Dance Competition. Dedicated to the inheritance of Chinese culture, she continues to bring her expertise in choreography, rehearsal management, and performance to the stage. `.trim(),
                color: 'var(--sandstone)',
                img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop'
              },
              {
                id: 'ziyu-liu',
                name: lang === 'cn' ? '刘子毓' : 'Ziyu Liu',
                role: lang === 'cn' ? '中国舞助教' : 'CHINESE DANCE TEACHING ASSISTANT',
                desc: lang === 'cn'
                 ? `5岁开始学习中国舞，小学至高中作为北京金帆舞蹈团核心成员，曾获4届北京市舞蹈艺术节金奖及荷花奖、第30届加泰罗尼亚国际舞蹈大赛最佳表演奖、CCTV全国舞蹈大赛最佳作品奖等重要奖项。 
                 演出足迹跨越艺术交流与文化传播的广阔舞台：曾参与中共中央国务院春节团拜会演出，两次受邀赴爱丁堡艺术节演出，并先后出访俄罗斯、韩国、澳大利亚、新加坡等多国，在赤塔中学文化交流、首尔北京建交20周年庆典、澳大利亚猴年春晚、新加坡国立小学艺术交流等重要场合展现中国舞蹈魅力。 
                 本科就读于加州大学戴维斯分校期间，担任校中国舞蹈团副团长及编舞，负责日常排练、作品编创与团队管理。带领舞团连续三年夺得加州大学戴维斯分校舞蹈大赛冠军，并参与华人春晚演出、组织舞蹈专场演出等活动，始终致力于以舞蹈传承与弘扬中国传统文化。`.trim()
                  : ` Starting her journey in Chinese dance at the age of five, Ariel was a core member of the Beijing Jinfan Dance Troupe throughout her elementary and high school years. Her exceptional talent has been recognized with top honors, including the Lotus Award (China’s highest dance accolade), four Gold Awards at the Beijing Student Art Festival, the Best Performance Award at the 30th Catalonia International Dance Competition, and the Best Work Award at the CCTV National Dance Competition. 
                  Ariel possesses extensive stage experience in high-level cultural exchanges. She has performed at the National Spring Festival Group Greeting for state leaders and was invited twice to the renowned Edinburgh Festival Fringe. Her artistic footprint spans Russia, South Korea, Australia, and Singapore, featuring prominent roles in events such as the 20th Anniversary of Seoul-Beijing Diplomatic Relations and the Australian Year of the Monkey Spring Gala. 
                  During Ariel's undergraduate studies at the University of California, Davis, she served as Vice President and Choreographer of the Chinese Dance Troupe. Combining management with artistry, she led her team to three consecutive championships at the UC Davis Dance Competition. Dedicated to the inheritance of Chinese culture, she continues to bring her expertise in choreography, rehearsal management, and performance to the stage. `.trim(),
                color: 'var(--sandstone)',
                 img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop'
               }
            }
            ].map((instructor) => (
              <div key={instructor.id} className="group rounded-[3rem] overflow-hidden bg-white shadow-xl border border-[var(--lapis-blue)]/5 flex flex-col">
                <div className="h-80 overflow-hidden relative">
                  <img src={instructor.img} className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" alt={instructor.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    <div>
                      <p className="text-white text-2xl font-serif">{instructor.name}</p>
                      <p className="text-white/70 text-xs uppercase tracking-[0.4em] mt-2">{instructor.role}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-sm">
                      <Sparkles size={20} className="text-white/70" />
                    </div>
                  </div>
                </div>
                <div className="p-10 space-y-6 flex-grow">
                  <div className="w-16 h-1 rounded-full" style={{ backgroundColor: `${instructor.color}40` }}></div>
                  <p className="text-base opacity-60 leading-loose font-light">{instructor.desc}</p>
                  <button onClick={() => scrollToSection('contact')} className="nav-link py-3 px-8 text-xs font-bold" style={{ color: instructor.color, backgroundColor: `${instructor.color}10` }}>
                    {lang === 'cn' ? '预约试课' : 'Book a Trial'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section id="performances" className="space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <h4 className="text-[11px] uppercase tracking-[0.6em] opacity-40 font-bold text-[var(--lapis-blue)]">{lang === 'cn' ? '舞台华章' : 'Gallery'}</h4>
            <h2 className="text-5xl md:text-6xl font-serif text-[var(--lapis-blue)]">{translations.nav.performances[lang]}</h2>
          </div>
          <p className="max-w-xs text-base opacity-40 font-light leading-relaxed md:text-right italic">
            "{lang === 'cn' ? '聚光灯下的每一刻，都是汗水的完美回响。' : 'Every moment under the spotlight is the perfect echo of hard work.'}"
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { id: 453, span: 'col-span-2 row-span-2' },
            { id: 454, span: 'col-span-1 row-span-1' },
            { id: 455, span: 'col-span-1 row-span-1' },
            { id: 456, span: 'col-span-2 row-span-1' },
            { id: 457, span: 'col-span-1 row-span-1' },
            { id: 458, span: 'col-span-1 row-span-1' }
          ].map((img, i) => (
            <div key={i} className={`rounded-[3rem] overflow-hidden relative group ${img.span} h-full min-h-[300px] shadow-2xl`}>
              <img src={`https://picsum.photos/id/${img.id}/1200/1000`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter brightness-[0.85] grayscale-[0.2]" alt="Performance Img" />
              <div className="absolute inset-0 bg-[var(--lapis-blue)]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[4px]">
                 <Star className="text-white opacity-60 absolute top-8 right-8" size={24} />
                 <span className="text-white text-[11px] uppercase tracking-[0.5em] border border-white/40 px-8 py-4 rounded-full font-bold">Showcase</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Student Journey */}
      <Section id="students" className="bg-soft-gold !max-w-none px-6 md:px-24 py-40">
        <div className="max-w-5xl mx-auto space-y-32">
          <div className="text-center space-y-8">
             <h4 className="text-[11px] uppercase tracking-[0.7em] opacity-40 font-bold text-[var(--sandstone)]">{lang === 'cn' ? '舞者蜕变' : 'Student Stories'}</h4>
             <h2 className="text-5xl md:text-7xl font-serif text-[var(--sandstone)]">{translations.nav.students[lang]}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
            {[
              { 
                name: 'Chloe', 
                age: 9, 
                quote: lang === 'cn' ? '从最初的胆怯到如今舞台上的自信谢幕，舞蹈不仅塑造了她的体态，更给予了她坚韧的内心。' : 'From initial shyness to confident curtain calls, dance has shaped not just her posture, but her resilient heart.',
                img: 'https://picsum.photos/id/64/800/800',
                color: 'var(--mineral-red)'
              },
              { 
                name: 'Kevin', 
                age: 12, 
                quote: lang === 'cn' ? '在汗水中找到节奏，在音乐中发现自我。对他而言，每一个节拍都是通往未来的台阶。' : 'Finding rhythm in sweat, discovering self in music. For him, every beat is a step toward the future.',
                img: 'https://picsum.photos/id/65/800/800',
                color: 'var(--lapis-blue)'
              }
            ].map((story, i) => (
              <div key={i} className="flex flex-col gap-12 group">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 rounded-[4.5rem] border-2 border-[var(--sandstone)]/10 -rotate-3 group-hover:rotate-0 transition-transform duration-1000 shadow-sm"></div>
                  <img src={story.img} className="w-full h-full object-cover rounded-[4.5rem] shadow-2xl group-hover:scale-[0.98] transition-transform duration-1000" alt={story.name} />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Heart size={32} style={{ color: story.color }} fill={story.color} opacity={0.2} />
                  </div>
                </div>
                <div className="space-y-8 px-6">
                  <h3 className="text-4xl font-serif" style={{ color: story.color }}>{story.name} <span className="text-lg font-light opacity-30 italic">/ {story.age} Yrs</span></h3>
                  <p className="text-xl opacity-60 leading-relaxed font-light italic">"{story.quote}"</p>
                  <button onClick={() => scrollToSection('contact')} className="nav-link py-4 px-10 font-bold text-xs" style={{ color: story.color, backgroundColor: `${story.color}10` }}>
                    {lang === 'cn' ? '见证更多成长' : 'See Growth'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Events Timeline */}
      <Section id="events" className="bg-soft-blue !max-w-none border-y border-[var(--lapis-blue)]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.6em] opacity-40 font-bold text-[var(--lapis-blue)]">{lang === 'cn' ? '艺文动态' : 'Academy Events'}</h4>
            <h2 className="text-5xl md:text-6xl font-serif text-[var(--lapis-blue)]">{translations.nav.events[lang]}</h2>
          </div>
          
          <div className="space-y-40 relative px-6">
            <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[1px] bg-[var(--lapis-blue)]/10 hidden lg:block"></div>
            
            {[
              { date: '2024.12', title: lang === 'cn' ? '年度公演：敦煌之梦' : 'Annual Gala: Dunhuang Dream', desc: lang === 'cn' ? '将千年壁画搬上现代舞台，一场穿越时空的沉浸式艺术盛宴。' : 'Bringing thousand-year-old murals to the modern stage in an immersive artistic feast.', img: 'https://images.unsplash.com/photo-1545624442-a08365113d50?q=80&w=1200', color: 'var(--mineral-red)' },
              { date: '2025.03', title: lang === 'cn' ? '春季大师集训营' : 'Spring Master Class', desc: lang === 'cn' ? '特邀业内名师亲临指导，探索身体表达的无限可能与技艺巅峰。' : 'Invited masters guide students to explore infinite possibilities of expression and skill.', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200', color: 'var(--lapis-blue)' }
            ].map((ev, i) => (
              <div key={i} className={`flex flex-col lg:flex-row items-center gap-20 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:w-1/2 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'} space-y-8`}>
                  <div className="flex items-center gap-4 justify-center lg:justify-end">
                    <Calendar size={20} style={{ color: ev.color }} />
                    <span className="text-3xl font-serif opacity-70" style={{ color: ev.color }}>{ev.date}</span>
                  </div>
                  <h3 className="text-4xl font-serif leading-tight" style={{ color: ev.color }}>{ev.title}</h3>
                  <p className="text-lg opacity-50 font-light leading-loose max-w-md mx-auto lg:mx-0 ${i % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'}">{ev.desc}</p>
                  <div className="pt-6">
                    <button onClick={() => scrollToSection('contact')} className="nav-link py-4 px-10 font-bold text-xs" style={{ backgroundColor: `${ev.color}10`, color: ev.color }}>
                      {lang === 'cn' ? '预约席位 / Reserve' : 'Reserve Spot'}
                    </button>
                  </div>
                </div>
                <div className="w-14 h-14 rounded-full bg-white border-2 border-[var(--lapis-blue)]/10 hidden lg:flex items-center justify-center z-10 shadow-xl shrink-0">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ev.color }}></div>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className="rounded-[4rem] overflow-hidden aspect-[16/10] shadow-2xl relative border-8 border-white">
                    <img src={ev.img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" alt={ev.title} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 bg-white rounded-[5rem] p-12 md:p-32 shadow-2xl border border-[var(--lapis-blue)]/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--lapis-blue)] opacity-[0.03] rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl"></div>
          
          <div className="lg:col-span-5 space-y-16">
            <div className="space-y-8">
              <h2 className="text-5xl md:text-6xl font-serif text-[var(--mineral-red)]">{translations.contact.title[lang]}</h2>
              <p className="text-lg opacity-60 font-light leading-loose">
                {lang === 'cn' ? '静候您的垂询。无论是预约试听课还是探讨艺术合作，我们都期待为您开启一段优雅的旅程。' : 'Awaiting your inquiry. Whether for a trial class or artistic collaboration, we look forward to starting an elegant journey with you.'}
              </p>
            </div>
            
            <div className="space-y-12">
               <div className="flex items-center gap-8 group">
                 <div className="w-16 h-16 rounded-[2rem] bg-soft-blue flex items-center justify-center group-hover:bg-[var(--lapis-blue)] group-hover:text-white transition-all duration-700 shadow-sm text-[var(--lapis-blue)]">
                   <MapPin size={24} strokeWidth={1.5} />
                 </div>
                 <div className="space-y-2">
                   <p className="text-[11px] uppercase tracking-widest opacity-30 font-bold text-[var(--lapis-blue)]">{lang === 'cn' ? '艺术工坊' : 'Academy'}</p>
                   <p className="text-lg font-medium">123 Dan Street, Art City, 56789</p>
                 </div>
               </div>
               <div className="flex items-center gap-8 group">
                 <div className="w-16 h-16 rounded-[2rem] bg-soft-red flex items-center justify-center group-hover:bg-[var(--mineral-red)] group-hover:text-white transition-all duration-700 shadow-sm text-[var(--mineral-red)]">
                   <Phone size={24} strokeWidth={1.5} />
                 </div>
                 <div className="space-y-2">
                   <p className="text-[11px] uppercase tracking-widest opacity-30 font-bold text-[var(--mineral-red)]">{lang === 'cn' ? '咨询专线' : 'Phone'}</p>
                   <p className="text-lg font-medium">+1 (217) 220-5246</p>
                 </div>
               </div>
            </div>

            <div className="pt-16 border-t border-[var(--sandstone)]/10 flex items-center gap-10">
               <div className="w-28 h-28 bg-[var(--parchment)] rounded-3xl p-3 flex items-center justify-center border border-[var(--sandstone)]/10 shadow-inner">
                 <div className="w-full h-full border border-dashed border-[var(--sandstone)]/30 rounded-2xl flex items-center justify-center">
                    <span className="text-[9px] opacity-30 uppercase tracking-[0.1em] text-center text-[var(--lapis-blue)]">WECHAT<br/>QR</span>
                 </div>
               </div>
               <p className="text-[11px] uppercase tracking-[0.3em] opacity-30 font-bold leading-relaxed text-[var(--lapis-blue)]">{lang === 'cn' ? '扫码快速咨询 / WeChat' : 'Scan for instant chat'}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12" onSubmit={handleContactSubmit}>
              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.4em] font-bold opacity-30 ml-3">{translations.contact.name[lang]}</label>
                 <input name="parentName" required type="text" className="w-full bg-transparent border-b border-[var(--sandstone)]/30 py-6 px-3 focus:border-[var(--mineral-red)] outline-none transition-all font-light text-lg" placeholder="..." />
              </div>
              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.4em] font-bold opacity-30 ml-3">{translations.contact.childAge[lang]}</label>
                <input name="childAge" required type="number" className="w-full bg-transparent border-b border-[var(--sandstone)]/30 py-6 px-3 focus:border-[var(--mineral-red)] outline-none transition-all font-light text-lg" placeholder="..." />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[11px] uppercase tracking-[0.4em] font-bold opacity-30 ml-3">{translations.contact.phone[lang]}</label>
                <input name="phone" required type="tel" className="w-full bg-transparent border-b border-[var(--sandstone)]/30 py-6 px-3 focus:border-[var(--mineral-red)] outline-none transition-all font-light text-lg" placeholder="..." />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[11px] uppercase tracking-[0.4em] font-bold opacity-30 ml-3">{translations.contact.message[lang]}</label>
                <textarea name="message" rows={4} className="w-full bg-transparent border-b border-[var(--sandstone)]/30 py-6 px-3 focus:border-[var(--mineral-red)] outline-none transition-all resize-none font-light text-lg" placeholder="..."></textarea>
              </div>
              <div className="md:col-span-2 pt-10">
                <button type="submit" className="block-button bg-red w-full md:w-auto text-sm uppercase tracking-[0.4em] font-bold py-6 px-20">
                  {translations.contact.submit[lang]}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Section>

      <Footer lang={lang} onNav={scrollToSection} />
    </div>
  );
}
