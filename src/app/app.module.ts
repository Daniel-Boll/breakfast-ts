import { Module } from "../breakfast-ts/decorators";
import { AppController } from "./app.controller";
import { AppUseCase } from "./app.use-case";

@Module({
  usecases: [AppUseCase],
  controllers: [AppController],
})
export class AppModule {}
