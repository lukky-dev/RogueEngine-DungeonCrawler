import * as RE from 'rogue-engine';
import { Object3D, Vector3 } from 'three';

import * as THREE from 'three';
import {DungeonGenerator} from "../Scripts/DungeonGenerator";


export default class Dungeon extends RE.Component {
  @RE.Prop("Object3D") wallTile = Object3D;
  @RE.Prop("Object3D") floorTile = Object3D;
  @RE.Prop("Object3D") player = Object3D;

  start() {
    this.dungeonGenerator = DungeonGenerator();
    this.map = this.dungeonGenerator.generate();

    console.log(this.map);

    this.spawnPoint = {x:0,y:0};

    this.addWall(0,0);
    this.addFloor(0,0);
    this.addDungeonToScene();

    this.player.position.set(this.spawnPoint.x,0,this.spawnPoint.y);
  }

  addDungeonToScene(){
    
    for(var x = 0;x < this.map.length;x++){
      for(var y = 0;y < this.map[0].length;y++){
        if(this.map[x][y].cellType == "empty"){

          if(this.spawnPoint.x == 0 && this.spawnPoint.y == 0){
            this.spawnPoint.x = x;
            this.spawnPoint.y = y;
          }

          this.addFloor(x,y);

          if(this.map[x][y+1] && this.map[x][y+1].cellType == "wall"){
            this.map[x][y+1].cellType == "wall-placed";
            this.addWall(x,y+1);
          }
          if(this.map[x][y-1] && this.map[x][y-1].cellType == "wall"){
            this.map[x][y+1].cellType == "wall-placed";
            this.addWall(x,y-1);
          }
          if(this.map[x+1][y] && this.map[x+1][y].cellType == "wall"){
            this.map[x][y+1].cellType == "wall-placed";
            this.addWall(x+1,y);
          }
          if(this.map[x-1][y] && this.map[x-1][y].cellType == "wall"){
            this.map[x][y+1].cellType == "wall-placed";
            this.addWall(x-1,y);
          }
        }
      } 
    }
    
  }

  addWall(x,y){
    const wall =  this.wallTile.clone();
    wall.position.set(x,0,y);
    this.object3d.add( wall );
  }

  addFloor(x,y){
    const floor = this.floorTile.clone();
    floor.position.set(x,0,y);
    this.object3d.add( floor );
  }

  update() {

  }
}

RE.registerComponent(Dungeon);
