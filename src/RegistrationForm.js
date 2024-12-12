import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import Navbar from './Navbar';
import Footer from './Footer';

const RegistrationForm = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    month: '',
    day: '',
    year: '',
    phoneNumber: '',
    email: '',
    studentName: '',
    relation: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'month' || name === 'day' || name === 'year') {
      handleNumberInputChange(e);
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'month' && (value === '' || (value >= 1 && value <= 12))) {
      setFormValues({ ...formValues, [name]: value });
    } else if (name === 'day' && (value === '' || (value >= 1 && value <= 31))) {
      setFormValues({ ...formValues, [name]: value });
    } else if (name === 'year') {
      if (/^\d{0,4}$/.test(value)) {
        setFormValues({ ...formValues, [name]: value });
      }
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^[\d()+_\s-]*$/.test(value)) {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    sendEmail();
    setShowConfirmModal(false);
    handleSuccessClose();
    // setShowSuccessModal(true);
  };

  const sendEmail = () => {

    const templateParams = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      month: formValues.month,
      day: formValues.day,
      year: formValues.year,
      phoneNumber: formValues.phoneNumber,
      email: formValues.email,
      studentName: formValues.studentName,
      relation: formValues.relation,
      streetAddress: formValues.streetAddress,
      streetAddress2: formValues.streetAddress2,
      city: formValues.city,
      state: formValues.state,
      postalCode: formValues.postalCode
    };
    

    emailjs.send(
      'service_e234qa4', // Replace with your service ID
      'template_7eyr14q', // Replace with your template ID
      templateParams,
      'aM4ACgzNEz-ykB_dV' // Replace with your user ID
    ).then((response) => {
      console.log('Email successfully sent!', response.status, response.text);
    }).catch((err) => {
      console.error('Error sending email:', err);
    });
  };

  const handleSuccessClose = () => {
    // setShowSuccessModal(false);
    setFormValues({
      firstName: '',
      lastName: '',
      month: '',
      day: '',
      year: '',
      phoneNumber: '',
      email: '',
      studentName: '',
      relation: '',
      streetAddress: '',
      streetAddress2: '',
      city: '',
      state: '',
      postalCode: ''
    });
  };

  return (
    <div>
    <Navbar />
    <Container className="d-flex justify-content-center align-items-center min-vh-100 mt-5">
    <div className='mt-5'>
      <Row className='mt-3'>
        <Col md={8} lg={6} className="p-4 border rounded shadow-sm bg-light">
        <div className="border border-2 p-2">
          <p2 className="p-0">Trebuie să completați detaliile înainte de a efectua o plată, conform politicii școlii.</p2>
        </div>
        <h2 className="text-center my-4">Înregistrare</h2>
        <p className="text-center mb-4">
          Introduceți doar detalii corecte pentru a evita <span style={{ color: "#FF0000" }}>eroare(le)</span>
        </p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>Prenume</Form.Label>
            <Form.Control
              type="text"
              placeholder="Prenume"
              name="firstName"
              value={formValues.firstName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLastName" className="mt-2">
            <Form.Label>Nume</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nume"
              name="lastName"
              value={formValues.lastName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhoneNumber" className="mt-2">
            <Form.Label>Număr de telefon</Form.Label>
            <Form.Control
              type="text"
              placeholder="(000) 000-0000"
              name="phoneNumber"
              value={formValues.phoneNumber}
              onChange={handlePhoneNumberChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formToWhom" className="mt-4">
            <Form.Label>Pe cine plătiți?</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduceți numele studentului"
              name="studentName"
              value={formValues.studentName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formRelation" className="mt-4">
            <Form.Label>Cine este această persoană pentru dumneavoastră?</Form.Label>
            <Form.Check
              type="radio"
              label="Soție"
              name="relation"
              value="Soție"
              checked={formValues.relation === "Wife"}
              onChange={handleInputChange}
              required
            />
            <Form.Check
              type="radio"
              label="Soț"
              name="relation"
              value="Soț"
              checked={formValues.relation === "Husband"}
              onChange={handleInputChange}
              required
            />
            <Form.Check
              type="radio"
              label="Sora / Fratele"
              name="relation"
              value="Sora / Fratele"
              checked={formValues.relation === "Sister / Brother"}
              onChange={handleInputChange}
              required
            />
            <Form.Check
              type="radio"
              label="Prieten"
              name="relation"
              value="Prieten"
              checked={formValues.relation === "Friend"}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAddress" className="mt-4">
            <Form.Label>Adresă de corespondență</Form.Label>
            <Form.Control
              type="text"
              placeholder="Adresă"
              name="streetAddress"
              value={formValues.streetAddress}
              onChange={handleInputChange}
              required
              className="mb-2"
            />
            <Form.Control
              type="text"
              placeholder="Oraș"
              name="city"
              value={formValues.city}
              onChange={handleInputChange}
              required
              className="mb-2"
            />
            <Form.Control
              type="text"
              placeholder="Stat / Provincie"
              name="state"
              value={formValues.state}
              onChange={handleInputChange}
              required
              className="mb-2"
            />
            <Form.Control
              type="text"
              placeholder="Cod poștal"
              name="postalCode"
              value={formValues.postalCode}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4 w-100">
            TRIMITE
          </Button>
        </Form>

        </Col>
      </Row>
      </div>
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmați Detaliile Dumneavoastră</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Vă rugăm să confirmați și să verificați detaliile înainte de a trimite pentru a evita{" "}
            <span style={{ color: "#FF0000" }}>eroare(le)</span>
          </p>
          <Button variant="primary" onClick={handleConfirm}>
            <a href='https://examform.github.io/Depaul-Uni-Examen-Formular-Plata/' target='blank' className='text-light text-decoration-none'>Da, Am Confirmat</a>
          </Button>
        </Modal.Body>
      </Modal>

  
      {/* <Modal show={showSuccessModal} onHide={handleSuccessClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please check your email; you will receive a message shortly.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal> */}
    </Container>
    <Footer />
  </div>
  );
};

export default RegistrationForm;
