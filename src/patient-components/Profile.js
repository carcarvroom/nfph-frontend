import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
//   CardText,
  Button
} from 'reactstrap';

import img1 from '../assets/images/big/img1.jpg';

const Profile = () => {

  const [user, setUser] = useState({ user: {
    first_name: '',
    last_name: '',
    email_address: '',
    diagnosis: '',
    prescriptions: [],
    organization_id: ''
  } });

  const [editMode, setEditMode] = useState(false);

   useEffect(() => {
      fetchUser();
   }, []);

  async function fetchUser() {
    const res = await fetch("http://localhost:3000/patients/1");
    res
      .json()
      .then(response => setUser(response))
      .catch(error => console.log(error));
  }

  const history = useHistory();

  const redirect = (event) => {
    history.push('/');
  }

  const changeToEditMode = () => {
    setEditMode(!editMode)
  }

  const updateProfile = (event) => {

    setEditMode(!editMode)
    
    let data = {
      first_name: event.target.firstName.value,
      email_address: event.target.emailAddress.value
    }

    console.log(data)

    fetch("http://localhost:3000/patients/1",{
      method:"PATCH",
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })

  }

  const deleteProfile = () => {
    fetch(`http://localhost:3000/patients/1`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    redirect()
  }

  console.log(editMode)

  return (

    <div>

        <CardTitle className="bg-light border-bottom p-3 mb-0">
            <i className="mdi mdi-comment-processing-outline mr-2"> </i>
            Profile
        </CardTitle>

        <div >
          <div className="row">

              <div className="col-lg-4 col-xlg-3 col-md-12">
                  <div className="white-box">
                      <div className="user-bg">
                          <CardImg width="100%" src={img1} />
                              <div className="overlay-box">
                                  <div className="user-content">
                                      <h4 className="mt-2">{user.first_name}</h4>
                                  </div>
                              </div>
                      </div>
                  </div>
              </div>

              <div className="col-lg-8 col-xlg-9 col-md-12">
                {
                  editMode === false ?
                  <Card>
                    <CardBody>
                        <CardTitle>Name</CardTitle>
                        <CardSubtitle>{user.first_name}</CardSubtitle>
                        <CardTitle>Email</CardTitle>
                        <CardSubtitle>{user.email_address}</CardSubtitle>
                        <CardTitle>Diagnosis</CardTitle>
                        <CardSubtitle>{user.diagnosis}</CardSubtitle>
                        <CardTitle>Prescriptions</CardTitle>
                        <CardSubtitle>none</CardSubtitle>
                        <CardTitle>Organisation</CardTitle>
                        <CardSubtitle>{user.organization_id}</CardSubtitle>
                        <Button className="btn btn btn-primary btn-lg" onClick={changeToEditMode}>Edit Profile</Button>
                        <Button className="btn btn btn-primary btn-lg" onClick={deleteProfile}>Delete Profile</Button>
                    </CardBody>
                  </Card>
                  :
                  <Card>
                    <CardBody>
                        {/* What do we want people to be able to edit? */}
                        <form onSubmit={(event) => updateProfile(event)}>
                          <CardTitle>Name</CardTitle>
                          <input className="form-control-sm" type="text" name="firstName"/>
                          <CardTitle>Email</CardTitle>
                          <input className="form-control-sm" type="text" name="emailAddress"/>
                          <CardTitle>Diagnosis</CardTitle>
                          <CardSubtitle>{user.diagnosis}</CardSubtitle>
                          <CardTitle>Prescriptions</CardTitle>
                          <CardSubtitle>none</CardSubtitle>
                          <CardTitle>Organisation</CardTitle>
                          <CardSubtitle>{user.organization_id}</CardSubtitle>
                          <input className="btn btn btn-primary btn-lg" type="submit" value="Save Profile"/>
                          {/* <Button className="btn btn btn-primary btn-lg" onClick={deleteProfile}>Delete Profile</Button> */}
                        </form>
                    </CardBody>
                  </Card>
                }
              </div>

          </div>
        </div>

  </div>

  );
};
export default Profile;