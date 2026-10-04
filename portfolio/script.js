// ---- nav scroll state ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ---- mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // ---- typing role effect ----
  const roles = ['Web Developer', 'Game Developer', 'Computer Science Student', 'Problem Solver'];
  const typedEl = document.getElementById('typedRole');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduceMotion){
    typedEl.textContent = roles[0];
  } else {
    let roleIndex = 0, charIndex = 0, deleting = false;
    function tick(){
      const current = roles[roleIndex];
      if(!deleting){
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if(charIndex === current.length){
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if(charIndex === 0){
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  // ---- scroll reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  // ---- copy to clipboard ----
  function setupCopy(id, noteId, value){
    const el = document.getElementById(id);
    const note = document.getElementById(noteId);
    el.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText(value);
        note.classList.add('show');
        setTimeout(() => note.classList.remove('show'), 1400);
      }catch(e){}
    });
  }
  setupCopy('emailCopy', 'emailNote', 'ha8577202@gmail.com');
  setupCopy('phoneCopy', 'phoneNote', '03452624810');

  // ---- particle network canvas ----
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;

  function resize(){
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function initParticles(){
    const count = Math.min(70, Math.floor((w * h) / 18000));
    particles = Array.from({length: count}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;
    });
    for(let i = 0; i < particles.length; i++){
      for(let j = i + 1; j < particles.length; j++){
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 130){
          ctx.strokeStyle = `rgba(108,92,231,${0.14 * (1 - dist/130)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(45,212,191,0.55)';
      ctx.fill();
    });
    if(!reduceMotion) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); initParticles(); });
  resize();
  initParticles();
  if(!reduceMotion){ draw(); } else {
    draw();
  }