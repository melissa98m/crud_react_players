import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Menu from "../../components/Menu";
import axios from "axios";
import { Link } from 'react-router-dom';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    displayClubs();
  }, []); // Sans les crochets ça tourne en boucle

  const displayClubs = async () => {
    await axios.get("http://localhost:8000/api/clubs").then((res) => {
      setClubs(res.data.data);
      console.log(res.data);
    });
  };

  const deleteClub = (id) => {
    axios.delete(`http://localhost:8000/api/clubs/${id}`).then(displayClubs);
    console.log('testy');
  };

  return (
    <div>
      <Menu />
      <div className="container mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nom du club</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => (
              <tr key={club.id}>
                <td>{club.nameClub}</td>
                <td>
                <Link to={`/clubs/edit/${club.id}`} className='btn btn-success me-2'>
                    Edit
                </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      deleteClub(club.id);
                    }}
                  >
                    Supprimer
                  </Button>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Clubs;