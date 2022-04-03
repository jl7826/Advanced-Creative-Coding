import './style.scss'
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

let renderer: THREE.WebGLRenderer
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let clock = new THREE.Clock()
let stats: any

let cube: THREE.Mesh

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
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)






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
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
    requestAnimationFrame(() => {
        animate()
    })


    if (stats) stats.update()

    renderer.render(scene, camera)
}

main()