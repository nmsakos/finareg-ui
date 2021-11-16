import { Route } from "react-router-dom";
import { FamilyInfo } from "./Components/Family/FamilyInfo";
import { FamilyList } from "./Components/Family/FamilyList";
import { FamilyEditor } from "./Components/Family/FamilyEditor";
import { Nav } from "./Components/Nav";
import "./App.scss";
import { faArrowLeft, faCheck, faEdit, faFileInvoiceDollar, faHome, faPlus, faSave, faTicketAlt, faTrash, faUndo, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt, faCircle, faEye, faMinusSquare, faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { HomePage } from "./Components/HomePage";
import { PassList } from "./Components/Therapy/PassList";
import { TimeTableWrapper } from "./Components/TimeTable/TimeTableWrapper";
import { TimeTableEventForm } from "./Components/TimeTable/TimeTableEventForm";
import { PassInfo } from "./Components/Therapy/PassInfo";
import { PassForm } from "./Components/Therapy/PassForm";

library.add(faHome, faUsers, faEdit, faEye, faSave, faUndo, faPlus, 
  faTrash, faArrowLeft, faTicketAlt, faFileInvoiceDollar, faCheck, faCircle,
  faCalendarAlt, faMinusSquare, faPlusSquare);

function App() {
  return (
    <div className="maincontainer">
      <div className="header">
        <p>FinaReg @ TheraKid</p>
      </div>
      <div className="container">
        <Nav />
        <div className="content">
          <Route path="/" exact component={HomePage} />
          <Route path="/families" exact component={FamilyList} />
          <Route path="/timetables" exact component={TimeTableWrapper} />
          <Route path="/timetables/:eventId" exact render={({ match }) => (
            <TimeTableEventForm eventId={match.params.eventId} />
          )} />
          <Route path="/families/:familyId" exact render={({ match }) => (
            <FamilyInfo familyId={match.params.familyId} />
          )} />
          <Route path="/families/:familyId/edit" exact render={({ match }) => (
            <FamilyEditor familyId={match.params.familyId} />
          )} />
          <Route path="/passes" exact component={PassList} />
          <Route path="/passes/:passId" exact render={({ match }) => (
            <PassInfo passId={match.params.passId} />
          )} />
          <Route path="/passes/:passId/edit" exact render={({ match }) => (
            <PassForm passId={match.params.passId} />
          )} />
        </div>
      </div>
    </div>
  );
}

export default App;
