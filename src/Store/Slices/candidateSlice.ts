import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Candidate {
  id: string;
  name: string;
  phoneNumber: string;
  profileImage: File | null;
  description: string;
}

interface UserPayload {
  name: string;
  email: string;
  password: string;
}

interface CandidateState {
  candidateList: Candidate[];
}

const initialState: CandidateState = {
  candidateList: [],
};

const candidateSlice = createSlice({
  name: "candidate",
  initialState,
  reducers: {
    createCandidate: (
      state: CandidateState,
      action: PayloadAction<Candidate>
    ) => {
      const payload = { ...action.payload };
      return {
        ...state,
        loginUser: { ...payload },
        candidateList: [...state.candidateList, { ...payload }],
      };
    },
  },
});

export const { createCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;
