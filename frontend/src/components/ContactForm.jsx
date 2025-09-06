import React, { useState } from "react";

const ContactForm = ({ userId = "", sendMessage }) => {
  const [message, setMessage] = useState({
    userId: userId,
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setMessage((prev) => ({ ...prev, [name]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(message);
  }

  return (
    <div className="send-message">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <h2>Send us a Message</h2>
            </div>
          </div>
          <div className="col-md-8">
            <div className="contact-form">
              <form
                id="contact"
                action=""
                method="post"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Full Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="E-Mail Address"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <input
                      name="subject"
                      type="text"
                      className="form-control"
                      id="subject"
                      placeholder="Subject"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      name="message"
                      rows="6"
                      className="form-control"
                      id="message"
                      placeholder="Your Message"
                      required
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      id="form-submit"
                      className="filled-button"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <ul className="accordion">
              <li>
                <a>Accordion Title One</a>
                <div className="content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                    voluptate nihil eumester consectetur similiqu consectetur.
                    <br></br>Lorem ipsum dolor sit amet, consectetur adipisic
                    elit. Et, consequuntur, modi mollitia corporis ipsa
                    voluptate corrupti elite.
                  </p>
                </div>
              </li>
              <li>
                <a>Second Title Here</a>
                <div className="content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                    voluptate nihil eumester consectetur similiqu consectetur.
                    <br></br>Lorem ipsum dolor sit amet, consectetur adipisic
                    elit. Et, consequuntur, modi mollitia corporis ipsa
                    voluptate corrupti elite.
                  </p>
                </div>
              </li>
              <li>
                <a>Accordion Title Three</a>
                <div className="content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                    voluptate nihil eumester consectetur similiqu consectetur.
                    <br></br>Lorem ipsum dolor sit amet, consectetur adipisic
                    elit. Et, consequuntur, modi mollitia corporis ipsa
                    voluptate corrupti elite.
                  </p>
                </div>
              </li>
              <li>
                <a>Fourth Accordion Title</a>
                <div className="content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed
                    voluptate nihil eumester consectetur similiqu consectetur.
                    <br></br>Lorem ipsum dolor sit amet, consectetur adipisic
                    elit. Et, consequuntur, modi mollitia corporis ipsa
                    voluptate corrupti elite.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
