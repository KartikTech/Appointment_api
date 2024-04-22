const mongodb = require('../config/mongodb')
const ObjectId = require('mongodb').ObjectId;

exports.show = (callback)=>{
    const collection = mongodb.getCollection("Doctor");
    collection.find({}).toArray()
        .then(
            (doctor)=>{
                callback(doctor);
            })
        .catch(
            err=>{
                console.log(err);
            }
        );
}

exports.showById = (id,callback)=>{
    const collection = mongodb.getCollection("Doctor");
    collection.findOne({"_id" :new ObjectId(id)})
        .then((res)=>{
            if(res==null){
                callback("Not Found !!");
            }
            else{
                callback(res);
            }
        })
        .catch((err)=>console.log(err));
}

exports.showAvailability = (id,day,callback)=>{
    const collection = mongodb.getCollection("Doctor");
    collection.findOne({"_id" :new ObjectId(id)})
        .then((res)=>{
            if(res==null){
                callback("Not Found !!");
            }
            else{
                var data = {
                        "doctor_id": res._id,
                        "doctor_name": res.name,
                        "day": day,
                        "available_slots": res.available_days[day]
                }
                callback(data);
            }
        })
        .catch((err)=>console.log(err));
}

exports.bookSlot = (id,day,time,callback)=>{
    const collection = mongodb.getCollection("Doctor");
    collection.findOne({"_id" :new ObjectId(id)})
    .then((res)=>{
        if(res==null){
            callback("Not Found !!");
        }
        if(res.available_days[day]){
            if(res.available_days[day].includes(time)){
                collection.findOneAndUpdate({"_id":new ObjectId(id)}, {
                    $pull: { [`available_days.${day}`]: time }
                  }, { returnOriginal: false });
            var data = {
                "doctor_id": res._id,
                "doctor_name": res.name,
                "appointment_day": day,
                "appointment_time":time
            }
            callback({
                "message":"Appointment booked successfully",
                "details":data
            })
            }
            else{
                callback({
                    "message":"Slot not available"
                })
            }
        }
        else{
            callback({
                "message":"Slot not available"
            })
        }
    })
    .catch((err)=>console.log(err));
}
