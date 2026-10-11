// Ashish Manocha portfolio interactions
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

window.addEventListener('load', () => {
    const year = $('#year'); if (year) year.textContent = new Date().getFullYear();
    updateTime(); setInterval(updateTime, 1000);
});
function updateTime() { const el = $('#local-time'); if (el) el.textContent = new Date().toLocaleTimeString('en-IN', {hour:'2-digit', minute:'2-digit', hour12:false}); }

const currentPage = (location.pathname.split('/').pop() || 'index.html');
$$('.nav-link, nav a').forEach(link => { const target = (link.getAttribute('href') || '').split('/').pop(); if (target === currentPage && link.classList.contains('nav-link')) { link.classList.add('text-primary','font-bold'); link.classList.remove('text-slate-600','dark:text-slate-400'); } });

const html = document.documentElement;
const themeToggle = $('#theme-toggle');
const setThemeIcon = () => { if (themeToggle) themeToggle.innerHTML = html.classList.contains('dark') ? '<svg class="ico" aria-hidden="true" focusable="false"><use href="#i-sun"></use></svg>' : '<svg class="ico" aria-hidden="true" focusable="false"><use href="#i-moon"></use></svg>'; };
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) html.classList.add('dark'); else html.classList.remove('dark');
setThemeIcon();
if (themeToggle) themeToggle.addEventListener('click', () => { html.classList.toggle('dark'); localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light'; setThemeIcon(); });

const menu = $('#mobile-menu');
const toggleMenu = () => { if (!menu) return; const open = menu.style.opacity === '1'; menu.style.opacity = open ? '0' : '1'; menu.style.pointerEvents = open ? 'none' : 'auto'; };
$('#mobile-menu-btn')?.addEventListener('click', toggleMenu); $('#close-menu')?.addEventListener('click', toggleMenu); $$('.mobile-link').forEach(link => link.addEventListener('click', toggleMenu));

const scrollTop = $('#scrollToTopBtn');
window.addEventListener('scroll', () => { if (scrollTop) { if (scrollY > 300) scrollTop.classList.remove('translate-y-20','opacity-0'); else scrollTop.classList.add('translate-y-20','opacity-0'); } });
scrollTop?.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));

const filters = $$('.filter-btn'); const projects = $$('.project-item');
filters.forEach(btn => btn.addEventListener('click', () => { filters.forEach(b => b.classList.remove('active')); btn.classList.add('active'); const value = btn.dataset.filter; projects.forEach(project => { const cats = (project.dataset.filterCategory || '').split(' '); const show = value === 'all' || cats.includes(value); project.style.display = show ? 'block' : 'none'; if (show) project.classList.add('is-visible'); }); }));

if (matchMedia('(min-width: 768px)').matches) $$('.project-card').forEach(card => { card.addEventListener('mousemove', e => { const r=card.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top; card.style.transform=`perspective(1000px) rotateX(${((y-r.height/2)/(r.height/2))*-3}deg) rotateY(${((x-r.width/2)/(r.width/2))*3}deg) scale3d(1.01,1.01,1.01)`; }); card.addEventListener('mouseleave', () => card.style.transform='perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)'); });

const modal = $('#project-modal'); const backdrop = $('#modal-backdrop'); const modalContent = $('#modal-content');
const hideModal = () => { if (!modal) return; backdrop?.classList.add('opacity-0'); modalContent?.classList.remove('scale-100','opacity-100'); modalContent?.classList.add('scale-95','opacity-0'); setTimeout(() => { modal.classList.add('hidden'); document.body.style.overflow=''; }, 300); };
$$('.project-trigger').forEach(trigger => trigger.addEventListener('click', () => { if (!modal) return; $('#modal-title').textContent=trigger.dataset.title; $('#modal-category').textContent=trigger.dataset.category; $('#modal-image').src=trigger.dataset.image; $('#modal-desc').textContent=trigger.dataset.desc; modal.classList.remove('hidden'); setTimeout(()=>{backdrop?.classList.remove('opacity-0'); modalContent?.classList.remove('scale-95','opacity-0'); modalContent?.classList.add('scale-100','opacity-100');},10); document.body.style.overflow='hidden'; }));
$('#close-modal')?.addEventListener('click', hideModal); backdrop?.addEventListener('click', hideModal); document.addEventListener('keydown', e => { if (e.key === 'Escape') hideModal(); });

const toastContainer = $('#toast-container'); const form = $('#contact-form');
function showToast(message) { if (!toastContainer) return; const toast=document.createElement('div'); toast.className='flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl font-medium text-sm bg-slate-900 text-white dark:bg-white dark:text-black'; toast.innerHTML=`<svg class="ico" aria-hidden="true" focusable="false"><use href="#i-check-circle"></use></svg><span>${message}</span>`; toastContainer.appendChild(toast); setTimeout(()=>toast.remove(),3000); }
form?.addEventListener('submit', e => { e.preventDefault(); const btn=$('button',form); if (!btn) return; const original=btn.innerHTML; btn.innerHTML='<svg class="ico animate-spin" aria-hidden="true" focusable="false"><use href="#i-circle-notch"></use></svg> Sending...'; btn.disabled=true; setTimeout(()=>{showToast('Message sent successfully! I will get back to you soon.'); form.reset(); btn.innerHTML=original; btn.disabled=false;},900); });

if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), {threshold:.1, rootMargin:'0px 0px -50px 0px'}); $$('.reveal-on-scroll').forEach(el => observer.observe(el)); } else { $$('.reveal-on-scroll').forEach(el => el.classList.add('is-visible')); }
if (matchMedia('(min-width: 768px)').matches) $$('.magnetic-btn').forEach(btn => { btn.addEventListener('mousemove', e => { const r=btn.getBoundingClientRect(); btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`; }); btn.addEventListener('mouseleave',()=>btn.style.transform='translate(0,0)'); });
$$('.spotlight-card').forEach(card => card.addEventListener('mousemove', e => { const r=card.getBoundingClientRect(); card.style.setProperty('--mouse-x',`${e.clientX-r.left}px`); card.style.setProperty('--mouse-y',`${e.clientY-r.top}px`); }));
