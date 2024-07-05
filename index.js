const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const DB = require("./HelpingFunctions/database");
const path = require('path');
require("dotenv").config()
require('express-async-errors');

// create express app
const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

// Increase request size limit to 5MB
app.use(bodyParser.json({ limit: '25mb' }));


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//Socket IO

const http = require("http").Server(app);
const io = require("socket.io")(http);



//Routes
const AuthRoutes = require('./routes/auth');
const ExerciseDietRoutes = require('./routes/exerciseDiet');
const ChatRoutes = require('./routes/chat')
const MessageRoutes = require('./routes/message')
const AdminRoutes = require('./routes/admin')
const TrainerRoutes = require('./routes/trainer')
const VideoRoutes = require('./routes/video')
const SubscriptionRoutes = require('./routes/subscription')

app.use(express.json());

app.use('/user', AuthRoutes)

app.use('/exerciseDiet', ExerciseDietRoutes)

app.use('/subscription', SubscriptionRoutes)

app.use('/video', VideoRoutes)

app.use('/chat', ChatRoutes)

app.use('/message', MessageRoutes)

app.use('/admin', AdminRoutes)

app.use('/trainer', TrainerRoutes)

// app.use('/api/payment', PaymentRoutes)

// app.use('/api/systemSetting', SystemSettingRoutes)

app.get('/', (req, res) => {
  res.send('Hey Got you')
})

// Schedule weekly plans
const {scheduleWeeklyPlans, scheduleExpiredSubscriptionsCleanup} = require('./scheduler/ScheduleWeeklyPlan');
scheduleExpiredSubscriptionsCleanup();
scheduleWeeklyPlans();

//Middleware
//error handler

const notFoundMiddleware = require('./middleware/not-found');
const errorhandlerFunc = require('./middleware/error-handler');

app.use(notFoundMiddleware);

app.use(errorhandlerFunc);

const port = process.env.PORT || 4001;

app.listen(port, async () => {
  await DB(process.env.MONGO_URI);
  console.log(`Server is listening on port ${port}`);
});



let activeUsers = []

io.on("connection", (socket)=>{
    socket.on('new-user-add', (newUserId)=>{
        
        if(!activeUsers.some((user)=> user.userId === newUserId)){
            
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }

        console.log('connected Users', activeUsers);
        io.emit('get-users', activeUsers)
    })

    //sendMessage
    socket.on('send-message', (data)=>{
        const {receiverId} = data
        const user = activeUsers.find((user)=> user.userId === receiverId)
        console.log('send message from socket to', receiverId);

        if(user){
            io.to(user.socketId).emit('receive-message', data)
        }
    })

    socket.on('disconnect', ()=>{
        activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id)
        console.log('User Disconnected', activeUsers);
        io.emit('get-users', activeUsers)
    })

    socket.on("typing", (data) => {
        const { senderId, chatId, isTyping, receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
    
        if (user) {
          io.to(user.socketId).emit("user-typing", { senderId, chatId, isTyping });
        }
    });

})

io.listen(8000, {
    cors: {
        origin: "*",
    },
});

