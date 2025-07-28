import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";


const EditProductPage = () => {
    const { id } = useParams(); // Ottieni l'ID del prodotto dalla URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null); // Stato per il prodotto
    const [error, setError] = useState(null); // Stato per gli errori
    const [wrestlers, setWrestlers] = useState([]);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`https://smackstore.onrender.com/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProduct(response.data); // Imposta il prodotto nello stato
                console.log(response.data);

            } catch (err) {
                console.error("Errore nel recupero del prodotto:", err);
                setError("Errore nel recupero del prodotto.");
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchWrestlers = async () => {
            try {

                const token = localStorage.getItem("token");
                const response = await axios.get("https://smackstore.onrender.com/api/wrestlers", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data);
                setWrestlers(response.data);
            } catch (error) {
                console.error("Error fetching wrestlers:", error);
            }
        };
        fetchWrestlers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value })); // Aggiorna lo stato del prodotto
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProduct((prevProduct) => ({ ...prevProduct, image: file })); // Aggiorna l'immagine del prodotto
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene il comportamento predefinito del form

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();



            formData.append("name", product.name);
            formData.append("price", product.price);
            formData.append("category", product.category);
            formData.append("wrestler", product.wrestler);

            if (product.image) {
                formData.append("image", product.image); // Aggiungi l'immagine se presente
            }

            await axios.put(`hhttps://smackstore.onrender.com/products/product/user/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            navigate("/my-posts"); // Reindirizza alla pagina dei post dopo la modifica
        } catch (err) {
            console.error("Errore nell' aggiornamento del prodotto:", err);
            setError("Errore nell' aggiornamento del prodotto.");
        }
    };


    return (
        <Container className="mt-5">
            <h1>Modifica Prodotto</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group controlId="formName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={product?.name || ""}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPrice">
                    <Form.Label>Prezzo</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={product?.price || ""}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCategory">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={product?.category || ""}
                        onChange={handleChange}
                        required
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Wrestler</Form.Label>
                    <Form.Select
                        name="wrestler"
                        type="text"
                        value={product?.wrestler || ""}
                        onChange={handleChange}
                        required
                    >
                        {wrestlers.map((wrestler) => (
                            <option key={wrestler._id} value={wrestler._id}>
                                {wrestler.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="formImage">
                    <Form.Label>Immagine</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Aggiorna Prodotto
                </Button>
            </Form>

        </Container>
    );

}

export default EditProductPage;