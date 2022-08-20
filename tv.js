async function CreateTvTable(scene, material, tvMaterial) {

    CreateTv(scene, tvMaterial);
    CreateScreen(scene);

    //tv table
    var tableLegX = 1.9;
    var tableLegY = 0.4;
    var tableLegZ = 5.65;

    var tvTableTop = BABYLON.MeshBuilder.CreateBox("", { width: 4, height: 0.15, depth: 1.5 }, scene);
    tvTableTop.position = new BABYLON.Vector3(0, 1, 5);

    tvTableTop.physicsImpostor = new BABYLON.PhysicsImpostor(tvTableTop, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    
    var tvTableShelf = tvTableTop.clone("");
    tvTableShelf.scaling.y = 0.5;
    tvTableShelf.position.y = 0.4;

    tvTableShelf.physicsImpostor = new BABYLON.PhysicsImpostor(tvTableShelf, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    var tvTableLeg1 = BABYLON.MeshBuilder.CreateBox("", { width: 0.2, height: 1.2, depth: 0.2 }, scene);
    tvTableLeg1.position = new BABYLON.Vector3(tableLegX, tableLegY, tableLegZ);

    tvTableLeg1.physicsImpostor = new BABYLON.PhysicsImpostor(tvTableLeg1, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);
    

    var tvTableLeg2 = tvTableLeg1.clone("");
    tvTableLeg2.position.x = tableLegX - 3.8;

    var tvTableLeg3 = tvTableLeg2.clone("");
    tvTableLeg3.position = new BABYLON.Vector3(tableLegX - 3.8, tableLegY, tableLegZ - 1.3);

    var tvTableLeg4 = tvTableLeg1.clone("");
    tvTableLeg4.position.z = tableLegZ - 1.3;

    var tvBench = BABYLON.Mesh.MergeMeshes([tvTableTop, tvTableShelf, tvTableLeg1, tvTableLeg2, tvTableLeg3, tvTableLeg4]);
    tvBench.material = material;
    tvBench.position = new BABYLON.Vector3(2, 0, 5.1);

    tvBench.physicsImpostor = new BABYLON.PhysicsImpostor(tvBench, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0 }, scene);

    var tvBenchText1 = "LACK Coffee table";
    var tvBenchText2 = "Living room furniture LACK may seem simple, but don't be fooled. The multi-colored coffee tables, shelves and TV benches are truly incredibly practical.";
    var tvBenchText3 = "Furniture with an involuntary design is easy to adapt in any style of home, it is quick to assemble and reassemble, it is easy to move from one place to another, and when you invent it, you will always do it without high costs.";
    var tvBenchUrl = "https://www.ikea.lt/lt/products/svetaine/kavos-ir-zurnaliniai-staliukai/zurnaliniai-staliukai/lack-kavos-staliukas-tamsiai-ruda-art-00104291";

    
    OnTrigger(scene, tvBench, tvBenchText1, tvBenchText2, tvBenchText3, tvBenchUrl);

}
async function CreateTv(scene, tvMaterial) {

    var tvText1 = "M/i P1 32' Xiaomi Tv";
    var tvText2 = "The Mi TV P1 series is Xiaomi's latest series of smart TVs that makes home entertainment accessible to everyone.";
    var tvText3 = "Voice control, Bluetooth remote control and more!";
    var tvUrl = "https://mi-home.lt/televizorius-xiaomi-mi-tv-p1-32";

    await BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/", "tv.obj", scene, function (meshes) {
        var meshArray = [];
            for (var i = 0; i < meshes.length; i++) {
                meshArray.push(meshes[i]);
            }
            var object = BABYLON.Mesh.MergeMeshes(meshArray, true, true, undefined, false, true);
            var s = 0.9;
            object.scaling = new BABYLON.Vector3(s, s, s);
            object.position = new BABYLON.Vector3(2, 1, 9.3);
            object.rotation.y = Math.PI / 2
            object.material = tvMaterial;

            OnTrigger(scene, object, tvText1, tvText2, tvText3, tvUrl);

    });
}

async function CreateScreen(scene) {
    var planeOpts = {
        height: 2.7,
        width: 4.65,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    };
    var tvScreen = BABYLON.MeshBuilder.CreatePlane("", planeOpts, scene);
    tvScreen.position = (new BABYLON.Vector3(2, 2.75, 10));
    var tvScreenMat = new BABYLON.StandardMaterial("", scene);
    var tvScreenVidTex = new BABYLON.VideoTexture("vidtex", "https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/video.mp4", scene);
    tvScreenMat.diffuseTexture = tvScreenVidTex;
    tvScreenMat.roughness = 1;
    tvScreenMat.emissiveColor = new BABYLON.Color3.White();
    tvScreen.material = tvScreenMat;
    scene.onPointerObservable.add(function (evt) {
        if (evt.pickInfo.pickedMesh === tvScreen) {
            if (tvScreenVidTex.video.paused)
                tvScreenVidTex.video.play();
            else
                tvScreenVidTex.video.pause();
            console.log(tvScreenVidTex.video.paused ? "paused" : "playing");
        }
    }, BABYLON.PointerEventTypes.POINTERPICK);
}
