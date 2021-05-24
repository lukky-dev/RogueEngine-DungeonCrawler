import * as RE from 'rogue-engine';

export default class PlayerMovement extends RE.Component {

  @RE.Prop("Number") movementSpeed = Number;
  @RE.Prop("Number") rotationSpeed = Number;
  awake() {

  }

  start() {

  }

  update() {
    if (RE.Input.keyboard.getKeyPressed("KeyW")) {
      this.object3d.translateZ(-this.movementSpeed * RE.Runtime.deltaTime);
    }

    if (RE.Input.keyboard.getKeyPressed("KeyS")) {
      this.object3d.translateZ(this.movementSpeed * RE.Runtime.deltaTime);
    }
    
    if (RE.Input.keyboard.getKeyPressed("KeyD")) {
      this.object3d.rotateY(-this.rotationSpeed * RE.Runtime.deltaTime);
    }

    if (RE.Input.keyboard.getKeyPressed("KeyA")) {
      this.object3d.rotateY(this.rotationSpeed * RE.Runtime.deltaTime);
    }
  }
}

RE.registerComponent(PlayerMovement);
