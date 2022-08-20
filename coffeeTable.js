async function CreateCoffeTable(scene) {

    CreateCofTable(scene);
    await CreateVase(scene);
    CreateDonut(scene);

}

function CreateCofTable(scene) {

    var text1 = "BURFORD Coffee table";
    var text2 = "Black powder-coated aluminum that gives the graceful table charm and elegance. Extremely carefully made.";
    var text3 = "Metal adjustable legs so the furniture will stand firmly even on uneven floors.";
    var url = "https://jati-kebon.com/burford-coffee-table-alu-charcoal-mat-70x70-01--000599?fbclid=IwAR1VVA_6CF4LakEIBUnK9MPlNwsrKVOOip76d5tIgFJ_3yAqgTGflVPqZSI";
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "coffee_table.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }
        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        var s = 1.2;

        object.position = new BABYLON.Vector3(2, -0.2, 5.4);
        object.scaling = new BABYLON.Vector3(s, s, s);
        OnTrigger(scene, object, text1, text2, text3, url);

        var collidersVisible = false;
        //////Physics
        var collider = BABYLON.MeshBuilder.CreateBox("", { width: 2.85, height: 0.2, depth: 2.9 }, scene);
        collider.position = new BABYLON.Vector3(2, 1.05, 5.35)
        collider.isVisible = collidersVisible;

        collider.physicsImpostor = new BABYLON.PhysicsImpostor(collider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    });
}

function CreateVase(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "vase.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }

        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        var s = 0.8;
        object.position = new BABYLON.Vector3(2, 1.2, 5.4);
        RotateOnClick(scene, object);

    });
}

function CreateDonut(scene) {
    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "donut.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }
        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);

        var s = 0.8;
        object.rotation = new BABYLON.Vector3(0, Math.PI / 3, 0);
        object.position = new BABYLON.Vector3(2, 1.3, 4.6);
        Dragging(scene, object);
        object.physicsImpostor = new BABYLON.PhysicsImpostor(object, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1 }, scene);

    });
}






