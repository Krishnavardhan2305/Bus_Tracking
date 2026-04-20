import { useParams } from "react-router-dom";
import React from 'react'

const LiveMap = () => {
    const { busId } = useParams();
  const [position, setPosition] = useState([17.385, 78.486]);

  useEffect(() => {
    socket.on("receive-location", (data) => {
      if (data.busId === busId) {
        setPosition([data.lat, data.lng]);
      }
    });

    return () => socket.disconnect();
  }, [busId]);
  return (
    <div>
      
    </div>
  )
}

export default LiveMap

