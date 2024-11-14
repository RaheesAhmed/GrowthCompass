export interface LeadershipData {
  data: {
    role: string;
    responsibilityLevel: number;
    description: string;
    versionInfo: {
      v1: string;
      v2: string;
    };
  };
  success: boolean;
}
