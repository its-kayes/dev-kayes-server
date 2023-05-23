import mongoose, { ConnectOptions } from 'mongoose';
import app from './app';

import { MONGO_URI, PORT } from './config/siteEnv';

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
        console.log('DB Connected!');
        app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
    })
    .catch((error) => {
        console.error(error);
    });
