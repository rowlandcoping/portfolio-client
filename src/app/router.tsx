import { createRoute, createRootRoute, createRouter } from '@tanstack/react-router';
import Layout from '../components/Layout';
import Prefetch from '../components/Prefetch';
import Home from '../components/Home';

import Profile from '../features/profile/Profile';
import Projects from '../features/projects/Projects';
import AllProjects from '../features/projects/AllProjects';
import ProjectTypes from '../features/projects/ProjectTypes';
import SearchProjects from '../features/projects/SearchProjects';
import ViewProject from '../features/projects/ViewProject';

import ProjectsByType from '../features/projects/ProjectsByType';


import KeyboardNavProvider from '../components/KeyboardNavProvider';

// Root route with Layout
const rootRoute = createRootRoute({
    component: () => (
        
        <Prefetch>
            <KeyboardNavProvider>
                <Layout />
            </KeyboardNavProvider>
        </Prefetch>
    )
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/profile',
    component: Profile,
});

const projectsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/projects',
    component: Projects,
});

const allProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/all-projects',
  component: AllProjects,
});

const projectTypesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/project-categories',
  component: ProjectTypes,
});

const searchProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/search-projects',
  component: SearchProjects
});

export const viewProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/$id',
  component: ViewProject,
});

export const projectsByTypeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects/project-categories/$id',
  component: ProjectsByType,
});

const router = createRouter({
    routeTree: rootRoute.addChildren([
        homeRoute,
        profileRoute,
        projectsRoute,
        allProjectsRoute,
        projectTypesRoute,
        projectsByTypeRoute,
        searchProjectsRoute,
        viewProjectRoute
    ])
});

export { router };