import { EventDispatcher } from "@vis-three/core";
import { Raycaster, } from "three";
export var EVENTNAME;
(function (EVENTNAME) {
    EVENTNAME["POINTERDOWN"] = "pointerdown";
    EVENTNAME["POINTERUP"] = "pointerup";
    EVENTNAME["POINTERMOVE"] = "pointermove";
    EVENTNAME["POINTERENTER"] = "pointerenter";
    EVENTNAME["POINTERLEAVE"] = "pointerleave";
    EVENTNAME["CLICK"] = "click";
    EVENTNAME["DBLCLICK"] = "dblclick";
    EVENTNAME["CONTEXTMENU"] = "contextmenu";
})(EVENTNAME || (EVENTNAME = {}));
export class EventManager extends EventDispatcher {
    constructor(parameters) {
        super();
        /**不会触发事件的过滤器 */
        this.filter = new Set();
        /**递归子物体 */
        this.recursive = false;
        /**事件穿透 */
        this.penetrate = false;
        /**@todo 以事件冒泡的形式触发事件 */
        this.propagation = false;
        /**@todo 以事件委托的形式触发事件 */
        this.delegation = false;
        this.raycaster = new Raycaster();
        this.camera = parameters.camera;
        this.scene = parameters.scene;
        parameters.recursive && (this.recursive = parameters.recursive);
        parameters.penetrate && (this.penetrate = parameters.penetrate);
        if (parameters.raycaster) {
            Object.assign(this.raycaster.params, parameters.raycaster.params);
        }
    }
    /**
     * 设置当前场景
     * @param scene
     * @returns
     */
    setScene(scene) {
        this.scene = scene;
        return this;
    }
    /**
     * 设置当前相机
     * @param camera
     * @returns
     */
    setCamera(camera) {
        this.camera = camera;
        return this;
    }
    /**
     * 添加不会触发事件的场景中的物体
     * @param object Object3D
     * @returns
     */
    addFilterObject(object) {
        this.filter.add(object);
        return this;
    }
    /**
     * 移除过滤器中的物体
     * @param object Object3D
     * @returns this
     */
    removeFilterObject(object) {
        this.filter.delete(object);
        return this;
    }
    intersectObject(mouse) {
        this.raycaster.setFromCamera(mouse, this.camera);
        const filter = this.filter;
        const filterScene = this.scene.children.filter((object) => !filter.has(object));
        return this.raycaster.intersectObjects(filterScene, this.recursive);
    }
    /**
     * 使用pointerManger
     * @param pointerManager
     * @returns
     */
    use(pointerManager) {
        const mergeEvent = function (event, object) {
            return Object.assign({}, event, object);
        };
        const genericEventHandler = (event, eventName) => {
            const intersections = this.intersectObject(event.mouse);
            if (intersections.length) {
                // 穿透事件
                if (this.penetrate) {
                    for (const intersection of intersections) {
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: eventName,
                            intersection,
                        }));
                    }
                    // 单层事件
                }
                else {
                    const intersection = intersections[0];
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: eventName,
                        intersection,
                    }));
                }
            }
            // 全局事件代理
            this.dispatchEvent(mergeEvent(event, {
                type: eventName,
                intersections,
            }));
        };
        const genericEvents = [
            "pointerdown",
            "pointerup",
            "mousedown",
            "mouseup",
            "pointermove",
            "click",
            "dblclick",
            "contextmenu",
        ];
        for (const name of genericEvents) {
            pointerManager.addEventListener(name, (event) => {
                genericEventHandler(event, name);
            });
        }
        const cacheObjectMap = new Map();
        let topCacheIntersection = null;
        pointerManager.addEventListener("pointermove", (event) => {
            const intersections = this.intersectObject(event.mouse);
            // 穿透触发
            if (this.penetrate) {
                // 无交集触发离开，清空缓存
                if (!intersections.length) {
                    cacheObjectMap.forEach((intersection) => {
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: "pointerleave",
                            intersection,
                        }));
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: "mouseleave",
                            intersection,
                        }));
                    });
                    cacheObjectMap.clear();
                    return;
                }
                for (const intersection of intersections) {
                    // 缓存中存在的物体触发move
                    if (cacheObjectMap.has(intersection.object)) {
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: "pointermove",
                            intersection,
                        }));
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: "mousemove",
                            intersection,
                        }));
                        cacheObjectMap.delete(intersection.object);
                    }
                    else {
                        // 缓存中没有物体触发enter
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: "pointerenter",
                            intersection,
                        }));
                        intersection.object.dispatchEvent(mergeEvent(event, {
                            type: "mouseenter",
                            intersection,
                        }));
                    }
                }
                // 缓存中剩下的物体触发leave
                for (const intersection of cacheObjectMap.values()) {
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: "pointerleave",
                        intersection,
                    }));
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: "mouseleave",
                        intersection,
                    }));
                }
                // 重新记录缓存
                cacheObjectMap.clear();
                for (const intersection of intersections) {
                    cacheObjectMap.set(intersection.object, intersection);
                }
            }
            else {
                // 没交集
                if (!intersections.length) {
                    // 有缓存触发leave
                    if (topCacheIntersection) {
                        topCacheIntersection.object.dispatchEvent(mergeEvent(event, {
                            type: "pointerleave",
                            intersection: topCacheIntersection,
                        }));
                        topCacheIntersection.object.dispatchEvent(mergeEvent(event, {
                            type: "mouseleave",
                            intersection: topCacheIntersection,
                        }));
                        topCacheIntersection = null;
                    }
                    return;
                }
                const intersection = intersections[0];
                // 没缓存触发enter 并缓存
                if (!topCacheIntersection) {
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: "pointerenter",
                        intersection,
                    }));
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: "mouseenter",
                        intersection,
                    }));
                    topCacheIntersection = intersection;
                    return;
                }
                // 如何当前与缓存不一致触发缓存leave 触发当前enter 缓存
                if (intersection.object !== topCacheIntersection.object) {
                    topCacheIntersection.object.dispatchEvent(mergeEvent(event, {
                        type: "pointerleave",
                        intersection,
                    }));
                    topCacheIntersection.object.dispatchEvent(mergeEvent(event, {
                        type: "mouseleave",
                        intersection,
                    }));
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: "pointerenter",
                        intersection,
                    }));
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: "mouseenter",
                        intersection,
                    }));
                    topCacheIntersection = intersection;
                    return;
                }
                // 一致触发move
                if (intersection.object === topCacheIntersection.object) {
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: "pointermove",
                        intersection,
                    }));
                    intersection.object.dispatchEvent(mergeEvent(event, {
                        type: "mousemove",
                        intersection,
                    }));
                }
            }
            this.dispatchEvent(mergeEvent(event, {
                type: "pointermove",
                intersections,
            }));
            this.dispatchEvent(mergeEvent(event, {
                type: "mousemove",
                intersections,
            }));
        });
        return this;
    }
}
