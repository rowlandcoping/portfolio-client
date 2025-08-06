import { createRoute, createRootRoute, createRouter, Outlet } from '@tanstack/react-router';
import Layout from '../components/Layout';
import App from '../App';

// Root route with Layout
const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
});

const router = createRouter({
    routeTree: rootRoute.addChildren([
        homeRoute,
    ])
});

export { router };