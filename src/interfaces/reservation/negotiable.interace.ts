import { IRange } from './range.interface';

export enum AcceptStatus {
  Unanswered = 'Unanswered',
  Accepted = 'Accepted',
  NotAccepted = 'NotAccepted',
}

export interface INegotiable {
  id: string;
  dateRange: IRange;
  timeRange: IRange;
  businessProposedSchedule: string;
  acceptedBusinessProposed: AcceptStatus;
}
