import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = {Firstname: "", Lastname: "", Age: "",  Phonenumber: "",email: "", password: ""} ;
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.Firstname) {
      errors.Firstname = "Firstname is required!";
    }
    if (!values.Lastname) {
      errors.Lastname = "Lastname is required!";
    }
    if (!values.Age) {
      errors.Age = "Age is required!";
    }
    if (!values.Phonenumber) {
      errors.Phonenumber= "Phone number of 10 digit is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 50) {
      errors.password = "Password cannot exceed more than 50 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>First Name</label>
            <input
              type="text"
              name="Firstname"
              placeholder="FirstName"
              value={formValues.Firstname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Firstname}</p>


          <div className="field">
            <label>Last Name</label>
            <input
              type="text"
              name="Lastname"
              placeholder="LastName"
              value={formValues.Lastname}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Lastname}</p>
        


          <div className="field">
            <label>Age</label>
            <input
              type="number"
              name="Age"
              placeholder="Age"
              value={formValues.Age}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Age}</p>

          <div className="field">
            <label>Phone Number</label>
            <input
              type="text"
              name="Phonenumber"
              placeholder="Phonenumber"
              value={formValues.Phonenumber}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.Phonenumber}</p>

          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;