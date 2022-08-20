function CreateDesk(scene, material, glassMaterial, pictureMat, pictureMat2) {

    var text1 = "ALEX/MALVAKT Desk";
    var text2 = "Limited space doesn’t mean you have to say no to studying or working from home.";
    var text3 = " This desk takes up little floor space yet still has a drawer unit where you can store papers and other important items.";
    var url = "https://www.ikea.lt/lt/products/vaiku-ikea/paaugliams/rasomieji-stalai/alex-malvakt-rasomasis-stalas-balta-juoda-spr-69440011";

    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "alex.obj", scene, function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                object = meshes[i];
                var s = 1.1;
                object.material = material;
                object.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
                object.position = new BABYLON.Vector3(11, -0.3, -2.5);
                object.scaling = new BABYLON.Vector3(s, s, s);
                OnTrigger(scene, object, text1, text2, text3, url);

                object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0 }, scene);

            }
        });
    CreatePc(scene, material);
    CreateOfficeChair(scene);
    CreateGlass(scene, glassMaterial, -0.5);
    CreateBin(scene);
    CreatePicFrame(scene, 10.1, 5.2, -7.4, 0, pictureMat, pictureMat2);

}

function CreatePc(scene, material) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "pc.obj", scene, function (meshes) {
            var meshArray = [];
            for (var i = 0; i < meshes.length; i++) {
                meshArray.push(meshes[i]);
            }
            var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
            var s = 0.8;
            object.rotation = new BABYLON.Vector3(0, -Math.PI / 2, 0);
            object.position = new BABYLON.Vector3(11, 4.7, -2.5);
            object.scaling = new BABYLON.Vector3(s, s, s);

            Dragging(scene, object);
            object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2 }, scene);

        });
}

async function CreateOfficeChair(scene) {
    var text1 = "MILLBERGET Swivel chair";
    var text2 = "This chair offers comfort and function when you’re working at the desk. It’s also elegant, generous and blends easily with your living room or bedroom decor.";
    var text3 = "The castors react to the pressure, so they roll easily only when you sit on the chair, and when you get up from it, they lock and prevent the chair from moving.";
    var url = "https://www.ikea.lt/lt/products/vaiku-ikea/paaugliams/biuro-kedes-namams/millberget-sukamoji-kede-juoda-art-70489394";

    await BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "office_chair.obj", scene, function (meshes) {
        for (var i = 0; i < meshes.length; i++) {
            object = meshes[i];
            var s = 1.8;

            object.rotation = new BABYLON.Vector3(0, 5 * Math.PI / 6, 0);
            object.position = new BABYLON.Vector3(8.9, -0.2, -3);
            object.scaling = new BABYLON.Vector3(s, s, s);
            OnTrigger(scene, object, text1, text2, text3, url);
            object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.MeshImpostor, { mass: 0 }, scene);
        }
    });
}

function CreateGlass(scene, glassMaterial, positionZ) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "pahar.obj", scene, function (meshes) {
            var meshArray = [];
            for (var i = 0; i < meshes.length; i++) {
                meshArray.push(meshes[i]);
            }
            var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
            var s = 0.4;
            object.scaling = new BABYLON.Vector3(s, s, s);
            object.material = glassMaterial;
            object.position = new BABYLON.Vector3(10, 3.1, positionZ);
            Dragging(scene, object);
            object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 2 }, scene);
        });
}

function CreateBin(scene) {
    var text1 = "FNISS Trash can";
    var text2 = "Plastic is a durable material which is simple to wipe clean.";
    var text3 = "";
    var url = "https://www.ikea.lt/lt/products/virtuve/atlieku-rusiavimas/rusiavimo-siuksliadezes/fniss-siuksliadeze-balta-art-40295439";

    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/",
        "bin.obj", scene, function (meshes) {
            for (var i = 0; i < meshes.length; i++) {
                object = meshes[i];
                var s = 1.5;

                object.position = new BABYLON.Vector3(10.5, 0.15, 1.5);
                object.scaling = new BABYLON.Vector3(s, s, s);
                OnTrigger(scene, object, text1, text2, text3, url);
                object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

            }
        });
}