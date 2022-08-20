var colorPickerValue = false;
async function CreateSofa(scene, sofaMaterial) {
    var text1 = "VIMLE Loveseat";
    var text2 = "With the headrest, the backrest of the sofa VIMLE will be slightly higher, so it will be even more comfortable to sit upright. is easy to keep clean as the cover can be removed and washed in the washing machine.";
    var text3 = "10 year warranty. See the warranty booklet for terms and conditions.";
    var url = "https://www.ikea.lt/lt/products/sedimieji-svetaines-baldai/sofos/sofos-lovos/vimle-dviviete-sofa-lova-pilka-spr-39419030";

    await BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "sofa.obj", scene, function (meshes) {
        var meshArray = [];
        for (var i = 0; i < meshes.length; i++) {
            meshArray.push(meshes[i]);
        }
        var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
        object.material = sofaMaterial;

        var s = 2.8;
        object.scaling = new BABYLON.Vector3(s, s, s);
        object.position = new BABYLON.Vector3(0.8, 0, -0.7);
        object.rotation.y = -Math.PI / 2;
        OnTrigger(scene, object, text1, text2, text3, url);

        var collidersVisible = false;
        //////Physics
        var collider = BABYLON.MeshBuilder.CreateBox("", { width: 8, height: 1.0, depth: 3.5 }, scene);
        collider.position = new BABYLON.Vector3(2, 1.3, -0.5);

        collider.isVisible = collidersVisible;
        collider.physicsImpostor = new BABYLON.PhysicsImpostor(collider, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

        var collider2 = BABYLON.MeshBuilder.CreateBox("", { width: 8, height: 1.0, depth: 3.5 }, scene);
        collider2.position = new BABYLON.Vector3(2, 2.5, -1.45);
        collider2.scaling = new BABYLON.Vector3(1, 1.5, 0.4);
        collider2.isVisible = collidersVisible;

        collider2.physicsImpostor = new BABYLON.PhysicsImpostor(collider2, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

        var collider3 = collider2.clone("");
        collider3.position = new BABYLON.Vector3(5.8, 2.2, -0.1);
        collider3.scaling = new BABYLON.Vector3(0.1, 1, 0.5);
        collider3.isVisible = collidersVisible;

        var collider4  = collider3.clone("");
        collider4.position = new BABYLON.Vector3(-1.8, 2.2, -0.1);
        collider4.isVisible = collidersVisible;

    });

}

