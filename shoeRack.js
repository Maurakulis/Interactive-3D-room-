function CreateShoeRack(scene, material, material1) {
    var text1 = "TJUSIG Shoe rack";
    var text2 = "Two shoe racks can be placed on top of each other.";
    var text3 = " Connecting parts are attached.";
    var url = "https://www.ikea.lt/lt/products/miegamojo-baldai/komodos-ir-kiti-baldai/prieskambario-baldai/tjusig-batu-stovas-juoda-art-10152639";

    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "shoe_rack.obj", scene, function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                object = meshes[i];
                var s = 0.8;
                object.scaling = new BABYLON.Vector3(s, s, s);
                object.rotation.y = Math.PI / 2;
                object.position = new BABYLON.Vector3(11.5, 0.6, 7);
                OnTrigger(scene, object, text1, text2, text3, url);

                var collidersVisible = false;
                //////Physics
                var collider = BABYLON.MeshBuilder.CreateBox("", { width: 1.2, height: 0.1, depth: 2.7 }, scene);

                collider.physicsImpostor = new BABYLON.PhysicsImpostor(collider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

                collider.position = new BABYLON.Vector3(11.5, 0.95, 7);
                collider.isVisible = collidersVisible;

                var collider2 = collider.clone("");
                collider2.position = new BABYLON.Vector3(11.5, 0.25, 7);

            }
        });
    CreateCoatRack(scene);
    CreateCloth(scene, material);
    CreateCap(scene);


    CreateShoes(scene, 11.3, 1.17, 7.5);
    CreateShoes(scene, 11.3, 0.45, 6.2);
    CreateShoes2(scene, 11.3, 0.45, 7.5);
    CreateShoes2(scene, 11.3, 1.17, 6.2);
}

function CreateCoatRack(scene) {
    var text1 = "TJUSIG Coat/hat rack";
    var text2 = "TJUSIG series helps you get your jackets, hats, accessories and shoes organized. The clean, simple design made from sustainably sourced solid wood is easy to place and easy to like.";
    var text3 = "Limited space doesn’t mean you have to say no to studying or working from home.";
    var url = "https://www.ikea.lt/lt/products/miegamojo-baldai/komodos-ir-kiti-baldai/prieskambario-baldai/tjusig-kepuriu-kabykla-juoda-art-20152634";

    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "coat_rack.obj", scene, function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                object = meshes[i];
                var s = 0.8;
                object.scaling = new BABYLON.Vector3(s, s, s);
                object.rotation.y = -Math.PI / 2;
                object.position = new BABYLON.Vector3(11.5, 6, 7);
                OnTrigger(scene, object, text1, text2, text3, url);

            }
        });
}

function CreateCloth(scene, material) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "cloth.obj", scene, function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                object = meshes[i];
                var s = 1.5;
                object.scaling = new BABYLON.Vector3(s, s, s);
                object.material = material;

                object.position = new BABYLON.Vector3(11.65, 1.8, 7);
            }
        });
}
function CreateCap(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "cap.obj", scene, function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                object = meshes[i];
                var s = 0.3;
                object.scaling = new BABYLON.Vector3(s, s, s);
                object.position = new BABYLON.Vector3(11.6, 5.2, 8);
            }
        });
}

function CreateShoes(scene, positionX, positionY, positionZ) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "shoe.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }
        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        object.position = new BABYLON.Vector3(positionX, positionY, positionZ);
        Dragging(scene, object);
        object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2 }, scene);

    });
}

function CreateShoes2(scene, positionX, positionY, positionZ) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "shoe2.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }
        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        object.position = new BABYLON.Vector3(positionX, positionY, positionZ);
        Dragging(scene, object);
        object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2 }, scene);

    });
}