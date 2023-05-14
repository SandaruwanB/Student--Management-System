import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from  'react-router-dom';
import Login from './components/login';
import FourzeroFour from './components/404';
import AdminHome from './components/admin/Home';
import Admins from './components/admin/Admins';
import AdminStudents from './components/admin/Students';
import AddStudent from './components/admin/addStudent';
import AddAdmin from './components/admin/addAdmin';
import AdminTeachers from './components/admin/Teachers';
import AddTeachers from './components/admin/addTeacher';
import EditAdmin from './components/admin/editAdmin';
import EditStudent from './components/admin/editStudent';
import EditTeachers from './components/admin/editTeacher';
import DeleteAdmin from './components/admin/deleteAdmin';
import StudentDelete from './components/admin/deleteStudent';
import TeacherDelete from './components/admin/deleteTeacher';
import ViewStudentData from './components/admin/viewStudent';
import ViewTeacherData from './components/admin/viewTeacher';
import ScanQR from './components/admin/qrScan';
import Qrcheck from './components/admin/qrCheck';
import AdminSettings from './components/admin/Settings';
import StudentHome from './components/student/Home';
import Certificates from './components/student/Certificates';
import StudentSettings from './components/student/Settings';
import StudentResults from './components/student/Results';
import StudentInfo from './components/student/Infor';
import TeacherHome from './components/teacher/Home';
import ShowStudents from './components/teacher/Students';
import ShowStudent from './components/teacher/Student';
import QrScan from './components/teacher/QrScan';
import TeacherDetails from './components/teacher/Infor';
import CheckQrStudent from './components/teacher/QrCheck';
import TeacherSettings from './components/teacher/Settings';
import AdminRoutesProtection from '../src/hooks/AdminRouteProtection';
import StudentRouteProtection from '../src/hooks/StudentRouteProtection';
import TecherRoutesProtection from '../src/hooks/TeacherRouteProtection';
import AuthCheck from '../src/hooks/AuthCheck';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path='*' element={<FourzeroFour/>}/>
          <Route element={<AuthCheck/>}>
            <Route path='/' element={<Login/>} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route element={<AdminRoutesProtection/>}>
            <Route path='/admin/dashboard' element={<AdminHome/>}/>
            <Route path='/admin/admins' element={<Admins/>} />
            <Route path='/admin/admins/add' element={<AddAdmin/>} />
            <Route path='/admin/admins/edit/:id' element={<EditAdmin/>} />
            <Route path='/admin/admins/delete/:id' element={<DeleteAdmin/>} />
            <Route path='/admin/settings' element={<AdminSettings/>}/>
            <Route path='/admin/students' element={<AdminStudents/>}/>
            <Route path='/admin/students/add' element={<AddStudent/>}/>
            <Route path='/admin/students/edit/:id' element={<EditStudent/>} />
            <Route path='/admin/students/delete/:id' element={<StudentDelete/>} />
            <Route path='/admin/students/view/:id' element={<ViewStudentData/>} />
            <Route path='/admin/teachers' element={<AdminTeachers/>} />
            <Route path='/admin/teachers/add' element={<AddTeachers/>} />
            <Route path='/admin/teachers/edit/:id' element={<EditTeachers/>} />
            <Route path='/admin/teachers/delete/:id' element={<TeacherDelete/>}/>
            <Route path='/admin/teachers/view/:id' element={<ViewTeacherData/>}/>
            <Route path='/admin/scan' element={<ScanQR/>}/>
            <Route path='/admin/student/check/:id' element={<Qrcheck/>}/>
          </Route>

          {/* STUDENT ROUTES */}
          <Route element={<StudentRouteProtection/>}>
            <Route path='/student/home' element={<StudentHome/>} />
            <Route path='/student/certifaces' element={<Certificates/>} />
            <Route path='/student/settings' element={<StudentSettings/>} />
            <Route path='/student/result' element={<StudentResults/>} />
            <Route path='/student/details' element={<StudentInfo/>} />
          </Route>


          {/* TEACHER ROUTES */}
          <Route element={<TecherRoutesProtection/>}>
            <Route path='/teacher/home' element={<TeacherHome/>} />
            <Route path='/teacher/students' element={<ShowStudents/>} />
            <Route path='/teacher/students/show/:id' element={<ShowStudent/>} />
            <Route path='/teacher/scan' element={<QrScan/>} />
            <Route path='/teacher/details' element={<TeacherDetails/>} />
            <Route path='/teacher/scan/:id' element={<CheckQrStudent/>}/>
            <Route path='/teacher/settings' element={<TeacherSettings/>} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
