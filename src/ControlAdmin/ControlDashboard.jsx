import ControlTotal from './AdminIcons/control-total.svg'
import ControlAdd from './AdminIcons/control-add.svg'
import AddIcon from './AdminIcons/AdminAdd.svg';
import SearchIcon from './AdminIcons/search.svg';
import AccountProfile from './AdminIcons/account-profile.svg'
import HistoryIcon from './AdminIcons/history.svg'
import HistoryModal from './AdminIcons/historyModal.svg'
import { useState, useEffect } from 'react';
import StatusHistory from './StatusHistory'
import { motion } from 'motion/react';
import { db, auth } from "../config/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

function ControlDashboard() {
  const [controlModal, setControlModal] = useState(false);
  const [totalContributors, setTotalContributors] = useState(0);
  const [contributors, setContributors] = useState([]);
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistoryTerm, setSearchHistoryTerm] = useState('');

  useEffect(() => {
    const fetchContributors = async () => {
      const querySnapshot = await getDocs(collection(db, "Contributors"));
      setTotalContributors(querySnapshot.size);
      setContributors(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchContributors();
  }, []);

  const openModal = () => {
    setControlModal(true);
  };
  const closeModal = () => {
    setControlModal(false);
  };

  const [accountView, setAccountView] = useState(false);

  const openAccountView = (contributor) => {
    setSelectedContributor(contributor);
    setAccountView(true);
  };
  const closeAccountView = () => {
    setAccountView(false);
    setSelectedContributor(null);
  };

  const [historyModal, setHistoryModal] = useState(false);

  const openHistoryModal = (contributor) => {
    setSelectedContributor(contributor);
    setHistoryModal(true);
  };
  const closeHistoryModal = () => {
    setHistoryModal(false);
    setSelectedContributor(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, contributorID, contributorEmail, contributorPassword } = event.target.elements;

    try {
      // Create user with email and password in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, contributorEmail.value, contributorPassword.value);
      const user = userCredential.user;

      // Add contributor details to Firestore
      await addDoc(collection(db, "Contributors"), {
        name: name.value,
        employeeID: contributorID.value,
        email: contributorEmail.value,
        password: contributorPassword.value,
        userId: user.uid,
        status: 'Added',
        date: new Date().toLocaleDateString()
      });

      // Update the total contributors count and list
      const querySnapshot = await getDocs(collection(db, "Contributors"));
      setTotalContributors(querySnapshot.size);
      setContributors(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Close the modal after successful submission
      closeModal();
    } catch (error) {
      console.error("Error adding contributor: ", error);
    }
  };

  const filteredContributors = contributors.filter(contributor =>
    contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contributor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHistory = contributors.filter(contributor =>
    contributor.name.toLowerCase().includes(searchHistoryTerm.toLowerCase()) ||
    contributor.email.toLowerCase().includes(searchHistoryTerm.toLowerCase())
  );

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <section className="border-none lg:h-screen shadow-box-sec rounded-lg m-3 overflow-hidden">
        <section className="w-full p-5 bg-maroon-custom ">
          <div className="flex flex-row justify-between text-white">
            <label className="text-xl font-medium">Control Admin</label>
          </div>
        </section>
        <section className="control-summary-section">
          <div className="control-summary-container">
            <img src={ControlTotal} alt="" className='lg:size-auto size-28 ' />
            <label>Total contributors: </label>
            <span className="text-maroon-custom">{totalContributors}</span>
          </div>
          <div className="control-summary-container cursor-pointer" onClick={openModal}>
            <img src={ControlAdd} alt="" className='lg:size-auto size-28 ' />
            <img src={AddIcon} alt="" className='lg:size-auto size-8 ' />
            <label>Add Contributor </label>
          </div>
        </section>

        {/* List of Contributors */}
        <section className='control-summary-section'>
          <div className='control-contents h-72'>
            <div className='flex justify-center text-center'>
              <label className='text-xl font-bold mt-5'>Contributors</label>
            </div>
            <form className='control-form'>
              <img src={SearchIcon} alt="search" className='w-9' />
              <input
                type='search'
                name='search-admin-account'
                placeholder='search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            {filteredContributors.map((contributor, index) => (
              <div key={index} className='control-account-list' onClick={() => openAccountView(contributor)}>
                <img src={AccountProfile} alt="" />
                <label>{contributor.name}</label>
              </div>
            ))}
          </div>

          {/* Add Contributors Modal */}
          {controlModal && (
            <motion.div
              initial={{ opacity:0 }}
              animate={{ opacity:1 }}
              transition={{ duration:0.5 }}
            >
              <section className='modal-section overflow-hidden'>
                <div className='modal-control'>
                  <img src={ControlAdd} alt="" className='min-w-72 max-w-80 ' />
                  <label className='text-2xl font-semibold'>Add Contributor</label>
                  <form onSubmit={handleSubmit}>
                    <label className='font-medium'>Name:</label>
                    <input type="text" placeholder='Name' name='name' required />
                    <label className='font-medium'>Employee ID:</label>
                    <input type="text" placeholder='Employee ID' name='contributorID' required />
                    <label className='font-medium'>Email:</label>
                    <input type="email" placeholder='Email' name='contributorEmail' required />
                    <label className='font-medium'>Password:</label>
                    <input type="password" placeholder='password' name='contributorPassword' required />
                    <div className='flex w-full items-center gap-5 p-2 content-end justify-end'>
                      <button type='button' className='bg-admin-hovergray p-2 rounded-md' onClick={closeModal}>Cancel</button>
                      <button className='bg-maroon-custom text-white p-2 rounded-md' type='submit'>Submit</button>
                    </div>
                  </form>
                </div>
              </section>
            </motion.div>
          )}

          {/* History List */}
          <div className='control-contents h-72'>
            <div className='flex justify-center text-center'>
              <label className='text-xl font-bold mt-5'>History</label>
            </div>
            <form className='control-form'>
              <img src={SearchIcon} alt="search" className='w-9' />
              <input
                type='search'
                name='search-admin-history'
                placeholder='search'
                value={searchHistoryTerm}
                onChange={(e) => setSearchHistoryTerm(e.target.value)}
              />
            </form>
            {filteredHistory.map((contributor, index) => (
              <div key={index} className='control-account-list justify-between' onClick={() => openHistoryModal(contributor)}>
                <div className='flex items-center gap-x-5'>
                  <img src={HistoryIcon} alt="" />
                  <label>{contributor.email}</label>
                </div>
                <div className='flex flex-col items-center justify-stretch text-center mx-1'>
                  <StatusHistory status={contributor.status} />
                  <label>{contributor.date}</label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Account View */}
        {accountView && selectedContributor && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.5 }}
            style={{ zIndex:1000 }}
          >
            <section className='modal-section overflow-hidden'>
              <div className='modal-control'>
                <article className='flex flex-col items-center'>
                  <div className='control-profile'>
                    <img src={ControlTotal} alt="" />
                  </div>
                  <label className='text-lg font-semibold'>{selectedContributor.name}</label>
                  <label className='text-sm'>{selectedContributor.employeeID}</label>
                </article>
                <form>
                  <label>Name:</label>
                  <input type="text" name='Admin-Name' placeholder='Name' value={selectedContributor.name} readOnly />
                  <label>Employee ID:</label>
                  <input type="text" name='Admin-ID' placeholder='Employee ID' value={selectedContributor.employeeID} readOnly />
                  <label>Email:</label>
                  <input type="email" name='Admin-Email' placeholder='Email' value={selectedContributor.email} readOnly />
                  <label>Password:</label>
                  <input type="password" name='Admin-password' placeholder='Password' value={selectedContributor.password} readOnly />
                  <div className='flex w-full items-center gap-5 p-2 content-end justify-between'>
                    <button type='button' className='bg-admin-hovergray p-2 rounded-md' onClick={closeAccountView}>Cancel</button>
                    <div className='flex flex-row gap-3'>
                      <button className='bg-maroon-custom text-white p-2 rounded-md' type='submit' onClick={openAccountView}>Submit</button>
                      <button className='bg-maroon-custom text-white p-2 rounded-md' type='button'>Remove</button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </motion.div>
        )}

        {/* History Modal */}
        {historyModal && selectedContributor && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.5 }}
          >
            <section className='modal-section overflow-hidden'>
              <div className='modal-control'>
                <img src={HistoryModal} alt="" className='size-64' />
                <label className='text-2xl font-semibold'>History</label>
                <article className='grid grid-cols-2 text-sm lg:text-xl lg:grid-cols-3 size-full justify-evenly break-before-all items-start'>
                  <ul className='flex flex-col items-center'>
                    <label className='font-semibold text-lg'>Date</label>
                    <li>{selectedContributor.date}</li>
                  </ul>
                  <ul className='flex flex-col items-center'>
                    <label className='font-semibold text-lg'>Employee ID</label>
                    <li>{selectedContributor.employeeID}</li>
                  </ul>
                  <ul className='flex flex-col items-center'>
                    <label className='font-semibold text-lg'>Name</label>
                    <li>{selectedContributor.name}</li>
                  </ul>
                  <ul className='flex flex-col items-center'>
                    <label className='font-semibold text-lg'>Email</label>
                    <li>{selectedContributor.email}</li>
                  </ul>
                  <ul className='flex flex-col items-center'>
                    <label className='font-semibold text-lg'>Status</label>
                    <span className='flex flex-row gap-2'>
                      <StatusHistory status={selectedContributor.status} />
                    </span>
                  </ul>
                </article>
                <div className='flex w-full items-center gap-3 p-2 content-end justify-end'>
                  <button type='button' className='bg-admin-hovergray p-2 rounded-md' onClick={closeHistoryModal}>Cancel</button>
                  <button className='bg-maroon-custom text-white p-2 rounded-md' type='button'>Remove</button>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}

export default ControlDashboard;
