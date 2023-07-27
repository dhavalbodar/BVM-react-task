import React, { useState, useId } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { createCandidate } from "../Store/Slices/candidateSlice";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  description: yup.string().required("Description is required"),
});

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCandidateModal: React.FC<ProfileModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const candidateId = useId();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setProfileImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsUploading(true);
      // Simulate an API call or actual file upload process here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Hello world");
      console.log({
        ...values,
        profileImage,
      });
      const payload = {
        id: candidateId,
        ...values,
        profileImage,
      };
      dispatch(createCandidate(payload));
      setIsUploading(false);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Candidate Profile</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box
            {...getRootProps()}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 2,
            }}
          >
            <input {...getInputProps()} />
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                style={{
                  width: 150,
                  height: 150,
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <Button variant="contained" component="div">
                Upload Profile Image
              </Button>
            )}
          </Box>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={isUploading}>
            {isUploading ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCandidateModal;
