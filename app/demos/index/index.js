
import { Color, Vector3 } from 'three';
import { TimelineLite } from 'gsap';

import HandleCameraOrbit from 'decorators/HandleCameraOrbit';

import LineGenerator from 'objects/LineGenerator';
import Stars from 'objects/Stars';

import Engine from 'utils/engine';

import './style.styl';


/**
 * * *******************
 * * ENGINE
 * * *******************
 */
@HandleCameraOrbit({ x: 2, y: 3 }, 0.05)
class CustomEngine extends Engine {}

const engine = new CustomEngine();

engine.dom.style.position = 'absolute';
engine.dom.style.top = '0';
engine.dom.style.left = '0';
engine.dom.style.zIndex = '-1';
document.body.appendChild( engine.dom );

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);

function resize() {
  engine.resize(window.innerWidth, window.innerHeight);
}
resize();

/**
 * * *******************
 * * LIGNES
 * * *******************
 */
const STATIC_PROPS = {
  width: 0.05,
  nbrOfPoints: 1,
  turbulence: new Vector3(),
  orientation: new Vector3(-1, -1, 0),
  color: new Color('#e6e0e3'),
};

class CustomLineGenerator extends LineGenerator {
  addLine() {
    super.addLine({
      length: getRandomFloat(5, 10),
      visibleLength: getRandomFloat(0.05, 0.2),
      speed: getRandomFloat(0.01, 0.02),
      position: new Vector3(
        getRandomFloat(-4, 8),
        getRandomFloat(-3, 5),
        getRandomFloat(-2, 5),
      ),
    });
  }
}
const lineGenerator = new CustomLineGenerator({ frequency: 0.1 }, STATIC_PROPS);
engine.add(lineGenerator);


/**
 * * *******************
 * * STARS
 * * *******************
 */
const stars = new Stars();
engine.add(stars);

/**
 * * *******************
 * * START
 * * *******************
 */
// Show
engine.start();
const tlShow = new TimelineLite({ delay: 0.2, onStart: () => {
  lineGenerator.start();
}});
tlShow.to('.background', 2, { y: -300 }, 0);
tlShow.fromTo(engine.lookAt, 2, { y: -8 }, { y: 0, ease: Power2.easeOut }, 0);

function getRandomFloat (min, max){
   return(Math.random() * (max - min)) + min;
}
