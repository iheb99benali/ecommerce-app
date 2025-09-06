import React from "react";

const ContactMap = () => {
  return (
    <div className="find-us">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Our Location on Maps</h2>
            </div>
          </div>
          <div className="col-md-8">
            <div id="map">
              <img
                src="https://placehold.co/600x400"
                width="100%"
                height="330px"
                alt=""
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="left-content">
              <h4>About our office</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                voluptate nihil eumester consectetur similiqu consectetur.
                <br></br>Lorem ipsum dolor sit amet, consectetur adipisic elit.
                Et, consequuntur, modi mollitia corporis ipsa voluptate
                corrupti.
              </p>
              <ul className="social-icons">
                <li>
                  <a href="#">
                    <i className="fa fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-behance"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
