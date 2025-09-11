/* include-componenetes.js
	 Usage: add <script src="/src/Componenetes/scripts/include-componenetes.js" defer></script>
	 This script fetches the header and footer partials and injects them into the page.
*/
(function(){
	function loadText(path){
		return fetch(path).then(r=>{
			if(!r.ok) throw new Error('Not found '+path);
			return r.text();
		});
	}

	function ensureCss(href){
		if(document.querySelector('link[href="'+href+'"]')) return;
		const l = document.createElement('link');
		l.rel='stylesheet';
		l.href=href;
		document.head.appendChild(l);
	}

	function ensureScript(src){
		if(document.querySelector('script[src="'+src+'"]')) return;
		const s = document.createElement('script');
		s.src = src;
		s.defer = true;
		document.body.appendChild(s);
	}

		// derive base path from this script's src so it works from nested pages or file://
		const thisScript = document.currentScript || (function(){
			const scripts = document.getElementsByTagName('script');
			return scripts[scripts.length-1];
		})();
		const scriptSrc = thisScript && thisScript.src ? thisScript.src : '/src/Componenetes/scripts/include-componenetes.js';
		const base = scriptSrc.replace(/include-componenetes\.js(?:\?.*)?$/,'');

		const headerHtml = base + '../Organismos/header/header.html';
		const headerCss  = base + '../Organismos/header/header.css';
		const headerJs   = base + '../Organismos/header/header.js';

		const footerHtml = base + '../Organismos/footer/footer.html';
		const footerCss  = base + '../Organismos/footer/footer.css';
		const footerJs   = base + '../Organismos/footer/footer.js';

			// header injection with fallback for file:// (browsers block fetch on file)
			loadText(headerHtml).then(html=>{
				insertHeader(html);
			}).catch(()=>{
				// fallback: use embedded template
				const fallbackHeader = `
		<header class="site-header" id="site-header">
			<div class="header-inner">
				<a class="brand" href="/src/pages/Home/home.html">
					<img src="/src/assets/icons/img/logo.png" alt="HappyFest logo" class="brand-logo">
				</a>
				<nav class="main-nav" id="main-nav">
					<ul>
						<li><a href="/src/pages/Home/home.html">Inicio</a></li>
						<li><a href="/src/pages/Services/services.html">Servicios</a></li>
						<li><a href="/src/pages/Catalog/catalog.html">Catálogo</a></li>
						<li><a href="/src/pages/Reviews/reviews.html">Reseñas</a></li>
						<li><a href="/src/pages/Contact/contact.html">Contacto</a></li>
					</ul>
				</nav>
				<button class="nav-toggle" id="nav-toggle" aria-label="Abrir menú">
					<span></span><span></span><span></span>
				</button>
			</div>
		</header>`;
				insertHeader(fallbackHeader);
			});

			// footer injection with fallback
			loadText(footerHtml).then(html=>{
				insertFooter(html);
			}).catch(()=>{
				const fallbackFooter = `
			<footer class="site-footer">
				<div class="footer-inner">
					<div class="footer-brand">
						<img src="/src/assets/icons/img/logo.png" alt="HappyFest logo" class="footer-logo">
						<h3>Agencia de Eventos</h3>
						<p>Creamos momentos inolvidables para cada ocasión especial. Nuestra pasión es hacer realidad tus sueños.</p>
					</div>
					<div class="footer-nav">
						<h4>Navegación</h4>
						<ul>
							<li><a href="/src/pages/Home/home.html">Inicio</a></li>
							<li><a href="/src/pages/Services/services.html">Servicios</a></li>
							<li><a href="/src/pages/Catalog/catalog.html">Catálogo</a></li>
							<li><a href="/src/pages/Reviews/reviews.html">Reseñas</a></li>
							<li><a href="/src/pages/Contact/contact.html">Contactos</a></li>
						</ul>
					</div>
					<div class="footer-services">
						<h4>Nuestros Servicios</h4>
						<ul>
							<li>Bodas</li>
							<li>Eventos Corporativos</li>
							<li>Fiestas de Cumpleaños</li>
							<li>Aniversarios</li>
							<li>Eventos Especiales</li>
						</ul>
					</div>
					<div class="footer-contact">
						<h4>Contáctanos</h4>
						<p>Av. Principal 123, Ciudad de México</p>
						<p>+52 55 1234 5678</p>
						<p>info@agenciaeventos.com</p>
					</div>
				</div>
				<div class="footer-bottom">
					<p>© 2025 Agencia de Eventos. Todos los derechos reservados.</p>
					<div class="footer-legal legal-links">
						<a href="/src/Componenetes/Organismos/footer/avisolegal.pdf" target="_blank" rel="noopener">Aviso Legal</a>
						<a href="/src/Componenetes/Organismos/footer/Terminos-y-Condiciones.pdf" target="_blank" rel="noopener">Términos y Condiciones</a>
						<a href="/src/Componenetes/Organismos/footer/POLITICA-privacidad.pdf" target="_blank" rel="noopener">Política de Privacidad</a>
						<a href="/src/Componenetes/Organismos/footer/Cookies.pdf" target="_blank" rel="noopener">Política de Cookies</a>
					</div>
				</div>
			</footer>`;
				insertFooter(fallbackFooter);
			});

				// determine file:// prefix when opening pages directly so absolute "/src/..." paths resolve
				const isFile = location.protocol === 'file:';
				const filePrefix = isFile && location.href.indexOf('/src/') !== -1 ? location.href.split('/src/')[0] : null;

				// helpers to insert and ensure resources
			function insertHeader(html){
						if(filePrefix){
						// rewrite src and href that start with /src/ to filePrefix + /src/
						html = html.replace(/(src|href)=("|')\/src\//g, `$1=$2${filePrefix}/src/`);
					}
						// ensure a favicon (logo) is present in the document head so it appears in the browser tab
						if(!document.querySelector('link[rel="icon"]')){
							const isFileLocal = location.protocol === 'file:';
							const iconHref = (isFileLocal && location.href.indexOf('/src/') !== -1)
								? location.href.split('/src/')[0] + '/src/assets/icons/img/logo.png'
								: '/src/assets/icons/img/logo.png';
							const icon = document.createElement('link');
							icon.rel = 'icon';
							icon.href = iconHref;
							document.head.appendChild(icon);
						}

						// ensure meta charset and viewport exist for proper mobile rendering
						if(!document.querySelector('meta[charset]')){
							const m = document.createElement('meta'); m.setAttribute('charset','utf-8'); document.head.appendChild(m);
						}
						if(!document.querySelector('meta[name="viewport"]')){
							const v = document.createElement('meta'); v.name = 'viewport'; v.content = 'width=device-width, initial-scale=1'; document.head.appendChild(v);
						}
						ensureCss(headerCss);
					ensureScript(headerJs);
					// add small protective style to avoid page-level header/nav rules overriding the component
					if(!document.getElementById('component-protect-style')){
						const style = document.createElement('style');
						style.id = 'component-protect-style';
						style.textContent = `
						/* protective rules for injected header/footer component */
						.site-header{display:block !important}
						.site-header header, .site-header nav{all:initial}
						.site-header .header-inner{all:unset;display:grid;grid-template-columns:120px 1fr 60px;align-items:center;gap:12px;padding:14px 20px}
						.site-header .brand-logo{width:56px}
						.site-header .main-nav ul{display:flex;justify-content:center;gap:28px;list-style:none;margin:0;padding:0}
						`;
						document.head.appendChild(style);
					}
					// inject header HTML into placeholder or at top of body
					const placeholder = document.getElementById('header');
				if(placeholder){ placeholder.innerHTML = html; }
				else if(!document.getElementById('site-header')){
					const container = document.createElement('div'); container.innerHTML = html; document.body.insertBefore(container, document.body.firstChild);
				}

					// inject global responsive helpers (only once)
					if(!document.getElementById('component-global-responsive')){
						const gstyle = document.createElement('style');
						gstyle.id = 'component-global-responsive';
						gstyle.textContent = `
						:root{ --site-header-height:78px }
						body{padding-top:var(--site-header-height);transition:padding-top .12s}
						img,picture,video,svg{max-width:100%;height:auto;display:block}
						.container,.page,main{max-width:1200px;margin:0 auto;padding:0 16px;box-sizing:border-box}
						/* small screens */
						@media(max-width:900px){
							.header-inner{grid-template-columns:56px 1fr 56px !important}
							.site-header .main-nav{position:static !important;display:block !important}
							.site-header .main-nav ul{flex-direction:column;gap:12px;align-items:flex-start}
							.nav-toggle{display:block}
							.footer-inner{grid-template-columns:1fr !important;padding:20px}
							main{padding:16px}
						}
						@media(max-width:600px){
							:root{--site-header-height:92px}
							nav a{font-size:1rem}
						}
						`;
						document.head.appendChild(gstyle);
					}

					// update CSS variable for header height so body padding matches actual header
					(function updateHeaderHeight(){
						const hdr = document.getElementById('site-header') || document.querySelector('.site-header');
						if(hdr){
							const h = hdr.offsetHeight || 78;
							document.documentElement.style.setProperty('--site-header-height', h + 'px');
						}
						window.addEventListener('resize', function(){
							const hdr2 = document.getElementById('site-header') || document.querySelector('.site-header');
							if(hdr2){ document.documentElement.style.setProperty('--site-header-height', (hdr2.offsetHeight || 78) + 'px'); }
						});
					})();
			}

			function insertFooter(html){
					if(filePrefix){
						html = html.replace(/(src|href)=("|')\/src\//g, `$1=$2${filePrefix}/src/`);
					}
				ensureCss(footerCss);
				ensureScript(footerJs);
				const placeholder = document.getElementById('footer');
				if(placeholder){ placeholder.innerHTML = html; }
				else if(!document.querySelector('.site-footer')){
					const container = document.createElement('div'); container.innerHTML = html; document.body.appendChild(container);
				}
			}

})();
