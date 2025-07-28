import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        wrestler: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState("");
    const [wrestlers, setWrestler] = useState([]);
    const { user } = useAuth();

    const navigate = useNavigate();

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
                setWrestler(response.data);
            } catch (error) {
                console.error("Error fetching wrestlers:", error);
            }
        };
        fetchWrestlers();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            console.log(user._id);

            //  Verifica se l'utente è autenticato
            if (!user || !user._id) {
                setError("Devi essere loggato per creare un post");
                return;
            }

            if (!imageFile) {

                setError("Devi caricare un'immagine");
                return;
            }


            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("category", formData.category);
            formDataToSend.append("price", formData.price);
            formDataToSend.append("wrestler", formData.wrestler);
            formDataToSend.append("image", imageFile);
            formDataToSend.append("createdBy", user._id);

            const token = localStorage.getItem("token");
            console.log(token);

            const response = await axios.post("https://smackstore.onrender.com/products", formDataToSend, { //DA VEDERE BACKEND !!!
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },

            });


            if (response && response.data) {
                console.log("Post creato con successo:", response.data);
                navigate("/my-posts");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Errore nella creazione del post");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <h1>Inserisci un nuovo post</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit} >
                        <Form.Group className="mb-3">
                            <Form.Label>Nome Prodotto</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserisci il titolo"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Tshirt, Action Figure, Cover..."
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Prezzo</Form.Label>
                            <Form.Control
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Wrestler associato</Form.Label>
                            <Form.Select
                                as="select"
                                value={formData.wrestler}
                                type="select"
                                placeholder="Nome Wrestler"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        wrestler: e.target.value,
                                    })
                                }
                                required
                            >
                                <option value="">Seleziona un wrestler</option>
                                {wrestlers.map((wrestler) => (
                                    <option key={wrestler._id} value={wrestler._id}>
                                        {wrestler.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Immagine</Form.Label>
                            <Row>
                                <Col xs={8}>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required
                                    />
                                </Col>
                                <Col xs={4}>

                                </Col>
                            </Row>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Crea Prodotto
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
};

export default CreatePost;