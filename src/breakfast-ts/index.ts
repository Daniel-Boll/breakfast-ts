import "reflect-metadata";

import Elysia from "elysia";
import {
  CONTROLLER_KEY,
  METHOD_KEY,
  MODULE_KEY,
  ROUTE_KEY,
} from "./decorators";

export class BreakfastFactory {
  private app: Elysia;

  static create(module: any) {
    const factory = new BreakfastFactory();

    // Fetch metadata from the AppModule
    const moduleMetadata = Reflect.getMetadata(MODULE_KEY, module);

    // Create an instance of the providers
    const instances = moduleMetadata.usecases.map(
      (provider: any) => new provider(),
    );

    // Get controllers and add routes to Elysia
    moduleMetadata.controllers.forEach((Controller: any) => {
      const prefix = Reflect.getMetadata(CONTROLLER_KEY, Controller);
      const controller = new Controller(...instances);

      Object.getOwnPropertyNames(Object.getPrototypeOf(controller)).forEach(
        (property) => {
          if (property !== "constructor") {
            const method = Reflect.getMetadata(
              METHOD_KEY,
              controller,
              property,
            );
            const route = Reflect.getMetadata(ROUTE_KEY, controller, property);

            if (route && method !== null) {
              console.log(
                `🍳🥓☕ Adding route ${method.toUpperCase()} ${prefix}${route}`,
              );
              // @ts-ignore
              factory.app[method](
                prefix + route,
                (req: any, res: any) => controller[property](req, res),
                {
                  type: "json",
                },
              );
            }
          }
        },
      );
    });

    return factory;
  }

  constructor() {
    this.app = new Elysia();
  }

  public async listen(port: number) {
    this.app.listen(port);
    console.log(`🦊 Elysia is running on port ${this.app.server?.port}...`);
  }
}
