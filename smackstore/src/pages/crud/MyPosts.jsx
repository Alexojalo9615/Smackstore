import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../../pages/style/MyPosts.css";
import { useNavigate } from "react-router-dom";


const MyPosts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect (() => {
        if (!user) {
            navigate("/login");
        };
        
            const fetchPosts = async () => {

                setLoading(true);
                const token = localStorage.getItem("token");

                try {
                    const response = await axios.get(`http://localhost:5030/products/user/${user._id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProducts(response.data.posts);
                    console.log(response.data);

                } catch (error) {
                    console.error("Error fetching posts:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchPosts();
        }, [user, navigate]); // Aggiungi user e navigate come dipendenze

        const handleDelete = async (productId) => {

            // Aggiungi conferma prima di eliminare
            try {

                const token = localStorage.getItem("token");
                await axios.delete(`http://localhost:5030/products/product/user/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // se eliminato con successo
                setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
            } catch (err) {
                console.error("Errore nella cancellazione:", err);}

        };


        if (loading) return <div>Loading...</div>;

        return (
            <Container className="mt-5">
                <h1>I Miei Prodotti</h1>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Col key={product._id}>
                                <Card>
                                    <Card.Img variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.name}</Card.Title>
                                        <Card.Text>
                                            Categoria: {product.category}
                                            <br />
                                            Prezzo: {product.price}€
                                            <br />
                                            Wrestler: {product.wrestler?.name || "N/A" // se product.wrestler esiste mostra il nome, altrimenti mostra "N/A"
                                            }
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => navigate(`/edit-product/${product._id}`)}>Modifica</Button>
                                        <Button variant="danger" className="ms-2" onClick={() => handleDelete(product._id)}>Elimina</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center">
                            <h2>Nessun post trovato</h2>
                        </Col>
                    )}
                </Row>
            </Container>
        );
    }

export default MyPosts;