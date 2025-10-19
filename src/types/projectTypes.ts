import type { EcosystemTypes } from './ecosystemTypes'


export type Feature = {
    id: number;
    description: string
}

export type Issue = {
    id: number;
    description: string
}

export type Tech = {
    id: number;
    typeId: number;
    name: string;
}

export type ProjectEcosystem = {
    id: number;
    name: string;
    ecosystem: EcosystemTypes
    ecoId: number;
    tech: Tech [];
}


export type ProjectTypes = {
    id: number;
    name: string;
    overview: string;
    url: string;
    repo:string;
    imageOrg: string;
    imageGrn: string;
    imageGry: string;
    imageAlt: string;
    features: Feature []; //1 to many
    issues: Issue [];
    typeId: number;
    projectEcosystem: ProjectEcosystem [] 
    live: boolean;
    dateMvp: string;
    dateProd: string;
    personId: number;
    userId: number;
}