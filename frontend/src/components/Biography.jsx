import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            We are a team of passionate developers working on a modern web-based solution called the Hospital Management System (HMS). Our project is designed to simplify and automate hospital operations using the latest web technologies.

In today’s healthcare environment, many hospitals still rely on manual systems for managing patient records, appointments, and medical data. These traditional methods are time-consuming, error-prone, and inefficient. Our goal is to solve these problems by providing a centralized and digital platform.

The Hospital Management System allows patients, doctors, and administrators to interact efficiently within a single system. Patients can easily register, book appointments, and view their medical records. Doctors can manage patient history, update diagnoses, and prescribe treatments. Administrators have full control over hospital operations, including managing staff, appointments, and system records.

This project is developed using the MERN Stack (MongoDB, Express.js, React.js, Node.js), which ensures high performance, scalability, and a user-friendly interface. The system is designed to be secure, reliable, and easy to use for users with minimal technical knowledge.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
