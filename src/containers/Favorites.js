import React from "react";
import Cookies from "js-cookie";

const Favorites = () => {
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [getting, setGetting] = useState([]);
  const data = Cookies.getJSON();
  //   setGetting(data);
  console.log(data.value);
  return (
    <>
      {/* {getting.map((url, index) => {
        return (
          <>
            
          </>
        );
      })} */}
      <div className="favorites">
        <h1>Favorites</h1>
      </div>
    </>
  );
};

export default Favorites;
