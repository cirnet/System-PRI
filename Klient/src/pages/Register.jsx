import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    imie: "",
    nazwisko: "",
    rola: "",
  });

  const { imie, nazwisko, rola } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    //dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (password !== password2) {
    //   toast.error("Passwords do not match");
    // } else {
    //   const userData = {
    //     name,
    //     email,
    //     password,
    //     schedule: [],
    //   };

    // }
    const userData = {
      imie,
      nazwisko,
      rola,
    };
    console.log("userdata daje:", userData);
    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="imie"
              name="imie"
              value={imie}
              placeholder="Enter your imie"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="nazwisko"
              name="nazwisko"
              value={nazwisko}
              placeholder="Enter your nazwisko"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="rola"
              name="rola"
              value={rola}
              placeholder="Enter your rola"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;
