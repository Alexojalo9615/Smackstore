import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Alert, Container } from "react-bootstrap";
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://smackstore.onrender.com/users/login", {
                email,
                password,
            });
            login(response.data.token, response.data.user); // Salva il token nel contesto di autenticazione
            console.log("Token:", response.data); // Stampa il token nella console
            navigate("/"); // Reindirizza alla home page dopo il login
            
        } catch (err) {
            setError(err.response.data.message);
        }
    }
    return (

        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <h1 className="text-center">Login</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Inserisci la tua email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter user ID"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Accedi
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )

};

export default Login;