var mouseX = 0,
	mouseY = 0,
	windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2,
	SEPARATION = 200,
	AMOUNTX = 10,
	AMOUNTY = 10,
	camera,
	scene,
	renderer;

$(document).ready(function() {
	init();
	animate();
});
	
	function init() {
		var container, separation = 50,
		particles, particle;

		container = document.createElement('div');
		container.setAttribute("id","content-canvas");
		document.body.appendChild(container);

		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = 500;
		camera.position.y = 300;

		scene = new THREE.Scene();

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild( renderer.domElement );
		
		var PI2 = Math.PI * 2;
		var material = new THREE.ParticleCanvasMaterial( {
			color: 0x000000,
			program: function ( context ) {
				context.beginPath();
				context.arc( 0, 0, 1, 0, PI2, true );
				context.closePath();
				context.fill();
			}

		});
		
		var planeW = 10; // pixels
		var planeH = 10; // pixels 
		var numW = separation; // how many wide (50*50 = 2500 pixels wide)
		var numH = separation; // how many tall (50*50 = 2500 pixels tall)
		var plane = new THREE.Mesh( new THREE.PlaneGeometry( planeW*separation, planeH*separation, planeW, planeH ), new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, opacity: 0.1 } ) );
		plane.material.side = THREE.DoubleSide;
		scene.add(plane);
		
		var parent = new THREE.Object3D();
		plane.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );
		parent.add(plane);
		parent.rotation.x = -Math.PI / 2;
		parent.rotation.z = 0;
		
		var geometry = new THREE.Geometry();

		particle = new THREE.Particle( material );
		particle.position.x = 0;
		particle.position.y = 0;
		particle.position.z = 0;
		particle.position.normalize();
		particle.position.multiplyScalar(50);
		particle.scale.x = particle.scale.y = 2;
		parent.add( particle );
		particle = new THREE.Particle( material );
		particle.position.x = 0;
		particle.position.y = 0;
		particle.position.z = 10;
		particle.position.normalize();
		particle.position.multiplyScalar(50);
		particle.scale.x = particle.scale.y = 3;
		parent.add( particle );

		geometry.vertices.push( particle.position );

		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5 } ) );
		parent.add( line );
		scene.add(parent);
		
		var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 0;
pointLight.position.y = 500;
pointLight.position.z = 1000;

// add to the scene
scene.add(pointLight);
		
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		
		window.addEventListener( 'resize', onWindowResize, false );
	}
	
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	
	function onDocumentMouseMove(event) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}
	
	function animate() {
		requestAnimationFrame( animate );

		render();
	}

	function render() {
		camera.position.x += ( mouseX - camera.position.x ) * .05;
		camera.position.y += ( - mouseY - camera.position.y ) * .05;
		camera.useQuaternion = true;
		camera.lookAt(scene.position);

		renderer.render( scene, camera );
	}