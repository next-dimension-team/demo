var generate = {
    laneWidth: 0.2,

    plane: function() {
        planeGeometry = new THREE.BoxGeometry(20, 10, 1);
        planeMaterial = new THREE.MeshPhongMaterial({
            color: "#ccc",
            side: THREE.DoubleSide
        });
        var object = new THREE.Mesh(planeGeometry, planeMaterial);
        object.receiveShadow = true;
        object.castShadow = true;
        return object;
    },

    lane: function(source, count) {
        var object = new THREE.Object3D();
        var laneLength = 2;
        var gapLength = laneLength/2;
        var laneGeometry = new THREE.BoxGeometry(this.laneWidth, laneLength, this.laneWidth);
        var laneMaterial = new THREE.MeshPhongMaterial( {color: "#fff"} );
        for (var i = 0; i < count; i++) {
            var lane = new THREE.Mesh(laneGeometry, laneMaterial);
            lane.receiveShadow = true;
            lane.castShadow = true;
            object.add(lane);
            lane.position = source.position;
            lane.position.y -= (source.geometry.parameters.height + laneLength) / 2 + (laneLength + gapLength) * i+1;
        }
        object.receiveShadow = true;
        object.castShadow = true;
        return object;
    },

    text: function(string) {
        var fontLoader = new THREE.FontLoader();
        var object = new THREE.Object3D();
        fontLoader.load('https://threejs.org/examples/fonts/gentilis_bold.typeface.json', function (font) {
            textGeometry = new THREE.TextGeometry(string, {
                font: font,
                size: 1.5,
                height: 0.05,
                curveSegments: 10,
            });
            textGeometry.center();
            textMaterial = new THREE.MeshBasicMaterial({
                color: "#eee",
                side: THREE.DoubleSide
            });
            text = new THREE.Mesh(textGeometry, textMaterial);
            text.position.z += 0.55;
            text.receiveShadow = true;
            text.castShadow = true;
            object.add(text);
        });
        object.receiveShadow = true;
        object.castShadow = true;
        return object;
    },

    box: function(string) {
        var box = new THREE.Object3D();

        var plane = generate.plane();
        var lane = generate.lane(plane, 10);
        var text = generate.text(string);

        box.plane = plane;
        box.lane = lane;
        box.text = text;

        box.add(plane);
        box.add(lane);
        box.add(text);

        return box;
    },

    call: function(source, destination, string) {
        var object = new THREE.Object3D();

        laneLength = Math.abs(source.position.x - destination.position.x);
        var callGeometry = new THREE.BoxGeometry(laneLength, this.laneWidth, this.laneWidth);
        var callMaterial = new THREE.MeshPhongMaterial();
        callMaterial.color.set("#fff");
        var call = new THREE.Mesh(callGeometry, callMaterial);
        call.receiveShadow = true;
        call.castShadow = true;
        object.add(call);

        var text = generate.text(string);
        text.position.y = 1.5;
        object.add(text);

        object.position.x = source.position.x + laneLength/2;
        object.position.y = -10;
        object.position.z = source.position.z;

        return object;
    },
}
