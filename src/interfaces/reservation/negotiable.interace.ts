import { IRange } from './range.interface';

export enum AcceptStatus {
  Unanswered = 'Unanswered',
  Accepted = 'Accepted',
  NotAccepted = 'NotAccepted',
}

export interface INegotiable {
  id: string;
  dateRange: Range;
  timeRange: Range;
  businessProposedSchedule: string;
  acceptedBusinessProposed: AcceptStatus;
}
