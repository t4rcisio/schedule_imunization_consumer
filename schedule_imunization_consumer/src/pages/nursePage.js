import { useState } from "react";
import { Container, Row, Card } from "react-bootstrap";
import FormLogin from "../components/forms/formLogin.js";
import FormCreate from "../components/forms/formCreate.js";

const NursePage = () => {
  const [token, setToken] = useState(false);
  const [signin, setSignin] = useState(true);
  const [signup, setSignup] = useState(false);

  const showLoginForm = (state) => {
    setSignin(state);
    setSignup(!state);
  };

  if (localStorage.getItem(process.env.REACT_APP_TOKEN_ID) && !token) {
    setToken(localStorage.getItem(process.env.REACT_APP_TOKEN_ID));
    setSignin(false);
    setSignup(false);
  }

  return (
    <>
      <Container>
        <Row className="mt-2">
          <Card>
            <Card.Body>
              {!token && signin && (
                <FormLogin setToken={setToken} showLoginForm={showLoginForm} />
              )}

              {!token && signup && <FormCreate showLoginForm={showLoginForm} />}
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};

export default NursePage;
