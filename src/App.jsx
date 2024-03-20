import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  useEffect(() => {
    axios("http://localhost:8000/api/products")
      .then((res) => {
        setProducts(res.data.response.docs);
        setPrev(res.data.response.prevPage);
        setNext(res.data.response.nextPage);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
<>
        <nav
          className="navbar navbar-expand-md w-100"
          style={{ backgroundColor: "#01084bea", position: "fixed", zIndex: 1 }}
          >
          <div className="container-fluid">
            <a className="fs-5 m-1 me-3" href="/">
              <img
                src="https://drive.google.com/file/d/11Sxd1jTyBc5gvFQBBOHgAK4QxRmDZh1G/view?usp=sharing"
                height="65"
                alt="logo"
              />
            </a>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a
                  className="btn btn-light m-1"
                  href="/orders"
                  id="ordersButton"
                  >
                  CART
                </a>

                <a className="btn btn-light m-1" href="/form" id="formButton">
                  FORM
                </a>

                <span className="btn btn-light m-1" id="signout">
                  SIGN OUT
                </span>

                <a
                  className="btn m-1 btn-light"
                  id="loginButton"
                  href="/auth/login"
                  >
                  LOGIN
                </a>
                <a
                  className="btn m-1 btn-light"
                  id="registerButton"
                  href="/auth/register"
                >
                  REGISTER
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="p-5 m-auto text-center flex-grow-1">
          <h1
            style={{
              margin: "2em auto 1em auto",
              color: "#00378a",
              width: "fit-content",
            }}
            className="rounded-3 bg-light bg-opacity-50 p-1"
            >
            title
          </h1>
          <div
            className="bg-light bg-opacity-50 p-2"
            style={{
              width: "max-content",
              margin: "2em auto 1em auto",
              height: "3em",
            }}
            >
            <input
              id="text"
              type="text"
              style={{ width: "360px" }}
              className="text-center"
              placeholder="search..."
              />
            <img
              style={{ width: "40px; padding: 2px" }}
              id="search"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABFdJREFUaEPtmWnIlUUUx38m2qYlGJmYJZWlRBJI+CEiTM0PttCOJFGpUaiIgiSZUmqmImUoRqCmFdkepKUGrpQSBX6JJG1R6YOgpeWCii3zl5kYnubeZ859vHRfeA9cXl7umf+Z/8yZs90OtHHp0Mb3TzuB//sGq9zAecCdwL1AP+AS/xGng/6zE/gQ+BQ40QyyjRDoAcwGHgbOz9zUceANYAZwIHNNlpqVwExgCqDTb0RE5EV/AI2s/8+aXALdgbXOFW46K1ZhE3AP8HtVvBwC/f3mr0wYOwR8ArwH/AT84nUuB64B7gfuBrol1u4GhgL7qpAoI9AL+ArQ31h+9q7wOnC6ZAPnAqPdI54K9C7oisQgQAfRkNQjcJE7oS9cFLmhgPw+MAo4ZbR4AfAucEdh3XZgMHDSiHdGvR6BxS5ijCuAzgeebsRQtOZV4MkCxvPu/+cawa1FoI875R+AjhGo4rl8uqqcA3wGDI+AjgFXAL9ZwWsReBsYGYH96B+lFb+WvtxTmEp+QV4GJlsNpAgoOR0GOkdg9wEfWcFL9J8ClkQ6yt6XAn9b7KQIPOgfW8D5DrjeAmrQVVaOb+EWHziyIVIE3vJlQgCZ5UuAbFCD4jKXBx6P9M1BIkXgG2BgBHozsM2wKYvqAz4JhjV63CMsACkCyoxxwlFE2msBNeje6DL1jkj/20TeqQuXIqAE1SladSGgIqwZohIjzsJ/ABdbDKUIHAG6RCBdgaMWUIOu7MheEB2UDixbUgRUn6gQC9LXJ7VsUIPitS7ffB/py1XlstmSIrAVUDgLMgTYmI1oUxwGfB4tUQAxlewpAq8BT0Sg5tBm4PCS6wkmRfpLgbGG9cliTtXi6ghELqWrboaoLI9dRrWWaq5sSd2ASghFBpW/QRSvP8hGzVN8BFgZqeoxX2aNeLWKueUu9j8WgavbujpvX1laOhxVuz0j7Xm+6ckCCEq1CKgl1KbjfKBGRnVSVZFNtaFxY/MXoJY1tKTZNuo1NAudK00sIGmcMj0bPa24yM2Mxhe+mgNMawS3HgElmS9dGT2gALyi4F65duU2q4C7CgsqVbtlTb0e1deAXCoW+e8L7l286W7kzxIGaurH+Fa02NRrqer/R/3gK/cw/tUrIyBFjQ3X+5avaOBX4GMfofZ4HxamNqoMHsYq6sDKRGW1phwmySEgQDUda/wIxGSghrKy7+2J78wkcgkEW2punq3AQJO4Cd71bnMly4YElmZICuNZYiUgUA255vrZUJYR38C/4hOXSuYgmkysq0KiEQLBnspexfKH3AO8CtD8VK6mR73fv4fN3vVUpNWSYukS9FQTqTaqK1UIlGFbvldo1dQjnkNlRadWISCyiljvWEm0EgGR0I8mmooU5TpgV+pKW41AIKEEGfamH1QW1PLHViSgvSofaGakX3OeqfeYWpWA9nyrG7tvKYsErUygbO9nvm8nkHVMTVRqv4EmHm4WdJu/gX8AUZOmMeH+ThoAAAAASUVORK5CYII="
            />
          </div>
          <div
            className="bg-secondary bg-opacity-75 text-white rounded"
            style={{ width: "fit-content", margin: "auto" }}
            >
            <a
              href="/?sort=asc"
              className="bg-primary bg-opacity-75 btn text-white m-1 p-1"
              style={{ marginRight: "5px" }}
              >
              A-Z
            </a>
            <a
              href="/?sort=desc"
              className="bg-primary bg-opacity-75 btn text-white m-1 p-1"
              >
              Z-A
            </a>
          </div>
          <div className="container mt-4">
            <div className="row row-cols-4 p-4">
              {products.map((each) => (
                <div className="col md-4 p-4" key={each._id}>
                  <div className="card p-1 bg-white bg-opacity-75 rounded-3 border-primary border-1">
                    <img
                      src={each.photo}
                      className="card-img-top"
                      alt="product"
                      height="250"
                      />
                    <div className="card-div">
                      <h5 className="card-title">{each.title}</h5>
                      <p className="card-text">$ {each.price}</p>
                      <p className="card-text">En stock: {each.stock}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <span className="w-100 d-flex justify-content-center">
            {prev && (
              <a
              className="btn btn-primary m-4 mt-0"
              href="/?title={{filter}}&page={{prev}}"
              >
                PREVIOUS PAGE
              </a>
            )}
            {next && (
              <a
                className="btn btn-primary m-4 mt-0"
                href="/?title={{filter}}&page={{next}}"
              >
                NEXT PAGE
              </a>
            )}
          </span>
        </main>
        <footer
          className="w-100"
          style={{ backgroundColor: "#01084bea", marginTop: "2em" }}
        >
          <p className="text-secondary m-2 text-center fw-bolder fs-4">
            AZUL AZUL
          </p>
        </footer>
  </>
  );
}

export default App;
