import { Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from '../config';

import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  //* readonly MONGO_URI = this.configService.get<string>('MONGO_URI');
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  createMongooseOptions(): MongooseModuleOptions {
    try {
      return {
        uri: this.configService.mongo.uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as MongooseModuleOptions;
    } catch (err) {
      throw new Error(err);
    }
  }
}
