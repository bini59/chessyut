var express = require('express');
var router = express.Router();

let room = [
]
router.get('/', (req, res)=>{
    
})

router.post('/', (req, res)=>{
    if( Object.keys(req.body).length != 0) room.push(req.body);

    res.json(JSON.stringify(room))
})



module.exports = router;