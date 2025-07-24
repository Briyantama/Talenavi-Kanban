export interface Data {
  title: string;
  developer: string;
  priority: "Critical" | "High" | "Medium" | "Low" | "Best Effort";
  status:
    | "In Progress"
    | "Ready to start"
    | "Waiting for review"
    | "Done"
    | "Stuck"
    | "Pending Deploy";
  type: "Bug" | "Feature Enhancements" | "Other";
  "Estimated SP": number;
  "Actual SP": number;
}

export interface ResponseData {
  response: boolean;
  data: Data[];
}
