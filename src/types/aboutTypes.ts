import type { ProjectEcosystem } from './projectTypes';

export type AboutTypes = {
    id: number;
    overview: string;
    clientRepo:string;
    serverRepo:string;
    typeId: number;
    copyYear: number;
    copyName: string;
    projectEcosystem: ProjectEcosystem [] 
    userId: number;
}