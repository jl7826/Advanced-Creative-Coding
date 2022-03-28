import './style.scss'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let scene:THREE.Scene
let camera:THREE.PerspectiveCamera
let renderer:THREE.WebGLRenderer
let controls:OrbitControls

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

scene = new THREE.Scene()

camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.z = 50
camera.position.y = -4
camera.position.x = 7

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 10));
renderer.setSize(sizes.width, sizes.height);

document.body.appendChild(renderer.domElement);

controls = new OrbitControls(camera, renderer.domElement);

const group = new THREE.Group()
scene.add(group)

const material = new THREE.MeshBasicMaterial({color : 0xffffff})

const boxGeo = new THREE.BoxGeometry(100,100,100,25,25,25)
const boxWire = new THREE.WireframeGeometry(boxGeo)
const box = new THREE.LineSegments(boxWire)
scene.add( box );

let spheres = []

const sphereGeo = new THREE.SphereGeometry()

for (let i = 0; i < 5; i++){
    const mesh = new THREE.Mesh(sphereGeo, material)
    mesh.position.x = 5 * i
    spheres.push(mesh)
    group.add(spheres[i])
}

const oneGeo = new THREE.OctahedronGeometry(30,20)
const oneWire = new THREE.WireframeGeometry(oneGeo)
const one = new THREE.LineSegments(oneWire)
scene.add(one)

const threeGeo = new THREE.TorusKnotGeometry(10, 1, 200, 15, 4, 9)
const threeWire = new THREE.WireframeGeometry(threeGeo)
const three = new THREE.LineSegments(threeWire)
scene.add(three)

window.addEventListener('resize', () => 
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)

    //Update pixel ratio
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    three.rotateY (0.01)
    three.rotateX (0.01)
    three.rotateZ (0.01)

    box.rotateZ(0.01)

    group.rotateY(0.01)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()