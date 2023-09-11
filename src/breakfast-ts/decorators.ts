import "reflect-metadata";

export const CONTROLLER_KEY = Symbol("controller");
export const METHOD_KEY = Symbol("method");
export const ROUTE_KEY = Symbol("route");
export const MODULE_KEY = Symbol("module");
export const INJECTABLE_KEY = Symbol("injectable");

export function Controller(prefix: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_KEY, prefix, target);
  };
}

export function Module(options: {
  usecases: any[];
  controllers: any[];
}): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(MODULE_KEY, options, target);
  };
}

export function Injectable(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(INJECTABLE_KEY, true, target);
  };
}

function Route(method: string, route: string): MethodDecorator {
  return (target, propertyKey) => {
    Reflect.defineMetadata(METHOD_KEY, method, target, propertyKey as string);
    Reflect.defineMetadata(ROUTE_KEY, route, target, propertyKey as string);
  };
}

export function Get(route: string = "/"): MethodDecorator {
  return Route("get", route);
}

export function Post(route: string = "/"): MethodDecorator {
  return Route("post", route);
}
