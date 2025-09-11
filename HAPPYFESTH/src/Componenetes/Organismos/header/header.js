// Header behavior: mobile toggle and hide-on-scroll
document.addEventListener('DOMContentLoaded', function(){
	const toggle = document.getElementById('nav-toggle');
	const nav = document.getElementById('main-nav');
	const header = document.getElementById('site-header');

	if(toggle && nav){
		toggle.addEventListener('click', ()=>{
			nav.classList.toggle('open');
			const expanded = nav.classList.contains('open');
			toggle.setAttribute('aria-expanded', expanded);
		});
	}

	// keep header fixed (do not hide on scroll)

	// close mobile nav when clicking outside
	document.addEventListener('click', (e)=>{
		if(!nav || !toggle) return;
		if(nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)){
			nav.classList.remove('open');
			toggle.setAttribute('aria-expanded', 'false');
		}
	});
  
		// marcar enlace activo según la URL
		try{
			const links = document.querySelectorAll('.main-nav a');
			const currentPath = location.pathname.replace(/\\/g,'/');
			links.forEach(a=>{
				// compara rutas relativas y nombres de archivo
				const href = a.getAttribute('href') || '';
				if(href && (currentPath.endsWith(href) || currentPath.endsWith(href.replace(/^\.\//,'')) || currentPath === href)){
					a.classList.add('active');
				}
			});
		}catch(e){/* ignore */}
});
