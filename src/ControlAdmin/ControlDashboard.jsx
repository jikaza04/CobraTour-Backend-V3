import ControlTotal from './AdminIcons/control-total.svg';
import ControlAdd from './AdminIcons/control-add.svg';
import AddIcon from './AdminIcons/AdminAdd.svg';
import SearchIcon from './AdminIcons/search.svg';
import AccountProfile from './AdminIcons/account-profile.svg';
import HistoryIcon from './AdminIcons/history.svg';
import HistoryModal from './AdminIcons/historyModal.svg';
import { useState, useEffect } from 'react';
import StatusHistory from './StatusHistory';
import { motion } from 'framer-motion';
import { db, auth } from '../config/firebase';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, updateEmail, updatePassword } from 'firebase/auth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function ControlDashboard() {
  const [controlModal, setControlModal] = useState(false);
  const [totalContributors, setTotalContributors] = useState(0);
  const [contributors, setContributors] = useState([]);
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistoryTerm, setSearchHistoryTerm] = useState('');
  const [editableContributor, setEditableContributor] = useState({
    name: '',
    employeeID: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchContributors = async () => {
      const querySnapshot = await getDocs(collection(db, 'Contributors'));
      const activeContributors = querySnapshot.docs.filter(doc => doc.data().status !== 'Removed');
      setTotalContributors(activeContributors.length);
      setContributors(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
    setEditableContributor({
      name: contributor.name,
      employeeID: contributor.employeeID,
      email: contributor.email,
      password: '' // Password will be updated separately
    });
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

      // Add contributor details to Firestore without the password
      await addDoc(collection(db, 'Contributors'), {
        name: name.value,
        employeeID: contributorID.value,
        email: contributorEmail.value,
        userId: user.uid,
        status: 'Added',
        date: new Date().toLocaleDateString(),
      });

      // Update the total contributors count and list
      const querySnapshot = await getDocs(collection(db, 'Contributors'));
      const activeContributors = querySnapshot.docs.filter(doc => doc.data().status !== 'Removed');
      setTotalContributors(activeContributors.length);
      setContributors(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      // Close the modal after successful submission
      closeModal();
    } catch (error) {
      console.error('Error adding contributor: ', error);
    }
  };

  const handleRemoveContributor = async (contributor) => {
    try {
      if (contributor.status === 'Removed') {
        // Delete the contributor's document from Firestore
        const contributorRef = doc(db, 'Contributors', contributor.id);
        await deleteDoc(contributorRef);

        // Delete the contributor's account from Firebase Authentication
        const user = auth.currentUser;
        if (user && user.uid === contributor.userId) {
          await deleteUser(user);
        }
      } else {
        // Update the contributor's status to "Removed" in Firestore
        const contributorRef = doc(db, 'Contributors', contributor.id);
        await updateDoc(contributorRef, {
          status: 'Removed',
          date: new Date().toLocaleDateString(),
        });

        // Delete the contributor's account from Firebase Authentication
        const user = auth.currentUser;
        if (user && user.uid === contributor.userId) {
          await deleteUser(user);
        }
      }

      // Update the contributors list
      const querySnapshot = await getDocs(collection(db, 'Contributors'));
      const activeContributors = querySnapshot.docs.filter(doc => doc.data().status !== 'Removed');
      setTotalContributors(activeContributors.length);
      setContributors(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      // Close the account view or history modal if open
      closeAccountView();
      closeHistoryModal();
    } catch (error) {
      console.error('Error removing contributor: ', error);
    }
  };

  const handleUpdateContributor = async (event) => {
    event.preventDefault();
    try {
      // Find the contributor by email
      const q = query(collection(db, 'Contributors'), where('email', '==', selectedContributor.email));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
  
        // Get the user by email
        let user;
        if (selectedContributor.password) {
          const userCredential = await signInWithEmailAndPassword(auth, selectedContributor.email, selectedContributor.password);
          user = userCredential.user;
        }
  
        // Update email in Firebase Authentication if it has changed
        if (editableContributor.email !== selectedContributor.email && user) {
          await updateEmail(user, editableContributor.email);
        }
  
        // Update password in Firebase Authentication if it is provided
        if (editableContributor.password && user) {
          await updatePassword(user, editableContributor.password);
        }
  
        // Update contributor details in Firestore without the password
        await updateDoc(docRef, {
          name: editableContributor.name,
          employeeID: editableContributor.employeeID,
          email: editableContributor.email,
        });
  
        // Update the contributors list
        const allContributors = await getDocs(collection(db, 'Contributors'));
        const activeContributors = allContributors.docs.filter(doc => doc.data().status !== 'Removed');
        setTotalContributors(activeContributors.length);
        setContributors(allContributors.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  
        // Close the account view after successful update
        closeAccountView();
      }
    } catch (error) {
      console.error('Error updating contributor: ', error);
    }
  };

  const filteredContributors = contributors.filter(
    (contributor) =>
      contributor.status !== 'Removed' &&
      (contributor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contributor.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredHistory = contributors
    .filter(
      (contributor) =>
        contributor.name.toLowerCase().includes(searchHistoryTerm.toLowerCase()) ||
        contributor.email.toLowerCase().includes(searchHistoryTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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
            <img src={ControlTotal} alt="" className="lg:size-auto size-28 " />
            <label>Total contributors: </label>
            <span className="text-maroon-custom">{totalContributors}</span>
          </div>
          <div className="control-summary-container cursor-pointer" onClick={openModal}>
            <img src={ControlAdd} alt="" className="lg:size-auto size-28 " />
            <img src={AddIcon} alt="" className="lg:size-auto size-8 " />
            <label>Add Contributor </label>
          </div>
        </section>

        {/* List of Contributors */}
        <section className="control-summary-section">
          <div className="control-contents h-72">
            <div className="flex justify-center text-center">
              <label className="text-xl font-bold mt-5">Contributors</label>
            </div>
            <form className="control-form">
              <img src={SearchIcon} alt="search" className="w-9" />
              <input
                type="search"
                name="search-admin-account"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            {filteredContributors.map((contributor, index) => (
              <div key={index} className="control-account-list" onClick={() => openAccountView(contributor)}>
                <img src={AccountProfile} alt="" />
                <label>{contributor.name}</label>
              </div>
            ))}
          </div>

          {/* Add Contributors Modal */}
          {controlModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <section className="modal-section overflow-hidden">
                <div className="modal-control">
                  <img src={ControlAdd} alt="" className="min-w-72 max-w-80 " />
                  <label className="text-2xl font-semibold">Add Contributor</label>
                  <form onSubmit={handleSubmit}>
                    <label className="font-medium">Name:</label>
                    <input type="text" placeholder="Name" name="name" required />
                    <label className="font-medium">Employee ID:</label>
                    <input type="text" placeholder="Employee ID" name="contributorID" required />
                    <label className="font-medium">Email:</label>
                    <input type="email" placeholder="Email" name="contributorEmail" required />
                    <label className="font-medium">Password:</label>
                    <input type="password" placeholder="password" name="contributorPassword" required />
                    <div className="flex w-full items-center gap-5 p-2 content-end justify-end">
                      <button type="button" className="bg-admin-hovergray p-2 rounded-md" onClick={closeModal}>
                        Cancel
                      </button>
                      <button className="bg-maroon-custom text-white p-2 rounded-md" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </section>
            </motion.div>
          )}

          {/* History List */}
          <div className="control-contents h-72">
            <div className="flex justify-center text-center">
              <label className="text-xl font-bold mt-5">History</label>
            </div>
            <form className="control-form">
              <img src={SearchIcon} alt="search" className="w-9" />
              <input
                type="search"
                name="search-admin-history"
                placeholder="search"
                value={searchHistoryTerm}
                onChange={(e) => setSearchHistoryTerm(e.target.value)}
              />
            </form>
            {filteredHistory.map((contributor, index) => (
              <div key={index} className="control-account-list justify-between" onClick={() => openHistoryModal(contributor)}>
                <div className="flex items-center gap-x-5">
                  <img src={HistoryIcon} alt="" />
                  <label>{contributor.email}</label>
                </div>
                <div className="flex flex-col items-center justify-stretch text-center mx-1">
                  <StatusHistory status={contributor.status} />
                  <label>{contributor.date}</label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Account View */}
        {accountView && selectedContributor && selectedContributor.status !== 'Removed' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ zIndex: 1000 }}>
            <section className="modal-section overflow-hidden">
              <div className="modal-control">
                <article className="flex flex-col items-center">
                  <div className="control-profile">
                    <img src={ControlTotal} alt="" />
                  </div>
                  <label className="text-lg font-semibold">{selectedContributor.name}</label>
                  <label className="text-sm">{selectedContributor.employeeID}</label>
                </article>
                <form onSubmit={handleUpdateContributor}>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="Admin-Name"
                    placeholder="Name"
                    value={editableContributor.name}
                    onChange={(e) => setEditableContributor({ ...editableContributor, name: e.target.value })}
                    required
                    className="w-full"
                  />
                  <label>Employee ID:</label>
                  <input
                    type="text"
                    name="Admin-ID"
                    placeholder="Employee ID"
                    value={editableContributor.employeeID}
                    onChange={(e) => setEditableContributor({ ...editableContributor, employeeID: e.target.value })}
                    required
                    className="w-full"
                  />
                  <label>Email:</label>
                  <input
                    type="email"
                    name="Admin-Email"
                    placeholder="Email"
                    value={editableContributor.email}
                    onChange={(e) => setEditableContributor({ ...editableContributor, email: e.target.value })}
                    required
                    className="w-full"
                  />
                  <label>Change Password:</label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="Admin-password"
                      placeholder="Change Contributor's password"
                      value={editableContributor.password}
                      onChange={(e) => setEditableContributor({ ...editableContributor, password: e.target.value })}
                      className="w-full"
                    />
                    <span
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                  <div className="flex w-full items-center gap-5 p-2 content-end justify-between">
                    <button type="button" className="bg-admin-hovergray p-2 rounded-md" onClick={closeAccountView}>
                      Cancel
                    </button>
                    <div className="flex flex-row gap-3">
                      <button className="bg-maroon-custom text-white p-2 rounded-md" type="submit">
                        Submit
                      </button>
                      <button
                        className="bg-maroon-custom text-white p-2 rounded-md"
                        type="button"
                        onClick={() => handleRemoveContributor(selectedContributor)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </motion.div>
        )}

        {/* History Modal */}
        {historyModal && selectedContributor && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <section className="modal-section overflow-hidden">
              <div className="modal-control">
                <img src={HistoryModal} alt="" className="size-64" />
                <label className="text-2xl font-semibold">History</label>
                <article className="grid grid-cols-2 text-sm lg:text-xl lg:grid-cols-3 size-full justify-evenly break-before-all items-start">
                  <ul className="flex flex-col items-center">
                    <label className="font-semibold text-lg">Date</label>
                    <li>{selectedContributor.date}</li>
                  </ul>
                  <ul className="flex flex-col items-center">
                    <label className="font-semibold text-lg">Employee ID</label>
                    <li>{selectedContributor.employeeID}</li>
                  </ul>
                  <ul className="flex flex-col items-center">
                    <label className="font-semibold text-lg">Name</label>
                    <li>{selectedContributor.name}</li>
                  </ul>
                  <ul className="flex flex-col items-center">
                    <label className="font-semibold text-lg">Email</label>
                    <li>{selectedContributor.email}</li>
                  </ul>
                  <ul className="flex flex-col items-center">
                    <label className="font-semibold text-lg">Status</label>
                    <span className="flex flex-row gap-2">
                      <StatusHistory status={selectedContributor.status} />
                    </span>
                  </ul>
                </article>
                <div className="flex w-full items-center gap-3 p-2 content-end justify-end">
                  <button type="button" className="bg-admin-hovergray p-2 rounded-md" onClick={closeHistoryModal}>
                    Cancel
                  </button>
                  {selectedContributor.status === 'Removed' && (
                    <button
                      className="bg-maroon-custom text-white p-2 rounded-md"
                      type="button"
                      onClick={() => handleRemoveContributor(selectedContributor)}
                    >
                      Remove
                    </button>
                  )}
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