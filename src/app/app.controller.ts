import { Controller, Get, Post } from "../breakfast-ts/decorators";
import { AppUseCase } from "./app.use-case";

@Controller("/api")
export class AppController {
  constructor(private appUseCase: AppUseCase) {}

  @Get()
  handleRequest(_req: any, _res: any) {
    return this.appUseCase.execute();
  }

  @Post("/data")
  handlePostRequest(req: any) {
    console.log(req.body);

    return "Okay";
  }
}
