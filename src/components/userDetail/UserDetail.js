import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
//import classes from "../users/UserList.module.css";
import classes from "../userDetail/UserDetail.module.css";
import * as Icon from "react-bootstrap-icons";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getUserDetail = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => console.error(err));
  };
  if (user === null) {
    return "loading";
  }

  return (
    <Container>
      <Link to="/users">
        <Button
          className={classes.button}
          variant="dark"
          buttonClass="btn btn-dark"
        >
          <Icon.ArrowLeft />
        </Button>
      </Link>
      <Row className={classes.userInfoRow}>
        <Col xs={12} sm={8} className={classes.detailCol}>
          <Card className={classes.card}>
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Subtitle className="font-italic">
                {"@" + user.username}
              </Card.Subtitle>
            </Card.Body>
          </Card>
          <p>Detail Information</p>
          <hr />
          <div className={classes.detailInformation}>
            <div className={classes.detail}>
              <div>
                <div>Email:</div>
                <div>{user.email.toLowerCase()}</div>
              </div>
              <div>
                <div>Phone:</div> <div>{user.phone}</div>
              </div>
              <div>
                <div>Company:</div> <div>{user.company.name}</div>
              </div>
              <div>
                <div>Website: </div>
                <div>{user.website}</div>
              </div>
              <div>
                <div>Address:</div>
                <div>
                  <div>City: {user.address.city}</div>
                  <div>Street: {user.address.street}</div>
                  <div>Suite: {user.address.suite}</div>
                  <div>Zipcode: {user.address.zipcode}</div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetail;
