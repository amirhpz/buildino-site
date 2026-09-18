import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'

type IconName = 'arrow' | 'building' | 'wallet' | 'activity' | 'layers' | 'moon' | 'sun' | 'menu' | 'close' | 'check' | 'chevron' | 'unit' | 'eye' | 'tool' | 'calendar' | 'bell'

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
    unit: <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 21v-7h8v7M8 8h.01M12 8h.01M16 8h.01"/></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/></>,
    tool: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l-8.8 8.8a2.1 2.1 0 0 0 3 3l8.8-8.8a4 4 0 0 0 5-5L17 10l-3-3 2.7-2.7Z"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
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
  ['overview', 'چرا بیلدینو؟'],
  ['capabilities', 'امکانات'],
  ['services', 'خدمات'],
  ['showcase', 'داخل محصول'],
  ['how', 'چطور کار می‌کند؟'],
  ['faq', 'سؤال‌های رایج'],
]

function Header({ theme, onTheme }: { theme: string; onTheme: (event: ReactMouseEvent<HTMLButtonElement>) => void }) {
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
        <button className="icon-button theme-toggle" onClick={onTheme} aria-label={theme === 'dark' ? 'استفاده از حالت روشن' : 'استفاده از حالت تیره'}>
          <span className="theme-icons"><Icon name="sun"/><Icon name="moon"/></span>
        </button>
        <a className="button button-small nav-cta" href="#showcase">محصول را ببینید</a>
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
  return <div className="eyebrow"><i className="eyebrow-mark" aria-hidden="true"/><span>{children}</span></div>
}

function LiquidCursor() {
  const cursor = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const element = cursor.current
    if (!element) return

    let targetX = -80
    let targetY = -80
    let currentX = targetX
    let currentY = targetY
    let frame = 0

    const render = () => {
      currentX += (targetX - currentX) * .24
      currentY += (targetY - currentY) * .24
      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`
      frame = requestAnimationFrame(render)
    }
    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      element.classList.add('is-visible')
    }
    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null
      element.classList.toggle('is-active', Boolean(target?.closest('a, button, summary, input, select, textarea, [role="button"]')))
    }
    const onLeave = () => element.classList.remove('is-visible')

    document.documentElement.classList.add('has-liquid-cursor')
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(render)

    return () => {
      document.documentElement.classList.remove('has-liquid-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={cursor} className="liquid-cursor" aria-hidden="true"><i/></div>
}

function SectionHead({ eyebrow, title, text, center = false }: { eyebrow: string; title: ReactNode; text: string; center?: boolean }) {
  return <Reveal className={`section-head ${center ? 'center' : ''}`}><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p></Reveal>
}

function App() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light')
  const toggleTheme = (event: ReactMouseEvent<HTMLButtonElement>) => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const root = document.documentElement
    const applyTheme = () => {
      root.dataset.theme = next
      root.style.colorScheme = next
      localStorage.setItem('buildino-theme', next)
      setTheme(next)
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const transitionDocument = document as Document & {
      startViewTransition?: (update: () => void) => { finished: Promise<void> }
    }

    if (!transitionDocument.startViewTransition || reduceMotion) {
      applyTheme()
      return
    }

    const bounds = event.currentTarget.getBoundingClientRect()
    const originX = bounds.left + bounds.width / 2
    const originY = bounds.top + bounds.height / 2
    const farthestX = Math.max(originX, window.innerWidth - originX)
    const farthestY = Math.max(originY, window.innerHeight - originY)
    const radius = Math.ceil(Math.hypot(farthestX, farthestY) * 1.04)

    root.style.setProperty('--theme-origin-x', `${originX}px`)
    root.style.setProperty('--theme-origin-y', `${originY}px`)
    root.style.setProperty('--theme-wipe-radius', `${radius}px`)
    root.classList.add('theme-transitioning')

    const cleanupTransition = () => {
      root.classList.remove('theme-transitioning')
      root.style.removeProperty('--theme-origin-x')
      root.style.removeProperty('--theme-origin-y')
      root.style.removeProperty('--theme-wipe-radius')
    }
    const transition = transitionDocument.startViewTransition(applyTheme)
    transition.finished.finally(cleanupTransition)
    window.setTimeout(cleanupTransition, 900)
  }

  return <>
    <LiquidCursor/>
    <a className="skip-link" href="#main">پرش به محتوای اصلی</a>
    <Header theme={theme} onTheme={toggleTheme}/>
    <main id="main">
      <section className="hero" id="top">
        <div className="hero-grid container">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="live-dot"/>مدیریت روزمره ساختمان، یک‌جا</div>
            <h1>کارهای ساختمان را<br/><span>از گوشی انجام دهید.</span></h1>
            <p>از دیدن شارژ و صورتحساب تا رزرو امکانات، ثبت مهمان، درخواست خدمات و پیگیری پشتیبانی؛ بدون تماس‌های مکرر و مراجعه به مدیریت.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#showcase">محصول را ببینید <Icon name="arrow" size={19}/></a>
              <a className="button button-ghost" href="#capabilities">چه کارهایی می‌کند؟</a>
            </div>
            <div className="hero-notes">
              <span><Icon name="check" size={16}/>برای مالک و ساکن</span>
              <span><Icon name="check" size={16}/>اطلاعات مستقل هر واحد</span>
              <span><Icon name="check" size={16}/>دسترسی متناسب با هر ساختمان</span>
            </div>
          </div>
        </div>
        <div className="scroll-cue"><span>بیشتر ببینید</span><i/></div>
      </section>

      <section className="overview section" id="overview">
        <div className="container">
          <SectionHead eyebrow="چرا بیلدینو؟" title={<>به‌جای تماس، پیام و مراجعه؛<br/><em>یک مسیر مشخص</em></>} text="بخش زیادی از کارهای ساختمان هنوز با تلفن، پیام‌رسان یا مراجعه حضوری انجام می‌شود. بیلدینو این رفت‌وآمدها را در یک اپلیکیشن جمع می‌کند."/>
          <div className="overview-grid">
            <Reveal className="overview-story">
              <div className="story-number">۰۱</div>
              <h3>هر ساختمان و هر واحد، حساب خودش را دارد</h3>
              <p>بعد از ورود، همه واحدهایی را که به‌عنوان مالک یا ساکن به آن‌ها دسترسی دارید می‌بینید و اطلاعات هرکدام را جداگانه مدیریت می‌کنید.</p>
              <div className="context-stack" aria-hidden="true">
                <span><i>س</i>ساختمان سرو<small>انتخاب‌شده</small></span>
                <span><i>۲</i>واحد ۲۱<small>خانه شما</small></span>
                <span><i>ن</i>ساختمان نارون<small>واحد دیگر</small></span>
              </div>
            </Reveal>
            <div className="overview-points">
              <Reveal className="overview-point" delay={80}><span><Icon name="layers"/></span><div><b>یک حساب برای همه واحدها</b><p>اگر در چند ساختمان مالک یا ساکن هستید، بدون خروج از حساب بین آن‌ها جابه‌جا شوید.</p></div></Reveal>
              <Reveal className="overview-point" delay={140}><span><Icon name="eye"/></span><div><b>فقط امکاناتی را ببینید که در دسترس شماست</b><p>بخش‌های اپ براساس نقش شما و امکانات واقعی هر ساختمان نمایش داده می‌شوند.</p></div></Reveal>
              <Reveal className="overview-point" delay={200}><span><Icon name="activity"/></span><div><b>از تغییرات باخبر بمانید</b><p>صدور شارژ، پاسخ پشتیبانی، تغییر رزرو و پیام‌های مدیریت از طریق اعلان‌ها اطلاع‌رسانی می‌شوند.</p></div></Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities section" id="capabilities">
        <div className="container">
          <SectionHead center eyebrow="امکانات بیلدینو" title={<>از شارژ ماهانه تا رزرو سالن؛<br/><em>همه‌چیز در یک اپلیکیشن</em></>} text="امکانات هر کاربر به ساختمان، واحد و سطح دسترسی او بستگی دارد؛ بنابراین هرکس دقیقاً بخش‌هایی را می‌بیند که برای او فعال شده‌اند."/>
          <div className="bento-grid">
            <Reveal className="bento bento-context">
              <div className="bento-copy"><span className="bento-icon"><Icon name="building"/></span><small>خانه‌های من</small><h3>همه واحدها، با دسترسی مخصوص خودشان</h3><p>ساختمان‌ها و واحدهایی را که به‌عنوان مالک یا ساکن با آن‌ها ارتباط دارید ببینید و بدون قاطی‌شدن اطلاعات بینشان جابه‌جا شوید.</p><ul><li>نقش مالک یا ساکن</li><li>اطلاعات مستقل هر واحد</li><li>امکانات متناسب با دسترسی</li></ul></div>
              <div className="building-visual" aria-hidden="true"><img src="/images/buildings.png" alt=""/></div>
            </Reveal>
            <Reveal className="bento bento-finance" delay={100}>
              <div className="bento-copy"><span className="bento-icon"><Icon name="wallet"/></span><small>کیف پول</small><h3>اعتبار و تراکنش‌ها، شفاف و قابل پیگیری</h3><p>اعتبار کیف پول و تاریخچه مالی خود را ببینید و در ادامه از آن برای هزینه‌های ساختمان، خدمات و پرداخت‌های مجاز استفاده کنید.</p><ul><li>موجودی و اعتبار</li><li>تاریخچه تراکنش‌ها</li><li>پرداخت هزینه‌های مجاز</li></ul></div>
              <div className="finance-viz" aria-label="نمای کیف پول"><div className="donut"><span><b>کیف پول</b><small>اعتبار شما</small></span></div><div className="legend"><span><i/>اعتبار فعلی</span><span><i/>تراکنش‌ها</span><small>ورودی و خروجی حساب</small></div></div>
            </Reveal>
            <Reveal className="bento bento-activity" delay={140}>
              <span className="bento-icon"><Icon name="activity"/></span><small>رزرو امکانات مشترک</small><h3>زمان آزاد را ببینید و درخواست رزرو بدهید</h3><p>سالن اجتماعات، باشگاه یا هر فضای قابل رزرو ساختمان را انتخاب کنید، زمان‌های خالی را ببینید و درخواستتان را ثبت کنید.</p>
              <div className="mini-timeline"><span><i/><b>انتخاب فضا</b><small>مثلاً سالن اجتماعات یا باشگاه</small></span><span><i/><b>انتخاب زمان</b><small>بررسی ساعت‌های آزاد</small></span><span><i/><b>ثبت درخواست</b><small>پیگیری نتیجه رزرو</small></span></div>
            </Reveal>
            <Reveal className="bento bento-experience" delay={180}>
              <div><span className="bento-icon"><Icon name="layers"/></span><small>مهمان و ارتباط با مدیریت</small><h3>هماهنگی‌هایی که قبلاً با تماس انجام می‌شد</h3><p>مهمان را برای نگهبانی ثبت کنید، برای مدیریت تیکت بفرستید و پاسخ‌ها، پیام‌ها و تغییر وضعیت درخواست‌ها را از طریق اعلان‌ها دنبال کنید.</p></div>
              <div className="theme-orbits" aria-hidden="true"><span className="orbit-light"><Icon name="unit"/></span><i/><span className="orbit-dark"><Icon name="layers"/></span></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="container">
          <SectionHead eyebrow="خدمات ساختمان" title={<>از خرابی شیر آب تا سرویس دوره‌ای؛<br/><em>درخواست را ثبت کنید و نتیجه را ببینید</em></>} text="برای تعمیرات واحد یا نگهداری ساختمان لازم نیست چند بار با مدیریت تماس بگیرید. نوع خدمت را انتخاب کنید، توضیحات را بنویسید و وضعیت انجام کار را از بیلدینو دنبال کنید."/>
          <div className="services-grid">
            <Reveal className="service-catalog">
              <div className="service-catalog-head"><div><small>دسته‌بندی خدمات</small><h3>خدمت موردنیازتان را انتخاب کنید</h3></div><span><Icon name="tool"/></span></div>
              <div className="service-cards">
                <article className="service-card"><span><Icon name="tool"/></span><div><h4>تعمیرات واحد</h4><p>برق، لوله‌کشی، تجهیزات و خرابی‌های داخل واحد</p></div><Icon name="chevron" size={18}/></article>
                <article className="service-card"><span><Icon name="building"/></span><div><h4>نگهداری ساختمان</h4><p>آسانسور، تأسیسات، موتورخانه و فضاهای مشترک</p></div><Icon name="chevron" size={18}/></article>
                <article className="service-card"><span><Icon name="calendar"/></span><div><h4>سرویس‌های دوره‌ای</h4><p>ثبت و هماهنگی خدماتی که باید در زمان مشخص انجام شوند</p></div><Icon name="chevron" size={18}/></article>
              </div>
              <p className="service-note"><Icon name="check" size={17}/> خدمات قابل انتخاب براساس امکانات و تأمین‌کنندگان موردتأیید هر ساختمان نمایش داده می‌شوند.</p>
            </Reveal>
            <Reveal className="service-request" delay={100}>
              <div className="request-top"><span><Icon name="tool" size={20}/></span><div><small>درخواست خدمات</small><b>بررسی نشتی لوله آشپزخانه</b></div><em>در حال بررسی</em></div>
              <div className="request-context"><span><small>ساختمان</small><b>سرو</b></span><span><small>واحد</small><b>۲۱</b></span><span><small>ثبت درخواست</small><b>امروز، ۱۰:۳۰</b></span></div>
              <div className="request-progress">
                <div className="is-done"><i><Icon name="check" size={15}/></i><span><b>درخواست ثبت شد</b><small>توضیحات برای مدیریت ارسال شد</small></span></div>
                <div className="is-current"><i/><span><b>در حال بررسی</b><small>هماهنگی با سرویس‌کار موردتأیید</small></span></div>
                <div><i/><span><b>تعیین زمان انجام</b><small>زمان مراجعه پس از هماهنگی اعلام می‌شود</small></span></div>
              </div>
              <div className="request-footer"><span><Icon name="bell" size={18}/> تغییر وضعیت این درخواست به شما اعلام می‌شود.</span><button type="button">مشاهده درخواست</button></div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="showcase section" id="showcase">
        <div className="showcase-glow"/>
        <div className="container showcase-grid">
          <SectionHead eyebrow="داخل محصول" title={<><em>خانه من</em>؛ نقطه شروع<br/>همه کارهای واحد</>} text="واحد فعال، شارژهای جدید، کیف پول، درخواست‌ها و اعلان‌های مهم از یک صفحه در دسترس‌اند."/>
          <Reveal className="dashboard-wrap">
            <div className="dash-window">
              <div className="dash-sidebar"><Logo/><nav aria-label="بخش‌های محصول"><span className="active"><Icon name="unit" size={18}/>خانه من</span><span><Icon name="wallet" size={18}/>صورتحساب‌ها</span><span><Icon name="activity" size={18}/>درخواست‌ها</span></nav><div className="side-profile"><i>م</i><div><b>مریم احمدی</b><small>ساکن واحد ۲۱</small></div></div></div>
              <div className="dash-main">
                <div className="dash-top"><div><small>سلام مریم</small><h3>خانه من</h3></div><button type="button"><Icon name="building" size={18}/><span>ساختمان سرو · واحد ۲۱</span><Icon name="chevron" size={16}/></button></div>
                <div className="dash-cards"><div className="dash-card hero-card"><small>صورتحساب جدید</small><h4>شارژ شهریور واحد ۲۱</h4><p>جزئیات مبلغ و تاریخ سررسید را ببینید</p><span><i/>در انتظار پرداخت</span><div className="card-wave"/></div><div className="dash-card status-card"><small>کیف پول</small><div className="status-ring"><span>مشاهده<br/>تراکنش‌ها</span></div><b>اعتبار و سابقه مالی</b></div></div>
                <div className="dash-activity"><div><h4>آخرین اعلان‌ها</h4><span>دیدن همه</span></div><ul><li><i><Icon name="wallet" size={17}/></i><span><b>شارژ جدید صادر شد</b><small>صورتحساب شهریور واحد ۲۱</small></span><em>امروز</em></li><li><i><Icon name="activity" size={17}/></i><span><b>پشتیبانی پاسخ داد</b><small>درخواست بررسی تأسیسات</small></span><em>دیروز</em></li><li><i><Icon name="layers" size={17}/></i><span><b>رزرو شما ثبت شد</b><small>سالن اجتماعات</small></span><em>شنبه</em></li></ul></div>
              </div>
            </div>
            <div className="concept-label"><Icon name="layers" size={15}/>کارهای واحد ۲۱، در یک صفحه</div>
          </Reveal>
        </div>
      </section>

      <section className="benefits section">
        <div className="container">
          <SectionHead center eyebrow="چرا به کارتان می‌آید؟" title={<>کارهای کمتر پشت تلفن؛<br/><em>پیگیری بیشتر دست خودتان</em></>} text="به‌جای منتظرماندن برای پاسخ مدیریت، وضعیت کارها را در اپ می‌بینید و درخواست‌های روزمره را همان‌جا ثبت می‌کنید."/>
          <div className="benefit-grid">
            <Reveal className="benefit"><span>۱</span><h3>مراجعه کمتر</h3><p>صورتحساب، درخواست و پیگیری را بدون مراجعه حضوری به مدیریت انجام دهید.</p></Reveal>
            <Reveal className="benefit" delay={70}><span>۲</span><h3>اطلاعات دقیق هر واحد</h3><p>شارژها، تراکنش‌ها و امکانات هر واحد جدا از بقیه نمایش داده می‌شوند.</p></Reveal>
            <Reveal className="benefit" delay={140}><span>۳</span><h3>درخواست قابل پیگیری</h3><p>از رزرو و خدمات تا تیکت پشتیبانی، وضعیت درخواستتان مشخص می‌ماند.</p></Reveal>
            <Reveal className="benefit" delay={210}><span>۴</span><h3>خبر به‌موقع</h3><p>اتفاق‌های مهم ساختمان و تغییر وضعیت کارها از طریق اعلان به شما می‌رسد.</p></Reveal>
          </div>
        </div>
      </section>

      <section className="how section" id="how">
        <div className="container how-grid">
          <SectionHead eyebrow="چطور کار می‌کند؟" title={<>از ورود تا انجام کار،<br/><em>چهار قدم ساده</em></>} text="بیلدینو واحد، نقش و دسترسی شما را می‌شناسد و فقط امکانات مربوط به همان ساختمان را در اختیارتان می‌گذارد."/>
          <div className="steps">
            {[
              ['۰۱','ثبت‌نام و ورود','واحدها و ساختمان‌هایی که به آن‌ها دسترسی دارید به حساب شما اضافه می‌شوند.'],
              ['۰۲','انتخاب ساختمان و واحد','مشخص کنید می‌خواهید کارهای کدام واحد را به‌عنوان مالک یا ساکن انجام دهید.'],
              ['۰۳','انجام کار موردنظر','صورتحساب را ببینید، رزرو ثبت کنید، مهمان معرفی کنید یا درخواست خدمات بدهید.'],
              ['۰۴','پیگیری نتیجه','وضعیت درخواست‌ها، پاسخ پشتیبانی و اعلان‌های جدید را از داخل اپ دنبال کنید.'],
            ].map(([n,t,d],i)=><Reveal className="step" delay={i*60} key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><i className="step-dot"/></Reveal>)}
          </div>
        </div>
      </section>

      <section className="quality section">
        <div className="container quality-shell">
          <Reveal className="quality-copy"><Eyebrow>شفافیت در هر مرحله</Eyebrow><h2>بدانید چه چیزی ثبت شده<br/>و <em>کار به کجا رسیده است</em></h2><p>از وضعیت پرداخت تا نتیجه رزرو و پاسخ پشتیبانی، اطلاعات باید واضح و قابل پیگیری باشد؛ بدون نیاز به تماس دوباره با مدیریت.</p></Reveal>
          <div className="quality-list">
            <Reveal className="quality-item" delay={60}><Icon name="unit"/><div><b>دسترسی براساس نقش</b><small>امکانات متناسب با مالک، ساکن و واحد</small></div></Reveal>
            <Reveal className="quality-item" delay={110}><Icon name="eye"/><div><b>صورتحساب شفاف</b><small>مبلغ، سررسید و وضعیت پرداخت</small></div></Reveal>
            <Reveal className="quality-item" delay={160}><Icon name="layers"/><div><b>درخواست قابل پیگیری</b><small>وضعیت خدمات، رزرو و پشتیبانی</small></div></Reveal>
            <Reveal className="quality-item" delay={210}><Icon name="activity"/><div><b>اعلان‌های کاربردی</b><small>خبرهای مهم، درست در زمان لازم</small></div></Reveal>
          </div>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="container faq-grid">
          <SectionHead eyebrow="سؤال‌های رایج" title={<>قبل از شروع، احتمالاً<br/><em>این‌ها را می‌خواهید بدانید</em></>} text="جواب کوتاه و دقیق به سؤال‌هایی که معمولاً درباره بیلدینو پرسیده می‌شود."/>
          <div className="accordion">
            {[
              ['چه کسانی می‌توانند از بیلدینو استفاده کنند؟','مالکان و ساکنان مجتمع‌های مسکونی می‌توانند واحدهای مرتبط با خود را ببینند. امکانات هر کاربر براساس نقش، واحد و دسترسی تعریف‌شده برای ساختمان نمایش داده می‌شود.'],
              ['اگر در چند ساختمان یا واحد باشم چه؟','همه واحدهای در دسترس در یک حساب نمایش داده می‌شوند. با انتخاب هر واحد، صورتحساب‌ها، خدمات، رزروها و درخواست‌های مربوط به همان واحد را می‌بینید.'],
              ['آیا می‌توانم شارژ ساختمان را در اپ پرداخت کنم؟','در نسخه کامل، بخش صورتحساب به درگاه پرداخت متصل می‌شود تا شارژ و هزینه‌های مجاز را مستقیم از داخل اپ پرداخت کنید. تا آن زمان، مبلغ، سررسید، جزئیات و وضعیت پرداخت قابل مشاهده خواهد بود.'],
              ['چه کارهایی را می‌توانم بدون تماس با مدیریت انجام دهم؟','ثبت مهمان، درخواست رزرو امکانات مشترک، درخواست خدمات و تعمیرات و ارسال تیکت پشتیبانی از جمله فرایندهایی هستند که در بیلدینو انجام و پیگیری می‌شوند.'],
              ['اعلان‌ها درباره چه چیزهایی هستند؟','شارژ جدید، تغییر وضعیت پرداخت، پاسخ پشتیبانی، تغییر رزرو، پیام مدیریت و دیگر رویدادهای مهم ساختمان از طریق اعلان‌ها اطلاع‌رسانی می‌شوند.'],
            ].map(([q,a],i)=><details key={q} open={i===0}><summary><span>{q}</span><i><Icon name="chevron" size={19}/></i></summary><div className="answer"><p>{a}</p></div></details>)}
          </div>
        </div>
      </section>

      <section className="final-cta section">
        <div className="container">
          <Reveal className="cta-shell">
            <div className="cta-building" aria-hidden="true"><img src="/images/building-with-shadow.png" alt=""/></div>
            <div className="cta-copy"><Eyebrow>مدیریت ساختمان، بدون رفت‌وآمد اضافه</Eyebrow><h2>کارهای واحدتان را<br/>از یک جا مدیریت کنید</h2><p>بیلدینو امور مالی، خدمات، رزروها، مهمانان و ارتباط با مدیریت را در یک اپلیکیشن فارسی کنار هم می‌آورد.</p><div><a href="#showcase" className="button button-light">داخل محصول را ببینید <Icon name="arrow" size={19}/></a><a href="#capabilities" className="cta-link">امکانات بیلدینو</a></div></div>
          </Reveal>
        </div>
      </section>
    </main>
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo/>
          <p>همراه مالکان و ساکنان برای پیگیری امور ساختمان؛ از صورتحساب و خدمات تا رزرو امکانات و ارتباط با مدیریت.</p>
          <span className="footer-brand-caption">همه کارهای ساختمان، یک‌جا</span>
        </div>
        <nav className="footer-links" aria-label="آشنایی با بیلدینو">
          <h2>بیلدینو</h2>
          <a href="#overview">چرا بیلدینو؟</a>
          <a href="#capabilities">امکانات اپلیکیشن</a>
          <a href="#showcase">نگاهی به محصول</a>
        </nav>
        <nav className="footer-links" aria-label="راهنمای بیلدینو">
          <h2>بیشتر بدانید</h2>
          <a href="#services">خدمات ساختمان</a>
          <a href="#how">روش استفاده</a>
          <a href="#faq">سؤال‌های رایج</a>
        </nav>
      </div>
      <div className="container footer-legal">
        <span>© {new Intl.NumberFormat('fa-IR', {useGrouping:false}).format(new Date().getFullYear())} بیلدینو. تمامی حقوق محفوظ است.</span>
        <a className="footer-back-top" href="#top">بازگشت به بالا <Icon name="arrow" size={16}/></a>
      </div>
    </footer>
  </>
}

export default App
