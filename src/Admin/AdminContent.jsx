import { useState } from 'react';
import SearchIcon from './AdminIcons/search.svg';
import AddIcon from './AdminIcons/AdminAdd.svg';
import DeleteAll from './AdminIcons/AdminDelete.svg';
import PH from './AdminImages/PH.jpg';
import SHASH from './AdminImages/SHAS.jpg';
import ContentEditIcon from './AdminIcons/ContentEdit.svg';
import AdminContentInsert from './AdminIcons/AdminContentInsert.svg';
import AdminWarning from './AdminIcons/alarm3.png'
function AdminContent() {
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setdeleteModal] = useState(false);

    const openEditModal = () => setEditModal(true);
    const closeEditModal = (e) => {
        if (e.target.id === 'content-modal') setEditModal(false);
    };

    const openAddModal = () => setAddModal(true);
    const closeAddModal = (e) => {
        if (e.target.id === 'add-modal') setAddModal(false);
    };
    const openDeleteModal = () => setdeleteModal(true);
    const closeDeleteModal = (e) => {
        if (e.target.id === 'warning-modal') setdeleteModal (false);
    };

    return (
        <>
            <section className="m-5 inter">
                <div className="flex gap-5 items-center">
                    <label className="text-4xl font-semibold">Contents</label>
                    <span className="search-bar" >
                        <img src={SearchIcon} alt='SearchIcon'  />
                        <input type='search' name="SearchBar" placeholder='Search' className='bg-transparent outline-none' />
                    </span>
                </div>

                <section className='my-10 grid grid-cols-2  items-center gap-5'>
                    <button className='button-content-container' onClick={openAddModal}>
                        <img src={AddIcon} alt='Add' />
                        <label className='font-medium'>Add Content</label>
                    </button>
                    <button className='button-content-container' onClick={openDeleteModal}>
                        <img src={DeleteAll} alt='Delete All' />
                        <label className='font-medium'>Delete All Content</label>
                    </button>
                </section>

                <section className='grid lg:grid-cols-3 gap-y-2 gap-5'>
                    <div className='admin-content-container'>
                        <img src={PH} alt='phinmahall' className='Content-img' />
                        <label className='font-medium text-xl'>Phinmahall</label>
                        <span className='flex justify-end items-center gap-2'>
                            <button onClick={openEditModal}>
                                <img src={ContentEditIcon} alt='Edit Icon' className='content-icon' />
                            </button>
                        </span>
                    </div>

                    <div className='admin-content-container'>
                        <img src={SHASH} alt='shash' className='Content-img' />
                        <label className='font-medium text-xl'>SHASH</label>
                        <span className='flex justify-end items-center gap-2'>
                            <button onClick={openEditModal}>
                                <img src={ContentEditIcon} alt='Edit Icon' className='content-icon' />
                            </button>
                        </span>
                    </div>

                    <div className='admin-content-container'>
                        <img src={SHASH} alt='shash' className='Content-img' />
                        <label className='font-medium text-xl'>SHASH</label>
                        <span className='flex justify-end items-center gap-2'>
                            <button onClick={openEditModal}>
                                <img src={ContentEditIcon} alt='Edit Icon' className='content-icon' />
                            </button>
                        </span>
                    </div>
                </section>
                {/*warning Modal*/}
                {deleteModal && ( 
                <section id='warning-modal' className='modal-section' onClick={closeDeleteModal}>
                    <div className='modal-content lg:size-3/5' onClick={(e) => e.stopPropagation()}>
                        <span className='flex flex-col text-center items-center'>
                        <img src={AdminWarning} alt='Warning' className='w-36'/>
                        <h1 className='font-bold text-2xl'>WARNING!</h1>
                        <label className='lg:text-base text-sm'>ARE YOU SURE TO CONTINUE THIS ACTION?</label>
                        <form>
                            <input type='submit' value="Continue" name="deleteAll" className='input-submit w-72'></input>
                        </form>
                        </span>
                    </div>
                </section>
                )}
                {/* Add Modal */}
                {addModal && (
                    <section id='add-modal' className='modal-section' onClick={closeAddModal}>
                        <div className='modal-content w-w-nav  lg:size-3/5' onClick={(e) => e.stopPropagation()}>
                            <div className='flex flex-col size-full justify-center overflow-hidden items-center border-dashed border-2 m-1 rounded-3xl border-maroon-custom'>
                                <img src={AdminContentInsert} className='h-9' alt="Content" />
                                <button className='modal-add-button'>Add Image</button>
                            </div>
                            <form className='flex flex-col gap-1 p-2 size-full '>
                                <label className='font-semibold text-2xl'>Add Content</label>
                                <label>Location Name:</label>
                                <input type='text' placeholder='Location Name' className='modal-input' required />
                                <label>Location:</label>
                                <input type='text' placeholder='Locations' className='modal-input' required />
                                <label>Description:</label>
                                <textarea placeholder='Description' className='modal-input text-area' required />
                                <span className='flex justify-end items-center gap-2'>
                                    <input type='reset' value="Reset" name='Clear' className='input-remove' />
                                    <input type='submit' value="Save" name='AddSave' className='input-submit' />
                                </span>
                            </form>
                        </div>
                    </section>
                )}

                {/* Edit Modal */}
                {editModal && (
                    <section id='content-modal' className='modal-section' onClick={closeEditModal}>
                        <div className='modal-content size-3/5' onClick={(e) => e.stopPropagation()}>
                            <span className='flex flex-col w-full justify-end items-center'>
                                <img src={PH} className='h-full' alt="Content" />
                                <button className='modal-change-button'>Change Image</button>
                            </span>
                            <form className='flex flex-col gap-5 m-2 p-2 size-full '>
                                <label className='font-semibold text-2xl'>Edit Content</label>
                                <input type='text' placeholder='Location Name' className='modal-input' required />
                                <input type='text' placeholder='Locations' className='modal-input' required />
                                <textarea placeholder='Description' className='modal-input text-area' required />
                                <span className='flex justify-end items-center gap-2'>
                                    <input type='submit' value="Delete" name='Delete' className='input-remove' />
                                    <input type='submit' value="Save" name='Save' className='input-submit' />
                                </span>
                            </form>
                        </div>
                    </section>
                )}
            </section>
        </>
    );
}

export default AdminContent;
