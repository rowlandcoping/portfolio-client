import type { TechTypes } from './techTypes'

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
    tech: TechTypes[];
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
    starSign: string;
    favColor: string;
    imageGrn: string;
    imageAlt: string;
    skills: Skill[];
    links: Link[];
    contact: Contact[];
    project: Project[];
}
