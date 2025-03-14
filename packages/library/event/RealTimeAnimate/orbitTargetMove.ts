import { Tween } from "@tweenjs/tween.js";
import { timingFunction, TIMINGFUNCTION } from "./common";
import { Object3D } from "three";
import {
  EngineSupport,
  ObjectEvent,
  RenderEvent,
  Vector3Config,
} from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { OrbitControlsEngine } from "@vis-three/plugin-orbit-controls";

export interface OrbitTargetMove extends BasicEventConfig {
  params: {
    /**目标物体 */
    target: string;
    /**偏移量 */
    offset: Vector3Config;
    /**延迟时间 */
    delay: number;
    /**动画持续时间 */
    duration: number;
    /**动画变化函数 */
    timingFunction: TIMINGFUNCTION;
  };
}

export const config: OrbitTargetMove = {
  name: "orbitTargetMove",
  params: {
    target: "",
    offset: {
      x: 0,
      y: 0,
      z: 0,
    },
    delay: 0,
    duration: 1000,
    timingFunction: TIMINGFUNCTION.EASING_QUADRATIC_INOUT,
  },
};

export interface OrbitSupportEngine
  extends EngineSupport,
    Pick<OrbitControlsEngine, "orbitControls"> {}

export const generator: EventGenerator<OrbitTargetMove> = function (
  engine: EngineSupport,
  config: OrbitTargetMove
): (event?: ObjectEvent) => void {
  const params = config.params;
  const compiler = engine.compilerManager;

  if (!(<OrbitSupportEngine>engine).orbitControls) {
    console.warn(
      `real time animation orbitTargetMove: engine can not install orbitControls.`
    );
    return () => {};
  }

  const renderManager = engine.renderManager!;

  // 防止重复触发
  let animating = false;

  return () => {
    if (animating) {
      return;
    }

    animating = true;

    let position = params.offset;

    if (params.target) {
      const object = engine.getObjectBySymbol(params.target) as Object3D;

      if (!object) {
        console.warn(
          `real time animation orbitTargetMove: can not found vid object: ${params.target}`
        );
      } else {
        position = {
          x: object.matrixWorld.elements[12] + position.x,
          y: object.matrixWorld.elements[13] + position.y,
          z: object.matrixWorld.elements[14] + position.z,
        };
      }
    }

    const tween = new Tween((<OrbitSupportEngine>engine).orbitControls.target)
      .to(position)
      .duration(params.duration)
      .delay(params.delay)
      .easing(timingFunction[params.timingFunction])
      .start();

    const renderFun = (event: RenderEvent) => {
      tween.update();
    };

    renderManager.addEventListener<RenderEvent>("render", renderFun);

    tween.onComplete(() => {
      renderManager.removeEventListener<RenderEvent>("render", renderFun);
      animating = false;
    });
  };
};
