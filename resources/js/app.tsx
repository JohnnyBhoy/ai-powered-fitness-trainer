import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

const appName = import.meta.env.VITE_APP_NAME ?? 'Go Peak Fit';
const queryClient = new QueryClient()

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <QueryClientProvider client={queryClient}>
                <App {...props} />
                <Toaster position='top-right'/>
            </QueryClientProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

