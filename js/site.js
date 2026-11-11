(function(){
  var nav=document.getElementById('nav'), barre=document.getElementById('barre');
  function onScroll(){
    var y=window.scrollY;
    if(nav) nav.classList.toggle('solide', y>40);
    if(barre) barre.classList.toggle('visible', y>window.innerHeight*.8);
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  var vue=document.getElementById('vue');
  if(!vue || !vue.showModal) return;
  var boutons=Array.prototype.slice.call(document.querySelectorAll('.mosaique button'));
  var photos=boutons.map(function(b){ return {src:b.dataset.grand, alt:b.querySelector('img').alt, legende:b.dataset.legende}; });
  var img=document.getElementById('vue-img'), leg=document.getElementById('vue-legende'), i=0, dernier=null;
  function montre(n){
    i=(n+photos.length)%photos.length;
    img.src=photos[i].src; img.alt=photos[i].alt;
    leg.textContent=photos[i].legende+'  ('+(i+1)+'/'+photos.length+')';
  }
  boutons.forEach(function(b,k){
    b.addEventListener('click', function(){ dernier=b; montre(k); vue.showModal(); });
  });
  vue.querySelector('.fermer').addEventListener('click', function(){ vue.close(); });
  vue.querySelector('.prec').addEventListener('click', function(){ montre(i-1); });
  vue.querySelector('.suiv').addEventListener('click', function(){ montre(i+1); });
  vue.addEventListener('click', function(e){ if(e.target===vue || e.target.tagName==='FIGURE') vue.close(); });
  vue.addEventListener('keydown', function(e){
    if(e.key==='ArrowLeft') montre(i-1);
    if(e.key==='ArrowRight') montre(i+1);
  });
  vue.addEventListener('close', function(){ if(dernier) dernier.focus(); });
  var x0=null;
  vue.addEventListener('touchstart', function(e){ x0=e.touches[0].clientX; }, {passive:true});
  vue.addEventListener('touchend', function(e){
    if(x0===null) return; var dx=e.changedTouches[0].clientX-x0;
    if(Math.abs(dx)>50) montre(dx<0?i+1:i-1); x0=null;
  });
})();
