
async function CreateKallax(scene, kallaxColor, material, material2, booksColor) {

    var kallaxText1 = "KALLAX Shelf unit";
    var kallaxText2 = "Shelving unit or room divider – the KALLAX series adapts to taste, space, needs and budget. Smooth surfaces and rounded corners give a feel of quality and you can personalize the shelving unit with inserts and boxes.";
    var kallaxText3 = "The simple design with clean lines makes KALLAX flexible and easy to use at home.";
    var kallaxUrl = "https://www.ikea.lt/lt/products/svetaine/daiktu-laikymo-sistemos-svetaineje/atviros-lentynos/kallax-lentyna-balta-art-30275861";

    await BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "kallax_4x4.obj", scene, function (meshes) {
            object = meshes[0];
            var s = 0.9;
            object.scaling = new BABYLON.Vector3(s, s, s);
            object.material = kallaxColor;
            object.position = new BABYLON.Vector3(2, -0.2, -6.7);
            OnTrigger(scene, object, kallaxText1, kallaxText2, kallaxText3, kallaxUrl);

            var collidersVisible = false;
            //////Physics
            var collider = BABYLON.MeshBuilder.CreateBox("", { width: 7.5, height: 0.1, depth: 2 }, scene);
            collider.position = new BABYLON.Vector3(2, 0, -6.5)
            collider.isVisible = collidersVisible;

            collider.physicsImpostor = new BABYLON.PhysicsImpostor(collider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 1 }, scene);

            var collider2 = collider.clone("");
            collider2.position.y = 1.84;

            var collider3 = collider.clone("");
            collider3.position.y = 3.8;

            var collider4 = collider.clone("");
            collider4.position.y = 5.65;

            var collider5 = collider.clone("");
            collider5.position.y = 7.6;

            var colliderHoriz = BABYLON.MeshBuilder.CreateBox("", { width: 0.1, height: 7.6, depth: 2.2 }, scene);
            colliderHoriz.position = new BABYLON.Vector3(5.85, 3.8, -6.7)
            colliderHoriz.isVisible = collidersVisible;

            colliderHoriz.physicsImpostor = new BABYLON.PhysicsImpostor(colliderHoriz, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, friction: 0.5, restitution: 1 }, scene);


            var colliderHoriz2 = colliderHoriz.clone("");
            colliderHoriz2.position.x = 3.9;

            var colliderHoriz3 = colliderHoriz.clone("");
            colliderHoriz3.position.x = 1.95;

            var colliderHoriz4 = colliderHoriz.clone("");
            colliderHoriz4.position.x = 0.1;

            var colliderHoriz5 = colliderHoriz.clone("");
            colliderHoriz5.position.x = -1.85;

        });

    CreateBox(scene, 4.8, 0.8, -6.9, material);
    CreateBox(scene, 2.95, 0.8, -6.9, material);
    CreateBox(scene, -0.85, 0.8, -6.9, material);
    

    var book1;
    var bookName = "book_black.obj";

    CreateBook(scene, bookName, book1, 4, 4.1, -6.4, 1, 3, 1);
    CreateBook(scene, bookName, book1, 4, 4.25, -6.4, 1, 1.5, 1);
    CreateBook(scene, bookName, book1, 4, 4.45, -6.4, 0.8, 2, 1);

    CreatePlant(scene);
    CreatePicFrame2(scene, -0.8, 5.7, -6.5);
    CreateMarioCube(scene);

}

async function CreateBox(scene, x, y, z, material) {
    var f = new BABYLON.Vector4(0.5, 0, 1, 1);
    var b = new BABYLON.Vector4(0, 0, 0.5, 1);
    var boxOpts = {
        width: 1,
        height: 1,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        frontUVs: f,
        backUVs: b
    };
    var back = BABYLON.MeshBuilder.CreatePlane("ground", boxOpts, scene);
    var left = back.clone("");
    
    left.rotation.y = Math.PI / 2;
    left.position = new BABYLON.Vector3(0.5, 0, 0.5);

    var right = left.clone("");
    right.position = new BABYLON.Vector3(-0.5, 0, 0.5);

    var front = back.clone("");
    front.position.z = 1;

    var bottom = back.clone("");
    bottom.position = new BABYLON.Vector3(0, -0.5, 0.5);
    bottom.rotation.x = Math.PI / 2;

    var box = BABYLON.Mesh.MergeMeshes([back, left, right, front, bottom]);
    var s = 1.3;

    box.scaling = new BABYLON.Vector3(s, s, s);
    box.position = new BABYLON.Vector3(x, y, z);

    box.material = material;
    Dragging(scene, box);

    box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 5 }, scene);

}

async function CreateBook(scene, name, object, positionX, positionY, positionZ, scaleX, scaleY, scaleZ, rotationX, rotationY, rotationZ) {
    await BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        name, scene, function (meshes) {
            var meshArray = [];
            for (var i = 0; i < meshes.length; i++) {
                meshArray.push(meshes[i]);
            }
            var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
            object.scaling = new BABYLON.Vector3(scaleX, scaleY, scaleZ);
            object.position = new BABYLON.Vector3(positionX, positionY, positionZ);
            object.rotation = new BABYLON.Vector3(rotationX, rotationY, rotationZ);

            Dragging(scene, object);
            object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 5 }, scene);

        });
}
//plants
function CreatePlant(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "plant.obj", scene, function (meshes) {
            var meshArray = [];
            for (var i = 0; i < meshes.length; i++) {
                meshArray.push(meshes[i])
            }
            var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);

            var s = 0.8;
            object.scaling = new BABYLON.Vector3(s, s, s);
            object.position = new BABYLON.Vector3(1, 3.8, -6.5);

            Dragging(scene, object);
            object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 4 }, scene);

        });
}

function CreatePicFrame2(scene, x, y, z) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "frame2.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            birdFrame = meshes[i];
            meshArray.push(birdFrame);
            var s = 1.4;
            birdFrame.scaling = new BABYLON.Vector3(s, s, s);
            birdFrame.position = new BABYLON.Vector3(x, y, z);
        }
        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        Dragging(scene, object);
        object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 50 }, scene);

    });
}
function CreateMarioCube(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "mario.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }
        var marioCube = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);

        marioCube.position = new BABYLON.Vector3(3, 5.72, -6.3);
        Dragging(scene, marioCube);

        marioCube.physicsImpostor = new BABYLON.PhysicsImpostor(marioCube, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 5 }, scene);
    });
}

