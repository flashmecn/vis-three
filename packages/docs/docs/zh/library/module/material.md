# @vis-three/module-material

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-material">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-material?color=blue">

## 模块信息

### module.type

- **值**: `material`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.TWO` - 200

## 提供配置

### 材质配置基类-Material

- **类型**：`Material`
- **参照**：[ https://threejs.org/docs/index.html#api/zh/materials/Material](https://threejs.org/docs/index.html#api/zh/materials/Material)
- **配置类型**:

```ts
export interface MaterialConfig extends SymbolConfig {
  /**设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。*/
  alphaTest: number;
  /**是否渲染材质的颜色。 这可以与网格的renderOrder属性结合使用，以创建遮挡其他对象的不可见对象。*/
  colorWrite: boolean;
  /** 是否在渲染此材质时启用深度测试。*/
  depthTest: boolean;
  /**渲染此材质是否对深度缓冲区有任何影响。 */
  depthWrite: boolean;
  /**材质是否需要更新。一般来讲是不用手动更新，除非有特殊情况。 */
  needsUpdate: boolean;
  /**在0.0 - 1.0的范围内的浮点数，表明材质的透明度。值0.0表示完全透明，1.0表示完全不透明。在transparent为true时有效 */
  opacity: number;
  /**是否对颜色应用抖动以消除条带的外观。 */
  dithering: boolean;
  /**定义投影的面。设置时，可以是THREE.FrontSide, THREE.BackSide, 或Materials。 */
  shadowSide: number | null;
  /**定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide 和 THREE.DoubleSide。 */
  side: number;
  /**定义这个材质是否会被渲染器的toneMapping设置所影响。 */
  toneMapped: boolean;
  /**定义此材质是否透明。 */
  transparent: boolean;
  /**此材质是否可见。 */
  visible: boolean;
  /**混合目标。默认值为OneMinusSrcAlphaFactor。 目标因子所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效。 */
  blendDst: number;
  /**.blendDst的透明度。 */
  blendDstAlpha: number | null;
  /**使用混合时所采用的混合方程式。默认值为AddEquation。必须将材质的blending设置为CustomBlending才能生效。 */
  blendEquation: number;
  /**.blendEquation 的透明度。 */
  blendEquationAlpha: number | null;
  /**在使用此材质显示对象时要使用何种混合。必须将其设置为CustomBlending才能使用自定义blendSrc, blendDst 或者 [page:Constant blendEquation]。  */
  blending: Blending;
  /**混合源。默认值为SrcAlphaFactor。必须将材质的blending设置为CustomBlending才能生效。 */
  blendSrc: number;
  /** .blendSrc的透明度。*/
  blendSrcAlpha: number | null;
  /**是否使用多边形偏移。 */
  polygonOffset: boolean;
  /**设置多边形偏移系数。 */
  polygonOffsetFactor: number;
  /**设置多边形偏移单位。 */
  polygonOffsetUnits: number;
}
```

- **默认配置**：

```ts
{
   vid: "",
   type: "Material",
   alphaTest: 0,
   colorWrite: true,
   depthTest: true,
   depthWrite: true,
   name: "",
   needsUpdate: false,
   opacity: 1,
   dithering: false,
   shadowSide: null,
   side: FrontSide,
   toneMapped: true,
   transparent: false,
   visible: true,
   blendDst: OneMinusSrcAlphaFactor,
   blendDstAlpha: null,
   blendEquation: AddEquation,
   blendEquationAlpha: null,
   blending: NormalBlending,
   blendSrc: SrcAlphaFactor,
   blendSrcAlpha: null,

   polygonOffset: false,
   polygonOffsetFactor: 0,
   polygonOffsetUnits: 0,
}
```

:::tip
此类型为内部使用
:::

### 基础网格材质-MeshBasicMaterial

- **类型**：`MeshBasicMaterial`
- **参照**：[https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial)
- **配置类型**:

```ts
export interface MeshBasicMaterialConfig extends MaterialConfig {
  /**材质的颜色(Color) */
  color: string;
  /**如何将表面颜色的结果与环境贴图（如果有）结合起来。 */
  combine: number;
  /**环境遮挡效果的强度。零是不遮挡效果。 */
  aoMapIntensity: number;
  /**材质是否受雾影响。 */
  fog: boolean;
  /**烘焙光的强度。 */
  lightMapIntensity: number;
  /**环境贴图对表面的影响程度; 见.combine。有效范围介于0（无反射）和1（完全反射）之间。 */
  reflectivity: number;
  /**空气的折射率（IOR）（约为1）除以材质的折射率。它与环境映射模式THREE.CubeRefractionMapping 和THREE.EquirectangularRefractionMapping一起使用。折射率不应超过1 */
  refractionRatio: number;
  /**将几何体渲染为线框。 */
  wireframe: boolean;
  /**定义线两端的外观。可选值为 'butt'，'round' 和 'square'。 */
  wireframeLinecap: string;
  /**定义线连接节点的样式。可选值为 'round', 'bevel' 和 'miter'。 */
  wireframeLinejoin: string;
  /**控制线框宽度。默认值为1。由于OpenGL Core Profile与大多数平台上WebGL渲染器的限制， 无论如何设置该值，线宽始终为1。 */
  wireframeLinewidth: number;
  /**颜色贴图。值为vid标识 */
  map: string;
  /**环境贴图。值为vid标识 */
  envMap: string;
  /**alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。值为vid标识 */
  alphaMap: string;
  /**该纹理的红色通道用作环境遮挡贴图。aoMap需要第二组UV。值为vid标识*/
  aoMap: string;
  /**光照贴图。lightMap需要第二组UV。值为vid标识 */
  lightMap: string;
  /**材质使用的高光贴图。 值为vid标识*/
  specularMap: string;
}
```

- **默认配置**：

```ts
{
    color: "rgb(255, 255, 255)",
    combine: MultiplyOperation,
    aoMapIntensity: 1,
    fog: true,
    lightMapIntensity: 1,
    reflectivity: 1,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    wireframeLinewidth: 1,

    map: "",
    envMap: "",
    alphaMap: "",
    aoMap: "",
    lightMap: "",
    specularMap: "",
  }
```

### 标准网格材质-MeshStandardMaterial

- **类型**：`MeshStandardMaterial`
- **参照**：[https://threejs.org/docs/index.html#api/zh/materials/MeshStandardMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshStandardMaterial)
- **配置类型**:

```ts
export interface MeshBasicMaterialConfig extends MaterialConfig {
  /**材质的颜色(Color) */
  color: string;
  /**如何将表面颜色的结果与环境贴图（如果有）结合起来。 */
  combine: number;
  /**环境遮挡效果的强度。零是不遮挡效果。 */
  aoMapIntensity: number;
  /**材质是否受雾影响。 */
  fog: boolean;
  /**烘焙光的强度。 */
  lightMapIntensity: number;
  /**环境贴图对表面的影响程度; 见.combine。有效范围介于0（无反射）和1（完全反射）之间。 */
  reflectivity: number;
  /**空气的折射率（IOR）（约为1）除以材质的折射率。它与环境映射模式THREE.CubeRefractionMapping 和THREE.EquirectangularRefractionMapping一起使用。折射率不应超过1 */
  refractionRatio: number;
  /**将几何体渲染为线框。 */
  wireframe: boolean;
  /**定义线两端的外观。可选值为 'butt'，'round' 和 'square'。 */
  wireframeLinecap: string;
  /**定义线连接节点的样式。可选值为 'round', 'bevel' 和 'miter'。 */
  wireframeLinejoin: string;
  /**控制线框宽度。默认值为1。由于OpenGL Core Profile与大多数平台上WebGL渲染器的限制， 无论如何设置该值，线宽始终为1。 */
  wireframeLinewidth: number;
  /**颜色贴图。值为vid标识 */
  map: string;
  /**环境贴图。值为vid标识 */
  envMap: string;
  /**alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。值为vid标识 */
  alphaMap: string;
  /**该纹理的红色通道用作环境遮挡贴图。aoMap需要第二组UV。值为vid标识*/
  aoMap: string;
  /**光照贴图。lightMap需要第二组UV。值为vid标识 */
  lightMap: string;
  /**材质使用的高光贴图。 值为vid标识*/
  specularMap: string;
}
```

- **默认配置**：

```ts
{
    color: "rgb(255, 255, 255)",
    combine: MultiplyOperation,
    aoMapIntensity: 1,
    fog: true,
    lightMapIntensity: 1,
    reflectivity: 1,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    wireframeLinewidth: 1,

    map: "",
    envMap: "",
    alphaMap: "",
    aoMap: "",
    lightMap: "",
    specularMap: "",
  }
```

### Phong 网格材质-MeshPhongMaterial

- **类型**：`MeshPhongMaterial`
- **参照**：[https://threejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial)
- **配置类型**:

```ts
export interface MeshPhongMaterialConfig extends MaterialConfig {
  aoMapIntensity: number;
  bumpScale: number;
  color: string;
  displacementScale: number;
  displacementBias: number;
  emissive: string;
  emissiveIntensity: number;
  flatShading: boolean;
  lightMapIntensity: number;
  normalMapType: number;
  refractionRatio: number;
  wireframe: boolean;
  wireframeLinecap: string;
  wireframeLinejoin: string;
  specular: string;
  shininess: number;
  combine: number;

  normalMap: string;
  map: string;
  lightMap: string;
  envMap: string;
  emissiveMap: string;
  displacementMap: string;
  bumpMap: string;
  alphaMap: string;
  aoMap: string;
  specularMap: string;
}
```

- **默认配置**：

```ts
{
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: false,
    lightMapIntensity: 1,
    normalMapType: TangentSpaceNormalMap,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    specular: "rgb(17, 17, 17)",
    shininess: 30,
    combine: MultiplyOperation,

    normalMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: "",
    specularMap: "",
  }
```

### 物理网格材质-MeshPhysicalMaterial

- **类型**：`MeshPhysicalMaterial`
- **参照**：[https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial)
- **配置类型**:

```ts
export interface MeshPhysicalMaterialConfig extends MeshStandardMaterialConfig {
  attenuationColor: string;
  attenuationDistance: number;
  clearcoat: number;
  clearcoatNormalScale: Vector2Config;
  clearcoatRoughness: number;
  ior: number;
  reflectivity: number;
  sheen: number;
  sheenRoughness: number;
  sheenColor: string;
  specularIntensity: number;
  specularColor: string;
  thickness: number;
  transmission: number;

  clearcoatMap: string;
  clearcoatNormalMap: string;
  clearcoatRoughnessMap: string;
  sheenRoughnessMap: string;
  sheenColorMap: string;
  specularIntensityMap: string;
  specularColorMap: string;
  thicknessMap: string;
  transmissionMap: string;
}
```

- **默认配置**：

```ts
{
   attenuationColor: "rgb(255, 255, 255)",
   attenuationDistance: 0,
   clearcoat: 0.0,
   clearcoatNormalScale: {
      x: 1,
      y: 1,
   },
   clearcoatRoughness: 0,
   ior: 1.5,
   reflectivity: 0.5,
   sheen: 0.0,
   sheenRoughness: 1.0,
   sheenColor: "rgb(255, 255, 255)",
   specularIntensity: 0.0,
   specularColor: "rgb(255, 255, 255)",
   thickness: 0,
   transmission: 0,

   clearcoatMap: "",
   clearcoatNormalMap: "",
   clearcoatRoughnessMap: "",
   sheenRoughnessMap: "",
   sheenColorMap: "",
   specularIntensityMap: "",
   specularColorMap: "",
   thicknessMap: "",
   transmissionMap: "",
}
```

### 点精灵材质-SpriteMaterial

- **类型**：`SpriteMaterial`
- **参照**：[https://threejs.org/docs/index.html#api/zh/materials/SpriteMaterial](https://threejs.org/docs/index.html#api/zh/materials/SpriteMaterial)
- **配置类型**:

```ts
export interface SpriteMaterialConfig extends MaterialConfig {
  color: string;
  rotation: number;
  map: string;
  alphaMap: string;
  sizeAttenuation: boolean;
}
```

- **默认配置**：

```ts
{
   color: "rgb(255, 255, 255)",
   rotation: 0,
   map: "",
   alphaMap: "",
   sizeAttenuation: true,
}
```

### 基础线条材质-LineBasicMaterial

- **类型**：`LineBasicMaterial`
- **参照**：[https://threejs.org/docs/index.html#api/zh/materials/LineBasicMaterial](https://threejs.org/docs/index.html#api/zh/materials/LineBasicMaterial)
- **配置类型**:

```ts
export interface LineBasicMaterialConfig extends MaterialConfig {
  color: string;
  linecap: string;
  linejoin: string;
  linewidth: number; // webgl limit always 1, use line2
}
```

- **默认配置**：

```ts
{
   color: "rgb(255, 255, 255)",
   linecap: "round",
   linejoin: "round",
   linewidth: 1,
}
```

### 虚线材质-LineDashedMaterial

- **类型**：`LineDashedMaterial`
- **参照**：[https://threejs.org/docs/index.html#api/zh/materials/LineDashedMaterial](https://threejs.org/docs/index.html#api/zh/materials/LineDashedMaterial)
- **配置类型**:

```ts
export interface LineDashedMaterialConfig extends LineBasicMaterialConfig {
  /**虚线的大小，是指破折号和间隙之和 */
  dashSize: number;
  /**间隙的大小 */
  gapSize: number;
  /**线条中虚线部分的占比 */
  scale: number;
}
```

- **默认配置**：

```ts
{
   dashSize: 3,
   gapSize: 1,
   scale: 1,
}
```

### 点材质-PointsMaterial

- **类型**：`PointsMaterial`
- **参照**：[https://threejs.org/docs/index.html#api/zh/materials/PointsMaterial](https://threejs.org/docs/index.html#api/zh/materials/PointsMaterial)
- **配置类型**:

```ts
export interface PointsMaterialConfig extends MaterialConfig {
  alphaMap: string;
  color: string;
  map: string;
  size: number;
  sizeAttenuation: boolean;
}
```

- **默认配置**：

```ts
{
   map: "",
   alphaMap: "",
   color: "rgb(255, 255, 255)",
   sizeAttenuation: true,
   size: 1,
}
```

### 着色器材质-ShaderMaterial

- **类型**：`ShaderMaterial`
- **参照**：[https://threejs.org/docs/index.html#api/zh/materials/ShaderMaterial](https://threejs.org/docs/index.html#api/zh/materials/ShaderMaterial)
- **配置类型**:

```ts
export interface ShaderMaterialConfig extends MaterialConfig {
  shader: string;
  uniforms: { [key: string]: any };
}
```

- **默认配置**：

```ts
{
   shader: "defaultShader",
   uniforms: {},
}
```

:::tip
着色器配置配通过`ShaderGeneratorManager`获取相关预置的着色器及其配置。
:::

# ShaderGeneratorManager

着色器配置生成器管理器。

## 静态方法

### register

- **详情**

```ts
/**
 * 注册着色器文件
 * @param shader
 */
register: (shader: Shader) => void
```

### getShader

- **详情**

```ts
/**
 * 获取着色器文件
 * @param name 文件名
 * @returns shader | null
 */
getShader(name: string): Shader | null
```

### generateConfig

- **详情**

```ts
/**
 * 获取该着色器文件对应的配置
 * @param name 作色器名
 * @param uniforms 合并的参数
 * @returns ShaderConfig
 */
generateConfig(name: string, uniforms?: Record<string, IUniform>):ShaderConfig;
```

### cloneShader

- **详情**

```ts
/**
 * 克隆着色器
 * @param shader
 * @returns Shader
 */
cloneShader(shader: Shader): Shader
```
