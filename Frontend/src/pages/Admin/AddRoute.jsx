import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "../../Components/AdminNavbar";
import { ADMIN_API_ENDPOINT } from "../../utils/constant";

const AddRoute = () => {
  const [name, setName] = useState("");
  const [stops, setStops] = useState([{ name: "" }]);
  const [loading, setLoading] = useState(false);

  const handleStopChange = (index, value) => {
    const updated = [...stops];
    updated[index].name = value;
    setStops(updated);
  };

  const addStop = () => {
    setStops([...stops, { name: "" }]);
  };

  const removeStop = (index) => {
    const updated = stops.filter((_, i) => i !== index);
    setStops(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!name.trim()) {
      return toast.error("Route name required");
    }

    const validStops = stops.filter((s) => s.name.trim() !== "");

    if (validStops.length < 2) {
      return toast.error("At least 2 stops required");
    }

    try {
      setLoading(true);

      await axios.post(
        `${ADMIN_API_ENDPOINT}/route`,
        { name, stops: validStops },
        { withCredentials: true }
      );

      toast.success("Route created 🚍");

      // ✅ Reset
      setName("");
      setStops([{ name: "" }]);

    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating route");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        <div className="card p-4 shadow">
          <h3>Add Route</h3>

          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              placeholder="Route Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {stops.map((stop, index) => (
              <div key={index} className="d-flex mb-2">
                <input
                  placeholder={`Stop ${index + 1}`}
                  className="form-control me-2"
                  value={stop.name}
                  onChange={(e) =>
                    handleStopChange(index, e.target.value)
                  }
                />

                {stops.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeStop(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={addStop}
            >
              Add Stop
            </button>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Route"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddRoute;