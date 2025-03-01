import { motion, AnimatePresence, easeIn } from 'framer-motion';
import ClientSearch from './Icons/ClientSearch.svg';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function ClientGallery() {
  const [galleryModal, setGalleryModal] = useState(false);
  const [locations, setLocations] = useState([]); // Initialize as an empty array
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const querySnapshot = await getDocs(collection(db, 'Content'));
      const locationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLocations(locationsData);
    };
    fetchLocations();
  }, []);

  const openModal = (location) => {
    setSelectedLocation(location);
    setGalleryModal(true);
  };

  const closeModal = () => setGalleryModal(false);

  return (
    <>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: easeIn }}
      >
        <section className="text-white pt-32 mx-10 min-h-screen">
          <label className="lg:text-6xl text-5xl font-bold">Gallery</label>
          <section>
            <form className="flex flex-row items-center">
              <div id="modalGallery" className="home-search-container">
                <img src={ClientSearch} alt="searchIcon" className="w-10" />
                <input
                  className="search-input"
                  type="search"
                  name="search"
                  placeholder="Search"
                />
              </div>
            </form>
            <section className=" justify-center h-sm md:h-md lg:h-96  overflow-auto">
              <div className="gallery-section ">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="gallery-container"
                    onClick={() => openModal(location)}
                  >
                    <div className="aspect-video rounded-2xl bg-contain overflow-hidden gallery-content">
                      <img
                        src={location.Image}
                        alt={location.Name}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </div>
                    <label className="text-2xl pt-2 pb-4 px-2">
                      {location.Name}
                    </label>
                  </div>
                ))}
              </div>
            </section>
          </section>
          <AnimatePresence>
            {galleryModal && selectedLocation && (
              
              <motion.section
                id="modal-sec"
                onClick={closeModal}
                className="modal-section"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="modal-gallery-container"
                  onClick={(e) => e.stopPropagation()}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="aspect-video overflow-hidden flex items-center">
                    <img src={selectedLocation.Image} alt={selectedLocation.Name}  />
                  </div>
                  <div className="flex my-2 lg:my-5 flex-col justify-start size-full">
                    <div className="flex flex-row items-center mx-4">
                      <label className="text-3xl m-3 font-bold uppercase">
                        {selectedLocation.Name}
                      </label>
                    </div>
                    <div className="gal-cont-inf">
                      <p>{selectedLocation.Description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.section>
            )}
          </AnimatePresence>
        </section>
      </motion.div>
    </>
  );
}

export default ClientGallery;
