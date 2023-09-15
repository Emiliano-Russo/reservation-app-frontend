import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBusiness {
  id: string;
  ownerId: string;
  typeId: string;
  name: string;
  country: string;
  department: string;
  address: string;
  coordinates: {
    pointX: string;
    pointY: string;
  };
  logoURL: string;
  multimediaURL: string[];
  description: string;
  assistantsID: string[];
  pendingInvitationsID: string[];
  status: string;
  totalRatingSum: number;
  totalRatingsCount: number;
  averageRating: number;
  availability: Array<any>; // Puedes especificar una interfaz para esto si es necesario
}

interface IBusinessState {
  myBusinesses: IBusiness[];
  currentBusiness: IBusiness | null;
}

const initialState: IBusinessState = {
  myBusinesses: [],
  currentBusiness: null,
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    setCurrentBusiness(state, action: PayloadAction<IBusiness>) {
      state.currentBusiness = action.payload;
    },
    clearCurrentBusiness(state) {
      state.currentBusiness = null;
    },
    addBusinessToList(state, action: PayloadAction<IBusiness>) {
      state.myBusinesses.push(action.payload);
    },
    removeBusinessFromList(state, action: PayloadAction<string>) {
      state.myBusinesses = state.myBusinesses.filter(
        (business) => business.id !== action.payload,
      );
    },
    setBusinessList(state, action: PayloadAction<IBusiness[]>) {
      state.myBusinesses = action.payload;
    },
  },
});

export const {
  setCurrentBusiness,
  clearCurrentBusiness,
  addBusinessToList,
  removeBusinessFromList,
  setBusinessList,
} = businessSlice.actions;
export default businessSlice.reducer;
