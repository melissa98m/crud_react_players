import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
const AddClub = () => {
const navigate = useNavigate();
const [nameClub, setNameClub] = useState("");
const [validationError, setValidationError] = useState({});

//Fonction d'ajout de club
const addClub = async (e) => {
e.preventDefault();
const formData = new FormData();
formData.append("nameClub", nameClub);
await axios
.post(`http://localhost:8000/api/clubs`, formData)
.then(navigate('/clubs'))
.catch(({ response }) => {
if (response.status === 422) {
setValidationError(response.data.errors);
}
});
};
return (
<div>
<Menu />
<div className="container">
<div className="row justify-content-center">
<div className="col-12 col-sm-12 col-md-6">
<div className="card">
<div className="card-body">
<h4 className="card-title">Création d'un nouveau club</h4>
<hr />
<div className="form-wrapper">
{Object.keys(validationError).length > 0 && (
<div className="row">
<div className="col-12">
<div className="alert alert-danger">
<ul className="mb-0">
{Object.entries(validationError).map(
([key, value]) => (
<li key={key}>{value}</li>
)
)}
</ul>
</div>
</div>
</div>
)}
<Form onSubmit={addClub}>
<Row>
<Col>
<Form.Group controlId="Name">
<Form.Label>Nom du club</Form.Label>
<Form.Control
type="text"
value={nameClub}
onChange={(event) => {
setNameClub(event.target.value);
}}
/>
</Form.Group>
</Col>
</Row>
<Button
variant="primary"
className="mt-2"
size="lg"
block="block"
type="submit"
>
Créer
</Button>
</Form>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
);
};
export default AddClub;