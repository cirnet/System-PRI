import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function MyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [skill, setSkill] = useState("skills");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    return () => {};
  }, [user, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    setSkill(skill + text);
    setText("");
  };
  return (
    <div>
      <card>
        <div>
          <p>{user.imie}</p>
          <p>{user.email}</p>
          <p>{skill}</p>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="text">Umiejętności</label>
            <input
              type="text"
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button className="btn " type="submit">
              Dodaj Umiejętności
            </button>
          </div>
        </form>
      </card>
    </div>
  );
}

export default MyProfile;
