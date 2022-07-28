import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";

const EditPlayer = () => {
    const { player } = useParams()
    const navigate = useNavigate()

     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
     const [height, setHeight] = useState("");
     const [position, setPosition] = useState("");
     const [club_id, setClubId] = useState("");
     const [photoPlayer, setPhotoPlayer] = useState("");
     const [validationError, setValidationError] = useState({});
     const [clubs, setClubs] = useState([]);

     useEffect(() => {
         getClubs()
         getPlayer()
     }, [])

     //Méthode pour récupérer les clubs
     const getClubs = async () => {
         await axios.get('http://localhost:8000/api/clubs').then(res => {
             setClubs(res.data.data)
         })
     }


     // GET - Récupère les valeurs de la fiche avec l'API
     const getPlayer = async () => {
         await axios
             .get(`http://localhost:8000/api/players/${player}`)
             .then(res => {
                 console.log(res.data)
                 setFirstName(res.data.firstName);
                 setLastName(res.data.lastName);
                 setHeight(res.data.height);
                 setPosition(res.data.position);
                 setPhotoPlayer(res.data.photoPlayer);
             })
             .catch(error => {
                 console.log(error)
             })
     }
     const changeHandler = (event) => {
     setPhotoPlayer(event.target.files[0]);
     };
      const handleChange= (event) => {
         setClubId(event.target.value);
       }

      //Fonction modification de players
       const updatePlayer = async (e) => {
         e.preventDefault();

         const formData = new FormData();
             formData.append('_method', 'PATCH');
             formData.append("firstName", firstName);
             formData.append("lastName", lastName);
             formData.append("height", height);
             formData.append("position", position);
             formData.append("club_id", club_id);
             if(photoPlayer!==null){
             formData.append("photoPlayer", photoPlayer)
             }
             await
             console.log(club_id)
             await axios
                   .post(`http://localhost:8000/api/players/${player}`, formData)
                   .then(navigate("/players"))
                   .catch(({ response }) => {
                     if (response.status === 422) {
                       setValidationError(response.data.errors);
                     }
                   });
               };
   return (
   <div>
   <Menu />
   <div className="container mt-5">
   <div className="row justify-content-center">
   <div className="col-12 col-sm-12 col-md-6">
   <div className="card">
   <div className="card-body">
   <h4 className="card-title">Modifier un joueur</h4>
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
   <Form onSubmit={updatePlayer}>
   <Row>
   <Col>
   <Form.Group controlId="firstName">
   <Form.Label>Nom du joueur</Form.Label>
   <Form.Control
   type="text"
   value={firstName}
   onChange={(event) => {
   setFirstName(event.target.value);
   }}
   />
   </Form.Group>
    <Form.Group controlId="lastName">
      <Form.Label>Prenom du joueur</Form.Label>
      <Form.Control
      type="text"
      value={lastName}
      onChange={(event) => {
      setLastName(event.target.value);
      }}
      />
      </Form.Group>
      <Form.Group controlId="height">
            <Form.Label>Taille</Form.Label>
            <Form.Control
            type="text"
            value={height}
            onChange={(event) => {
            setHeight(event.target.value);
            }}
            />
            </Form.Group>
            <Form.Group controlId="position">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                  type="text"
                  value={position}
                  onChange={(event) => {
                  setPosition(event.target.value);
                  }}
                  />
                  </Form.Group>
                  <Form.Group controlId="club">
                                           <Form.Label>Club</Form.Label>
                                             <Form.Select aria-label="Default select example" onChange={handleChange}>
                                               <option>Choisissez un club</option>
                                               {clubs.map(club => (
                                                                     <option
                                                                         key={club.id}
                                                                         value={club.id}>
                                                                         {club.nameClub}
                                                                     </option>
                                                                 ))}

                                             </Form.Select>
                                             </Form.Group>
   </Col>
   </Row>
   <Row>
   <Col>
   <Form.Group controlId="photoPlayer" className="mb-3">
   <Form.Label>Photo joueur</Form.Label>
   <Form.Control type="file" onChange={changeHandler} />
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

export default EditPlayer;