const mongoose = require('mongoose');
const fetchData = require('./fetchData');
const Violator = require('./models/violator');
const socketIO = require('socket.io')
require("dotenv").config();

const io = socketIO(5000, {
  cors: {
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["content-type"]
  },
});


// Connect to database
const dbURL = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@cluster0.kpgcpls.mongodb.net/perimeterDB?retryWrites=true&w=majority`
mongoose.set('strictQuery', true);
mongoose.connect(dbURL).then(() => {updateDB(null)})


// Establish socket connection to client(s)
io.on('connection', () => {
  Violator.find().sort({ timestamp: -1 })
    .then(violators => {
      fetchData.droneData().then(alldrones => {
        io.emit('data', violators, alldrones)
      })
    })
})


function updateDB(lastResponse) {

    // Send data to frontend 
    Violator.find().sort({ timestamp: -1 })
      .then(violators => {
        fetchData.droneData().then(alldrones => {
          io.emit('data', violators, alldrones)
        })
      })
    

    fetchData.droneData().then(res => { 
        
      if (JSON.stringify(lastResponse) != JSON.stringify(res) && res != null){

        res.map((drone) => {

          // Calcuöate if drone is inside NDZ
          
          const x = drone.positionX[0]
          const y = drone.positionY[0]

          const distanceFromCenter = Math.sqrt((x - 250000) ** 2 + (y - 250000) ** 2) 

          if (distanceFromCenter <= 100000){

  
            fetchData.pilotData(drone.serialNumber[0]).then((pilot) => {

              // Update drone document or create new one if it doesn't exist yet
              Violator.findOneAndUpdate({droneSerialNumber: drone.serialNumber[0]}, {
              $set:{
              timestamp: new Date(), 
              FirstName: pilot.firstName,
              LastName: pilot.lastName,
              PhoneNumber: pilot.phoneNumber,
              Email: pilot.email},
              $min:{
              distance: (distanceFromCenter / 1000).toFixed(3)}},
              {upsert: true}, (error) => {
                if (error) {console.log(error)}
              })  
            })        
          }
        })
      }
      return res;
    })

      // Run the function again (endless update data loop)
      .then(res => updateDB({lastResponse: res}))
      .catch(error => { console.log(error) })
  }
  

    

