import PolylineCommon from './PolylineCommon.js';

// rewrite the shaders to make PolylineMaterialAppearance accept per-instance color attribute
const vs = `${PolylineCommon}
attribute vec3 position3DHigh;
attribute vec3 position3DLow;
attribute vec3 prevPosition3DHigh;
attribute vec3 prevPosition3DLow;
attribute vec3 nextPosition3DHigh;
attribute vec3 nextPosition3DLow;
attribute vec2 expandAndWidth;
attribute vec2 st;
attribute float batchId;
attribute vec4 color;

varying float v_width;
varying vec2 v_st;
varying float v_polylineAngle;
varying vec4 v_color;

void main()
{
    float expandDir = expandAndWidth.x;
    float width = abs(expandAndWidth.y) + 0.5;
    bool usePrev = expandAndWidth.y < 0.0;

    vec4 p = czm_computePosition();
    vec4 prev = czm_computePrevPosition();
    vec4 next = czm_computeNextPosition();

    float angle;
    vec4 positionWC = getPolylineWindowCoordinates(p, prev, next, expandDir, width, usePrev, angle);
    gl_Position = czm_viewportOrthographic * positionWC;

    v_width = width;
    v_st.s = st.s;
    v_st.t = czm_writeNonPerspective(st.t, gl_Position.w);
    v_polylineAngle = angle;
    v_color = color;
}
        `;

const fs = `
#ifdef VECTOR_TILE
uniform vec4 u_highlightColor;
#endif

varying vec2 v_st;
varying vec4 v_color;

void main()
{
    czm_materialInput materialInput;

    vec2 st = v_st;
    st.t = czm_readNonPerspective(st.t, gl_FragCoord.w);

    materialInput.s = st.s;
    materialInput.st = st;
    materialInput.str = vec3(st, 0.0);

    czm_material material = czm_getMaterial(materialInput);
    gl_FragColor = vec4((material.diffuse + material.emission) * v_color.rgb, material.alpha * v_color.w);
#ifdef VECTOR_TILE
    gl_FragColor *= u_highlightColor;
#endif

    czm_writeLogDepth();
}
        `;

const Mode = {
	TRANSLATE: 0,
	ROTATE: 1,
	SCALE: 2,
	UNIFORM_SCALE: 3,
};

function getScaleFromTransform(m) {
	const scalex = Math.sqrt(m[0] * m[0] + m[1] * m[1] + m[2] * m[2]);
	const scaley = Math.sqrt(m[4] * m[4] + m[5] * m[5] + m[6] * m[6]);
	const scalez = Math.sqrt(m[8] * m[8] + m[9] * m[9] + m[10] * m[10]);
	return [scalex, scaley, scalez];
}

// modified from PolylineArrowMaterial.glsl, change the arrow to a rectangle
const scaleMaterial = new Cesium.Material({
	fabric: {
		uniforms: {
			color: Cesium.Color.WHITE,
		},
		source: `
      #ifdef GL_OES_standard_derivatives
#extension GL_OES_standard_derivatives : enable
#endif

uniform vec4 color;

czm_material czm_getMaterial(czm_materialInput materialInput)
{
    czm_material material = czm_getDefaultMaterial(materialInput);

    vec2 st = materialInput.st;

#ifdef GL_OES_standard_derivatives
    float base = 1.0 - abs(fwidth(st.s)) * 10.0 * czm_pixelRatio;
#else
    float base = 0.975; // 2.5% of the line will be the arrow head
#endif

    vec2 center = vec2(1.0, 0.5);
    float ptOnUpperLine = 1.0;
    float ptOnLowerLine = 0.0;

    float halfWidth = 0.15;
    float s = step(0.5 - halfWidth, st.t);
    s *= 1.0 - step(0.5 + halfWidth, st.t);
    s *= 1.0 - step(base, st.s);

    float t = step(base, materialInput.st.s);
    t *= 1.0 - step(ptOnUpperLine, st.t);
    t *= step(ptOnLowerLine, st.t);

    // Find the distance from the closest separator (region between two colors)
    float dist;
    if (st.s < base)
    {
        float d1 = abs(st.t - (0.5 - halfWidth));
        float d2 = abs(st.t - (0.5 + halfWidth));
        dist = min(d1, d2);
    }
    else
    {
        float d1 = czm_infinity;
        if (st.t < 0.5 - halfWidth && st.t > 0.5 + halfWidth)
        {
            d1 = abs(st.s - base);
        }
        float d2 = abs(st.t - ptOnUpperLine);
        float d3 = abs(st.t - ptOnLowerLine);
        dist = min(min(d1, d2), d3);
    }

    vec4 outsideColor = vec4(0.0);
    vec4 currentColor = mix(outsideColor, color, clamp(s + t, 0.0, 1.0));
    vec4 outColor = czm_antialias(outsideColor, color, currentColor, dist);

    outColor = czm_gammaCorrect(outColor);
    material.diffuse = outColor.rgb;
    material.alpha = outColor.a;
    return material;
}
`,
	},
});

function addMouseEvent(handler, viewer, scope) {
	let pickedObject = null;

	handler.setInputAction(function (movement) {
		const picked = viewer.scene.pick(movement.position);
		if (Cesium.defined(picked)) {
			// console.log(picked);
			if (picked.primitive === scope) {
				// scope.item._allowPicking = false;
				pickedObject = picked;
				viewer.scene.screenSpaceCameraController.enableRotate = false; // lock default map control
				viewer.scene.screenSpaceCameraController.enableTranslate = false;
				if (typeof scope.onDragStart === 'function') {
					scope.onDragStart();
				}
			} else {
				// if (pickedObject) scope.item._allowPicking = false;
				pickedObject = null;
				viewer.scene.screenSpaceCameraController.enableRotate = true; // release default map control
				viewer.scene.screenSpaceCameraController.enableTranslate = true;
			}
		}
	}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

	handler.setInputAction(function () {
		if (pickedObject) {
			// scope.item._allowPicking = true;
			pickedObject.primitive.xColor = Cesium.Color.RED;
			pickedObject.primitive.yColor = Cesium.Color.GREEN;
			pickedObject.primitive.zColor = Cesium.Color.BLUE;
			pickedObject = null;
			if (typeof scope.onDragEnd === 'function') {
				scope.onDragEnd();
			}
		}

		viewer.scene.screenSpaceCameraController.enableRotate = true; // release default map control
		viewer.scene.screenSpaceCameraController.enableTranslate = true;
	}, Cesium.ScreenSpaceEventType.LEFT_UP);

	handler.setInputAction(function (movement) {
		if (!pickedObject) {
			const hovered = viewer.scene.pick(movement.endPosition);

			// highlight the hovered axis
			if (Cesium.defined(hovered) && hovered.primitive === scope) {
				if (scope.type === Mode.UNIFORM_SCALE) {
					viewer.canvas.style.cursor = 'pointer';
					scope.xColor = scope._highlightColor;
					scope.yColor = scope._highlightColor;
					scope.zColor = scope._highlightColor;
				} else {
					switch (hovered.id.axis) {
						case 'x':
							scope.xColor = scope._highlightColor;
							scope.yColor = scope._yOriginColor;
							scope.zColor = scope._zOriginColor;
							viewer.canvas.style.cursor = 'pointer';
							break;
						case 'y':
							scope.yColor = scope._highlightColor;
							scope.xColor = scope._xOriginColor;
							scope.zColor = scope._zOriginColor;
							viewer.canvas.style.cursor = 'pointer';
							break;
						case 'z':
							scope.zColor = scope._highlightColor;
							scope.xColor = scope._xOriginColor;
							scope.yColor = scope._yOriginColor;
							viewer.canvas.style.cursor = 'pointer';
							break;
						default:
							scope.xColor = scope._xOriginColor;
							scope.yColor = scope._yOriginColor;
							scope.zColor = scope._zOriginColor;
							viewer.canvas.style.cursor = 'default';
							break;
					}
				}
			} else {
				viewer.canvas.style.cursor = 'default';
				scope.xColor = scope._xOriginColor;
				scope.yColor = scope._yOriginColor;
				scope.zColor = scope._zOriginColor;
			}

			return;
		}

		const m = scope.modelMatrix;
		const origin = new Cesium.Cartesian3(m[12], m[13], m[14]); // item's cartesian coordinates
		const transform = Cesium.Transforms.eastNorthUpToFixedFrame(origin); // east, north, up is the positive direction of x, y, z axis
		// coords on the canvas
		const windowOrigin = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
			viewer.scene,
			origin,
			new Cesium.Cartesian2()
		);
		// the mouse's movement direction
		const mouseDirection = new Cesium.Cartesian2(
			movement.endPosition.x - movement.startPosition.x,
			movement.endPosition.y - movement.startPosition.y
		);
		if (mouseDirection.x === 0 && mouseDirection.x === 0) return;

		const minimumScale = 0.001;

		if (scope.type === Mode.TRANSLATE) {
			const translation = new Cesium.Matrix4(); // the translation matrix
			const targetPoint = new Cesium.Cartesian3(); // new point after translating
			const transVector = new Cesium.Cartesian3(); // the translation vector

			switch (pickedObject.id.axis) {
				case 'x':
					Cesium.Matrix4.multiplyByPoint(
						transform,
						Cesium.Cartesian3.UNIT_X,
						targetPoint
					);
					break;
				case 'y':
					Cesium.Matrix4.multiplyByPoint(
						transform,
						Cesium.Cartesian3.UNIT_Y,
						targetPoint
					);
					break;
				case 'z':
					Cesium.Matrix4.multiplyByPoint(
						transform,
						Cesium.Cartesian3.UNIT_Z,
						targetPoint
					);
					break;
				default:
					break;
			}

			Cesium.Cartesian3.subtract(targetPoint, origin, transVector); // the same as Cesium.Matrix4.multiplyByVector(transform, AXIS_UNIT_VECTOR, result)

			// target coords on the canvas
			const windowEnd = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
				viewer.scene,
				targetPoint,
				new Cesium.Cartesian2()
			);

			// the axis' direction on the canvas
			const direction = Cesium.Cartesian2.subtract(
				windowEnd,
				windowOrigin,
				new Cesium.Cartesian2()
			);

			// whether the mouse is moving in the positive direction of the axis
			const angle = Cesium.Cartesian2.angleBetween(
				mouseDirection,
				direction
			);
			const isMouseMoveInPositive =
				angle < Cesium.Math.PI_OVER_TWO ? 1 : -1;

			const movePixelsAlongAxis =
				Cesium.Cartesian2.magnitude(mouseDirection) *
				Math.abs(Math.cos(angle));

			const metersPerPixel = viewer.camera.getPixelSize(
				new Cesium.BoundingSphere(
					origin,
					Cesium.Cartesian3.magnitude(transVector)
				),
				viewer.canvas.width,
				viewer.canvas.height
			);

			Cesium.Matrix4.fromTranslation(
				Cesium.Cartesian3.multiplyByScalar(
					transVector,
					isMouseMoveInPositive *
						metersPerPixel *
						movePixelsAlongAxis,
					new Cesium.Cartesian3()
				),
				translation
			);

			const tmp = Cesium.Matrix4.multiply(
				translation,
				scope.modelMatrix,
				new Cesium.Matrix4()
			);

			// apply translation
			scope.modelMatrix[12] = tmp[12];
			scope.modelMatrix[13] = tmp[13];
			scope.modelMatrix[14] = tmp[14];

			if (typeof scope.onDragMoving === 'function') {
				scope.onDragMoving({
					type: Mode.TRANSLATE,
					result: new Cesium.Cartesian3(tmp[12], tmp[13], tmp[14]),
				});
			}

			if (scope.applyTransform) {
				const item = scope.item;
				item.modelMatrix[12] = tmp[12];
				item.modelMatrix[13] = tmp[13];
				item.modelMatrix[14] = tmp[14];
			}
		} else if (scope.type === Mode.ROTATE) {
			const startVector = Cesium.Cartesian2.subtract(
				new Cesium.Cartesian2(
					movement.startPosition.x,
					movement.startPosition.y
				),
				windowOrigin,
				new Cesium.Cartesian2()
			);
			const endVector = Cesium.Cartesian2.subtract(
				new Cesium.Cartesian2(
					movement.endPosition.x,
					movement.endPosition.y
				),
				windowOrigin,
				new Cesium.Cartesian2()
			);

			// get the mouse movement direction
			const isCounterClockWise =
				Cesium.Cartesian2.cross(startVector, endVector) < 0 ? 1 : -1; // y axis is downwards on the canvas
			let isCameraOnPositiveAxis;
			const angle = Cesium.Cartesian2.angleBetween(
				startVector,
				endVector
			);
			const org2Camera = Cesium.Cartesian3.subtract(
				viewer.scene.camera.position,
				origin,
				new Cesium.Cartesian3()
			);

			const rotation = new Cesium.Matrix3();

			const axis = new Cesium.Cartesian3();

			switch (pickedObject.id.axis) {
				case 'x':
					Cesium.Matrix4.multiplyByPointAsVector(
						scope.modelMatrix,
						Cesium.Cartesian3.UNIT_X,
						axis
					);
					isCameraOnPositiveAxis =
						Cesium.Cartesian3.dot(axis, org2Camera) > 0 ? 1 : -1;

					Cesium.Matrix3.fromRotationX(
						angle * isCameraOnPositiveAxis * isCounterClockWise,
						rotation
					);
					break;
				case 'y':
					Cesium.Matrix4.multiplyByPointAsVector(
						scope.modelMatrix,
						Cesium.Cartesian3.UNIT_Y,
						axis
					);
					isCameraOnPositiveAxis =
						Cesium.Cartesian3.dot(axis, org2Camera) > 0 ? 1 : -1;

					Cesium.Matrix3.fromRotationY(
						angle * isCameraOnPositiveAxis * isCounterClockWise,
						rotation
					);
					break;
				case 'z':
					Cesium.Matrix4.multiplyByPointAsVector(
						scope.modelMatrix,
						Cesium.Cartesian3.UNIT_Z,
						axis
					);
					isCameraOnPositiveAxis =
						Cesium.Cartesian3.dot(axis, org2Camera) > 0 ? 1 : -1;

					Cesium.Matrix3.fromRotationZ(
						angle * isCameraOnPositiveAxis * isCounterClockWise,
						rotation
					);
					break;
				default:
					break;
			}

			// apply rotation to the editor, modelMatrix includes the translation
			Cesium.Matrix4.multiplyByMatrix3(
				scope.modelMatrix,
				rotation,
				scope.modelMatrix
			);
			const scaleValue = getScaleFromTransform(scope.item.modelMatrix);

			// calculate the item's new modelMatrix
			const finalTransform = Cesium.Matrix4.multiply(
				scope.modelMatrix,
				Cesium.Matrix4.fromScale(
					new Cesium.Cartesian3(
						scaleValue[0],
						scaleValue[1],
						scaleValue[2]
					)
				),
				new Cesium.Matrix4()
			);

			if (typeof scope.onDragMoving === 'function') {
				scope.onDragMoving({
					type: Mode.ROTATE,
					result: Cesium.Transforms.fixedFrameToHeadingPitchRoll(
						finalTransform
					),
				});
			}

			if (scope.applyTransform) {
				Cesium.Matrix4.clone(finalTransform, scope.item.modelMatrix);
			}
		} else if (scope.type === Mode.SCALE) {
			const scaleMatrix = new Cesium.Matrix4();
			const targetPoint = new Cesium.Cartesian3();
			const windowEnd = new Cesium.Cartesian2();
			const direction = new Cesium.Cartesian2(); // the axis' direction on the canvas

			const oldScale = getScaleFromTransform(scope.item.modelMatrix);

			switch (pickedObject.id.axis) {
				case 'x':
					Cesium.Matrix4.multiplyByPoint(
						scope.modelMatrix,
						Cesium.Cartesian3.UNIT_X,
						targetPoint
					);

					Cesium.SceneTransforms.wgs84ToDrawingBufferCoordinates(
						viewer.scene,
						targetPoint,
						windowEnd
					);
					Cesium.Cartesian2.subtract(
						windowEnd,
						windowOrigin,
						direction
					);

					// whether the mouse moves along the positive direction
					const scalex =
						Cesium.Cartesian2.dot(direction, mouseDirection) > 0
							? 1.05
							: 0.95;

					if (oldScale[0] <= minimumScale && scalex === 0.95) return;

					Cesium.Matrix4.fromScale(
						new Cesium.Cartesian3(scalex, 1, 1),
						scaleMatrix
					);

					break;
				case 'y':
					Cesium.Matrix4.multiplyByPoint(
						scope.modelMatrix,
						Cesium.Cartesian3.UNIT_Y,
						targetPoint
					);

					Cesium.SceneTransforms.wgs84ToDrawingBufferCoordinates(
						viewer.scene,
						targetPoint,
						windowEnd
					);
					Cesium.Cartesian2.subtract(
						windowEnd,
						windowOrigin,
						direction
					);

					const scaley =
						Cesium.Cartesian2.dot(direction, mouseDirection) > 0
							? 1.05
							: 0.95;

					Cesium.Matrix4.fromScale(
						new Cesium.Cartesian3(1, scaley, 1),
						scaleMatrix
					);

					if (oldScale[1] <= minimumScale && scaley === 0.95) return;
					break;
				case 'z':
					Cesium.Matrix4.multiplyByPoint(
						scope.modelMatrix,
						Cesium.Cartesian3.UNIT_Z,
						targetPoint
					);

					Cesium.SceneTransforms.wgs84ToDrawingBufferCoordinates(
						viewer.scene,
						targetPoint,
						windowEnd
					);
					Cesium.Cartesian2.subtract(
						windowEnd,
						windowOrigin,
						direction
					);

					const scalez =
						Cesium.Cartesian2.dot(direction, mouseDirection) > 0
							? 1.05
							: 0.95;

					Cesium.Matrix4.fromScale(
						new Cesium.Cartesian3(1, 1, scalez),
						scaleMatrix
					);
					if (oldScale[2] <= minimumScale && scalez === 0.95) return;
					break;

				default:
					break;
			}

			const finalTransform = Cesium.Matrix4.multiply(
				scope.item.modelMatrix,
				scaleMatrix,
				new Cesium.Matrix4()
			);
			if (typeof scope.onDragMoving === 'function') {
				scope.onDragMoving({
					type: Mode.SCALE,
					result: getScaleFromTransform(finalTransform),
				});
			}

			if (scope.applyTransform) {
				Cesium.Matrix4.clone(finalTransform, scope.item.modelMatrix);
			}
		} else if (scope.type === Mode.UNIFORM_SCALE) {
			const windowOriginToMouseVecotr = Cesium.Cartesian2.subtract(
				new Cesium.Cartesian2(
					movement.startPosition.x,
					movement.startPosition.y
				),
				windowOrigin,
				new Cesium.Cartesian2()
			);

			// whether the mouse moves outward
			const scale =
				Cesium.Cartesian2.dot(
					windowOriginToMouseVecotr,
					mouseDirection
				) > 0
					? 1.05
					: 0.95;

			const scaleMatrix = Cesium.Matrix4.fromUniformScale(
				scale,
				new Cesium.Matrix4()
			);

			const oldScale = getScaleFromTransform(scope.item.modelMatrix);
			if (oldScale[0] <= minimumScale && scale === 0.95) return;

			const finalTransform = Cesium.Matrix4.multiply(
				scope.item.modelMatrix,
				scaleMatrix,
				new Cesium.Matrix4()
			);

			if (typeof scope.onDragMoving === 'function') {
				scope.onDragMoving({
					type: Mode.SCALE,
					result: getScaleFromTransform(finalTransform),
				});
			}

			if (scope.applyTransform) {
				Cesium.Matrix4.clone(finalTransform, scope.item.modelMatrix);
			}
		}
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

/**
 *
 *
 * @alias TransformControls
 * @constructor
 *
 * @param {Object} [options] Object with the following properties:
 * @param {Number} [options.length=300.0] The length of the axes in pixels.
 * @param {Number} [options.width=20] The width of the axes in pixels.
 * @param {Cesium.Matrix4} [options.modelMatrix=Cesium.Matrix4.IDENTITY] The 4x4 matrix that defines the reference frame, i.e., origin plus axes, to visualize.
 * @param {Boolean} [options.show=true] Determines if this primitive will be shown.
 * @param {Object} [options.id] A user-Cesium.defined object to return when the instance is picked with {@link Scene#pick}
 * @param {Cesium.Color} [options.xColor=Cesium.Color.RED] Cesium.Color for axis x
 * @param {Cesium.Color} [options.yColor=Cesium.Color.GREEN] Cesium.Color for axis y
 * @param {Cesium.Color} [options.zColor=Cesium.Color.BLUE] Cesium.Color for axis z
 *
 * @example
 * primitives.add(new Cesium.TransformControls({
 *   modelMatrix : primitive.modelMatrix,  // primitive to debug
 *   length : 300.0,
 *   width : 20.0
 * }));
 */
function TransformControls(options) {
	options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT);

	if (!Cesium.defined(options.viewer))
		new Cesium.DeveloperError('Viewer must be assigned!');
	if (!Cesium.defined(options.item))
		new Cesium.DeveloperError('Item must be assigned!');
	if (!Cesium.defined(options.item.modelMatrix))
		new Cesium.DeveloperError('Item must have the modelMatrix attribute!');

	this.viewer = options.viewer;
	this.item = options.item;

	/**
	 * The length of the axes in meters.
	 *
	 * @type {Number}
	 * @default 300.0
	 */
	this.length = Cesium.defaultValue(options.length, 300.0);
	this._length = undefined;

	/**
	 * The width of the axes in pixels.
	 *
	 * @type {Number}
	 * @default 20
	 */
	this.width = Cesium.defaultValue(options.width, 20);
	this._width = undefined;

	/**
	 * Determines if this primitive will be shown.
	 *
	 * @type Boolean
	 * @default true
	 */
	this.show = Cesium.defaultValue(options.show, true);

	/**
	 * User-Cesium.defined value returned when the primitive is picked.
	 *
	 * @type {*}
	 * @default undefined
	 *
	 * @see Scene#pick
	 */
	this.id = options.id;
	this._id = undefined;

	this.type = Cesium.defaultValue(options.type, Mode.TRANSLATE);
	this._type = undefined;

	this.xColor = Cesium.defaultValue(options.xColor, Cesium.Color.RED);
	this._xColor = undefined;
	this._xOriginColor = this.xColor;
	this.yColor = Cesium.defaultValue(options.yColor, Cesium.Color.GREEN);
	this._yColor = undefined;
	this._yOriginColor = this.yColor;
	this.zColor = Cesium.defaultValue(options.zColor, Cesium.Color.BLUE);
	this._zColor = undefined;
	this._zOriginColor = this.zColor;
	this.highlightColor = Cesium.defaultValue(
		options.highlightColor,
		Cesium.Color.YELLOW
	);
	this._highlightColor = undefined;

	this._primitive = undefined;

	this._itemMatrix = options.item.modelMatrix.clone();

	this.applyTransform = Cesium.defaultValue(options.applyTransform, true);

	this.onDragMoving = options.onDragMoving;
	this.onDragStart = options.onDragStart;
	this.onDragEnd = options.onDragEnd;

	this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);

	this.viewer.scene.primitives.add(this);

	addMouseEvent(this.handler, this.viewer, this);
}

const scratchBoundingSphere = new Cesium.BoundingSphere();

function scaleInPixels(positionWC, radius, frameState) {
	scratchBoundingSphere.center = positionWC;
	scratchBoundingSphere.radius = radius;
	return frameState.camera.getPixelSize(
		scratchBoundingSphere,
		frameState.context.drawingBufferWidth,
		frameState.context.drawingBufferHeight
	);
}

const scratchPosition = new Cesium.Cartesian3();
const scratchCartographic = new Cesium.Cartographic();

function getScale(model, frameState) {
	// Compute size of bounding sphere in pixels
	const context = frameState.context;
	const maxPixelSize = Math.max(
		context.drawingBufferWidth,
		context.drawingBufferHeight
	);
	const m = model.modelMatrix;
	scratchPosition.x = m[12];
	scratchPosition.y = m[13];
	scratchPosition.z = m[14];

	if (frameState.camera._scene.mode !== Cesium.SceneMode.SCENE3D) {
		const projection = frameState.mapProjection;
		const cartographic = projection.ellipsoid.cartesianToCartographic(
			scratchPosition,
			scratchCartographic
		);
		projection.project(cartographic, scratchPosition);
		Cesium.Cartesian3.fromElements(
			scratchPosition.z,
			scratchPosition.x,
			scratchPosition.y,
			scratchPosition
		);
	}

	const radius = 1;

	const metersPerPixel = scaleInPixels(scratchPosition, radius, frameState);

	// metersPerPixel is always > 0.0
	const pixelsPerMeter = 1.0 / metersPerPixel;
	const diameterInPixels = Math.min(
		pixelsPerMeter * 2.0 * radius,
		maxPixelSize
	);

	let scale = 1;
	// Maintain model's minimum pixel size
	if (diameterInPixels < model.length) {
		scale = (model.length * metersPerPixel) / (2.0 * radius);
	}

	// console.log(scale)

	return scale;
}

/**
 * @private
 */
TransformControls.prototype.update = function (frameState) {
	if (!this.show) {
		return;
	}

	if (
		!Cesium.defined(this._primitive) ||
		!Cesium.Matrix4.equals(this._itemMatrix, this.item.modelMatrix) || // watch the item's model matrix
		this._length !== this.length ||
		this._width !== this.width ||
		this._id !== this.id ||
		this._xColor !== this.xColor ||
		this._yColor !== this.yColor ||
		this._zColor !== this.zColor ||
		this._type !== this.type ||
		this._highlightColor !== this.highlightColor
	) {
		// if (this._type !== this.type) {
		if (this.type === Mode.TRANSLATE) {
			// reset the editor's modelMatrix to make the translation indicators point to axises
			const m = this.item.modelMatrix;
			const itemPos = new Cesium.Cartesian3(m[12], m[13], m[14]);
			this.modelMatrix =
				Cesium.Transforms.eastNorthUpToFixedFrame(itemPos);
		} else if (
			this.type === Mode.ROTATE ||
			this.type === Mode.SCALE ||
			this.type === Mode.UNIFORM_SCALE
		) {
			const m = this.item.modelMatrix.clone();
			const scale = getScaleFromTransform(m);

			// remove the scaling transform but keep the translation and rotation
			// shouldn't be zero
			if (scale[0] === 0 || scale[1] === 0 || scale[2] === 0) {
				new Cesium.DeveloperError(
					"Can't get transform infomation from modelMatrix since scale is 0."
				);
			}
			m[0] /= scale[0];
			m[1] /= scale[0];
			m[2] /= scale[0];
			m[4] /= scale[1];
			m[5] /= scale[1];
			m[6] /= scale[1];
			m[8] /= scale[2];
			m[9] /= scale[2];
			m[10] /= scale[2];

			this.modelMatrix = m;
		} else {
			if (Cesium.defined(this._primitive)) {
				this._primitive.destroy();
			}
			return;
		}
		// }

		this._itemMatrix = this.item.modelMatrix.clone();

		this._length = this.length;
		this._width = this.width;
		this._id = this.id;
		this._xColor = this.xColor;
		this._yColor = this.yColor;
		this._zColor = this.zColor;
		this._type = this.type;
		this._highlightColor = this.highlightColor;

		if (Cesium.defined(this._primitive)) {
			this._primitive.destroy();
		}

		// Workaround projecting (0, 0, 0)
		if (
			this.modelMatrix[12] === 0.0 &&
			this.modelMatrix[13] === 0.0 &&
			this.modelMatrix[14] === 0.0
		) {
			this.modelMatrix[14] = 0.01;
		}

		const axisMatrix = Cesium.Matrix4.IDENTITY.clone();
		axisMatrix[14] = 0.01;

		let material,
			xpoints = [],
			ypoints = [],
			zpoints = [];

		if (
			this.type === Mode.TRANSLATE ||
			this.type === Mode.SCALE ||
			this.type === Mode.UNIFORM_SCALE
		) {
			material = Cesium.Material.fromType('PolylineArrow');
			xpoints = [Cesium.Cartesian3.ZERO, Cesium.Cartesian3.UNIT_X];
			ypoints = [Cesium.Cartesian3.ZERO, Cesium.Cartesian3.UNIT_Y];
			zpoints = [Cesium.Cartesian3.ZERO, Cesium.Cartesian3.UNIT_Z];
			if (this.type !== Mode.TRANSLATE) {
				material = scaleMaterial;
			}
		} else if (this.type === Mode.ROTATE) {
			material = Cesium.Material.fromType('Color', {
				color: Cesium.Color.WHITE,
			});
			const counts = 64;
			for (let i = 0; i <= counts; i += 1) {
				xpoints.push(
					Cesium.Matrix3.multiplyByVector(
						Cesium.Matrix3.fromRotationX(
							(i * (2 * Cesium.Math.PI)) / counts
						),
						Cesium.Cartesian3.UNIT_Y,
						new Cesium.Cartesian3()
					)
				);
			}
			for (let i = 0; i <= counts; i += 1) {
				ypoints.push(
					Cesium.Matrix3.multiplyByVector(
						Cesium.Matrix3.fromRotationY(
							(i * (2 * Cesium.Math.PI)) / counts
						),
						Cesium.Cartesian3.UNIT_Z,
						new Cesium.Cartesian3()
					)
				);
			}
			for (let i = 0; i <= counts; i += 1) {
				zpoints.push(
					Cesium.Matrix3.multiplyByVector(
						Cesium.Matrix3.fromRotationZ(
							(i * (2 * Cesium.Math.PI)) / counts
						),
						Cesium.Cartesian3.UNIT_X,
						new Cesium.Cartesian3()
					)
				);
			}
		}

		const width = this.type === Mode.ROTATE ? this.width / 2 : this.width;

		const x = new Cesium.GeometryInstance({
			geometry: new Cesium.PolylineGeometry({
				positions: xpoints,
				width: width,
				vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
				arcType: Cesium.ArcType.NONE,
			}),
			modelMatrix: axisMatrix,
			id: {
				axis: 'x',
			},
			pickPrimitive: this,
			attributes: {
				color: Cesium.ColorGeometryInstanceAttribute.fromColor(
					this.xColor
				),
				depthFailColor: Cesium.ColorGeometryInstanceAttribute.fromColor(
					Cesium.Color.multiplyByScalar(
						this.xColor,
						0.5,
						new Cesium.Color()
					)
				),
			},
		});
		const y = new Cesium.GeometryInstance({
			geometry: new Cesium.PolylineGeometry({
				positions: ypoints,
				width: width,
				vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
				arcType: Cesium.ArcType.NONE,
			}),
			modelMatrix: axisMatrix,
			id: {
				axis: 'y',
			},
			pickPrimitive: this,
			attributes: {
				color: Cesium.ColorGeometryInstanceAttribute.fromColor(
					this.yColor
				),
				depthFailColor: Cesium.ColorGeometryInstanceAttribute.fromColor(
					Cesium.Color.multiplyByScalar(
						this.yColor,
						0.5,
						new Cesium.Color()
					)
				),
			},
		});
		const z = new Cesium.GeometryInstance({
			geometry: new Cesium.PolylineGeometry({
				positions: zpoints,
				width: width,
				vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
				arcType: Cesium.ArcType.NONE,
			}),
			modelMatrix: axisMatrix,
			id: {
				axis: 'z',
			},
			pickPrimitive: this,
			attributes: {
				color: Cesium.ColorGeometryInstanceAttribute.fromColor(
					this.zColor
				),
				depthFailColor: Cesium.ColorGeometryInstanceAttribute.fromColor(
					Cesium.Color.multiplyByScalar(
						this.zColor,
						0.5,
						new Cesium.Color()
					)
				),
			},
		});

		const appearance = new Cesium.PolylineMaterialAppearance({
			material: material,
			vertexShaderSource: vs,
			fragmentShaderSource: fs,
		});

		this._primitive = new Cesium.Primitive({
			geometryInstances: [x, y, z],
			appearance: appearance,
			depthFailAppearance: appearance,
			asynchronous: false,
			releaseGeometryInstances: false,
		});
	}

	const scale = getScale(this, frameState);

	const scaledMatrix = Cesium.Matrix4.multiplyByUniformScale(
		this.modelMatrix,
		scale,
		new Cesium.Matrix4()
	);

	this._primitive.modelMatrix = scaledMatrix;

	this._primitive.update(frameState);
};

/**
 * Returns true if this object was destroyed; otherwise, false.
 * <p>
 * If this object was destroyed, it should not be used; calling any function other than
 * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.
 * </p>
 *
 * @returns {Boolean} <code>true</code> if this object was destroyed; otherwise, <code>false</code>.
 *
 * @see TransformControls#destroy
 */
TransformControls.prototype.isDestroyed = function () {
	return false;
};

/**
 * Destroys the WebGL resources held by this object.  Destroying an object allows for deterministic
 * release of WebGL resources, instead of relying on the garbage collector to destroy this object.
 * <p>
 * Once an object is destroyed, it should not be used; calling any function other than
 * <code>isDestroyed</code> will result in a {@link DeveloperError} exception.  Therefore,
 * assign the return value (<code>undefined</code>) to the object as done in the example.
 * </p>
 *
 * @exception {DeveloperError} This object was destroyed, i.e., destroy() was called.
 *
 * @example
 * p = p && p.destroy();
 *
 * @see TransformControls#isDestroyed
 */
TransformControls.prototype.destroy = function () {
	this.handler.destroy();
	this._primitive = this._primitive && this._primitive.destroy();
	return Cesium.destroyObject(this);
};

TransformControls.Mode = Object.freeze(Mode);

export default TransformControls;
