// 设置初始状态，用户是否进行了交互
window.human = false;

// 在 DOM 就绪后初始化，确保 .fireworks 存在
function initFireworks() {
  var canvasEl = document.querySelector('.fireworks');
  if (!canvasEl) return;
  var ctx = canvasEl.getContext('2d');

  var numberOfParticules = 20;
  var pointerX = 0;
  var pointerY = 0;
  var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
  var colors = ['rgba(99, 97, 220, 0.2)', 'rgba(99, 97, 220, 0.4)', 'rgba(139, 240, 254, 0.2)'];

  function setCanvasSize() {
    canvasEl.width = window.innerWidth * 2;
    canvasEl.height = window.innerHeight * 2;
    canvasEl.style.width = window.innerWidth + 'px';
    canvasEl.style.height = window.innerHeight + 'px';
    canvasEl.getContext('2d').scale(2, 2);
  }

  function updateCoords(e) {
    pointerX = e.clientX || e.touches[0].clientX;
    pointerY = e.clientY || e.touches[0].clientY;
  }

  function setParticuleDirection(p) {
    var angle = anime.random(0, 360) * Math.PI / 180;
    var value = anime.random(50, 180);
    var radius = [-1, 1][anime.random(0, 1)] * value;
    return { x: p.x + radius * Math.cos(angle), y: p.y + radius * Math.sin(angle) };
  }

  function createParticule(x,y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(8, 16);
    p.endPos = setParticuleDirection(p);
    p.draw = function() {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    return p;
  }

  function createCircle(x,y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = '#6361DC';
    p.radius = 0.1;
    p.alpha = .01;
    p.lineWidth = 2;
    p.draw = function() {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    return p;
  }

  function renderParticule(anim) {
    for (var i = 0; i < anim.animatables.length; i++) {
      anim.animatables[i].target.draw();
    }
  }

  function animateParticules(x, y) {
    var circle = createCircle(x, y);
    var particules = [];
    for (var i = 0; i < numberOfParticules; i++) {
      particules.push(createParticule(x, y));
    }
    anime.timeline().add({
      targets: particules,
      x: function(p) { return p.endPos.x; },
      y: function(p) { return p.endPos.y; },
      radius: 0.1,
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule
    }).add({
      targets: circle,
      radius: anime.random(80, 160),
      lineWidth: 0,
      alpha: { value: 0, easing: 'linear', duration: anime.random(600, 800) },
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule,
      offset: 0
    });
  }

  var render = anime({
    duration: Infinity,
    update: function() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }
  });

  document.addEventListener(tap, function(e) {
    window.human = true;
    render.play();
    updateCoords(e);
    animateParticules(pointerX, pointerY);
  }, false);

  setCanvasSize();
  window.addEventListener('resize', setCanvasSize, false);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFireworks);
} else {
  initFireworks();
}
