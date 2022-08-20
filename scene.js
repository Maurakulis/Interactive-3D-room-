// var createScene = function () {

var PopUpOpen = false;
var divCreated = false;
var newDiv;
var lampLight; // public lamp light to be called to turn on or off
var lampLightOn = true; // Lamp light is on when scene loads

var createScene = async function () {

    var scene = new BABYLON.Scene(engine);

    //camera
    var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(60), BABYLON.Tools.ToRadians(60), 25, BABYLON.Vector3.Zero(), scene);

    scene.activeCamera.upperRadiusLimit = 30;

    scene.activeCamera.wheelDeltaPercentage = 0.05;
    camera.panningSensibility = 300;
    camera.upperBetaLimit = Math.PI / 2;

    camera.lowerBetaLimit = 0;

    camera.allowUpsideDown = false;
    camera.checkCollisions = true;

    camera.attachControl(canvas, true);

    /////////////////LIGHT SOURCES
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 10, 0), scene);

    
    //pc spotlight
    var light1 = new BABYLON.SpotLight("spotLigh2t", new BABYLON.Vector3(1, 0, 0), new BABYLON.Vector3(11, 3.7, -2.5), 30, 20, scene);
    light1.diffuse = new BABYLON.Color3(1, 0.82, 0.95);
    light1.specular = new BABYLON.Color3(0, 0, 0);

    //tv light
    var light2 = new BABYLON.SpotLight("spotLigh2t", new BABYLON.Vector3(2, 3, 10), new BABYLON.Vector3(0, -1, -2.5), 90, 40, scene);
    light2.diffuse = new BABYLON.Color3(1, 0.13, 0.74);
    light2.specular = new BABYLON.Color3(0.4, 0.03, 0.57);

    //lamp light
        lampLight = new BABYLON.SpotLight("spotLight", new BABYLON.Vector3(-4, 5.5, 7), new BABYLON.Vector3(0, -1, 0), 30, 10, scene);
        lampLight.diffuse = new BABYLON.Color3(1, 0.93, 0);
        lampLight.specular = new BABYLON.Color3(0, 0, 0);

    //////////////////////////Physics enabling

    await Ammo();
    scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.AmmoJSPlugin());


    //////////////////////////////////BUTTONS

    var stickyDiv = document.createElement("div");
    stickyDiv.className = "stickyDiv";

    var pre = stickyDiv.appendChild(document.createElement("pre"));
    pre.textContent = " Choose room theme";

    stickyDiv.appendChild(pre);
    document.body.appendChild(stickyDiv);

    var stickyButton1 = document.createElement("button");
    var stickyButton2 = document.createElement("button");
    var stickyButton3 = document.createElement("button");

    stickyButton1.className = "stickyButton1";
    stickyDiv.appendChild(stickyButton1);

    stickyButton2.className = "stickyButton2";
    stickyDiv.appendChild(stickyButton2);

    stickyButton3.className = "stickyButton3";
    stickyDiv.appendChild(stickyButton3);

    var stickyText1 = stickyDiv.appendChild(document.createElement("p"));
    stickyText1.textContent = "Try clicking your mouse left and right buttons on different objects in the room.";
    stickyText1.className = "txt";

    stickyDiv.appendChild(stickyText1);

    var stickyText2 = stickyDiv.appendChild(document.createElement("p"));
    stickyText2.textContent = "Smaller objects can be dragged by holding the left mouse button.";
    stickyText2.className = "txt";

    stickyDiv.appendChild(stickyText2);

    //////////////////////////////////// ROOM COLOR THEME
    var wallColor = new BABYLON.Color3.FromHexString("#93acee");

    var sofaColor = new BABYLON.Color3(0.12, 0, 0.12);

    var wallMaterial = new BABYLON.StandardMaterial("backWall", scene);
    wallMaterial.diffuseColor = wallColor;

    var boxMaterial = new BABYLON.StandardMaterial("backWall", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(0.97, 0, 0.4, 0.75);

    //Sofa Material
    var sofaMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
    sofaMaterial.diffuseColor = sofaColor;
    sofaMaterial.emissiveColor = new BABYLON.Color3(0.09, 0, 0.04);
    sofaMaterial.specularColor = new BABYLON.Color3(0.35, 0.1, 0.47);
    sofaMaterial.backFaceCulling = false;

    stickyButton1.onclick = function () {
        wallMaterial.diffuseColor = new BABYLON.Color3.FromHexString("#93acee");;
        sofaMaterial.diffuseColor = new BABYLON.Color3(0.12, 0, 0.12);
    }

    stickyButton2.onclick = function () {
        wallMaterial.diffuseColor = new BABYLON.Color3.FromHexString("#93acae");
        sofaMaterial.diffuseColor = new BABYLON.Color3(0.28, 0.03, 0.03);
    }

    stickyButton3.onclick = function () {
        wallMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);
        sofaMaterial.diffuseColor = new BABYLON.Color3(0, 0.07, 0.19);
    }

    //materials
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.35, 0.35, 0.35);
    groundMaterial.diffuseTexture = new BABYLON.Texture("https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/wood_txt.jpg", scene);

    //table material
    var lampMaterial = new BABYLON.StandardMaterial("", scene);
    lampMaterial.diffuseColor = new BABYLON.Color3(0.11, 0.11, 0.11);
    lampMaterial.specularColor = new BABYLON.Color3(1, 1, 1);

    //lamp material
    var tableMaterial = new BABYLON.StandardMaterial("", scene);
    tableMaterial.diffuseColor = new BABYLON.Color3(0.11, 0.11, 0.11);
    tableMaterial.specularColor = new BABYLON.Color3(0.11, 0.11, 0.11);

    //glass material
    var glass = new BABYLON.PBRMaterial("glass", scene);
    glass.indexOfRefraction = 0.2;
    glass.alpha = 0.4;
    glass.environmentIntensity = 0.7;
    glass.microSurface = 1;
    glass.reflectivityColor = new BABYLON.Color3(0.63, 0.63, 0.63);
    glass.albedoColor = new BABYLON.Color3(0.4, 0.39, 0.39);

    //pot material
    var potMaterial = new BABYLON.StandardMaterial("pot", scene);
    potMaterial.diffuseColor = new BABYLON.Color3(0.45, 0.13, 0);

    //purple color material
    var purple = new BABYLON.StandardMaterial("purple", scene);
    purple.diffuseColor = new BABYLON.Color3(0.34, 0.03, 0.33);
    purple.emissiveColor = new BABYLON.Color3(0.12, 0.02, 0.06);

    var darkerPurple = new BABYLON.StandardMaterial("purple", scene);
    darkerPurple.diffuseColor = new BABYLON.Color3(0.12, 0, 0.12);
    darkerPurple.emissiveColor = new BABYLON.Color3(0.09, 0, 0.04);
    darkerPurple.specularColor = new BABYLON.Color3(0.35, 0.1, 0.47);


    //yellow color material
    var yellow = new BABYLON.StandardMaterial("yellow", scene);
    yellow.diffuseColor = new BABYLON.Color3(0.9, 0.73, 0);
    yellow.emissiveColor = new BABYLON.Color3(0.09, 0, 0.04);
    yellow.specularColor = new BABYLON.Color3(0.38, 0.36, 0.04);

    //white color material
    var white = new BABYLON.StandardMaterial("", scene);
    white.diffuseColor = new BABYLON.Color3(0.87, 0.87, 0.87);
    white.emissiveColor = new BABYLON.Color3(0.31, 0.31, 0.31);

    //picture materials
    var pictureMat = new BABYLON.Texture("https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/I_stand_with_Ukraine.png", scene);
    var pictureMat2 = new BABYLON.Texture("https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/let_it_burn.jpg", scene);
    var pictureMat3 = new BABYLON.Texture("https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/pattern_purple.jpg", scene);
    var pictureMat4 = new BABYLON.Texture("https://raw.githubusercontent.com/Maurakulis/BabylonJS/main/red.jpg", scene);


    //bulb material
    var bulbMat = new BABYLON.StandardMaterial("", scene);
    bulbMat.emissiveColor = new BABYLON.Color3(1, 0.93, 0);
    bulbMat.specularColor = new BABYLON.Color3(1, 0.93, 0);
    bulbMat.diffuseColor = new BABYLON.Color3(1, 0.93, 0);
    /////////////////////////////////////////////////////////
    //room
    CreateRoom(scene, groundMaterial, wallMaterial);

    CreateSofa(scene, sofaMaterial);

    CreateCoffeTable(scene, purple);

    CreateKallax(scene, white, tableMaterial, yellow, purple);

    CreateBookshelf(scene, tableMaterial, potMaterial, white);
    CreateTvTable(scene, tableMaterial, lampMaterial);


    CreateShoeRack(scene, tableMaterial, tableMaterial);

    CreateCorner(scene, sofaMaterial, tableMaterial, pictureMat3, pictureMat4, lampMaterial, bulbMat);
    CreateDesk(scene, tableMaterial, glass, pictureMat, pictureMat2);



    return scene;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////

function Pointer(scene, mesh) {

    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(new BABYLON.SetValueAction(BABYLON.ActionManager.OnPointerOutTrigger, mesh.material, "emissiveColor", mesh.material.emissiveColor));

}

function PopUp(text1, text2, text3, url) {

    if (!divCreated) {
        newDiv = document.createElement("div");
        divCreated = true;
    }

    if (PopUpOpen) {
        // Close
        newDiv.style.display = 'none';
        divCreated = false;
        PopUpOpen = false;
        PopUp(text1, text2, text3);
    }
    else if (!PopUpOpen) {
        newDiv.appendChild(document.createTextNode(text1));

        if (text2 != "") {
            newDiv.appendChild(document.createElement("pre"));
            newDiv.appendChild(document.createTextNode(text2));


            if (text3 != "") {
                newDiv.appendChild(document.createElement("pre"));
                newDiv.appendChild(document.createTextNode(text3));
            }
        }
        newDiv.className = "popUp";

        document.body.appendChild(newDiv);
        PopUpOpen = true;

        //button exit
        var button1 = document.createElement("button");

        button1.className = "exitBtn"
        button1.textContent = " X ";
        newDiv.appendChild(button1);

        button1.onclick = function () {

            newDiv.style.display = 'none';
            divCreated = false;
            PopUpOpen = false;
        }

        //button buy
        var button2 = document.createElement("button");

        button2.className = "buyBtn"
        button2.textContent = " Buy now ";
        newDiv.appendChild(button2);

        button2.onclick = function () {
            window.open(url);
        }
    }

    else
        alert("Something's up with PopUp");

}

function OnTrigger(scene, object, text1, text2, text3, url) {
    object.actionManager = new BABYLON.ActionManager(scene);
    object.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function () {
        PopUp(text1, text2, text3, url);
    }));
}

function TriggerLampLight(scene, object, text1, text2, text3, url) {
    object.actionManager = new BABYLON.ActionManager(scene);

    // Pop Up
    object.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function () {
        PopUp(text1, text2, text3, url);
    }));

    // Light on or off
    object.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, function () {
        if (lampLightOn) {
            lampLight.setEnabled(false);
            lampLightOn = false;
        }
        else if (!lampLightOn) {
            lampLight.setEnabled(true);
            lampLightOn = true;
        }
    }));
}


function Dragging(scene, object) {

    Pointer(scene, object);
    var drag = new BABYLON.PointerDragBehavior({ dragPlaneNormal: new BABYLON.Vector3(0, 1, 0) });
    object.addBehavior(drag);
}

function RotateOnClick(scene, object) {

    object.actionManager = new BABYLON.ActionManager(scene);
    object.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, function () {
        scene.onBeforeRenderObservable.add(() => {
            object.rotation.y += 0.001 * scene.getEngine().getDeltaTime();
        })
    }));
}
