const TuyAPI = require('tuyapi');
const express = require('express')
var app = express();
var server = require('http').Server(app);

app.get('/tuya/switch', (req, res) => {
  
  switchNumber = req.query.switch
  state = req.query.state
  deviceid = req.query.deviceid
  devicekey = req.query.devicekey
  version = req.query.version

  console.log(deviceid, devicekey, version)

  if (deviceid == undefined || devicekey == undefined || version == undefined){
    res.send('Device ID/ Device Key/ version is missing')
  }

  const device = new TuyAPI({
    //id: '44536070b4e62d127f6c',
    id: deviceid,
    //key: 'e6ed32406cd6d82d',
    key: devicekey,
    //version: '3.3'
    version: version
  });

  console.log(state, switchNumber)
  
  if (state=='on' || state == 'true'){
    state = true
  }
  else if(state=='off' || state=='false'){
    state=false
  }
  else{
    res.send('state params can be (true/false) or (on/off)')
  }

  if (switchNumber < 1 || switchNumber > 3){
    res.send('Switch number can be in range: (1-3)' )
  }

  dothis(device, switchNumber, state, res)
  // Disconnect after 10 seconds
  setTimeout(() => { 
    }, 10000);
})

function dothis(device, switchNumber, state, res){
  let stateHasChanged = false;
  device.find().then(() => {
    // Connect to device
    console.log('here')
    device.connect().then(()=>{
    if (!stateHasChanged && !(res.headersSent)) {
      console.log('state',state)
      console.log('switchNumber',switchNumber)
      device.set({dps:parseInt(switchNumber),set: state});
  
      stateHasChanged = true;
      res.send({'code': 200,
              'status': 'actions is performed'
            })
    }
    device.disconnect();
    if (!(res.headersSent)){
      res.send({'code': 400,
              'status': 'device is disconnected'});
    }
  })
  });

  /*device.on('connected', () => {
    console.log('Connected to device!');
  });*/

  console.log(res.headersSent)
  
  device.on('disconnected', () => {
    console.log('Disconnected from device.');
  });
  
  device.on('error', error => {
    console.log('Error!', error);
    res.send(error)
  });
  device.on('data', data => {

    // Set default property to opposite
    
    //device.disconnect()
  });
  
}

server.listen(3050)