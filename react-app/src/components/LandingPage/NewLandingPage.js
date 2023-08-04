import "./NewLandingPage.css";
import logo from "./assets/images/discord.svg";
const NewLandingPage = () => {
  return (
    <section className="hero">
      <header className="main-header container">
        <nav className="main-nav">
          <a herf="/" className="logo">
            <img src={logo} alt="" />
          </a>

          <ul className="nav-list">
            <li className="nav-item">
              <a href="" className="nav-link">
                Download
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Creators
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Why discord
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Safety
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Support
              </a>
            </li>
          </ul>

          <div className="nav-items-right">
            <a href="#" className="btn btn-small btn-light btn-login">Login</a>
            <span className="mobile-toggle">
                <i className="bx bx-menu"></i>
                <i className="bx bx-x btn-close"></i>
            </span>
          </div>
        </nav>
      </header>

      <div className="row container">
        <div className="hero-content-wrap">
          <h1 className="title primary-title">Your place to talk</h1>
          <p className="hero-description">
            Whether your're part of a school club, gaming group, worldwide art
            community, or just a handful of friends that want to spend time
            together, Sonic makes it easy to talk every day and hang out more
            often.
          </p>
          <div className="hero-btn-group">
            <a href="#" className="btn btn-large btn-light">
              <i className="bx bx-download"></i> Download for Windows
            </a>
            <a href="#" className="btn btn-large btn-dark">
              Open Sonic in your browser
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewLandingPage;
