export interface TokenBalance {
  name: string;
  balance: number;
}

export type CampaignType = {
  id: number;
  creator: string;
  description: string;
  endDate: number;
  goal: number;
  imageLink: string;
  isCancelled: boolean;
  isClaimed: boolean;
  preferredToken: string;
  title: string;
  totalRaised: number;
}

export type CountdownTimerProps = {
  timestamp: number | undefined;
  clockOnly?: boolean;
}

export type TimerState = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  completed?: boolean;
  isLoading?: boolean;
};

export enum ApprovalType {
  UNKNOWN = 'UNKNOWN',
  NOT_APPROVED = 'NOT_APPROVED',
  APPROVED = 'APPROVED',
}