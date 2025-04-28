import { Container } from "react-bootstrap";
import "../pages/style/Footer.css"



const Footer = () => {
    return (
        <footer className=" footer  mt-5 py-3">
            <Container className=" text-center">
                <p className="par mb-1">Questo sito è un progetto amatoriale a scopo puramente illustrativo e didattico
                    <br />
                    Non ha finalità di lucro ne intende violare alcun diritto d'autore o marchio registrato
                    <br />
                    Tutti i nomi, loghi, immagini e riferimenti ai wrestler e alla WWE appartengono ai  rispettivi proprietari
                    <br />
                    <br />
                    © 2025 SmackStore - Tutti i diritti riservati
                </p>

            </Container>
        </footer>
    );
}

export default Footer;