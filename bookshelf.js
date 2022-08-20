var bookshelfText1 = "LAIVA Bookcase";
var bookshelfText2 = "Shallow shelves help you to use the walls in your home efficiently. They hold a lot of things without taking up much space in the room.";
var bookshelfText3 = "The open shelves allow you to see and reach everything. Different wall materials require different types of fasteners. Use fasteners suitable for the walls in your home.";
var bookshelfUrl = "https://www.ikea.lt/lt/products/svetaine/daiktu-laikymo-sistemos-svetaineje/knygu-spintos/laiva-knygu-lentyna-tamsiai-ruda-art-40178591";

function CreateBookshelf(scene, bookshelfMaterial, potMaterial, material) {
    //bookshelf

    var shelfPosition = -5.9;
    var shelfObj = BABYLON.MeshBuilder.CreateBox("box", { width: 0.2, height: 6, depth: 0.1 }, scene);
    shelfObj.position = new BABYLON.Vector3(shelfPosition, 2.8, -2);

    var shelfObj2 = shelfObj.clone("shelfObj2");
    shelfObj2.position.x = shelfPosition + 1;

    var shelfObj3 = BABYLON.MeshBuilder.CreateBox("box", { width: 1, height: 0.3, depth: 0.1 }, scene);
    shelfObj3.position = new BABYLON.Vector3(shelfPosition + 0.5, 5.64, -2);

    var shelfObj4 = shelfObj3.clone("shelfObj4");
    shelfObj4.position.y = 0.4;

    var shelfLegLeft = BABYLON.Mesh.MergeMeshes([shelfObj, shelfObj3, shelfObj3, shelfObj4, shelfObj2]);
    shelfLegLeft.material = bookshelfMaterial;

    var shelfLegRight = shelfLegLeft.clone("");
    shelfLegRight.position = new BABYLON.Vector3(0, 0, 3);
    
    shelfLegLeft.physicsImpostor = new BABYLON.PhysicsImpostor(shelfLegLeft, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    shelfLegRight.physicsImpostor = new BABYLON.PhysicsImpostor(shelfLegRight, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    
    OnTrigger(scene, shelfLegLeft, bookshelfText1, bookshelfText2, bookshelfText3, bookshelfUrl);
    OnTrigger(scene, shelfLegRight, bookshelfText1, bookshelfText2, bookshelfText3, bookshelfUrl);

    var shelf1, shelf2, shelf3, shelf4, shelf5;

    createShelf(scene, shelf1, 0.5, bookshelfMaterial);
    createShelf(scene, shelf2, 1.7, bookshelfMaterial);
    createShelf(scene, shelf3, 2.9, bookshelfMaterial);
    createShelf(scene, shelf4, 4.1, bookshelfMaterial);
    createShelf(scene, shelf5, 5.3, bookshelfMaterial);

    var book1;

    var bookPurple = "book.obj";
    var bookBlack = "book_black.obj";
    var bookYellow = "book_yellow.obj";

    //yellow books
    CreateBook(scene, bookYellow, book1, -5.7, 4.2, 0.7, 1, 0.7, 1, 0, 0);
    CreateBook(scene, bookYellow, book1, -5.7, 4.35, 0.7, 0.8, 2, 1, 0, 0);

    //bottom shelf books
    CreateBookInShelf(scene, book1, -5.0, 3.5, -1.7);
    CreateBookInShelf(scene, book1, -5.0, 3.5, -1.6);
    CreateBookInShelf(scene, book1, -5.0, 3.5, -1.5);

    CreateSucculent(scene, potMaterial);
    CreateStool(scene, material);
    CreateBigPlant(scene);
    CreateSmallerPlant(scene);
    CreateStorageBox(scene, -5.3, 1.75, 0);
    CreateStorageBox(scene, -5.3, 0.55, -0.9);
    CreatePicFrame3(scene, -5.3, 2.95, 0.2);
    CreateSteve(scene);
}

function createShelf(scene, object, shelfHeight, bookshelfMaterial) {
    var shelfPosition = -5.9;

    object = BABYLON.MeshBuilder.CreateBox("", { width: 1.2, height: 0.1, depth: 3 }, scene);
    object.position = new BABYLON.Vector3(shelfPosition + 0.5, shelfHeight, -0.5);
    object.material = bookshelfMaterial;
    OnTrigger(scene, object, bookshelfText1, bookshelfText2, bookshelfText3, bookshelfUrl);

    object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

}

function CreateSucculent(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "pot.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }
        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        object.position = new BABYLON.Vector3(-5.5, 5.35, -1);
        RotateOnClick(scene, object);

    });
}

async function CreateBookInShelf(scene, object, positionX, positionY, positionZ) {
    await BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "book.obj", scene, function (meshes) {
            var meshArray = [];
            for (var i = 0; i < meshes.length; i++) {
                meshArray.push(meshes[i]);
            }
            var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
            object.position = new BABYLON.Vector3(positionX, positionY, positionZ);

            Dragging(scene, object);
            object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 5 }, scene);

        });
}

function CreateStool(scene, material) {
    var stoolText1 = "MARIUS Stool";
    var stoolText2 = "It can be placed on top of each other so that it does not take up space, but if necessary, there is something to sit the guest on.";
    var stoolText3 = "Easy to assembly and installation";
    var stoolUrl = "https://www.ikea.lt/lt/products/valgomasis/sedimieji-valgomojo-baldai/taburetes/marius-taburete-balta-art-90184047";
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "stool.obj", scene, function (meshes) {
            var meshArray = [];
            for (var i = 0; i < meshes.length; i++) {
                meshArray.push(meshes[i]);
            }
            var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);

            var s = 1.5;
            object.material = material;
            object.rotation = new BABYLON.Vector3(0, Math.PI / 3, 0);
            object.position = new BABYLON.Vector3(-4.8, -0.2, 2.9);
            object.scaling = new BABYLON.Vector3(s, s, s);
            OnTrigger(scene, object, stoolText1, stoolText2, stoolText3, stoolUrl);
            object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

        });
}

function CreateBigPlant(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "big_plant.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }

        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        var s = 1.5;
        object.position = new BABYLON.Vector3(-4.7, -0.2, -6);
        object.scaling = new BABYLON.Vector3(s, s, s);
        object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    });
}

function CreateSmallerPlant(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "smaller_plant.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }

        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        object.position = new BABYLON.Vector3(-5.2, 1, 3);
        object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2 }, scene);
    });
}

function CreateStorageBox(scene, x, y, z) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "box.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }

        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        object.position = new BABYLON.Vector3(x, y, z);

        Dragging(scene, object);
        object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 5 }, scene);

    });
}

function CreatePicFrame3(scene, x, y, z) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "frame3.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            birdFrame = meshes[i];
            meshArray.push(birdFrame);
            var s = 1.3;
            birdFrame.scaling = new BABYLON.Vector3(s, s, s);
            birdFrame.position = new BABYLON.Vector3(x, y, z);
        }
        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        Dragging(scene, object);
        object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 5 }, scene);
    });
}

function CreateSteve(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "minecraft.obj", scene, function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            object = meshes[i];
            var s = 0.3;
            object.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
            object.position = new BABYLON.Vector3(-5.3, 4.55, -0.9);
            Dragging(scene, object);
            object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 5 }, scene);
        }

    });
}