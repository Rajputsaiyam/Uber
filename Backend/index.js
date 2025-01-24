const http = require('http');
const expressApplication = require('./app/index');
const connectMongoDB = require('./models/index');
const PORT=process.env.PORT ?? 8000;
require('dotenv').config(); // Load environment variables from a .env file

const uri = process.env.MONGO_URI;


async function init(){
    try{
        await connectMongoDB(process.env.MONGODB_URI);
        console.log("Mongo db is connected");
        const server = http.createServer(expressApplication);

        server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    }catch(err){
        console.error('Error at starting server ', err);
        process.exit(1);
    }
}

init();

//1:25:00
