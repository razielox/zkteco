const zklib = require('zklib')

const ZK = new zklib({
    ip: '10.10.2.22',
    port: 4370,
    inport: 5200,
    timeout: 5000,
})

// connect to access control device
ZK.connect(function(err) {
    if (err) throw err;
  
    // read the time info from th device
   

  /*   ZK.getUser((err, d) => {
        
        ZK.disconnect()
        if(err) throw err;
        const userdata = d.filter(user => user.userid == 6690 )

        console.log(userdata)

        //console.log(JSON.stringify(d))
    }) */
    ZK.getTime((err,d) => {
        ZK.disconnect()
        if(err) throw err;
        console.log(d)
    })
    // ZK.getAttendance((err ,d) => {
        
    //     if(err) throw err;
    //     console.log(d)
        
    // })
});

