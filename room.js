function CreateRoom(scene, groundMaterial, wallMaterial){
    
    var ground = BABYLON.MeshBuilder.CreateBox("ground", { width: 19, depth: 19, height: 0.5 }, scene);
    ground.position = new BABYLON.Vector3(3, -0.45, 1.5);

    ground.material = groundMaterial;
    
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 0.7 }, scene);


    wallY = 4.54;
    var backWall = BABYLON.MeshBuilder.CreateBox("backWall", { width: 19, depth: 0.5, height: 9.5 }, scene);
    backWall.position = new BABYLON.Vector3(3, wallY, -7.75);

    var rightWall = backWall.clone("");
    rightWall.position = new BABYLON.Vector3(-6.25, wallY, 1.5);
    rightWall.rotation.y = Math.PI / 2;

    rightWall.physicsImpostor = new BABYLON.PhysicsImpostor(rightWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 100, restitution: 0 }, scene);

    backWall.physicsImpostor = new BABYLON.PhysicsImpostor(backWall, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 100, restitution: 0 }, scene);

    rightWall.material = wallMaterial;
    backWall.material = wallMaterial;



}
