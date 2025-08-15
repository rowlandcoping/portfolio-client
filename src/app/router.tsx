import { createRoute, createRootRoute, createRouter } from '@tanstack/react-router';
import Layout from '../components/Layout';
import Prefetch from '../components/Prefetch';
import Home from '../components/Home';

import Profile from '../features/profile/Profile';
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

const router = createRouter({
    routeTree: rootRoute.addChildren([
        homeRoute,
        profileRoute,
    ])
});

export { router };