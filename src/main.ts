import { BreakfastFactory } from "./breakfast-ts";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = BreakfastFactory.create(AppModule);

  await app.listen(3000);
}

bootstrap();
