import { Injectable } from "../breakfast-ts/decorators";

@Injectable()
export class AppUseCase {
  public execute(): string {
    return "Hello from the app use case!";
  }
}
