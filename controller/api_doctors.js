const repo = require('../repositories/api_doctors')

exports.getDoctors = (req,res)=>{
    repo.show((data)=>{
        res.send(data);
    });
}

exports.getDoctorsById = (req,res)=>{
    const id = req.params.id;
    repo.showById(id,(data)=>{
        res.send(data);
    });
}

exports.getAvailability = (req,res)=>{
    const id = req.params.id;
    const day = req.query.day;
    repo.showAvailability(id,day,(data)=>{
        res.send(data);
    })
}

exports.bookSlot = (req,res)=>{
    const { doctor_id, appointment_day, appointment_time } = req.body;
    repo.bookSlot(doctor_id,appointment_day,appointment_time,(data)=>{
        res.send(data);
    })

}