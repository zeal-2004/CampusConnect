import "./Landing.css";
import admin from "./images/admin.png";
import student from "./images/student.png";
import faculty from "./images/teacher.png";

function Users() {
  return (
    <div className="p-5">
      <div className="text-center">
        <h1>CampusConnect</h1>
        <p>Taking the stress out of fest!</p>
      </div>
      <div className="d-flex justify-content-evenly mt-5">
        <div className="card p-1 m-1 w-auto ">
          <img
            src={admin}
            className="card-img-top mx-auto d-block"
            style={{ width: "13rem" }}
            alt="Admin Login"
          />
          <div className="text-center">
            <button type="button" className="btn mt-2">
              Admin
            </button>
          </div>
        </div>
        <div className="card flex-shrink-1 m-1 w-auto">
          <img
            src={student}
            className="card-img-top mx-auto d-block"
            style={{ width: "11rem" }}
            alt="Student Login"
          />
          <div className="text-center">
            <button type="button" className="btn mt-2">
              Student
            </button>
          </div>
        </div>
        <div className="card flex-shrink-1 m-1">
          <img
            src={faculty}
            className="card-img-top mx-auto d-block rounded"
            style={{ width: "10.5rem" }}
            alt="Faculty Login"
          />
          <div className="text-center">
            <button type="button" className="btn mt-2">
              Faculty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
