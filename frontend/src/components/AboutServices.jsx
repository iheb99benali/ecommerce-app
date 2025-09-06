import React from "react";

const AboutServices = () => {
  return (
    <div className="services">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="service-item">
              <div className="icon">
                <i className="fa fa-gear"></i>
              </div>
              <div className="down-content">
                <h4>Product Management</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur an adipisicing elit.
                  Itaque, corporis nulla at quia quaerat.
                </p>
                <a href="#" className="filled-button">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-item">
              <div className="icon">
                <i className="fa fa-gear"></i>
              </div>
              <div className="down-content">
                <h4>Customer Relations</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur an adipisicing elit.
                  Itaque, corporis nulla at quia quaerat.
                </p>
                <a href="#" className="filled-button">
                  Details
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-item">
              <div className="icon">
                <i className="fa fa-gear"></i>
              </div>
              <div className="down-content">
                <h4>Global Collection</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur an adipisicing elit.
                  Itaque, corporis nulla at quia quaerat.
                </p>
                <a href="#" className="filled-button">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutServices;
