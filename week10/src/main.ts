import './style.scss'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let clock = new THREE.Clock()
let stats: any
let control: OrbitControls
let gui: dat.GUI

let textureLoader: THREE.TextureLoader
let fontLoader: FontLoader

let text: THREE.Mesh
let geo: THREE.BufferGeometry
let material: THREE.MeshStandardMaterial

let meshArray: Array<THREE.Mesh> = []

let geoArry: Array<THREE.BufferGeometry>
let cubeGeo: THREE.BoxGeometry
let sphereGeo: THREE.SphereGeometry
let coneGeo: THREE.ConeGeometry
let donutGeo: THREE.TorusGeometry

function main() {
    initScene()
    initStats()
    initListeners()
}

function initStats() {
    stats = new (Stats as any)()
    document.body.appendChild(stats.dom)
}

function initScene() {
    // DEBUG UI
    gui = new dat.GUI()
    const folder1 = gui.addFolder('Floating Meshes')
    const folder2 = gui.addFolder('Text Geometry')

    // SCENE
    scene = new THREE.Scene()
    scene.background = new THREE.Color('#6369D1')

    // TEXTURES
    textureLoader = new THREE.TextureLoader()
    const matcapTexture = textureLoader.load('./resources/textures/matcaps/2')

    //FONTS
    fontLoader = new FontLoader()
    fontLoader.load(
        './resources/fonts/helvetiker_regular.typeface',
        (font) => 
        {
            const textGeo = new TextGeometry(
                'Click Click Click',
                {
                    font: font,
                    size: 0.5,
                    height: 0.2,
                    curveSegments: 5,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 3
                }
            )
            textGeo.center()
            const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
            textMaterial.transparent = true
            const text = new THREE.Mesh(textGeo, textMaterial)
            scene.add(text)


            folder2.add(textMaterial, 'opacity').min(0).max(1).step(0.0001)
        }
    )


    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 10

    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)

    control = new OrbitControls(camera,renderer.domElement)

    const axisHelper = new THREE.AxesHelper()
    scene.add(axisHelper)

    const parameters ={
        color: 0xe869a2,
    }

    cubeGeo = new THREE.BoxGeometry(0.5,0.5,0.5)
    sphereGeo = new THREE.SphereGeometry(0.5,32,16)
    coneGeo = new THREE.ConeGeometry(0.5, 1, 32)
    donutGeo = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

    geoArry = [cubeGeo, sphereGeo, coneGeo, donutGeo]

    material = new THREE.MeshStandardMaterial({ color: parameters.color })
    material.metalness = 0
    material.roughness = 0.2


    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0xffffff, 0.5) 
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)

 

    folder1
        .addColor(parameters, ('color'))
        .onChange(() => 
        {
            material.color.set(parameters.color)
        })

    folder1.add(material, 'metalness').min(0).max(1).step(0.0001)
    folder1.add(material, 'roughness').min(0).max(1).step(0.0001)
    folder1.add(material, 'wireframe')

    // Init animation
    animate()
}

function initListeners() {
    window.addEventListener('resize', onWindowResize, false)

    window.addEventListener('keydown', (event) => {
        const { key } = event

        switch (key) {
            case 'e':
                const win = window.open('', 'Canvas Image')

                const { domElement } = renderer

                // Makse sure scene is rendered.
                renderer.render(scene, camera)

                const src = domElement.toDataURL()

                if (!win) return

                win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`)
                break

            default:
                break
        }
    })

    window.addEventListener('mousedown', onClick)
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function onClick(){
    let tempGeo = geoArry[Math.floor(Math.random() * geoArry.length)]
    let temp = new THREE.Mesh(tempGeo, material)
    temp.position.x = (Math.random() - 0.5) * 15
    temp.position.y = (Math.random() - 0.5) * 15
    temp.position.z = (Math.random() - 0.5) * 15
    temp.rotation.x = Math.random() * Math.PI
    temp.rotation.y = Math.random() * Math.PI
    scene.add(temp)
    meshArray.push(temp)
}

function animate() {
    requestAnimationFrame(() => {
        animate()
    })

    const elapsedTime = clock.getElapsedTime()

    for (let i = 0; i < meshArray.length; i++) {
        const element = meshArray[i];
        // how to do animate these differently
    }


    if (stats) stats.update()

    renderer.render(scene, camera)
}

main()