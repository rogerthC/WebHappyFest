document.addEventListener('DOMContentLoaded', function(){
	// ensure footer images have alt fallback and small accessibility helpers
	document.querySelectorAll('.footer-thumbs img').forEach(img=>{
		if(!img.alt) img.alt = 'imagen';
		img.addEventListener('error', ()=>{ img.style.display='none'; });
	});
});
