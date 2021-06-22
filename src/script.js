import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//onload run create heightmap Function



// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// create our three.js scene
const scene = new THREE.Scene()

//create mesh geometry
const geometry = new THREE.PlaneBufferGeometry(3,3,64,64);

//create our mesh Texture Loaders
const loader = new THREE.TextureLoader();

//load our height map her
const heightMap = loader.load('/randomMapTwo.png')
//load our color map here
const textureImgage = loader.load("/mtn.jpeg")


// Materials
//load our textures onto our plane mesh 
const material = new THREE.MeshStandardMaterial({
    color: "grey",
    map: textureImgage,
    displacementMap: heightMap
    


})


// Mesh
const plane = new THREE.Mesh(geometry,material)
scene.add(plane)

plane.rotation.x = 181

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.9)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const amblight = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( amblight  );


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 50)
camera.position.x = 0.5
camera.position.y = 0.5
camera.position.z = 1
scene.add(camera)

// Controls
 const controls = new OrbitControls(camera, canvas)
 controls.enableDamping = true
 controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * option to Animate our scene
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //plane.rotation.z = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// movement - please calibrate these values
var xSpeed = 0.0001;
var ySpeed = 0.0001;




