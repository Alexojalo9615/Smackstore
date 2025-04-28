import { Navbar, Container, Nav, NavDropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../pages/style/Navbar.css"; 


const NavbarCon = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    console.log(user);

    const navigate = useNavigate();

    const handlelogout = () => {
        logout();
        
        setTimeout(() => {
            navigate("/login"); // La funzione navigate("/login") viene chiamata dopo 0 millisecondi, quindi immediatamente dopo il logout
        }, 0);
    };

    const defaultProfilePicture = `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${user?.firstName}+${user?.lastName}`; // URL dell'immagine di profilo predefinita

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className=" navbar mb-4">
            <Container>
                <Navbar.Brand as={Link} className="brand" to={"/"} >SmackStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="nav me-auto">
                        <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                        <Nav.Link as={Link} to={"/shop"}>Store</Nav.Link>
                    </Nav>

                    <Nav className="d-flex gap-3">

                        <Nav.Link as={Link} className=" link me-3 position-relative" to="/cart"
                            style={{ color: "black", zIndex: 0 }}>
                            <FaShoppingCart size={22} />
                            {cart.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary mt-1"
                                    style={{ zIndex: 2 }}>

                                    {cart.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            )}
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        {user ? (

                            <>
                                <div className="d-flex align-items-center">
                                    <Image

                                        src={defaultProfilePicture}
                                        roundedCircle
                                        width={40}
                                        height={40}
                                        className="me-2"
                                    />
                                    <NavDropdown title={`Ciao, ${user.firstName} ${user.lastName}`}
                                        id="basic-nav-dropdown"
                                        align="end"
                                    >

                                        <NavDropdown.Item as={Link} to="/create-post">Crea Prodotto</NavDropdown.Item>

                                        <NavDropdown.Item as={Link} to="/my-posts">I Miei Prodotti</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} onClick={handlelogout} >Log out</NavDropdown.Item>

                                    </NavDropdown>

                                </div>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} className="right" to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} className="right" to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarCon;