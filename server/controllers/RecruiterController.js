const AddressModel = require('../models/AddressModel');
const ApplicantModel = require('../models/ApplicantModel');
const ApplicationModel = require('../models/ApplicationModel');
const JobModel = require('../models/JobModel');
const RecruiterModel = require('../models/RecruiterModel');
const UserModel = require('../models/UserModel');
const TestModel = require('../models/TestModel');
const ResultModel = require('../models/ResultModel')
const QuestionModel = require('../models/QuestionModel');
const fs = require('fs');
const path = require('path');

module.exports.createjob = async(req,res) => {
    const { recruiterId , title , skillsArray , jobDescriptionArray , location , maxApplicant , jobtype , jobTag , qualification , vacancy , salary , yearsOfExperience } = req.body;

    try{
        const recruiter = await UserModel.findOne({ _id : recruiterId }).populate([
            {
                path : 'recruiterInfo',
                model : RecruiterModel,
                populate : {
                    path : 'address',
                    model : AddressModel,
                }
            }
        ])

        const newJob = JobModel.create({
            recruiterId : recruiter._id,
            title : title ,
            maxApplicant : maxApplicant ,
            jobDescription : jobDescriptionArray,
            location : location,
            vacancy : vacancy,
            skillsets : skillsArray,
            jobTag : jobTag,
            jobtype : jobtype ,
            qualification : qualification,
            salary : salary,
            yearsOfExperience : yearsOfExperience,
        })
        if( newJob ){
            res.status(200).send({ message : 'Job Added Successfully' });
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


module.exports.getJobs = async(req,res) =>{
    const recruiterId = req.params.recruiterId;
    try{
        const jobs = await JobModel.find({ recruiterId : recruiterId }).populate([
            {
                path : 'recruiterId',
                model : UserModel,
                populate : {
                    path : 'recruiterInfo',
                    model : RecruiterModel,
                    populate :{
                        path : 'address',
                        model : AddressModel,
                    }
                }
            }
        ])
        
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


module.exports.getApplicants = async(req,res) =>{
    const jobId = req.params.jobId;

    try{
        const applications = await ApplicationModel.find({jobId : jobId }).populate([
            {
                path : 'applicantId',
                model : UserModel,
                select: '-password -role -recruiterInfo -address -skills -bio',
                populate : {
                    path : 'applicantInfo',
                    model : ApplicantModel,
                }
            }
        ]).select(' -jobId -updatedAt ');
        const testInfo = await TestModel.findOne({ jobId : jobId })
        if(testInfo){
            const resultInfo = await ResultModel.find({ testId : testInfo._id})
            if( resultInfo ){
                res.status(200).json({ applications ,resultInfo });
            }
            else{
                res.status(500).send({ message : 'Error Fetching Results' });
            }
        }
        if(applications){
            res.status(200).json({ applications  });
        }
        else{
            res.status(500).send({ message : 'Error Fetching Applicants' });
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({ error: 'Server Error' });
        throw new Error("Internal Server Error")
    }
}

module.exports.getApplicantsResume = async(req,res) =>{

     const filename = req.params.resumefile;
     const filePath = path.join(path.dirname(__dirname), 'uploads', filename); 
     fs.access(filePath, fs.constants.F_OK, (err) => {
         if (err) {
             res.status(404).send('File not found');
             return;
         }
 
         const fileStream = fs.createReadStream(filePath);
         fileStream.pipe(res);
     });
}

module.exports.updateApplicationStatus = async(req,res) =>{
    const { applicationId , status } = req.body;
    
    try{
        const result = await ApplicationModel.findByIdAndUpdate(
            { _id : applicationId },
            { $set : { status : status }}
        )
        if(result){
            res.status(200).send({message : 'Successfully Changes Status'});
        }
        else{
            res.status(500).send({ message : 'Error Updating Application' });
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({ error: 'Server Error' });
        throw new Error("Internal Server Error")
    }

}

module.exports.deleteJob = async(req, res) => {
    const jobId = req.params.id;
    try{
        const applications = await ApplicationModel.deleteMany({jobId : jobId });
        console.log(applications);
        const result = await JobModel.findByIdAndDelete({ _id : jobId });
         if( result ){
            res.status(200).send({ message : 'Deleted Successfully' });
         }
         else{
            res.status(500).send({ message : 'Error Getting Application' });
         }
    }
    catch(error){
        console.log(error);
        res.status(400).json({ error: 'Server Error' });
        throw new Error("Internal Server Error")
    }
}

module.exports.getPostedJobInfo = async(req,res) =>{
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
            const testInfo = await TestModel.findOne({ jobId : jobInfo._id });
            if(testInfo){
                const questions = await QuestionModel.find({ testId : testInfo._id });
                if(questions){
                    res.status(200).json({ jobInfo , testInfo,questions});
                }
                else  res.status(200).json({ jobInfo , testInfo : testInfo , questions : [] });
            }
            else res.status(200).json({ jobInfo , testInfo : null });
        }
        else{
            res.status(500).send({ message : 'Error Creating Job' });
        }
    }
    catch(error){
        console.log(error);
        res.status(400).json({ error: 'Server Error' });
        throw new Error("Internal Server Error")
    }
}

module.exports.createTest = async(req,res) => {
    const { jobId , test, questions} = req.body;

    try{
        const testInfo = await TestModel.create({
            jobId : jobId,
            title : test.title,
            eligibleCandidates :[],
            description : test.description,
            timing : test.timing,
        })
        if( testInfo){
            const updatedquestions = questions.map(question => ({
                ...question,
                testId: testInfo._id,
            }));
            const questionsInfo = await QuestionModel.insertMany(updatedquestions);
            if( questionsInfo){
                res.status(200).send({ message : 'Successfully created Test'})
            }
            else{
                res.status(500).send({ message : 'Error adding Questions' });
            }
        }
        else{
            res.status(500).send({ message : 'Error Creating Test.' });
        }

    }
    catch(error){
        console.log(error);
        res.status(400).json({ error: 'Server Error' });
        throw new Error("Internal Server Error")
    }
}