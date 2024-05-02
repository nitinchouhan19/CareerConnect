const AddressModel = require('../models/AddressModel');
const JobModel = require('../models/JobModel');
const RecruiterModel = require('../models/RecruiterModel');
const UserModel = require('../models/UserModel');
const ApplicantModel = require('../models/ApplicantModel.js');
const multer = require('multer');
const ApplicationModel = require('../models/ApplicationModel.js');
const TestModel = require('../models/TestModel.js');
const QuestionModel = require('../models/QuestionModel.js');
const ResultModel = require('../models/ResultModel.js');


module.exports.exploreJobs = async(req,res) => {
    try{
        const jobs = await JobModel.find().populate([
            {
                path : 'recruiterId',
                model : UserModel,
                select : 'recruiterInfo',
                populate : {
                    path : 'recruiterInfo',
                    model : RecruiterModel,
                    populate :{
                        path : 'address',
                        model : AddressModel,
                    }
                }
            }
        ]).select('title recruiterId location salary jobTag jobtype');
        
        if(jobs){
            res.status(200).json({ jobs });
        }
        else{
            res.status(500).send({ message : 'Error Creating Job' });
        }
    }
    catch(error){
        console.log(error);
        throw new Error("Internal Server Error")
    }
}

module.exports.getJobInfo = async(req,res) =>{
    const _id = req.params.id;

    try{
        const jobInfo = await JobModel.findOne({ _id : _id }).populate([
            {
                path : 'recruiterId',
                model : UserModel,
                select : 'recruiterInfo',
                populate : {
                    path : 'recruiterInfo',
                    model : RecruiterModel,
                    populate :{
                        path : 'address',
                        model : AddressModel,
                    }
                }
            }
        ]).select('-jobTag');

        if(jobInfo){
            if(jobInfo.recommend ){
                const recommended_jobs = await JobModel.find({ uniqueId : { $in: jobInfo.recommend } }).populate([
                    {
                        path : 'recruiterId',
                        model : UserModel,
                        select : 'recruiterInfo',
                        populate : {
                            path : 'recruiterInfo',
                            model : RecruiterModel,
                            populate :{
                                path : 'address',
                                model : AddressModel,
                            }
                        }
                    }
                ]).select('title recruiterId location salary');
                if(recommended_jobs) res.status(200).json({ jobInfo : jobInfo , recommended_jobs : recommended_jobs });
                else res.status(200).json({ jobInfo : jobInfo  });
            }
            else res.status(200).json({ jobInfo : jobInfo  });
        }
        else{
            res.status(500).send({ message : 'Error Fetching Job' });
        }
    }
    catch(error){
        console.log(error);
        throw new Error("Internal Server Error")
    }
}


module.exports.applyJob = async (req, res) => {
    try{
    
        const { jobId , applicantId , sop  } = req.body;
        // console.log(jobId , applicantId)
        const fileName = req.customData;
    
        const application = await ApplicationModel.create({
            jobId : jobId,
            applicantId : applicantId,
            resume : fileName,
            sop : sop,
            status : 'applied',
        })
        if(application){
            res.status(200).send({ message : 'Applied Successfully.'})
        }
        else{
            res.status(500).send({ message : 'Error Creating Job' });
        }
    }
    catch(error){
        console.log(error);
        throw new Error("Internal Server Error")
    }
}

module.exports.getApplications = async(req, res) =>{
    const applicantId  = req.params.id;
    try{
        const applications = await ApplicationModel.find({ applicantId : applicantId}).populate([
            {
                path : 'jobId',
                model : JobModel,
                select : '_id title recruiterId',
                populate : {
                    path : 'recruiterId',
                    model : UserModel,
                    select : 'recruiterInfo',
                    populate : {
                        path : 'recruiterInfo',
                        model : RecruiterModel,
                        select : 'companyName',
                    }
                }
            }
        ]).select('-resume -sop');
        if( applications){
            const jobIds = applications.map(application => application.jobId._id);
            const testInfo = await TestModel.find({ jobId: { $in: jobIds } });
            const resultInfo = await ResultModel.find({ applicantId : applicantId}).populate({
                path : 'testId',
                model : TestModel,
                populate : {
                    path : 'jobId',
                    model : JobModel
                }
            })
            if( testInfo && resultInfo) res.status(200).json({ applications , testInfo , resultInfo})
            else if( testInfo ) res.status(200).json({ applications , testInfo })
            else res.status(200).json({ applications })
        }
        else{
            res.status(500).send({ message : 'Error Getting Application' });
        }
    }
    catch(error){
        console.log(error);
        throw new Error("Internal Server Error")
    }
}

module.exports.deleteApplication = async(req,res) => {
    const applicationId = req.params.id;
    try{
        
         const result = await ApplicationModel.findByIdAndDelete({ _id : applicationId });
         if( result){
            res.status(200).send({ message : 'Deleted Successfully' });
         }
         else{
            res.status(500).send({ message : 'Error Getting Application' });
         }
    }
    catch(error){
        console.log(error);
        throw new Error("Internal Server Error")
    }
}

module.exports.takeTest = async(req,res) => {
    const testId  = req.params.id;

    try{
        const testInfo = await TestModel.findOne({ _id : testId });
        if(testInfo){
            const questions = await QuestionModel.find({ testId : testInfo._id });
            if(questions){
                res.status(200).json({ testInfo , questions})
            }
            else{
                res.status(500).json({ message : "Error Getting Questions"})
            }
        }
        else{
            res.status(500).json({ message : "Error Getting Test Information"})
        }
    }
    catch(error){
        console.log(error);
        throw new Error("Internal Server Error")
    }
}

module.exports.submitTest = async(req,res) => {
    const  answers = req.body.answers;
    const  testId = req.body.testId;
    const  userId = req.body.userId;
    try{
        const userInfo = await UserModel.findOne({ _id : userId }).populate([
            {
                path : 'applicantInfo',
                model : ApplicantModel,
                populate : {
                    path : 'address',
                    model : AddressModel,
                }
            }
          ]);
        const testInfo = await TestModel.findOne({ _id : testId });
        if(testInfo && userInfo ){
            const questions = await QuestionModel.find({ testId : testInfo._id });
            if(questions){
                let total_points = 0 ;
                let marks_obtained = 0 ;
                questions.forEach(question =>{
                    total_points += question.points;
                    if( answers[question._id] === question.answer){
                        marks_obtained += question.points;
                    }
                })
                const results = await ResultModel.create({
                    applicantId : userId,
                    testId : testId,
                    total_marks : total_points,
                    marks_obtained : marks_obtained
                })
                if (results) res.status(200).json({ total_points , marks_obtained })
            }
            else{
                res.status(500).json({ message : "Error Getting Questions"})
            }
        }
        else{
            res.status(500).json({ message : "rror Getting Test or User Information Questions"})
        }
    }
    catch(error){
        console.log(error);
        throw new Error("Internal Server Error")
    }
}