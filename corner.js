async function CreateCorner(scene, BeanMaterial, tableMaterial, pictureMaterial, pictureMaterial2, lampMaterial, bulbMat) {
    await BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "bean_bag.obj", scene, function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                object = meshes[i];
                var s = 2;
                object.scaling = new BABYLON.Vector3(s, s, s);
                object.material = BeanMaterial;
                object.rotation.y = 5 * Math.PI / 6;

                object.position = new BABYLON.Vector3(-4, -0.2, 9);
                object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0 }, scene);

            }
        });
    CreateMiniTable(scene, tableMaterial);
    CreatePicFrame(scene, -5.9, 5.2, 8.5, Math.PI / 2, pictureMaterial, pictureMaterial2);
    CreatOpenBook(scene);
    CreateLamp(scene, lampMaterial, bulbMat);

}

async function CreateMiniTable(scene, tableMaterial) {
    var text1 = "KNARREVIK Nightstand";
    var text2 = "This simple black nightstand is a little gem to have at home. Place it next to your bed or sofa, use it in small spaces or easily move it around for a more flexible home!";
    var text3 = "Practical storage space underneath the tabletop.";
    var url = "https://www.ikea.lt/lt/products/miegamasis/naktiniai-staliukai/naktiniai-staliukai/knarrevik-naktinis-staliukas-juoda-art-30381183";

    await BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "mini_table.obj", scene, function (meshes) {
            var meshArray = [];
            for (var i = 0; i < meshes.length; i++) {
                meshArray.push(meshes[i]);
            }
            var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);

            object.position = new BABYLON.Vector3(-1.4, -0.2, 10.2);

            object.material = tableMaterial;
            OnTrigger(scene, object, text1, text2, text3, url);
            object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

        });
}

function CreatOpenBook(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "book_yellow.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }
        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        var s = 0.8;
        object.scaling = new BABYLON.Vector3(s, s, s);
        object.rotation = new BABYLON.Vector3(0, Math.PI / 3, 0);
        object.position = new BABYLON.Vector3(-1.6, 2, 10.3);
        Dragging(scene, object);
        object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 5 }, scene);

    });
}

function CreatePicFrame(scene, x, y, z, rotY, pictureMaterial, pictureMaterial2) {
    var frame;
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "frame.obj", scene, function (meshes) {
            meshArray = [];
            for (var i = 0; i < meshes.length; i++) {
                meshArray.push(meshes[i]);
            }
            frame = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
            frame.scaling = new BABYLON.Vector3(1.7, 1.8, 1);
            frame.rotation.y = rotY;
            frame.position = new BABYLON.Vector3(x, y, z);

        });

    var plane1 = BABYLON.MeshBuilder.CreatePlane("plane", { width: 3, height: 3.9, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    plane1.rotation.y = rotY;
    plane1.position = new BABYLON.Vector3(x, y, z);
    plane1.material = new BABYLON.StandardMaterial("mat", scene);

    plane1.material.diffuseTexture = pictureMaterial;

    var frameValue = true;
    plane1.actionManager = new BABYLON.ActionManager(scene);
    plane1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, function () {
        if (frameValue) {
            plane1.material.diffuseTexture = pictureMaterial2;
            frameValue = false;

        }
        else if (!frameValue) {
            plane1.material.diffuseTexture = pictureMaterial;
            frameValue = true;

        }
    }));
    var rotationValue = true;

    if (plane1.material.diffuseTexture == "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/I_stand_with_Ukraine.png") {
        plane1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function () {
            window.open("https://blue-yellow.lt/");

        }));
    }
    else if (plane1.material.diffuseTexture == "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/pattern_purple.jpg") {
        plane1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function () {
            if (rotationValue) {
                plane1.rotation.z = BABYLON.Tools.ToRadians(12);
                frame.rotation.z = BABYLON.Tools.ToRadians(12);
                rotationValue = false;
            }
            else if (!rotationValue) {
                plane1.rotation.z = BABYLON.Tools.ToRadians(0);
                frame.rotation.z = BABYLON.Tools.ToRadians(0);
                rotationValue = true;

            }

        }));
    }

}

function CreateLamp(scene, lampMaterial, bulbMat) {
    var lampText1 = "HEKTAR Floor Lamp";
    var lampText2 = "Probably will not surprise anyone by saying that HEKTAR luminaires have been inspired by industrial lighting solutions. Specifically, chandeliers that are commonly seen in factories or theaters.";
    var lampText3 = "It's design perfectly combines what is durable and practical with a distinctive, stage-worthy look.";
    var lampUrl = "https://www.ikea.lt/lt/products/svetaine/svetaines-apsvietimas/pastatomi-sviestuvai/hektar-grindinis-sviestuvas-tamsiai-pilka-art-00215307";
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "hektar2.obj", scene, function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                object = meshes[i];
                object.material = lampMaterial;
                object.position = new BABYLON.Vector3(-4, -0.2, 6);
                object.rotation = new BABYLON.Vector3(0, Math.PI / 3, 0);
                TriggerLampLight(scene, object, lampText1, lampText2, lampText3, lampUrl);
                object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
            }
        });

    var sphere = BABYLON.MeshBuilder.CreateSphere("", { diameter: 0.6 }, scene);

    sphere.position = new BABYLON.Vector3(-4.07, 4.5, 6.1);
    sphere.material = bulbMat;
}