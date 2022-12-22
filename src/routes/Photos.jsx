import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const desc = "desc"

  const deletePhoto = async (id) => {
    // TODO: answer here
    await fetch(`https://gallery-app-server.vercel.app/photos/${id}`, {
      method: "DELETE",
    })
    const dataPhoto = await fetch("https://gallery-app-server.vercel.app/photos")
    const response = await dataPhoto.json()
    setPhotos(
      response.filter((element) => element.id < 10)
    )
  };

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    setLoading(true)
    if(sort === "asc"){
      fetch(`https://gallery-app-server.vercel.app/photos?_sort=id&_order=${sort}`)
        .then((res) => res.json())
        .then((json) => {setPhotos(json); setLoading(false)})
    }
    else {
      fetch(`https://gallery-app-server.vercel.app/photos?_sort=id&_order=${desc}`)
        .then((res) => res.json())
        .then((json) => {setPhotos(json); setLoading(false)});
    }
       
    if(search) {
      fetch(`https://gallery-app-server.vercel.app/photos?q=${search}`)
        .then((res) => res.json())
        .then((json) => setPhotos(json))
    }
  }, [sort, submited, search]);

  useEffect(() => {
    setLoading(true);
    // TODO: answer here
    fetch("https://gallery-app-server.vercel.app/photos")
    .then((json) => {
      setPhotos(json);
      setLoading(false)
    })
    .catch((error) => {
      setError(error);
    });
  }, []);

  if (error) return <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }} >Error!</h1>;

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card key={photo.id} photo={photo} deletePhoto={deletePhoto} />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
