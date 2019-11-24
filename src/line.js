var scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
//PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
// fov — Camera frustum vertical field of view.
// aspect — Camera frustum aspect ratio.
// near — Camera frustum near plane.
// far — Camera frustum far plane.
//var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 500 );
//
// The relationship of width, height and vFOV
// var vFOV = THREE.Math.degToRad( camera.fov ); // convert vertical fov to radians

// var height = 2 * Math.tan( vFOV / 2 ) * dist; // visible height

// var width = height * camera.aspect;           // visible width

var camera = new THREE.PerspectiveCamera(90, 1, 0.1, 200);
camera.position.set(0, 0, 5);
camera.lookAt(1.8, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BufferGeometry();
// create a simple square shape. We duplicate the top left and bottom right
// vertices because each vertex needs to appear once per triangle.
const loop = 2e2;
// 2e7 ok
// 2.5e7 nothing happen: WebGL: CONTEXT_LOST_WEBGL: loseContext: context lost
var vertices = new Float32Array(3 * loop);
let j = 0;
for (let i = 0; i < loop; i++) {
    let x = (4 * i) / loop;
    vertices[j] = x;
    j++;
    let y = Math.sin(i);
    vertices[j] = y;
    j++;
    vertices[j] = 0;
    j++;
}
// itemSize = 3 because there are 3 values (components) per vertex
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

var material = new THREE.LineBasicMaterial({
    color: 0x000000,
    linewidth: 1,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin: 'round', //ignored by WebGLRenderer
});
// var material = new THREE.LineDashedMaterial( {
//     color: 0x000000,
//     linewidth: 1,
//     scale: 5,
//     dashSize: 3,
//     gapSize: 1,
// } );
var line = new THREE.Line(geometry, material);
scene.add(line);
renderer.render(scene, camera);
