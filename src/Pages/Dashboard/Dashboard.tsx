import React, { useState } from "react";
import AddCandidateModal from "../../Components/AddCandidateModal";
import { Button } from "@mui/material";
import CandidateList from "../../Components/CandidateList";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

const Dashboard: React.FC = () => {
  
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { candidateList } = useSelector((state:RootState)=> state.candidate)

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  const handleEditProfile = (id: string) => {
    // Handle the edit logic here, maybe show a modal with a form to edit the profile data
    // console.log(`Editing profile with ID: ${id}`);
  };

  const handleDeleteProfile = (id: string) => {
    // Handle the delete logic here, remove the profile from the state
    // setProfiles((prevProfiles) => prevProfiles.filter((profile) => profile.id !== id));
    // console.log(`Deleting profile with ID: ${id}`);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add Candidate
      </Button>
      <CandidateList profiles={candidateList} onEdit={handleEditProfile} onDelete={handleDeleteProfile}/>
      <AddCandidateModal open={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default Dashboard;
