// OK ALL vs None
import React, { Component } from "react";
import API from "../../../src/utils/API";
import {BrowserRouter as Router,Link,
  // Route,
  // Switch,
} from 'react-router-dom';
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./style.css";
import Checkbox from "../../components/Checkbox";
import FooterEventPage from "../../components/FooterEventPage"
import { PromiseProvider } from "mongoose";
import { userInfo } from "os";

class ViewEvent extends Component {
  state = {
    projects: "",
    userId: "",
    isLoggedIn: false,
    currentUser: ""
  };


  componentDidMount() {
        // LOAD ALL PROJECTS
    this.loadProjects();
    
    // CHECK FOR VALID USER
      let readToken = window.localStorage.getItem("SMC_authkey");
      console.log("Token Read = " + readToken);
      let query = {
        token: readToken
      };
      API.checkAuth(query)
        .then(res => {
          if (res.data.success) {
            console.log("in success handle");
          // SAVE USER NAME TO SESSION
            const currentUserId = sessionStorage.getItem("userId");
            const currentUser = sessionStorage.getItem("userData");
            this.setState({
              currentUser: currentUser,
              currentUserId: currentUserId,
             isLoggedIn: true, 
            // userID:
          });
            // window.location.assign('/view-event');
          } else {
            console.log("in failure handle");
            this.setState({ isLoggedIn: false });
            window.location.assign('/sign-in');
            console.log("ERROR:  Would redirect to login.")
          };
        })
          .catch (err => console.log(err));
    }
  

  loadProjects = () => {
    API.getProjects()
      .then(res =>
        this.setState({
          projects: res.data
        })
      )
      .catch(err => console.log(err));
  };


  render() {
    return (
      // <Router>
      <div>
        {/* <p>Welcome {currentUser.toUpperCase()}</p> */}

        <div className="eventLogo">
          <img className="uOfRLogo" src="./images/UofRproStudies.png" alt="University of Richmond logo" />
        </div>

        {this.state.projects.length ? (
          <ul className="projectList list-group list-group-flush">
            {this.state.projects.map((project) => (

              <Link to={`/project-detail/${project._id}`}>
                <li className="project list-group-item"
                  
                >

                  <ProjectCard
                    id={project.id}
                    projectName={project.name}
                    link={project.link}
                    projectDesc={project.description}
                    imageURL={project.imageURL}
                  >
                    <Checkbox />


                  </ProjectCard>
                </li>
              </Link>
            ))}

          </ul>
        ) : (
            <h3>No Results to Display</h3>
          )}
<FooterEventPage/>
      </div>
      // </Router>
    );
  }
}
export default ViewEvent;