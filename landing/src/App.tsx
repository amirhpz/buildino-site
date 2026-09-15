import { useEffect, useRef, useState, type ReactNode } from 'react'

type IconName = 'arrow' | 'building' | 'wallet' | 'activity' | 'layers' | 'moon' | 'sun' | 'menu' | 'close' | 'check' | 'chevron' | 'sparkle' | 'unit' | 'eye'

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    building: <><path d="M4 21V5l8-3 8 3v16"/><path d="M9 21v-4h6v4M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01"/></>,
    wallet: <><path d="M4 6h14a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12"/><path d="M16 11h6v4h-6a2 2 0 0 1 0-4Z"/></>,
    activity: <><path d="M3 12h4l2.5-7 5 14 2.5-7h4"/></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>,
    moon: <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    sparkle: <><path d="m12 3-1.2 3.8a6 6 0 0 1-4 4L3 12l3.8 1.2a6 6 0 0 1 4 4L12 21l1.2-3.8a6 6 0 0 1 4-4L21 12l-3.8-1.2a6 6 0 0 1-4-4L12 3Z"/></>,
    unit: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 21v-7h8v7M8 8h.01M12 8h.01M16 8h.01"/></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
  }
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>
}

function Logo() {
  return <a className="logo" href="#top" aria-label="بیلدینو، صفحه نخست">
    <span className="logo-mark" aria-hidden="true"><i/><i/><i/></span>
    <span>بیلدینو</span>
  </a>
}

const navItems = [
  ['overview', 'چرا بیلدینو'],
  ['capabilities', 'قابلیت‌ها'],
  ['showcase', 'نمای محصول'],
  ['how', 'نحوه کار'],
  ['faq', 'پرسش‌ها'],
]

function Header({ theme, onTheme }: { theme: string; onTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id)
    }), { rootMargin: '-25% 0px -65%' })
    navItems.forEach(([id]) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="nav-shell">
      <Logo />
      <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="ناوبری اصلی">
        {navItems.map(([id, label]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-button theme-toggle" onClick={onTheme} aria-label={theme === 'dark' ? 'فعال‌کردن پوسته روشن' : 'فعال‌کردن پوسته تیره'}>
          <span className="theme-icons"><Icon name="sun"/><Icon name="moon"/></span>
        </button>
        <a className="button button-small nav-cta" href="#showcase">مشاهده محصول</a>
        <button className="icon-button menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'بستن فهرست' : 'باز کردن فهرست'}><Icon name={open ? 'close' : 'menu'}/></button>
      </div>
    </div>
  </header>
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { element.classList.add('is-visible'); observer.disconnect() }
    }, { threshold: .12 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` } as React.CSSProperties}>{children}</div>
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow"><Icon name="sparkle" size={16}/><span>{children}</span></div>
}

function HeroVisual() {
  const visual = useRef<HTMLDivElement>(null)
  const onMove = (event: React.PointerEvent) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const box = visual.current?.getBoundingClientRect(); if (!box) return
    const x = (event.clientX - box.left) / box.width - .5
    const y = (event.clientY - box.top) / box.height - .5
    visual.current?.style.setProperty('--rx', `${-y * 5}deg`)
    visual.current?.style.setProperty('--ry', `${x * 7}deg`)
  }
  return <div className="hero-visual" ref={visual} onPointerMove={onMove} onPointerLeave={() => { visual.current?.style.setProperty('--rx', '0deg'); visual.current?.style.setProperty('--ry', '0deg') }} aria-label="نمای مفهومی اپلیکیشن بیلدینو">
    <div className="ecosystem-lines" aria-hidden="true"><i/><i/><i/><span/><span/><span/></div>
    <div className="architecture" aria-hidden="true">
      <div className="tower tower-a"><i/><i/><i/><i/></div>
      <div className="tower tower-b"><i/><i/><i/></div>
      <div className="tower tower-c"><i/><i/><i/><i/><i/></div>
      <div className="platform"/>
    </div>
    <div className="phone-shell">
      <div className="phone-top"><span/><i/></div>
      <div className="phone-content">
        <div className="app-head"><div><small>سلام، خوش آمدید</small><strong>خانه من</strong></div><span className="avatar">ب</span></div>
        <div className="context-card">
          <div className="context-icon"><Icon name="building" size={19}/></div>
          <div><small>فضای فعال</small><b>ساختمان سرو · واحد شما</b></div>
          <Icon name="chevron" size={18}/>
        </div>
        <div className="balance-card">
          <div className="balance-head"><span>نمای کلی مالی</span><small>نمونه نمایشی</small></div>
          <strong>وضعیت در یک نگاه</strong>
          <div className="status-pill"><i/> اطلاعات به‌روز</div>
          <div className="balance-art"><i/><i/><i/><i/><i/></div>
        </div>
        <div className="activity-head"><b>آخرین فعالیت‌ها</b><span>مشاهده همه</span></div>
        <div className="activity-row"><span className="mini-icon"><Icon name="wallet" size={16}/></span><div><b>رویداد مالی</b><small>وضعیت قابل پیگیری</small></div><time>امروز</time></div>
        <div className="activity-row faded"><span className="mini-icon"><Icon name="activity" size={16}/></span><div><b>به‌روزرسانی فعالیت</b><small>در زمینه همین واحد</small></div><time>اخیراً</time></div>
      </div>
    </div>
    <div className="floating-chip chip-context"><span><Icon name="layers" size={17}/></span><div><small>تغییر زمینه</small><b>سریع و روشن</b></div></div>
    <div className="floating-chip chip-status"><i/><div><small>وضعیت</small><b>قابل مشاهده</b></div></div>
  </div>
}

function SectionHead({ eyebrow, title, text, center = false }: { eyebrow: string; title: ReactNode; text: string; center?: boolean }) {
  return <Reveal className={`section-head ${center ? 'center' : ''}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p></Reveal>
}

function App() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light')
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    document.documentElement.style.colorScheme = next
    localStorage.setItem('buildino-theme', next)
    setTheme(next)
  }

  return <>
    <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
    <Header theme={theme} onTheme={toggleTheme}/>
    <main id="main">
      <section className="hero" id="top">
        <div className="hero-grid container">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-dot"/>تجربه یکپارچه زندگی در ساختمان</div>
            <h1>خانه‌ات را<br/><span>روشن‌تر</span> ببین.</h1>
            <p>بیلدینو اطلاعات اقامت، وضعیت مالی و فعالیت‌های مرتبط با ساختمان و واحد شما را در یک تجربه فارسی، آرام و منسجم کنار هم می‌آورد.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#showcase">دیدن تجربه بیلدینو <Icon name="arrow" size={19}/></a>
              <a className="button button-ghost" href="#capabilities">کشف قابلیت‌ها</a>
            </div>
            <div className="hero-notes">
              <span><Icon name="check" size={16}/>طراحی‌شده برای فارسی</span>
              <span><Icon name="check" size={16}/>روشن و تیره</span>
              <span><Icon name="check" size={16}/>متمرکز بر تجربه ساکن</span>
            </div>
          </div>
          <HeroVisual/>
        </div>
        <div className="scroll-cue"><span>برای کشف بیشتر</span><i/></div>
      </section>

      <section className="overview section" id="overview">
        <div className="container">
          <SectionHead eyebrow="چرا بیلدینو" title={<>از اطلاعات پراکنده، به یک <em>تصویر روشن</em></>} text="وقتی هر داده در جای خودش و هر تجربه در زمینه درست نمایش داده شود، پیگیری امور ساختمان ساده‌تر و قابل‌فهم‌تر می‌شود."/>
          <div className="overview-grid">
            <Reveal className="overview-story">
              <div className="story-number">۰۱</div>
              <h3>هر خانه، زمینه خودش را دارد</h3>
              <p>بیلدینو ساختمان و واحد را به‌عنوان زمینه تجربه حفظ می‌کند؛ پس اطلاعات مرتبط، بدون آشفتگی و در جای درست دیده می‌شوند.</p>
              <div className="context-stack" aria-hidden="true">
                <span><i>الف</i>ساختمان سرو<small>فعال</small></span>
                <span><i>ب</i>واحد شما<small>خانه</small></span>
                <span><i>پ</i>زمینه دیگر<small>قابل انتخاب</small></span>
              </div>
            </Reveal>
            <div className="overview-points">
              <Reveal className="overview-point" delay={80}><span><Icon name="layers"/></span><div><b>یک تجربه، چند زمینه</b><p>میان زمینه‌های اقامتی جابه‌جا شوید و همیشه بدانید اطلاعات مربوط به کدام ساختمان و واحد است.</p></div></Reveal>
              <Reveal className="overview-point" delay={140}><span><Icon name="eye"/></span><div><b>وضعیت‌ها بدون ابهام</b><p>اطلاعات مالی و وضعیت‌های مرتبط در نمایی خوانا و قابل پیگیری ارائه می‌شوند.</p></div></Reveal>
              <Reveal className="overview-point" delay={200}><span><Icon name="activity"/></span><div><b>رد روشن فعالیت‌ها</b><p>رویدادها و تراکنش‌های اخیر، در امتداد همان زمینه‌ای که انتخاب کرده‌اید نمایش داده می‌شوند.</p></div></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities section" id="capabilities">
        <div className="container">
          <SectionHead center eyebrow="قابلیت‌های محصول" title={<>همه‌چیز به اندازه نیاز،<br/><em>دقیق و در دسترس</em></>} text="معماری قابلیت‌های فعلی بیلدینو حول تجربه ساکن شکل گرفته است؛ چهار بخش منسجم که اطلاعات روزمره را به یک روایت قابل فهم تبدیل می‌کنند."/>
          <div className="bento-grid">
            <Reveal className="bento bento-context">
              <div className="bento-copy"><span className="bento-icon"><Icon name="building"/></span><small>زمینه اقامت</small><h3>ساختمان و واحد، همیشه مشخص</h3><p>اطلاعات در زمینه ساختمان و واحد مرتبط نمایش داده می‌شود تا ساکن در هر لحظه بداند کجاست و چه چیزی را می‌بیند.</p><ul><li>نمای ساختمان و واحد</li><li>حفظ زمینه فعال</li><li>اطلاعات مرتبط با اقامت</li></ul></div>
              <div className="building-model" aria-hidden="true"><div className="model-top"/><div className="model-side"/><div className="model-face">{Array.from({length: 9}).map((_,i)=><i key={i} className={i===4?'active':''}/>)}</div><span className="model-pin"><i/> واحد فعال</span></div>
            </Reveal>
            <Reveal className="bento bento-switch" delay={70}>
              <span className="bento-icon"><Icon name="layers"/></span><small>تغییر زمینه ساکن</small><h3>جابه‌جایی، بدون گم‌کردن مسیر</h3><p>اگر بیش از یک زمینه اقامتی دارید، انتخاب میان آن‌ها روشن و سریع باقی می‌ماند.</p>
              <div className="switcher-demo"><div className="switch-track"><span className="switch-item active"><i>س</i><b>ساختمان سرو</b><small>زمینه فعال</small></span><span className="switch-item"><i>ن</i><b>زمینه دوم</b><small>انتخاب کنید</small></span></div><div className="swipe-hint"><Icon name="arrow" size={16}/> جابه‌جایی میان زمینه‌ها</div></div>
            </Reveal>
            <Reveal className="bento bento-finance" delay={100}>
              <div className="bento-copy"><span className="bento-icon"><Icon name="wallet"/></span><small>شفافیت مالی</small><h3>وضعیت مالی، در یک نگاه</h3><p>به‌جای پراکندگی، اطلاعات و وضعیت مالی مرتبط با زمینه انتخاب‌شده در سطحی خوانا کنار هم قرار می‌گیرند.</p><ul><li>نمای خلاصه مالی</li><li>وضعیت‌های قابل تشخیص</li><li>اتصال به سابقه مرتبط</li></ul></div>
              <div className="finance-viz" aria-label="نمودار مفهومی و بدون داده واقعی"><div className="donut"><span><b>نمای</b><small>وضعیت</small></span></div><div className="legend"><span><i/>وضعیت جاری</span><span><i/>سابقه</span><small>داده‌های این نما صرفاً نمایشی‌اند</small></div></div>
            </Reveal>
            <Reveal className="bento bento-activity" delay={140}>
              <span className="bento-icon"><Icon name="activity"/></span><small>فعالیت و تراکنش</small><h3>اتفاق‌ها، در یک مسیر روشن</h3><p>فعالیت‌ها و تراکنش‌های مرتبط به‌شکل منظم ارائه می‌شوند تا مرور گذشته و درک وضعیت فعلی ساده باشد.</p>
              <div className="mini-timeline"><span><i/><b>امروز</b><small>آخرین فعالیت ثبت‌شده</small></span><span><i/><b>پیش‌تر</b><small>تغییر وضعیت مرتبط</small></span><span><i/><b>سابقه</b><small>رویداد مالی نمونه</small></span></div>
            </Reveal>
            <Reveal className="bento bento-experience" delay={180}>
              <div><span className="bento-icon"><Icon name="sparkle"/></span><small>تجربه بومی</small><h3>فارسی از ابتدا؛ نه در انتها</h3><p>چیدمان راست‌به‌چپ، زبان طبیعی و حالت‌های روشن و تیره، بخشی از ذات تجربه بیلدینو هستند.</p></div>
              <div className="theme-orbits" aria-hidden="true"><span className="orbit-light"><Icon name="sun"/></span><i/><span className="orbit-dark"><Icon name="moon"/></span></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="showcase section" id="showcase">
        <div className="showcase-glow"/>
        <div className="container showcase-grid">
          <SectionHead eyebrow="درون بیلدینو" title={<>اطلاعات وقتی ارزشمند است<br/>که <em>درست روایت شود</em></>} text="نمای محصول زیر یک بازسازی مفهومی از قابلیت‌های تأییدشده است؛ بدون عدد تجاری یا داده واقعی."/>
          <Reveal className="dashboard-wrap">
            <div className="dash-window">
              <div className="dash-sidebar"><Logo/><nav aria-label="منوی نمایشی محصول"><span className="active"><Icon name="unit" size={18}/>خانه من</span><span><Icon name="wallet" size={18}/>وضعیت مالی</span><span><Icon name="activity" size={18}/>فعالیت‌ها</span></nav><div className="side-profile"><i>م</i><div><b>ساکن نمونه</b><small>زمینه فعال</small></div></div></div>
              <div className="dash-main">
                <div className="dash-top"><div><small>نمای ساکن</small><h3>خانه من</h3></div><button type="button"><Icon name="building" size={18}/><span>ساختمان سرو · واحد شما</span><Icon name="chevron" size={16}/></button></div>
                <div className="dash-cards"><div className="dash-card hero-card"><small>نمای کلی</small><h4>اطلاعات مرتبط با خانه شما</h4><p>وضعیت‌ها و فعالیت‌ها در زمینه انتخاب‌شده</p><span><i/>به‌روز</span><div className="card-wave"/></div><div className="dash-card status-card"><small>وضعیت مالی</small><div className="status-ring"><span>نمایش<br/>وضعیت</span></div><b>خلاصه‌ای قابل فهم</b></div></div>
                <div className="dash-activity"><div><h4>فعالیت‌های اخیر</h4><span>مرور سابقه</span></div><ul><li><i><Icon name="wallet" size={17}/></i><span><b>رویداد مالی نمونه</b><small>مرتبط با واحد انتخاب‌شده</small></span><em>امروز</em></li><li><i><Icon name="activity" size={17}/></i><span><b>تغییر وضعیت نمونه</b><small>نمایش منظم در سابقه فعالیت</small></span><em>اخیراً</em></li><li><i><Icon name="layers" size={17}/></i><span><b>زمینه اقامت</b><small>ساختمان و واحد فعال</small></span><em>فعال</em></li></ul></div>
              </div>
            </div>
            <div className="concept-label"><Icon name="sparkle" size={15}/>بازسازی مفهومی رابط محصول</div>
          </Reveal>
        </div>
      </section>

      <section className="benefits section">
        <div className="container">
          <SectionHead center eyebrow="نتیجه یک تجربه منسجم" title={<>کمتر دنبال اطلاعات بگردید؛<br/><em>بیشتر در جریان باشید</em></>} text="وقتی زمینه، وضعیت و سابقه کنار یکدیگر قرار می‌گیرند، تجربه روزمره آرام‌تر و تصمیم‌ها آگاهانه‌تر می‌شوند."/>
          <div className="benefit-grid">
            <Reveal className="benefit"><span>۱</span><h3>تمرکز بیشتر</h3><p>اطلاعات اصلی اقامت و وضعیت‌ها در یک فضای مشترک دیده می‌شوند.</p></Reveal>
            <Reveal className="benefit" delay={70}><span>۲</span><h3>ابهام کمتر</h3><p>زمینه ساختمان و واحد همیشه مشخص است و هر داده جای روشنی دارد.</p></Reveal>
            <Reveal className="benefit" delay={140}><span>۳</span><h3>پیگیری ساده‌تر</h3><p>سابقه فعالیت و تراکنش، مسیر اتفاق‌ها را قابل مرور نگه می‌دارد.</p></Reveal>
            <Reveal className="benefit" delay={210}><span>۴</span><h3>تجربه آشناتر</h3><p>رابط فارسی و راست‌به‌چپ، استفاده روزمره را طبیعی‌تر می‌کند.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="how section" id="how">
        <div className="container how-grid">
          <SectionHead eyebrow="مسیر استفاده" title={<>از ورود تا دیدن وضعیت،<br/><em>چهار قدم روشن</em></>} text="بیلدینو پیچیدگی زمینه‌های اقامتی را پشت یک مسیر ساده و قابل‌پیش‌بینی نگه می‌دارد."/>
          <div className="steps">
            {[
              ['۰۱','ورود به تجربه ساکن','فضای فارسی و آشنای بیلدینو نقطه شروع شماست.'],
              ['۰۲','انتخاب زمینه اقامت','ساختمان و واحد مرتبط را به‌عنوان زمینه فعال انتخاب می‌کنید.'],
              ['۰۳','دیدن وضعیت مرتبط','نمای مالی و وضعیت‌های همان زمینه را یکجا می‌بینید.'],
              ['۰۴','مرور فعالیت‌ها','رویدادها و تراکنش‌های مرتبط را در یک سابقه منظم دنبال می‌کنید.'],
            ].map(([n,t,d],i)=><Reveal className="step" delay={i*60} key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><i className="step-dot"/></Reveal>)}
          </div>
        </div>
      </section>

      <section className="quality section">
        <div className="container quality-shell">
          <Reveal className="quality-copy"><Eyebrow>کیفیت در جزئیات</Eyebrow><h2>ساخته‌شده برای<br/><em>وضوح و آرامش</em></h2><p>اعتماد از وعده‌های بزرگ نمی‌آید؛ از تجربه‌ای می‌آید که در هر بار استفاده، منظم، خوانا و قابل‌پیش‌بینی باقی بماند.</p></Reveal>
          <div className="quality-list">
            <Reveal className="quality-item" delay={60}><Icon name="unit"/><div><b>زمینه ساختاریافته</b><small>تفکیک روشن ساختمان و واحد</small></div></Reveal>
            <Reveal className="quality-item" delay={110}><Icon name="eye"/><div><b>خوانایی وضعیت</b><small>نشانه‌های واضح و قابل تشخیص</small></div></Reveal>
            <Reveal className="quality-item" delay={160}><Icon name="sparkle"/><div><b>فارسی و راست‌به‌چپ</b><small>تجربه بومی از پایه</small></div></Reveal>
            <Reveal className="quality-item" delay={210}><Icon name="moon"/><div><b>روشن و تیره</b><small>هماهنگ با ترجیح کاربر</small></div></Reveal>
          </div>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="container faq-grid">
          <SectionHead eyebrow="پرسش‌های رایج" title={<>سؤال کوتاه،<br/><em>پاسخ روشن</em></>} text="چند نکته درباره تجربه فعلی بیلدینو و نحوه نمایش اطلاعات."/>
          <div className="accordion">
            {[
              ['بیلدینو برای چه کسی طراحی شده است؟','تجربه فعلی بیلدینو ساکن‌محور است و اطلاعات مرتبط با اقامت، ساختمان و واحد را در یک رابط فارسی کنار هم قرار می‌دهد.'],
              ['اگر به بیش از یک واحد یا زمینه اقامتی دسترسی داشته باشم چه می‌شود؟','می‌توانید میان زمینه‌های در دسترس جابه‌جا شوید. زمینه فعال به‌روشنی نمایش داده می‌شود تا اطلاعات واحدها با هم اشتباه نشوند.'],
              ['چه اطلاعات مالی در بیلدینو دیده می‌شود؟','بیلدینو برای ارائه نمای مالی و وضعیت‌های مرتبط با زمینه انتخاب‌شده طراحی شده است و سابقه تراکنش‌ها را نیز در امتداد فعالیت‌ها نمایش می‌دهد. جزئیات قابل مشاهده به داده‌های همان زمینه بستگی دارد.'],
              ['آیا رابط بیلدینو کاملاً فارسی است؟','بله؛ زبان، جهت چیدمان و الگوی خواندن از ابتدا برای تجربه فارسی و راست‌به‌چپ در نظر گرفته شده‌اند.'],
              ['حالت روشن و تیره چگونه انتخاب می‌شود؟','بیلدینو می‌تواند با ترجیح ظاهری کاربر هماهنگ شود و تجربه‌ای خوانا در هر دو حالت روشن و تیره ارائه دهد.'],
            ].map(([q,a],i)=><details key={q} open={i===0}><summary><span>{q}</span><i><Icon name="chevron" size={19}/></i></summary><div className="answer"><p>{a}</p></div></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta section">
        <div className="container">
          <Reveal className="cta-shell">
            <div className="cta-architecture" aria-hidden="true"><i/><i/><i/><span/></div>
            <div className="cta-copy"><Eyebrow>یک خانه، یک تصویر روشن</Eyebrow><h2>برای تجربه‌ای منسجم‌تر<br/>در ساختمان آماده‌اید؟</h2><p>با فضای ساکن بیلدینو آشنا شوید و ببینید اطلاعات روزمره چطور می‌تواند ساده‌تر روایت شود.</p><div><a href="#showcase" className="button button-light">مشاهده نمای محصول <Icon name="arrow" size={19}/></a><a href="#capabilities" className="cta-link">مرور قابلیت‌ها</a></div></div>
          </Reveal>
        </div>
      </section>
    </main>
    <footer>
      <div className="container footer-top"><div><Logo/><p>تجربه‌ای یکپارچه برای دیدن اطلاعات اقامت، وضعیت مالی و فعالیت‌های ساختمان.</p></div><nav aria-label="پیوندهای پایین صفحه">{navItems.slice(0,4).map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</nav><button className="footer-theme" onClick={toggleTheme}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18}/>{theme === 'dark' ? 'حالت روشن' : 'حالت تیره'}</button></div>
      <div className="container footer-bottom"><span>© {new Intl.NumberFormat('fa-IR', {useGrouping:false}).format(new Date().getFullYear())} بیلدینو</span><span>طراحی‌شده برای تجربه فارسی</span></div>
    </footer>
  </>
}

export default App
