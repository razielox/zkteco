const ZKLib = require('node-zklib')
const {COMMANDS} = require('./node_modules/node-zklib/constants.js')
const test = async () => {


    let zkInstance = new ZKLib('10.10.2.22', 4370, 10000, 4000);
    try {
        // Create socket to machine 
        await zkInstance.createSocket()


        // Get general info like logCapacity, user counts, logs count
        // It's really useful to check the status of device 
        console.log(await zkInstance.getInfo())
    } catch (e) {
        console.log(e)
        if (e.code === 'EADDRINUSE') {
        }
    }


    // Get users in machine 
    // const users = await zkInstance.getUsers()
    // console.log(users)


    // Get all logs in the machine 
    // Currently, there is no filter to take data, it just takes all !!
    const logs = await zkInstance.getAttendances()
    console.log(logs)


    const attendances = await zkInstance.getAttendances((percent, total)=>{
        // this callbacks take params is the percent of data downloaded and total data need to download 
    })

     // YOu can also read realtime log by getRealTimelogs function
  
    // console.log('check users', users)

    /* kInstance.getRealTimeLogs((data)=>{
        // do something when some checkin 
        console.log(data)
    }) */
    

    //const vcommand = await zkInstance.executeCmd(COMMANDS.CMD_RESTART,'')
    //console.log(vcommand)
    //const rebootCommand  =  await zkInstance.executeCmd(COMMANDS.CMD_RESTART,'')

    const parseTimeToDate = (time)=>{
      const second = time % 60;
      time = (time - second) / 60;
      const minute = time % 60;
      time = (time - minute) / 60;
      const hour = time % 24;
      time = (time - hour) / 24;
      const day = time % 31 + 1;
      time = (time - (day - 1)) / 31;
      const month = time % 12;
      time = (time - month) / 12;
      const year = time + 2000;
      console.log(second, minute, hour, day, month +1 , year)
      return new Date(year, month, day, hour, minute, second);
  }

    const command = await zkInstance.executeCmd(COMMANDS.CMD_GET_TIME,'')
    const timeBuff = command.readUint32LE(8) 
    const yearbuff = timeBuff
    const epoch = new Date(0)
    const newEpoch = new Date(epoch.setUTCSeconds(yearbuff))
    console.log(newEpoch)
  const year = parseTimeToDate(timeBuff)
  console.log(year, timeBuff, epoch)
    

    // delete the data in machine
    // You should do this when there are too many data in the machine, this issue can slow down machine 
    //zkInstance.clearAttendanceLog();
    
    // Get the device time
    

    // Disconnect the machine ( don't do this when you need realtime update :))) 
    await zkInstance.disconnect()

}

test()