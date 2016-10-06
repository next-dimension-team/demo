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
        // Create wrapping object
        var object = new THREE.Object3D();

        // What the distance between source and destination ?
        var distance = new THREE.Vector3();
        distance.subVectors(destination.position, source.position);

        // Angle
        var angle = -Math.asin(distance.z / distance.x);
        if (isNaN(angle)) angle = Math.PI / 2.0;

        // How long will the lane be ?
        var length = distance.length();

        // Create lane object
        var callGeometry = new THREE.BoxGeometry(length, this.laneWidth, this.laneWidth);
        var callMaterial = new THREE.MeshPhongMaterial();
        callMaterial.color.set("#fff");
        var call = new THREE.Mesh(callGeometry, callMaterial);
        call.receiveShadow = true;
        call.castShadow = true;
        object.add(call);

        // Text
        var text = generate.text(string);
        text.position.y = 1.5;
        object.add(text);

        // Set position
        object.position.x = source.position.x + distance.x / 2.0;
        object.position.y = -10;
        object.position.z = source.position.z + distance.z / 2.0;

        // Set angle
        object.rotation.y = angle;

        // We're done
        return object;
    },
}
