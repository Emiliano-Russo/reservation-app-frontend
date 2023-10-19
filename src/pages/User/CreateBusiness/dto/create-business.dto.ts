import { BusinessStatus } from '../../../../interfaces/business/business.interface';

export interface IBusinessCreateDto {
  ownerId: string;

  typeId: string;

  name: string;

  country: string;

  department: string;

  address: string;

  description: string;

  status: BusinessStatus;

  // coordinatesStringify: string;

  availabilityStringify: string;
}
