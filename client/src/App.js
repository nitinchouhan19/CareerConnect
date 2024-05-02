import { BrowserRouter as Router , Routes,Route } from 'react-router-dom';
import Register from './pages/Authentication/Register';
import Main from './pages/Main';
import Login from './pages/Authentication/Login';
import { DataContextProvider } from './contexts/DataContext';
import CreateJob from './pages/CreateJob';
import PostedJobs from './pages/PostedJobs';
import JobApplicants from './pages/JobApplicants';
import RegisterApplicant from './pages/Authentication/RegisterApplicant';
import Explore from './pages/ApplicantPages/Explore';
import JobInfo from './pages/ApplicantPages/JobInfo';
import './App.css';
import ApplicantLanding from './pages/ApplicantPages/ApplicantLanding';
import RecuiterLanding from './pages/RecuiterLanding';
import ApplicationStatus from './pages/ApplicantPages/ApplicationStatus';
import Test from './pages/Test';
import RecruiterJobInfo from './pages/RecruiterJobInfo';
import TakeTest from './pages/ApplicantPages/TakeTest';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    
    <DataContextProvider >
      <ChakraProvider>
      <Router>
        <Routes>
          <Route path = '/' element = {<Main />} />
          <Route path = '/recruiter/dashboard' element = {<RecuiterLanding />} />
          <Route path = '/recruiter/createjob' element = {<CreateJob />} />
          <Route path = '/recruiter/livejobs' element = {<PostedJobs />} />
          <Route path = '/recruiter/createtest/:id' element = {<Test />} />
          <Route path = '/recruiter/job/:id' element = {<RecruiterJobInfo />} />

          <Route path = '/applicant/dashboard' element = {<ApplicantLanding />} />
          <Route path = '/jobapplicants/:id' element = {<JobApplicants />} />
          <Route path = '/applicant/explore' element = {<Explore />} />
          <Route path = '/applicant/job/:id' element = {<JobInfo />} />
          <Route path = '/applicant/taketest/:id' element = {<TakeTest />} />
          <Route path = '/applicant/applications' element = {<ApplicationStatus />} />

          <Route path = '/auth/register/applicant' element = {<RegisterApplicant />} />
          <Route path = '/auth/register' element = {<Register />} />
          <Route path = '/auth/login' element = {<Login />} />
        </Routes>
      </Router>
      </ChakraProvider>
    </DataContextProvider>
  );
}

export default App;
