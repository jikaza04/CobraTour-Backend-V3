import { useState } from 'react';  // Importing useState hook to manage component state

// Importing icons and images used in the component
import SearchIcon from './AdminIcons/search.svg';
import AddIcon from './AdminIcons/AdminAdd.svg';
import DeleteAll from './AdminIcons/AdminDelete.svg';
import ContentEditIcon from './AdminIcons/ContentEdit.svg';
import AdminContentInsert from './AdminIcons/AdminContentInsert.svg';
import AdminWarning from './AdminIcons/alarm3.png';

function AdminContent() {
    // State variables for managing modals
    const [editModal, setEditModal] = useState(false);  // Controls visibility of the edit modal
    const [addModal, setAddModal] = useState(false);    // Controls visibility of the add modal
    const [deleteModal, setDeleteModal] = useState(false);  // Controls visibility of the delete confirmation modal
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);  // Controls visibility of the delete confirmation modal for specific content
    const [contentToDelete, setContentToDelete] = useState(null);  // Tracks the content to be deleted
    const [searchQuery, setSearchQuery] = useState('');  // Tracks the search query

    // State for managing the list of content and the new content being added
    const [contentList, setContentList] = useState([]);  // Stores the list of content items
    const [newContent, setNewContent] = useState({ name: '', location: '', description: '', image: '' });  // Tracks new content input
    const [editContent, setEditContent] = useState({ id: null, name: '', location: '', description: '', image: '' });  // Tracks content being edited

    // Function to open the edit modal
    const openEditModal = (content) => {
        setEditContent(content);
        setEditModal(true);
    };

    // Function to close the edit modal when clicking outside the modal content
    const closeEditModal = (e) => { 
        if (e.target.id === 'content-modal') setEditModal(false); 
    };

    // Function to open the add modal
    const openAddModal = () => setAddModal(true);

    // Function to close the add modal when clicking outside the modal content
    const closeAddModal = (e) => { 
        if (e.target.id === 'add-modal') setAddModal(false); 
    };

    // Function to open the delete confirmation modal
    const openDeleteModal = () => setDeleteModal(true);

    // Function to close the delete confirmation modal when clicking outside the modal content
    const closeDeleteModal = (e) => { 
        if (e.target.id === 'warning-modal') setDeleteModal(false); 
    };

    // Function to handle changes in input fields for new content
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewContent((prev) => ({ ...prev, [name]: value }));  // Update the corresponding field in the newContent state
    };

    // Function to handle changes in input fields for editing content
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditContent((prev) => ({ ...prev, [name]: value }));  // Update the corresponding field in the editContent state
    };

    // Function to handle image selection for new content
    const handleImageChange = (e) => {
        const file = e.target.files[0];  // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setNewContent((prev) => ({ ...prev, image: reader.result }));  // Set the image as a data URL
            reader.readAsDataURL(file);  // Read the file as a data URL
        }
    };

    // Function to handle image selection for editing content
    const handleEditImageChange = (e) => {
        const file = e.target.files[0];  // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setEditContent((prev) => ({ ...prev, image: reader.result }));  // Set the image as a data URL
            reader.readAsDataURL(file);  // Read the file as a data URL
        }
    };

    // Function to add new content to the content list
    const handleAddContent = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        if (newContent.name && newContent.location && newContent.description && newContent.image) {
            // Add the new content to the list with a unique ID
            setContentList((prev) => [...prev, { ...newContent, id: Date.now() }]);
            // Reset the newContent state
            setNewContent({ name: '', location: '', description: '', image: '' });
            setAddModal(false);  // Close the add modal
        } else {
            alert('Please fill out all fields and upload an image.');  // Show an alert if any field is missing
        }
    };

    // Function to save the edited content
    const handleEditContent = (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        setContentList((prev) =>
            prev.map((content) =>
                content.id === editContent.id ? editContent : content
            )
        );
        setEditModal(false);  // Close the edit modal
    };

    // Function to confirm deletion of specific content
    const confirmDeleteContent = (content) => {
        setContentToDelete(content);
        setConfirmDeleteModal(true);
    };

    // Function to delete the specific content
    const handleDeleteContent = () => {
        setContentList((prev) => prev.filter((content) => content.id !== contentToDelete.id));
        setConfirmDeleteModal(false);  // Close the confirm delete modal
        setEditModal(false);  // Close the edit modal if open
    };

    // Function to reset the input fields for new content
    const handleReset = () => setNewContent({ name: '', location: '', description: '', image: '' });

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtered content list based on search query
    const filteredContentList = contentList.filter((content) =>
        content.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Header Section with Search Bar */}
            <section className="m-5 inter">
                <div className="flex gap-5 items-center">
                    <label className="text-4xl font-semibold">Contents</label>
                    <span className="flex items-center relative">
                        <img src={SearchIcon} alt="Search Icon" className="w-8 absolute left-1" />
                        <input
                            type="search"
                            name="SearchBar"
                            placeholder="Search"
                            className="search-bar"
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
                <section className="grid grid-cols-3 gap-5">
                    {filteredContentList.map((content) => (
                        <div key={content.id} className="admin-content-container">
                            <img src={content.image} alt={content.name} className="Content-img" />
                            <label className="font-medium text-xl">{content.name}</label>
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
                                <label>ARE YOU SURE TO CONTINUE THIS ACTION?</label>
                                <form>
                                    <input type="submit" value="Continue" name="deleteAll" className="input-submit w-72" />
                                </form>
                            </span>
                        </div>
                    </section>
                )}

                {/* Add Content Modal */}
                {addModal && (
                    <section id="add-modal" className="modal-section" onClick={closeAddModal}>
                        <div className="modal-content size-3/5" onClick={(e) => e.stopPropagation()}>
                            <span className="flex flex-col w-full justify-center items-center border-dashed border-2 m-1 rounded-3xl border-maroon-custom">
                                {newContent.image ? (
                                    <img src={newContent.image} className="h-50" alt="Selected" style={{ objectFit: 'cover' }} />
                                ) : (
                                    <img src={AdminContentInsert} className="h-50 w-32 object-cover rounded-lg" alt="Content" style={{ objectFit: 'cover' }} />
                                )}
                                <label htmlFor="file-input" className="modal-add-button cursor-pointer">Add Image</label>
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