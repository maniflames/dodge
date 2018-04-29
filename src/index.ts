import Game from './Game'
import GameObject from './GameObject'

window.addEventListener('load', () => {
    Game.getGame().setPlayer(new GameObject(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial()))
})