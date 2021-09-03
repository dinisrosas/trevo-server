"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    await app.listen(3333);
    const url = (await app.getUrl()).replace("[::1]", "localhost");
    console.log(`Application is running on: ${url}`);
}
bootstrap();
//# sourceMappingURL=main.js.map