declare module "*.md";

declare module "mapbox" {
  export interface MapboxClient {
    new (n: OptionsShape): void;
    geocodeForward: (...args: any) => any;
  }
  export class MapboxClient {
    constructor(n: OptionsShape);
  }
  export default MapboxClient;
}
