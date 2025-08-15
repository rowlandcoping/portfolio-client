export type Link = {
    id: number;
    name: string;
    url: string;
    logoGrn: string;
    logoOrg: string;
    logoAlt: string;
    personId: number;
    userId: number;
}

export type Skill = {
    id: number;
    name: string;
    ecoId: number;
    techId: number;          
    competency: string;
    personId: number;
    userId: number;
}

export type Project = {
  id: number;
}

export type Contact = {
    id: number;
    email: string;
    name: string;
    message: string;
    timestamp: string
    projectId: number;
    personId: number;
}

export type ProfileTypes = {
    id: number;
    userId: number;
    description: string;
    skills: Skill[];
    links: Link[];
    contact: Contact[];
    project: Project[];
}
