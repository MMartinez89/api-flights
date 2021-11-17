import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        mongo: {
            uri: process.env.MONGO_URI
        }
    }
})