import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBusiness } from '../interfaces/business/business.interface';
import { IBusinessType } from '../interfaces/businessType/businessType.interface';

interface IBusinessState {
  myBusinesses: IBusiness[];
  currentBusiness: IBusiness | null;
  businessTypes: IBusinessType[];
}

const initialState: IBusinessState = {
  myBusinesses: [],
  currentBusiness: null,
  businessTypes: [],
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
    setBusinessTypes(state, action: PayloadAction<IBusinessType[]>) {
      state.businessTypes = action.payload;
    },
  },
});

export const {
  setCurrentBusiness,
  clearCurrentBusiness,
  addBusinessToList,
  removeBusinessFromList,
  setBusinessList,
  setBusinessTypes,
} = businessSlice.actions;
export default businessSlice.reducer;
