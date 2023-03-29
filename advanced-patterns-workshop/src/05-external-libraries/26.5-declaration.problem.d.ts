declare module "fake-animation-lib" {
  export function getAnimatingState():
    | "before-animation"
    | "animating"
    | "after-animation";
}
