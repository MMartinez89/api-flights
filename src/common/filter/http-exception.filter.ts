import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { stringify } from "querystring";

@Catch()
 export class AllExceptionFilter implements ExceptionFilter{

    //ver error en consola
    private readonly Logger = new Logger(AllExceptionFilter.name)
  
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();

        //status
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        //message
        const msg = exception instanceof HttpException ? exception.getResponse() : exception;

        this.Logger.error(`status ${status} Error: ${JSON.stringify(msg)}`);
        

        response.status(status).json({
            time: Date().toString(),
            path: request.url,
            error: msg
        });
    }

}

