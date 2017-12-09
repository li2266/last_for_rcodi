var container = document.querySelector('.container');
var jackTemplate = document.querySelector('#jackTemplate').innerHTML;

function hitTheRoadJack(x, y) { 
   var jack = document.createElement('div');
   jack.classList.add('jack');
   jack.innerHTML = jackTemplate;
   jack.style.left = x;
   jack.style.top = y; 
   
   container.appendChild(jack)
   
   var t1 = just.animate({
      targets: jack, 
      duration: just.shuffle([1000, 1100, 1200]),
      easing: 'ease-out',
      web: {
         opacity: [1, 1, 0],
         scale: .1,
         y: just.random(-140, -110, 'vmin', true),
         x: just.random(-40, 40, 'vmin', true),
         rotate: -420
      }
   });

   t1.play({ destroy: true });

   t1.once('finish', function() {
      container.removeChild(jack)
   })
}

function intro() {
   // show document body
   document.body.style.visibility = 'visible';
   
   var t1 = just.animate({
      targets: just.splitText('h1').characters,
      duration: 430,
      endDelay: 600,
      stagger: 80,
      web: {
         opacity: [0, .3, 1],
         x: [0, -10, 0, -15, 0, -5, 0],
         y: [40, 0]
      }
   })
   
   t1.animate({
      targets: 'h2',
      duration: 1000,
      web: {
         opacity: [0, 1]
      }
   })
   
   t1.play();
   
   t1.on('finish', function() {
      hitTheRoadJack('50vw', '70vw')
   }) 
}

var last = undefined
container.addEventListener('click', function(evt) {
   var now = performance.now()
   if (last === undefined || (now - last) > 200) {
      hitTheRoadJack(evt.clientX + 'px', evt.clientY + 'px');
      last = now;
   }
})

intro();

