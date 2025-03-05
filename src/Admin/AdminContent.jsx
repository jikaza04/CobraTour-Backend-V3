import { useState, useEffect } from 'react';
import axios from 'axios';
import { db } from '../config/firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, getDocs, writeBatch, updateDoc } from 'firebase/firestore';

import SearchIcon from './AdminIcons/search.svg';
import AddIcon from './AdminIcons/AdminAdd.svg';
import DeleteAll from './AdminIcons/AdminDelete.svg';
import ContentEditIcon from './AdminIcons/ContentEdit.svg';
import AdminContentInsert from './AdminIcons/AdminContentInsert.svg';
import AdminWarning from './AdminIcons/alarm3.png';


function AdminContent() {
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [contentToDelete, setContentToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [contentList, setContentList] = useState([]);
    const [newContent, setNewContent] = useState({ name: '', location: '', description: '', image: '' });
    const [editContent, setEditContent] = useState({ id: null, name: '', location: '', description: '', image: '' });

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Content"), (snapshot) => {
            const contentData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setContentList(contentData);
        });
    
        return () => unsubscribe();
    }, []);

    const openEditModal = (content) => {
        setEditContent(content);
        setEditModal(true);
    };

    const closeEditModal = (e) => { 
        if (e.target.id === 'content-modal') setEditModal(false); 
    };

    const openAddModal = () => setAddModal(true);

    const closeAddModal = (e) => { 
        if (e.target.id === 'add-modal') setAddModal(false); 
    };

    const openDeleteModal = () => setDeleteModal(true);

    const closeDeleteModal = (e) => { 
        if (e.target.id === 'warning-modal') setDeleteModal(false); 
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContent((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditContent((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setNewContent((prev) => ({ ...prev, image: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setEditContent((prev) => ({ ...prev, image: reader.result }));
            reader.readAsDataURL(file);
        }
    };

    const uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "content-preset");
        formData.append("cloud_name", "dz4pb5rg4");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dz4pb5rg4/image/upload", formData);
            return response.data.url;
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleAddContent = async (e) => {
        e.preventDefault();
        console.log('Adding content:', newContent);
    
        if (newContent.name && newContent.location && newContent.description && newContent.image) {
            const imageUrl = await uploadImage(newContent.image);
            console.log('Image URL:', imageUrl);
    
            if (imageUrl) {
                const newContentData = { ...newContent, image: imageUrl };
                
                try {
                    const docRef = await addDoc(collection(db, "Content"), {
                        Name: newContentData.name,
                        Location: newContentData.location,
                        Description: newContentData.description,
                        Image: newContentData.image,
                    });
                    newContentData.id = docRef.id; // Assign the Firestore document ID to the content
                    setContentList((prev) => [...prev, newContentData]);
                    console.log('New content list:', contentList);
                    setNewContent({ name: '', location: '', description: '', image: '' });
                    setAddModal(false);
                } catch (error) {
                    console.error("Error adding document to Firestore:", error);
                    alert('Failed to add content to Firestore. Please try again.');
                }
            } else {
                alert('Failed to upload image. Please try again.');
            }
        } else {
            alert('Please fill out all fields and upload an image.');
        }
    };

    const handleEditContent = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
    
        // Check if the image has been changed and needs to be uploaded
        const imageUrl = editContent.image.startsWith('data:') ? await uploadImage(editContent.image) : editContent.image;
    
        if (imageUrl) {
            const updatedContentData = { ...editContent, image: imageUrl };
    
            try {
                // Update the Firestore document with the new details
                await updateDoc(doc(db, "Content", editContent.id), {
                    Name: updatedContentData.name,
                    Location: updatedContentData.location,
                    Description: updatedContentData.description,
                    Image: updatedContentData.image,
                });
    
                // Update the local state with the new content details
                setContentList((prev) =>
                    prev.map((content) =>
                        content.id === editContent.id ? updatedContentData : content
                    )
                );
    
                console.log('Content updated successfully.');
                setEditModal(false);  // Close the edit modal
            } catch (error) {
                console.error("Error updating document in Firestore:", error);
                alert('Failed to update content in Firestore. Please try again.');
            }
        } else {
            alert('Failed to upload image. Please try again.');
        }
    };

    const confirmDeleteContent = (content) => {
        setContentToDelete(content);
        setConfirmDeleteModal(true);
    };

    const handleDeleteContent = async () => {
        if (contentToDelete) {
            try {
                await deleteDoc(doc(db, "Content", contentToDelete.id));
                setContentList((prev) => prev.filter((content) => content.id !== contentToDelete.id));
                setConfirmDeleteModal(false);
                setEditModal(false);
            } catch (error) {
                console.error("Error deleting document from Firestore:", error);
                alert('Failed to delete content from Firestore. Please try again.');
            }
        }
    };

    const handleDeleteAllContent = async (e) => {
        e.preventDefault();
        try {
            const contentCollection = collection(db, "Content");
            const snapshot = await getDocs(contentCollection);
            const batch = writeBatch(db);

            if (snapshot.empty) {
                console.log("No documents found in the collection.");
                alert('No content to delete.');
                return;
            }

            snapshot.forEach((doc) => {
                console.log(`Deleting document with ID: ${doc.id}`);
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log('All documents deleted successfully.');
            setContentList([]);
            setDeleteModal(false);
        } catch (error) {
            console.error("Error deleting all documents from Firestore:", error);
            alert('Failed to delete all content from Firestore. Please try again.');
        }
    };

    const handleReset = () => setNewContent({ name: '', location: '', description: '', image: '' });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredContentList = contentList.filter((content) =>
        content.Name && content.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Header Section with Search Bar */}
            <section className="m-5 inter">
                <div className="flex flex-col lg:flex-row gap-5 items-start ">
                    <label className="text-4xl font-semibold">Contents</label>
                    <span className="search-bar">
                        <img src={SearchIcon} alt="Search Icon" className="w-8" />
                        <input
                            type="search"
                            name="SearchBar"
                            placeholder="Search"
                            className='bg-transparent w-full outline-none'
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </span>
                </div>

                {/* Content Management Buttons */}
                <section className="my-10 flex justify-center items-center gap-5">
                    <button className="flex justify-center items-center button-content-container" onClick={openAddModal}>
                        <img src={AddIcon} alt="Add" />
                        <label className="font-medium">Add Content</label>
                    </button>
                    <button className="flex justify-center items-center button-content-container" onClick={openDeleteModal}>
                        <img src={DeleteAll} alt="Delete All" />
                        <label className="font-medium">Delete All Content</label>
                    </button>
                </section>

                {/* List of Content Items */}
                <section className="grid lg:grid-cols-3 gap-5">
                    {filteredContentList.map((content) => (
                        <div key={content.id} className="admin-content-container">
                            <img src={content.Image} alt={content.Name} className="Content-img" />
                            <label className="font-medium text-xl">{content.Name}</label>
                            <span className="flex justify-end items-center gap-2">
                                <button onClick={() => openEditModal(content)}>
                                    <img src={ContentEditIcon} alt="Edit Icon" className="content-icon" />
                                </button>
                            </span>
                        </div>
                    ))}
                </section>

                {/* Delete Warning Modal */}
                {deleteModal && (
                    <section id="warning-modal" className="modal-section" onClick={closeDeleteModal}>
                        <div className="modal-content justify-center items-center size-3/5" onClick={(e) => e.stopPropagation()}>
                            <span className="flex flex-col items-center">
                                <img src={AdminWarning} alt="Warning" className="w-36" />
                                <h1 className="font-bold text-2xl">WARNING!</h1>
                                <label className='text-xs lg:text-base'>ARE YOU SURE TO CONTINUE THIS ACTION?</label>
                                <form onSubmit={handleDeleteAllContent}>
                                    <input type="submit" value="Continue" name="deleteAll" className="input-submit w-72" />
                                </form>
                            </span>
                        </div>
                    </section>
                )}

                {/* Add Content Modal */}
                {addModal && (
                    <section id="add-modal" className="modal-section" onClick={closeAddModal}>
                        <div className="modal-content w-full h-v-modal mx-4 lg:size-3/5" onClick={(e) => e.stopPropagation()}>
                            <span className="flex flex-col overflow-hidden w-full lg:size-full justify-center items-center border-dashed border-2 m-1 rounded-3xl border-maroon-custom">
                                {newContent.image ? (
                                    <img src={newContent.image} className="h-50" alt="Selected" style={{ objectFit: 'fit' }} />
                                ) : (
                                    <img src={AdminContentInsert} className="h-50 w-32 object-cover rounded-lg" alt="Content" style={{ objectFit: 'cover' }} />
                                )}
                                <label htmlFor="file-input" className="modal-add-button cursor-pointer absolute">Add Image</label>
                                <input id="file-input" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                            </span>
                            <form className="flex flex-col gap-1 p-2 size-full" onSubmit={handleAddContent}>
                                <label className="font-semibold text-2xl">Add Content</label>
                                <label>Name:</label>
                                <input type="text" name="name" placeholder="Location Name" className="modal-input" value={newContent.name} onChange={handleInputChange} required />
                                <label>Location:</label>
                                <input type="text" name="location" placeholder="Location of the place" className="modal-input" value={newContent.location} onChange={handleInputChange} required />
                                <label>Description:</label>
                                <textarea name="description" placeholder="Description of the place" className="modal-input text-area" value={newContent.description} onChange={handleInputChange} required />
                                <span className="flex justify-end items-center gap-2">
                                    <input type="reset" value="Reset" className="input-remove" onClick={handleReset} />
                                    <input type="submit" value="Save" className="input-submit" />
                                </span>
                            </form> 
                        </div>
                    </section>
                )}

                {/* Edit Content Modal */}
                {editModal && (
                    <section id="content-modal" className="modal-section" onClick={closeEditModal}>
                        <div className="modal-content size-3/5" onClick={(e) => e.stopPropagation()}>
                            <span className="flex flex-col w-full justify-end items-center">
                                <img src={editContent.image} className="h-full" alt="Content" style={{ objectFit: 'cover' }} />
                                <label htmlFor="edit-file-input" className="modal-change-button cursor-pointer">Change Image</label>
                                <input id="edit-file-input" type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} />
                            </span>
                            <form className="flex flex-col gap-5 m-2 p-2 size-full" onSubmit={handleEditContent}>
                                <label className="font-semibold text-2xl">Edit Content</label>
                                <input type="text" name="name" placeholder="Location Name" className="modal-input" value={editContent.name} onChange={handleEditInputChange} required />
                                <input type="text" name="location" placeholder="Locations" className="modal-input" value={editContent.location} onChange={handleEditInputChange} required />
                                <textarea name="description" placeholder="Description" className="modal-input text-area" value={editContent.description} onChange={handleEditInputChange} required />
                                <span className="flex justify-end items-center gap-2">
                                    <input type="button" value="Delete" className="input-remove" onClick={() => confirmDeleteContent(editContent)} />
                                    <input type="submit" value="Save" className="input-submit" />
                                </span>
                            </form>
                        </div>
                    </section>
                )}

                {/* Confirm Delete Modal */}
                {confirmDeleteModal && (
                    <section id="confirm-delete-modal" className="modal-section" onClick={() => setConfirmDeleteModal(false)}>
                        <div className="modal-content justify-center items-center size-3/5" onClick={(e) => e.stopPropagation()}>
                            <span className="flex flex-col items-center">
                                <img src={AdminWarning} alt="Warning" className="w-36" />
                                <h1 className="font-bold text-2xl">WARNING!</h1>
                                <label>ARE YOU SURE YOU WANT TO DELETE THIS CONTENT?</label>
                                <div className="flex gap-4 mt-4">
                                    <button className="input-remove" onClick={handleDeleteContent}>Yes</button>
                                    <button className="input-submit" onClick={() => setConfirmDeleteModal(false)}>No</button>
                                </div>
                            </span>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
}

export default AdminContent;