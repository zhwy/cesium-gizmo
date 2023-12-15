import SuperGif from 'libgif';

/* eslint-disable */
const maxDisplayDistance = 10000;
const modelUrl = process.env.VUE_APP_MODEL_URL;
const tdtToken$1 = process.env.VUE_APP_Tdt_Token || '16db5f2b05abef1bc22c88924a318eb0';
const generatePrimitive = (geometryInstances, appearance, processDepth) => {
  if (processDepth) {
    let failAppearance = appearance;
    if (!processDepth.disable) {
      //禁用深度检测，被覆盖时仍显示原来纹理
      failAppearance = processDepth.failAppearance;
    }
    return new Cesium.Primitive({
      geometryInstances: geometryInstances,
      appearance: appearance,
      depthFailAppearance: failAppearance
    });
  } else {
    return new Cesium.Primitive({
      geometryInstances: geometryInstances,
      appearance: appearance
    });
  }
};
const generateLabel = (collection, labelParams) => {
  let defaultParams = {
    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
    verticalOrigin: Cesium.VerticalOrigin.BASELINE,
    eyeOffset: new Cesium.Cartesian3(0, 10, 10),
    pixelOffset: new Cesium.Cartesian2(0, 0),
    font: '15px sans-serif',
    disableDepthTestDistance: 0,
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, maxDisplayDistance),
    fillColor: Cesium.Color.fromCssColorString('rgba(255,255,255,1)')
  };
  Object.assign(defaultParams, labelParams);
  collection.add(defaultParams);
};

const P = {
  //底图配置
  basemapConfig: {
    1: {
      url: `https://t{sub}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${tdtToken$1}`,
      // url: `https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tdtToken}`,
      constructor: 'UrlTemplateImageryProvider'
    },
    2: {
      url: 'https://dev.virtualearth.net',
      constructor: 'BingMapsImageryProvider',
      key: 'An1y8QhGgOj1gW5yfdfpgNSQ10QuXAwKlpCNcB7M0t9alhk9JbEUfHSa-X9JZ4hc'
    },
    3: {
      url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}&s=Gali&scale=2',
      constructor: 'UrlTemplateImageryProvider',
      tileHeight: 512,
      tileWidth: 512
    },
    4: {
      url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer',
      constructor: 'ArcGisMapServerImageryProvider'
    },
    5: {
      url: 'https://services.arcgisonline.com/arcgis/rest/services/ESRI_Imagery_World_2D/MapServer',
      constructor: 'ArcGisMapServerImageryProvider',
      tileHeight: 512,
      tileWidth: 512
    },
    6: {
      url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer',
      constructor: 'ArcGisMapServerImageryProvider'
    },
    7: {
      url: 'https://webst0{sub}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      constructor: 'UrlTemplateImageryProvider'
    },
    8: {
      url:
        'https://gss0.bdstatic.com/5bwHcj7lABFV8t_jkk_Z1zRvfdw6buu/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46&udt=20210224',
      constructor: 'UrlTemplateImageryProvider'
    },
    9: [
      {
        url: `https://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${tdtToken$1}`,
        constructor: 'UrlTemplateImageryProvider'
      },
      {
        url: `https://t0.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tdtToken$1}`,
        constructor: 'UrlTemplateImageryProvider'
      },
    ],
    10: {
      url: 'https://webst0{sub}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
      constructor: 'UrlTemplateImageryProvider'
    },
    11: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      constructor: 'UrlTemplateImageryProvider'
    },
    12: {
      url:
        'https://api.mapbox.com/styles/v1/zyshiw01/clft1q9hb004q01mh3e0drhiw/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoienlzaGl3MDEiLCJhIjoiY2xmcms5MXhmMDczeTNzbWkxbmpweHkxbiJ9.zjzdKkRO2KlyzKVtuUb9Vg',
      constructor: 'UrlTemplateImageryProvider',
      maximumLevel: 18,
      tileHeight: 512,
      tileWidth: 512
    },
    13: {
      url: 'https://online{s}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
      constructor: 'UrlTemplateImageryProvider',
      maximumLevel: 18
    },
    14: {
      url: 'https://api.mapbox.com/styles/v1/zyshiw01/clft08bkv000301qxy9e92dsk/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoienlzaGl3MDEiLCJhIjoiY2xmcms5MXhmMDczeTNzbWkxbmpweHkxbiJ9.zjzdKkRO2KlyzKVtuUb9Vg',
      constructor: 'UrlTemplateImageryProvider',
      maximumLevel: 18,
      tileHeight: 512,
      tileWidth: 512
    },
    15: [
      {
        url: '/ais/cf8cb8de21ad4acbad82699732eae3fc/wmts/tile/1.0.0/default/default028mm/{z}/{y}/{x}.png?token=62be2fb973554df7bd7648614a937bf2',
        constructor: 'UrlTemplateImageryProvider'
      },
      {
        url: '/ais/4d0ee1c2dae549c7906d1fdc0b51d42c/wmts/tile/1.0.0/default/default028mm/{z}/{y}/{x}.png?token=e384c9a0a0e84dba8323ed1a865c4784',
        constructor: 'UrlTemplateImageryProvider'
      },
      {
        url: 'https://webst0{sub}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}',
        constructor: 'UrlTemplateImageryProvider'
      }
      // {
      //   url: `https://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${tdtToken}`,
      //   constructor: 'UrlTemplateImageryProvider'
      // },
      // {
      //   url: `https://t0.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tdtToken}`,
      //   constructor: 'UrlTemplateImageryProvider'
      // },
    ],
    16: {
      url: 'https://api.mapbox.com/styles/v1/zyshiw01/clft0tfzz000301tf1ap3pipa/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoienlzaGl3MDEiLCJhIjoiY2xmcms5MXhmMDczeTNzbWkxbmpweHkxbiJ9.zjzdKkRO2KlyzKVtuUb9Vg',
      constructor: 'UrlTemplateImageryProvider',
      maximumLevel: 18,
      tileHeight: 512,
      tileWidth: 512
    }
  },
  defaultSkyBox: null, // 天空盒参数
  terrain: '',
  skyBoxParams: {}, // 天空信息，月亮、太阳、近地天空高度
  basemapParams: {},
  billboardPictures: {}, //标签图片，在billboardPicture.js设置
  shipTypes: {
    jizhuangxiang: 0,
    youlun: 1,
    huolun: 2,
    youlun2: 3
  },
  shipParams: {
    0: {
      url: modelUrl + '运泥船.glb',
      scale: 0.5,
      heightOffset: 0.6
    }
  },
  shipGroupName: {},
  initialView: {
    orientation: {
      heading: 6.278280431768557,
      pitch: -0.8586496375599695,
      roll: 6.283185307175419
    },
    destination: Cesium.Cartesian3.fromDegrees(119.076078, 34.339472, 591847),
    duration: 5
  },
  //默认位置
  defaultView: {
    destination: Cesium.Cartesian3.fromDegrees(121.56037983031811, 31.283648634637874, 1477.0008685298349),
    orientation: {
      heading: 5.993664123639975,
      pitch: -0.1965450902300101,
      roll: 6.282318455032698
    },
    duration: 0
  },
  staticItemTypes: {
    simplePoint: 0,
    modelPoint: 1,
    modelPoints: 2,
    modelPointsInstance: 3,
    labelPoint: 7,
    labelPoints: 9,
    modelLabel: 9,
    sameColorLine: 10,
    diffColorLine: 11,
    dashLine: 12,
    timeTrailLine: 19,
    waterSurface: 99,
    sameColorPolygon: 20,
    diffColorPolygon: 21,
    timeTrailPolygon: 28,
    timeTrailDiffPolygon: 29,
    imageRectangle: 30
  },
  highlightColor: Cesium.Color.fromCssColorString('rgba(255,0,0,1)'),
  //静态数据样式
  staticItemStyles: {
    0: {
      //单一点
      styleFunction: (geojson, highlightItem, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let labels;
        if (attr.ifLabel) {
          labels = new Cesium.LabelCollection();
        }
        let points = new Cesium.PointPrimitiveCollection();

        let color = attr.color;

        geojson.features.forEach(feature => {
          let coord = feature.geometry.coordinates;
          let position = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2] || attr.heightOffset || 1);

          points.add({
            position: position,
            id: typeof attr.id == 'function' ? attr.id(feature.properties) : feature.properties,
            color: color,
            pixelSize: attr.pixelSize
          });

          if (attr.ifLabel) {
            let labelParams = {
              position: position,
              text: feature.properties.Text
            };
            Object.assign(attr.ifLabel, labelParams);
            generateLabel(labels, attr.ifLabel);
          }
        });
        layer.add(points);
        layer.add(labels);
        return layer;
      }
    },
    1: {
      //模型点
      styleFunction: (geojson, highlightItem, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let labels;
        if (attr.ifLabel) {
          labels = new Cesium.LabelCollection();
        }
        let coord = attr.coordinates;
        let position = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2] || attr.heightOffset || 0);

        let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
          position,
          new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(attr.rotation || 0), 0, 0)
        );
        let near = attr.near || 0,
          far = attr.far || 1000;
        let displayDistance = new Cesium.DistanceDisplayCondition(near, far);
        let model = Cesium.Model.fromGltf({
          id: attr.name,
          url: modelUrl + attr.modelName,
          modelMatrix: modelMatrix,
          scale: attr.scale || 1,
          minimumPixelSize: attr.minimumPixelSize,
          maximumScale: attr.maximumScale,
          shadows: Cesium.ShadowMode.ENABLED,
          distanceDisplayCondition: displayDistance,
          debugShowBoundingVolume: attr.debug,
          heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
        });
        layer.add(model);
        if (attr.ifLabel) {
          let labelParams = {
            position: position,
            distanceDisplayCondition: displayDistance
          };
          Object.assign(attr.ifLabel, labelParams);
          generateLabel(labels, attr.ifLabel);
          layer.add(labels);
        }
        return layer;
      }
    },
    2: {
      //多模型点
      styleFunction: (geojson, highlightItem, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let adjustHeading = attr.adjustHeading || 0;
        geojson.features.forEach(feature => {
          let coord = feature.geometry.coordinates;
          let position = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2] || attr.heightOffset || 0);
          let heading = (feature.properties.Heading || 0) + adjustHeading,
            scale = feature.properties.Scale || attr.scale || 1;
          let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
            position,
            new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(heading), 0, 0)
          );

          let near = attr.near || 0,
            far = attr.far || 1000;
          let displayDistance = new Cesium.DistanceDisplayCondition(near, far);
          let model = Cesium.Model.fromGltf({
            id: typeof attr.id == 'function' ? attr.id(feature.properties) : feature.properties,
            url: modelUrl + (feature.properties.ModelName || attr.modelName),
            modelMatrix: modelMatrix,
            scale: scale,
            shadows: Cesium.ShadowMode.ENABLED,
            distanceDisplayCondition: displayDistance,
            debugShowBoundingVolume: attr.debug
          });
          layer.add(model);
        });
        return layer;
      }
    },
    3: {
      //多模型点instance加载
      styleFunction: (geojson, viewer, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let adjustHeading = attr.adjustHeading || 0;
        let instances = [],
          labels;
        if (attr.ifLabel) {
          labels = new Cesium.LabelCollection();
        }
        geojson.features.forEach(feature => {
          let coord = feature.geometry.coordinates;
          let position = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2] || attr.heightOffset || 0);
          let heading = (feature.properties.Heading || 0) + adjustHeading,
            scale = feature.properties.Scale || attr.scale || 1;
          let modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
            position,
            new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(heading), 0, 0)
          );
          let scaleMatrix = Cesium.Matrix4.fromUniformScale(scale);
          modelMatrix = Cesium.Matrix4.multiply(modelMatrix, scaleMatrix, new Cesium.Matrix4());
          instances.push({
            modelMatrix: modelMatrix,
            batchId: typeof attr.id == 'function' ? attr.id(feature.properties) : feature.properties
          });
          //图标
          if (attr.ifLabel) {
            let labelParams = {
              position: position,
              color: attr.ifLabel.color,
              text: feature.properties.Text
            };
            Object.assign(attr.ifLabel, labelParams);
            generateLabel(labels, attr.ifLabel);
          }
        });
        let collection = new Cesium.ModelInstanceCollection({
          url: modelUrl + attr.modelName,
          instances: instances,
          dynamic: false,
          lightColor: attr.lightColor,
          luminanceAtZenith: attr.luminanceAtZenith || 0.5,
          debugShowBoundingVolume: attr.debug
        });
        if (attr.animate) {
          viewer.clock.shouldAnimate = true;
          collection.readyPromise
            .then(c => {
              // Play and loop all animations
              c.activeAnimations.addAll({
                multiplier: 1,
                loop: attr.animate.repeat || Cesium.ModelAnimationLoop.REPEAT
              });
            })
            .otherwise(error => {
              console.error('模型动画出错', error);
            });
        }

        layer.add(collection);
        if (attr.ifLabel) layer.add(labels);
        return layer;
      }
    },
    7: {
      // 多个文字
      styleFunction: (empty, highlightItem, attrs) => {
        let layer = new Cesium.LabelCollection();
        attrs.points.forEach(pt => {
          let position = Cesium.Cartesian3.fromDegrees(pt.coordinates[0], pt.coordinates[1], pt.coordinates[2]);
          let labelParams = {
            position: position
          };
          Object.assign(pt.label, labelParams);
          generateLabel(layer, pt.label);
        });

        return layer;
      }
    },
    8: {
      // 多个文字，geojson文件
      styleFunction: (geojson, highlightItem, attr) => { }
    },
    9: {
      //模型点图标
      styleFunction: (geojson, highlightItem, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let labels = new Cesium.LabelCollection();
        let length = 60;
        //圆锥
        // let coneInstances = [];
        // let cylinderGeometry = new Cesium.CylinderGeometry({
        //     length: length,
        //     topRadius: 30.0,
        //     bottomRadius: 0.0,
        //     vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
        // });
        geojson.features.forEach(feature => {
          let coord = feature.geometry.coordinates;
          let position = Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2] || attr.heightOffset || 1);
          labels.add({
            position: position,
            text: feature.properties.Text,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            eyeOffset: new Cesium.Cartesian3(0, 60, -10),
            pixelOffset: new Cesium.Cartesian2(0, -5),
            font: '15px sans-serif',
            disableDepthTestDistance: 0,
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, maxDisplayDistance),
            fillColor: Cesium.Color.fromCssColorString('orange')
          });
          //圆锥instance
          let modelMatrix = Cesium.Matrix4.multiplyByTranslation(
            Cesium.Transforms.eastNorthUpToFixedFrame(position),
            new Cesium.Cartesian3(0.0, 0.0, length),
            new Cesium.Matrix4()
          );
          layer.add(
            Cesium.Model.fromGltf({
              url: modelUrl + 'label.gltf',
              modelMatrix: modelMatrix,
              scale: 100
              // debugShowBoundingVolume: true
            })
          );
          // coneInstances.push(new Cesium.GeometryInstance({
          //     geometry: cylinderGeometry,
          //     modelMatrix: modelMatrix,
          //     attributes: {
          //         color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.fromCssColorString("#fdbf6f")),
          //     },
          // }))
        });
        // layer.add(new Cesium.Primitive({
        //     geometryInstances: coneInstances,
        //     appearance: new Cesium.PerInstanceColorAppearance({
        //         closed: true,
        //         translucent: false,
        //     }),
        // }))
        layer.add(labels);
        return layer;
      }
    },
    10: {
      //线集合使用同一颜色
      styleFunction: (geojson, highlightItem, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let lineInstances = [];
        let labels;
        if (attr.ifLabel) labels = new Cesium.LabelCollection();
        geojson.features.forEach(feature => {
          let coordinates = feature.geometry.coordinates;
          //多类型处理
          let geoType = feature.geometry.type.toUpperCase();
          if (geoType.includes('LINE') && !geoType.includes('MULTI')) {
            coordinates = [coordinates];
          }

          coordinates.forEach(array => {
            let positions = array.map(coord => {
              return Cesium.Cartesian3.fromDegrees(coord[0], coord[1], attr.heightOffset || 0);
            });
            //线
            let polyline = new Cesium.GeometryInstance({
              geometry: new Cesium.PolylineGeometry({
                positions: positions,
                width: attr.width || 1
              }),
              id: typeof attr.id == 'function' ? attr.id(feature.properties) : feature.properties
            });

            lineInstances.push(polyline);
          });

          //文字
          if (attr.ifLabel) {
            let center = turf.center(feature).geometry.coordinates;
            let pos = Cesium.Cartesian3.fromDegrees(center[0], center[1], 0);
            let labelParams = {
              position: pos,
              text: feature.properties.Text
            };
            Object.assign(attr.ifLabel, labelParams);
            generateLabel(labels, attr.ifLabel);
          }
        });
        if (attr.ifLabel) layer.add(labels);

        let appearance = new Cesium.PolylineMaterialAppearance({
          material: Cesium.Material.fromType('Color', {
            color: attr.color
          })
        });

        if (attr.processDepth && !attr.processDepth.disable) {
          //设置深度检测失败样式
          attr.processDepth.failAppearance = new Cesium.PolylineMaterialAppearance({
            material: Cesium.Material.fromType('Color', {
              color: attr.processDepth.color
            })
          });
        }

        let primitive = generatePrimitive(lineInstances, appearance, attr.processDepth);

        layer.add(primitive);

        return layer;
      }
    },
    11: {
      //线集合使用不同颜色
      styleFunction: (geojson, highlightItem, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let lineInstances = {};
        let labels;
        if (attr.ifLabel) labels = new Cesium.LabelCollection();

        geojson.features.forEach(feature => {
          let type = feature.properties.Type;
          let coordinates = feature.geometry.coordinates;
          //多类型处理
          let geoType = feature.geometry.type.toUpperCase();
          if (geoType.includes('LINE') && !geoType.includes('MULTI')) {
            coordinates = [coordinates];
          }
          if (!lineInstances.hasOwnProperty(type)) {
            lineInstances[type] = [];
          }
          coordinates.forEach(coordinate => {
            let positions = coordinate.map(coord => {
              return Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2] || attr.heightOffset || 0.1);
            });
            //线
            let polyline = new Cesium.GeometryInstance({
              geometry: new Cesium.PolylineGeometry({
                positions: positions,
                width: attr.width || 1
              }),
              id: typeof attr.id == 'function' ? attr.id(feature.properties) : feature.properties
            });
            lineInstances[type].push(polyline);
            //图标
            if (attr.ifLabel) {
              let center = turf.centroid(feature).geometry.coordinates;
              let pos = Cesium.Cartesian3.fromDegrees(center[0], center[1], 0);
              labels.add({
                position: pos,
                text: feature.properties.Text,
                eyeOffset: new Cesium.Cartesian3(0, 10, 10),
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                pixelOffset: new Cesium.Cartesian2(0, -5),
                font: '15px sans-serif',
                disableDepthTestDistance: 0,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, maxDisplayDistance),
                fillColor: Cesium.Color.fromCssColorString('white'),
                showBackground: false,
                backgroundColor: new Cesium.Color(0, 0, 0, 0)
              });
            }
          });
        });

        for (var type in lineInstances) {
          let color = attr.colors(type) || Cesium.Color.fromCssColorString('rgba(255,255,255,1)');
          let appearance = new Cesium.PolylineMaterialAppearance({
            material: Cesium.Material.fromType('Color', {
              color: color
            })
          });
          if (attr.processDepth && !attr.processDepth.disable) {
            //设置深度检测失败样式
            attr.processDepth.failAppearance = new Cesium.PolylineMaterialAppearance({
              material: Cesium.Material.fromType('Color', {
                color: attr.processDepth.color
              })
            });
          }
          let primitive = generatePrimitive(lineInstances[type], appearance, attr.processDepth);
          layer.add(primitive);
        }

        if (attr.ifLabel) layer.add(labels);

        return layer;
      }
    },
    12: {
      //同一颜色虚线
      styleFunction: (geojson, highlightItem, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let lineInstances = [];

        geojson.features.forEach(feature => {
          let positions = feature.geometry.coordinates.map(coord => {
            return Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2] || attr.heightOffset || 0.1);
          });
          //线
          let polyline = new Cesium.GeometryInstance({
            id: feature.properties,
            geometry: new Cesium.PolylineGeometry({
              positions: positions,
              width: attr.width || 1
            })
            // attributes: {
            //     color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
            // }
          });
          lineInstances.push(polyline);
        });

        layer.add(
          new Cesium.Primitive({
            geometryInstances: lineInstances,
            appearance: new Cesium.PolylineMaterialAppearance({
              material: Cesium.Material.fromType('PolylineDash', {
                color: attr.color
              })
            })
            // depthFailAppearance: new Cesium.PolylineMaterialAppearance({
            //     material: Cesium.Material.fromType('PolylineDash', {
            //         color: Cesium.Color.fromCssColorString("rgba(0,255,0,1)")
            //     }),
            // }),
          })
        );
        return layer;
      }
    },
    19: {
      //流体线
      styleFunction: (geojson, viewer, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let lineInstances = [];

        geojson.features.forEach(feature => {
          let positions = feature.geometry.coordinates.map(coord => {
            return Cesium.Cartesian3.fromDegrees(coord[0], coord[1], coord[2] || attr.heightOffset || 0.1);
          });

          let polyline = new Cesium.GeometryInstance({
            id: feature.properties,
            geometry: new Cesium.PolylineGeometry({
              positions: positions,
              width: attr.width || 1
            })
          });
          lineInstances.push(polyline);
        });

        let appearance = new Cesium.PolylineMaterialAppearance({
          material: Cesium.Material.fromType(Cesium.Material.PolylineTrailType2, {
            color: attr.color,
            duration: attr.duration,
            image: attr.image,
            repeat: attr.repeat || 1,
            length: attr.length || 1,
            time: 0
          })
        });

        let primitive = generatePrimitive(lineInstances, appearance);
        layer.add(primitive);

        //流动起来
        viewer.scene.preRender.addEventListener(() => {
          if (primitive.appearance.material.uniforms.time == Number.MAX_VALUE)
            primitive.appearance.material.uniforms.time = 0;
          else primitive.appearance.material.uniforms.time++;
        });
        return layer;
      }
    },
    20: {
      //面使用同一种颜色
      styleFunction: (geojson, highlightItem, attr, success) => {
        let layer = new Cesium.PrimitiveCollection();
        let polygonInstances = [];
        let labels,
          lineInstances = [];
        if (attr.ifLabel) labels = new Cesium.LabelCollection();

        let promise = Cesium.GeoJsonDataSource.load(geojson);
        promise.then(ds => {
          ds.entities.values.forEach(entity => {
            let polygon = entity.polygon;
            let geometry = new Cesium.PolygonGeometry({
              polygonHierarchy: polygon.hierarchy._value,
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
              height: attr.heightOffset || 0.1
            });
            polygonInstances.push(
              new Cesium.GeometryInstance({
                geometry: geometry,
                id: typeof attr.id == 'function' ? attr.id(entity.properties) : entity.properties
              })
            );
            //文字
            if (attr.ifLabel) {
              let feature = geojson.features.find(fea => {
                return fea.properties[attr.ifLabel.idString] == entity.properties[attr.ifLabel.idString].getValue();
              });
              let center = turf.center(feature).geometry.coordinates;
              let pos = Cesium.Cartesian3.fromDegrees(center[0], center[1], 0);
              let labelParams = {
                position: pos,
                text: entity.properties.Text.getValue()
              };
              Object.assign(attr.ifLabel, labelParams);
              generateLabel(labels, attr.ifLabel);
            }
            if (attr.outline) {
              let positions = polygon.hierarchy._value.positions.map(pos => {
                let carto = Cesium.Cartographic.fromCartesian(pos);
                carto.height += attr.outline.heightOffset || attr.heightOffset || 0.1;
                return Cesium.Cartographic.toCartesian(carto);
              });
              let line = new Cesium.GeometryInstance({
                id: typeof attr.id == 'function' ? attr.id(entity.properties) : entity.properties,
                geometry: new Cesium.PolylineGeometry({
                  positions: positions,
                  width: attr.outline.width || 1
                })
              });
              lineInstances.push(line);
            }
          });

          let polygonApperance = new Cesium.EllipsoidSurfaceAppearance({
            material: Cesium.Material.fromType('Color', {
              color: attr.color
            })
          });
          if (attr.processDepth && !attr.processDepth.disable) {
            //设置深度检测失败样式
            attr.processDepth.failAppearance = new Cesium.EllipsoidSurfaceAppearance({
              material: Cesium.Material.fromType('Color', {
                color: attr.processDepth.color
              })
            });
          }

          let primitive = generatePrimitive(polygonInstances, polygonApperance, attr.processDepth);
          layer.add(primitive);

          if (attr.outline) {
            let type = attr.outline.dash ? 'PolylineDash' : 'Color';
            let outlineappearance = new Cesium.PolylineMaterialAppearance({
              material: Cesium.Material.fromType(type, {
                color: attr.outline.color
              })
            });
            if (attr.outline.processDepth && !attr.outline.processDepth.disable) {
              //设置深度检测失败样式
              attr.processDepth.failAppearance = new Cesium.PolylineMaterialAppearance({
                material: Cesium.Material.fromType(type, {
                  color: attr.processDepth.color
                })
              });
            }
            let outline = generatePrimitive(lineInstances, outlineappearance, attr.outline.processDepth);
            layer.add(outline);
          }

          if (attr.ifLabel) layer.add(labels);
          if (typeof success === 'function') {
            success(layer);
          }
        });
      }
    },
    21: {
      //面集合使用不同颜色
      styleFunction: (geojson, highlightItem, attr, success) => {
        let layer = new Cesium.PrimitiveCollection();
        let polygonInstances = {},
          lineInstances = [];
        let labels;
        if (attr.ifLabel) labels = new Cesium.LabelCollection();

        let promise = Cesium.GeoJsonDataSource.load(geojson);
        promise.then(ds => {
          ds.entities.values.forEach(entity => {
            let polygon = entity.polygon;
            let geometry = new Cesium.PolygonGeometry({
              polygonHierarchy: polygon.hierarchy._value,
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
              height: attr.heightOffset || 0.1
            });
            let type = entity.properties.Type.getValue();
            if (!polygonInstances.hasOwnProperty(type)) {
              polygonInstances[type] = [];
            }
            polygonInstances[type].push(
              new Cesium.GeometryInstance({
                geometry: geometry,
                id: entity.properties
              })
            );
            //边框
            if (attr.outline) {
              let line = new Cesium.PolylineGeometry({
                positions: polygon.hierarchy._value.positions,
                width: attr.outline.width || 1
              });
              lineInstances.push(
                new Cesium.GeometryInstance({
                  geometry: line,
                  id: entity.properties
                })
              );
            }
            //文字
            if (attr.ifLabel) {
              let feature = geojson.features.find(fea => {
                return fea.properties.FID == entity.properties.FID.getValue();
              });
              let center = turf.centroid(feature).geometry.coordinates;
              let pos = Cesium.Cartesian3.fromDegrees(center[0], center[1], 0);
              labels.add({
                position: pos,
                text: feature.properties.Text,
                eyeOffset: new Cesium.Cartesian3(0, 10, 10),
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                pixelOffset: new Cesium.Cartesian2(0, -5),
                font: '15px sans-serif',
                disableDepthTestDistance: 0,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, maxDisplayDistance),
                fillColor: Cesium.Color.fromCssColorString('white'),
                showBackground: false,
                backgroundColor: new Cesium.Color(0, 0, 0, 0)
              });
            }
          });

          for (let type in polygonInstances) {
            let polygonApperance = new Cesium.EllipsoidSurfaceAppearance({
              material: Cesium.Material.fromType('Color', {
                color: attr.colors(type) || Cesium.Color.fromCssColorString('rgba(255,155,0,0.5)')
              })
            });
            if (attr.processDepth && !attr.processDepth.disable) {
              //设置深度检测失败样式
              attr.processDepth.failAppearance = new Cesium.EllipsoidSurfaceAppearance({
                material: Cesium.Material.fromType('Color', {
                  color: attr.processDepth.color
                })
              });
            }
            let primitive = generatePrimitive(polygonInstances[type], polygonApperance, attr.processDepth);
            layer.add(primitive);
          }
          if (attr.outline) {
            //添加相同颜色外框
            let outlineappearance = new Cesium.PolylineMaterialAppearance({
              material: Cesium.Material.fromType('Color', {
                color: attr.outline.color
              })
            });
            if (attr.outline.processDepth && !attr.outline.processDepth.disable) {
              //设置深度检测失败样式
              attr.processDepth.failAppearance = new Cesium.PolylineMaterialAppearance({
                material: Cesium.Material.fromType('Color', {
                  color: attr.processDepth.color
                })
              });
            }
            let outline = generatePrimitive(lineInstances, outlineappearance, attr.outline.processDepth);
            layer.add(outline);
          }
          if (attr.ifLabel) layer.add(labels);
          if (typeof success === 'function') {
            success(layer);
          }
        });
      }
    },
    28: {
      //流体面
      styleFunction: (geojson, viewer, attr, success) => {
        let layer = new Cesium.PrimitiveCollection();
        let polygonInstances = [];
        if (attr.ifLabel) labels = new Cesium.LabelCollection();

        let promise = Cesium.GeoJsonDataSource.load(geojson);
        promise.then(ds => {
          ds.entities.values.forEach(entity => {
            let polygon = entity.polygon;
            let geometry = new Cesium.PolygonGeometry({
              polygonHierarchy: polygon.hierarchy._value,
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
              height: attr.heightOffset || 0.1,
              stRotation: Cesium.Math.toRadians(entity.properties['STRotation']?.getValue()) || attr.stRotation || 0
            });
            polygonInstances.push(
              new Cesium.GeometryInstance({
                geometry: geometry,
                id: entity.properties
              })
            );
            //文字
            if (attr.ifLabel) {
              let feature = geojson.features.find(fea => {
                return fea.properties[attr.ifLabel.idString] == entity.properties[attr.ifLabel.idString].getValue();
              });
              let center = turf.center(feature).geometry.coordinates;
              let pos = Cesium.Cartesian3.fromDegrees(center[0], center[1], 0);
              let labelParams = {
                position: pos,
                text: entity.properties.Text.getValue()
              };
              Object.assign(attr.ifLabel, labelParams);
              generateLabel(labels, attr.ifLabel);
            }
            if (attr.outline) {
              let positions = polygon.hierarchy._value.positions.map(pos => {
                let carto = Cesium.Cartographic.fromCartesian(pos);
                carto.height += attr.outline.heightOffset || attr.heightOffset || 0.1;
                return Cesium.Cartographic.toCartesian(carto);
              });
              let line = new Cesium.GeometryInstance({
                geometry: new Cesium.PolylineGeometry({
                  positions: positions,
                  width: attr.width || 1
                })
              });
              lineInstances.push(line);
            }
          });

          let polygonApperance = new Cesium.EllipsoidSurfaceAppearance({
            material: Cesium.Material.fromType(Cesium.Material.PolylineTrailType2, {
              color: attr.color,
              duration: attr.duration,
              image: attr.image,
              repeat: attr.repeat || 1,
              length: attr.length || 0.5,
              time: 0
            })
          });

          if (attr.processDepth && !attr.processDepth.disable) {
            //设置深度检测失败样式
            attr.processDepth.failAppearance = new Cesium.EllipsoidSurfaceAppearance({
              material: Cesium.Material.fromType('Color', {
                color: attr.processDepth.color
              })
            });
          }

          let primitive = generatePrimitive(polygonInstances, polygonApperance, attr.processDepth);
          layer.add(primitive);

          if (attr.outline) {
            let type = attr.outline.dash ? 'PolylineDash' : 'Color';
            let outlineappearance = new Cesium.PolylineMaterialAppearance({
              material: Cesium.Material.fromType(type, {
                color: attr.outline.color
              })
            });
            if (attr.outline.processDepth && !attr.outline.processDepth.disable) {
              //设置深度检测失败样式
              attr.processDepth.failAppearance = new Cesium.PolylineMaterialAppearance({
                material: Cesium.Material.fromType(type, {
                  color: attr.processDepth.color
                })
              });
            }
            let outline = generatePrimitive(lineInstances, outlineappearance, attr.outline.processDepth);
            layer.add(outline);
          }

          if (attr.ifLabel) layer.add(labels);
          if (typeof success === 'function') {
            //流动起来
            viewer.scene.preRender.addEventListener(() => {
              if (primitive.appearance.material.uniforms.time == Number.MAX_VALUE)
                primitive.appearance.material.uniforms.time = 0;
              else primitive.appearance.material.uniforms.time++;
            });
            success(layer);
          }
        });
      }
    },
    29: {
      //流体面分别加载
      styleFunction: (geojson, viewer, attr, success) => {
        let layer = new Cesium.PrimitiveCollection();
        if (attr.ifLabel) labels = new Cesium.LabelCollection();

        let promise = Cesium.GeoJsonDataSource.load(geojson);
        promise.then(ds => {
          ds.entities.values.forEach(entity => {
            let polygon = entity.polygon;
            let geometry = new Cesium.PolygonGeometry({
              polygonHierarchy: polygon.hierarchy._value,
              vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
              height: attr.heightOffset || 0.1,
              stRotation: Cesium.Math.toRadians(entity.properties['STRotation']?.getValue()) || attr.stRotation || 0
            });
            let polygonInstance = new Cesium.GeometryInstance({
              geometry: geometry,
              id: entity.properties
            });

            let polygonApperance = new Cesium.EllipsoidSurfaceAppearance({
              material: Cesium.Material.fromType(Cesium.Material.PolylineTrailType2, {
                color: entity.properties['Color']?.getValue() || attr.color || Cesium.Color.WHITE,
                duration:
                  Math.round(entity.properties['LengthScale']?.getValue() * attr.duration) || attr.duration || 1000,
                image: entity.properties['Image']?.getValue() || attr.image,
                repeat: Math.round(entity.properties['LengthScale']?.getValue() * attr.repeat) || attr.repeat || 1,
                length: attr.length || 1,
                time: 0
              })
            });

            if (attr.processDepth && !attr.processDepth.disable) {
              //设置深度检测失败样式
              attr.processDepth.failAppearance = new Cesium.EllipsoidSurfaceAppearance({
                material: Cesium.Material.fromType('Color', {
                  color: attr.processDepth.color
                })
              });
            }

            let primitive = generatePrimitive(polygonInstance, polygonApperance, attr.processDepth);
            layer.add(primitive);

            //文字
            if (attr.ifLabel) {
              let feature = geojson.features.find(fea => {
                return fea.properties[attr.ifLabel.idString] == entity.properties[attr.ifLabel.idString].getValue();
              });
              let center = turf.center(feature).geometry.coordinates;
              let pos = Cesium.Cartesian3.fromDegrees(center[0], center[1], 0);
              let labelParams = {
                position: pos,
                text: entity.properties.Text.getValue()
              };
              Object.assign(attr.ifLabel, labelParams);
              generateLabel(labels, attr.ifLabel);
            }
            if (attr.outline) {
              let positions = polygon.hierarchy._value.positions.map(pos => {
                let carto = Cesium.Cartographic.fromCartesian(pos);
                carto.height += attr.outline.heightOffset || attr.heightOffset || 0.1;
                return Cesium.Cartographic.toCartesian(carto);
              });
              let line = new Cesium.GeometryInstance({
                geometry: new Cesium.PolylineGeometry({
                  positions: positions,
                  width: attr.width || 1
                })
              });
              lineInstances.push(line);
            }
          });

          if (attr.outline) {
            let type = attr.outline.dash ? 'PolylineDash' : 'Color';
            let outlineappearance = new Cesium.PolylineMaterialAppearance({
              material: Cesium.Material.fromType(type, {
                color: attr.outline.color
              })
            });
            if (attr.outline.processDepth && !attr.outline.processDepth.disable) {
              //设置深度检测失败样式
              attr.processDepth.failAppearance = new Cesium.PolylineMaterialAppearance({
                material: Cesium.Material.fromType(type, {
                  color: attr.processDepth.color
                })
              });
            }
            let outline = generatePrimitive(lineInstances, outlineappearance, attr.outline.processDepth);
            layer.add(outline);
          }

          if (attr.ifLabel) layer.add(labels);
          if (typeof success === 'function') {
            //流动起来
            viewer.scene.preRender.addEventListener(() => {
              layer._primitives.forEach(p => {
                if (Cesium.defined(p.appearance.material?.uniforms?.time)) {
                  if (p.appearance.material.uniforms.time == Number.MAX_VALUE) p.appearance.material.uniforms.time = 0;
                  else p.appearance.material.uniforms.time++;
                }
              });
            });
            success(layer);
          }
        });
      }
    },
    30: {
      //矩形图形
      styleFunction: (geojson, highlightItem, attr) => {
        let layer = new Cesium.PrimitiveCollection();
        let labels,
          lineInstances = [];
        if (attr.ifLabel) labels = new Cesium.LabelCollection();

        let rectangle = new Cesium.RectangleGeometry({
          rectangle: Cesium.Rectangle.fromDegrees(
            attr.coordinates[0],
            attr.coordinates[1],
            attr.coordinates[2],
            attr.coordinates[3]
          ),
          height: attr.heightOffset || 0.1
        });
        let instance = new Cesium.GeometryInstance({
          geometry: rectangle,
          id: attr
        });

        //文字
        if (attr.ifLabel) {
          let pos = Cesium.Cartesian3.fromDegrees(
            (attr.coordinates[0] + attr.coordinates[2]) / 2,
            (attr.coordinates[1] + attr.coordinates[3]) / 2,
            attr.heightOffset || 0.1
          );
          let labelParams = {
            position: pos
          };
          Object.assign(attr.ifLabel, labelParams);
          generateLabel(labels, attr.ifLabel);
        }
        if (attr.outline) ;

        let apperance = new Cesium.EllipsoidSurfaceAppearance({
          material: Cesium.Material.fromType('Image', {
            image: attr.image
          })
        });
        if (attr.processDepth && !attr.processDepth.disable) {
          //设置深度检测失败样式
          attr.processDepth.failAppearance = new Cesium.EllipsoidSurfaceAppearance({
            material: Cesium.Material.fromType('Image', {
              image: attr.image
            })
          });
        }

        let primitive = generatePrimitive(instance, apperance, attr.processDepth);
        layer.add(primitive);

        if (attr.outline) {
          let type = attr.outline.dash ? 'PolylineDash' : 'Color';
          let outlineappearance = new Cesium.PolylineMaterialAppearance({
            material: Cesium.Material.fromType(type, {
              color: attr.outline.color
            })
          });
          if (attr.outline.processDepth && !attr.outline.processDepth.disable) {
            //设置深度检测失败样式
            attr.processDepth.failAppearance = new Cesium.PolylineMaterialAppearance({
              material: Cesium.Material.fromType(type, {
                color: attr.processDepth.color
              })
            });
          }
          let outline = generatePrimitive(lineInstances, outlineappearance, attr.outline.processDepth);
          layer.add(outline);
        }

        if (attr.ifLabel) layer.add(labels);
        return layer;
      }
    }
  },
  //流动效果材质
  dynamicTrackMaterial: {
    color: new Cesium.Color(0.5, 0, 1, 0.5),
    duration: 10000,
    image: '/img/cesiummap/red.png',
    repeat: 10
  }
};

/* eslint-disable */
// 定义一些常量
const BD_FACTOR = (3.14159265358979324 * 3000.0) / 180.0;
const PI = 3.1415926535897932384626;
const RADIUS = 6378245.0;
const EE = 0.00669342162296594323;

class CoordTransform {
  /**
   * BD-09(百度坐标系) To GCJ-02(火星坐标系)
   * @param lng
   * @param lat
   * @returns {number[]}
   */
  static BD09ToGCJ02(lng, lat) {
    const x = +lng - 0.0065;
    const y = +lat - 0.006;
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * BD_FACTOR);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * BD_FACTOR);
    const gg_lng = z * Math.cos(theta);
    const gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat];
  }

  /**
   * GCJ-02(火星坐标系) To BD-09(百度坐标系)
   * @param lng
   * @param lat
   * @returns {number[]}
   * @constructor
   */
  static GCJ02ToBD09(lng, lat) {
    lat = +lat;
    lng = +lng;
    const z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * BD_FACTOR);
    const theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * BD_FACTOR);
    const bd_lng = z * Math.cos(theta) + 0.0065;
    const bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lng, bd_lat];
  }

  /**
   * WGS-84(世界大地坐标系) To GCJ-02(火星坐标系)
   * @param lng
   * @param lat
   * @returns {number[]}
   */
  static WGS84ToGCJ02(lng, lat) {
    lat = +lat;
    lng = +lng;
    if (this.out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      const d = this.delta(lng, lat);
      return [lng + d[0], lat + d[1]];
    }
  }

  /**
   * GCJ-02(火星坐标系) To WGS-84(世界大地坐标系)
   * @param lng
   * @param lat
   * @returns {number[]}
   * @constructor
   */
  static GCJ02ToWGS84(lng, lat) {
    lat = +lat;
    lng = +lng;
    if (this.out_of_china(lng, lat)) {
      return [lng, lat];
    } else {
      const d = this.delta(lng, lat);
      const mgLng = lng + d[0];
      const mgLat = lat + d[1];
      return [lng * 2 - mgLng, lat * 2 - mgLat];
    }
  }

  /**
   *
   * @param lng
   * @param lat
   * @returns {number[]}
   */
  static delta(lng, lat) {
    let dLng = this.transformLng(lng - 105, lat - 35);
    let dLat = this.transformLat(lng - 105, lat - 35);
    const radLat = (lat / 180) * PI;
    let magic = Math.sin(radLat);
    magic = 1 - EE * magic * magic;
    const sqrtMagic = Math.sqrt(magic);
    dLng = (dLng * 180) / ((RADIUS / sqrtMagic) * Math.cos(radLat) * PI);
    dLat = (dLat * 180) / (((RADIUS * (1 - EE)) / (magic * sqrtMagic)) * PI);
    return [dLng, dLat];
  }

  /**
   *
   * @param lng
   * @param lat
   * @returns {number}
   */
  static transformLng(lng, lat) {
    lat = +lat;
    lng = +lng;
    let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
    ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((150.0 * Math.sin((lng / 12.0) * PI) + 300.0 * Math.sin((lng / 30.0) * PI)) * 2.0) / 3.0;
    return ret;
  }

  /**
   *
   * @param lng
   * @param lat
   * @returns {number}
   */
  static transformLat(lng, lat) {
    lat = +lat;
    lng = +lng;
    let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((160.0 * Math.sin((lat / 12.0) * PI) + 320 * Math.sin((lat * PI) / 30.0)) * 2.0) / 3.0;
    return ret;
  }

  /**
   * 判断是否在国内。不在国内不做偏移
   * @param lng
   * @param lat
   * @returns {boolean}
   */
  static out_of_china(lng, lat) {
    lat = +lat;
    lng = +lng;
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
  }
}

/* eslint-disable */

class AmapMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {
  constructor() {
    super();

    const projection = new Cesium.WebMercatorProjection();

    this._projection.project = (cartographic, result) => {
      result = CoordTransform.WGS84ToGCJ02(
        Cesium.Math.toDegrees(cartographic.longitude),
        Cesium.Math.toDegrees(cartographic.latitude)
      );
      result = projection.project(
        Cesium.Cartographic.fromDegrees(result[0], result[1])
      );
      return new Cesium.Cartesian2(result.x, result.y);
    };

    this._projection.unproject = (cartesian, result) => {
      const cartographic = projection.unproject(cartesian);
      result = CoordTransform.GCJ02ToWGS84(
        Cesium.Math.toDegrees(cartographic.longitude),
        Cesium.Math.toDegrees(cartographic.latitude)
      );
      return Cesium.Cartographic.fromDegrees(result[0], result[1]);
    };
  }
}

/* eslint-disable */

class BaiduMercatorTilingScheme extends Cesium.WebMercatorTilingScheme {
  constructor(options) {
    super(options);

    this.resolutions = [];

    for (let i = 0; i < 19; i++) {
      this.resolutions[i] = 256 * Math.pow(2, 18 - i);
    }

    this.rectangleSouthwestInMetersnew = Cesium.Cartesian2(-20037726.37, -12474104.17);
    this.rectangleNortheastInMeters = new Cesium.Cartesian2(20037726.37, 12474104.17);

    const projection = new BaiduMercatorProjection();

    this._projection.project = (cartographic, result) => {
      result = result || {};
      result = CoordTransform.WGS84ToGCJ02(
        Cesium.Math.toDegrees(cartographic.longitude),
        Cesium.Math.toDegrees(cartographic.latitude)
      );
      result = CoordTransform.GCJ02ToBD09(result[0], result[1]);
      result[0] = Math.min(result[0], 180);
      result[0] = Math.max(result[0], -180);
      result[1] = Math.min(result[1], 74.000022);
      result[1] = Math.max(result[1], -71.988531);
      result = projection.lngLatToPoint({
        lng: result[0],
        lat: result[1]
      });
      return new Cesium.Cartesian2(result.x, result.y);
    };

    this._projection.unproject = (cartesian, result) => {
      result = result || {};
      result = projection.mercatorToLngLat({
        lng: cartesian.x,
        lat: cartesian.y
      });
      result = CoordTransform.BD09ToGCJ02(result.lng, result.lat);
      result = CoordTransform.GCJ02ToWGS84(result[0], result[1]);
      return new Cesium.Cartographic(Cesium.Math.toRadians(result[0]), Cesium.Math.toRadians(result[1]));
    };
  }

  tileXYToNativeRectangle(x, y, level, result) {
    const tileWidth = this.resolutions[level];
    const west = x * tileWidth;
    const east = (x + 1) * tileWidth;
    const north = ((y = -y) + 1) * tileWidth;
    const south = y * tileWidth;

    if (!Cesium.defined(result)) {
      return new Cesium.Rectangle(west, south, east, north);
    }

    result.west = west;
    result.south = south;
    result.east = east;
    result.north = north;
    return result;
  }

  positionToTileXY(position, level, result) {
    const rectangle = this._rectangle;
    if (!Cesium.Rectangle.contains(rectangle, position)) {
      return undefined;
    }
    const projection = this._projection;
    const webMercatorPosition = projection.project(position);
    if (!Cesium.defined(webMercatorPosition)) {
      return undefined;
    }
    const tileWidth = this.resolutions[level];
    const xTileCoordinate = Math.floor(webMercatorPosition.x / tileWidth);
    const yTileCoordinate = -Math.floor(webMercatorPosition.y / tileWidth);
    if (!Cesium.defined(result)) {
      return new Cesium.Cartesian2(xTileCoordinate, yTileCoordinate);
    }
    result.x = xTileCoordinate;
    result.y = yTileCoordinate;
    return result;
  }
}

const EARTH_RADIUS = 6370996.81;
const MC_BAND = [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0];
const LL_BAND = [75, 60, 45, 30, 15, 0];
const MC2LL = [
  [
    1.410526172116255e-8,
    8.98305509648872e-6,
    -1.9939833816331,
    2.009824383106796e2,
    -1.872403703815547e2,
    91.6087516669843,
    -23.38765649603339,
    2.57121317296198,
    -0.03801003308653,
    1.73379812e7
  ],
  [
    -7.435856389565537e-9,
    8.983055097726239e-6,
    -0.78625201886289,
    96.32687599759846,
    -1.85204757529826,
    -59.36935905485877,
    47.40033549296737,
    -16.50741931063887,
    2.28786674699375,
    1.026014486e7
  ],
  [
    -3.030883460898826e-8,
    8.98305509983578e-6,
    0.30071316287616,
    59.74293618442277,
    7.357984074871,
    -25.38371002664745,
    13.45380521110908,
    -3.29883767235584,
    0.32710905363475,
    6.85681737e6
  ],
  [
    -1.981981304930552e-8,
    8.983055099779535e-6,
    0.03278182852591,
    40.31678527705744,
    0.65659298677277,
    -4.44255534477492,
    0.85341911805263,
    0.12923347998204,
    -0.04625736007561,
    4.48277706e6
  ],
  [
    3.09191371068437e-9,
    8.983055096812155e-6,
    0.00006995724062,
    23.10934304144901,
    -0.00023663490511,
    -0.6321817810242,
    -0.00663494467273,
    0.03430082397953,
    -0.00466043876332,
    2.5551644e6
  ],
  [
    2.890871144776878e-9,
    8.983055095805407e-6,
    -0.00000003068298,
    7.47137025468032,
    -0.00000353937994,
    -0.02145144861037,
    -0.00001234426596,
    0.00010322952773,
    -0.00000323890364,
    8.260885e5
  ]
];
const LL2MC = [
  [
    -0.0015702102444,
    1.113207020616939e5,
    1.704480524535203e15,
    -1.033898737604234e16,
    2.611266785660388e16,
    -3.51496691766537e16,
    2.659570071840392e16,
    -1.072501245418824e16,
    1.800819912950474e15,
    82.5
  ],
  [
    8.277824516172526e-4,
    1.113207020463578e5,
    6.477955746671608e8,
    -4.082003173641316e9,
    1.077490566351142e10,
    -1.517187553151559e10,
    1.205306533862167e10,
    -5.124939663577472e9,
    9.133119359512032e8,
    67.5
  ],
  [
    0.00337398766765,
    1.113207020202162e5,
    4.481351045890365e6,
    -2.339375119931662e7,
    7.968221547186455e7,
    -1.159649932797253e8,
    9.723671115602145e7,
    -4.366194633752821e7,
    8.477230501135234e6,
    52.5
  ],
  [
    0.00220636496208,
    1.113207020209128e5,
    5.175186112841131e4,
    3.796837749470245e6,
    9.920137397791013e5,
    -1.22195221711287e6,
    1.340652697009075e6,
    -6.209436990984312e5,
    1.444169293806241e5,
    37.5
  ],
  [
    -3.441963504368392e-4,
    1.113207020576856e5,
    2.782353980772752e2,
    2.485758690035394e6,
    6.070750963243378e3,
    5.482118345352118e4,
    9.540606633304236e3,
    -2.71055326746645e3,
    1.405483844121726e3,
    22.5
  ],
  [
    -3.218135878613132e-4,
    1.113207020701615e5,
    0.00369383431289,
    8.237256402795718e5,
    0.46104986909093,
    2.351343141331292e3,
    1.58060784298199,
    8.77738589078284,
    0.37238884252424,
    7.45
  ]
];

class BaiduMercatorProjection {
  constructor() {
    this.isWgs84 = false;
  }

  /**
   *
   * @param point1
   * @param point2
   * @returns {number}
   */
  getDistanceByMC(point1, point2) {
    if (!point1 || !point2) {
      return 0;
    }
    point1 = this.convertMC2LL(point1);
    if (!point1) {
      return 0;
    }
    const x1 = this.toRadians(point1.lng);
    const y1 = this.toRadians(point1.lat);
    point2 = this.convertMC2LL(point2);
    if (!point2) {
      return 0;
    }
    const x2 = this.toRadians(point2.lng);
    const y2 = this.toRadians(point2.lat);
    return this.getDistance(x1, x2, y1, y2);
  }

  /**
   * Calculate the distance between two points according to the latitude and longitude coordinates
   * @param point1
   * @param point2
   * @returns {number|*}
   */
  getDistanceByLL(point1, point2) {
    if (!point1 || !point2) {
      return 0;
    }
    point1.lng = this.getLoop(point1.lng, -180, 180);
    point1.lat = this.getRange(point1.lat, -74, 74);
    point2.lng = this.getLoop(point2.lng, -180, 180);
    point2.lat = this.getRange(point2.lat, -74, 74);
    const x1 = this.toRadians(point1.lng);
    const y1 = this.toRadians(point1.lat);
    const x2 = this.toRadians(point2.lng);
    const y2 = this.toRadians(point2.lat);
    return this.getDistance(x1, x2, y1, y2);
  }

  /**
   * The plane cartesian coordinates are converted to latitude and longitude coordinates
   * @param point
   * @returns {Point|{lng: number, lat: number}}
   */
  convertMC2LL(point) {
    if (!point) {
      return { lng: 0, lat: 0 };
    }
    let lnglat = {};
    if (this.isWgs84) {
      lnglat.lng = (point.lng / 20037508.34) * 180;
      const mmy = (point.lat / 20037508.34) * 180;
      lnglat.lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((mmy * Math.PI) / 180)) - Math.PI / 2);
      return {
        lng: lnglat.lng.toFixed(6),
        lat: lnglat.lat.toFixed(6)
      };
    }

    const temp = {
      lng: Math.abs(point.lng),
      lat: Math.abs(point.lat)
    };

    let factor;
    for (let i = 0; i < MC_BAND.length; i++) {
      if (temp.lat >= MC_BAND[i]) {
        factor = MC2LL[i];
        break;
      }
    }
    lnglat = this.convertor(point, factor);
    return {
      lng: lnglat.lng.toFixed(6),
      lat: lnglat.lat.toFixed(6)
    };
  }

  /**
   * The latitude and longitude coordinates are converted to plane cartesian coordinates
   * @param point
   * @returns {{lng: number, lat: number}|*}
   */
  convertLL2MC(point) {
    if (!point) {
      return { lng: 0, lat: 0 };
    }
    if (point.lng > 180 || point.lng < -180 || point.lat > 90 || point.lat < -90) {
      return point;
    }

    if (this.isWgs84) {
      const mercator = {};
      const earthRad = 6378137.0;
      mercator.lng = ((point.lng * Math.PI) / 180) * earthRad;
      const a = (point.lat * Math.PI) / 180;
      mercator.lat = (earthRad / 2) * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));

      return {
        lng: parseFloat(mercator.lng.toFixed(2)),
        lat: parseFloat(mercator.lat.toFixed(2))
      };
    }

    point.lng = this.getLoop(point.lng, -180, 180);
    point.lat = this.getRange(point.lat, -74, 74);
    const temp = { lng: point.lng, lat: point.lat };
    let factor;
    for (let i = 0; i < LL_BAND.length; i++) {
      if (temp.lat >= LL_BAND[i]) {
        factor = LL2MC[i];
        break;
      }
    }
    if (!factor) {
      for (let i = 0; i < LL_BAND.length; i++) {
        if (temp.lat <= -LL_BAND[i]) {
          factor = LL2MC[i];
          break;
        }
      }
    }
    const mc = this.convertor(point, factor);
    return {
      lng: parseFloat(mc.lng.toFixed(2)),
      lat: parseFloat(mc.lat.toFixed(2))
    };
  }

  /**
   *
   * @param fromPoint
   * @param factor
   * @returns {{lng: *, lat: *}}
   */
  convertor(fromPoint, factor) {
    if (!fromPoint || !factor) {
      return { lng: 0, lat: 0 };
    }
    let x = factor[0] + factor[1] * Math.abs(fromPoint.lng);
    const temp = Math.abs(fromPoint.lat) / factor[9];
    let y =
      factor[2] +
      factor[3] * temp +
      factor[4] * temp * temp +
      factor[5] * temp * temp * temp +
      factor[6] * temp * temp * temp * temp +
      factor[7] * temp * temp * temp * temp * temp +
      factor[8] * temp * temp * temp * temp * temp * temp;
    x *= fromPoint.lng < 0 ? -1 : 1;
    y *= fromPoint.lat < 0 ? -1 : 1;
    return {
      lng: x,
      lat: y
    };
  }

  /**
   *
   * @param x1
   * @param x2
   * @param y1
   * @param y2
   * @returns {number}
   */
  getDistance(x1, x2, y1, y2) {
    return EARTH_RADIUS * Math.acos(Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1));
  }

  /**
   *
   * @param deg
   * @returns {number}
   */
  toRadians(deg) {
    return (Math.PI * deg) / 180;
  }

  /**
   *
   * @param rad
   * @returns {number}
   */
  toDegrees(rad) {
    return (180 * rad) / Math.PI;
  }

  /**
   *
   * @param v
   * @param a
   * @param b
   * @returns {number}
   */
  getRange(v, a, b) {
    if (a != null) {
      v = Math.max(v, a);
    }
    if (b != null) {
      v = Math.min(v, b);
    }
    return v;
  }

  /**
   *
   * @param v
   * @param a
   * @param b
   * @returns {*}
   */
  getLoop(v, a, b) {
    while (v > b) {
      v -= b - a;
    }
    while (v < a) {
      v += b - a;
    }
    return v;
  }

  /**
   *
   * @param point
   * @returns {{lng: number, lat: number}|*}
   */
  lngLatToMercator(point) {
    return this.convertLL2MC(point);
  }

  /**
   *
   * @param point
   * @returns {{x: (number|*), y: (number|*)}}
   */
  lngLatToPoint(point) {
    const mercator = this.convertLL2MC(point);
    return {
      x: mercator.lng,
      y: mercator.lat
    };
  }

  /**
   * WebMercator transforms to latitude and longitude
   * @param point
   * @returns {Point|{lng: number, lat: number}}
   */
  mercatorToLngLat(point) {
    return this.convertMC2LL(point);
  }

  /**
   *
   * @param point
   * @returns {Point|{lng: number, lat: number}}
   */
  pointToLngLat(point) {
    const mercator = { lng: point.x, lat: point.y };
    return this.convertMC2LL(mercator);
  }

  /**
   * Latitude and longitude coordinates  transforms to  pixel coordinates
   * @param point
   * @param zoom
   * @param mapCenter
   * @param mapSize
   * @returns {{x: number, y: number}}
   */
  pointToPixel(point, zoom, mapCenter, mapSize) {
    if (!point) {
      return { x: 0, y: 0 };
    }
    point = this.lngLatToMercator(point);
    const zoomUnits = this.getZoomUnits(zoom);
    const x = Math.round((point.lng - mapCenter.lng) / zoomUnits + mapSize.width / 2);
    const y = Math.round((mapCenter.lat - point.lat) / zoomUnits + mapSize.height / 2);
    return { x, y };
  }

  /**
   * Pixel coordinates transforms to latitude and longitude coordinates
   * @param pixel
   * @param zoom
   * @param mapCenter
   * @param mapSize
   * @returns {Point|{lng: number, lat: number}}
   */
  pixelToPoint(pixel, zoom, mapCenter, mapSize) {
    if (!pixel) {
      return { lng: 0, lat: 0 };
    }
    const zoomUnits = this.getZoomUnits(zoom);
    const lng = mapCenter.lng + zoomUnits * (pixel.x - mapSize.width / 2);
    const lat = mapCenter.lat - zoomUnits * (pixel.y - mapSize.height / 2);
    const point = { lng, lat };
    return this.mercatorToLngLat(point);
  }

  /**
   *
   * @param zoom
   * @returns {number}
   */
  getZoomUnits(zoom) {
    return Math.pow(2, 18 - zoom);
  }
}

/*
 *  来源 https://www.jianshu.com/p/4a97d3ed4a06
 */

//空间两点距离计算函数
function getSpaceDistance(positions) {
  let distance = 0;
  for (let i = 0; i < positions.length - 1; i++) {
    let point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
    let point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
    /**根据经纬度计算出距离**/
    let geodesic = new Cesium.EllipsoidGeodesic();
    geodesic.setEndPoints(point1cartographic, point2cartographic);
    let s = geodesic.surfaceDistance;
    //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
    //返回两点之间的距离
    // s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
    distance = distance + s;
  }
  return distance;
}

//计算多边形面积
function getArea(positions) {
  if (positions.length < 4) {
    return 0;
  }
  let points = positions.map(pos => {
    let coord = Cesium.Cartographic.fromCartesian(pos);
    // return {
    //     lon: coord.longitude,
    //     lat: coord.latitude
    // }
    return [Cesium.Math.toDegrees(coord.longitude), Cesium.Math.toDegrees(coord.latitude)];
  });
  let polygon = turf.polygon([points]);
  return turf.area(polygon);
  // let res = 0;
  //拆分三角曲面
  // for (let i = 0; i < points.length - 2; i++) {
  //     let j = (i + 1) % points.length;
  //     let k = (i + 2) % points.length;
  //     let totalAngle = getAngle(points[i], points[j], points[k]);

  //     let dis_temp1 = distance(positions[i], positions[j]);
  //     let dis_temp2 = distance(positions[j], positions[k]);
  //     res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle));
  // }
  // return res / 2;
}

const MeasureType = {
  DISTANCE: 0,
  AREA: 1
};

/**
 * 测量基类
 */
class MeasureTool {
  constructor(viewer, pickMode) {
    this.viewer = viewer;
    this.pickMode = pickMode;
    this.positions = null;
    this.pointer = null; //鼠标点
    this.pointerPos = null;
    this.measureEntity = null;
    this.label = null;
    this.handler = null;
    this.measureOptions = null;
    this.pointerOptions = null;
    this.labelOptions = null;
    this.lastCompleted = true; //上次测量已完成
    this.orginLeftDblEvt = null; //双击事件

    let me = this;
    this.pointerOptions = {
      name: 'measure-pointer',
      position: new Cesium.CallbackProperty(() => {
        return me.pointerPos;
      }, false),
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      },
      clampToGround: false
    };
  }
  /**
   * 开始一次测量
   */
  activate() {
    let me = this;
    let viewer = this.viewer;

    this.measureEntity = viewer.entities.add(this.measureOptions);
    this.pointer = viewer.entities.add(this.pointerOptions);
    this.label = viewer.entities.add(this.labelOptions);

    this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    this.positions = [];

    let cartesian = null;

    this.handler.setInputAction(function (evt) {
      if (me.viewer.scene.mode != Cesium.SceneMode.MORPHING) {
        if (me.viewer.scene.pickPositionSupported) {
          cartesian = me.getPickPosition(evt.endPosition);
          if (cartesian) me.pointerPos = cartesian.clone();
          if (cartesian && !me.lastCompleted) {
            if (me.positions.length <= 1) {
              me.positions.push(cartesian.clone());
            } else {
              me.positions.pop();
              me.positions.push(cartesian.clone());
            }
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.handler.setInputAction(function (evt) {
      if (me.lastCompleted) {
        me.clear();
        me.lastCompleted = false;
      }
      if (me.viewer.scene.mode !== Cesium.SceneMode.MORPHING) {
        if (me.viewer.scene.pickPositionSupported) {
          cartesian = me.getPickPosition(evt.position);
          if (cartesian) {
            me.positions.push(cartesian.clone());
            // let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            // let lng = Cesium.Math.toDegrees(cartographic.longitude);
            // let lat = Cesium.Math.toDegrees(cartographic.latitude);
            // let height = cartographic.height;
            // let mapPosition = { lng: lng, lat: lat, height: height };
            // console.log("measure position", mapPosition);
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    Tool$1.setDoubleClickEvt(this.handler, () => {
      me.lastCompleted = true;
    });
  }
  /**
   * 清除标记
   */
  clear() {
    this.positions = [];
  }
  /**
   * 停止
   */
  deactivate() {
    if (this.viewer) {
      this.viewer.entities.remove(this.pointer);
      this.viewer.entities.remove(this.measureEntity);
      this.viewer.entities.remove(this.label);
      this.pointer = null;
      this.measureEntity = null;
      this.label = null;
      this.positions = [];
      this.lastCompleted = true;
      if (this.handler && !this.handler.isDestroyed()) {
        this.handler.destroy();
        this.handler = null;
      }
    }
  }
  getPickPosition(pos) {
    let cartesian;
    const viewer = this.viewer;
    if (this.pickMode === 'scene') {
      cartesian = viewer.scene.pickPosition(pos); // 此法在地表透明时获取坐标会有问题
      if (!cartesian) {
        const ray = viewer.camera.getPickRay(pos);
        const result = viewer.scene.pickFromRay(ray, [this.pointer]);
        if (result) return result.position;
      }
    } else {
      const ray = viewer.camera.getPickRay(pos);
      cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    }
    return cartesian;
  }
  /**
   * 销毁
   */
  destroy() {
    this.deactivate();
    this.viewer = null;
    this.positions = null;
    this.pointer = null;
    this.measureEntity = null;
    this.handler = null;
    this.measureOptions = null;
    this.pointerOptions = null;
  }
}

/**
 * 测量距离
 */
class MeasureDistance extends MeasureTool {
  constructor(viewer, pickMode) {
    super(viewer, pickMode);
    let me = this;
    this.measureOptions = {
      name: 'measure-line',
      polyline: {
        show: true,
        positions: new Cesium.CallbackProperty(() => {
          return me.positions;
        }, false),
        material: Cesium.Color.CHARTREUSE,
        width: 3,
        depthFailMaterial: Cesium.Color.CHARTREUSE,
      }
    };
    this.labelOptions = {
      name: 'measure-label',
      position: new Cesium.CallbackProperty(() => {
        return me.positions[me.positions.length - 1];
      }, false),
      label: {
        text: new Cesium.CallbackProperty(() => {
          let distance = getSpaceDistance(me.positions);
          return distance >= 1000
            ? `${Math.round((distance / 1000) * 100) / 100}公里`
            : `${Math.round(distance * 100) / 100}米`;
        }, false),
        font: '15px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.Cartesian2(0, 20),
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    };
  }
}

/**
 * 测量面积
 */
class MeasureArea extends MeasureTool {
  constructor(viewer, pickMode) {
    super(viewer, pickMode);

    let me = this;
    this.measureOptions = {
      name: 'measure-polygon',
      polygon: {
        hierarchy: new Cesium.CallbackProperty(() => {
          return {
            positions: me.positions
          };
        }, false),
        perPositionHeight: true,
        material: Cesium.Color.GREEN.withAlpha(0.5),
      },
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          return me.positions.concat(me.positions[0]);
        }, false),
        material: Cesium.Color.CHARTREUSE,
        width: 3,
        depthFailMaterial: Cesium.Color.CHARTREUSE,
      }
    };
    this.labelOptions = {
      name: 'measure-label',
      position: new Cesium.CallbackProperty(() => {
        if (me.positions.length <= 2) {
          return me.positions[me.positions.length - 1];
        } else {
          let positions = me.positions.concat(me.positions[0]);
          let points = positions.map(pos => {
            let coord = Cesium.Cartographic.fromCartesian(pos);
            // return {
            //     lon: coord.longitude,
            //     lat: coord.latitude
            // }
            return [Cesium.Math.toDegrees(coord.longitude), Cesium.Math.toDegrees(coord.latitude)];
          });
          let polygon = turf.polygon([points]);
          let center = turf.center(polygon).geometry.coordinates;
          return Cesium.Cartesian3.fromDegrees(center[0], center[1]);
        }
      }, false),
      label: {
        text: new Cesium.CallbackProperty(() => {
          let area = getArea(me.positions.concat(me.positions[0]));
          return area >= 10e6
            ? `${Math.round((area / 10e6) * 100) / 100}平方公里`
            : `${Math.round(area * 100) / 100}平方米`;
        }, false),
        font: '15px sans-serif',
        fillColor: Cesium.Color.GOLD,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.CallbackProperty(() => {
          if (me.positions.length < 3) return new Cesium.Cartesian2(0, 20);
          return new Cesium.Cartesian2(0, -20);
        }, false),
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    };
  }
}

class Measure {
  constructor(viewer, type = MeasureType.DISTANCE, pickMode = 'scene') {
    this.viewer = viewer;
    if (type == MeasureType.DISTANCE) {
      return new MeasureDistance(viewer, pickMode);
    }
    if (type == MeasureType.AREA) {
      return new MeasureArea(viewer, pickMode);
    }
  }
}

/* eslint-disable */
class CesiumPopup {
  constructor({
    viewer,
    id,
    position,
    html,
    createInner,
    className = 'cesiummap-popup',
    showDistanceSquared = Number.POSITIVE_INFINITY
  }) {
    this.id = id;
    this.viewer = viewer;
    this.position = position;
    this.originHTML = html;
    this.showDistanceSquared = showDistanceSquared;
    this._show = true;

    const element = document.createElement('div');
    element.className = className;
    element.id = id;
    element.innerHTML = html;

    //包裹vue
    if (createInner) {
      const inner = document.createElement('div');
      inner.id = id + '-inner';
      element.appendChild(inner);
      this.innerId = inner.id;
    }
    this.viewer.container.appendChild(element);

    //更新位置
    this.removeEvt = this.viewer.scene.postRender.addEventListener(this._render, this);
    CesiumPopup.popUpList.push(this);
  }
  static popUpList = new Array();
  static hideAll() {
    CesiumPopup.popUpList.forEach(popup => {
      popup.hide();
    });
  }
  static showAll() {
    CesiumPopup.popUpList.forEach(popup => {
      popup.show();
    });
  }
  static removeAll() {
    CesiumPopup.popUpList.forEach(popup => {
      popup.destroy();
    });
    CesiumPopup.popUpList = new Array();
  }
  hide() {
    this._show = false;
    const element = document.getElementById(this.id);
    if (element) element.style.display = 'none';
  }
  show() {
    this._show = true;
    const element = document.getElementById(this.id);
    if (element) element.style.display = '';
  }
  setHtml(html) {
    document.getElementById(this.id).innerHTML = html;
  }
  _render(scene) {
    const element = document.getElementById(this.id);
    if (element) {

      if (element.style.display == '' && this.position) {
        let newScreen = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, this.position);
        if (newScreen) {
          element.style.left = newScreen.x + 'px';
          element.style.top = newScreen.y + 'px';
        } else {
          element.style.left = '-500px';
          element.style.top = '-500px';
        }
      }

      if (this.showDistanceSquared === Number.POSITIVE_INFINITY && this._show) {
        element.style.display = '';
      } else if (this.position && this._show) {
        //计算距离平方
        let distance = Cesium.Cartesian3.distanceSquared(this.position, scene.camera.position);
        if (distance > this.showDistanceSquared) {
          element.style.display = 'none';
        } else {
          element.style.display = '';
        }
      } else {
        element.style.display = 'none';
      }
    }
  }
  destroy() {
    const element = document.getElementById(this.id);
    if (element) {
      this.viewer.container.removeChild(element);
    }

    const idx = CesiumPopup.popUpList.findIndex(p => p.id === this.id);
    if (idx > -1) CesiumPopup.popUpList.splice(idx, 1);

    this.removeEvt();
    this.viewer = null;
    this.id = null;
    this.position = null;
    this.html = null;
  }
}

/* eslint-disable */

const WaterNormal = new Image();
WaterNormal.setAttribute('crossOrigin', 'Anonymous');
WaterNormal.src = 'https://maps.bim-ace.com:10202/waterNormals.jpg';

class LayerFactory {
  static WaterNormal = WaterNormal;
  static LoadingImages = [];
  /**
   * 生成label
   * @param {*} layerParam
   */
  static generateLabel(layerParam, collection, parentShow = true) {
    const label = layerParam.layerText;
    const fillColor = Cesium.Color.fromCssColorString(label.fontColor);
    fillColor.alpha *= 2;
    if (label) {
      const heightReference =
        label.isGround == 1 ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE;
      if (label.isLight == null || label.isLight == undefined) label.isLight = 1;
      if (!label.batchText || label.batchText?.length <= 1) {
        const result = collection.add({
          id: layerParam.id,
          text: label.content,
          position: Cesium.Cartesian3.fromDegrees(label.lon, label.lat, label.alt),
          font: `${label.italic ? 'oblique' : ''} ${label.bold ? 'bold' : ''} ${label.size}px ${FontType[label.font]}`,
          fillColor: fillColor,
          show: layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && label.isLight)),
          showBackground: label.isBackground ? true : false,
          backgroundColor: Cesium.Color.fromCssColorString(label.background),
          backgroundPadding: new Cesium.Cartesian2(label.margin, label.margin),
          outlineColor: Cesium.Color.fromCssColorString(label.border),
          outlineWidth: label.lineWidth,
          style: label.isBorder ? Cesium.LabelStyle.FILL_AND_OUTLINE : Cesium.LabelStyle.FILL,
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          heightReference: heightReference,
          disableDepthTestDistance: Number.POSITIVE_INFINITY,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(label.minVisibleAlt, label.maxVisibleAlt)
          // pixelOffset: new Cesium.Cartesian2(0.0, -75),
          // eyeOffset: new Cesium.Cartesian3(0, 0, 1)
        });
        return {
          label: result
        };
      }
      // 批量文字
      const labelsArray = [];
      let rectangle;
      if (label.batchText) {
        const points = [];
        // 排序
        label.batchText.sort((a, b) => {
          return a.sort - b.sort;
        });
        label.batchText.forEach((text, i) => {
          points.push([text.lon, text.lat]);
          // 添加label的id
          text.batchId = text.batchId || i;
          labelsArray.push(
            collection.add({
              id: `${layerParam.id}-${text.batchId}`,
              text: text.text,
              position: Cesium.Cartesian3.fromDegrees(text.lon, text.lat, label.isGround == 0 ? label.alt : text.alt),
              font: `${label.italic ? 'oblique' : ''} ${label.bold ? 'bold' : ''} ${label.size}px ${FontType[label.font]
                }`,
              fillColor: fillColor,
              show: layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && label.isLight)),
              showBackground: label.isBackground ? true : false,
              backgroundColor: Cesium.Color.fromCssColorString(label.background),
              backgroundPadding: new Cesium.Cartesian2(label.margin, label.margin),
              outlineColor: Cesium.Color.fromCssColorString(label.border),
              outlineWidth: label.lineWidth,
              style: label.isBorder ? Cesium.LabelStyle.FILL_AND_OUTLINE : Cesium.LabelStyle.FILL,
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              heightReference: heightReference,
              disableDepthTestDistance: Number.POSITIVE_INFINITY,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(label.minVisibleAlt, label.maxVisibleAlt)
            })
          );
        });
        let bbox = turf.bbox(turf.multiPoint(points));
        rectangle = new Cesium.Rectangle(
          Cesium.Math.toRadians(bbox[0] - 0.00005),
          Cesium.Math.toRadians(bbox[1] - 0.00005),
          Cesium.Math.toRadians(bbox[2] + 0.00005),
          Cesium.Math.toRadians(bbox[3] + 0.00005)
        );
      }
      return {
        label: labelsArray,
        rectangle: rectangle
      };
    }
    return {};
  }
  /**
   * 生成billboard
   * @param {*} layerParam
   */
  static generateBillboard(layerParam, collection, parentShow = true) {
    const billboard = layerParam.layerLabel;
    if (billboard) {
      const heightReference =
        billboard.isGround == 1 ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE;
      if (billboard.isLight == null || billboard.isLight == undefined) billboard.isLight = 1;
      if (!billboard.batchLabel || billboard.batchLabel.length <= 1) {
        const result = collection.add({
          id: layerParam.id,
          image: P.billboardPictures[billboard.labelId],
          position: Cesium.Cartesian3.fromDegrees(billboard.lon, billboard.lat, billboard.alt),
          color: Cesium.Color.fromCssColorString(billboard.color),
          show: layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && billboard.isLight)),
          scale: billboard.size,
          rotation: Cesium.Math.toRadians(billboard.rotate),
          horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          disableDepthTestDistance: 0,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
            billboard.minVisibleAlt,
            billboard.maxVisibleAlt
          ),
          heightReference: heightReference
        });
        return {
          billboard: result
        };
      }
      // 批量
      const billboardsArray = [];
      let rectangle;
      if (billboard.batchLabel) {
        const points = [];
        billboard.batchLabel.forEach((label, i) => {
          points.push([label.lon, label.lat]);
          // 添加id
          label.batchId = label.batchId || i;
          billboardsArray.push(
            collection.add({
              id: `${layerParam.id}-${label.batchId}`,
              image: P.billboardPictures[billboard.labelId],
              position: Cesium.Cartesian3.fromDegrees(
                label.lon,
                label.lat,
                billboard.isGround == 0 ? billboard.alt : label.alt
              ),
              color: Cesium.Color.fromCssColorString(billboard.color),
              show: layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && billboard.isLight)),
              scale: label.size,
              rotation: Cesium.Math.toRadians(label.rotate),
              horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              disableDepthTestDistance: 0,
              distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                billboard.minVisibleAlt,
                billboard.maxVisibleAlt
              ),
              heightReference: heightReference
            })
          );
        });
        let bbox = turf.bbox(turf.multiPoint(points));
        rectangle = new Cesium.Rectangle(
          Cesium.Math.toRadians(bbox[0] - 0.00005),
          Cesium.Math.toRadians(bbox[1] - 0.00005),
          Cesium.Math.toRadians(bbox[2] + 0.00005),
          Cesium.Math.toRadians(bbox[3] + 0.00005)
        );
      }
      return {
        billboard: billboardsArray,
        rectangle: rectangle
      };
    }
    return {};
  }
  /**
   * 生成边界中的面
   * @param {*} param
   */
  static generateBorderPolygon(param, positions) {
    let material;
    let polygon;
    if (!param.image || param.isRepeat == 0) {
      material = new Cesium.ColorMaterialProperty(Cesium.Color.fromCssColorString(param.color));
    } else {
      material = new Cesium.ImageMaterialProperty({
        image: param.image,
        color: Cesium.Color.fromCssColorString(param.color),
        transparent: true,
        repeat: new Cesium.Cartesian2(param.isRepeat, param.isRepeat)
      });
    }
    polygon = {
      hierarchy: new Cesium.PolygonHierarchy(positions),
      material: material,
      heightReference: param.isGround == 1 ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
      height: param.isGround == 1 ? undefined : param.alt,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(param.minVisibleAlt, param.maxVisibleAlt),
      perPositionHeight: param.isGround == 2
    };
    return polygon;
  }
  /**
   * 生成边界中的线
   * @param {*} param
   */
  static generateBorderPolyline(param, positions) {
    let material;
    let polyline;
    if (param.isDottedLine) {
      material = new Cesium.PolylineDashMaterialProperty({
        color: Cesium.Color.fromCssColorString(param.borderColor),
        gapColor: Cesium.Color.fromCssColorString(param.intervalColor),
        dashLength: param.dottedLineInterval
      });
    } else {
      material = Cesium.Color.fromCssColorString(param.borderColor);
    }
    polyline = {
      clampToGround: param.isGround == 1 ? true : false,
      positions: positions,
      width: param.borderSize,
      material: material,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(param.minVisibleAlt, param.maxVisibleAlt)
    };
    return polyline;
  }
  /**
   * 生成边界，单个边界，用entity的polygon和polyline分别存放面和线
   * @param {*} layerParam
   */
  static generateBorder(layerParam, collection, parentShow = true) {
    const param = layerParam.layerBorder;
    if (param) {
      if (param.isLight == null || param.isLight == undefined) param.isLight = 1;
      let polygon = undefined,
        polyline = undefined;
      const positions = param.coordinate.map(p => {
        if (!p.z || isNaN(p.z)) p.z = 0;
        let height = p.z;
        if (param.isGround == 0) height = param.alt;
        return Cesium.Cartesian3.fromDegrees(p.x, p.y, height);
      });
      if (param.borderType == 0) {
        //绘制面
        polygon = LayerFactory.generateBorderPolygon(param, positions);
      }
      //边界线
      polyline = LayerFactory.generateBorderPolyline(param, positions);
      const entity = new Cesium.Entity({
        id: layerParam.id,
        polygon: polygon,
        polyline: polyline,
        show: layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && param.isLight))
      });
      return collection.add(entity);
    }
    return undefined;
  }
  /**
   * 加载远程模型
   * @param {*} layerParam
   */
  static generateModelFromUrl(layerParam, parentShow, collection, camera, ifZoom = false, success = () => { }) {
    const param = layerParam.layerModel;
    let model;
    if (param) {
      if (param.isLight == null || param.isLight == undefined) param.isLight = 1;
      const show = layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && param.isLight));
      if (param.batchModel?.length > 0) {
        model = LayerFactory.generateBatchModel(param, show, camera, ifZoom);
      } else {
        const pos = Cesium.Cartesian3.fromDegrees(param.lon, param.lat, param.alt);
        const mm = Cesium.Transforms.headingPitchRollToFixedFrame(
          pos,
          new Cesium.HeadingPitchRoll(
            Cesium.Math.toRadians(param.heading),
            Cesium.Math.toRadians(param.pitch),
            Cesium.Math.toRadians(param.roll)
          )
        );
        Cesium.Matrix4.multiply(mm, Cesium.Matrix4.fromUniformScale(param.zoom || 0.01), mm);
        model = Cesium.Model.fromGltf({
          url: param.url,
          modelMatrix: mm,
          color: Cesium.Color.fromCssColorString(param.color),
          scale: 1, // 用modelMatrix进行缩放，而不是scale，方便使用position editor
          id: param.layerId,
          shadows: Cesium.ShadowMode.DISABLED,
          show: show,
          scene: camera._scene,
          distanceDisplayCondition: new Cesium.DistanceDisplayCondition(param.minVisibleAlt, param.maxVisibleAlt)
          // debugShowBoundingVolume: true
        });

        model.readyPromise.then(() => {
          model.heightReference =
            param.isGround === 1 ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE;
          if (ifZoom) {
            const surface = Cesium.Matrix4.multiplyByPoint(
              model.modelMatrix,
              model.boundingSphere.center,
              new Cesium.Cartesian3()
            );
            camera.flyToBoundingSphere(new Cesium.BoundingSphere(surface, model.boundingSphere.radius), {
              duration: 0,
              offset: new Cesium.HeadingPitchRange(
                Cesium.Math.toRadians(45),
                Cesium.Math.toRadians(-45),
                model.boundingSphere.radius * 3
              )
            });
          }
          //添加所有动画
          model.activeAnimations.addAll({
            multiplier: 1,
            loop: Cesium.ModelAnimationLoop.REPEAT
          });
        });
      }

      success(model);
      return collection.add(model);
    }
  }
  /**
   * 加载本地模型
   * @param {*} layerParam
   * @param {*} file
   */
  static generateModelLocal(layerParam, parentShow, file, camera, ifZoom = false, success = () => { }) {
    if (file) {
      const param = layerParam.layerModel;
      if (param) {
        if (param.isLight == null || param.isLight == undefined) param.isLight = 1;
        const show = layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && param.isLight));

        const process = gltf => {
          let model;
          gltf = typeof gltf == 'string' ? JSON.parse(gltf) : gltf;
          if (param.batchModel?.length > 0) {
            model = LayerFactory.generateBatchModel(param, show, camera, ifZoom, gltf);
          } else {
            model = LayerFactory.generateModelFromObject(gltf, param, show, camera, ifZoom);
          }
          success(model);
        };

        if (file.constructor == File) {
          const reader = new FileReader();
          if (file.name.includes('.glb')) {
            reader.readAsArrayBuffer(file);
          } else if (file.name.includes('.gltf')) {
            reader.readAsText(file);
          } else {
            alert('未找到glb或gltf文件！');
          }
          reader.onload = () => {
            process(reader.result);
          };
          reader.onerror = () => {
            alert('模型读取出错！');
          };
        } else {
          process(file);
        }
      }
    }
  }
  /**
   * 通过gltf对象生成模型
   */
  static generateModelFromObject(gltf, param, show, camera, ifZoom = false) {
    gltf = typeof gltf == 'string' ? JSON.parse(gltf) : gltf;
    const pos = Cesium.Cartesian3.fromDegrees(param.lon, param.lat, param.alt);
    const mm = Cesium.Transforms.headingPitchRollToFixedFrame(
      pos,
      new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(param.heading),
        Cesium.Math.toRadians(param.pitch),
        Cesium.Math.toRadians(param.roll)
      )
    );
    Cesium.Matrix4.multiply(mm, Cesium.Matrix4.fromUniformScale(param.zoom || 0.01), mm);
    const model = new Cesium.Model({
      gltf: gltf,
      modelMatrix: mm,
      color: Cesium.Color.fromCssColorString(param.color),
      scale: 1,
      id: param.layerId,
      shadows: Cesium.ShadowMode.DISABLED,
      show: show,
      heightReference: param.isGround === 1 ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
      scene: camera._scene,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(param.minVisibleAlt, param.maxVisibleAlt)
    });
    model.readyPromise.then(() => {
      if (ifZoom) {
        const surface = Cesium.Matrix4.multiplyByPoint(
          model.modelMatrix,
          model.boundingSphere.center,
          new Cesium.Cartesian3()
        );
        camera.flyToBoundingSphere(new Cesium.BoundingSphere(surface, model.boundingSphere.radius), {
          duration: 0,
          offset: new Cesium.HeadingPitchRange(
            Cesium.Math.toRadians(45),
            Cesium.Math.toRadians(-45),
            model.boundingSphere.radius * 3
          )
        });
      }
      //添加所有动画
      model.activeAnimations.addAll({
        multiplier: 1,
        loop: Cesium.ModelAnimationLoop.REPEAT
      });
    });
    return model;
  }
  /**
   * 加载批量模型
   * @param {*} param
   * @param {*} show
   * @param {*} collection
   * @param {*} camera
   * @param {*} gltf
   */
  static generateBatchModel(param, show, camera, ifZoom = false, gltf = null) {
    const scene = camera._scene;
    if (param) {
      if (param.isLight == null || param.isLight == undefined) param.isLight = 1;
      const instances = [];

      const height = param.isGround === 0 ? param.alt : undefined;
      param.batchModel.forEach((item, i) => {
        const mm = Tool$1.MatrixFromPosHprScale(item, height);
        item.batchId = item.batchId || i;
        instances.push({
          modelMatrix: mm,
          batchId: `${param.layerId}-${item.batchId}`
        });
      });

      const color = Cesium.Color.fromCssColorString(param.color);
      const collectionParams = {
        show: show,
        instances: instances,
        dynamic: true,
        lightColor: new Cesium.Cartesian3(color.red, color.green, color.blue),
        luminanceAtZenith: scene.light.intensity / 10, // 除以10只是大概相似的效果
        shadows: Cesium.ShadowMode.DISABLED
      };
      if (gltf) {
        collectionParams.gltf = gltf;
      } else {
        collectionParams.url = param.url;
      }
      const model = new Cesium.ModelInstanceCollection(collectionParams);
      const isGround = param.isGround === 1;
      model.readyPromise.then(model => {
        if (ifZoom) {
          const surface = Cesium.Matrix4.multiplyByPoint(
            model.modelMatrix,
            model._boundingSphere.center,
            new Cesium.Cartesian3()
          );
          camera.flyToBoundingSphere(new Cesium.BoundingSphere(surface, model._boundingSphere.radius), {
            duration: 0,
            offset: new Cesium.HeadingPitchRange(
              Cesium.Math.toRadians(45),
              Cesium.Math.toRadians(-45),
              model._boundingSphere.radius * 3
            )
          });
        }
        // 贴地
        if (isGround) {
          const oldState = scene.globe.translucency.enabled;
          scene.globe.translucency.enabled = false;
          setTimeout(() => {
            const cartographics = param.batchModel.map(p => Cesium.Cartographic.fromDegrees(p.lon, p.lat));
            scene.sampleHeightMostDetailed(cartographics, [model]).then(res => {
              const heights = res.map(p => {
                if (p) return p.height;
                return undefined;
              });
              model._instances.forEach(instance => {
                const idx = Number(instance.instanceId.replace(`${layerId}-`, ''));
                const item = param.batchModel[idx];
                const mm = Tool$1.MatrixFromPosHprScale(item, heights[idx]);
                instance.modelMatrix = mm;
              });
              scene.globe.translucency.enabled = oldState;
            });
          }, 200);
        }
        //添加所有动画
        model.activeAnimations.addAll({
          multiplier: 1,
          loop: Cesium.ModelAnimationLoop.REPEAT
        });
      });
      return model;
    }
  }
  /**
   * 生成水面
   * @param {*} layerParam
   */
  static generateWater(layerParam, collection, parentShow = true) {
    const param = layerParam.layerWaterSurface;
    const show = layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && param.isLight));
    let water = undefined;
    let outline = undefined;
    let positions = [];
    const instances = [];
    if (param) {
      if (param.isLight == null || param.isLight == undefined) param.isLight = 1;
      const material = Cesium.Material.fromType('Water', {
        normalMap: WaterNormal,
        frequency: param.frequency,
        animationSpeed: param.animationSpeed,
        amplitude: param.amplitude,
        specularIntensity: param.specularIntensity,
        baseWaterColor: Cesium.Color.fromCssColorString(param.color)
      });
      const constructor = param.isGround == 1 ? Cesium.GroundPrimitive : Cesium.Primitive;

      if (param.batchCoordinate.length > 0) {
        // 批量
        positions = param.batchCoordinate.map(coords => {
          return coords.map(p => {
            if (!p.z || isNaN(p.z)) p.z = 0;
            const height = param.isGround == 0 ? param.alt : p.z || 0;
            return Cesium.Cartesian3.fromDegrees(p.x, p.y, height);
          });
        });
        positions.forEach((coords, i) => {
          const geometry = new Cesium.PolygonGeometry({
            perPositionHeight: true,
            polygonHierarchy: new Cesium.PolygonHierarchy(coords),
            vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
          });
          instances.push(
            new Cesium.GeometryInstance({
              geometry: geometry,
              id: `${param.layerId}-${i}`,
              attributes: {
                distanceDisplayCondition: new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(
                  param.minVisibleAlt,
                  param.maxVisibleAlt
                )
              }
            })
          );
        });
      } else {
        // 单个
        positions = param.coordinate.map(p => {
          if (!p.z || isNaN(p.z)) p.z = 0;
          const height = param.isGround == 0 ? param.alt : p.z || 0;
          return Cesium.Cartesian3.fromDegrees(p.x, p.y, height);
        });
        const geometry = new Cesium.PolygonGeometry({
          polygonHierarchy: new Cesium.PolygonHierarchy(positions),
          vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
          perPositionHeight: true
        });
        instances.push(
          new Cesium.GeometryInstance({
            geometry: geometry,
            id: layerParam.id,
            attributes: {
              distanceDisplayCondition: new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(
                param.minVisibleAlt,
                param.maxVisibleAlt
              )
            }
          })
        );
        if (positions.length > 0) positions = [positions];
      }

      water = collection.add(
        new constructor({
          geometryInstances: instances,
          appearance: new Cesium.EllipsoidSurfaceAppearance({
            material: material,
            aboveGround: true
          }),
          show: show
        })
      );
      if (positions.length > 0) {
        outline = LayerFactory.generateBatchedPolyline(param, positions, collection, show);
      }
    }
    return { water, outline };
  }
  /**
   * 添加批量边界，和单个边界不同，用primitive分别存放面和线
   * 贴地用groundPrimitive
   * @param {*} layerParam
   * @param {*} collection
   */
  static generateBatchedBorder(layerParam, collection, parentShow = true) {
    const param = layerParam.layerBorder;
    if (param) {
      if (param.isLight == null || param.isLight == undefined) param.isLight = 1;
      let outline,
        polygon = undefined;
      const multilinestring = []; //计算范围
      const positions = [];
      param.batchCoordinate.forEach(coordinate => {
        const position = [];
        const linestring = [];
        coordinate.forEach(p => {
          if (!p.z || isNaN(p.z)) p.z = 0;
          let height = p.z;
          if (param.isGround == 0) height = param.alt || 0;
          position.push(Cesium.Cartesian3.fromDegrees(p.x, p.y, height));
          linestring.push([p.x, p.y]);
        });
        positions.push(position);
        multilinestring.push(linestring);
      });
      const bbox = turf.bbox(turf.multiLineString(multilinestring));
      const rectangle = new Cesium.Rectangle(
        Cesium.Math.toRadians(bbox[0] - 0.00005),
        Cesium.Math.toRadians(bbox[1] - 0.00005),
        Cesium.Math.toRadians(bbox[2] + 0.00005),
        Cesium.Math.toRadians(bbox[3] + 0.00005)
      );
      const show = layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && param.isLight));
      if (param.borderType == 0) {
        polygon = LayerFactory.generateBatchedPolygon(param, positions, collection, show);
      }
      outline = LayerFactory.generateBatchedPolyline(
        param,
        positions,
        collection,
        show,
        layerParam.type === LayerType.TerrainEdittingCollection
      );
      return {
        polygon,
        outline,
        rectangle
      };
    }
    return {};
  }
  /**
   * 生成批量面
   * @param {*} param
   * @param {*} positions
   */
  static generateBatchedPolygon(param, positions, collection, show = true) {
    const constructor = param.isGround == 1 ? Cesium.GroundPrimitive : Cesium.Primitive;
    const instances = [];
    let material;
    if (param.image) {
      material = Cesium.Material.fromType('Image', {
        image: param.image,
        repeat: new Cesium.Cartesian2(param.repeat, param.repeat),
        color: Cesium.Color.fromCssColorString(param.color)
      });
    } else {
      material = Cesium.Material.fromType('Color', {
        color: Cesium.Color.fromCssColorString(param.color)
      });
    }
    positions.forEach((coords, i) => {
      const hierarchy = new Cesium.PolygonHierarchy(coords);
      const geometry = new Cesium.PolygonGeometry({
        perPositionHeight: true,
        polygonHierarchy: hierarchy,
        vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
      });
      instances.push(
        new Cesium.GeometryInstance({
          geometry: geometry,
          id: `${param.layerId}-${i}`,
          attributes: {
            distanceDisplayCondition: new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(
              param.minVisibleAlt,
              param.maxVisibleAlt
            )
          }
        })
      );
    });
    return collection.add(
      new constructor({
        geometryInstances: instances,
        appearance: new Cesium.EllipsoidSurfaceAppearance({
          material: material,
          aboveGround: true
        }),
        show: show
      })
    );
  }
  /**
   * 生成批量线
   * @param {*} param
   * @param {*} positions
   */
  static generateBatchedPolyline(param, positions, collection, show = true, disableDepthTest = false) {
    const gconstructor = param.isGround == 1 ? Cesium.GroundPolylineGeometry : Cesium.PolylineGeometry;
    const pconstructor = param.isGround == 1 ? Cesium.GroundPolylinePrimitive : Cesium.Primitive;
    const instances = [];
    let material;
    if (param.isDottedLine) {
      material = Cesium.Material.fromType('PolylineDash', {
        color: Cesium.Color.fromCssColorString(param.borderColor),
        gapColor: Cesium.Color.fromCssColorString(param.intervalColor),
        dashLength: param.dottedLineInterval
      });
    } else {
      material = Cesium.Material.fromType('Color', {
        color: Cesium.Color.fromCssColorString(param.borderColor)
      });
    }
    positions.forEach((coords, i) => {
      const geometry = new gconstructor({
        positions: coords,
        width: param.borderSize
      });
      instances.push(
        new Cesium.GeometryInstance({
          geometry: geometry,
          id: `${param.layerId}-${i}`,
          attributes: {
            distanceDisplayCondition: new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(
              param.minVisibleAlt,
              param.maxVisibleAlt
            )
          }
        })
      );
    });
    return collection.add(
      new pconstructor({
        geometryInstances: instances,
        appearance: new Cesium.PolylineMaterialAppearance({
          material: material
        }),
        depthFailAppearance: disableDepthTest
          ? new Cesium.PolylineMaterialAppearance({
            material: Cesium.Material.fromType('Color', {
              color: new Cesium.Color(1, 1, 0, 0.5)
            })
          })
          : undefined,
        show: show
      })
    );
  }
  /**
   *
   * @param {*} layerParam 图层参数
   * @param {*} collection 流场集合
   * @param {*} outlineCollection 边线集合
   * @param {*} preRender 场景渲染事件
   * @param {*} parentShow 父级是否显示
   * @param {*} loadGif 是否播放动图
   * @param {*} getOrSetGifImages 获取或设置动图
   */
  static generateFlowField(
    layerParam,
    collection,
    outlineCollection,
    preRender,
    parentShow = true,
    loadGif = true,
    getOrSetGifImages = () => {
      return [];
    }
  ) {
    const param = layerParam.layerFlow;
    const show = layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && param.isLight));
    if (param.flowType == 0 && param.coordinate.length > 0) {
      return LayerFactory.generateGifFlowField(
        param,
        collection,
        outlineCollection,
        preRender,
        show,
        loadGif,
        getOrSetGifImages
      );
    }
    return {};
  }
  /**
   * 通过gif生成流场
   * @param {*} param 流产参数
   * @param {*} collection 流场集合
   * @param {*} outlineCollection 边线集合
   * @param {*} preRender 场景渲染事件
   * @param {*} loadGif 是否播放动图
   * @param {*} getOrSetGifImages 获取或设置动图
   */
  static generateGifFlowField(
    param,
    collection,
    outlineCollection,
    preRender,
    show,
    loadGif,
    getOrSetGifImages = () => {
      return [];
    }
  ) {
    const points = param.coordinate.map(p => {
      return Cesium.Cartesian3.fromDegrees(p.x, p.y, param.alt);
    });
    let outline;
    let flowField;
    let remove = () => { };
    const rectangle = Cesium.Rectangle.fromCartesianArray(points);
    points.push(points[0]); // 闭合线

    if (outlineCollection) {
      // 边线
      const polyline = LayerFactory.generateBorderPolyline(param, points);
      outline = outlineCollection.add({
        id: `${param.layerId}-outline`,
        polyline: polyline,
        show: show
      });
    }
    let path = param.path;
    let images = getOrSetGifImages();
    if (path) {
      const material = Cesium.Material.fromType('Image', {
        image: images[0] || LayerFactory.LoadingImages[0], // 这里不使用path，减少一次请求，此方法在修改参数时也会调用
        transparent: true,
        color: Cesium.Color.fromCssColorString(param.color)
      });
      material.translucent = true;
      const constructor = param.isGround == 1 ? Cesium.GroundPrimitive : Cesium.Primitive;
      flowField = collection.add(
        new constructor({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.RectangleGeometry({
              rectangle: rectangle,
              height: param.alt,
              stRotation: Cesium.Math.toRadians(param.imgRotation || 0)
            }),
            id: param.layerId
          }),
          appearance: new Cesium.MaterialAppearance({
            material: material
          }),
          show: show
          // releaseGeometryInstances: false
        })
      );

      // 播放动图，频繁调整时不要播放
      if (loadGif) {
        let i = 0,
          index = -1,
          speed = param.speed || 10,
          loading = LayerFactory.LoadingImages;
        remove = preRender.addEventListener(() => {
          if (flowField.show) {
            if (images.length > 0) {
              loading = undefined;
              if (i < speed * (images.length - 1)) {
                i++;
              } else {
                i = 0;
              }
              const newIndex = Math.floor(i / speed);
              if (newIndex != index) {
                index = newIndex;
                material.uniforms.image = images[index];
              }
            } else if (loading?.length > 0) {
              if (i < speed * (loading.length - 1)) {
                i++;
              } else {
                i = 0;
              }
              const newIndex = Math.floor(i / speed);
              if (newIndex != index) {
                index = newIndex;
                material.uniforms.image = loading[index];
              }
            }
          }
        });
        if (images.length == 0) {
          Tool$1.loadGif(path).then(res => {
            console.log(`${param.name} gif解析完毕`);
            getOrSetGifImages(res);
          });
        }
      }
    }

    return {
      flowField,
      outline,
      remove
    };
  }
  /**
   * 生成3dtileset
   * @param {*} param
   * @returns
   */
  static generate3DTileset(layerParam, collection, scene, evaluateColor = () => { }) {
    const param = layerParam.layerTile;
    if (param && param.url) {
      const tileset = collection.add(
        new Cesium.Cesium3DTileset({
          url: param.url,
          dynamicScreenSpaceError: true,
          preloadWhenHidden: true,
          preferLeaves: true,
          maximumMemoryUsage: 512,
          skipLevelOfDetail: true,
          show: !layerParam.isView || (layerParam.isView && param.isLight),
          luminanceAtZenith: scene.light.intensity / 10
        })
      );
      tileset.id = param.layerId;
      tileset.name = layerParam.name;
      tileset.color = Cesium.Color.fromCssColorString(param.color || 'white');
      tileset.colorBlendMode = Cesium.Cesium3DTileColorBlendMode.REPLACE;

      tileset.readyPromise.then(() => {
        tileset.originalTransform = tileset._root.transform.clone();
        // 改变位置
        if (param.lon !== 0 || param.lat !== 0) {
          const newPos = Cesium.Cartesian3.fromRadians(
            Cesium.Math.toRadians(param.lon),
            Cesium.Math.toRadians(param.lat),
            param.alt
          );

          const transform = Cesium.Transforms.headingPitchRollToFixedFrame(
            newPos,
            new Cesium.HeadingPitchRoll(
              Cesium.Math.toRadians(param.heading),
              Cesium.Math.toRadians(param.pitch),
              Cesium.Math.toRadians(param.roll)
            )
          );

          const scale = Cesium.Matrix4.fromUniformScale(param.zoom || 0.01);

          Cesium.Matrix4.multiply(transform, scale, tileset._root.transform);
        } else {
          const tt = tileset.originalTransform.clone();
          Cesium.Matrix4.clone(tt, tileset._root.transform);
          // 改变高度
          const orgPos = new Cesium.Cartesian3(tt[12], tt[13], tt[14]);
          const cartographic = Cesium.Cartographic.fromCartesian(orgPos);
          // const orgPos = Cesium.Matrix4.multiplyByPoint(Cesium.Matrix4.inverse(tileset.modelMatrix, new Cesium.Matrix4()), tileset.boundingSphere.center, new Cesium.Cartesian3());
          // const cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);

          const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
          const offset = Cesium.Cartesian3.fromRadians(
            cartographic.longitude + Cesium.Math.toRadians(param.lon),
            cartographic.latitude + Cesium.Math.toRadians(param.lat),
            param.alt
          );
          const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());

          // 旋转
          const quaternion = Cesium.Quaternion.fromAxisAngle(orgPos, Cesium.Math.toRadians(param.heading));
          const m3 = Cesium.Matrix3.fromQuaternion(quaternion);
          const transform = Cesium.Matrix4.fromRotationTranslation(m3, translation);

          tileset.modelMatrix = transform;
        }
      });

      // 添加颜色
      tileset.style = new Cesium.Cesium3DTileStyle({
        color: {
          evaluateColor: (feature, result) => {
            return evaluateColor(feature, result);
          }
        }
      });

      // const style = new Cesium.Cesium3DTileStyle({
      //   defines: {
      //     test: "${feature['代码绑定属性测试']}"
      //   },
      //   color: {
      //     // conditions: [
      //     //   // ['${test} === undefined', 'color("red", 0.5)'],
      //     //   // ['${test} > 0.8', 'color("purple", 0.5)'],
      //     //   // ['${test} > 0.6', 'color("blue", 0.5)'],
      //     //   // ['${test} > 0.4', 'color("green", 0.5)'],
      //     //   // ['${test} > 0.2', 'color("yellow", 0.5)'],
      //     //   ['true', `color("${param.color}")`]
      //     // ]
      //     evaluateColor: (feature, result) => {
      //       return evaluateColor(feature, result);
      //     }
      //   }
      // });

      // if (param.layerId === 'test3') {
      //   const array1 = [];
      //   const array2 = [];
      //   for (let i = 0; i < 25; i += 1) {
      //     array1.push(`GL_${i.toString().padStart(3, '0')}`);
      //     array2.push(`GL_${(i + 25).toString().padStart(3, '0')}`);
      //   }

      //   const arrays = [array1, array2];

      //   let mark = 1;
      //   style.show = {
      //     evaluate: feature => {
      //       const name = feature.getProperty('name');
      //       return arrays[mark].includes(name);
      //     }
      //     // conditions: [['regExp(${name}).test("' + regStr + '")', 'true']]
      //   };
      //   setInterval(() => {
      //     mark = mark ? 0 : 1;
      //     tileset.makeStyleDirty();
      //   }, 3000);
      // }

      // tileset.style = style;
      // tileset.tileLoad.addEventListener(tile => {
      //   if (tile.content.featuresLength > 0) {
      //     for (let i = 0; i < tile.content.featuresLength; i++) {
      //       tile.content.getFeature(i).setProperty('代码绑定属性测试', Math.random());
      //     }
      //   }
      //   if (tile.content._contents && tile.content._contents.length > 0) {
      //     for (let i = 0; i < tile.content._contents.length; i++) {
      //       const content = tile.content._contents[i];
      //       if (content.featuresLength > 0) {
      //         for (let j = 0; j < content.featuresLength; j++) {
      //           content.getFeature(j).setProperty('代码绑定属性测试', Math.random());
      //         }
      //       }
      //       if (content._contents) {
      //         debugger;
      //       }
      //     }
      //   }
      // });
      return tileset;
    }
    return undefined;
  }

  static generateTerrainModifyTin(param, viewer) {
    const results = [];
    const terrainProvider = viewer.terrainProvider;
    const quadtree = viewer.scene.globe._surface._tileProvider.quadtree;

    param.batchCoordinate.forEach(coordinates => {
      const points = coordinates.map(p => {
        return turf.point([p.x, p.y], {
          z: p.z
        });
      });
      points.splice(points.length - 1, 1); // 边界闭合，最后一个点与第一个点重合
      const collection = turf.featureCollection(points);
      // 整体边界
      const polygon = turf.convex(collection);

      // 三角网
      const tin = turf.tin(collection, 'z');
      tin.features.forEach(fea => {
        const coords = fea.geometry.coordinates[0];
        coords[0].push(fea.properties.a);
        coords[1].push(fea.properties.b);
        coords[2].push(fea.properties.c);
        coords[3].push(fea.properties.a);
      });

      results.push({
        polygon,
        polygonTriangles: tin.features
      });
    });

    terrainProvider._terrainEdits = results;
    quadtree._terrainNeedsUpdate = true;
  }
}

/* eslint-disable */

const dataUrl = process.env.VUE_APP_DATA_SERVER_URL;
const tdtToken = process.env.VUE_APP_Tdt_Token || '16db5f2b05abef1bc22c88924a318eb0';

class Tool$1 {
  constructor(cesiummap) {
    this.cesiummap = cesiummap;
    this.viewer = cesiummap.viewer;
    this.flowFieldCollection = null;

    this.viewer.scene.postProcessStages.fxaa.enabled = true;
    this.antiAliasing();
    this.optimizeLighting();

    this.indexDb = this.cesiummap.indexDb;
    this.flowFieldClock = null;
    this.delta = 0.0001;

    this.orgLeftDbClick = null;
    this.distanceMeasure = new Measure(this.viewer, MeasureType.DISTANCE, this.cesiummap.pickMode);
    this.areaMeasure = new Measure(this.viewer, MeasureType.AREA, this.cesiummap.pickMode);

    this.pickObjHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas); // 物体识别
    this.pickCoordsHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas); // 坐标拾取

    //高亮选择
    const fragmentShaderSource =
      'uniform sampler2D colorTexture;\n' +
      'varying vec2 v_textureCoordinates;\n' +
      'uniform vec4 highlight;\n' +
      'void main() {\n' +
      '    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n' +
      '    if (czm_selected()) {\n' +
      '        vec3 highlighted = highlight.a * highlight.rgb + (1.0 - highlight.a) * color.rgb;\n' +
      '        gl_FragColor = vec4(highlighted, 1.0);\n' +
      '    } else { \n' +
      '        gl_FragColor = color;\n' +
      '    }\n' +
      '}\n';
    this.silhouette = this.viewer.scene.postProcessStages.add(
      new Cesium.PostProcessStage({
        fragmentShader: fragmentShaderSource,
        uniforms: {
          highlight: function () {
            return new Cesium.Color(1.0, 0.0, 0.0, 0.5);
          }
        }
      })
    );
    this.silhouette.selected = [];
    this.silhouette.enabled = false;

    this.selectedTileName = null;

    this.removeCameraAutoRotatingHander = null;
    this.autoRotating = false;
    this.addCameraAutoRotating();

    this._keydwonEvt = this._keydwonEvt.bind(this);
    this._keyupEvt = this._keyupEvt.bind(this);

    this.movingStatus = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      up: false,
      down: false
    };

    this.addCameraMoveEvt();

    // 定位标志
    this.pinBuilder = new Cesium.PinBuilder();
    this.pinner = this.viewer.entities.add({
      name: 'tool-locate-pin',
      billboard: {
        image: this.pinBuilder.fromColor(Cesium.Color.fromCssColorString('#caf982'), 48).toDataURL(),
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        heightReference: Cesium.HeightReference.NONE
      }
    });
  }
  /**
   * 计算相机飞行至位置
   * @param {*} cartesian
   */
  static getCameraFlyToPosition(cartesian, camera) {
    let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    return {
      lon: Cesium.Math.toDegrees(cartographic.longitude),
      lat: Cesium.Math.toDegrees(cartographic.latitude) - (0.00001 * 200) / 1.1,
      alt: cartographic.height + 200,
      heading: 0,
      pitch: -45,
      roll: 0,
      duration: 0
    };
  }
  /**
   * 计算相机飞行至位置经纬度
   * @param {*} degrees
   */
  static getCameraFlyToDegrees(degrees) {
    return {
      lon: degrees[0],
      lat: degrees[1] - (0.00001 * 200) / 1.1,
      alt: degrees[2] + 200,
      heading: 0,
      pitch: -45,
      roll: 0,
      duration: 0
    };
  }
  /**
   * 读取json文件
   * @param {*} filePath
   * @param {*} success
   */
  static getJsonFile(filePath, success = () => { }) {
    let request = new XMLHttpRequest();
    request.open('GET', filePath);
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        let json = JSON.parse(request.responseText);
        success(json);
      }
    };
  }
  /**
   * 生成底图
   * @param {*} url
   */
  static generateBasemap(config) {
    if (!config.url) {
      return new Cesium.UrlTemplateImageryProvider({
        url: `https://t{sub}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${tdtToken}`,
        maximumLevel: 18,
        customTags: {
          sub: (imageryProvider, x, y, level) => {
            return Math.round(Math.random() * 6);
            // return 6;
          }
        }
      });
    }
    const params = Object.assign({}, config);
    params.minimumLevel = config.minVisible || config.minimumLevel || 0;
    params.maximumLevel = config.maxVisible || config.maximumLevel || 18;
    if (config.url.includes('tianditu')) {
      params.customTags = {
        sub: (imageryProvider, x, y, level) => {
          return Math.round(Math.random() * 6);
        }
      };
    }

    // 给高德地图纠偏
    if (config.url.includes('autonavi')) {
      params.tilingScheme = new AmapMercatorTilingScheme();
      params.customTags = {
        sub: (imageryProvider, x, y, level) => {
          return Math.round(Math.random() * 3) + 1;
        }
      };
    }

    // 加载百度并纠偏
    if (config.url.includes('bdimg')) {
      params.tilingScheme = new BaiduMercatorTilingScheme();

      const result = new Cesium[config.constructor](params);
      result.requestImage = function (x, y, level) {
        if (!this.ready) {
          throw new Cesium.DeveloperError('requestImage must not be called before the imagery provider is ready.');
        }
        this._tilingScheme.getNumberOfXTilesAtLevel(level);
        this._tilingScheme.getNumberOfYTilesAtLevel(level);
        let url = this.url.replace('{z}', level).replace('{s}', String(1));

        // if (this._crs === 'WGS84') {
        url = url.replace('{x}', String(x)).replace('{y}', String(-y));
        // } else {
        //   url = url.replace('{x}', String(x - xTiles / 2)).replace('{y}', String(yTiles / 2 - y - 1));
        // }
        return Cesium.ImageryProvider.loadImage(this, url);
      };
      return result;
    }

    return new Cesium[config.constructor](params);
  }
  /**
   * 根据元文件生成底图
   * @param {*} url 
   * @param {*} params 
   */
  static generateBasemapFromMeta(url, params = {}) {
    return new Promise((resolve) => {
      const metaUrl = `${url}/meta.json`;
      Tool$1.getJsonFile(metaUrl, json => {
        const { latLonBounds, tilesize, maxzoom, minzoom } = json;
        const provider = Tool$1.generateBasemap({
          constructor: "UrlTemplateImageryProvider",
          url: `${url}/{z}/{x}/{y}.png`,
          tileWidth: tilesize,
          tileHeight: tilesize,
          minimumLevel: params.minimumLevel || minzoom,
          maximumLevel: params.maximumLevel || maxzoom,
          rectangle: params.rectangle || Cesium.Rectangle.fromDegrees(
            latLonBounds.west,
            latLonBounds.south,
            latLonBounds.east,
            latLonBounds.north
          ),
        });

        resolve(provider);
      });
    })

  }
  /**
   * 生成天空盒
   */
  static generateSkybox(pictures, nearGround = true) {
    if (pictures)
      return new Cesium.SkyBox({
        nearGround: nearGround,
        sources: {
          positiveX: pictures.rightPath,
          negativeX: pictures.leftPath,
          positiveY: pictures.frontPath,
          negativeY: pictures.backPath,
          positiveZ: pictures.upPath,
          negativeZ: pictures.downPath
        }
      });
    return undefined;
  }
  /**
   * 随机颜色
   */
  static randomColor(alpha = 1) {
    const random = () => {
      return parseInt(Math.random() * 256)
        .toString(16)
        .padLeft(2, '0');
    };
    alpha = parseInt(alpha * 255);
    return `#${random()}${random()}${random()}${alpha.toString(16).padLeft(2, '0')}`;
  }
  /**
   * 解析gif
   * @param {*} url
   */
  static loadGif(url) {
    const img = new Image();
    // gif库需要img标签配置下面两个属性
    img.setAttribute('rel:animated_src', url);
    img.setAttribute('rel:auto_play', '0');
    document.body.appendChild(img);
    const images = [];
    // 新建gif实例
    let rub = new SuperGif({ gif: img });
    return new Promise(resolve => {
      rub.load(() => {
        for (let i = 1; i <= rub.get_length(); i++) {
          // 遍历gif实例的每一帧
          rub.move_to(i);
          images.push(rub.get_canvas().toDataURL());
        }
        resolve(images);
        // rub.get_canvas().parentElement.remove();
        // rub = undefined;
      });
    });
  }
  /**
   * 生成uuid
   */
  static generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }
  /**
   * 模型矩阵
   * @param {*} lon
   * @param {*} lat
   * @param {*} alt
   * @param {*} heading
   * @param {*} pitch
   * @param {*} roll
   * @param {*} zoom
   */
  static MatrixFromPosHprScale({ lon, lat, alt = 0, heading = 0, pitch = 0, roll = 0, zoom = 1 }, height = undefined) {
    let heightInuse = alt;
    if (!Number.isNaN(Number(height))) {
      heightInuse = height;
    }
    const pos = Cesium.Cartesian3.fromDegrees(lon, lat, heightInuse);

    let mm = Cesium.Transforms.headingPitchRollToFixedFrame(
      pos,
      new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(heading),
        Cesium.Math.toRadians(pitch),
        Cesium.Math.toRadians(roll)
      )
    );
    Cesium.Matrix4.multiply(mm, Cesium.Matrix4.fromUniformScale(zoom), mm);
    return mm;
  }
  /**
   * 是否移动端
   * @returns
   */
  static isMobile() {
    if (/android/i.test(navigator.userAgent)) {
      //document.write("This is Android'browser.");//这是Android平台下浏览器
      return true;
    }
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      //document.write("This is iOS'browser.");//这是iOS平台下浏览器
      return true;
    }
    return false;
  }
  /**
   * 帮助设置双击事件
   * @param {*} handler
   */
  static setDoubleClickEvt(handler, doubleClick) {
    let time = Cesium.getTimestamp();
    if (Tool$1.isMobile()) {
      const orginSingleClick = handler.getInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK); //移除原有单击
      handler.setInputAction(evt => {
        const now = Cesium.getTimestamp();
        if (now - time > 350) {
          // 判定本次为单击
          if (typeof orginSingleClick === 'function') orginSingleClick(evt);
        } else {
          // 判定为双击
          doubleClick(evt);
        }
        time = now;
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
    handler.setInputAction(doubleClick, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  }
  /**
   * 格式化日期
   * @param {*} date
   * @param {*} fmt
   * @returns
   */
  static formatDate(date, fmt) {
    const o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return fmt;
  }
  /**
   * 改善锯齿
   */
  antiAliasing() {
    let supportsImageRenderingPixelated = this.viewer.cesiumWidget._supportsImageRenderingPixelated;
    if (supportsImageRenderingPixelated) {
      let vtxf_dpr = window.devicePixelRatio;
      while (vtxf_dpr >= 2.0) {
        vtxf_dpr /= 2.0;
      }
      this.viewer.resolutionScale = vtxf_dpr;
    }
    this.viewer.scene.postProcessStages.fxaa.enabled = true;

    this.viewer.scene.globe.maximumScreenSpaceError = 1.5; // 底图清晰一点
  }
  /**
   * 改善光照
   */
  optimizeLighting() {
    //更改光照方式
    // this.viewer.scene.globe.dynamicAtmosphereLighting = false;
    this.viewer.scene.light = new Cesium.DirectionalLight({
      direction: this.viewer.scene.camera.directionWC,
      color: Cesium.Color.WHITE,
      intensity: this.viewer.scene.light.intensity
    });
    const rotationX = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(45), new Cesium.Cartesian3());
    const from45Sky = Cesium.Matrix3.multiplyByVector(
      rotationX,
      new Cesium.Cartesian3(0, 0, -1),
      new Cesium.Cartesian3()
    );

    this.viewer.scene.preRender.addEventListener((scene, time) => {
      if (scene.mode !== Cesium.SceneMode.SCENE3D) return;
      const camera = scene.camera;
      // Updated every frame
      scene.camera.directionWC.clone();
      Cesium.Cartesian3.subtract(
        new Cesium.Cartesian3(),
        scene.camera.position,
        new Cesium.Cartesian3()
      );

      // const from45SouthSky = Cesium.Matrix3.multiplyByVector(rotationX, fromTop, new Cesium.Cartesian3());

      const local2WorldTransform = Cesium.Transforms.headingPitchRollToFixedFrame(
        camera.positionWC.clone(),
        new Cesium.HeadingPitchRoll(camera.heading, 0, 0)
      );

      const finalDir = Cesium.Matrix4.multiplyByPointAsVector(local2WorldTransform, from45Sky, new Cesium.Cartesian3());

      scene.light.direction = Cesium.Cartesian3.normalize(finalDir, new Cesium.Cartesian3());
    });
  }
  /**
   * 添加自动旋转
   */
  addCameraAutoRotating() {
    const me = this;
    let spinRate = 1;
    const min = 80000;
    const max = 30000000;
    this.removeCameraAutoRotatingHander = this.viewer.clock.onTick.addEventListener(() => {
      if (me.autoRotating) {
        const height = me.viewer.camera.positionCartographic.height;
        if (height >= min && height <= max) {
          spinRate = (height - min) / (max - min);
        } else if (height < min) {
          spinRate = 0;
        }
        me.viewer.camera.rotate(Cesium.Cartesian3.UNIT_Z, 0.001 * spinRate);
      }
    }, this);
  }
  /**
   * 添加键盘移动相机事件
   */
  addCameraMoveEvt() {
    document.body.addEventListener('keydown', this._keydwonEvt);
    document.body.addEventListener('keyup', this._keyupEvt);

    const { movingStatus } = this;

    this.viewer.scene.preRender.addEventListener((scene) => {
      const { camera } = scene;
      let height = Math.abs(camera.positionCartographic.height);

      // let pos = scene.clampToHeight(camera.position);
      // if (pos) {
      //   const clampHeight = Cesium.Cartographic.fromCartesian(pos).height;
      //   height = height - clampHeight;
      // }
      const max = 10000000;
      const min = 0.1;
      const maxAmount = 500000;
      const minAmout = 0.5;
      let amount = 1;

      if (height < min) {
        amount = minAmout;
      } else if (height >= min && height <= max) {
        amount = ((height - min) / (max - min)) * maxAmount;
        if (amount < min) amount = min;
      } else if (height > max) {
        amount = maxAmount;
      }

      if (movingStatus.forward) {
        camera.moveForward(amount);
      }
      if (movingStatus.backward) {
        camera.moveBackward(amount);
      }
      if (movingStatus.left) {
        camera.moveLeft(amount);
      }
      if (movingStatus.right) {
        camera.moveRight(amount);
      }
      if (movingStatus.up) {
        camera.moveUp(amount);
      }
      if (movingStatus.down) {
        camera.moveDown(amount);
      }
    });
  }
  /**
   * 激活坐标拾取
   * @param {*} domId
   */
  activatePickCoords(domId) {
    this.viewer.scene.globe.translucency.enabled = false;
    this._setPickCoordsEvt(domId);
  }
  /**
   * 关闭坐标拾取
   */
  deactivatePickCoords() {
    this.pickCoordsHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this.viewer.scene.globe.translucency.enabled = this.cesiummap.translucencyEnabled;
    if (this.coordsPopup) this.coordsPopup.destroy();
    this.pinner.show = false;
  }
  /**
   * 激活物体拾取
   */
  activatePickObj(domId, callback) {
    this.viewer.scene.globe.translucency.enabled = false;
    this.silhouette.selected = [];
    this.silhouette.enabled = true;
    this._setPickObjectEvt(domId, callback);
  }
  /**
   * 关闭物体拾取
   */
  deactivatePickObj() {
    this.silhouette.enabled = false;
    this.silhouette.selected = [];
    if (this.selectedTile) this.selectedTile.tileset.makeStyleDirty();
    this.selectedTile = null;
    this.pickObjHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    this.pickObjHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.viewer.scene.globe.translucency.enabled = this.cesiummap.translucencyEnabled;
    if (this.pickObjPopup) this.pickObjPopup.destroy();
  }
  /**
   * 启用测量
   * @param {*} type
   */
  activateMeasure(type) {
    const isMobile = Tool$1.isMobile();
    this.deactivateMeasure(false);
    this.viewer.scene.globe.translucency.enabled = false;
    if (this.cesiummap.evtHelper.evtHandler) {
      this.orgLeftDbClick = this.cesiummap.evtHelper.evtHandler.getInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
      this.cesiummap.evtHelper.evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      if (isMobile) {
        this.cesiummap.evtHelper.evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }
    }

    switch (type) {
      case MeasureType.DISTANCE:
        this.distanceMeasure.activate();
        break;
      case MeasureType.AREA:
        this.areaMeasure.activate();
        break;
    }
  }
  /**
   * 停用测量
   */
  deactivateMeasure(resetEvt = true) {
    this.distanceMeasure.clear();
    this.areaMeasure.clear();
    this.distanceMeasure.deactivate();
    this.areaMeasure.deactivate();
    if (resetEvt && this.orgLeftDbClick) {
      this.cesiummap.evtHelper.evtHandler.setInputAction(
        this.orgLeftDbClick,
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
      if (Tool$1.isMobile()) {
        Tool$1.setDoubleClickEvt(this.cesiummap.evtHelper.evtHandler, this.orgLeftDbClick);
      } else {
        this.cesiummap.evtHelper.evtHandler.setInputAction(
          this.orgLeftDbClick,
          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
        );
      }

      this.viewer.scene.globe.translucency.enabled = this.cesiummap.translucencyEnabled;
    }
  }
  /**
   * 添加水面
   */
  addWaterSurface(fileUrl, name, show = true, heightOffset, color) {
    let me = this.cesiummap;
    //geojson
    let promise = Cesium.GeoJsonDataSource.load(fileUrl);
    promise.then(
      ds => {
        ds.name = name;
        let instances = [];
        ds.entities.values.forEach(entity => {
          let polygon = entity.polygon;
          let geometry = new Cesium.PolygonGeometry({
            polygonHierarchy: polygon.hierarchy._value,
            // vertexFormat: Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
            height: heightOffset || 0.1
          });
          instances.push(
            new Cesium.GeometryInstance({
              geometry: geometry
            })
          );
        });

        let material = new Cesium.Material({
          fabric: {
            type: 'Water',
            uniforms: {
              normalMap: LayerFactory.WaterNormal,
              frequency: 7777.0, //浪的多少
              animationSpeed: 0.01,
              amplitude: 17,
              specularIntensity: 0.7,
              fadeFactor: 0.3,
              baseWaterColor: color || Cesium.Color.fromCssColorString('rgba(19, 79, 156,0.5)')
            }
          }
        });

        let primitive = me.viewer.scene.primitives.add(
          new Cesium.Primitive({
            geometryInstances: instances,
            appearance: new Cesium.EllipsoidSurfaceAppearance({
              aboveGround: false,
              translucent: true,
              material: material
            }),
            // depthFailAppearance: new Cesium.EllipsoidSurfaceAppearance({
            //     aboveGround: false,
            //     translucent: true
            // }),
            // appearance: new Cesium.MaterialAppearance({
            //     material: material
            // }),//效果不好
            show: show
          })
        );
        // primitive.depthFailAppearance.material = Cesium.Material.fromType('Color', {
        //     color: new Cesium.Color(0.2, 0.3, 0.6, 0.1)
        // });

        if (me.waterSurface) {
          if (Array.isArray(me.waterSurface)) {
            me.waterSurface.push(primitive);
          } else {
            me.waterSurface = [me.waterSurface, primitive];
          }
        } else {
          me.waterSurface = primitive;
        }
      },
      e => {
        error.log(e);
      }
    );
  }
  /**
   * 添加流场
   */
  addFlowField(fileUrl, success = () => { }) {
    let me = this;

    let indexDb = this.indexDb;
    indexDb.getData(fileUrl, '流场').then(res => {
      if (res) {
        me._processFlowData(res.data, success);
      } else {
        let promise = Cesium.Resource.fetch({
          url: dataUrl + fileUrl
        });
        promise.then(res => {
          res = JSON.parse(res);
          indexDb
            .addData(
              {
                id: fileUrl,
                data: res
              },
              '流场'
            )
            .then(
              res => { },
              err => {
                alert(err);
              }
            );
          me._processFlowData(res, success);
        });
      }
    });
  }
  /**
   * 定位
   * @param {*} pos
   */
  pin(pos) {
    this.pinner.show = true;
    this.pinner.position = pos;
    this.viewer.flyTo(this.pinner, {
      duration: 0
    });
  }
  /**
   * 允许平移模型
   *
   */
  _enableTranslate() {
    let viewer = this.viewer;

    let me = this;

    let handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    let pickedObject = null;
    let leftDownFlag = false;

    handler.setInputAction(function (movement) {
      pickedObject = viewer.scene.pick(movement.position);
      if (Cesium.defined(pickedObject)) {
        let contains = false;
        if (me.cesiummap.staticCollections.contains(pickedObject.primitive)) contains = true;
        if (!contains) {
          for (let i = 0; i < me.cesiummap.staticCollections._primitives.length; i++) {
            let collection = me.cesiummap.staticCollections._primitives[i];
            if (typeof collection.contains == 'function' && collection.contains(pickedObject.primitive)) {
              contains = true;
              break;
            }
          }
        }

        if (contains) {
          leftDownFlag = true;
          document.body.style.cursor = 'pointer';
          viewer.scene.screenSpaceCameraController.enableRotate = false; //锁定相机
          pickedObject.primitive.style = new Cesium.Cesium3DTileStyle({
            color: {
              conditions: [['true', 'color("rgba(0,255,0,0.5)")']]
            }
          });
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    handler.setInputAction(function () {
      leftDownFlag = false;
      if (pickedObject) {
        pickedObject.primitive.style = new Cesium.Cesium3DTileStyle({
          color: {
            conditions: [['true', 'color("white")']]
          }
        });
        pickedObject = null;
        viewer.scene.screenSpaceCameraController.enableRotate = true; //解除锁定相机
        //handler.destroy();//销毁左键监听事件
        document.body.style.cursor = 'default';
      }
    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    // handler.setInputAction((movement) => {
    //     if (leftDownFlag && pickedObject.primitive.modelMatrix) {
    //         const cartesian = me.cesiummap.getPickPosition(movement.endPosition);
    //         if (cartesian) {
    //             let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    //             cartographic.height = 0;
    //             cartesian = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
    //             let headingPitchRoll = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(0), 0, 0);
    //             let m = Cesium.Transforms.headingPitchRollToFixedFrame(cartesian, headingPitchRoll);
    //             pickedObject.primitive.modelMatrix = m;
    //             console.log("move", {
    //                 lng: Cesium.Math.toDegrees(cartographic.longitude),
    //                 lat: Cesium.Math.toDegrees(cartographic.latitude),
    //             })
    //         }
    //     }
    // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    let deltax = 0,
      deltay = 0,
      deltah = 0,
      rotation = 0,
      deltaRotation = 0;
    document.addEventListener('keydown', e => {
      if (leftDownFlag && pickedObject && pickedObject.primitive) {
        switch (e.keyCode) {
          case 'W'.charCodeAt(0):
            me._changeModelHeight(pickedObject.primitive, 0, 0, this.delta);
            deltay += this.delta;
            deltaRotation = -rotation; //航偏角取反
            console.log({
              deltax,
              deltay,
              deltah,
              deltaRotation
            });
            break;
          case 'S'.charCodeAt(0):
            me._changeModelHeight(pickedObject.primitive, 0, 0, -this.delta);
            deltay -= this.delta;
            deltaRotation = -rotation; //航偏角取反
            console.log({
              deltax,
              deltay,
              deltah,
              deltaRotation
            });
            break;
          case 'A'.charCodeAt(0):
            me._changeModelHeight(pickedObject.primitive, 0, -this.delta, 0);
            deltax -= this.delta;
            deltaRotation = -rotation; //航偏角取反
            console.log({
              deltax,
              deltay,
              deltah,
              deltaRotation
            });
            break;
          case 'D'.charCodeAt(0):
            me._changeModelHeight(pickedObject.primitive, 0, this.delta, 0);
            deltax += this.delta;
            deltaRotation = -rotation; //航偏角取反
            console.log({
              deltax,
              deltay,
              deltah,
              deltaRotation
            });
            break;
          case 'Z'.charCodeAt(0):
            me._changeModelHeight(pickedObject.primitive, -1);
            deltah -= 1;
            deltaRotation = -rotation; //航偏角取反
            console.log({
              deltax,
              deltay,
              deltah,
              deltaRotation
            });
            break;
          case 'X'.charCodeAt(0):
            me._changeModelHeight(pickedObject.primitive, 1);
            deltah += 1;
            deltaRotation = -rotation; //航偏角取反
            console.log({
              deltax,
              deltay,
              deltah,
              deltaRotation
            });
            break;
          case 'Q'.charCodeAt(0):
            me._changeModelHeight(pickedObject.primitive, 0, 0, 0, -0.5);
            rotation -= 0.5;
            deltaRotation = -rotation; //航偏角取反
            console.log({
              deltax,
              deltay,
              deltah,
              deltaRotation
            });
            break;
          case 'E'.charCodeAt(0):
            me._changeModelHeight(pickedObject.primitive, 0, 0, 0, 0.5);
            rotation += 0.5;
            deltaRotation = -rotation; //航偏角取反
            console.log({
              deltax,
              deltay,
              deltah,
              deltaRotation
            });
        }
      }
    });
  }
  /**
   * 处理流场数据
   * @param {*} res
   */
  _processFlowData(res, success) {
    let me = this;

    let viewer = this.viewer;

    let instances = [];
    //计算时间，数据时间戳：秒
    let startTimeOri = res.times[0] * 1000;
    let timeDuration = res.times[res.times.length - 1] - res.times[0];
    let startTime = Cesium.JulianDate.fromDate(new Date(res.times[0] * 1000));
    let endTime = Cesium.JulianDate.fromDate(new Date(res.times[res.times.length - 1] * 1000));
    let singleMaterial = Cesium.Material.fromType(Cesium.Material.PolylineTrailType2, {
      color: new Cesium.Color(0, 1, 1, 1),
      duration: timeDuration,
      image: '/img/red.png',
      repeat: 1,
      length: 0.01,
      time: 0
    });
    //处理轨迹
    res.data.forEach((data, i) => {
      let coords = data.coordinates;

      let positions = coords.map(coord => {
        return new Cesium.Cartesian3.fromDegrees(coord[0], coord[1], 1);
      });

      let polyline = new Cesium.PolylineGeometry({
        positions: positions,
        width: 2
      });
      let instance = new Cesium.GeometryInstance({
        geometry: polyline
      });
      instances.push(instance);
    });

    let trailCollection = viewer.scene.primitives.add(
      new Cesium.Primitive({
        show: false,
        geometryInstances: instances,
        appearance: new Cesium.PolylineMaterialAppearance({
          material: singleMaterial
          // vertexShaderSource: vertexSource
        }),
        asynchronous: true
        // depthFailAppearance: new Cesium.PolylineMaterialAppearance({
        //   material: singleMaterial,
        //   // vertexShaderSource: vertexSource
        // }),
      })
    );

    me.flowFieldCollection = trailCollection;

    //添加时钟
    me.flowFieldClock = new Cesium.Clock({
      startTime: startTime,
      stopTime: endTime,
      currentTime: startTime,
      clockRange: Cesium.ClockRange.LOOP_STOP,
      multiplier: 1,
      canAnimate: false,
      shouldAnimate: true
      // clockStep: Cesium.ClockStep.TICK_DEPENDENT
    });

    trailCollection.readyPromise.then(() => {
      trailCollection.show = true;
      me.flowFieldClock.canAnimate = true;
      me.flowFieldClock.onTick.addEventListener(() => {
        let now = Cesium.JulianDate.toDate(me.flowFieldClock.currentTime);
        me.setFlowFieldTime(now);
        trailCollection.appearance.material.uniforms.time = (now.getTime() - startTimeOri) / 1000; //毫秒转秒
      });
      me.viewer.scene.preRender.addEventListener(() => {
        me.flowFieldClock.tick();
      });
      success(new Date(res.times[0] * 1000), new Date(res.times[res.times.length - 1] * 1000));
    });
  }
  /**
   * 修改模型位置
   * @param {*} model
   * @param {*} height
   * @param {*} lng
   * @param {*} lat
   * @param {*} rotationZ
   */
  _changeModelHeight(model, height = 0, lng = 0, lat = 0, rotationZ = 0) {
    let surface = Cesium.Matrix4.multiplyByPoint(
      model.modelMatrix,
      model.boundingSphere.center,
      new Cesium.Cartesian3()
    );
    let cartographic = Cesium.Cartographic.fromCartesian(surface);
    // console.log("move", {
    //     lng: Cesium.Math.toDegrees(cartographic.longitude + lng),
    //     lat: Cesium.Math.toDegrees(cartographic.latitude + lat),
    //     height: cartographic.height + height
    // })
    let offset = Cesium.Cartesian3.fromRadians(
      cartographic.longitude + Cesium.Math.toRadians(lng),
      cartographic.latitude + Cesium.Math.toRadians(lat),
      cartographic.height + height
    );
    let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
    let tmp = Cesium.Matrix4.add(model.modelMatrix, Cesium.Matrix4.fromTranslation(translation), new Cesium.Matrix4());
    model.modelMatrix[12] = tmp[12];
    model.modelMatrix[13] = tmp[13];
    model.modelMatrix[14] = tmp[14];

    //旋转
    var rotation = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(rotationZ));
    let modelMatrix = Cesium.Matrix4.multiplyByMatrix3(model.modelMatrix.clone(), rotation, new Cesium.Matrix4());
    model.modelMatrix = modelMatrix;
  }
  /**
   * 鼠标移动显示坐标
   */
  _setPickCoordsEvt(domId) {
    let me = this;
    let viewer = this.viewer;
    let scene = this.viewer.scene;
    this.coordsPopup = new CesiumPopup({
      viewer: viewer,
      id: domId,
      html: '',
      showDistanceSquared: Number.POSITIVE_INFINITY
    });
    this.pickCoordsHandler.setInputAction(evt => {
      if (scene.mode !== Cesium.SceneMode.MORPHING) {
        if (scene.pickPositionSupported) {
          const cartesian = me.cesiummap.getPickPosition(evt.endPosition);
          me.coordsPopup.position = cartesian;
          if (Cesium.defined(cartesian)) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let lng = Cesium.Math.toDegrees(cartographic.longitude);
            let lat = Cesium.Math.toDegrees(cartographic.latitude);
            lng = Math.round(lng * 10e6) / 10e6;
            lat = Math.round(lat * 10e6) / 10e6;
            let height = cartographic.height; //高度
            // 去除地形缩放
            height =
              height / (scene.globe.terrainExaggeration || 1) + (scene.globe.terrainExaggerationRelativeHeight || 0);
            height = Math.round(height * 100) / 100;

            const innerHTML = `坐标: ${lng}, ${lat}<br/>高程: ${height}m`;
            me.coordsPopup.setHtml(innerHTML);
          }
        } else {
          me.coordsPopup.hide();
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
  /**
   * 鼠标移动高亮物体
   */
  _setPickObjectEvt(domId, callback) {
    let me = this;
    let viewer = this.viewer;
    let scene = viewer.scene;
    this.pickObjPopup = new CesiumPopup({
      viewer: viewer,
      id: domId,
      html: '',
      showDistanceSquared: Number.POSITIVE_INFINITY
    });
    this.pickObjHandler.setInputAction(evt => {
      if (scene.mode !== Cesium.SceneMode.MORPHING) {
        if (scene.pickPositionSupported) {
          const cartesian = me.cesiummap.getPickPosition(evt.endPosition);
          me.pickObjPopup.position = cartesian;
          const pickedObject = scene.pick(evt.endPosition);
          if (pickedObject) {
            me.pickObjPopup.show();
            viewer.container.style.cursor = 'pointer';

            let id = pickedObject.id;
            if (pickedObject.primitive.constructor == Cesium.Model) {
              me.silhouette.selected = [pickedObject.primitive];
            }
            if (pickedObject.constructor == Cesium.ModelInstance) {
              id = pickedObject.instanceId;
              me.silhouette.selected = [pickedObject.primitive];
            }
            if (pickedObject.constructor == Cesium.Cesium3DTileFeature) {
              id = pickedObject.primitive.id;
              if (!me.selectedTile || me.selectedTile.getProperty('name') !== pickedObject.getProperty('name')) {
                let old;
                if (me.selectedTile) {
                  //清除原有
                  old = me.selectedTile;
                }
                me.selectedTile = pickedObject;
                pickedObject.tileset.makeStyleDirty();
                if (old) old.tileset.makeStyleDirty();
              }
            }
            if (pickedObject.primitive.constructor == Cesium.Cesium3DTileset) {
              id = pickedObject.primitive.id;
            }
            callback(id, false, pickedObject)?.then(name => {
              me.pickObjPopup.setHtml(name);
            });
          } else {
            me.pickObjPopup.setHtml('');
            me.pickObjPopup.hide();
            viewer.container.style.cursor = 'default';
            me.silhouette.selected = [];
            let old;
            if (me.selectedTile) {
              //清除原有
              old = me.selectedTile;
            }
            me.selectedTile = null;
            if (old) old.tileset.makeStyleDirty();
            callback('');
          }
        } else {
          console.warn('地图不支持位置选取');
          me.pickObjPopup.hide();
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.pickObjHandler.setInputAction(evt => {
      if (scene.mode !== Cesium.SceneMode.MORPHING) {
        if (scene.pickPositionSupported) {
          let pickedObject = scene.pick(evt.position);
          if (pickedObject) {
            let id = pickedObject.id;
            if (pickedObject.constructor == Cesium.ModelInstance) id = pickedObject.instanceId;
            if (
              pickedObject.constructor == Cesium.Cesium3DTileFeature ||
              pickedObject.primitive?.constructor == Cesium.Cesium3DTileset
            )
              id = pickedObject.primitive.id;
            callback(id, true);
          } else {
            callback('', false);
          }
        } else {
          console.warn('地图不支持位置选取');
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * 按下键移动相机
   * @param {*} e 
   */
  _keydwonEvt(e) {
    if (e.target === document.body) {
      switch (e.code) {
        case 'KeyW':
          this.movingStatus.forward = true;
          break;
        case 'KeyS':
          this.movingStatus.backward = true;
          break;
        case 'KeyA':
          this.movingStatus.left = true;
          break;
        case 'KeyD':
          this.movingStatus.right = true;
          break;
        case 'KeyZ':
          this.movingStatus.up = true;
          break;
        case 'KeyX':
          this.movingStatus.down = true;
          break;
      }
    }
  }
  /**
   * 抬起键停止移动
   * @param {*} e 
   */
  _keyupEvt(e) {
    if (e.target === document.body) {
      switch (e.code) {
        case 'KeyW':
          this.movingStatus.forward = false;
          break;
        case 'KeyS':
          this.movingStatus.backward = false;
          break;
        case 'KeyA':
          this.movingStatus.left = false;
          break;
        case 'KeyD':
          this.movingStatus.right = false;
          break;
        case 'KeyZ':
          this.movingStatus.up = false;
          break;
        case 'KeyX':
          this.movingStatus.down = false;
          break;
      }
    }
  }
  destroy() {
    this.viewer.entities.remove(this.pinner);
    document.body.removeEventListener('keyup', this._keyupEvt);
    document.body.removeEventListener('keydown', this._keydwonEvt);
    this.pinner = undefined;
    this.pinBuilder = undefined;
    this.viewer = null;
    this.cesiummap = null;
    this.distanceMeasure.destroy();
    this.areaMeasure.destroy();
    this.pickObjHandler.destroy();
    this.pickCoordsHandler.destroy();

    if (typeof this.removeCameraAutoRotatingHander === 'function') {
      this.removeCameraAutoRotatingHander();
    }
    // if (this.flowFieldCollection) this.flowFieldCollection.destroy();
  }
}

/* eslint-disable object-curly-newline */

const LayerType = {
  OverviewCollection: 0, // 新建项目自动创建的默认图层
  ViewCollection: 1, // 视角图层
  LabelCollection: 2, // 文字图层
  BillboardCollection: 3, // 图片标签图层
  VectorCollection: 4, // 矢量边界图层
  ModelCollection: 5, // 模型图层
  WaterCollection: 6, // 水面图层
  FlowFieldCollection: 7, // 流场图层
  TerrainClippingCollection: 8, // 地面裁剪图层
  TilesetCollection: 9, // 切片图层
  TrackCollection: 10, // 轨迹图层
  TerrainEdittingCollection: 11, // 地形编辑图层（还在测试）
  LayerGroupCollection: 99 // 图层组
};

const Default = {
  labelParams: () => {
    return {
      lon: 0,
      lat: 0,
      alt: 0,
      font: 0,
      size: 15,
      fontColor: '#ffffff',
      content: '',
      bold: 0,
      italic: 0,
      isBorder: 0,
      border: '#ff0000',
      lineWidth: 1,
      isBackground: 0,
      background: '#00000077',
      margin: 7,
      minVisibleAlt: 0,
      maxVisibleAlt: 10e5,
      isGround: 1,
      isLight: 1,
      count: 0,
      flashStart: 0,
      batchText: [],
      offsetX: 0,
      offsetY: 0
    };
  },
  billboardParams: () => {
    return {
      lon: 0,
      lat: 0,
      alt: 0,
      size: 1,
      color: '#ffffff',
      rotate: 0,
      minVisibleAlt: 0,
      maxVisibleAlt: 10e5,
      transparency: 1,
      isGround: 1,
      isLight: 1,
      count: 0,
      flashStart: 0,
      batchLabel: [],
      offsetX: 0,
      offsetY: 0
    };
  },
  vectorParams: () => {
    return {
      name: '边界名称',
      color: '#ffffff77',
      borderSize: 5,
      borderColor: '#ffff00ff',
      isDottedLine: 0,
      dottedLineInterval: 16,
      intervalColor: '#00ffff77',
      alt: 0,
      minVisibleAlt: 0,
      maxVisibleAlt: 10e5,
      image: '',
      borderType: 1, // 0:面,1:无填充的线,
      isRepeat: 0,
      isGround: 1,
      coordinate: [],
      batchCoordinate: [],
      isLight: 1,
      count: 0,
      flashStart: 0
    };
  },
  modelParams: () => {
    return {
      lon: 0,
      lat: 0,
      alt: 0,
      zoom: 1,
      color: '#ffffffff',
      name: '模型名称',
      url: '',
      heading: 0,
      pitch: 0,
      roll: 0,
      minVisibleAlt: 0,
      maxVisibleAlt: 10e5,
      isGround: 1,
      isLight: 1,
      count: 0,
      flashStart: 0,
      batchModel: []
    };
  },
  waterParams: () => {
    return {
      frequency: 100.0,
      animationSpeed: 0.01,
      amplitude: 5,
      specularIntensity: 0.5,
      fadeFactor: 0.3,
      name: '水面',
      color: '#134f9cff',
      borderSize: 0,
      borderColor: '#ffff0000',
      isDottedLine: 0,
      dottedLineInterval: 16,
      intervalColor: '#00ffff77',
      alt: 0,
      minVisibleAlt: 0,
      maxVisibleAlt: 10e5,
      isGround: 1,
      coordinate: [],
      isLight: 1,
      count: 0,
      flashStart: 0,
      batchCoordinate: [],
      borderType: 1,
      floodAnalysisCheck: 0,
      analysisBeginHeight: 0,
      analysisEndHeight: 10,
      analysisDuration: 5
    };
  },
  flowFieldParams: () => {
    return {
      name: '请选择文件',
      color: '#ffffffff',
      alt: 0,
      borderSize: 2,
      borderColor: '#ffffffff',
      isDottedLine: 0,
      dottedLineInterval: 16,
      intervalColor: '#00ffff77',
      minVisibleAlt: 0,
      maxVisibleAlt: 10e5,
      flowType: 0,
      isGround: 1,
      coordinate: [],
      isLight: 1,
      count: 0,
      flashStart: 0,
      imgRotation: 0,
      speed: 10,
      path: ''
    };
  },
  terrainClippingParams: () => {
    return {
      name: '地形裁剪名称',
      color: '#ffffff77',
      borderSize: 5,
      borderColor: '#ffff0000',
      isDottedLine: 0,
      dottedLineInterval: 16,
      intervalColor: '#00ffff77',
      alt: 0,
      minVisibleAlt: 0,
      maxVisibleAlt: 10e5,
      image: '',
      borderType: 1, // 0:面,1:无填充的线,
      isRepeat: 0,
      isGround: 2,
      coordinate: [],
      batchCoordinate: [],
      isLight: 1,
      count: 0,
      flashStart: 0
    };
  },
  tilesetParams: () => {
    return {
      name: '切片名称',
      url: '',
      heading: 0,
      pitch: 0,
      roll: 0,
      isLight: 1,
      count: 0,
      flashStart: 0,
      zoom: 1,
      color: '#ffffffff',
      minVisibleAlt: 0,
      maxVisibleAlt: 10e5,
      isGround: 0
    };
  },
  trackParams: () => {
    return {
      name: '轨迹名称',
      borderSize: 5,
      borderColor: '#ffff00ff',
      isDottedLine: 0,
      dottedLineInterval: 16,
      intervalColor: '#00ffff77',
      alt: 0,
      minVisibleAlt: 0,
      maxVisibleAlt: 10e5,
      isRepeat: 0,
      isGround: 1,
      coordinate: [],
      isLight: 1,
      count: 0,
      flashStart: 0,
      startTime: new Date('2000/1/1').getTime(),
      isTrail: 0,
      leadTime: 0,
      trailTime: 3600,
      relatedTo: null,
      totalTime: 0
    };
  },
  terrainEdittingParams: () => {
    return {
      name: '地形修改',
      batchCoordinate: []
    };
  }
};

const FontType = {
  0: 'Sans-serif',
  1: 'Microsoft Yahei',
  2: 'SimHei',
  3: 'SimSun',
  4: 'KaiTi',
  5: 'FangSong'
};

const BatchLayer = {
  batchVector: ({ name, code, parentId, sort }) => {
    let layerBorder = Default.vectorParams();
    layerBorder = {
      ...layerBorder,
      ...{
        name: name,
        layerId: '00000000-0000-0000-0000-000000000000',
        borderSize: 3,
        borderColor: Tool$1.randomColor(),
        borderType: 1,
        isGround: 2,
        remark: name
      }
    };
    return {
      id: '00000000-0000-0000-0000-000000000000',
      name: name,
      type: LayerType.VectorCollection,
      check: 1,
      code: code,
      sort: sort,
      canDelete: true,
      checkbox: true,
      children: [],
      layerViews: [],
      isBatch: 1,
      parentId: parentId,
      layerBorder: layerBorder,
      layerText: null,
      layerLabel: null
    };
  },
  batchLabel: ({ name, code, parentId, sort, content = '' }) => {
    let layerText = Default.labelParams();
    layerText = {
      ...layerText,
      ...{
        content: content,
        layerId: '00000000-0000-0000-0000-000000000000',
        isGround: 2,
        remark: content
      }
    };
    return {
      id: '00000000-0000-0000-0000-000000000000',
      name: name,
      type: LayerType.LabelCollection,
      check: 1,
      code: code,
      sort: sort,
      canDelete: true,
      checkbox: true,
      children: [],
      layerViews: [],
      isBatch: 1,
      parentId: parentId,
      layerText: layerText
    };
  },
  batchWater: ({ name, code, parentId, sort }) => {
    let layerWaterSurface = Default.waterParams();
    layerWaterSurface = {
      ...layerWaterSurface,
      ...{
        name: name,
        layerId: '00000000-0000-0000-0000-000000000000',
        borderSize: 0,
        borderColor: Tool$1.randomColor(),
        isGround: 2,
        remark: name
      }
    };
    return {
      id: '00000000-0000-0000-0000-000000000000',
      name: name,
      type: LayerType.WaterCollection,
      check: 1,
      code: code,
      sort: sort,
      canDelete: true,
      checkbox: true,
      children: [],
      layerViews: [],
      isBatch: 1,
      parentId: parentId,
      layerWaterSurface: layerWaterSurface
    };
  },
  batchModel: ({ name, code, parentId, sort, url }) => {
    let layerModel = Default.modelParams();
    layerModel = {
      ...layerModel,
      ...{
        name: name,
        layerId: '00000000-0000-0000-0000-000000000000',
        isGround: 2,
        url: url
      }
    };
    return {
      id: '00000000-0000-0000-0000-000000000000',
      name: name,
      type: LayerType.ModelCollection,
      check: 1,
      code: code,
      sort: sort,
      canDelete: true,
      checkbox: true,
      children: [],
      layerViews: [],
      isBatch: 1,
      parentId: parentId,
      layerModel: layerModel
    };
  },
  batchBillboard: ({ name, code, parentId, sort, labelId }) => {
    let layerLabel = Default.billboardParams();
    layerLabel = {
      ...layerLabel,
      ...{
        name: name,
        layerId: '00000000-0000-0000-0000-000000000000',
        isGround: 2,
        labelId: labelId
      }
    };
    return {
      id: '00000000-0000-0000-0000-000000000000',
      name: name,
      type: LayerType.BillboardCollection,
      check: 1,
      code: code,
      sort: sort,
      canDelete: true,
      checkbox: true,
      children: [],
      layerViews: [],
      isBatch: 1,
      parentId: parentId,
      layerLabel: layerLabel
    };
  }
};

/* eslint-disable */

/**
 * 添加历史轨迹czml，做出动态效果
 */
class CzmlTrailHelper {
  constructor(layerManager, defaultMultiplier) {
    this.lm = layerManager;
    this.viewer = layerManager.viewer;
    this.clock = this.viewer.clock;
    this.defaultMultiplier = defaultMultiplier;
    this.clockRanges = new Map();

    const me = this;
    this.viewer.dataSources.add(new Cesium.CzmlDataSource('trackCollection')).then(ds => {
      me.czmlDS = ds;
      me.clock.canAnimate = true;
      // me.clock.onTick.addEventListener(() => {
      // });
    });
  }
  /**
   * 生成轨迹图层
   * @param {*} layerParam
   * @param {*} success
   */
  generateTrack(layerParam, success = () => {}) {
    const me = this;
    const czml = this._getCzmlObj(layerParam);
    if (czml) {
      this.czmlDS.process(czml.data).then(ds => {
        const entity = ds.entities.getById(layerParam.id);
        me.lm.layerDictionary.set(layerParam.id, {
          type: LayerType.TrackCollection,
          track: entity
        });
        entity.orientation = new Cesium.VelocityOrientationProperty(entity.position);
        entity.viewFrom = new Cesium.Cartesian3(-500 * 2, 200 * 2, 100);
      });
    } else {
      const entity = this.czmlDS.entities.add(
        new Cesium.Entity({
          id: layerParam.id
        })
      );
      this.lm.layerDictionary.set(layerParam.id, {
        type: LayerType.TrackCollection,
        track: entity
      });
      // entity.orientation = new Cesium.VelocityOrientationProperty(entity.position);
      entity.viewFrom = new Cesium.Cartesian3(-500 * 2, 200 * 2, 100);
    }
  }
  /**
   * 添加文字至轨迹
   * @param {*} layerParam
   * @param {*} parentShow
   */
  addLabel(layerParam, parentShow) {
    const layer = this.lm.layerDictionary.get(layerParam.id);
    const label = layerParam.layerText;
    const show = layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && label.isLight));
    if (layer?.track) {
      layer.track.label = this._generateLabelGraphic(label, show);
    }
  }
  /**
   * 添加标签至轨迹
   * @param {*} layerParam
   * @param {*} parentShow
   */
  addBillboard(layerParam, parentShow) {
    const layer = this.lm.layerDictionary.get(layerParam.id);
    const billboard = layerParam.layerLabel;
    const show = layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && billboard.isLight));
    if (layer?.track) {
      layer.track.billboard = this._generateBillboardGraphic(billboard, show);
    }
  }
  /**
   * 添加模型至轨迹
   * @param {*} layerParam
   * @param {*} parentShow
   */
  addModel(layerParam, parentShow, file = null) {
    const layer = this.lm.layerDictionary.get(layerParam.id);
    const model = layerParam.layerModel;
    const show = layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && model.isLight));
    if (layer?.track) {
      layer.track.model = this._generateModelGraphic(model, show, file);
    }
  }
  /**
   * 设置轨迹线参数
   * @param {*} layerid
   * @param {*} name
   * @param {*} value
   */
  setPathParams(layerid, name, value) {
    const entity = this.lm.layerDictionary.get(layerid)?.track;
    if (entity && entity.polyline) {
      if (name === 'isTrail') {
        entity.polyline.show = !value;
        entity.path.show = value;
      } else {
        entity.polyline[name] = value;
        entity.path[name] = value;
      }
    }
  }
  /**
   * 设置轨迹线材质
   * @param {*} param
   */
  setPathMaterial(param) {
    const entity = this.lm.layerDictionary.get(param.layerId)?.track;
    if (entity && entity.polyline) {
      const material = this._getMaterial(param, false);
      entity.polyline.material = material;
      entity.path.material = material;
    }
  }
  /**
   * 设置轨迹坐标
   * @param {*} param
   */
  resetPathCoords(param, onlyTime = false) {
    const entity = this.lm.layerDictionary.get(param.layerId)?.track;
    if (entity) {
      const samples = new Cesium.SampledPositionProperty();
      const positions = [];
      param.coordinate.forEach(coord => {
        let height = coord.z;
        if (param.isGround == 0) height = param.alt;
        const time = Cesium.JulianDate.fromDate(new Date(param.startTime + coord.m * 1000));
        const position = Cesium.Cartesian3.fromDegrees(coord.x, coord.y, height);
        samples.addSample(time, position);
        positions.push(position);
      });
      entity.position = samples;
      entity.orientation = new Cesium.VelocityOrientationProperty(samples);

      if (!onlyTime) {
        if (entity.polyline) entity.polyline.positions = positions;
        else {
          // 新建图层时轨迹线需要手动添加
          const material = this._getMaterial(param);
          const distanceDisplayCondition = new Cesium.DistanceDisplayCondition(
            param.minVisibleAlt,
            param.maxVisibleAlt
          );

          const labelParams = Default.labelParams();
          labelParams.content = '新添加轨迹';
          labelParams.positions = positions;

          Object.assign(entity, {
            path: {
              material: material,
              width: param.borderSize,
              leadTime: param.leadTime || 0,
              trailTime: param.trailTime,
              resolution: 1,
              show: param.isTrail == 1,
              distanceDisplayCondition: distanceDisplayCondition
            },
            polyline: {
              positions: positions,
              clampToGround: param.isGround == 1,
              width: param.borderSize,
              material: material,
              show: param.isTrail == 0,
              distanceDisplayCondition: distanceDisplayCondition
            },
            // 自动添加文字
            label: this._generateLabelGraphic(labelParams, true)
          });
        }
      }

      // 重置时钟
      if (param.coordinate.length > 0) {
        const startTime = Cesium.JulianDate.fromDate(new Date(param.startTime + param.coordinate[0].m * 1000));
        const endTime = Cesium.JulianDate.fromDate(
          new Date(param.startTime + param.coordinate[param.coordinate.length - 1].m * 1000)
        );

        if (!entity.availability) {
          entity.availability = new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
              start: startTime,
              stop: endTime
            })
          ]);
        } else {
          const interval = entity.availability.get(0);
          interval.start = startTime;
          interval.stop = endTime;
        }

        let clockEnd = param.startTime + param.totalTime * 1000;
        this.clockRanges.set(param.layerId, {
          clockEnd: clockEnd,
          clockStart: param.startTime
        });

        this.viewer.clock.startTime = Cesium.JulianDate.fromDate(new Date(param.startTime));
        this.viewer.clock.stopTime = Cesium.JulianDate.fromDate(new Date(clockEnd));

        if (Cesium.JulianDate.compare(this.viewer.clock.currentTime, this.viewer.clock.stopTime) >= 0) {
          this.viewer.clock.currentTime = this.viewer.clock.startTime;
        }

        this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
      }
    }
  }
  /**
   * 设置动画时间
   */
  resetTotalTime(param) {
    const time = this.clockRanges.get(param.layerId);
    if (time) {
      time.clockEnd = param.startTime + param.totalTime * 1000;
      this.viewer.clock.stopTime = Cesium.JulianDate.fromDate(new Date(time.clockEnd));
      if (Cesium.JulianDate.compare(this.viewer.clock.currentTime, this.viewer.clock.stopTime) >= 0) {
        this.viewer.clock.currentTime = this.viewer.clock.startTime;
      }
    }
  }
  /**
   * 控制轨迹内容显示（图层已勾选且父级显示）
   * @param {*} layerParam
   */
  showTrackLayer(layerParam) {
    const layer = this.lm.layerDictionary.get(layerParam.id);
    if (layer) {
      if (!layer.track) {
        // 轨迹图层未生成
        this.generateTrack(layerParam);
      } else {
        const entity = layer.track;
        entity.show = true;
        // 文字
        let show = !layerParam.isView || (layerParam.isView && layerParam.layerText?.isLight);
        if (layerParam.isText && !layer.track.label) {
          entity.label = this._generateLabelGraphic(layerParam.layerText, show);
        } else if (layerParam.isText && entity.label) {
          entity.label.show = true;
        } else if (layer.track.label) {
          entity.label.show = false;
        }
        // 标签
        show = !layerParam.isView || (layerParam.isView && layerParam.layerLabel?.isLight);
        if (layerParam.isLabel && !entity.billboard) {
          entity.billboard = this._generateBillboardGraphic(layerParam.layerLabel, show);
        } else if (layerParam.isLabel && entity.billboard) {
          entity.billboard.show = true;
        } else if (entity.billboard) {
          entity.billboard.show = false;
        }
        // 模型
        show = !layerParam.isView || (layerParam.isView && layerParam.layerModel?.isLight);
        if (layerParam.isModel && !entity.model) {
          entity.model = this._generateModelGraphic(layerParam.layerModel, show);
        } else if (layerParam.isModel && entity.model) {
          entity.model.show = true;
        } else if (entity.model) {
          entity.model.show = false;
        }
      }
    }
  }
  /**
   * 设置时间
   * @param {*} layerid
   */
  zoomToClock(layerid, stopAnimate = false) {
    const entity = this.czmlDS.entities.getById(layerid);
    const interval = entity.availability?.get(0);
    if (interval) {
      const time = this.clockRanges.get(layerid);
      this.clock.startTime = Cesium.JulianDate.fromDate(new Date(time.clockStart));
      this.clock.stopTime = Cesium.JulianDate.fromDate(new Date(time.clockEnd));
      this.clock.currentTime = this.clock.startTime;
      this.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
      if (stopAnimate) {
        this.clock._shouldAnimate = false;
      } else {
        this.clock._shouldAnimate = true;
      }
    }
  }
  removeTrack(layerid) {
    const entity = this.czmlDS.entities.getById(layerid);
    this.czmlDS.entities.remove(entity);
    this.clockRanges.delete(layerid);
    this.clock.clockRange = Cesium.ClockRange.UNBOUNDED;
  }
  /**
   * 获取新轨迹起始时间
   */
  getNewTrackTime() {
    const ite = this.clockRanges.values();
    let max = 0;
    let time = ite.next();
    while (!time.done) {
      max = Math.max(time.value.clockStart, max);
      time = ite.next();
    }
    if (max === 0) return new Date('2000/1/1').getTime();
    const startTime = new Date(max);
    startTime.setFullYear(startTime.getFullYear() + 1);
    return startTime.getTime();
  }
  /**
   * 跟随
   * @param {*}} isTracking
   */
  trackEntity(isTracking, id) {
    if (isTracking) {
      let entity = this.czmlDS.entities.getById(id);
      if (entity) {
        this.viewer.scene.screenSpaceCameraController.rotateEventTypes = Cesium.CameraEventType.MIDDLE_DRAG; //左键拖动不响应，中键旋转
        this.viewer.trackedEntity = entity;
      }
    } else {
      this.viewer.scene.screenSpaceCameraController.rotateEventTypes = Cesium.CameraEventType.LEFT_DRAG; //左键拖动平移，中键旋转
      this.viewer.trackedEntity = undefined;
    }
  }
  /**
   * 清除轨迹
   */
  clearHistoryTrailTrack() {
    this.viewer.trackedEntity = undefined;
    // this.clock.onTick.removeEventListener(this.cesiummap.setSliderTime, this.cesiummap);

    if (this.viewer.dataSources.contains(this.czmlDS)) {
      this.viewer.dataSources.remove(this.czmlDS);
      this.czmlDS = null;
    }

    this.viewer.scene.screenSpaceCameraController.rotateEventTypes = Cesium.CameraEventType.LEFT_DRAG;
  }
  /**
   * 隐藏
   */
  hideHistoryTrailTrack(id) {
    let model = this.czmlDS.entities.getById(id);
    model.show = false;
  }
  /**
   * 锁定
   * @param {*} position
   */
  lookAtTarget(position) {
    let me = this;
    let cart = Cesium.Cartographic.fromCartesian(position);
    cart = {
      lng: Cesium.Math.toDegrees(cart.longitude),
      lat: Cesium.Math.toDegrees(cart.latitude),
      height: cart.height
    };
    let camera = this.viewer.camera.positionCartographic;
    camera = {
      lng: Cesium.Math.toDegrees(camera.longitude),
      lat: Cesium.Math.toDegrees(camera.latitude),
      height: camera.height
    };
    let target = this._getMercator(cart);
    let source = this._getMercator(camera);
    this.viewer.camera.lookAt(
      position,
      new Cesium.Cartesian3(source.x - target.x, source.y - target.y, camera.height - cart.height)
    );
    setTimeout(() => {
      me.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    }, 100);
  }
  /**
   * 获取当前显示entity
   */
  getNowEntity() {
    let currentTime = this.clock.currentTime;
    let id;
    for (let key in this.clockRanges) {
      if (
        Cesium.JulianDate.compare(currentTime, Cesium.JulianDate.fromDate(this.clockRanges[key].startTime)) >= 0 &&
        Cesium.JulianDate.compare(currentTime, Cesium.JulianDate.fromDate(this.clockRanges[key].endTime)) <= 0 &&
        key != 'sos'
      ) {
        id = key;
      }
    }
    if (id) {
      let entity = this.czmlDS.entities.getById(id);
      return { entity, id };
    }
    return undefined;
  }
  destroy() {
    if (this.viewer.dataSources.contains(this.czmlDS)) {
      this.viewer.dataSources.remove(this.czmlDS);
    }
    this.clockRanges.clear();

    this.clockRanges = null;
    this.lm = null;
    this.viewer = null;
    this.clock = null;
    this.czmlDS = null;
  }
  _getMercator(poi) {
    let mercator = {};
    let earthRad = 6378137.0;
    mercator.x = ((poi.lng * Math.PI) / 180) * earthRad;
    let a = (poi.lat * Math.PI) / 180;
    mercator.y = (earthRad / 2) * Math.log((1.0 + Math.sin(a)) / (1.0 - Math.sin(a)));
    return mercator;
  }
  _colorString2Value(str) {
    const color = Cesium.Color.fromCssColorString(str);
    return {
      rgbaf: [color.red, color.green, color.blue, color.alpha]
    };
  }
  /**
   * 生成czml数据
   * @param {*} layerParam 图层
   */
  _getCzmlObj(layerParam) {
    const param = layerParam.layerTrack;
    const parentShow = this.lm.getLayerVisible(layerParam.parentId);
    if (parentShow && layerParam.check && param) {
      const trackPts = param.coordinate;
      if (trackPts.length < 1) return undefined;

      // 时间轴
      let clockStart = param.startTime;
      let clockEnd = param.startTime + param.totalTime * 1000;

      // 轨迹起始结束
      const data = [];
      let startTimeStr, endTimeStr, startTime, endTime;

      startTime = new Date(param.startTime + trackPts[0].m * 1000);
      startTimeStr = Tool$1.formatDate(startTime, 'yyyy-MM-ddThh:mm:ss');
      endTime = new Date(param.startTime + trackPts[trackPts.length - 1].m * 1000);
      endTimeStr = Tool$1.formatDate(endTime, 'yyyy-MM-ddThh:mm:ss');

      const pathMaterial = this._getMaterial(param, true);

      const entity = {
        id: layerParam.id,
        name: layerParam.name,
        availability: `${startTimeStr}/${endTimeStr}`,
        path: {
          material: pathMaterial,
          width: param.borderSize,
          leadTime: param.leadTime || 0,
          trailTime: param.trailTime,
          resolution: 1,
          show: param.isTrail == 1,
          distanceDisplayCondition: {
            distanceDisplayCondition: [param.minVisibleAlt, param.maxVisibleAlt]
          }
        },
        position: {
          epoch: startTimeStr,
          cartographicDegrees: []
        },
        polyline: {
          positions: {
            cartographicDegrees: []
          },
          clampToGround: param.isGround == 1,
          width: param.borderSize,
          material: pathMaterial,
          show: param.isTrail == 0,
          distanceDisplayCondition: {
            distanceDisplayCondition: [param.minVisibleAlt, param.maxVisibleAlt]
          }
        }
      };

      if (layerParam.isText && layerParam.layerText) {
        entity.label = this._generateLabelCzml(
          layerParam.layerText,
          !layerParam.isView || (layerParam.isView && layerParam.layerText.isLight)
        );
      }

      if (layerParam.isLabel && layerParam.layerLabel) {
        entity.billboard = this._generateBillboardCzml(
          layerParam.layerLabel,
          !layerParam.isView || (layerParam.isView && layerParam.layerLabel.isLight)
        );
      }

      if (layerParam.isModel && layerParam.layerModel) {
        entity.model = this._generateModelCzml(
          layerParam.layerModel,
          !layerParam.isView || (layerParam.isView && layerParam.layerModel.isLight)
        );
      }

      trackPts.forEach(pt => {
        let height = pt.z;
        if (param.isGround == 0) height = param.alt;
        entity.position.cartographicDegrees.push(pt.m - trackPts[0].m, pt.x, pt.y, height);
        entity.polyline.positions.cartographicDegrees.push(pt.x, pt.y, height);
      });

      data.push(entity);

      startTimeStr = Tool$1.formatDate(new Date(clockStart), 'yyyy-MM-ddThh:mm:ss');
      endTimeStr = Tool$1.formatDate(new Date(clockEnd), 'yyyy-MM-ddThh:mm:ss');

      this.clockRanges.set(param.layerId, {
        clockStart,
        clockEnd
      });

      data.unshift({
        id: 'document',
        name: '',
        version: '1.0',
        clock: {
          interval: `${startTimeStr}/${endTimeStr}`,
          currentTime: startTimeStr,
          multiplier: this.defaultMultiplier,
          range: 'LOOP_STOP'
        }
      });
      return {
        data
      };
    }
    return undefined;
  }
  /**
   * 生成模型 czml对象
   * @param {*} model
   * @param {*} ifShow
   * @returns
   */
  _generateModelCzml(model, ifShow) {
    return {
      gltf: model.url,
      scale: model.zoom,
      show: ifShow,
      color: this._colorString2Value(model.color),
      distanceDisplayCondition: {
        distanceDisplayCondition: [model.minVisibleAlt, model.maxVisibleAlt]
      },
      shadows: {
        shadowMode: 'DISABLED'
      },
      heightReference: model.isGround ? 'CLAMP_TO_GROUND' : 'NONE'
    };
  }
  /**
   * 生成模型 entity对象
   */
  _generateModelGraphic(model, ifShow, file = null) {
    return {
      uri: model.url,
      scale: model.zoom,
      show: ifShow,
      color: Cesium.Color.fromCssColorString(model.color),
      shadows: Cesium.ShadowMode.DISABLED,
      heightReference: model.isGround == 1 ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
    };
  }
  /**
   * 生成billboard czml对象
   */
  _generateBillboardCzml(billboard, ifShow) {
    return {
      image: P.billboardPictures[billboard.labelId],
      show: ifShow,
      // pixelOffset: {
      //   cartesian2: [billboard.lon, -billboard.lat]
      // },
      eyeOffset: {
        cartesian: [billboard.offsetX, billboard.offsetY, 0]
      },
      horizontalOrigin: 'CENTER',
      verticalOrigin: 'BOTTOM',
      color: this._colorString2Value(billboard.color),
      rotation: Cesium.Math.toRadians(billboard.rotate),
      scale: billboard.size,
      distanceDisplayCondition: {
        distanceDisplayCondition: [billboard.minVisibleAlt, billboard.maxVisibleAlt]
      },
      disableDepthTestDistance: 0,
      heightReference: billboard.isGround ? 'CLAMP_TO_GROUND' : 'NONE'
    };
  }
  /**
   * 生成billboard entity对象
   * @param {*} billboard
   * @param {*} ifShow
   * @returns
   */
  _generateBillboardGraphic(billboard, ifShow) {
    return {
      image: P.billboardPictures[billboard.labelId],
      // pixelOffset: new Cesium.Cartesian2(billboard.lon, -billboard.lat),
      eyeOffset: new Cesium.Cartesian3(billboard.offsetX, billboard.offsetY, 0),
      color: Cesium.Color.fromCssColorString(billboard.color),
      show: ifShow,
      scale: billboard.size,
      rotation: Cesium.Math.toRadians(billboard.rotate),
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      disableDepthTestDistance: 0,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(billboard.minVisibleAlt, billboard.maxVisibleAlt),
      heightReference: billboard.isGround == 1 ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE
    };
  }
  /**
   * 生成label czml对象
   * @param {*} label
   * @returns
   */
  _generateLabelCzml(label, ifShow) {
    return {
      text: label.content,
      show: ifShow,
      // pixelOffset: {
      //   cartesian2: [label.lon, -label.lat]
      // },
      eyeOffset: {
        cartesian: [label.offsetX, label.offsetY, 0]
      },
      fillColor: this._colorString2Value(label.fontColor),
      font: `${label.italic ? 'oblique' : ''} ${label.bold ? 'bold' : ''} ${label.size}px ${FontType[label.font]}`,
      style: {
        labelStyle: label.isBorder ? 'FILL_AND_OUTLINE' : 'FILL'
      },
      showBackground: label.isBackground == 1,
      backgroundColor: this._colorString2Value(label.background),
      backgroundPadding: [label.margin, label.margin],
      horizontalOrigin: 'CENTER',
      verticalOrigin: 'BOTTOM',
      outlineColor: this._colorString2Value(label.border),
      outlineWidth: label.lineWidth,
      distanceDisplayCondition: {
        distanceDisplayCondition: [label.minVisibleAlt, label.maxVisibleAlt]
      },
      disableDepthTestDistance: 0,
      heightReference: label.isGround ? 'CLAMP_TO_GROUND' : 'NONE'
    };
  }
  /**
   * 生成label entity对象
   * @param {*} label
   * @param {*} ifShow
   * @returns
   */
  _generateLabelGraphic(label, ifShow) {
    return {
      text: label.content,
      // pixelOffset: Cesium.Cartesian2(label.lon, -label.lat),
      eyeOffset: Cesium.Cartesian3(label.offsetX, label.offsetY, 0),
      font: `${label.italic ? 'oblique' : ''} ${label.bold ? 'bold' : ''} ${label.size}px ${FontType[label.font]}`,
      fillColor: Cesium.Color.fromCssColorString(label.fontColor),
      show: ifShow,
      showBackground: label.isBackground ? true : false,
      backgroundColor: Cesium.Color.fromCssColorString(label.background),
      backgroundPadding: new Cesium.Cartesian2(label.margin, label.margin),
      outlineColor: Cesium.Color.fromCssColorString(label.border),
      outlineWidth: label.lineWidth,
      style: label.isBorder ? Cesium.LabelStyle.FILL_AND_OUTLINE : Cesium.LabelStyle.FILL,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      heightReference: label.isGround == 1 ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
      disableDepthTestDistance: 0,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(label.minVisibleAlt, label.maxVisibleAlt)
    };
  }
  /**
   * 生成路径样式
   * @param {*} param
   * @param {*} czml
   * @returns
   */
  _getMaterial(param, czml = false) {
    if (czml) {
      if (param.isDottedLine) {
        return {
          polylineDash: {
            color: this._colorString2Value(param.borderColor),
            gapColor: this._colorString2Value(param.intervalColor),
            dashLength: param.dottedLineInterval
          }
        };
      }
      return {
        solidColor: {
          color: this._colorString2Value(param.borderColor)
        }
      };
    }
    if (param.isDottedLine) {
      return new Cesium.PolylineDashMaterialProperty({
        color: Cesium.Color.fromCssColorString(param.borderColor),
        gapColor: Cesium.Color.fromCssColorString(param.intervalColor),
        dashLength: param.dottedLineInterval
      });
    }
    return Cesium.Color.fromCssColorString(param.borderColor);
  }
}

/* eslint-disable */
class CesiumEvtHelper {
  constructor(cesiummap) {
    this.cesiummap = cesiummap;
    this.viewer = cesiummap.viewer;
    this.evtHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas); //事件
    this._setMapClick();
    this._setMousemoveAndRightRotate();
    this._setMapDbClick(); // 双击要设置在单击之后
    // this._avoidUnderground();

    this.viewer.scene.screenSpaceCameraController.zoomEventTypes = [
      Cesium.CameraEventType.WHEEL,
      Cesium.CameraEventType.PINCH,
    ];

    this.staticInfoPopupPosition = null; //信息框笛卡尔坐标
    this.time = Cesium.getTimestamp();
    this.dbClickInterval = 350; //移动端双击无用，通过点击实现
    this.depthRange = []; //深度改变范围
    this.rightRotatingEnabled = true;
  }
  /**
   * 开启右键旋转
   * @param {*} enabled 
   */
  enableRightRotating(enabled) {
    this.rightRotatingEnabled = enabled;
    const types = this.viewer.scene.screenSpaceCameraController.zoomEventTypes;
    if (enabled) {
      const idx = types.findIndex(p => p === Cesium.CameraEventType.RIGHT_DRAG);
      if (idx > -1) {
        types.splice(idx, 1);
      }
    } else {
      if (!types.includes(Cesium.CameraEventType.RIGHT_DRAG)) {
        types.push(Cesium.CameraEventType.RIGHT_DRAG);
      }
    }
  }
  /**
   * 点击事件
   */
  _setMapClick() {
    let me = this;
    let viewer = this.viewer;
    let scene = this.viewer.scene;
    // 取消原有双击事件-追踪该位置
    viewer.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    this.evtHandler.setInputAction(evt => {
      if (scene.mode !== Cesium.SceneMode.MORPHING) {
        if (scene.pickPositionSupported) {
          const cameraCart = viewer.camera.positionCartographic;
          console.log('camera', {
            cartesian: viewer.camera.position,
            position: {
              lng: Cesium.Math.toDegrees(cameraCart.longitude),
              lat: Cesium.Math.toDegrees(cameraCart.latitude),
              height: cameraCart.height
            },
            orientation: {
              heading: viewer.camera.heading,
              pitch: viewer.camera.pitch,
              roll: viewer.camera.roll
            }
          });

          const cartesian = me.cesiummap.getPickPosition(evt.position);
          const mapPosition = {};
          if (Cesium.defined(cartesian)) {
            let cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            let lng = Cesium.Math.toDegrees(cartographic.longitude);
            let lat = Cesium.Math.toDegrees(cartographic.latitude);
            let height = cartographic.height; //高度
            Object.assign(mapPosition, { lng: lng, lat: lat, height: height });

            console.log('position', mapPosition);
          } else {
            console.warn('未拾取到地理坐标');
          }

          const pickedObject = scene.pick(evt.position);
          console.log('pickedObject', pickedObject);

          me.cesiummap._positionPickingFunctionInternal(mapPosition, cartesian, pickedObject); // 交互修改位置

          // 地图点击拾取物体，常用于弹窗
          if (Cesium.defined(pickedObject)) {
            let id = pickedObject.id;
            if (pickedObject.constructor == Cesium.ModelInstance) {
              id = pickedObject.instanceId;
            }
            if (
              pickedObject.constructor == Cesium.Cesium3DTileFeature ||
              pickedObject.primitive.constructor == Cesium.Cesium3DTileset
            ) {
              id = pickedObject.primitive.id;
            }
            if (id && id.constructor == Cesium.Entity) {
              id = id.id;
            }
            me.cesiummap.whenMapObjectClick(id, pickedObject, cartesian); // 位置可能无法拾取到
          }
        } else {
          console.warn('地图不支持位置选取');
        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK); //左键点击
  }
  /**
   * 双击事件
   */
  _setMapDbClick() {
    let me = this;
    let viewer = this.viewer;
    let scene = this.viewer.scene;
    const doubleClick = evt => {
      if (scene.mode !== Cesium.SceneMode.MORPHING) {
        if (scene.pickPositionSupported) {
          const cartesian = me.cesiummap.getPickPosition(evt.position);
          if (Cesium.defined(cartesian)) {
            let orientation = {
              heading: viewer.camera.heading,
              pitch: viewer.camera.pitch,
              roll: viewer.camera.roll
            };
            const cameraPos = viewer.camera.position;
            const direction = Cesium.Cartesian3.normalize(
              Cesium.Cartesian3.subtract(cartesian, cameraPos, new Cesium.Cartesian3()),
              new Cesium.Cartesian3()
            );
            const distance = Cesium.Cartesian3.distance(cameraPos, cartesian);
            const offset = Cesium.Cartesian3.multiplyByScalar(direction, (distance * 2) / 3, new Cesium.Cartesian3());
            const destination = Cesium.Cartesian3.add(viewer.camera.position, offset, new Cesium.Cartesian3());
            viewer.camera.flyTo({
              destination: destination,
              duration: 3,
              orientation: orientation
            });
            me.cesiummap.whenMapDblClick(evt);
          } else {
            console.warn('地图不支持位置选取');
          }
        }
      }
    };
    Tool$1.setDoubleClickEvt(this.evtHandler, doubleClick);
  }
  /**
   * 防止下地
   */
  _avoidUnderground() {
    let viewer = this.viewer;

    // 相机最低高度
    const minimumHeight = 5;
    viewer.scene.preRender.addEventListener(function () {
      let eye = viewer.camera.positionCartographic;
      // 判断相机坐标是否小于阈值，若小于阈值，则保持视点方位，修改相机高度
      if (eye.height < minimumHeight) {
        viewer.camera.setView({
          destination: Cesium.Cartesian3.fromRadians(eye.longitude, eye.latitude, minimumHeight),
          orientation: {
            direction: viewer.camera.direction,
            up: viewer.camera.up
          }
        });
      }
    });
  }
  /**
   * 右键旋转
   */
  _setMousemoveAndRightRotate() {
    let startMousePosition;
    let mousePosition;
    let turning = false;
    const lookFactor = 3;
    const viewer = this.viewer;
    const scene = viewer.scene;
    const me = this;

    this.evtHandler.setInputAction(movement => {
      if (!me.rightRotatingEnabled) return;

      mousePosition = movement.endPosition;

      // 移动拾取
      if (scene.mode != Cesium.SceneMode.MORPHING) {
        if (scene.pickPositionSupported) {
          if (me.cesiummap.positionPickingEnabled) {
            const cartesian = me.cesiummap.getPickPosition(mousePosition);
            me.cesiummap.pickingPointerPos = cartesian;
          }
        }
      }

      if (turning) {
        let width = viewer.scene.canvas.clientWidth;
        let height = viewer.scene.canvas.clientHeight;
        let x = (mousePosition.x - startMousePosition.x) / width;
        let y = -(mousePosition.y - startMousePosition.y) / height;
        viewer.camera.setView({
          orientation: {
            heading: viewer.camera.heading + x * lookFactor,
            pitch: viewer.camera.pitch + y * lookFactor,
            roll: 0
          }
        });
        mousePosition.clone(startMousePosition);
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.evtHandler.setInputAction(movement => {
      turning = true;
      mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
    }, Cesium.ScreenSpaceEventType.RIGHT_DOWN);

    this.evtHandler.setInputAction(movement => {
      turning = false;
      mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
    }, Cesium.ScreenSpaceEventType.RIGHT_UP);
  }
  destroy() {
    this.cesiummap = null;
    this.viewer = null;
    this.evtHandler.destroy();
    this.staticInfoPopupPosition = null;
    this.fenceWarningPopupPosition = null;
  }
}

/* eslint-disable */
let lastClickTime;
let me;

/**
 * 绘图工具
 */
class DrawHelper {
  constructor(cesiummap) {
    this.cesiummap = cesiummap;
    this.viewer = cesiummap.viewer;
    this.positions = null;
    this.pointer = null; //鼠标点
    this.pointerPos = null;
    this.drawEntity = null;
    this.handler = null;
    this.lastCompleted = true; //上次绘制已完成
    this.orginLeftDblEvt = null; //原有鼠标左键双击事件
    this.doubleClickInterval = 300;

    this.type = '';

    if (cesiummap.evtHandler)
      this.orginLeftDblEvt = cesiummap.evtHelper.evtHandler.getInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );

    me = this;
    this.drawOptions = {
      name: 'draw-polygon',
      polygon: {
        hierarchy: new Cesium.CallbackProperty(() => {
          if (me.type == 'polygon')
            return {
              positions: me.positions.map(p => {
                return p.clone();
              })
            };
          return {
            positions: []
          };
        }, false),
        material: Cesium.Color.GREEN.withAlpha(0.5),
        clampToGround: true
      },
      polyline: {
        positions: new Cesium.CallbackProperty(() => {
          const pos = me.positions.map(p => {
            return p.clone();
          });
          if (me.type == 'polygon') return pos.concat(pos[0]);
          return pos;
        }, false),
        material: Cesium.Color.CHARTREUSE,
        width: 3,
        clampToGround: true
      }
    };

    this.pointerOptions = {
      name: 'measure-pointer',
      position: new Cesium.CallbackProperty(() => {
        return me.pointerPos;
      }, false),
      point: {
        pixelSize: 5,
        color: Cesium.Color.RED,
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      }
    };
  }
  /**
   * 开始一次任意面绘制
   */
  activate(callback = () => { }, type = 'polygon') {
    me = this;
    this.deactivate();
    let viewer = this.viewer;
    this.type = type;
    viewer.scene.globe.translucency.enabled = false;
    this.drawEntity = viewer.entities.add(this.drawOptions);
    this.pointer = viewer.entities.add(this.pointerOptions);

    if (this.cesiummap.evtHelper) {
      // 取消双击事件-追踪该位置
      this.cesiummap.evtHelper.evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }

    this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    this.positions = [];

    this.handler.setInputAction(function (movement) {
      const cartesian = me.cesiummap.getPickPosition(movement.endPosition, [me.pointer]);
      if (!cartesian) return;

      me.pointerPos = cartesian.clone();
      if (me.lastCompleted) return;
      if (me.positions.length <= 1) {
        me.positions.push(cartesian.clone());
      } else {
        me.positions.pop();
        me.positions.push(cartesian.clone());
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.handler.setInputAction(function (movement) {
      if (!lastClickTime || (Date.now() - lastClickTime) >= me.doubleClickInterval) {
        lastClickTime = Date.now();
        // 单击
        if (me.lastCompleted) {
          me.clear();
          me.lastCompleted = false;
          // me.pointer.show = true;
        }

        const cartesian = me.cesiummap.getPickPosition(movement.position, [me.pointer]);

        let last = me.positions.length > 1 ? me.positions[me.positions.length - 2] : null;

        if (cartesian && (!last || !Cesium.Cartesian3.equals(cartesian, last))) {
          me.positions.push(cartesian.clone());
        }
      } else {
        // 双击结束
        lastClickTime = null;
        me.lastCompleted = true;
        if (me.positions.length > 2) me.positions.pop();
        if (me.type == 'polygon')
          //闭合
          me.positions.push(me.positions[0]);
        callback();
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  }
  /**
   * 开始一次矩形绘制
   */
  activateRectangle(callback = () => { }) {
    me = this;
    let viewer = this.viewer;
    this.type = 'polygon';
    viewer.scene.globe.translucency.enabled = false;
    this.drawEntity = viewer.entities.add(this.drawOptions);
    this.pointer = viewer.entities.add(this.pointerOptions);

    if (this.cesiummap.evtHelper) {
      this.orginLeftDblEvt = this.cesiummap.evtHelper.evtHandler.getInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
      // 取消双击事件-追踪该位置
      this.cesiummap.evtHelper.evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    }

    this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    this.positions = [];

    let first = null;
    let last = null;

    const generateRectangle = (a, b) => {
      const rectangle = Cesium.Rectangle.fromCartesianArray([a, b]);
      const northeast = Cesium.Rectangle.northeast(rectangle);
      const northwest = Cesium.Rectangle.northwest(rectangle);
      const southwest = Cesium.Rectangle.southwest(rectangle);
      const southeast = Cesium.Rectangle.southeast(rectangle);
      return [
        Cesium.Cartographic.toCartesian(southwest),
        Cesium.Cartographic.toCartesian(southeast),
        Cesium.Cartographic.toCartesian(northeast),
        Cesium.Cartographic.toCartesian(northwest)
      ];
    };

    this.handler.setInputAction(function (movement) {
      const cartesian = me.cesiummap.getPickPosition(movement.endPosition, [me.pointer]);
      if (cartesian) me.pointerPos = cartesian.clone();
      if (cartesian && !me.lastCompleted && first) {
        last = cartesian.clone();
        me.positions = generateRectangle(first, last);
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    this.handler.setInputAction(function (movement) {
      const cartesian = me.cesiummap.getPickPosition(movement.position, [me.pointer]);
      if (cartesian) {
        // 矩形绘制用户只取两个点
        if (me.lastCompleted) {
          // 取第一点
          me.clear();
          me.lastCompleted = false;
          first = cartesian.clone();
          // me.pointer.show = true;
        } else {
          // 取第二点
          me.lastCompleted = true;
          last = cartesian.clone();
          me.positions = generateRectangle(first, last);
        }
        if (me.lastCompleted) callback();
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  /**
   * 清除标记
   */
  clear() {
    this.positions = [];
  }
  /**
   * 停止
   */
  deactivate() {
    lastClickTime = null;
    this.viewer.scene.globe.translucency.enabled = this.cesiummap.translucencyEnabled;
    this.viewer.entities.remove(this.pointer);
    this.viewer.entities.remove(this.drawEntity);
    this.pointer = null;
    this.pointerPos = null;
    this.drawEntity = null;
    this.positions = [];
    this.lastCompleted = true;
    this.type = '';
    if (this.handler) {
      this.handler.destroy();
      this.handler = null;
    }
    if (this.cesiummap?.evtHelper && this.orginLeftDblEvt)
      this.cesiummap.evtHelper.evtHandler.setInputAction(
        this.orginLeftDblEvt,
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      ); //添加回双击事件
  }
  /**
   * 获取经纬度坐标
   */
  getDegreesPositions() {
    return this.positions.map(p => {
      let cartographic = Cesium.Cartographic.fromCartesian(p);
      return {
        lng: Cesium.Math.toDegrees(cartographic.longitude),
        lat: Cesium.Math.toDegrees(cartographic.latitude),
        height: cartographic.height
      };
    });
  }
  /**
   * 销毁
   */
  destroy() {
    this.deactivate();
    me = null;
    this.viewer = null;
    this.positions = null;
    this.pointer = null;
    this.drawEntity = null;
    this.drawOptions = null;
    this.pointerOptions = null;
  }
}

/* eslint-disable */

function LayerParamSetter() { }

/**
 * 设置文字属性
 * @param {*} layerid
 * @param {*} name
 * @param {*} value
 */
LayerParamSetter.prototype.setLabelParams = function (layerid, name, value, singleId) {
  const layer = this.layerDictionary.get(layerid);
  let label;
  if (layer.type === LayerType.TrackCollection) {
    label = layer?.track?.label;
  } else {
    label = layer?.label;
  }

  if (label) {
    if (Array.isArray(label)) {
      if (singleId != undefined && singleId != null) {
        const single = label.find(item => item.id == `${layerid}-${singleId}`);
        if (single) single[name] = value;
      } else if (name !== 'text') {
        label.forEach(item => {
          item[name] = value;
        });
      }
    } else {
      label[name] = value;
    }
  }
};

/**
 * 重设图层文字
 * @param {*} layerParam
 */
LayerParamSetter.prototype.resetLabel = function (layerParam, reRange = true) {
  const me = this;
  const layer = this.layerDictionary.get(layerParam.id);
  if (layer) {
    if (layerParam.type == LayerType.LabelCollection) layer.batched = layerParam.bacthText?.length > 1;
    let label = this.layerDictionary.get(layerParam.id)?.label;
    if (label) {
      //  移除原有
      if (Array.isArray(label)) {
        label.forEach(p => {
          me.labels.remove(p);
        });
      } else {
        this.labels.remove(label);
      }
    }
    label = LayerFactory.generateLabel(layerParam, this.labels, this.getLayerVisible(layerParam.parentId));
    layer.label = label.label;
    if (reRange) layer.rectangle = label.rectangle;
  }
};

/**
 * 设置标签属性
 * @param {*} layerid
 * @param {*} name
 * @param {*} value
 */
LayerParamSetter.prototype.setBillboardParams = function (layerid, name, value, singleId) {
  const layer = this.layerDictionary.get(layerid);
  let billboard;
  if (layer.type === LayerType.TrackCollection) {
    billboard = layer?.track?.billboard;
  } else {
    billboard = layer?.billboard;
  }
  if (billboard) {
    if (Array.isArray(billboard)) {
      if (singleId != undefined && singleId != null) {
        const single = billboard.find(item => item.id == `${layerid}-${singleId}`);
        if (single) single[name] = value;
      } else {
        billboard.forEach(p => {
          p[name] = value;
        });
      }
    } else {
      billboard[name] = value;
    }
  }
};

/**
 * 重设图层标签
 * @param {*} layerParam
 */
LayerParamSetter.prototype.resetBillboard = function (layerParam, reRange = true) {
  const me = this;
  const layer = this.layerDictionary.get(layerParam.id);
  if (layer) {
    if (layerParam.type == LayerType.BillboardCollection) layer.batched = layerParam.batchLabel?.length > 1;
    let billboard = this.layerDictionary.get(layerParam.id)?.billboard;
    if (billboard) {
      //  移除原有
      if (Array.isArray(billboard)) {
        billboard.forEach(p => {
          me.billboards.remove(p);
        });
      } else {
        this.billboards.remove(billboard);
      }
    }
    billboard = LayerFactory.generateBillboard(layerParam, this.billboards, this.getLayerVisible(layerParam.parentId));
    layer.billboard = billboard.billboard;
    if (reRange) layer.rectangle = billboard.rectangle;
  }
};

/**
 * 设置边界属性
 * @param {*} layerid
 * @param {*} name
 * @param {*} value
 */
LayerParamSetter.prototype.setBorderParams = function (param, type, layerParam = {}) {
  // layerParam 传入意味着数据全部更新，上传批量或手绘时用
  const layer = this.layerDictionary.get(param.layerId);
  const parentShow = this.getLayerVisible(layerParam.parentId);
  const isBorderLayer = layerParam.id && layerParam.type == LayerType.VectorCollection;
  if (layer) {
    if (isBorderLayer) {
      layer.batched = layerParam.layerBorder.batchCoordinate?.length > 0;
    }
    if (param.batchCoordinate?.length > 0) {
      // 批量
      const show =
        !layerParam.id ||
        (layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && param.isLight)));
      if (layer.border?.constructor == Cesium.Entity) this.entities.remove(layer.border); // 原本不是批量
      const collection = param.isGround == 1 ? this.groundPrimitives : this.primitives;
      const multilinestring = []; // 计算范围
      const positions = [];
      param.batchCoordinate.forEach(coordinate => {
        const position = [];
        const linestring = [];
        coordinate.forEach(p => {
          if (!p.z || isNaN(p.z)) p.z = 0;
          let height = p.z;
          if (param.isGround == 0) height = param.alt || 0;
          position.push(Cesium.Cartesian3.fromDegrees(p.x, p.y, height));
          linestring.push([p.x, p.y]);
        });
        positions.push(position);
        multilinestring.push(linestring);
      });
      if (isBorderLayer) {
        //  更新范围
        const bbox = turf.bbox(turf.multiLineString(multilinestring));
        layer.rectangle = new Cesium.Rectangle(
          Cesium.Math.toRadians(bbox[0] - 0.00005),
          Cesium.Math.toRadians(bbox[1] - 0.00005),
          Cesium.Math.toRadians(bbox[2] + 0.00005),
          Cesium.Math.toRadians(bbox[3] + 0.00005)
        );
      }
      if (param.borderType == 1) {
        //  仅边线
        this.primitives.remove(layer.border);
        this.groundPrimitives.remove(layer.border);
        layer.border = undefined;
        if (type == 'polyline' || type == 'both') {
          this.primitives.remove(layer.outline);
          this.groundPrimitives.remove(layer.outline);
          layer.outline = LayerFactory.generateBatchedPolyline(param, positions, collection, show);
        }
      } else {
        if (type == 'polygon') {
          this.primitives.remove(layer.border);
          this.groundPrimitives.remove(layer.border);
          layer.border = LayerFactory.generateBatchedPolygon(param, positions, collection, show);
        }
        if (type == 'both') {
          this.primitives.remove(layer.outline);
          this.groundPrimitives.remove(layer.outline);
          this.primitives.remove(layer.border);
          this.groundPrimitives.remove(layer.border);
          layer.outline = LayerFactory.generateBatchedPolyline(param, positions, collection, show);
          layer.border = LayerFactory.generateBatchedPolygon(param, positions, collection, show);
        }
        if (type == 'polyline') {
          this.primitives.remove(layer.outline);
          this.groundPrimitives.remove(layer.outline);
          layer.outline = LayerFactory.generateBatchedPolyline(param, positions, collection, show);
        }
      }
    } else {
      // 单个
      if (layer.outline) {
        //  原本是批量
        this.primitives.remove(layer.outline);
        this.groundPrimitives.remove(layer.outline);
        this.primitives.remove(layer.border);
        this.groundPrimitives.remove(layer.border);
        layer.outline = undefined;
        layer.border = undefined;
      }
      const positions = param.coordinate.map(p => {
        if (!p.z || isNaN(p.z)) p.z = 0;
        let height = p.z;
        if (param.isGround == 0) height = param.alt || 0;
        return Cesium.Cartesian3.fromDegrees(p.x, p.y, height);
      });
      const entity = layer.border;
      if (entity) {
        if (param.borderType == 1) {
          // 仅边线
          entity.polygon = undefined;
          if (type == 'polyline' || type == 'both') {
            entity.polyline = LayerFactory.generateBorderPolyline(param, positions);
          }
        } else {
          if (type == 'polygon') {
            entity.polygon = LayerFactory.generateBorderPolygon(param, positions);
          }
          if (type == 'both') {
            entity.polyline = LayerFactory.generateBorderPolyline(param, positions);
            entity.polygon = LayerFactory.generateBorderPolygon(param, positions);
          }
          if (type == 'polyline') {
            entity.polyline = LayerFactory.generateBorderPolyline(param, positions);
          }
        }
      } else {
        //  重新生成
        layer.border = LayerFactory.generateBorder(layerParam, this.entities, parentShow);
      }
    }
  }
};

/**
 * 设置模型属性
 */
LayerParamSetter.prototype.setModelParams = function (layerid, name, value) {
  let model;
  const layer = this.layerDictionary.get(layerid);
  if (layer) {
    if (layer.type == LayerType.TrackCollection) {
      model = layer.track.model;
    } else {
      model = layer.model;
    }
  }
  if (model) {
    if (model.constructor == Cesium.ModelInstanceCollection) {
      if (name == 'color') {
        model.lightColor.x = value.red;
        model.lightColor.y = value.green;
        model.lightColor.z = value.blue;
      }
    } else model[name] = value;
  }
};

/**
 * 设置批量模型亮度
 */
LayerParamSetter.prototype.setModelInstanceCollectionLuminance = function (intensity) {
  const iter = this.layerDictionary.values();
  let layer = iter.next().value;
  while (layer) {
    if (layer.type == LayerType.ModelCollection && layer.model?.constructor === Cesium.ModelInstanceCollection) {
      layer.model.luminanceAtZenith = intensity / 10;
    }
    if (layer.type == LayerType.TilesetCollection && layer.tileset) {
      layer.tileset.luminanceAtZenith = intensity / 10;
    }
    layer = iter.next().value;
  }
};

/**
 * 设置批量模型位置
 */
LayerParamSetter.prototype.setBatchModelPosition = function (param, batchParam) {
  const layerId = param.layerId;
  const model = this.layerDictionary.get(layerId)?.model;
  const batchModel = param.batchModel;
  const me = this;
  if (model && !batchParam) {
    const update = finalHeights => {
      if (model._instances)
        model._instances.forEach(instance => {
          const idx = Number(instance.instanceId.replace(`${layerId}-`, ''));
          const item = Object.assign({}, batchModel[idx]);
          if (param.isGround == 1) {
            item.alt = finalHeights[idx];
          } else if (param.isGround == 0) {
            item.alt = param.alt;
          }
          const mm = Tool$1.MatrixFromPosHprScale(item);
          instance.modelMatrix = mm;
        });
    };
    if (param.isGround != 1) {
      update();
    } else {
      me.viewer.scene.globe.translucency.enabled = false;
      setTimeout(() => {
        const cartographics = batchModel.map(p => Cesium.Cartographic.fromDegrees(p.lon, p.lat));
        me.cesiummap.getHeight(cartographics, [model]).then(res => {
          const heights = res.map(p => p.height);
          update(heights);
          me.viewer.scene.globe.translucency.enabled = me.cesiummap.translucencyEnabled;
        });
      }, 200);
    }
  }
  if (model && batchParam) {
    const instance = model._instances.find(p => p.instanceId == `${layerId}-${batchParam.batchId}`);
    if (instance) {
      const mm = Tool$1.MatrixFromPosHprScale(batchParam);
      instance.modelMatrix = mm;
    }
  }
};

/**
 * 设置水面材质参数
 * @param {*} layerid
 * @param {*} name
 * @param {*} value
 */
LayerParamSetter.prototype.setWaterMaterialParams = function (layerid, name, value) {
  const water = this.layerDictionary.get(layerid)?.water;
  if (water) {
    water.appearance.material.uniforms[name] = value;
  }
};

/**
 * 设置水面几何信息
 * @param {*} layerParam
 * @param {*} type
 */
LayerParamSetter.prototype.setWaterGeometryParams = function (layerParam, type) {
  const layer = this.layerDictionary.get(layerParam.id);
  if (layer) {
    const param = layerParam.layerWaterSurface;
    const parentShow = this.getLayerVisible(layerParam.parentId);
    const show = layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && param.isLight));
    if (layerParam.type == LayerType.WaterCollection)
      layer.batched = layerParam.layerWaterSurface.batchCoordinate.length > 0;
    if (type == 'both') {
      this.primitives.remove(layer.water);
      this.groundPrimitives.remove(layer.water);
      this.primitives.remove(layer.outline);
      this.groundPrimitives.remove(layer.outline);
      const result = LayerFactory.generateWater(
        layerParam,
        layerParam.layerWaterSurface?.isGround == 1 ? this.groundPrimitives : this.primitives,
        parentShow
      );
      layer.water = result.water;
      layer.outline = result.outline;
    } else {
      this.primitives.remove(layer.outline);
      this.groundPrimitives.remove(layer.outline);
      let positions;
      if (param.batchCoordinate.length > 0) {
        positions = param.batchCoordinate.map(coords => {
          return coords.map(p => {
            if (!p.z || isNaN(p.z)) p.z = 0;
            const height = param.isGround == 0 ? param.alt : p.z;
            return Cesium.Cartesian3.fromDegrees(p.x, p.y, height);
          });
        });
      } else {
        positions = param.coordinate.map(p => {
          if (!p.z || isNaN(p.z)) p.z = 0;
          const height = param.isGround == 0 ? param.alt : p.z;
          return Cesium.Cartesian3.fromDegrees(p.x, p.y, height);
        });
        positions = [positions];
      }

      layer.outline = LayerFactory.generateBatchedPolyline(
        param,
        positions,
        param.isGround == 1 ? this.groundPrimitives : this.primitives,
        show
      );
    }
  }
};

/**
 * 设置水面可见距离
 */
LayerParamSetter.prototype.setWaterDisplayDistance = function (layerid, isGround, value) {
  const layer = this.layerDictionary.get(layerid);
  const key = isGround ? '_boundingSpheresKeys' : '_instanceIds';
  if (layer.water) {
    layer.water[key].forEach(id => {
      const attributes = layer.water.getGeometryInstanceAttributes(id);
      attributes.distanceDisplayCondition = value;
      if (layer.outline) {
        const lineAttrs = layer.outline.getGeometryInstanceAttributes(id);
        if (lineAttrs) lineAttrs.distanceDisplayCondition = value;
      }
    });
  }
};

/**
 * 重设流场参数，重新加载
 * @param {*} layerParam
 */
LayerParamSetter.prototype.resetFlowFieldParams = function (layerParam) {
  const parentShow = this.getLayerVisible(layerParam.parentId);
  const param = layerParam.layerFlow;
  const layer = this.layerDictionary.get(layerParam.id);
  const me = this;

  if (typeof layer.remove == 'function') layer.remove(); //  移除原有更新动图事件
  this.primitives.remove(layer.flowField);
  this.groundPrimitives.remove(layer.flowField);
  this.entities.remove(layer.flowFieldOutline);
  layer.gifImages.length = 0; //  清空动图
  const getOrSetGifImages = res => {
    const images = me.layerDictionary.get(layerParam.id).gifImages;
    if (res) {
      images.length = 0;
      res.forEach(p => {
        images.push(p);
      });
    }
    return images;
  };
  const result = LayerFactory.generateFlowField(
    layerParam,
    param.isGround == 1 ? this.groundPrimitives : this.primitives,
    this.entities,
    this.viewer.scene.preRender,
    parentShow,
    true,
    getOrSetGifImages
  );
  if (result.flowField && param.type == 0)
    result.flowField.appearance.material.translucent = this.cesiummap.translucencyEnabled;
  layer.flowField = result.flowField;
  layer.flowFieldOutline = result.outline;
  layer.remove = result.remove;
};

/**
 * 设置gif流场矩形参数，如纹理旋转和矩形坐标
 */
LayerParamSetter.prototype.setGifFlowFieldRectangleParams = function (layerParam, type, loadGif = false) {
  const parentShow = this.getLayerVisible(layerParam.parentId);
  const param = layerParam.layerFlow;
  const layer = this.layerDictionary.get(layerParam.id);
  if (layer && param.coordinate.length > 0) {
    if (type == 'polyline' || type == 'both') {
      //  修改边线
      const positions = param.coordinate.map(p => {
        return Cesium.Cartesian3.fromDegrees(p.x, p.y, param.alt);
      });
      positions.push(positions[0]);
      const polyline = LayerFactory.generateBorderPolyline(param, positions);
      if (layer.flowFieldOutline) layer.flowFieldOutline.polyline = polyline;
      else {
        layer.flowFieldOutline = this.entities.add({
          id: `${param.layerId}-outline`,
          polyline: polyline,
          show: layerParam.check && parentShow && (!layerParam.isView || (layerParam.isView && param.isLight))
        });
      }
    }

    if (type == 'both' || type == 'rectangle') {
      //  重新生成流场
      this.primitives.remove(layer.flowField);
      this.groundPrimitives.remove(layer.flowField);
      if (typeof layer.remove == 'function') layer.remove(); //  移除原有更新动图事件

      const result = LayerFactory.generateGifFlowField(
        param,
        param.isGround == 1 ? this.groundPrimitives : this.primitives,
        null, //  不处理边线
        this.viewer.scene.preRender,
        parentShow,
        loadGif,
        () => {
          return layer.gifImages;
        }
      );
      layer.flowField = result.flowField;
    }
  }
};

/**
 * 设置三维切片位置
 * @param {*} param
 */
LayerParamSetter.prototype.setTilesetPosition = function (param) {
  const layer = this.layerDictionary.get(param.layerId);
  if (layer && layer.tileset) {
    if (param.lon !== 0 || param.lat !== 0) {
      const newPos = Cesium.Cartesian3.fromRadians(
        Cesium.Math.toRadians(param.lon),
        Cesium.Math.toRadians(param.lat),
        param.alt
      );

      const transform = Cesium.Transforms.headingPitchRollToFixedFrame(
        newPos,
        new Cesium.HeadingPitchRoll(
          Cesium.Math.toRadians(param.heading),
          Cesium.Math.toRadians(param.pitch),
          Cesium.Math.toRadians(param.roll)
        )
      );

      const scale = Cesium.Matrix4.fromUniformScale(param.zoom);

      Cesium.Matrix4.multiply(transform, scale, transform);

      Cesium.Matrix4.clone(transform, layer.tileset._root.transform);
      layer.tileset.modelMatrix = Cesium.Matrix4.IDENTITY.clone();
    } else {
      const tt = layer.tileset.originalTransform.clone();
      Cesium.Matrix4.clone(tt, layer.tileset._root.transform);

      // 改变高度
      const orgPos = new Cesium.Cartesian3(tt[12], tt[13], tt[14]);
      // const orgPos = Cesium.Matrix4.multiplyByPoint(Cesium.Matrix4.inverse(layer.tileset.modelMatrix, new Cesium.Matrix4()), layer.tileset.boundingSphere.center, new Cesium.Cartesian3());
      const cartographic = Cesium.Cartographic.fromCartesian(orgPos);
      const surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
      const offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude + Cesium.Math.toRadians(param.lon),
        cartographic.latitude + Cesium.Math.toRadians(param.lat),
        param.alt
      );
      const translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());

      // 旋转
      const quaternion = Cesium.Quaternion.fromAxisAngle(orgPos, Cesium.Math.toRadians(param.heading));
      console.log(orgPos);
      const m3 = Cesium.Matrix3.fromQuaternion(quaternion);
      const transform = Cesium.Matrix4.fromRotationTranslation(m3, translation);

      // const scale = Cesium.Matrix4.fromUniformScale(param.zoom);
      // Cesium.Matrix4.multiply(scale, transform, transform);

      layer.tileset.modelMatrix = transform;
    }
  }
};

LayerParamSetter.prototype.setTilesetColor = function (param) {
  const layer = this.layerDictionary.get(param.layerId);
  if (layer && layer.tileset) {
    layer.tileset.style = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [['true', `color("${param.color}")`]]
      }
    });
  }
};

/**
 * 重新加载切片
 * @param {*} param
 */
LayerParamSetter.prototype.reloadTileset = function (layerParam) {
  const param = layerParam.layerTile;
  let layer = this.layerDictionary.get(param.layerId);
  const me = this;
  const color = Cesium.Color.fromCssColorString(layerParam.layerTile?.color || 'white');
  if (layer) {
    this.primitives.remove(layer.tileset);
    layer.tileset = LayerFactory.generate3DTileset(
      layerParam,
      this.primitives,
      this.viewer.scene,
      (feature, result) => {
        return me._setTileLayerColor(layerParam.name, feature, result, color);
      }
    );
  }
};

/* eslint-disable */

const TimeEasingType = {
  Default: 0,
  Linear: 1
};

const TimeEasingFunction = {
  0: undefined,
  1: Cesium.EasingFunction.LINEAR_NONE
};

class ViewHelper {
  constructor(cesiummap) {
    this.cesiummap = cesiummap;
    this.viewer = cesiummap.viewer;
    this.layerManager = cesiummap.layerManager;
  }
  /**
   * 给未设置视角的图层创建默认动画视角
   * @param {*} layerInfo
   * @returns
   */
  getAnimationDefaultView(layerInfo) {
    let info;
    let view = () => {
      return Promise.resolve();
    }; // ViewHelper.flyToViews中的参数，views列表项
    const lm = this.cesiummap.layerManager;
    switch (layerInfo.type) {
      case LayerType.ViewCollection:
        [info] = layerInfo.layerViews;
        break;
      case LayerType.LabelCollection:
        info = layerInfo.layerText;
        break;
      case LayerType.BillboardCollection:
        info = layerInfo.layerLabel;
        break;
      case LayerType.VectorCollection:
        view = () => {
          return new Promise((resolve, reject) => {
            lm.zoomToBorder({
              layerid: layerInfo.id,
              failed: resolve,
              success: resolve
            });
          });
        };
        break;
      case LayerType.ModelCollection:
        view = () => {
          return new Promise((resolve, reject) => {
            lm.zoomToModel({
              layerid: layerInfo.id,
              failed: resolve,
              success: resolve
            });
          });
        };
        break;
      case LayerType.WaterCollection:
        view = () => {
          return new Promise((resolve, reject) => {
            lm.zoomToWater({
              layerid: layerInfo.id,
              failed: resolve,
              success: resolve
            });
            // 播放淹没
            if (layerInfo.layerWaterSurface.floodAnalysisCheck) {
              lm.playWaterFloodAnalysis(layerInfo.layerWaterSurface);
            }
          });
        };
        break;
      case LayerType.FlowFieldCollection:
        view = () => {
          return new Promise((resolve, reject) => {
            lm.zoomToFlowField({
              layerid: layerInfo.id,
              failed: resolve,
              success: resolve
            });
          });
        };
        break;
      case LayerType.TerrainClippingCollection:
        view = () => {
          return new Promise((resolve, reject) => {
            lm.zoomToLayerRectangle({
              layerid: layerInfo.id,
              failed: resolve,
              success: resolve
            });
          });
        };
        break;
      case LayerType.TilesetCollection:
        view = () => {
          return new Promise((resolve, reject) => {
            lm.zoomToTileset({
              layerid: layerInfo.id,
              failed: resolve,
              success: resolve
            });
          });
        };
        break;
      case LayerType.TrackCollection:
        view = () => {
          return new Promise((resolve, reject) => {
            lm.zoomToTrack({
              layerid: layerInfo.id,
              failed: resolve,
              success: resolve
            });
          });
        };
        break;
    }
    if (info) {
      return Tool.getCameraFlyToDegrees([info.lon, info.lat, info.alt]);
    }

    return view;
  }
  /**
   *
   * @param {*} viewer
   * @param {*} handler
   * @param {*} scope
   */
  static addEvent(viewer, handler, scope) {
    return viewer.camera.moveEnd.addEventListener(handler, scope);
  }
  /**
   * 设置相机位置与视角
   * @param {*} view
   * @param {*} viewParams
   */
  static setView(viewer, viewParams) {
    viewer.camera.setView({
      destination: new Cesium.Cartesian3.fromDegrees(viewParams.lon, viewParams.lat, viewParams.alt),
      orientation: {
        heading: Cesium.Math.toRadians(viewParams.heading),
        pitch: Cesium.Math.toRadians(viewParams.pitch),
        roll: Cesium.Math.toRadians(viewParams.roll)
      }
    });
  }
  /**
   * 飞至指定视角
   * @param {*} viewer
   * @param {*} viewParams
   * @param {*} fromDefault
   */
  static flyToView(viewer, viewParams, fromDefault = true, success = () => {}, cancel = () => {}) {
    if (fromDefault) viewer.camera.setView(P.defaultView);
    viewer.camera.flyTo({
      destination: new Cesium.Cartesian3.fromDegrees(viewParams.lon, viewParams.lat, viewParams.alt),
      orientation: {
        heading: Cesium.Math.toRadians(viewParams.heading),
        pitch: Cesium.Math.toRadians(viewParams.pitch),
        roll: Cesium.Math.toRadians(viewParams.roll)
      },
      duration: viewParams.duration,
      maximumHeight: viewParams.alt,
      complete: success,
      cancel: cancel,
      easingFunction: TimeEasingFunction[viewParams.timeEasing]
    });
  }
  /**
   * 连续飞行
   * @param {*} viewer
   * @param {*} views
   * @param {*} success
   */
  static flyToViews(viewer, views, complete = () => {}, cancel = () => {}) {
    const scope = {
      handler: null,
      index: 0
    };

    let fly = (viewer, views, index, success, cancelFly) => {
      let viewParams = views[index];
      let flyEnd;
      if (index == views.length - 1) {
        // 最后一个视角
        flyEnd = () => {
          if (viewParams.pauseTime) {
            scope.handler = setTimeout(() => {
              success();
            }, viewParams.pauseTime * 1000);
          } else {
            success();
          }
        };
      } else {
        flyEnd = () => {
          index++;
          if (viewParams.pauseTime) {
            scope.handler = setTimeout(() => {
              fly(viewer, views, index, success, cancelFly);
            }, viewParams.pauseTime * 1000);
          } else {
            fly(viewer, views, index, success, cancelFly);
          }
        };
      }
      if (viewParams) {
        if (typeof viewParams == 'function') {
          viewParams().then(() => {
            flyEnd();
          });
        } else {
          viewer.camera.flyTo({
            destination: new Cesium.Cartesian3.fromDegrees(viewParams.lon, viewParams.lat, viewParams.alt),
            orientation: {
              heading: Cesium.Math.toRadians(viewParams.heading),
              pitch: Cesium.Math.toRadians(viewParams.pitch),
              roll: Cesium.Math.toRadians(viewParams.roll)
            },
            maximumHeight: viewParams.alt,
            duration: viewParams.duration,
            complete: flyEnd,
            cancel: () => {
              cancelFly(index);
            },
            easingFunction: TimeEasingFunction[viewParams.timeEasing]
          });
        }
      } else {
        success();
      }
    };

    const cancelFly = index => {
      cancel({ index, views });
      clearTimeout(scope.handler);
    };

    fly(viewer, views, 0, complete, cancelFly);

    return cancelFly;
  }
  /**
   * 截图
   * @param {*} viewer
   */
  static getScreenShot(viewer, width = 400, height = null) {
    let canvas = viewer.scene.canvas;
    height = height || (width * canvas.height) / canvas.width;
    let image = Canvas2Image.convertToImage(canvas, width, height, 'png');
    return image;
  }
  /**
   * base64转二进制
   * @param {*} url
   */
  static image2blob(dataurl) {
    if (!dataurl) return new Blob();
    let arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }
  /**
   *
   */
  static processImageUrl(dataurl) {
    if (!dataurl) return '';
    return dataurl.replace('data:image/png;base64,', '');
  }
}

/* eslint-disable */

function getScaleFromTransform$1(m) {
  const scalex = Math.sqrt(m[0] * m[0] + m[1] * m[1] + m[2] * m[2]);
  const scaley = Math.sqrt(m[4] * m[4] + m[5] * m[5] + m[6] * m[6]);
  const scalez = Math.sqrt(m[8] * m[8] + m[9] * m[9] + m[10] * m[10]);
  return [scalex, scaley, scalez];
}

function LayerZoom() {}

/**
 * 缩放至边界
 * @param {*}} layerid
 */
LayerZoom.prototype.zoomToBorder = function({ layerid, failed = () => {}, success = () => {} }) {
  const layer = this.layerDictionary.get(layerid);
  if (layer) {
    const border = layer.border || layer.outline;
    if (border && !layer.batched) {
      try {
        this.viewer.zoomTo(border, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 0)); // sqrt(2) * 20
        success();
      } catch (err) {
        failed();
      }
    } else if (border && layer.batched) {
      try {
        this.zoomToLayerRectangle({ layerid, success });
        // this.viewer.camera.flyToBoundingSphere(layer.outline._boundingSpheres[0], {
        //   complete: success,
        //   duration: 0,
        //   offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 0)
        // });
      } catch (err) {
        failed();
      }
    } else {
      failed();
    }
  } else {
    failed();
  }
};
/**
 * 获取边界视角
 * @param {*} param
 */
LayerZoom.prototype.getBorderView = function(param) {
  const features = param.coordinate.map(p => turf.point([p.x, p.y]));
  const center = turf.center(turf.featureCollection(features)).geometry.coordinates;
  const radius = 20 * 4;
  let height = this.viewer.scene.globe.getHeight(Cesium.Cartographic.fromDegrees(center[0], center[1]));
  if (!height) height = 0;

  return {
    lon: center[0],
    lat: center[1] - (0.00001 * radius) / 1.1,
    alt: height + radius * 0.71,
    heading: 0,
    pitch: -45,
    roll: 0
  };
};
/**
 * 缩放至模型
 * @param {*} layerid
 */
LayerZoom.prototype.zoomToModel = function({ layerid, failed = () => {}, success = () => {} }) {
  const model = this.layerDictionary.get(layerid)?.model;
  const camera = this.viewer.camera;
  if (model) {
    try {
      const modelMatrix = model._clampedModelMatrix || model.modelMatrix; // 是否贴地
      const scale = getScaleFromTransform$1(modelMatrix);
      const surface = Cesium.Matrix4.multiplyByPoint(
        model._clampedModelMatrix || model.modelMatrix,
        model._boundingSphere.center,
        new Cesium.Cartesian3()
      );
      camera.flyToBoundingSphere(new Cesium.BoundingSphere(surface, model._boundingSphere.radius * scale[0] * 1.5), {
        complete: success,
        duration: 0,
        offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 0)
      });
    } catch (err) {
      failed();
    }
  } else {
    failed();
  }
};
/**
 * 缩放至水面
 * @param {*} layerid
 */
LayerZoom.prototype.zoomToWater = function({ layerid, failed = () => {}, success = () => {} }) {
  const water = this.layerDictionary.get(layerid)?.water;
  const camera = this.viewer.camera;
  if (water) {
    try {
      camera.flyToBoundingSphere(water._boundingSpheres[0], {
        complete: success,
        duration: 0,
        offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 0)
      });
    } catch (err) {
      failed();
    }
  } else {
    failed();
  }
};
/**
 * 缩放至流场
 * @param {*} param0
 */
LayerZoom.prototype.zoomToFlowField = function({ layerid, failed = () => {}, success = () => {} }) {
  const flowField = this.layerDictionary.get(layerid)?.flowField;
  if (flowField) {
    try {
      this.viewer.camera.flyToBoundingSphere(flowField._boundingSpheres[0], {
        complete: success,
        duration: 0,
        offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-45), 0)
      });
    } catch (err) {
      failed();
    }
  } else {
    failed();
  }
};
/**
 * 飞行至矩形范围
 */
LayerZoom.prototype.zoomToLayerRectangle = function({ layerid, success = () => {} }) {
  const layer = this.layerDictionary.get(layerid);
  if (layer && layer.rectangle) {
    this.viewer.camera.flyTo({
      destination: layer.rectangle,
      duration: 0,
      complete: success
    });
  }
};
/**
 * 缩放至切片
 * @param {*} param0
 */
LayerZoom.prototype.zoomToTileset = function({ layerid }) {
  const layer = this.layerDictionary.get(layerid);
  if (layer && layer.tileset) {
    this.viewer.zoomTo(
      layer.tileset,
      new Cesium.HeadingPitchRange(
        0,
        Cesium.Math.toRadians(-45),
        Math.max(100.0 - layer.tileset.boundingSphere.radius, 0.0)
      )
    );
  }
};
/**
 * 获取模型视角参数
 * @param {*} param
 */
LayerZoom.prototype.getModelView = function(param) {
  const model = this.layerDictionary.get(param.layerId)?.model;
  let radius = model ? model.boundingSphere.radius : 20;
  if (model) {
    return {
      lon: param.lon,
      lat: param.lat - (0.00001 * 3 * radius) / 1.1, // 简单计算纬度差
      alt: param.alt + radius * 3 * 0.71,
      heading: 0,
      pitch: -30,
      roll: 0
    };
  }
};

/**
 * 缩放至轨迹
 */
LayerZoom.prototype.zoomToTrack = function({ layerid, stopAnimate = false }) {
  const track = this.layerDictionary.get(layerid)?.track;
  if (track) {
    this.viewer.zoomTo(track);
    // 时钟定位
    this.trackHelper.zoomToClock(layerid, stopAnimate);
  }
};

/**
 * 缩放至图层
 */
LayerZoom.prototype.zoomToLayer = function(data, complete = () => {}) {
  const cesiummap = this.cesiummap;
  const duration = 3;
  const times = 3;

  if ((data.isView || data.type == LayerType.ViewCollection) && data.layerViews.length > 0) {
    cesiummap.triggerMoveEnd = false;
    const tmp = { ...data.layerViews[0] };
    tmp.duration = 0;
    ViewHelper.flyToView(cesiummap.viewer, tmp, false, () => {
      complete();
      setTimeout(() => {
        cesiummap.triggerMoveEnd = true;
      }, 500);
    });
    if (data.type === LayerType.TrackCollection) {
      this.trackHelper.zoomToClock(data.id, true);
    }
  } else {
    let layer = null;
    switch (data.type) {
      case LayerType.LabelCollection:
        if (data.layerText.batchText?.length > 1) {
          cesiummap.layerManager.zoomToLayerRectangle({ layerid: data.id });
        } else {
          layer = data.layerText;
        }
        break;
      case LayerType.BillboardCollection:
        if (data.layerLabel.batchLabel?.length > 1) {
          cesiummap.layerManager.zoomToLayerRectangle({ layerid: data.id });
        } else {
          layer = data.layerLabel;
        }
        break;
      case LayerType.VectorCollection:
        const coordinate =
          data.layerBorder.batchCoordinate?.length > 0 ? data.layerBorder.batchCoordinate : data.layerBorder.coordinate;
        if (coordinate && coordinate.length > 0)
          cesiummap.layerManager.zoomToBorder({
            layerid: data.id,

            success: () => {
              // entity若立即闪烁不定位
              setTimeout(() => {
                cesiummap.layerManager.canFlick = true;
                cesiummap.layerManager.flickerItem({
                  layerid: data.id,
                  itemType: LayerType.VectorCollection,
                  params: {
                    duration: duration,
                    count: times,
                    isLight: data.layerBorder.isLight
                  }
                });
              }, 200);
            }
          });
        break;
      case LayerType.ModelCollection:
        cesiummap.layerManager.zoomToModel({
          layerid: data.id,
          failed: () => {
            if (data.layerModel.lon) cesiummap.zoomTo([data.layerModel.lon, data.layerModel.lat, data.layerModel.alt]);
          },
          success: () => {
            if (data.check) {
              cesiummap.layerManager.canFlick = true;
              cesiummap.layerManager.flickerItem({
                layerid: data.id,
                itemType: LayerType.ModelCollection,
                params: {
                  duration: duration,
                  count: times,
                  isLight: data.layerModel.isLight
                }
              });
            }
          }
        });

        break;
      case LayerType.WaterCollection:
        if (data.layerWaterSurface.coordinate.length > 0 || data.layerWaterSurface.batchCoordinate.length > 0)
          cesiummap.layerManager.zoomToWater({ layerid: data.id });
        break;
      case LayerType.FlowFieldCollection:
        cesiummap.layerManager.zoomToFlowField({ layerid: data.id });
        break;
      case LayerType.TerrainClippingCollection:
        cesiummap.layerManager.zoomToLayerRectangle({ layerid: data.id });
        break;
      case LayerType.TilesetCollection:
        cesiummap.layerManager.zoomToTileset({ layerid: data.id });
        break;
      case LayerType.TrackCollection:
        cesiummap.layerManager.zoomToTrack({ layerid: data.id, stopAnimate: true });
        break;
    }
    if (layer && layer.lon) cesiummap.zoomTo([layer.lon, layer.lat, layer.alt]);
    complete();
  }
};

/* eslint-disable */

class ClippingHelper {
  constructor(layerManager) {
    this.lm = layerManager;
    this.viewer = layerManager.viewer;
    this.multiClippingPlanes = new Cesium.MultiClippingPlaneCollection({
      collections: []
    });
    this.viewer.scene.globe.multiClippingPlanes = this.multiClippingPlanes;
  }

  /**
   * 添加裁剪面
   * @param {*} points
   */
  addClippingPlaneCollection(layerParam, generateBorder = true) {
    const param = layerParam.layerTerrainClipping;
    const isBatch = param.batchCoordinate.length > 0;
    const me = this;
    const process = xyzPoints => {
      let points = xyzPoints.map(p => {
        return [p.x, p.y, p.z];
      });
      // 坐标点应逆时针顺序
      let lineString = turf.lineString(points);
      if (turf.booleanClockwise(lineString)) {
        // 如果顺时针则反转
        lineString = turf.rewind(lineString, {
          reverse: true
        });
        points = lineString.geometry.coordinates;
      }
      points = points.map(p => {
        return Cesium.Cartesian3.fromDegrees(p[0], p[1], p[2]);
      });
      // console.log(points.length);
      if (points[0].equals(points[points.length - 1])) {
        points = points.slice(0, -1);
      }
      // console.log(points.length);

      const collection = me._generateClippingPlanesCollection(points);
      me.multiClippingPlanes.add(collection);
      return { lineString, collection };
    };
    if (!isBatch && param) {
      if (param.coordinate?.length > 0) {
        // 范围
        const { lineString, collection } = process(param.coordinate);

        const bbox = turf.bbox(lineString);
        const width = (bbox[2] - bbox[0]) / 2;
        const height = (bbox[3] - bbox[1]) / 2;
        const rectangle = new Cesium.Rectangle(
          Cesium.Math.toRadians(bbox[0] - width),
          Cesium.Math.toRadians(bbox[1] - height),
          Cesium.Math.toRadians(bbox[2] + width),
          Cesium.Math.toRadians(bbox[3] + height)
        );

        if (!generateBorder) {
          return { collection, rectangle };
        }

        // 边界
        const { border, outline } = this.generateClippingBorder(param);
        return {
          collection,
          rectangle,
          border,
          outline
        };
      }
    }
    if (isBatch && param) {
      const lines = [];
      const collections = [];
      param.batchCoordinate.forEach(xyzPoints => {
        const { lineString, collection } = process(xyzPoints);
        lines.push(lineString.geometry.coordinates);
        collections.push(collection);
      });

      const lineStrings = turf.multiLineString(lines);
      // 范围
      const bbox = turf.bbox(lineStrings);
      const width = (bbox[2] - bbox[0]) / 2;
      const height = (bbox[3] - bbox[1]) / 2;
      const rectangle = new Cesium.Rectangle(
        Cesium.Math.toRadians(bbox[0] - width),
        Cesium.Math.toRadians(bbox[1] - height),
        Cesium.Math.toRadians(bbox[2] + width),
        Cesium.Math.toRadians(bbox[3] + height)
      );

      if (!generateBorder) {
        return {
          collection: collections,
          rectangle
        };
      }

      // 边界
      const { border, outline } = this.generateClippingBorder(param);

      return {
        collection: collections,
        rectangle,
        border,
        outline
      };
    }
    return {};
  }

  /**
   * 移除裁剪面
   * @param {*} collection
   */
  removeClippingPlaneCollection(collection) {
    if (Array.isArray(collection)) {
      collection.forEach(c => {
        this.multiClippingPlanes.remove(c);
        if (typeof c.isDestroyed === 'function') {
          if (!c.isDestroyed()) {
            c.destroy();
          }
        }
      });
    } else {
      this.multiClippingPlanes.remove(collection);
      debugger
      if (typeof collection.isDestroyed === 'function') {
        if (!collection.isDestroyed()) {
          collection.destroy();
        }
      }
    }
  }

  /**
   * 生成裁剪的边界
   * @param {*} param
   */
  generateClippingBorder(param, type = 'both') {
    let outline, border, polyline, polygon;
    let positions = [];
    const isBatch = param.batchCoordinate?.length > 0;
    if (isBatch) {
      param.batchCoordinate.forEach(coordinate => {
        const position = [];
        coordinate.forEach(p => {
          if (!p.z || isNaN(p.z)) p.z = 0;
          position.push(Cesium.Cartesian3.fromDegrees(p.x, p.y, p.z));
        });
        positions.push(position);
      });
    } else {
      positions = param.coordinate.map(p => {
        if (!p.z || isNaN(p.z)) p.z = 0;
        return Cesium.Cartesian3.fromDegrees(p.x, p.y, p.z);
      });
    }
    param.isGround = 2;

    /**
     * LayerFactory中生成边界与批量边界的方法总会创建边线，只不过不勾选时颜色设为透明，因为边界图层总是需要有线显示
     * 这里为了减少资源消耗更改绘制逻辑，在不勾选线时就不创建
     */
    const isOutline = param.borderColor.slice(-2) !== '00'; // 根据线是否透明判断是否画边线，与参数面板逻辑一致
    if (isOutline) {
      if (isBatch && (type == 'polyline' || type == 'both')) {
        outline = LayerFactory.generateBatchedPolyline(param, positions, this.lm.primitives);
      } else {
        polyline = LayerFactory.generateBorderPolyline(param, positions);
      }
    }

    if (param.borderType == 0) {
      if (isBatch && (type == 'polygon' || type == 'both')) {
        border = LayerFactory.generateBatchedPolygon(param, positions, this.lm.primitives);
      } else {
        polygon = LayerFactory.generateBorderPolygon(param, positions);
      }
    }

    if (polyline || polygon) {
      border = this.lm.entities.add({
        id: `${param.layerId}-outline`,
        polyline: polyline,
        polygon: polygon
      });
    }

    return {
      outline,
      border
    };
  }

  /**
   * 设置边界样式
   */
  setClippingBorderParams(param, type) {
    const lm = this.lm;
    const layer = lm.layerDictionary.get(param.layerId);
    if (layer) {
      // 移除原有数据
      if (layer.border?.constructor == Cesium.Entity) lm.entities.remove(layer.border);
      else if (layer.border) {
        if (type == 'polygon' || type == 'both') {
          lm.primitives.remove(layer.border);
          layer.border = undefined;
        }
      }
      if (type == 'polyline' || type == 'both') {
        lm.primitives.remove(layer.outline);
        layer.outline = undefined;
      }

      const { border, outline } = this.generateClippingBorder(param, type);

      if (border) layer.border = border;
      if (outline) layer.outline = outline;
    }
  }

  /**
   * 重新生成裁剪
   */
  resetClippingBorderGeometry(layerParam) {
    const lm = this.lm;
    const layer = lm.layerDictionary.get(layerParam.id);
    if (layer) {
      // 移除原有
      if (layer.border?.constructor == Cesium.Entity) lm.entities.remove(layer.border);
      else if (layer.border) {
        lm.primitives.remove(layer.border);
      }
      if (layer.outline) {
        lm.primitives.remove(layer.outline);
      }

      if (layer.clippingPlanes) {
        this.removeClippingPlaneCollection(layer.clippingPlanes);
      }

      // setTimeout(() => {
      const { collection, rectangle, border, outline } = this.addClippingPlaneCollection(layerParam);
      layer.clippingPlanes = collection;
      layer.rectangle = rectangle;
      layer.border = border;
      layer.outline = outline;
      // }, 200);
    }
  }

  /**
   * 根据坐标点生成各边界法线与距离
   * @param {*} points
   */
  _generateClippingPlanesCollection(points) {
    const pointsLength = points.length;
    const clippingPlanes = [];
    for (let i = 0; i < pointsLength; ++i) {
      const nextIndex = (i + 1) % pointsLength;
      let midpoint = Cesium.Cartesian3.add(points[i], points[nextIndex], new Cesium.Cartesian3());
      midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);

      const up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());
      let right = Cesium.Cartesian3.subtract(points[nextIndex], midpoint, new Cesium.Cartesian3());
      right = Cesium.Cartesian3.normalize(right, right);

      let normal = Cesium.Cartesian3.cross(right, up, new Cesium.Cartesian3());
      normal = Cesium.Cartesian3.normalize(normal, normal);

      // Compute distance by pretending the plane is at the origin
      const originCenteredPlane = new Cesium.Plane(normal, 0.0);
      const distance = Cesium.Plane.getPointDistance(originCenteredPlane, midpoint);

      clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
    }
    return new Cesium.ClippingPlaneCollection({
      planes: clippingPlanes
    });
  }
}

/** 全景中用不到，在项目中 */

/* eslint-disable */
function TilesetHelper() {}

/**
 * 设置tileset进度展示
 * @param {*} id
 * @param {*} visibleArrays
 * @param {*} keyName
 * @param {*} layerParam
 */
TilesetHelper.prototype.setTilesetShow = function(
  id,
  visibleArrays,
  delayArrays,
  keyName = 'name',
  layerParam = null,
  ignoreFunc
) {
  const me = this;
  this.showProgressTilesetId = id;
  const layer = this.layerDictionary.get(id);
  if (layer && layer.tileset) {
    const tileset = layer.tileset;
    if (typeof visibleArrays === 'function') {
      tileset.style.color = {
        evaluateColor: (feature, result) => {
          let name = feature.getProperty(keyName);
          name = name?.toString().replaceAll('_', '-');

          if (typeof ignoreFunc === 'function') {
            // 忽略项
            if (ignoreFunc(name)) {
              return Cesium.Color.clone(new Cesium.Color(1, 1, 1, 1), result);
            }
          }

          if (typeof delayArrays === 'function') {
            // 标记延迟施工项
            if (delayArrays(name)) {
              return me._setTileLayerColor(layerParam?.name, feature, result, new Cesium.Color(1, 0, 0, 0.5));
            }
          }

          if (visibleArrays(name)) {
            return me._setTileLayerColor(layerParam?.name, feature, result, new Cesium.Color(0, 1, 0, 0.5));
          } else {
            return me._setTileLayerColor(layerParam?.name, feature, result, new Cesium.Color(1, 1, 1, 0.3));
          }
        }
      };
      tileset.makeStyleDirty();
    } else {
      // 还原
      this.showProgressTilesetId = '';
      let color = Cesium.Color.WHITE;
      if (layerParam?.layerTile) color = Cesium.Color.fromCssColorString(layerParam.layerTile.color);
      tileset.style.color = {
        evaluateColor: (feature, result) => {
          return me._setTileLayerColor(layerParam?.name, feature, result, color);
        }
      };
      tileset.makeStyleDirty();
    }
  }
};

/**
 * 设置地形显示隐藏
 * @param {*} ifShow
 */
TilesetHelper.prototype.showTerrain = function(ifShow) {
  if (ifShow) {
    const me = this;
    this.terrainTiles.forEach(data => {
      data.tileset.style.color = {
        evaluateColor: (feature, result) => {
          return me._setTileLayerColor(data.name, feature, result, data.tileset.color);
        }
      };
      data.tileset.makeStyleDirty();
    });
  } else {
    this.terrainTiles.forEach(data => {
      data.tileset.style.color = 'color("white", 0.3)';
      data.tileset.makeStyleDirty();
    });
  }
};

/**
 * 设置某个tileset显隐
 * @param {*} name
 */
TilesetHelper.prototype.showTileset = function(name, ifShow, aplha = 0.3) {
  if (this.layerDictionary) {
    let tileset;
    const layers = this.layerDictionary.values();
    let item = layers.next();
    // 查找
    while (!tileset && !item.done) {
      const layer = item.value;
      if (layer.type === LayerType.TilesetCollection && layer.tileset?.name === name) {
        tileset = layer.tileset;
      }
      item = layers.next();
    }
    if (tileset) {
      if (ifShow) {
        const me = this;
        tileset.style.color = {
          evaluateColor: (feature, result) => {
            return me._setTileLayerColor(tileset.name, feature, result, tileset.color);
          }
        };
      } else {
        tileset.style.color = `color("white", ${aplha})`;
      }
      tileset.makeStyleDirty();
    }
  }
};

/**
 * 高亮
 * @param {*} code
 */
TilesetHelper.prototype.highlightTile = function(codes) {
  const me = this;
  this.highlightTileCode = codes;

  if (this.currentTilesetId) {
    const layer = this.layerDictionary.get(this.currentTilesetId);
    if (layer && layer.tileset) {
      const tileset = layer.tileset;

      tileset.makeStyleDirty();

      let inverse = new Cesium.Matrix4();
      inverse = Cesium.Matrix4.inverse(tileset.originalTransform, inverse); // 求原始变化的逆，计算切片相对原点的位置变化

      let realTransform = tileset._root.transform.clone();
      realTransform = Cesium.Matrix4.multiply(realTransform, tileset.modelMatrix, realTransform);

      const zoom = scenetree => {
        if (Array.isArray(scenetree)) {
          const sphere = scenetree.find(p => p.name.replaceAll('_', '-') === codes[0])?.sphere;
          if (sphere) {
            const orgPos = Cesium.Matrix4.multiplyByPoint(
              inverse,
              new Cesium.Cartesian3(sphere[0], sphere[1], sphere[2]),
              new Cesium.Cartesian3()
            );

            const newPos = Cesium.Matrix4.multiplyByPoint(realTransform, orgPos, new Cesium.Cartesian3());

            const boundingSphere = new Cesium.BoundingSphere(newPos, sphere[3]); // 注意，这里暂未考虑模型缩放
            me.viewer.camera.flyToBoundingSphere(boundingSphere, {
              duration: 0
            });
          }
        }
      };

      if (layer.scenetree) {
        zoom(layer.scenetree);
      } else {
        Cesium.Resource.fetchJson({
          url: `${tileset.basePath}${tileset.extras.scenetree}`
        }).then(res => {
          const scenetree = res.scenes[0]?.children;
          layer.scenetree = scenetree;
          zoom(scenetree);
        });
      }
    }
  }
};

/* eslint-disable */

class FloodAnalysis {
  constructor(waterParam, viewer, onEnd = () => {}) {
    this.id = `flood-analysis-${waterParam.layerId}`;
    this.viewer = viewer;
    this.param = waterParam;
    this.start = undefined;
    this.elapsed = 0;
    this.onEnd = onEnd;
    this.animationId = null;

    this._animate = this._animate.bind(this);

    const exist = viewer.entities.getById(this.id);
    if (exist) {
      viewer.entities.remove(exist);
    }
    viewer.entities.add(this._generateWaterGraphics());
    this.play();
  }

  play() {
    this.animationId = requestAnimationFrame(this._animate);
  }

  destroy() {
    cancelAnimationFrame(this.animationId);
    this.viewer.entities.removeById(this.id);
    this.viewer = undefined;
    this.onEnd();
  }

  _animate(time) {
    if (this.start === undefined) {
      this.start = time;
    }
    this.elapsed = (time - this.start) / 1000;

    if (this.elapsed >= this.param.analysisDuration) {
      this.destroy();
    } else {
      this.animationId = requestAnimationFrame(this._animate);
    }
  }

  /**
   * 生成水面图形
   * @returns
   */
  _generateWaterGraphics() {
    const me = this;

    const hierarchy = new Cesium.PolygonHierarchy(
      this.param.coordinate.map(p => {
        return Cesium.Cartesian3.fromDegrees(p.x, p.y);
      })
    );

    const material = new Cesium.WaterMaterialProperty({
      normalMap: LayerFactory.WaterNormal,
      blendColor: new Cesium.Color(1.0, 0, 0, 1.0),
      frequency: this.param.frequency,
      animationSpeed: this.param.animationSpeed,
      amplitude: this.param.amplitude,
      specularIntensity: this.param.specularIntensity,
      baseWaterColor: Cesium.Color.fromCssColorString(this.param.color)
    });

    const entity = new Cesium.Entity({
      id: this.id,
      polygon: {
        height: new Cesium.CallbackProperty(() => {
          return me._getNowHeight();
        }, false),
        perPositionHeight: false,
        hierarchy: hierarchy,
        material: material
      }
    });
    return entity;
  }

  /**
   * 根据动画时间获取高度
   * @returns
   */
  _getNowHeight() {
    if (!this.param.analysisDuration) {
      return this.param.analysisBeginHeight;
    }
    return (
      this.param.analysisBeginHeight +
      ((this.param.analysisEndHeight - this.param.analysisBeginHeight) * this.elapsed) / this.param.analysisDuration
    );
  }
}

/* eslint-disable */

class LayerManager {
  constructor(cesiummap) {
    this.cesiummap = cesiummap;
    this.viewer = cesiummap.viewer;

    this.entities = this.viewer.entities;
    this.primitives = this.viewer.scene.primitives;
    this.groundPrimitives = this.viewer.scene.groundPrimitives;

    this.labels = new Cesium.LabelCollection({
      scene: this.viewer.scene
    }); //这里文字标签使用label表示
    this.billboards = new Cesium.BillboardCollection({
      scene: this.viewer.scene
    }); //这里图标使用billboard表示
    this.primitives.add(this.labels);
    this.primitives.add(this.billboards);

    /*{
        type:类型,
        label:文字标签,
        billboard:图标,
        model:模型,
        water:水面,
        outline:边界,
        border:矢量数据,
        batched:是否批量,
        flowField:流场,
        flowFieldOutline:流场边界,
        remove:移除流场流动事件,
        gifImages:gif流场解析出来的图片,
        rectangle:数据范围,
        clippingPlanes:地形裁剪,
        tileset:切片,
        track:轨迹
      }*/
    this.layerDictionary = new Map();

    this.layerVisibility = new Map(); //存储图层可见性

    this.drawHelper = new DrawHelper(this.cesiummap);
    Tool$1.loadGif('/img/loading.gif').then(res => {
      res.forEach(p => {
        LayerFactory.LoadingImages.push(p);
      });
    });

    this.canFlick = false; // 是否能闪烁

    Object.assign(this, LayerParamSetter.prototype);
    Object.assign(this, LayerZoom.prototype);
    Object.assign(this, TilesetHelper.prototype);

    this.clippingHelper = new ClippingHelper(this);

    this.trackHelper = new CzmlTrailHelper(this, 1);
  }

  /**
   * 添加一个图层
   * 若图层check为0，则不初始化地图上数据
   * @param {*} layerParam
   */
  addLayer(layerParam) {
    const me = this;
    let label = undefined,
      billboard = undefined,
      border = undefined,
      model = undefined,
      outline = undefined,
      rectangle = undefined,
      flowField = undefined,
      flowFieldOutline = undefined,
      gifImages = [],
      water = undefined,
      tileset = undefined;

    const parentShow = this.getLayerVisible(layerParam.parentId);
    let isBatch = false;
    let borderBatch = false;
    let result;
    switch (layerParam.type) {
      case LayerType.LabelCollection:
        //文字
        isBatch = layerParam.layerText?.bacthText?.length > 1;
        if (parentShow && layerParam.check) label = LayerFactory.generateLabel(layerParam, this.labels);
        this.layerDictionary.set(layerParam.id, {
          label: label?.label,
          type: layerParam.type,
          batched: isBatch,
          rectangle: label?.rectangle
        });
        break;
      case LayerType.BillboardCollection:
        //标签
        isBatch = layerParam.layerLabel?.bacthLabel?.bacthLabel?.length > 1;
        if (parentShow && layerParam.check) billboard = LayerFactory.generateBillboard(layerParam, this.billboards);
        if (parentShow && layerParam.check && layerParam.isText && layerParam.layerText)
          label = LayerFactory.generateLabel(layerParam, this.labels);
        this.layerDictionary.set(layerParam.id, {
          billboard: billboard?.billboard,
          label: label?.label,
          type: layerParam.type,
          batched: isBatch,
          rectangle: billboard?.rectangle
        });
        break;
      case LayerType.VectorCollection:
        //矢量边界
        /** 注意批量和单个边界区别
         * 批量边界的border存放面primitive数据，outline存放线primitive数据
         * 单个边界的border存放一个entity，同时包含面和线，分别在entity的polygon和polyline属性中
         */
        isBatch = layerParam.layerBorder?.batchCoordinate?.length > 0;
        if (parentShow && layerParam.check) {
          if (isBatch) {
            result = LayerFactory.generateBatchedBorder(
              layerParam,
              layerParam.layerBorder.isGround == 1 ? this.groundPrimitives : this.primitives
            );
            border = result.polygon;
            outline = result.outline;
            rectangle = result.rectangle;
          } else {
            border = LayerFactory.generateBorder(layerParam, this.entities);
          }
        }
        if (parentShow && layerParam.check && layerParam.isText && layerParam.layerText)
          label = LayerFactory.generateLabel(layerParam, this.labels);
        if (parentShow && layerParam.check && layerParam.isLabel && layerParam.layerLabel)
          billboard = LayerFactory.generateBillboard(layerParam, this.billboards);
        this.layerDictionary.set(layerParam.id, {
          border: border,
          billboard: billboard?.billboard,
          label: label?.label,
          type: layerParam.type,
          outline: outline,
          rectangle: rectangle,
          batched: isBatch
        });
        break;
      case LayerType.ModelCollection:
        //模型
        if (parentShow && layerParam.check) {
          model = LayerFactory.generateModelFromUrl(layerParam, parentShow, this.primitives, this.viewer.camera, false);
        }
        if (parentShow && layerParam.check && layerParam.isText && layerParam.layerText)
          label = LayerFactory.generateLabel(layerParam, this.labels);
        if (parentShow && layerParam.check && layerParam.isLabel && layerParam.layerLabel)
          billboard = LayerFactory.generateBillboard(layerParam, this.billboards);
        if (parentShow && layerParam.check && layerParam.isBorder && layerParam.layerBorder) {
          borderBatch = layerParam.layerBorder?.batchCoordinate?.length > 0;
          if (borderBatch) {
            result = LayerFactory.generateBatchedBorder(
              layerParam,
              layerParam.layerBorder.isGround == 1 ? this.groundPrimitives : this.primitives
            );
            border = result.polygon;
            outline = result.outline;
          } else {
            border = LayerFactory.generateBorder(layerParam, this.entities);
          }
        }
        this.layerDictionary.set(layerParam.id, {
          model: model,
          border: border,
          billboard: billboard?.billboard,
          label: label?.label,
          type: layerParam.type,
          outline: outline
        });
        break;
      case LayerType.WaterCollection:
        //水面
        isBatch = layerParam.layerWaterSurface?.batchCoordinate?.length > 0;
        if (parentShow && layerParam.check) {
          result = LayerFactory.generateWater(
            layerParam,
            layerParam.layerWaterSurface?.isGround == 1 ? this.groundPrimitives : this.primitives
          );
          water = result.water;
          outline = result.outline;
        }
        if (parentShow && layerParam.check && layerParam.isText && layerParam.layerText)
          label = LayerFactory.generateLabel(layerParam, this.labels);
        if (parentShow && layerParam.check && layerParam.isLabel && layerParam.layerLabel)
          billboard = LayerFactory.generateBillboard(layerParam, this.billboards);
        this.layerDictionary.set(layerParam.id, {
          type: layerParam.type,
          water: water,
          billboard: billboard?.billboard,
          label: label?.label,
          outline: outline,
          batched: isBatch
        });
        break;
      case LayerType.FlowFieldCollection:
        //流场
        this.layerDictionary.set(layerParam.id, {
          flowField: flowField,
          border: border,
          billboard: billboard?.billboard,
          label: label?.label,
          type: layerParam.type,
          remove: undefined,
          flowFieldOutline: flowFieldOutline,
          gifImages: gifImages,
          outline: outline
        });
        if (parentShow && layerParam.check) {
          if (layerParam.layerFlow?.flowType == 0) {
            // 将gif解析出来的帧存下来，更改流场参数后不需要再次解析
            const getOrSetGifImages = res => {
              if (res) {
                gifImages.length = 0;
                res.forEach(p => {
                  gifImages.push(p);
                });
              }
              return gifImages;
            };
            result = LayerFactory.generateFlowField(
              layerParam,
              layerParam.layerFlow.isGround == 1 ? this.groundPrimitives : this.primitives,
              this.entities,
              this.viewer.scene.preRender,
              true,
              true,
              getOrSetGifImages
            );
            flowField = result.flowField;
            flowFieldOutline = result.outline;
          }
        }
        if (parentShow && layerParam.check && layerParam.isText && layerParam.layerText)
          label = LayerFactory.generateLabel(layerParam, this.labels);
        if (parentShow && layerParam.check && layerParam.isLabel && layerParam.layerLabel)
          billboard = LayerFactory.generateBillboard(layerParam, this.billboards);
        if (parentShow && layerParam.check && layerParam.isBorder && layerParam.layerBorder) {
          borderBatch = layerParam.layerBorder?.batchCoordinate?.length > 0;
          if (borderBatch) {
            result = LayerFactory.generateBatchedBorder(
              layerParam,
              layerParam.layerBorder.isGround == 1 ? this.groundPrimitives : this.primitives
            );
            border = result.polygon;
            outline = result.outline;
          } else {
            border = LayerFactory.generateBorder(layerParam, this.entities);
          }
        }

        const obj = this.layerDictionary.get(layerParam.id);
        Object.assign(obj, {
          flowField: flowField,
          border: border,
          billboard: billboard?.billboard,
          label: label?.label,
          type: layerParam.type,
          remove: result ? result.remove : undefined,
          flowFieldOutline: flowFieldOutline,
          gifImages: gifImages,
          outline: outline
        });

        break;
      case LayerType.TerrainClippingCollection:
        // 地形裁剪
        isBatch = false;
        if (parentShow && layerParam.check) {
          result = this.clippingHelper.addClippingPlaneCollection(layerParam);
        }
        if (parentShow && layerParam.check && layerParam.isText && layerParam.layerText)
          label = LayerFactory.generateLabel(layerParam, this.labels);
        if (parentShow && layerParam.check && layerParam.isLabel && layerParam.layerLabel)
          billboard = LayerFactory.generateBillboard(layerParam, this.billboards);
        this.layerDictionary.set(layerParam.id, {
          clippingPlanes: result?.collection,
          billboard: billboard?.billboard,
          label: label?.label,
          type: layerParam.type,
          border: result?.border,
          batched: isBatch,
          rectangle: result?.rectangle
        });
        break;
      case LayerType.TilesetCollection:
        if (parentShow && layerParam.check) {
          const color = Cesium.Color.fromCssColorString(layerParam.layerTile?.color || 'white');
          tileset = LayerFactory.generate3DTileset(
            layerParam,
            this.primitives,
            this.viewer.scene,
            (feature, result) => {
              return me._setTileLayerColor(layerParam.name, feature, result, color);
            }
          );
        }
        if (parentShow && layerParam.check && layerParam.isText && layerParam.layerText)
          label = LayerFactory.generateLabel(layerParam, this.labels);
        if (parentShow && layerParam.check && layerParam.isLabel && layerParam.layerLabel)
          billboard = LayerFactory.generateBillboard(layerParam, this.billboards);
        if (parentShow && layerParam.check && layerParam.isBorder && layerParam.layerBorder) {
          borderBatch = layerParam.layerBorder?.batchCoordinate?.length > 0;
          if (borderBatch) {
            result = LayerFactory.generateBatchedBorder(
              layerParam,
              layerParam.layerBorder.isGround == 1 ? this.groundPrimitives : this.primitives
            );
            border = result.polygon;
            outline = result.outline;
          } else {
            border = LayerFactory.generateBorder(layerParam, this.entities);
          }
        }
        this.layerDictionary.set(layerParam.id, {
          tileset: tileset,
          type: layerParam.type,
          border: border,
          billboard: billboard?.billboard,
          label: label?.label,
          outline: outline
        });

        break;
      case LayerType.TrackCollection:
        if (parentShow && layerParam.check) {
          this.trackHelper.generateTrack(layerParam);
        }
        break;
      case LayerType.TerrainEdittingCollection:
        if (this.viewer.terrainProvider instanceof Cesium.TerrainProvider) {
          LayerFactory.generateTerrainModifyTin(layerParam.layerTerrainEditting, this.viewer);
        } else {
          console.warn('地形修改数据被忽略');
        }
        break;
    }
  }
  /**
   * 在图层中添加文字
   * @param {*} layerParam
   */
  addLabelToLayer(layerParam) {
    const parentShow = this.getLayerVisible(layerParam.parentId);
    if (layerParam.type == LayerType.TrackCollection) {
      this.trackHelper.addLabel(layerParam, parentShow);
    } else {
      const layer = this.layerDictionary.get(layerParam.id);
      const label = LayerFactory.generateLabel(layerParam, this.labels, parentShow);
      layer.label = label.label;
    }
  }
  /**
   * 在图层中添加图标
   * @param {*} layerParam
   */
  addBillboardToLayer(layerParam) {
    const parentShow = this.getLayerVisible(layerParam.parentId);
    if (layerParam.type == LayerType.TrackCollection) {
      this.trackHelper.addBillboard(layerParam, parentShow);
    } else {
      const layer = this.layerDictionary.get(layerParam.id);
      const billboard = LayerFactory.generateBillboard(
        layerParam,
        this.billboards,
        this.getLayerVisible(layerParam.parentId)
      );
      layer.billboard = billboard.billboard;
    }
  }
  /**
   * 在图层中添加边界
   * @param {*} layerParam
   */
  addVectorToLayer(layerParam) {
    const layer = this.layerDictionary.get(layerParam.id);
    const border = LayerFactory.generateBorder(layerParam, this.entities, this.getLayerVisible(layerParam.parentId));
    layer.border = border;
  }
  /**
   * 在已有图层中添加模型
   * @param {*} layerParam
   * @param {*} file
   */
  addModelToLayer(layerParam, file = null, ifZoom = true, success = () => {}) {
    const me = this;
    const parentShow = this.getLayerVisible(layerParam.parentId);
    if (layerParam.type == LayerType.TrackCollection) {
      this.trackHelper.addModel(layerParam, parentShow, file);
    } else {
      const layer = this.layerDictionary.get(layerParam.id);
      this.primitives.remove(layer.model);
      layer.model = undefined;
      if (file)
        LayerFactory.generateModelLocal(
          layerParam,
          parentShow,
          file,
          this.viewer.camera,
          ifZoom,
          model => {
            layer.model = me.primitives.add(model);
          },
          success
        );
      else {
        LayerFactory.generateModelFromUrl(
          layerParam,
          parentShow,
          this.primitives,
          this.viewer.camera,
          ifZoom,
          model => {
            layer.model = model;
          }
        );
      }
    }
  }
  /**
   * 通过gltf文件添加模型图层，在批量操作中使用
   */
  addModelLayer(layerParam, gltf, ifZoom = false) {
    const me = this;
    const parentShow = this.getLayerVisible(layerParam.parentId);

    LayerFactory.generateModelLocal(layerParam, parentShow, gltf, this.viewer.camera, ifZoom, model => {
      me.primitives.add(model);
      me.layerDictionary.set(layerParam.id, {
        model: model,
        type: LayerFactory.ModelCollection
      });
    });
  }
  /**
   * 移除图层
   * @param {*} layerParam
   */
  removeLayer(layerParam) {
    const me = this;
    if (layerParam.type == LayerType.LayerGroupCollection) {
      this.layerVisibility.delete(layerParam.id);
      layerParam.children.forEach(child => {
        me.removeLayer(child);
      });
    } else {
      this._removeSingleLayer(layerParam.id);
    }
  }
  /**
   * 设置图层是否显示
   * @param {*} layerParam
   */
  showLayer(layerParam, parentShow = undefined) {
    const me = this;
    if (parentShow == undefined) parentShow = this.getLayerVisible(layerParam.parentId);
    if (layerParam.type == LayerType.LayerGroupCollection) {
      this.setLayerVisibility(layerParam.id, layerParam.check && parentShow);
      layerParam.children.forEach(child => {
        me.showLayer(child, layerParam.check && parentShow);
      });
    } else {
      this._showSingleLayer(layerParam);
    }
  }
  /**
   * 播放单个联动
   * @param {*} itemType
   * @param {*} params
   */
  playSingleLinkage(itemType, params) {
    const me = this;
    if (itemType == LayerType.TrackCollection) {
      // 轨迹图层，把时钟调整至轨迹时间
      this.trackHelper.zoomToClock(params.layerId);
    }
    if (itemType == LayerType.WaterCollection && params.floodAnalysisCheck) {
      this.playWaterFloodAnalysis(params); // 播放淹没
    }

    if (params && params.count != 0) {
      setTimeout(() => {
        me.flickerItem({
          layerid: params.layerId,
          itemType: itemType,
          params: params
        });
      }, params.flashStart * 1000);
    }
  }
  /**
   * 播放图层联动
   * @param {*} layerData
   */
  playLayerLinkage(layerData) {
    if (!layerData.check) return;
    if (layerData.type == LayerType.LabelCollection || layerData.isText) {
      this.playSingleLinkage(LayerType.LabelCollection, layerData.layerText);
    }
    if (layerData.type == LayerType.BillboardCollection || layerData.isLabel) {
      this.playSingleLinkage(LayerType.BillboardCollection, layerData.layerLabel);
    }
    if (layerData.type == LayerType.VectorCollection || layerData.isBorder) {
      this.playSingleLinkage(LayerType.VectorCollection, layerData.layerBorder);
    }
    if (layerData.type == LayerType.ModelCollection) {
      this.playSingleLinkage(LayerType.ModelCollection, layerData.layerModel);
    }
    if (layerData.type == LayerType.WaterCollection) {
      this.playSingleLinkage(LayerType.WaterCollection, layerData.layerWaterSurface);
    }
    if (layerData.type == LayerType.FlowFieldCollection) {
      this.playSingleLinkage(LayerType.FlowFieldCollection, layerData.layerFlow);
    }
    if (layerData.type == LayerType.TilesetCollection) {
      this.playSingleLinkage(LayerType.TilesetCollection, layerData.layerTile);
    }
    if (layerData.type == LayerType.TrackCollection) {
      this.playSingleLinkage(LayerType.TrackCollection, layerData.layerTrack);
    }
  }
  /**
   * 闪烁物体
   * @param {*} param0
   */
  flickerItem({ layerid, itemType, params, success = () => {} }) {
    const layer = this.layerDictionary.get(layerid);
    const me = this;
    const interval = (params.duration * 1000) / params.count;
    let count = 0;
    if (layer && this.canFlick) {
      const flicker = () => {
        if (count < params.count) {
          me._showItem(itemType, layer, !params.isLight, params);
          setTimeout(() => {
            me._showItem(itemType, layer, params.isLight ? true : false, params);
            count++;
            if (me.canFlick) {
              setTimeout(() => {
                flicker();
              }, interval / 2);
            }
          }, interval / 2);
        } else {
          // me.silhouette.enabled = false;
          success();
        }
      };
      flicker();
    }
  }
  /**
   * 播放淹没
   * @param {*} layerId
   */
  playWaterFloodAnalysis(params, onEnd = () => {}) {
    const water = this.layerDictionary.get(params.layerId)?.water;
    const oldVisibility = water.show;
    water.show = false;

    return new FloodAnalysis(params, this.viewer, () => {
      water.show = oldVisibility;
      onEnd();
    });
  }
  /**
   * 停止飞行与联动
   */
  stopFlyAndLinkage() {
    this.viewer.camera.cancelFlight();
    this.canFlick = false;
  }
  /**
   * 设置图层可见性
   */
  setLayerVisibility(layerid, visible) {
    this.layerVisibility.set(layerid, visible);
  }
  /**
   * 获取图层可见性
   * @param {*} layerid
   */
  getLayerVisible(layerid) {
    const visible = this.layerVisibility.get(layerid);
    if (visible == undefined) return true;
    return visible;
  }
  /**
   * 获取编辑位置物体
   * @param {*} layerid
   * @param {*} type
   */
  getTransformItem(layerid, type) {
    const layer = this.layerDictionary.get(layerid);
    if (layer) {
      switch (type) {
        case LayerType.BillboardCollection:
          return layer.billboard;
        case LayerType.LabelCollection:
          return layer.label;
        case LayerType.ModelCollection:
          return layer.model;
        case LayerType.TilesetCollection:
          layer.tileset._root.modelMatrix = layer.tileset._root.transform;
          return layer.tileset._root;
        default:
          return undefined;
      }
    }
    return undefined;
  }
  /**
   * 控制物体显示隐藏
   * @param {*} itemType
   * @param {*} layer
   * @param {*} ifShow
   */
  _showItem(itemType, layer, ifShow, params) {
    if (layer.type == LayerType.TrackCollection) {
      const entity = layer.track;
      if (entity) {
        switch (itemType) {
          case LayerType.LabelCollection:
            if (entity.label) entity.label.show = ifShow;
            break;
          case LayerType.BillboardCollection:
            if (entity.billboard) entity.billboard.show = ifShow;
            break;
          case LayerType.ModelCollection:
            if (entity.model) entity.model.show = ifShow;
            break;
          case LayerType.TrackCollection:
            if (params.isTrail) {
              if (entity.path) entity.path.show = ifShow;
            } else {
              if (entity.polyline) entity.polyline.show = ifShow;
            }
            break;
        }
      }
    } else {
      switch (itemType) {
        case LayerType.LabelCollection:
          if (layer.label) {
            if (Array.isArray(layer.label)) {
              layer.label.forEach(p => {
                p.show = ifShow;
              });
            } else layer.label.show = ifShow;
          }
          break;
        case LayerType.BillboardCollection:
          if (layer.billboard) {
            if (Array.isArray(layer.billboard)) {
              layer.billboard.forEach(p => {
                p.show = ifShow;
              });
            } else layer.billboard.show = ifShow;
          }
          break;
        case LayerType.VectorCollection:
          if (layer.border) layer.border.show = ifShow;
          if (layer.outline) layer.outline.show = ifShow;
          break;
        case LayerType.ModelCollection:
          if (layer.model) layer.model.show = ifShow;
          break;
        case LayerType.WaterCollection:
          if (layer.water) layer.water.show = ifShow;
          if (layer.outline) layer.outline.show = ifShow;
          break;
        case LayerType.FlowFieldCollection:
          if (layer.flowField) layer.flowField.show = ifShow;
          if (layer.flowFieldOutline) layer.flowFieldOutline.show = ifShow;
          break;
        case LayerType.TilesetCollection:
          if (layer.tileset) layer.tileset.show = ifShow;
          break;
      }
    }
  }
  /**
   * 移除一个图层
   * @param {*} layerid
   */
  _removeSingleLayer(layerid) {
    let layer = this.layerDictionary.get(layerid);
    if (layer) {
      const destroy = p => {
        if (typeof p.isDestroyed === 'function') {
          if (!p.isDestroyed()) {
            p.destroy();
          }
        }
      };

      if (layer.model) {
        this.primitives.remove(layer.model);
        destroy(layer.model);
      }
      layer.model = undefined;

      if (layer.label) {
        if (Array.isArray(layer.label)) {
          layer.label.forEach(p => {
            this.labels.remove(p);
          });
        } else {
          this.labels.remove(layer.label);
        }
      }
      layer.label = undefined;

      if (layer.billboard) {
        if (Array.isArray(layer.billboard)) {
          layer.billboard.forEach(p => {
            this.billboards.remove(p);
          });
        } else {
          this.billboards.remove(layer.billboard);
        }
      }
      layer.billboard = undefined;

      if (layer.border) {
        this.primitives.remove(layer.border);
        this.groundPrimitives.remove(layer.border);
        this.entities.remove(layer.border);
        destroy(layer.border);
      }
      layer.border = undefined;

      if (layer.outline) {
        this.primitives.remove(layer.outline);
        this.groundPrimitives.remove(layer.outline);
        this.entities.remove(layer.outline);
        destroy(layer.outline);
      }
      layer.outline = undefined;

      if (layer.flowFieldOutline) {
        this.entities.remove(layer.flowFieldOutline);
        destroy(layer.flowFieldOutline);
      }
      layer.flowFieldOutline = undefined;

      if (layer.water) {
        this.primitives.remove(layer.water);
        this.groundPrimitives.remove(layer.water);
        destroy(layer.water);
      }
      layer.water = undefined;

      if (layer.flowField) {
        this.primitives.remove(layer.flowField);
        this.groundPrimitives.remove(layer.flowField);
        this.entities.remove(layer.outline);
        destroy(layer.flowField);
        if (typeof layer.remove == 'function') layer.remove();
        layer.gifImages.length = 0;
        layer.gifImages = undefined;
      }
      layer.flowField = undefined;

      if (layer.clippingPlanes) {
        this.clippingHelper.removeClippingPlaneCollection(layer.clippingPlanes);
      }
      layer.clippingPlanes = undefined;

      if (layer.tileset) {
        this.primitives.remove(layer.tileset);
        destroy(layer.tileset);
      }
      layer.tileset = undefined;

      if (layer.type === LayerType.TrackCollection) {
        this.trackHelper.removeTrack(layerid);
        layer.track = undefined;
      }

      this.layerDictionary.delete(layerid);
      layer = undefined;
    }
  }
  /**
   * 设置单个图层是否显示
   * @param {*} layerParam
   */
  _showSingleLayer(layerParam) {
    const layer = this.layerDictionary.get(layerParam.id);
    let result;
    let parentShow = this.getLayerVisible(layerParam.parentId);
    if (layer) {
      if (!parentShow || !layerParam.check) {
        // 整体隐藏
        for (let name in layer) {
          if (name != 'gifImages' && Array.isArray(layer[name])) {
            layer[name].forEach(p => {
              p.show = false;
            });
          } else if (name === 'clippingPlanes') {
            // 地形裁剪目前只能直接移除
            this.clippingHelper.removeClippingPlaneCollection(layer.clippingPlanes);
            layer.clippingPlanes = undefined;
          } else if (typeof layer[name] == 'object' && layer[name]) {
            layer[name].show = false;
          }
        }
      } else {
        // 可见，判断包含物是否可见
        // 文字
        if ((layer.type == LayerType.LabelCollection || layerParam.isText) && !layer.label) {
          const label = LayerFactory.generateLabel(layerParam, this.labels);
          layer.label = label.label;
          if (layer.type == LayerType.LabelCollection) {
            // 生成矩形用于定位
            layer.rectangle = label.rectangle;
          }
        } else if ((layer.type == LayerType.LabelCollection || layerParam.isText) && layer.label) {
          if (Array.isArray(layer.label)) {
            layer.label.forEach(p => {
              p.show = layerParam.layerText.isLight == 1;
            });
          } else layer.label.show = layerParam.layerText.isLight == 1;
        } else if (layer.label) {
          if (Array.isArray(layer.label)) {
            layer.label.forEach(p => {
              p.show = false;
            });
          } else layer.label.show = false;
        }
        // 标签
        if ((layer.type == LayerType.BillboardCollection || layerParam.isLabel) && !layer.billboard) {
          const billboard = LayerFactory.generateBillboard(layerParam, this.billboards);
          layer.billboard = billboard.billboard;
          if (layer.type == LayerType.BillboardCollection) {
            layer.rectangle = billboard.rectangle;
          }
        } else if ((layer.type == LayerType.BillboardCollection || layerParam.isLabel) && layer.billboard) {
          if (Array.isArray(layer.billboard)) {
            layer.billboard.forEach(p => {
              p.show = layerParam.layerLabel.isLight == 1;
            });
          } else layer.billboard.show = layerParam.layerLabel.isLight == 1;
        } else if (layer.billboard) {
          if (Array.isArray(layer.billboard)) {
            layer.billboard.forEach(p => {
              p.show = false;
            });
          } else layer.billboard.show = false;
        }
        // 边界
        const batchBorder = layerParam.layerBorder?.batchCoordinate?.length > 0;
        if ((layer.type == LayerType.VectorCollection || layerParam.isBorder) && !layer.border && !batchBorder) {
          layer.border = LayerFactory.generateBorder(layerParam, this.entities);
        } else if ((layer.type == LayerType.VectorCollection || layerParam.isBorder) && layer.border && !batchBorder) {
          layer.border.show = layerParam.layerBorder.isLight == 1;
        } else if (layer.border && !batchBorder) {
          layer.border.show = false;
        }
        // 批量边界，用边界outline判断几何是否已初始化
        if ((layer.type == LayerType.VectorCollection || layerParam.isBorder) && !layer.outline && batchBorder) {
          result = LayerFactory.generateBatchedBorder(
            layerParam,
            layerParam.layerBorder.isGround == 1 ? this.groundPrimitives : this.primitives
          );
          layer.border = result.polygon;
          layer.outline = result.outline;
          layer.rectangle = result.rectangle;
        } else if ((layer.type == LayerType.VectorCollection || layerParam.isBorder) && layer.outline && batchBorder) {
          if (layer.border) layer.border.show = layerParam.layerBorder.isLight == 1;
          layer.outline.show = layerParam.layerBorder.isLight == 1;
        } else if (layer.outline && batchBorder) {
          if (layer.border) layer.border.show = false;
          layer.outline.show = false;
        }
        // 模型
        if (layer.type == LayerType.ModelCollection && !layer.model) {
          this.addModelToLayer(layerParam, null, false);
        } else if (layer.type == LayerType.ModelCollection && layer.model) {
          layer.model.show = layerParam.layerModel.isLight == 1;
        } else if (layer.model) {
          layer.model.show = false;
        }
        // 水面
        if (layer.type == LayerType.WaterCollection && !layer.water) {
          result = LayerFactory.generateWater(
            layerParam,
            layerParam.layerWaterSurface?.isGround == 1 ? this.groundPrimitives : this.primitives
          );
          layer.water = result.water;
          layer.outline = result.outline;
        } else if (layer.type == LayerType.WaterCollection && layer.water) {
          layer.water.show = layerParam.layerWaterSurface.isLight == 1;
          if (layer.outline) layer.outline.show = layer.water.show;
        } else if (layer.water) {
          layer.water.show = false;
          if (layer.outline) layer.outline.show = false;
        }
        // 流场
        if (layer.type == LayerType.FlowFieldCollection && !layer.flowField) {
          if (layerParam.layerFlow.flowType == 0) {
            const gifImages = [];
            const getOrSetGifImages = res => {
              if (res) {
                gifImages.length = 0;
                res.forEach(p => {
                  gifImages.push(p);
                });
              }
              return gifImages;
            };
            result = LayerFactory.generateFlowField(
              layerParam,
              layerParam.layerFlow.isGround == 1 ? this.groundPrimitives : this.primitives,
              this.entities,
              this.viewer.scene.preRender,
              true,
              true,
              getOrSetGifImages
            );
            layer.flowField = result.flowField;
            layer.flowFieldOutline = result.outline;
            layer.gifImages = gifImages;
          }
        } else if (layer.type == LayerType.FlowFieldCollection && layer.flowField) {
          layer.flowField.show = layerParam.layerFlow.isLight == 1;
          if (layer.flowFieldOutline) layer.flowFieldOutline.show = layerParam.layerFlow.isLight == 1;
        } else if (layer.flowField) {
          layer.flowField.show = false;
          if (layer.outline) layer.outline.show = false;
        }
        // 三维切片
        if (layer.type == LayerType.TilesetCollection && !layer.tileset) {
          this.reloadTileset(layerParam);
        } else if (layer.type == LayerType.TilesetCollection && layer.tileset) {
          layer.tileset.show = layerParam.layerTile.isLight == 1;
        } else if (layer.tileset) {
          layer.tileset.show = false;
        }
        // 轨迹
        if (layer.type == LayerType.TrackCollection) {
          this.trackHelper.showTrackLayer(layerParam);
        }
        // 地形裁剪
        if (layer.type == LayerType.TerrainClippingCollection && !layer.clippingPlanes) {
          const result = this.clippingHelper.addClippingPlaneCollection(layerParam, layer.rectangle === undefined);
          layer.clippingPlanes = result.collection;
          if (!layer.rectangle) {
            delete result.collection;
            Object.assign(layer, result);
          }
        }
      }
    }
  }
  /**
   * 设置tiles颜色
   */
  _setTileLayerColor(layerName, feature, result, color = Cesium.Color.WHITE) {
    if (
      this.cesiummap.tool.selectedTile &&
      feature &&
      feature.getProperty('name') === this.cesiummap.tool.selectedTile.getProperty('name')
    )
      return Cesium.Color.clone(new Cesium.Color(0.5, 0, 0, 0.9), result);
    return Cesium.Color.clone(color, result);
  }
  destroy() {
    this.viewer.scene.primitives.remove(this.labels);
    this.viewer.scene.primitives.remove(this.billboards);

    this.cesiummap.layerManager = undefined;

    this.drawHelper.destroy();
    this.drawHelper = undefined;

    this.cesiummap = undefined;
    this.viewer = undefined;
    this.labels = undefined;
    this.entities = undefined;
    this.primitives = undefined;
    this.layerDictionary.clear();
    this.layerDictionary = undefined;
  }
}

/* eslint-disable */

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MjM4NGQ4Yi05MjAzLTQ3NzMtOTZmYS05ZDE1ZWZhYTk3OWMiLCJpZCI6MTEzNTYsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTg2ODcwMDJ9.I0-TpqepRcWIVUUI8KrhoSZp-a70sRSRveNLBXOwOto';

// 相机范围调整到中国
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(85, -20.0, 130, 90.0);

class CesiumMap {
  constructor({
    domId,
    depthId,
    flowFile,
    viewManageing = false,
    loadSuccess = () => { },
    flowFieldLoaded = () => { },
    setFlowFieldTime = () => { },
    whenMapDblClick = () => { },
    whenMapObjectClick = () => { },
    pickMode = 'scene',
    indexDb,
    changeViewerOptsFunc = () => { }
  }) {
    const me = this;

    window._cesiummap = this;
    this.indexDb = indexDb;

    Cesium.GeoJsonDataSource.clampToGround = true; //贴地
    this.staticItemsLayerList = {}; //静态图层
    this.highlightLayerList = {}; //需要高亮的图层
    this.depthId = depthId;
    this.waterSurface = null; //水面，可以是集合
    this.triggerMoveEnd = false;
    this.whenMapDblClick = whenMapDblClick;
    this.whenMapObjectClick = whenMapObjectClick;
    this.pickMode = pickMode;

    const options = {
      nearGroundSkyBoxShowHeight: Cesium.defined(P.skyBoxParams.skyBoxHeight) ? P.skyBoxParams.skyBoxHeight : 5000,
      contextOptions: {
        webgl: {
          preserveDrawingBuffer: viewManageing
        }
      },
      infoBox: false,
      selectionIndicator: false,
      timeline: false,
      animation: false,
      sceneModePicker: false,
      fullscreenButton: false,
      homeButton: false,
      geocoder: false,
      selectionIndicator: false,
      navigationInstructionsInitiallyVisible: false,
      navigationHelpButton: false,
      baseLayerPicker: false,
      shouldAnimate: true
    };
    // 天空盒
    const skybox = Tool$1.generateSkybox(P.defaultSkyBox);
    if (skybox) options.nearGroundSkyBox = skybox;

    //地形
    options.terrainProvider = this.setTerrain(P.terrain);

    changeViewerOptsFunc(options);
    this.viewer = new Cesium.Viewer(domId, options);

    // 底图
    this.setBasemap(P.basemapParams, true);

    const viewer = this.viewer;
    const globe = viewer.scene.globe;
    viewer.cesiumWidget.creditContainer.style.display = 'none';
    // viewer.scene.logarithmicDepthBuffer = false;
    globe.depthTestAgainstTerrain = true;
    globe.baseColor = new Cesium.Color(0.5, 0.5, 0.5, 1.0);
    globe.undergroundColor = Cesium.Color.fromCssColorString('rgb(61, 53, 51)');
    // globe.undergroundColorAlphaByDistance.nearValue = 0;
    globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(0, 0, 30, 1);
    // globe.translucency.backFaceAlphaByDistance = new Cesium.NearFarScalar(0, 0, 50, 1);

    viewer.scene.backgroundColor = Cesium.Color.fromCssColorString('#7d9cd6');

    // viewer.scene.screenSpaceCameraController.minimumZoomDistance = 5;
    viewer.scene.fog.enabled = false;
    viewer.scene.moon.show = P.skyBoxParams.moon;
    viewer.scene.sun.show = P.skyBoxParams.sun;

    this.translucencyEnabled = false;

    this.evtHelper = new CesiumEvtHelper(this);
    this.tool = new Tool$1(this);
    this.trailHelper = new CzmlTrailHelper(this, 1);
    this.layerManager = new LayerManager(this);
    this.viewHelper = new ViewHelper(this);    

    this.positionPickingEnabled = false; //位置拾取是否开启
    this.positionPickingCallback = () => { }; //位置拾取回调
    this.pickingPointer = this.viewer.entities.add({
      name: 'picking-modifypos-pointer',
      position: new Cesium.CallbackProperty(() => {
        return me.pickingPointerPos;
      }, false),
      point: {
        pixelSize: 5,
        color: Cesium.Color.fromAlpha(Cesium.Color.BLUE, 0.5),
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY
      },
      clampToGround: false,
      show: false
    });
    this.pickingPointerPos = new Cesium.Cartesian3();

    this.tool.setFlowFieldTime = setFlowFieldTime;
    if (flowFile) this.tool.addFlowField(flowFile, flowFieldLoaded);

    this.viewer.camera.flyTo(P.defaultView);

    setTimeout(() => {
      loadSuccess();
    }, 500);
    this.CesiumPopup = CesiumPopup;
  }
  /**
   * 加载3dtiles
   * @param {*} name
   * @param {*} height
   */
  load3DTiles(url, deltax = 0, deltay = 0, deltah = 0) {
    this.realModel = this.viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
        url: url,
        dynamicScreenSpaceError: true,
        preloadWhenHidden: true,
        preferLeaves: true,
        maximumMemoryUsage: 1024,
        skipLevelOfDetail: true
      })
    );
    let tileset = this.realModel;
    this.realModel.readyPromise.then(() => {
      //改变高度
      let cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
      let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
      let offset = Cesium.Cartesian3.fromRadians(
        cartographic.longitude + deltax,
        cartographic.latitude + deltay,
        deltah
      );
      let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
      tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
      this.viewer.zoomTo(tileset);
    });
  }
  /**
   * 获取相机视角参数
   */
  getCameraView() {
    let viewer = this.viewer;
    let cameraCart = viewer.camera.positionCartographic;
    if (Cesium.defined(viewer.camera.roll))
      return {
        lon: Math.round(Cesium.Math.toDegrees(cameraCart.longitude) * 10e5) / 10e5,
        lat: Math.round(Cesium.Math.toDegrees(cameraCart.latitude) * 10e5) / 10e5,
        alt: Math.round(cameraCart.height * 10) / 10,
        heading: Math.round(Cesium.Math.toDegrees(viewer.camera.heading) * 10) / 10,
        pitch: Math.round(Cesium.Math.toDegrees(viewer.camera.pitch) * 10) / 10,
        roll: Math.round(Cesium.Math.toDegrees(viewer.camera.roll) * 10) / 10
      };
  }
  /**
   * 获取屏幕中点坐标
   */
  getWindowCenterPosition() {
    let height = getComputedStyle(this.viewer.container).height;
    let width = getComputedStyle(this.viewer.container).width;

    height = Number(height.slice(0, -2)) / 2;
    width = Number(width.slice(0, -2)) / 2;
    let cartesian = undefined,
      count = 0;
    cartesian = this.viewer.scene.pickPosition(new Cesium.Cartesian2(width, height));
    while (!cartesian && count < 10) {
      height *= 1.5;
      count++;
      cartesian = this.viewer.scene.pickPosition(new Cesium.Cartesian2(width, height));
    }
    if (!cartesian) {
      cartesian = P.defaultView.destination;
    }
    let carto = Cesium.Cartographic.fromCartesian(cartesian);
    let alt = this.viewer.scene.globe.getHeight(carto);

    return {
      lon: Math.round(Cesium.Math.toDegrees(carto.longitude) * 10e5) / 10e5,
      lat: Math.round(Cesium.Math.toDegrees(carto.latitude) * 10e5) / 10e5,
      alt: Math.round(alt * 10) / 10
    };
  }
  /**
   * 缩放至点
   * @param {*} center
   */
  zoomTo(center, duration = 0, success = () => { }) {
    let opts = Tool$1.getCameraFlyToDegrees(center);
    opts.duration = duration;
    // this.viewer.camera.flyTo(opts);
    ViewHelper.flyToView(this.viewer, opts, false, success);
  }
  /**
   * 设置天空盒
   */
  setGroundSkybox(pictures) {
    this.viewer.scene.nearGroundSkyBox = Tool$1.generateSkybox(pictures);
  }
  /**
   * 设置天空盒参数
   * @param {*} params
   */
  setSkyboxParams(params) {
    if (this.viewer) {
      this.viewer.scene.sun.show = params.sun ? true : false;
      this.viewer.scene.moon.show = params.moon ? true : false;
      this.viewer.scene.nearGroundSkyBoxShowHeight = params.height;
      if (params.lightStrength !== this.viewer.scene.light.intensity) {
        this.viewer.scene.light.intensity = params.lightStrength;
        // 修改modelinstancecollection光照强度
        this.layerManager.setModelInstanceCollectionLuminance(params.lightStrength);
      }
    }
  }
  /**
   * 设置底图将重新生成底图
   */
  setBasemap(mapConfig, removeAll = false) {
    const collection = this.viewer.imageryLayers;

    // 移除之前的底图
    let layer = collection.get(0);
    while (layer && (layer.isBasemap || removeAll)) {
      collection.remove(layer);
      layer = collection.get(0);
    }

    const addmap = config => {
      const provider = Tool$1.generateBasemap(config);
      const layer = this.viewer.imageryLayers.addImageryProvider(provider, 0);
      layer.isBasemap = true;
    };

    if (Array.isArray(mapConfig)) {
      mapConfig.forEach((p, i) => {
        addmap(p);
      });
    } else {
      addmap(mapConfig);
    }

    this.setBasemapParams(mapConfig);

    P.basemapParams = mapConfig;
  }
  /**
   * 设置底图参数
   * @param {*} params
   */
  setBasemapParams(params) {
    const first = Array.isArray(params) ? params[0] : params;

    if (Cesium.defined(first.brightness) && this.viewer) {
      for (let i = 0; i < this.viewer.imageryLayers.length; i += 1) {
        const layer = this.viewer.imageryLayers.get(0);
        if (layer.isBasemap) {
          layer.hue = first.tone;
          layer.saturation = first.saturation;
          layer.brightness = first.brightness;
          // layer.gamma = first.gamma;
          layer.alpha = first.transparency;
          layer.contrast = first.contrast;
        }
      }

      this.setUnderground(first);

      P.basemapParams = params;
    }
  }
  /**
   * 设置是否下地
   * @param {*} params
   */
  setUnderground(params) {
    const scene = this.viewer.scene;
    const isUnderground = params.isUnderground ? true : false;
    this.translucencyEnabled = isUnderground;
    scene.globe.translucency.enabled = isUnderground;
    // scene.pickTranslucentDepth = isUnderground;
    scene.screenSpaceCameraController.enableCollisionDetection = !isUnderground; // 相机是否下地
  }
  /**
   * 设置地形
   * @param {*} params
   */
  setTerrain(params) {
    let terrainProvider;
    if (params === 'cesium') {
      terrainProvider = Cesium.createWorldTerrain();
      // terrainProvider = new Cesium.CesiumTerrainProvider({
      //   url: 'https://t3.tianditu.gov.cn/mapservice/swdx?T=elv_c&tk=16db5f2b05abef1bc22c88924a318eb0'
      // });
    } else if (params) {
      terrainProvider = new Cesium.CesiumTerrainProvider({
        url: params
      });
    } else terrainProvider = new Cesium.EllipsoidTerrainProvider();

    // terrainProvider.errorEvent.addEventListener(error => {
    //   console.error('地形加载出错，自动切换地形', error);
    //   me.setTerrain('');
    // }, this);

    if (this.viewer) this.viewer.terrainProvider = terrainProvider;
    else return terrainProvider;
  }
  /**
   * 面北
   */
  faceNorth(duration = 0) {
    const camera = this.viewer.camera;
    camera.flyTo({
      destination: camera.position,
      orientation: {
        heading: 0,
        pitch: camera.pitch,
        roll: camera.roll
      },
      duration: duration
    });
  }
  /**
   * 地理坐标获取高
   * @param {*} positions
   * @returns
   */
  getHeight(positions, excluded = []) {
    return this.viewer.scene.sampleHeightMostDetailed(positions, excluded);
  }
  /**
   * 获取鼠标点位置
   * @param {*} pos
   */
  getPickPosition(pos, exclude = undefined) {
    let cartesian;
    const viewer = this.viewer;
    if (Array.isArray(exclude)) {
      exclude.push(this.pickingPointer);
    } else {
      exclude = [this.pickingPointer];
    }
    if (this.pickMode === 'scene') {
      cartesian = viewer.scene.pickPosition(pos); // 此法在地表透明时获取坐标会有问题
      if (!cartesian) {
        const ray = viewer.camera.getPickRay(pos);
        const result = viewer.scene.pickFromRay(ray, exclude);
        if (result) return result.position;
      }
    } else {
      const ray = viewer.camera.getPickRay(pos);
      cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    }
    return cartesian;
  }
  /**
   * 设置位置交互修改坐标拾取回调
   * @param {*} layerid
   * @param {*} objType
   */
  setPositionPickingEvt(callback = () => { }, showPointer = true) {
    this.positionPickingCallback = callback;
    this.positionPickingEnabled = true;
    this.viewer.container.style.cursor = 'pointer';
    this.viewer.scene.globe.translucency.enabled = false;
    if (showPointer) this.pickingPointer.show = true;
  }
  /**
   * 禁用位置拾取
   */
  disablePositionPicking() {
    this.positionPickingEnabled = false;
    this.positionPickingCallback = () => { };
    this.viewer.container.style.cursor = 'default';
    this.viewer.scene.globe.translucency.enabled = this.translucencyEnabled;
    this.pickingPointer.show = false;
  }
  /**
   * 内部坐标拾取，供地图事件调用
   */
  _positionPickingFunctionInternal(position, cartesian, object) {
    if (this.positionPickingEnabled) {
      this.positionPickingCallback(position, cartesian, object);
    }
  }
  destroy() {
    if (this.waterSurface && typeof this.waterSurface.destroy == 'function') this.waterSurface.destroy();

    if (this.tool) this.tool.destroy();
    if (this.trailHelper) this.trailHelper.destroy();
    if (this.warningHelper) this.warningHelper.destroy();
    if (this.layerManager) this.layerManager.destroy();

    //高亮图层被移除时不会销毁，手动销毁
    for (let name in this.highlightLayerList) {
      this.highlightLayerList[name].destroy();
    }
    CesiumPopup.removeAll();

    this.viewer.destroy();

    this.viewer = null;
    this.trailHelper = null;
    this.evtHelper = null;
    this.waterSurface = null;
    this.colorLayer = null;
    this.CesiumPopup = null;
    this.viewHelper = null;

    window._cesiummap = undefined;
    console.log('viewer销毁');
  }
}

/* eslint-disable */
//This file is automatically rebuilt by the Cesium build process.
var PolylineCommon = "void clipLineSegmentToNearPlane(\n\
    vec3 p0,\n\
    vec3 p1,\n\
    out vec4 positionWC,\n\
    out bool clipped,\n\
    out bool culledByNearPlane,\n\
    out vec4 clippedPositionEC)\n\
{\n\
    culledByNearPlane = false;\n\
    clipped = false;\n\
\n\
    vec3 p0ToP1 = p1 - p0;\n\
    float magnitude = length(p0ToP1);\n\
    vec3 direction = normalize(p0ToP1);\n\
\n\
    // Distance that p0 is behind the near plane. Negative means p0 is\n\
    // in front of the near plane.\n\
    float endPoint0Distance =  czm_currentFrustum.x + p0.z;\n\
\n\
    // Camera looks down -Z.\n\
    // When moving a point along +Z: LESS VISIBLE\n\
    //   * Points in front of the camera move closer to the camera.\n\
    //   * Points behind the camrea move farther away from the camera.\n\
    // When moving a point along -Z: MORE VISIBLE\n\
    //   * Points in front of the camera move farther away from the camera.\n\
    //   * Points behind the camera move closer to the camera.\n\
\n\
    // Positive denominator: -Z, becoming more visible\n\
    // Negative denominator: +Z, becoming less visible\n\
    // Nearly zero: parallel to near plane\n\
    float denominator = -direction.z;\n\
\n\
    if (endPoint0Distance > 0.0 && abs(denominator) < czm_epsilon7)\n\
    {\n\
        // p0 is behind the near plane and the line to p1 is nearly parallel to\n\
        // the near plane, so cull the segment completely.\n\
        culledByNearPlane = true;\n\
    }\n\
    else if (endPoint0Distance > 0.0)\n\
    {\n\
        // p0 is behind the near plane, and the line to p1 is moving distinctly\n\
        // toward or away from it.\n\
\n\
        // t = (-plane distance - dot(plane normal, ray origin)) / dot(plane normal, ray direction)\n\
        float t = endPoint0Distance / denominator;\n\
        if (t < 0.0 || t > magnitude)\n\
        {\n\
            // Near plane intersection is not between the two points.\n\
            // We already confirmed p0 is behind the naer plane, so now\n\
            // we know the entire segment is behind it.\n\
            culledByNearPlane = true;\n\
        }\n\
        else\n\
        {\n\
            // Segment crosses the near plane, update p0 to lie exactly on it.\n\
            p0 = p0 + t * direction;\n\
\n\
            // Numerical noise might put us a bit on the wrong side of the near plane.\n\
            // Don't let that happen.\n\
            p0.z = min(p0.z, -czm_currentFrustum.x);\n\
\n\
            clipped = true;\n\
        }\n\
    }\n\
\n\
    clippedPositionEC = vec4(p0, 1.0);\n\
    positionWC = czm_eyeToWindowCoordinates(clippedPositionEC);\n\
}\n\
\n\
vec4 getPolylineWindowCoordinatesEC(vec4 positionEC, vec4 prevEC, vec4 nextEC, float expandDirection, float width, bool usePrevious, out float angle)\n\
{\n\
    // expandDirection +1 is to the _left_ when looking from positionEC toward nextEC.\n\
\n\
#ifdef POLYLINE_DASH\n\
    // Compute the window coordinates of the points.\n\
    vec4 positionWindow = czm_eyeToWindowCoordinates(positionEC);\n\
    vec4 previousWindow = czm_eyeToWindowCoordinates(prevEC);\n\
    vec4 nextWindow = czm_eyeToWindowCoordinates(nextEC);\n\
\n\
    // Determine the relative screen space direction of the line.\n\
    vec2 lineDir;\n\
    if (usePrevious) {\n\
        lineDir = normalize(positionWindow.xy - previousWindow.xy);\n\
    }\n\
    else {\n\
        lineDir = normalize(nextWindow.xy - positionWindow.xy);\n\
    }\n\
    angle = atan(lineDir.x, lineDir.y) - 1.570796327; // precomputed atan(1,0)\n\
\n\
    // Quantize the angle so it doesn't change rapidly between segments.\n\
    angle = floor(angle / czm_piOverFour + 0.5) * czm_piOverFour;\n\
#endif\n\
\n\
    vec4 clippedPrevWC, clippedPrevEC;\n\
    bool prevSegmentClipped, prevSegmentCulled;\n\
    clipLineSegmentToNearPlane(prevEC.xyz, positionEC.xyz, clippedPrevWC, prevSegmentClipped, prevSegmentCulled, clippedPrevEC);\n\
\n\
    vec4 clippedNextWC, clippedNextEC;\n\
    bool nextSegmentClipped, nextSegmentCulled;\n\
    clipLineSegmentToNearPlane(nextEC.xyz, positionEC.xyz, clippedNextWC, nextSegmentClipped, nextSegmentCulled, clippedNextEC);\n\
\n\
    bool segmentClipped, segmentCulled;\n\
    vec4 clippedPositionWC, clippedPositionEC;\n\
    clipLineSegmentToNearPlane(positionEC.xyz, usePrevious ? prevEC.xyz : nextEC.xyz, clippedPositionWC, segmentClipped, segmentCulled, clippedPositionEC);\n\
\n\
    if (segmentCulled)\n\
    {\n\
        return vec4(0.0, 0.0, 0.0, 1.0);\n\
    }\n\
\n\
    vec2 directionToPrevWC = normalize(clippedPrevWC.xy - clippedPositionWC.xy);\n\
    vec2 directionToNextWC = normalize(clippedNextWC.xy - clippedPositionWC.xy);\n\
\n\
    // If a segment was culled, we can't use the corresponding direction\n\
    // computed above. We should never see both of these be true without\n\
    // `segmentCulled` above also being true.\n\
    if (prevSegmentCulled)\n\
    {\n\
        directionToPrevWC = -directionToNextWC;\n\
    }\n\
    else if (nextSegmentCulled)\n\
    {\n\
        directionToNextWC = -directionToPrevWC;\n\
    }\n\
\n\
    vec2 thisSegmentForwardWC, otherSegmentForwardWC;\n\
    if (usePrevious)\n\
    {\n\
        thisSegmentForwardWC = -directionToPrevWC;\n\
        otherSegmentForwardWC = directionToNextWC;\n\
    }\n\
    else\n\
    {\n\
        thisSegmentForwardWC = directionToNextWC;\n\
        otherSegmentForwardWC =  -directionToPrevWC;\n\
    }\n\
\n\
    vec2 thisSegmentLeftWC = vec2(-thisSegmentForwardWC.y, thisSegmentForwardWC.x);\n\
\n\
    vec2 leftWC = thisSegmentLeftWC;\n\
    float expandWidth = width * 0.5;\n\
\n\
    // When lines are split at the anti-meridian, the position may be at the\n\
    // same location as the next or previous position, and we need to handle\n\
    // that to avoid producing NaNs.\n\
    if (!czm_equalsEpsilon(prevEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1) && !czm_equalsEpsilon(nextEC.xyz - positionEC.xyz, vec3(0.0), czm_epsilon1))\n\
    {\n\
        vec2 otherSegmentLeftWC = vec2(-otherSegmentForwardWC.y, otherSegmentForwardWC.x);\n\
\n\
        vec2 leftSumWC = thisSegmentLeftWC + otherSegmentLeftWC;\n\
        float leftSumLength = length(leftSumWC);\n\
        leftWC = leftSumLength < czm_epsilon6 ? thisSegmentLeftWC : (leftSumWC / leftSumLength);\n\
\n\
        // The sine of the angle between the two vectors is given by the formula\n\
        //         |a x b| = |a||b|sin(theta)\n\
        // which is\n\
        //     float sinAngle = length(cross(vec3(leftWC, 0.0), vec3(-thisSegmentForwardWC, 0.0)));\n\
        // Because the z components of both vectors are zero, the x and y coordinate will be zero.\n\
        // Therefore, the sine of the angle is just the z component of the cross product.\n\
        vec2 u = -thisSegmentForwardWC;\n\
        vec2 v = leftWC;\n\
        float sinAngle = abs(u.x * v.y - u.y * v.x);\n\
        expandWidth = clamp(expandWidth / sinAngle, 0.0, width * 2.0);\n\
    }\n\
\n\
    vec2 offset = leftWC * expandDirection * expandWidth * czm_pixelRatio;\n\
    return vec4(clippedPositionWC.xy + offset, -clippedPositionWC.z, 1.0) * (czm_projection * clippedPositionEC).w;\n\
}\n\
\n\
vec4 getPolylineWindowCoordinates(vec4 position, vec4 previous, vec4 next, float expandDirection, float width, bool usePrevious, out float angle)\n\
{\n\
    vec4 positionEC = czm_modelViewRelativeToEye * position;\n\
    vec4 prevEC = czm_modelViewRelativeToEye * previous;\n\
    vec4 nextEC = czm_modelViewRelativeToEye * next;\n\
    return getPolylineWindowCoordinatesEC(positionEC, prevEC, nextEC, expandDirection, width, usePrevious, angle);\n\
}\n\
";

/* eslint-disable */

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
  UNIFORM_SCALE: 3
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
      color: Cesium.Color.WHITE
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
`
  }
});

function addMouseEvent(handler, viewer, scope) {
  let pickedObject = null;

  handler.setInputAction(function(movement) {
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

  handler.setInputAction(function() {
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

  handler.setInputAction(function(movement) {
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
    const windowOrigin = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, origin, new Cesium.Cartesian2());
    // the mouse's movement direction
    const mouseDirection = new Cesium.Cartesian2(
      movement.endPosition.x - movement.startPosition.x,
      movement.endPosition.y - movement.startPosition.y
    );

    const minimumScale = 0.001;

    if (scope.type === Mode.TRANSLATE) {
      const translation = new Cesium.Matrix4(); // the translation matrix
      const targetPoint = new Cesium.Cartesian3(); // new point after translating
      const transVector = new Cesium.Cartesian3(); // the translation vector

      switch (pickedObject.id.axis) {
        case 'x':
          Cesium.Matrix4.multiplyByPoint(transform, Cesium.Cartesian3.UNIT_X, targetPoint);
          break;
        case 'y':
          Cesium.Matrix4.multiplyByPoint(transform, Cesium.Cartesian3.UNIT_Y, targetPoint);
          break;
        case 'z':
          Cesium.Matrix4.multiplyByPoint(transform, Cesium.Cartesian3.UNIT_Z, targetPoint);
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
      const direction = Cesium.Cartesian2.subtract(windowEnd, windowOrigin, new Cesium.Cartesian2());

      // whether the mouse is moving in the positive direction of the axis
      const angle = Cesium.Cartesian2.angleBetween(mouseDirection, direction);
      const isMouseMoveInPositive = angle < Cesium.Math.PI_OVER_TWO ? 1 : -1;

      const movePixelsAlongAxis = Cesium.Cartesian2.magnitude(mouseDirection) * Math.abs(Math.cos(angle));

      const metersPerPixel = viewer.camera.getPixelSize(
        new Cesium.BoundingSphere(origin, Cesium.Cartesian3.magnitude(transVector)),
        viewer.canvas.width,
        viewer.canvas.height
      );

      Cesium.Matrix4.fromTranslation(
        Cesium.Cartesian3.multiplyByScalar(
          transVector,
          isMouseMoveInPositive * metersPerPixel * movePixelsAlongAxis,
          new Cesium.Cartesian3()
        ),
        translation
      );

      const tmp = Cesium.Matrix4.multiply(translation, scope.modelMatrix, new Cesium.Matrix4());

      if (isNaN(tmp[12]) || isNaN(tmp[13]) || isNaN(tmp[14])) {
        // console.warn({
        //   mouseDirection,
        //   angle,
        //   direction
        // });
        return;
      }

      // apply translation
      // scope.modelMatrix[12] = tmp[12];
      // scope.modelMatrix[13] = tmp[13];
      // scope.modelMatrix[14] = tmp[14];

      if (typeof scope.onDragMoving === 'function') {
        scope.onDragMoving({
          type: Mode.TRANSLATE,
          result: new Cesium.Cartesian3(tmp[12], tmp[13], tmp[14]),
          transformAtOrigin: translation
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
        new Cesium.Cartesian2(movement.startPosition.x, movement.startPosition.y),
        windowOrigin,
        new Cesium.Cartesian2()
      );
      const endVector = Cesium.Cartesian2.subtract(
        new Cesium.Cartesian2(movement.endPosition.x, movement.endPosition.y),
        windowOrigin,
        new Cesium.Cartesian2()
      );

      // get the mouse movement direction
      const isCounterClockWise = Cesium.Cartesian2.cross(startVector, endVector) < 0 ? 1 : -1; // y axis is downwards on the canvas
      let isCameraOnPositiveAxis;
      const angle = Cesium.Cartesian2.angleBetween(startVector, endVector);
      const org2Camera = Cesium.Cartesian3.subtract(viewer.scene.camera.position, origin, new Cesium.Cartesian3());

      const rotation = new Cesium.Matrix3();

      const axis = new Cesium.Cartesian3();

      switch (pickedObject.id.axis) {
        case 'x':
          Cesium.Matrix4.multiplyByPointAsVector(scope.modelMatrix, Cesium.Cartesian3.UNIT_X, axis);
          isCameraOnPositiveAxis = Cesium.Cartesian3.dot(axis, org2Camera) > 0 ? 1 : -1;

          Cesium.Matrix3.fromRotationX(angle * isCameraOnPositiveAxis * isCounterClockWise, rotation);
          break;
        case 'y':
          Cesium.Matrix4.multiplyByPointAsVector(scope.modelMatrix, Cesium.Cartesian3.UNIT_Y, axis);
          isCameraOnPositiveAxis = Cesium.Cartesian3.dot(axis, org2Camera) > 0 ? 1 : -1;

          Cesium.Matrix3.fromRotationY(angle * isCameraOnPositiveAxis * isCounterClockWise, rotation);
          break;
        case 'z':
          Cesium.Matrix4.multiplyByPointAsVector(scope.modelMatrix, Cesium.Cartesian3.UNIT_Z, axis);
          isCameraOnPositiveAxis = Cesium.Cartesian3.dot(axis, org2Camera) > 0 ? 1 : -1;

          Cesium.Matrix3.fromRotationZ(angle * isCameraOnPositiveAxis * isCounterClockWise, rotation);
          break;
      }

      // apply rotation to the editor, modelMatrix includes the translation
      Cesium.Matrix4.multiplyByMatrix3(scope.modelMatrix, rotation, scope.modelMatrix);
      const scaleValue = getScaleFromTransform(scope.item.modelMatrix);

      // calculate the item's new modelMatrix
      const finalTransform = Cesium.Matrix4.multiply(
        scope.modelMatrix,
        Cesium.Matrix4.fromScale(new Cesium.Cartesian3(scaleValue[0], scaleValue[1], scaleValue[2])),
        new Cesium.Matrix4()
      );

      if (typeof scope.onDragMoving === 'function') {
        scope.onDragMoving({
          type: Mode.ROTATE,
          result: Cesium.Transforms.fixedFrameToHeadingPitchRoll(finalTransform),
          transformAtOrigin: Cesium.Matrix4.fromRotationTranslation(
            rotation,
            Cesium.Cartesian3.ZERO,
            new Cesium.Matrix4()
          )
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
          Cesium.Matrix4.multiplyByPoint(scope.modelMatrix, Cesium.Cartesian3.UNIT_X, targetPoint);

          Cesium.SceneTransforms.wgs84ToDrawingBufferCoordinates(viewer.scene, targetPoint, windowEnd);
          Cesium.Cartesian2.subtract(windowEnd, windowOrigin, direction);

          // whether the mouse moves along the positive direction
          const scalex = Cesium.Cartesian2.dot(direction, mouseDirection) > 0 ? 1.05 : 0.95;

          if (oldScale[0] <= minimumScale && scalex === 0.95) return;

          Cesium.Matrix4.fromScale(new Cesium.Cartesian3(scalex, 1, 1), scaleMatrix);

          break;
        case 'y':
          Cesium.Matrix4.multiplyByPoint(scope.modelMatrix, Cesium.Cartesian3.UNIT_Y, targetPoint);

          Cesium.SceneTransforms.wgs84ToDrawingBufferCoordinates(viewer.scene, targetPoint, windowEnd);
          Cesium.Cartesian2.subtract(windowEnd, windowOrigin, direction);

          const scaley = Cesium.Cartesian2.dot(direction, mouseDirection) > 0 ? 1.05 : 0.95;

          Cesium.Matrix4.fromScale(new Cesium.Cartesian3(1, scaley, 1), scaleMatrix);

          if (oldScale[1] <= minimumScale && scaley === 0.95) return;
          break;
        case 'z':
          Cesium.Matrix4.multiplyByPoint(scope.modelMatrix, Cesium.Cartesian3.UNIT_Z, targetPoint);

          Cesium.SceneTransforms.wgs84ToDrawingBufferCoordinates(viewer.scene, targetPoint, windowEnd);
          Cesium.Cartesian2.subtract(windowEnd, windowOrigin, direction);

          const scalez = Cesium.Cartesian2.dot(direction, mouseDirection) > 0 ? 1.05 : 0.95;

          Cesium.Matrix4.fromScale(new Cesium.Cartesian3(1, 1, scalez), scaleMatrix);
          if (oldScale[2] <= minimumScale && scalez === 0.95) return;
          break;
      }

      const finalTransform = Cesium.Matrix4.multiply(scope.item.modelMatrix, scaleMatrix, new Cesium.Matrix4());
      if (typeof scope.onDragMoving === 'function') {
        scope.onDragMoving({
          type: Mode.SCALE,
          result: getScaleFromTransform(finalTransform)
        });
      }

      if (scope.applyTransform) {
        Cesium.Matrix4.clone(finalTransform, scope.item.modelMatrix);
      }
    } else if (scope.type === Mode.UNIFORM_SCALE) {
      const windowOriginToMouseVecotr = Cesium.Cartesian2.subtract(
        new Cesium.Cartesian2(movement.startPosition.x, movement.startPosition.y),
        windowOrigin,
        new Cesium.Cartesian2()
      );

      // whether the mouse moves outward
      const scale = Cesium.Cartesian2.dot(windowOriginToMouseVecotr, mouseDirection) > 0 ? 1.05 : 0.95;

      const scaleMatrix = Cesium.Matrix4.fromUniformScale(scale, new Cesium.Matrix4());

      const oldScale = getScaleFromTransform(scope.item.modelMatrix);
      if (oldScale[0] <= minimumScale && scale === 0.95) return;

      const finalTransform = Cesium.Matrix4.multiply(scope.item.modelMatrix, scaleMatrix, new Cesium.Matrix4());

      if (typeof scope.onDragMoving === 'function') {
        scope.onDragMoving({
          type: Mode.UNIFORM_SCALE,
          result: getScaleFromTransform(finalTransform),
          transformAtOrigin: scaleMatrix
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

  if (!Cesium.defined(options.viewer)) new Cesium.DeveloperError('Viewer must be assigned!');
  if (!Cesium.defined(options.item)) new Cesium.DeveloperError('Item must be assigned!');
  if (!Cesium.defined(options.item.modelMatrix)) new Cesium.DeveloperError('Item must have the modelMatrix attribute!');

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
  this.highlightColor = Cesium.defaultValue(options.highlightColor, Cesium.Color.YELLOW);
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
  const maxPixelSize = Math.max(context.drawingBufferWidth, context.drawingBufferHeight);
  const m = model.modelMatrix;
  scratchPosition.x = m[12];
  scratchPosition.y = m[13];
  scratchPosition.z = m[14];

  if (frameState.camera._scene.mode !== Cesium.SceneMode.SCENE3D) {
    const projection = frameState.mapProjection;
    const cartographic = projection.ellipsoid.cartesianToCartographic(scratchPosition, scratchCartographic);
    projection.project(cartographic, scratchPosition);
    Cesium.Cartesian3.fromElements(scratchPosition.z, scratchPosition.x, scratchPosition.y, scratchPosition);
  }

  const radius = 1;

  const metersPerPixel = scaleInPixels(scratchPosition, radius, frameState);

  // metersPerPixel is always > 0.0
  const pixelsPerMeter = 1.0 / metersPerPixel;
  const diameterInPixels = Math.min(pixelsPerMeter * 2.0 * radius, maxPixelSize);

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
TransformControls.prototype.update = function(frameState) {
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
      this.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(itemPos);
    } else if (this.type === Mode.ROTATE || this.type === Mode.SCALE || this.type === Mode.UNIFORM_SCALE) {
      const m = this.item.modelMatrix.clone();
      const scale = getScaleFromTransform(m);

      // remove the scaling transform but keep the translation and rotation
      // shouldn't be zero
      if (scale[0] === 0 || scale[1] === 0 || scale[2] === 0) {
        new Cesium.DeveloperError("Can't get transform infomation from modelMatrix since scale is 0.");
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
    if (this.modelMatrix[12] === 0.0 && this.modelMatrix[13] === 0.0 && this.modelMatrix[14] === 0.0) {
      this.modelMatrix[14] = 0.01;
    }

    const axisMatrix = Cesium.Matrix4.IDENTITY.clone();
    axisMatrix[14] = 0.01;

    let material,
      xpoints = [],
      ypoints = [],
      zpoints = [];

    if (this.type === Mode.TRANSLATE || this.type === Mode.SCALE || this.type === Mode.UNIFORM_SCALE) {
      material = Cesium.Material.fromType('PolylineArrow');
      xpoints = [Cesium.Cartesian3.ZERO, Cesium.Cartesian3.UNIT_X];
      ypoints = [Cesium.Cartesian3.ZERO, Cesium.Cartesian3.UNIT_Y];
      zpoints = [Cesium.Cartesian3.ZERO, Cesium.Cartesian3.UNIT_Z];
      if (this.type !== Mode.TRANSLATE) {
        material = scaleMaterial;
      }
    } else if (this.type === Mode.ROTATE) {
      material = Cesium.Material.fromType('Color', {
        color: Cesium.Color.WHITE
      });
      const counts = 64;
      for (let i = 0; i <= counts; i += 1) {
        xpoints.push(
          Cesium.Matrix3.multiplyByVector(
            Cesium.Matrix3.fromRotationX((i * (2 * Cesium.Math.PI)) / counts),
            Cesium.Cartesian3.UNIT_Y,
            new Cesium.Cartesian3()
          )
        );
      }
      for (let i = 0; i <= counts; i += 1) {
        ypoints.push(
          Cesium.Matrix3.multiplyByVector(
            Cesium.Matrix3.fromRotationY((i * (2 * Cesium.Math.PI)) / counts),
            Cesium.Cartesian3.UNIT_Z,
            new Cesium.Cartesian3()
          )
        );
      }
      for (let i = 0; i <= counts; i += 1) {
        zpoints.push(
          Cesium.Matrix3.multiplyByVector(
            Cesium.Matrix3.fromRotationZ((i * (2 * Cesium.Math.PI)) / counts),
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
        arcType: Cesium.ArcType.NONE
      }),
      modelMatrix: axisMatrix,
      id: {
        axis: 'x'
      },
      pickPrimitive: this,
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(this.xColor),
        depthFailColor: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.multiplyByScalar(this.xColor, 0.5, new Cesium.Color())
        )
      }
    });
    const y = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: ypoints,
        width: width,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
        arcType: Cesium.ArcType.NONE
      }),
      modelMatrix: axisMatrix,
      id: {
        axis: 'y'
      },
      pickPrimitive: this,
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(this.yColor),
        depthFailColor: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.multiplyByScalar(this.yColor, 0.5, new Cesium.Color())
        )
      }
    });
    const z = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: zpoints,
        width: width,
        vertexFormat: Cesium.PolylineMaterialAppearance.VERTEX_FORMAT,
        arcType: Cesium.ArcType.NONE
      }),
      modelMatrix: axisMatrix,
      id: {
        axis: 'z'
      },
      pickPrimitive: this,
      attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(this.zColor),
        depthFailColor: Cesium.ColorGeometryInstanceAttribute.fromColor(
          Cesium.Color.multiplyByScalar(this.zColor, 0.5, new Cesium.Color())
        )
      }
    });

    const appearance = new Cesium.PolylineMaterialAppearance({
      material: material,
      vertexShaderSource: vs,
      fragmentShaderSource: fs
    });

    this._primitive = new Cesium.Primitive({
      geometryInstances: [x, y, z],
      appearance: appearance,
      depthFailAppearance: appearance,
      asynchronous: false,
      releaseGeometryInstances: false
    });
  }

  const scale = getScale(this, frameState);

  const scaledMatrix = Cesium.Matrix4.multiplyByUniformScale(this.modelMatrix, scale, new Cesium.Matrix4());

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
TransformControls.prototype.isDestroyed = function() {
  return false;
};

/**Mode
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
TransformControls.prototype.destroy = function() {
  this.handler.destroy();
  this._primitive = this._primitive && this._primitive.destroy();
  return Cesium.destroyObject(this);
};

TransformControls.Mode = Object.freeze(Mode);

/* eslint-disable */
class BasePointTransformHelper {
  constructor(cartesian) {
    this.setBasePoint(cartesian);
  }
  /**
   * 设置基准点
   * @param {*} cartesian
   */
  setBasePoint(cartesian) {
    this.basePoint = cartesian;
    this.basePointTransform = Cesium.Transforms.eastNorthUpToFixedFrame(cartesian);
  }
  /**
   * 平移经纬度点
   * @param {*} points 坐标点
   * @param {*} translation 平移量
   * @returns
   */
  translateDegrees(points, translationTransform, applyTransform = true) {
    if (applyTransform) {
      Cesium.Matrix4.multiply(translationTransform, this.basePointTransform, this.basePointTransform);
      Cesium.Matrix4.multiplyByPoint(translationTransform, this.basePoint, this.basePoint);
    }

    return points.map(p => {
      const cartesian = Cesium.Cartesian3.fromDegrees(p.x, p.y, p.z);
      const result = Cesium.Matrix4.multiplyByPoint(translationTransform, cartesian, new Cesium.Cartesian3());
      const carto = Cesium.Cartographic.fromCartesian(result);
      return {
        x: Cesium.Math.toDegrees(carto.longitude),
        y: Cesium.Math.toDegrees(carto.latitude),
        z: carto.height,
        m: p.m
      };
    });
  }
  /**
   * 旋转经纬度点
   * @param {*} points 坐标点
   * @param {*} rotation 旋转矩阵
   * @returns
   */
  rotateDegrees(points, rotationTransform, applyTransform = true) {
    // M * R * M-1 * X
    const inverseTransform = Cesium.Matrix4.inverseTransformation(this.basePointTransform, new Cesium.Matrix4());
    const finalTransform = new Cesium.Matrix4();
    if (applyTransform) {
      Cesium.Matrix4.multiply(this.basePointTransform, rotationTransform, this.basePointTransform);
      Cesium.Matrix4.multiply(this.basePointTransform, inverseTransform, finalTransform);
    } else {
      const temp = Cesium.Matrix4.multiply(this.basePointTransform, rotationTransform, new Cesium.Matrix4());
      Cesium.Matrix4.multiply(temp, inverseTransform, finalTransform);
    }

    return points.map(p => {
      const cartesian = Cesium.Cartesian3.fromDegrees(p.x, p.y, p.z);
      const result = Cesium.Matrix4.multiplyByPoint(finalTransform, cartesian, new Cesium.Cartesian3());
      const carto = Cesium.Cartographic.fromCartesian(result);
      return {
        x: Cesium.Math.toDegrees(carto.longitude),
        y: Cesium.Math.toDegrees(carto.latitude),
        z: carto.height,
        m: p.m
      };
    });
  }
  /**
   * 缩放经纬度点
   * @param {*} points
   * @param {*} scaleTransform
   * @returns
   */
  scaleDegrees(points, scaleTransform) {
    // M * S * M-1 * X
    const inverseTransform = Cesium.Matrix4.inverseTransformation(this.basePointTransform, new Cesium.Matrix4());
    const finalTransform = new Cesium.Matrix4();
    Cesium.Matrix4.multiply(this.basePointTransform, scaleTransform, finalTransform);
    Cesium.Matrix4.multiply(finalTransform, inverseTransform, finalTransform);

    return points.map(p => {
      const cartesian = Cesium.Cartesian3.fromDegrees(p.x, p.y, p.z);
      const result = Cesium.Matrix4.multiplyByPoint(finalTransform, cartesian, new Cesium.Cartesian3());
      const carto = Cesium.Cartographic.fromCartesian(result);
      return {
        x: Cesium.Math.toDegrees(carto.longitude),
        y: Cesium.Math.toDegrees(carto.latitude),
        z: carto.height,
        m: p.m
      };
    });
  }
}

/* eslint-disable */

class NodeTransformControls {
  constructor(viewer) {
    this.viewer = viewer;
    this.entity = null;
    this.positionsEditting = [];
    this.transformControl = null;
    this.pointsCollection = new Cesium.PointPrimitiveCollection({
      blendOption: Cesium.BlendOption.OPAQUE
    });

    viewer.scene.primitives.add(this.pointsCollection);

    this.evtHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    this.controls = null;
    this.isClosed = false;
    this.copyEntity = null;
    this.batchIdx = undefined;
    this.visibility = true;
  }
  get positions() {
    return this.positionsEditting && this.positionsEditting.map(p => p.position);
  }
  /**
   * 设置要编辑的entity
   * @param {*} entity
   */
  startEditting(entity, { coordinates, height, clampToGround }, batchIdx) {
    const me = this;

    this.entity = entity;
    const { polyline, polygon } = entity;

    this.positionsEditting = coordinates.map(p => {
      return {
        position: Cesium.Cartesian3.fromDegrees(p.x, p.y, p.z),
        id: Tool$1.generateUUID()
      };
    });

    const first = this.positions[0];
    const last = this.positions[this.positions.length - 1];
    this.isClosed = first.equals(last);

    const copyPolyline = {
      width: 5,
      material: new Cesium.ColorMaterialProperty(new Cesium.Color(1, 0, 0, 0.5)),
      depthFailMaterial: new Cesium.ColorMaterialProperty(new Cesium.Color(1, 0, 0, 0.5)),
      positions: new Cesium.CallbackProperty(() => {
        return me.positions;
      }, false),
      clampToGround: clampToGround
    };
    let copyPolygon = undefined;

    if (polygon) {
      copyPolygon = {
        material: new Cesium.Color(1, 1, 1, 0.5),
        perPositionHeight: !clampToGround,
        heightReference: clampToGround ? Cesium.HeightReference.CLAMP_TO_GROUND : Cesium.HeightReference.NONE,
        height: height,
        hierarchy: new Cesium.CallbackProperty(() => {
          return new Cesium.PolygonHierarchy(me.positions);
        }, false)
      };
    }

    // 单线（手绘）以entity加载
    if (entity instanceof Cesium.Entity) {
      this.visibility = this.entity.show;
      this.entity.show = false;
    } else {
      this.batchIdx = batchIdx;
      // 批量以primitive加载，线面分开
      this.visibility = polyline.show;
      if (polyline) polyline.show = false;
      if (polygon) polygon.show = false;
    }

    this.copyEntity = this.viewer.entities.add({
      polyline: copyPolyline,
      polygon: copyPolygon
    });

    // 添加点
    this.positionsEditting.forEach((p, i) => {
      if (!this.isClosed || i !== this.positionsEditting.length - 1) {
        me.pointsCollection.add({
          position: p.position,
          color: Cesium.Color.YELLOW,
          pixelSize: 10.0,
          id: p.id,
          disableDepthTestDistance: Number.POSITIVE_INFINITY
        });
      }
    });

    this.evtHandler.setInputAction(evt => {
      me._clickEvt(evt);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    this.evtHandler.setInputAction(evt => {
      me._rightClickEvt(evt);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
  /**
   * 获取更改的坐标
   * @returns
   */
  getChangedPositions() {
    const positions = this.positions.map(p => {
      const carto = Cesium.Cartographic.fromCartesian(p);
      const fix = (val, count) => {
        return Math.round(val * count) / count;
      };
      return {
        x: fix(Cesium.Math.toDegrees(carto.longitude), 10e5),
        y: fix(Cesium.Math.toDegrees(carto.latitude), 10e5),
        z: fix(carto.height, 100),
        m: 0
      };
    });

    return {
      positions,
      batchIdx: this.batchIdx
    };
  }
  /**
   * 退出编辑
   */
  exitEditting() {
    // 单线（手绘）以entity加载
    if (this.entity instanceof Cesium.Entity) {
      this.entity.show = this.visibility;
    } else {
      const { polyline, polygon } = this.entity;
      // 批量以primitive加载，线面分开
      if (polyline) polyline.show = this.visibility;
      if (polygon) polygon.show = this.visibility;
    }
    this.viewer.entities.remove(this.copyEntity);
    if (this.controls) this.controls.destroy();
    this.evtHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    this.pointsCollection.removeAll();
    this.batchIdx = undefined;
    this.positionsEditting = [];
  }
  /**
   * 点击事件
   * @param {*} e
   */
  _clickEvt(evt) {
    const scene = this.viewer.scene;
    const me = this;
    if (scene.mode !== Cesium.SceneMode.MORPHING) {
      if (scene.pickPositionSupported) {
        const pickedObject = scene.pick(evt.position);
        if (Cesium.defined(pickedObject) && this.pointsCollection.contains(pickedObject.primitive)) {
          const id = pickedObject.id;
          const position = this.positionsEditting.find(p => p.id === id).position;
          const modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position);
          let onDragMoving = ({ result }) => {
            position.x = result.x;
            position.y = result.y;
            position.z = result.z;
            pickedObject.primitive.position = result;
          };

          // 闭合图形同时修改首尾
          if (this.isClosed && id === this.positionsEditting[0].id) {
            const last = this.positions[this.positions.length - 1];
            onDragMoving = ({ result }) => {
              position.x = result.x;
              position.y = result.y;
              position.z = result.z;
              last.x = result.x;
              last.y = result.y;
              last.z = result.z;
              pickedObject.primitive.position = result;
            };
          }

          if (!this.controls) {
            this.controls = new TransformControls({
              item: {
                modelMatrix
              },
              viewer: this.viewer,
              onDragMoving
            });
          } else {
            this.controls.item.modelMatrix = modelMatrix;
            this.controls.onDragMoving = onDragMoving;
          }
        } else if (Cesium.defined(pickedObject) && this.copyEntity === pickedObject.id) {
          // 点击边线
          const cartesian = me.viewer.scene.pickPosition(evt.position);
          if (cartesian) {
            const idx = me._getSegmentIndex(cartesian);
            if (idx > -1) {
              const id = Tool$1.generateUUID();
              me.positionsEditting.splice(idx + 1, 0, {
                position: cartesian,
                id: id
              });
              // 添加可拖动点
              me.pointsCollection.add({
                position: cartesian,
                color: Cesium.Color.YELLOW,
                pixelSize: 10.0,
                id: id,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
              });
            }
          } else {
            console.warn('拾取坐标失败！');
          }
        }
      } else {
        console.warn('地图不支持位置选取');
      }
    }
  }
  _rightClickEvt(evt) {
    const scene = this.viewer.scene;
    if (scene.mode !== Cesium.SceneMode.MORPHING) {
      if (scene.pickPositionSupported) {
        const pickedObject = scene.pick(evt.position);
        if (Cesium.defined(pickedObject) && this.pointsCollection.contains(pickedObject.primitive)) {
          const id = pickedObject.id;

          if (this.isClosed && id === this.positionsEditting[0].id) {
            // 闭合图形删除第一个点需要同时删除最后一个点
            this.positionsEditting.splice(0, 1);
            this.positionsEditting.splice(this.positionsEditting.length - 1, 1);
            // 删除可拖动点
            const pp = this.pointsCollection._pointPrimitives.find(p => p.id === id);
            this.pointsCollection.remove(pp);
            // 保证新图形依然闭合
            this.positionsEditting.push({
              id: Tool$1.generateUUID(),
              position: this.positions[0]
            });
          } else {
            const idx = this.positionsEditting.findIndex(p => p.id === id);
            this.positionsEditting.splice(idx, 1);
            // 删除可拖动点
            const pp = this.pointsCollection._pointPrimitives.find(p => p.id === id);
            this.pointsCollection.remove(pp);
          }
        }
      }
    }
  }
  /**
   * 判断点所处线段
   * @param {*} cartesian
   * @returns
   */
  _getSegmentIndex(cartesian) {
    for (let i = 0; i < this.positions.length - 1; i += 1) {
      const pStart = this.positions[i];
      const pEnd = this.positions[i + 1];
      const pLine = Cesium.Cartesian3.subtract(pEnd, pStart, new Cesium.Cartesian3());
      const line = Cesium.Cartesian3.subtract(cartesian, pStart, new Cesium.Cartesian3());

      const cross = Cesium.Cartesian3.cross(
        Cesium.Cartesian3.normalize(pLine, new Cesium.Cartesian3()),
        Cesium.Cartesian3.normalize(line, new Cesium.Cartesian3()),
        new Cesium.Cartesian3()
      );

      // 是否共线
      if (Cesium.Cartesian3.magnitudeSquared(cross) <= 0.001) {
        const vecStart = Cesium.Cartesian3.subtract(cartesian, pStart, new Cesium.Cartesian3());
        const vecEnd = Cesium.Cartesian3.subtract(cartesian, pEnd, new Cesium.Cartesian3());
        const dot = Cesium.Cartesian3.dot(vecStart, vecEnd);
        // 是否在线段范围内
        if (dot < 0) {
          return i;
        }
      }
    }
    return -1;
  }
  /**
   * 销毁
   */
  destroy() {
    this.exitEditting();
    this.viewer.scene.primitives.remove(this.pointsCollection);
    this.evtHandler.destroy();

    this.viewer = undefined;
    this.entity = undefined;
    this.positionsEditting = undefined;
    this.transformControl = undefined;
    this.pointsCollection = undefined;
    this.evtHandler = undefined;
  }
}

/* eslint-disable */

class TerrainEdittingHelper {
  constructor(cesiummap) {
    this.cesiummap = cesiummap;
    this.viewer = cesiummap.viewer;
    this.border = undefined;
    this.ds = new Cesium.GeoJsonDataSource();
    this.viewer.dataSources.add(this.ds);

    this.gridLayer = this.viewer.imageryLayers.addImageryProvider(new Cesium.GridImageryProvider());
    // this.tileLayer = this.viewer.imageryLayers.addImageryProvider(new Cesium.TileCoordinatesImageryProvider());
  }

  visiualize(layerParam) {
    this.viewer.scene.primitives.remove(this.border?.outline); // 移除旧数据

    const layerData = {
      id: layerParam.id,
      check: true,
      type: LayerType.TerrainEdittingCollection
    };
    const layerBorder = Default.vectorParams();
    Object.assign(layerBorder, {
      layerId: layerParam.id,
      batchCoordinate: layerParam.layerTerrainEditting.batchCoordinate,
      isGround: 2
    });
    layerData.layerBorder = layerBorder;
    this.border = LayerFactory.generateBatchedBorder(layerData, window._cesiummap.viewer.scene.primitives);

    window._cesiummap.layerManager.layerDictionary.set(layerParam.id, this.border);
  }

  visiualizeTin(idx) {
    const tinData = this.viewer.terrainProvider._terrainEdits[idx];
    const geojson = {
      type: 'FeatureCollection',
      features: tinData.polygonTriangles
    };
    this.ds.load(geojson).then(ds => {
      ds.entities._entities._array.forEach(entity => {
        const color = Cesium.Color.fromRandom({
          alpha: 0.5
        });
        const color2 = Cesium.Color.clone(color);
        color2.alpha = 1;
        const pos = entity.polygon.hierarchy.getValue().positions;
        entity.polygon = undefined;
        entity.polyline = {
          positions: pos,
          material: new Cesium.ColorMaterialProperty(color2),
          width: 1,
          depthFailMaterial: new Cesium.ColorMaterialProperty(color2)
        };
      });
    });
  }

  destroy() {
    this.viewer.scene.primitives.remove(this.border?.outline);
    this.viewer.imageryLayers.remove(this.gridLayer);
    // this.viewer.imageryLayers.remove(this.tileLayer);
    this.gridLayer = undefined;
    this.tileLayer = undefined;
    this.cesiummap = undefined;
    this.viewer = undefined;
    this.border = undefined;
  }
}

export { BasePointTransformHelper, BatchLayer, CesiumEvtHelper, CesiumMap, CesiumPopup, Default, DrawHelper, FontType, LayerFactory, LayerManager, LayerType, LayerZoom, NodeTransformControls, P, TerrainEdittingHelper, TilesetHelper, TimeEasingType, Tool$1 as Tool, TransformControls, ViewHelper };
//# sourceMappingURL=index.js.map
