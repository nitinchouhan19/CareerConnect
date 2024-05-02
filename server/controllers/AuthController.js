const bcrypt = require('bcrypt');
const AddressModel = require('../models/AddressModel');
const UserModel = require('../models/UserModel');
const RecruiterModel = require('../models/RecruiterModel.js');
const ApplicantModel = require('../models/ApplicantModel.js');
const generateToken = require('../config/generateToken.js')


module.exports.registerRecruiter = async (req, res) => {
    const { email, password, companyName, area, city, state, zipcode } = req.body;
  
    try {
      const isEmailUnique = await UserModel.findOne({ email: email });

      if (isEmailUnique) { 
        return res.status(400).json({ error: 'Email Already in Use' });
      } 
      const hashedPassword = await bcrypt.hash(password, 5);

      const userAddress = await AddressModel.create({ area: area, city: city, state: state, zipcode: zipcode });
      const recruiterInfo = await RecruiterModel.create({ companyName: companyName, bio : null , address : userAddress._id })

      const user = await UserModel.create({
        email: email,
        password: hashedPassword,
        role : 'recruiter',
        recruiterInfo : recruiterInfo._id,
        applicantInfo : null ,
      });

      if (user) {
          
        const userInfo = await UserModel.findOne({ _id : user._id }).populate([
            {
                path : 'recruiterInfo',
                model : RecruiterModel,
                populate : {
                    path : 'address',
                    model : AddressModel,
                }
            }
          ])
          res.status(200).json({
            userInfo : {
                _id : userInfo._id,
                email : userInfo.email,
                companyName : userInfo.recruiterInfo.companyName,
                address : userInfo.recruiterInfo.address ,
                role : 'recruiter',
            },
            token: generateToken(user._id),
          })
      }
      else {
          throw new Error("Failed to create your account! Please try again");
      }
    } 
    catch (error) {
      return res.status(400).json({ error: 'Server Error' });
    }
};


module.exports.authenticateRecruiter = async (req,res) =>{
    const { email , password } = req.body;
    console.log(email);

    try{
      const user = await UserModel.findOne({ email: email}).populate([
        {
            path : 'recruiterInfo',
            model : RecruiterModel,
            populate : {
                path : 'address',
                model : AddressModel,
            }
        }
      ]);

      if(!user){
        res.status(401).json({ message : "Invalid email or password"})
        return ;
      }

      const isValid = await bcrypt.compare(password,user.password);

      if(isValid){
          console.log(user.first_name)
          res.status(201).json({
            userInfo : {
                _id : user._id,
                email : user.email,
                companyName : user.recruiterInfo.companyName,
                address : user.recruiterInfo.address ,
                role : 'recruiter',
            },
            token: generateToken(user._id),
        });
      }else{
        res.status(401).json({ message: 'Invalid email or password' });
      }
    }catch(error){
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
     
};

module.exports.authenticateApplicant = async (req,res) =>{
  const { email , password } = req.body;
  try{
    const userInfo = await UserModel.findOne({ email: email}).populate([
      {
          path : 'applicantInfo',
          model : ApplicantModel,
          populate : {
              path : 'address',
              model : AddressModel,
          }
      }
    ]);

    if(!userInfo){
      res.status(401).json({ message : "Invalid email "})
      return ;
    }

    const isValid = await bcrypt.compare(password,userInfo.password);
    if(isValid){
        console.log(userInfo)
        res.status(201).json({
          userInfo : {
            _id : userInfo._id,
            email : userInfo.email,
            firstName : userInfo.applicantInfo.firstName,
            lastName : userInfo.applicantInfo.lastName,
            skills : userInfo.applicantInfo.skills,
            bio : userInfo.applicantInfo.bio,
            address : userInfo.applicantInfo.address ,
            role : 'applicant',
          },
          token: generateToken(userInfo._id),
      });
    }else{
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }catch(error){
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
   
};



module.exports.registerApplicant = async (req, res) => {
  const { email , password, firstName , lastName , skillsArray ,bio ,area , city ,state , zipcode } = req.body;

  try {
    const isEmailUnique = await UserModel.findOne({ email: email });

    if (isEmailUnique) { 
      return res.status(400).json({ error: 'Email Already in Use' });
    } 
    const hashedPassword = await bcrypt.hash(password, 5);

    const userAddress = await AddressModel.create({ area: area, city: city, state: state, zipcode: zipcode });
    const applicantInfo = await ApplicantModel.create({ firstName : firstName , lastName : lastName , skills : skillsArray, bio : bio , address : userAddress._id })

    const user = await UserModel.create({
      email: email,
      password: hashedPassword,
      role : 'applicant',
      recruiterInfo : null ,
      applicantInfo : applicantInfo._id ,
    });

    if (user) {
        
      const userInfo = await UserModel.findOne({ _id : user._id }).populate([
          {
              path : 'applicantInfo',
              model : ApplicantModel,
              populate : {
                  path : 'address',
                  model : AddressModel,
              }
          }
        ])
        res.status(200).json({
          userInfo : {
              _id : userInfo._id,
              email : userInfo.email,
              firstName : userInfo.applicantInfo.firstName,
              lastName : userInfo.applicantInfo.lastName,
              skills : userInfo.applicantInfo.skills,
              bio : userInfo.applicantInfo.bio,
              address : userInfo.applicantInfo.address ,
              role : 'applicant',
          },
          token: generateToken(userInfo._id),
        })
    }
    else {
        res.status(400).json({ error: 'Server Error' });
        throw new Error("Failed to create your account! Please try again");
    }
  } 
  catch (error) {
    return res.status(400).json({ error: 'Server Error' });
  }
};
