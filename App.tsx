
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
    {(['about', 'classes', 'instructors', 'awards', 'events', 'contact'] as const).map(item => (
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
 const studentStories = [
    { 
      name: 'Norah Lin', 
      age: 9, 
      quote: {
        cn: '2023年加入DanDance艺术学校，从零开始打基础一直到让自己无比热爱中国舞。\nNorah妈妈说她从来不用担心Norah会懈怠，因为她会给自己留舞蹈作业，每天自己对着镜子重复无数次一样的动作直到让自己满意为止。\n正是对舞蹈的这份热爱，让Norah拥有了坚韧不拔的品质，并在两年后的Showstoppers、KAR、Rainbow等舞蹈大赛中斩获同年龄段第一名和Overall总成绩第七名的成绩。\nNorah Lin：“不是我选择了舞蹈，而是舞蹈选择了我，是舞蹈让我变成了更漂亮的人。”',
        en: 'From initial shyness to confident curtain calls, dance has shaped not just her posture, but her resilient heart.\nShe practices on her own after class, repeating sequences until she is satisfied with each detail.\nThe dedication has turned into top placements at regional competitions and a stronger sense of self.'
      },
      img: '/images/student-norah.jpg',
      color: 'var(--mineral-red)'
    },
    { 
      name: 'Jethro Lee', 
      age: 12, 
      quote: {
        cn: '2024年加入DanDance艺术学校学习中国舞课程，Jethro一直对中国舞饱有浓厚的兴趣。\n虽然比同班级的同学们开始学习舞蹈的时间更晚，但他在课堂中积极努力，回家后还自律练习。\n一年后的Showstoppers和Platinum舞蹈大赛中，他获得独舞铂金奖和同年龄组第二名的成绩。\nJethro还把中国舞动作融入滑冰表演，自编节目成为冰场亮点。Jethro Lee：“学跳舞虽然有时候很辛苦，但我愿意为了让自己变得更好而吃苦。”',
        en: 'Finding rhythm in sweat, discovering self in music.\nEven with a later start, his focused practice earned top placements in solo competitions.\nHe now blends Chinese dance movements into his ice-skating routines, turning every performance into a cultural highlight.'
      },
      img: '/images/student-jethero.jpg',
      color: 'var(--lapis-blue)'
    },
    { 
      name: 'Valerie Lin', 
      age: 10, 
      quote: {
        cn: '2023年加入DanDance艺术学校，自此与中国舞结下了不解之缘。Valerie同学一路从基础班层层晋升到比赛班，一直对自己严格要求。\n在学习中国舞的过程中，Valerie同学接触过多种不同风格舞蹈，比如身韵舞蹈、敦煌舞蹈、民族舞蹈等，在学习的第二年中主动和吴老师说喜欢跳敦煌舞并想要在敦煌舞中深入学习，所以开始了自己了一对一舞蹈课。\n两年后，凭借一直敦煌独舞，斩获KAR舞蹈大赛中同年龄组第一名和Overall总成绩第一名的好成绩。同年，还获得Showstoppers和Rainbow舞蹈大赛第二名的成绩，和国际桃李杯十佳铂金奖提名。\n现在，Valerie同学依然每周坚持上群舞课和独舞课，虽然比其他同学辛苦一点，到她仍然乐在其中。\nValerie Lin：“中国舞很美，我想把这么优秀的中华文化传承下去。”\n她最喜欢的是敦煌主题作品，因为“每一次挥袖都像在画壁画”。',
        en: 'Valerie joined DanDance Art School in 2023 and has since formed a deep and lasting connection with Chinese dance. Beginning in the foundational level, she steadily advanced through each class level and eventually entered the competition program, consistently holding herself to high standards.\nThroughout her Chinese dance training, Valerie has explored a wide range of styles, including Shenyun (movement and expression), Dunhuang dance, and ethnic folk dance. In her second year of study, she proactively expressed to Ms. Wu her strong interest in Dunhuang dance and her desire to pursue deeper training in this style. As a result, she began one-on-one private lessons focused on Dunhuang dance.\nAfter two years of dedicated study, Valerie achieved outstanding results with her Dunhuang solo, earning 1st Place in her age division and Overall 1st Place at the KAR Dance Competition. In the same year, she also received 2nd Place awards at the Showstoppers and Rainbow Dance Competitions, as well as a Top Ten Platinum Award nomination at the International Taoli Cup.\nToday, Valerie continues to attend both group and solo classes every week. Although her training schedule is more demanding than that of many peers, she finds great joy and fulfillment in the process.
\nValerie Lin: “Chinese dance is incredibly beautiful. I hope to carry forward and pass on this outstanding Chinese culture.”'
      },
      img: '/images/student-valerie.jpg',
      color: 'var(--sandstone)'
    },
    { 
      name: 'Fiona Duan', 
      age: 11, 
      quote: {
        cn: '2024年加入DanDance艺术学校，曾经学习芭蕾舞蹈的她和妈妈说：“我不喜欢芭蕾舞，我喜欢古典舞。” 自此，Fiona开始了她的中国舞学习之旅。\n她对中国舞的一招一式表现得非常感兴趣，甚至自己可以通过聆听中国舞的音乐来改编整合成自己的音乐，再运用到自己的独舞剧目中。在学习舞蹈这方面，她潜心钻研，不畏辛苦。\n一年后，Fiona通过独舞课程完成了自己的第一支古典舞《醉清波》，并获得国际桃李杯十佳铂金奖提名。直至今日，她仍然在舞蹈课中积极学习，出现在芝加哥各大专业舞台中。\nFiona Duan：“舞蹈是我生命中的一部分，我永远都不会放弃跳舞这件事。”',
        en: 'In 2024, Fiona joined DanDance Art School. Having previously studied ballet, she once told her mother, “I don’t like ballet—I like classical Chinese dance.” From that moment on, Fiona began her journey in Chinese dance.\nShe shows a deep fascination with every movement and gesture of Chinese dance. Remarkably, she is even able to listen to traditional Chinese dance music, reinterpret and rearrange it into her own compositions, and apply them to her solo performances. In her dance training, Fiona is dedicated, focused, and unafraid of hard work.\nAfter one year of study, Fiona completed her first classical Chinese dance solo, Zui Qing Bo, through the solo training program and received a nomination for the Top Ten Platinum Award at the International Taoli Cup. To this day, she continues to train actively and appears on major professional stages throughout Chicago.
\nFiona Duan:“Dance is a part of my life. I will never give up dancing.”'
      },
      img: '/images/student-fiona.jpg',
      color: 'var(--jade)'
    }
  ];
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
    <div className="relative">
      <Navbar lang={lang} setLang={setLang} onNav={scrollToSection} />
{isGalleryOpen ? (
         <div className="fixed inset-0 z-[90] flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setIsGalleryOpen(false)}
          ></div>
          <div className="relative z-10 max-w-5xl w-full max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.5em] opacity-40 font-bold text-white">
                  {lang === 'cn' ? '往期回顾' : 'Past Event Gallery'}
                </p>
                 <h3 className="text-3xl md:text-4xl font-serif text-white">
                  {lang === 'cn' ? '2025 年度公演' : '2025 Annual Gala'}
                </h3>
              </div>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="nav-link px-6 py-3 text-xs font-bold text-white border-white/40 hover:border-white"
              >
                {lang === 'cn' ? '关闭' : 'Close'}
              </button>
            </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
              {pastEventGallery.map((src) => (
                 <div key={src} className="rounded-[2.5rem] overflow-hidden shadow-xl bg-white/90">
                  <img src={src} alt="Past event highlight" className="w-full h-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Hero Section */}
      <section id="home" className="h-[105vh] flex items-center justify-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white z-10 opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 opacity-90"></div>
          <img 
             src="/images/hero.jpg"
            alt="Dunhuang Aesthetic" 
            className="w-full h-full object-contain opacity-[0.25] filter grayscale-[0.1] sepia-[0.2]"
          />
        </div>
        
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto space-y-16">
          <div className="space-y-8">
             <span className="text-[11px] uppercase tracking-[0.8em] opacity-40 font-bold block text-[var(--sandstone)]">
               Since 2014 · Cultural Heritage
             </span>
             <h1 className={`text-4xl sm:text-5xl md:text-9xl font-serif text-[var(--ink)] leading-[1.1] tracking-tight ${lang === 'cn' ? 'whitespace-nowrap md:whitespace-normal' : ''}`}>
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
              <span className="block text-4xl font-serif text-[var(--turquoise)]">3+</span>
              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{lang === 'cn' ? '载艺积淀' : 'Years Heritage'}</p>
            </div>
            <div className="space-y-2">
              <span className="block text-4xl font-serif text-[var(--mineral-red)]">200+</span>
              <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">{lang === 'cn' ? '学员成长' : 'Alumni Growth'}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 relative">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6 pt-12">
               <img src="/images/about-1.jpg" className="rounded-[3.5rem] h-[500px] w-full object-contain shadow-2xl" alt="Dance Art" />
               <div className="rounded-[2.5rem] h-[250px] w-full bg-soft-blue flex items-center justify-center p-8 text-center italic opacity-70 font-serif border border-[var(--lapis-blue)]/10 text-[var(--lapis-blue)]">
                  {lang === 'cn' ? '“舞如丹青，身如墨笔”' : '"Dance like a painting, the body as the ink brush"'}
               </div>
            </div>
            <div className="space-y-6">
               <img src="/images/about-2.jpg" className="rounded-[3.5rem] h-[400px] w-full object-contain shadow-xl" alt="Stage Moment" />
               <img src="/images/about-3.jpg" className="rounded-[2.5rem] h-[350px] w-full object-contain shadow-lg opacity-90 filter brightness-[1.1]" alt="Dunhuang Step" />
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
                desc: lang === 'cn' ? '涵盖中国古典舞、芭蕾基训与民族民间。在舞韵中培养深厚文化底蕴与优雅身姿。' : 'Encompassing Chinese Classical, Ballet fundamental, and Folk. Cultivate cultural depth and graceful posture.',
                color: 'var(--mineral-red)',
                img: '/images/class-chinese.jpg'
              },
              { 
                icon: <Camera size={28} />, 
                title: translations.classes.kpop[lang], 
                desc: lang === 'cn' ? '前沿流行编舞。提升舞台表现力、爆发力与身体协调性，展现现代自信。' : 'Cutting-edge pop choreography. Enhance stage presence, power, and coordination for modern confidence.',
                color: 'var(--lapis-blue)',
                img: '/images/class-kpop.jpg'
              },
              { 
                icon: <Award size={28} />, 
                title: lang === 'cn' ? '专业集训与比赛' : 'Advanced & Elite', 
                desc: lang === 'cn' ? '为寻求专业突破的学员设计的晋阶课程，接轨国内外权威赛事与等级考试。' : 'Advanced courses for professional breakthroughs, connecting to authoritative dance events.',
                color: 'var(--sandstone)',
                img: '/images/class-elite.jpg'
              }
            ].map((cls, i) => (
              <div key={i} className="museum-card group h-full flex flex-col bg-white overflow-hidden shadow-sm">
                <div className="h-72 overflow-hidden relative">
                  <img
                    src={cls.img}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    alt={cls.title}
                    loading="lazy"
                    decoding="async"
                  />
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
                role: lang === 'cn' ? '古典舞|民族舞|芭蕾基训 主教 · 创始人' : 'CHINESE DANCE TEACHING LEAD · FOUNDER',
                desc: lang === 'cn'
                  ? `首都师范大学本科，四岁开始学习中国舞基本功，大一开始钻研中国舞舞蹈文化，着重于舞蹈和表演间结合。
                  曾获得荷花奖并多次参演中国春晚舞台，曾为河北空军文艺分队演员。少年时期参演《娃娃雨》《闪闪红星》《跃动》等节目荣获中央电视台“最佳人气奖”，领舞《渔翁舞》曾获省级表演奖。
                  考入首都师范大学、北京师范大学多所艺术专业院校的录取通知书。最大的梦想是能成为一名传承中国舞文化的教师。
                  之后，赴美留学获得临床心理学和犯罪心理学双学士学位和婚姻家庭心理学硕士学位。持续研究儿童与父母等家庭关系，致力于把舞蹈融入心理疏导的过程中，并登上伊利诺伊大学关于舞蹈心理学的演讲台。
                  大学期间，在美创办中国舞蹈团，曾为伊利诺伊州音乐学院特邀导演，所带领团队多次参演国际节并作为中国舞编导登上州报头条。毕业前的最后一年，带领自己的学生在州政府剧院演出唯一一届中国舞蹈文化公益演出，累计不同国家演员观众中国文化，演出跨场超过60次。
                  硕士毕业后，坚持“有人艺术，无为过往，无为现在，而为未来”的核心思想创办艺术学校，带领每位学员自信舞蹈，心无旁骛，无畏挑战。`.trim()
                  : `Graduated from Capital Normal University with a bachelor’s degree. Dan began studying Chinese dance fundamentals at the age of four and later focused on integrating Chinese dance with stage performance and cultural expression in university.
                  She has received the prestigious Lotus Award and performed multiple times in China’s official Spring Festival Gala. She also volunteered for performance tours with the Hebei Air Force District.
                  As a young dancer, she participated in programs such as Frog Play, Sparkling Red Star, and Dancing in the Rain, receiving CCTV’s “Most Popular Performer” award. Her leading performance in Fisherman's Joy won a provincial award.
                  She was accepted into multiple prestigious dance programs including Capital Normal University and Northeast Normal University. Her biggest dream has always been to become a teacher dedicated to passing on the art of Chinese dance.`.trim(),
                color: 'var(--mineral-red)',
                img: '/images/instructor-dan.jpg'
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
                img: '/images/instructor-angel.jpg'
              },
              {
                id: 'Fengyuan-liu',
                name: lang === 'cn' ? '刘逢源' : 'Fengyuan Liu',
                role: lang === 'cn' ? '中国舞助教' : 'CHINESE DANCE TEACHING ASSISTANT',
                desc: lang === 'cn'
                 ? `前国家二级健美操运动员，曾荣获由国家体育总局科教司主办的全国运动联盟操舞联赛（有氧舞蹈类）个人第一名、团体第一名。曾在第十四届中华人民共和国大学生运动会排球赛、篮球赛等国家级大型体育赛事中担任啦啦队队长，并于开幕式演出中担任领舞，具备丰富的大型舞台演出与团队编排经验。
                 退役后专注于舞蹈的系统化、专业化训练，通过北京舞蹈学院中国舞等级考试第13级（最高级），并获得优秀成绩。曾参加舞蹈类高水平艺术团（艺术特长生）选拔考试，获得清华大学、中山大学等高校20分降分录取资格，并被多所重点院校认定为艺术特长生。参演舞蹈作品《额尔古纳河》，在全国大学生艺术展演（舞蹈表演组）中荣获二等奖。
                 就读于普渡大学期间，担任中国学生会主席，并担任西北印第安纳华人春晚导演。两次受邀参加普渡大学国际文化节演出，表演中国舞独舞《夜泊秦淮》；参与社区中学家庭开放日文化交流演出；参演大芝加哥地区华人国庆晚会开场舞《草原上升起不落的太阳》。此外，参加2025年芝加哥华埠小姐选美比赛，并于决赛中表演中国舞《彩云之南》。
                 导师具备扎实的舞蹈基本功、良好的身体控制与舞感，以及出色的舞台表现与艺术表达能力。教学过程中注重技术训练与情感表达并重，强调循序渐进与因材施教，致力于帮助学生提升舞蹈表现力，培养自信气质与综合艺术素养。`.trim()
                  : ` A former National Level-II Aerobics Athlete, the instructor has won First Place (Individual) and First Place (Group) in the National Aerobics & Dance League (Aerobic Dance Category) organized by the Department of Science and Education of the General Administration of Sport of China. She has served as cheerleading team captain at national-level sporting events, including the 14th National University Games of the People’s Republic of China (volleyball and basketball competitions), and performed as a lead dancer in opening ceremony productions, gaining extensive experience in large-scale stage performances and team choreography.
                 After retiring from competitive athletics, she dedicated herself to systematic and professional dance training. She successfully passed the Beijing Dance Academy Chinese Dance Level 13 Examination (highest level) with an Excellent rating. She later participated in high-level dance troupe (artistic talent) selection exams and received 20-point admission score reductions from prestigious universities such as Tsinghua University and Sun Yat-sen University, as well as recognition as an artistic talent by multiple key universities. She performed in the dance work “The Erguna River,” which won Second Prize in the National College Students’ Art Exhibition (Dance Performance Category).
                 During her studies at Purdue University, she served as President of the Chinese Students Association and worked as Director of the Northwest Indiana Chinese New Year Gala. She was invited twice to perform at Purdue University’s International Cultural Festival, presenting the Chinese dance solo “Night Mooring at Qinhuai.” She also participated in cultural exchange performances at local middle school family open houses and performed in the opening dance “An Ever-Rising Sun Over the Grasslands” at the Greater Chicago Chinese National Day Gala. In addition, she competed in the 2025 Miss Chinatown Chicago Pageant, performing the Chinese dance “Colorful Clouds of the South” in the final round.
                 The instructor possesses a strong technical foundation, excellent body control and musicality, as well as outstanding stage presence and expressive ability. In teaching, she emphasizes a balanced integration of technical precision and emotional expression, adopts a progressive and individualized approach, and is committed to helping students enhance their performance quality while developing confidence, elegance, and comprehensive artistic literacy. `.trim(),
                color: 'var(--sandstone)',
                img: '/images/instructor-fengyuan.jpg'
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
                 img: '/images/instructor-ziyu.jpg'
               }
            ].map((instructor) => (
              <div key={instructor.id} className="group rounded-[3rem] overflow-hidden bg-white shadow-xl border border-[var(--lapis-blue)]/5 flex flex-col">
                 <div className="overflow-hidden relative">
                   <img
                    src={instructor.img}
                    onError={(event) => {
                      if (event.currentTarget.src.endsWith(fallbackInstructorImage)) {
                        return;
                      }
                      event.currentTarget.src = fallbackInstructorImage;
                    }}
                     className="w-full h-auto object-contain object-top transition-transform duration-[1200ms] group-hover:scale-105"
                    alt={instructor.name}
                  />
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
 
       {/* Awards Section */}
      <Section id="awards" className="bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.6em] opacity-40 font-bold text-[var(--sandstone)] flex items-center gap-3">
              <Award size={16} /> {lang === 'cn' ? '获奖荣誉' : 'Award-Winning'}
            </h4>
            <h2 className="text-5xl md:text-6xl font-serif text-[var(--sandstone)]">
              {lang === 'cn' ? '国际赛事加冕' : 'Celebrated on Global Stages'}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: lang === 'cn' ? '中国舞荷花奖' : 'China Lotus Award',
                  detail: lang === 'cn' ? '国家级舞蹈最高荣誉' : 'National top honor for Chinese dance.',
                  student: lang === 'cn' ? '学生：林语彤' : 'Student: Linton',
                  dance: lang === 'cn' ? '舞目：莲影' : 'Dance: Lotus Echo',
                  awardName: lang === 'cn' ? '奖项：金奖' : 'Award: Gold Prize',
                  image: '/images/award-1.jpg',
                },
                {
                  title: lang === 'cn' ? '北京学生艺术节' : 'Beijing Student Arts Festival',
                  detail: lang === 'cn' ? '四项金奖与最佳表演' : 'Four Gold Awards and Best Performance.',
                  student: lang === 'cn' ? '学生：陈若溪' : 'Student: Roxy',
                  dance: lang === 'cn' ? '舞目：踏歌行' : 'Dance: Steps in Song',
                  awardName: lang === 'cn' ? '奖项：最佳表演' : 'Award: Best Performance',
                  image: '/images/award-2.jpg',
                },
                {
                  title: lang === 'cn' ? '国际舞蹈大赛' : 'International Dance Competition',
                  detail: lang === 'cn' ? '西班牙卡塔罗尼亚赛区冠军' : 'Top honors in Catalonia, Spain.',
                  student: lang === 'cn' ? '学生：郭伊凡' : 'Student: Evan',
                  dance: lang === 'cn' ? '舞目：风起' : 'Dance: Rising Wind',
                  awardName: lang === 'cn' ? '奖项：冠军' : 'Award: Champion',
                  image: '/images/award-3.jpg',
                },
                {
                  title: lang === 'cn' ? '央视全国舞蹈大赛' : 'CCTV National Dance Competition',
                  detail: lang === 'cn' ? '最佳作品奖与人气奖' : 'Best Work and Audience Choice.',
                  student: lang === 'cn' ? '学生：苏安宁' : 'Student: Annie',
                  dance: lang === 'cn' ? '舞目：长歌行' : 'Dance: Ballad of Light',
                  awardName: lang === 'cn' ? '奖项：最佳作品' : 'Award: Best Work',
                  image: '/images/award-4.jpg',
                },
              ].map((award, index) => (
                <div
                  key={award.title}
                  className="flex flex-col gap-6 rounded-[2rem] border border-[var(--sandstone)]/15 bg-white/80 px-6 py-5 shadow-sm transition hover:-translate-y-1 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[var(--sandstone)]">
                      <span className="text-xs uppercase tracking-[0.4em] font-semibold opacity-50">
                        {lang === 'cn' ? '荣誉' : 'Honor'} {String(index + 1).padStart(2, '0')}
                      </span>
                      <Award size={16} className="opacity-60" />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif text-[var(--sandstone)]">{award.title}</h3>
                      <p className="mt-2 text-sm opacity-60 leading-relaxed">{award.detail}</p>
                    </div>
                    <div className="space-y-1 text-sm font-light text-[var(--sandstone)]/70">
                      <p>{award.student}</p>
                      <p>{award.dance}</p>
                      <p>{award.awardName}</p>
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-[1.5rem] bg-[var(--parchment)] sm:w-44 sm:flex-shrink-0">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="h-40 w-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            
            {studentStories.map((story, i) => (
              <div key={i} className="flex flex-col gap-12 group">
                 <div className="relative h-[26rem] md:h-[30rem]">
                  <div className="absolute inset-0 rounded-[4.5rem] border-2 border-[var(--sandstone)]/10 -rotate-3 group-hover:rotate-0 transition-transform duration-1000 shadow-sm"></div>
                 <img
                    src={story.img}
                    className="w-full h-full object-cover rounded-[4.5rem] shadow-2xl group-hover:scale-[0.98] transition-transform duration-1000"
                    alt={story.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Heart size={32} style={{ color: story.color }} fill={story.color} opacity={0.2} />
                  </div>
                </div>
                <div className="space-y-8 px-6">
                  <h3 className="text-4xl font-serif" style={{ color: story.color }}>{story.name} <span className="text-lg font-light opacity-30 italic">/ {story.age} Yrs</span></h3>
                  <p className="text-xl opacity-60 leading-relaxed font-light italic whitespace-pre-line">
                    "{story.quote[lang]}"
                  </p>
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
          <div className="text-center mb-24 space-y-8">
            <h4 className="text-[11px] uppercase tracking-[0.6em] opacity-40 font-bold text-[var(--lapis-blue)]">{lang === 'cn' ? '艺文动态' : 'Academy Events'}</h4>
            <h2 className="text-5xl md:text-6xl font-serif text-[var(--lapis-blue)]">{translations.nav.events[lang]}</h2>
            <p className="text-base opacity-50 font-light italic text-[var(--lapis-blue)]">
              {lang === 'cn' ? '过去与未来的舞台记忆与旅程' : 'Past highlights and future journeys, gathered in one timeline.'}
            </p>
          </div>
         
          <div className="space-y-28">
            <div className="rounded-[3.5rem] bg-white shadow-xl border border-[var(--lapis-blue)]/10 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 lg:p-16 space-y-6">
                  <div className="flex items-center gap-3 text-[var(--mineral-red)]">
                    <Calendar size={18} />
                    <span className="text-sm uppercase tracking-[0.4em] font-semibold opacity-60">{lang === 'cn' ? '往期回顾' : 'Past Event'}</span>
                   </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-[var(--mineral-red)]">
                    {lang === 'cn' ? '2025 年度公演' : '2025 Annual Gala'}
                  </h3>
                  <p className="text-base opacity-60 font-light leading-loose">
                    {lang === 'cn'
                      ? '用一场沉浸式公演将敦煌壁画的韵律与当代舞台语言交织，让观众在光影中感受千年回响。'
                      : 'An immersive production weaving Dunhuang mural rhythms with modern stage language, inviting the audience into a millennium of echoes.'}
                  </p>
                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="nav-link py-4 px-10 font-bold text-xs"
                    style={{ backgroundColor: 'var(--mineral-red)', color: 'white' }}
                  >
                    {lang === 'cn' ? '查看相册' : 'View Gallery'}
                  </button>
                </div>
                <div className="aspect-[4/3]">
                  <img
                    src="/images/instructor-dan.jpg"
                    alt={lang === 'cn' ? '年度公演：敦煌之梦' : 'Annual Gala: Dunhuang Dream'}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                  </div>
            </div>

            <div className="rounded-[3.5rem] bg-white shadow-xl border border-[var(--lapis-blue)]/10 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-12 lg:p-16 space-y-8">
                  <div className="flex items-center gap-3 text-[var(--lapis-blue)]">
                    <Calendar size={18} />
                    <span className="text-sm uppercase tracking-[0.4em] font-semibold opacity-60">{lang === 'cn' ? '即将到来' : 'Upcoming Event'}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif text-[var(--lapis-blue)]">
                    {lang === 'cn' ? '春季大师集训营' : 'Spring Master Class'}
                  </h3>
                  <div className="space-y-3 text-sm uppercase tracking-[0.3em] opacity-50">
                    <p>{lang === 'cn' ? '2025.03 · Chicago Dance Hall' : 'Mar 2025 · Chicago Dance Hall'}</p>
                    <p>{lang === 'cn' ? '时间：周六 10:00-16:00' : 'Time: Saturday 10:00-16:00'}</p>
                  </div>
                  <p className="text-base opacity-60 font-light leading-loose">
                    {lang === 'cn'
                      ? '特邀业内名师亲临指导，聚焦舞台表现力与身体表达的进阶突破。'
                      : 'Guest masters lead an intensive day focused on stage presence and expressive breakthroughs.'}
                  </p>
                  <div className="pt-4">
                    <button onClick={() => scrollToSection('contact')} className="nav-link py-4 px-10 font-bold text-xs" style={{ backgroundColor: 'var(--lapis-blue)', color: 'white' }}>
                      {lang === 'cn' ? '联系报名' : 'Contact Us'}
                    </button>
                  </div>
                </div>
                <div className="aspect-[4/3]">
                  <img src="/images/instructor-angel.jpg" className="h-full w-full object-cover" alt={lang === 'cn' ? '春季大师集训营' : 'Spring Master Class'} />
                </div>
              </div>
             </div>
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
                   <p className="text-lg font-medium">1557 W 33rd Street, Chicago, 60608</p>
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
                    <img
                      src="/images/contact-wechat.jpg"
                      alt="WeChat QR code"
                      className="w-full h-full object-contain"
                    />
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
