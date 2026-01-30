export interface UserProfileSettings {
  theme?: 'light' | 'dark';
  notifications?: boolean;
}

export interface User {
  id: string;
  email: string;
  role: 'parent' | 'kid';
  profileName: string;
  familyId: string;
  createdAt: any;
  settings?: UserProfileSettings;
}

export interface Family {
  id: string;
  name: string;
  ownerId: string;
  kidIds: string[];
  createdAt: any;
  boardTheme?: string;
  coinMultiplier?: number;
}

export interface AvatarAppearance {
  baseColor: string;
  hatId: string | null;
  wingId: string | null;
  petId: string | null;
}

export interface AvatarDoc {
  id: string;
  userId: string;
  familyId?: string;
  name?: string;
  level: number;
  experience: number;
  coinBalance: number;
  position: number;
  appearance: AvatarAppearance;
  createdAt?: any;
  lastUpdated?: any;
}

export type TaskStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface TaskInstance {
  id?: string;
  userId: string;
  familyId: string;
  choreId: string;
  status: TaskStatus;
  photoUrl?: string | null;
  submittedAt: any;
  approvedAt?: any;
  approvedBy?: string;
  coinAwarded?: number;
  boardMovement?: number;
}

export interface StreakDoc {
  id?: string;
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string;
  streakStartDate?: string;
}
