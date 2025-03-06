import { useState, useEffect } from "react";
import DropDown from "./Images/dropdown.svg";
import SuccessIcon from "./Icons/success.svg";
import { motion } from "framer-motion";
import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import LoadingAnimation from '../LoadingAnimation';
function ClientFeedback() {
  const [dropDown, setDropDown] = useState(false);
  const [satisfaction, setSatisfaction] = useState(false);
  const [classificationDrop, setClassificationDrop] = useState(false);
  const [locationsList, setLocationsList] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [satisfactionLevel, setSatisfactionLevel] = useState("");
  const [feedbackConsole, setFeedbackConsole] = useState(false);
  const [location, setLocation] = useState("");
  const [classifications, setClassifications] = useState("");
  const [feedbackType, setFeedbackType] = useState("Web Feedback"); // Default collection
  const [loading,setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, feedbackType), {
        email,
        feedback,
        satisfactionLevel,
        location: feedbackType === "Locations Feedback" ? location : null,
        webId: Date.now(),
        classifications,
      });

      setFeedbackConsole(true);
      setTimeout(() => setFeedbackConsole(false), 3000);

      // Reset fields
      setEmail("");
      setFeedback("");
      setSatisfactionLevel("");
      setLocation("");
      setClassifications(""); // Reset classification
    } catch (error) {
      console.error("Error adding document: ", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const displayLocation = collection(db, "Content");
        const snapshot = await getDocs(displayLocation);

        const locationsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setLocationsList(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
    >
      <section className="h-screen min-h-screen w-screen mt-14 lg:mt-0 flex flex-col justify-center">
        <section className="mx-10 items-center text-white">
          <div className="justify-start items-center w-full">
            <label className="font-bold text-5xl">Send a Feedback</label>
            <form className="feedback-form" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 grid-rows-2 text-sm lg:text-base lg:flex-row lg:flex gap-5">

                {/* Feedback Type Selection */}
                <button
                  type="button"
                  className={
                    feedbackType === "Web Feedback"
                      ? "button-feedback"
                      : "disabled"
                  }
                  onClick={() => setFeedbackType("Web Feedback")}
                >
                  Website
                </button>
                <button
                  type="button"
                  className={
                    feedbackType === "Locations Feedback"
                      ? "button-feedback"
                      : "disabled"
                  }
                  onClick={() => setFeedbackType("Locations Feedback")}
                >
                  Campus
                </button>

                {/* Location Dropdown */}
                {feedbackType === "Locations Feedback" && (
                  <motion.div 
                  initial={{opacity:0}}
                  animate={{opacity:setDropDown? 1:0}}
                  transition={{duration:0.35, delay:0.2}}
                  className="relative z-10">
                    <button
                      onClick={() => setDropDown(!dropDown)}
                      type="button"
                      className="button-feedback"
                    >
                      {location || "Location"}
                      <img src={DropDown} alt="dropdown" className="w-8" />
                    </button>
                    {dropDown && (
                      <div
                        className="absolute my-2 max-w-36 min-w-32 h-36 overflow-auto flex flex-col bg-bg-gray-v2 shadow-xl p-2 rounded-lg"
                        tabIndex="0"
                        onBlur={() => setDropDown(false)}
                      >
                        <ul className="dropdown-choice">
                          {locationsList.map((loc) => (
                            <li
                              key={loc.id}
                              onClick={() => {
                                setLocation(loc.Name); // Access the name of the location
                                setDropDown(false);
                              }}
                            >
                              {loc.Name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Satisfaction Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setSatisfaction(!satisfaction)}
                    type="button"
                    className="button-feedback flex items-center duration-300"
                  >
                    {satisfactionLevel || "Satisfaction"}
                    <img src={DropDown} alt="dropdown" className="w-8" />
                  </button>
                  {satisfaction && (
                    <div
                      className="absolute my-2 w-36 h-36 overflow-auto flex flex-col bg-bg-gray-v2 shadow-xl p-2 rounded-lg"
                      tabIndex="0"
                      onBlur={() => setSatisfaction(false)}
                    >
                      <ul className="dropdown-choice">
                        {[
                          "Very Satisfied",
                          "Satisfied",
                          "Neutral",
                          "Dissatisfied",
                          "Very Dissatisfied",
                        ].map((level) => (
                          <li
                            key={level}
                            onClick={() => {
                              setSatisfactionLevel(level);
                              setSatisfaction(false);
                            }}
                          >
                            {level}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                {/* Classification Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setClassificationDrop(!classificationDrop)}
                    type="button"
                    className="button-feedback flex items-center duration-300"
                  >
                    {classifications || "Classification"}
                    <img src={DropDown} alt="dropdown" className="w-8" />
                  </button>
                  {classificationDrop && (
                    <div
                      className="absolute my-2 w-36 h-36 overflow-auto flex flex-col bg-bg-gray-v2 shadow-xl p-2 rounded-lg"
                      tabIndex="0"
                      onBlur={() => setClassificationDrop(false)}
                    >
                      <ul className="dropdown-choice">
                        {["Student", "Guest", "Employee"].map((type) => (
                          <li
                            key={type}
                            onClick={() => {
                              setClassifications(type);
                              setClassificationDrop(false);
                            }}
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Feedback Input */}
              <textarea
                placeholder="Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <button type="submit" className="button-feedback">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Success Message */}
        <section className="feedback-console-layout">
          {feedbackConsole && (
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{
                x: feedbackConsole ? 0 : 10,
                opacity: feedbackConsole ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="feedback-console-container">
                <img src={SuccessIcon} alt="" className="size-10" />
                <h1>Feedback Submitted!</h1>
              </div>
            </motion.div>
          )}
        </section>
        {loading && (
                    <div className='z-50'>
                        <LoadingAnimation />
                    </div>
            )}
      </section>
    </motion.div>
  );
}

export default ClientFeedback;
