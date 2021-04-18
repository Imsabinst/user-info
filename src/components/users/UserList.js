import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { baseURL } from "../../constants/Service";
import classes from "../users/UserList.module.css";

function UserList() {
  const [users, setUsers] = useState([]);

  const getUserList = () => {
    axios
      .get(baseURL)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getUserList();
  }, []);

  if (users === null) {
    return "loading";
  }

  return (
    <Container>
      <h2 className={classes.heading}>Users Information Page</h2>
      <hr />
      <Row>
        {users &&
          users.map((user) => {
            return (
              <Col xs={12} sm={6} md={4} key={user.id}>
                <div className={classes.card}>
                  <Card className="mb-3 text-center">
                    <div className={classes.logoContainer}>
                      <div className={classes.logo}>
                        <span>{user.name.charAt(0)}</span>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title>{user.name}</Card.Title>
                      <Card.Subtitle className="mb-3">
                        {"@" + user.username}
                      </Card.Subtitle>
                      <Card.Link className="mb-4 font-italic">
                        <div>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={"https://www." + user.website}
                          >
                            {"http://" + user.website}
                          </a>
                        </div>
                      </Card.Link>
                    </Card.Body>
                    <Link to={`/users/${user.id}`}>
                      <Button className={classes.button}>More Details</Button>
                    </Link>
                  </Card>
                </div>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
}

export default UserList;
