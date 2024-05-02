const router = require('express').Router();
const { verifyUser } = require('../middleware/verifyUser.js')
const { exploreJobs, getJobInfo, applyJob, getApplications, deleteApplication, takeTest, submitTest } = require('../controllers/ApplicantController.js');
const { registerRecruiter , authenticateRecruiter, registerApplicant, authenticateApplicant } = require('../controllers/AuthController.js');
const { createjob , getJobs, getApplicants, getApplicantsResume, updateApplicationStatus, deleteJob, getPostedJobInfo, createTest } = require('../controllers/RecruiterController.js');

router.post('/api/auth/register',registerRecruiter);
router.post('/api/auth/login/recruiter',authenticateRecruiter);

router.post('/api/auth/register/applicant',registerApplicant);
router.post('/api/auth/login/applicant',authenticateApplicant);

router.post('/createjob',verifyUser, createjob);
router.get('/getJobs/:recruiterId', getJobs);
router.get('/getapplicants/:jobId', getApplicants);
router.get('/getapplicants/resume/:resumefile', getApplicantsResume);
router.put('/recruiter/update/applicationstatus',verifyUser, updateApplicationStatus);
router.delete('/recruiter/jobs/delete/:id',verifyUser, deleteJob);
router.get('/recruiter/getjobInfo/:id', getPostedJobInfo);
router.post('/recruiter/createtest',verifyUser, createTest);





router.get('/applicant/getjobs', exploreJobs);
router.get('/applicant/getjobInfo/:id', getJobInfo);
router.get('/applicant/getapplications/:id', getApplications);
router.get('/applicant/taketest/:id', takeTest);
router.post('/applicant/submitTest',verifyUser, submitTest);
router.delete('/applicant/getapplications/delete/:id', deleteApplication);



const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    req.customData = uniqueSuffix + file.originalname;
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/applicant/job/apply',verifyUser,upload.single("resume"), applyJob);

module.exports = router ;