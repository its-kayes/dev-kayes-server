import mongoose, { ConnectOptions } from 'mongoose';
import app from './app.js';

import { MONGO_URI, PORT } from './config/siteEnv.js';

mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
        console.log('DB Connected!');
        app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
    });
