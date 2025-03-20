import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import Creation1 from "./account/creation1";
import Creation2 from "./account/creation2";
import Creation3 from "./account/creation3";
import Finally from "./account/finally";
import Connect from "./page/connect";
import GetTask from "./Task/getTask";
import AddTask from "./Task/addTask";
import Modify from "./Task/Modify";
import GetNote from "./Notes/getNote";
import MyDate from "./Dates/MyDate";
import AddDates from "./Dates/addDates";
import Today from "./Task/today";
import AddNotes from "./Notes/addNotes";
import Params from "./setting/params";
import Multimedia from "./Notes/multimedia";
import Accountparams from "./setting/accountparams";
import CompleteTask from "./Task/completeTask";
import Email from "./account/email";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create1" element={<Creation1 />} />
        <Route path="/email" element={<Email />} />
        <Route path="/create2" element={<Creation2 />} />
        <Route path="/create3" element={<Creation3 />} />
        <Route path="/finally" element={<Finally />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/getTask" element={<GetTask />} />
        <Route path="/addTask" element={<AddTask />} />
        <Route path="/modifytask/:id" element={<Modify />} />
        <Route path="/getNotes" element={<GetNote />} />
        <Route path="/Date" element={<MyDate />} />
        <Route path="/addDates" element={<AddDates />} />
        <Route path="/day" element={<Today />} />
        <Route path="/addNotes" element={<AddNotes />} />
        <Route path="/params" element={<Params />} />
        <Route path="/multimedia" element={<Multimedia />} />
        <Route path="/accountparms" element={<Accountparams />} />
        <Route path="/compltetTask" element={<CompleteTask />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
