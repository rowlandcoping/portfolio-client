export interface Link {
  id: number;
  name: string;
  url: string;
  logoGrn: string;
  logoOrg: string;
  logoAlt: string;
  personId: number;
  userId: number;
}

export type Project = {
  id: number;
}

export type Contact = {
  // Define properties here as needed
}

export type ProfileTypes = {
  id: number;
  userId: number;
  description: string;
  skills: any[]; // or your real Skill interface
  links: Link[];
  contact: Contact[];
  project: Project[];
}
