/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, {}, any>
    export default component
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.webp';

declare module 'vue-router' {
    // eslint-disable-next-line no-unused-vars
    interface RouteMeta {
        isAdmin?: boolean
        requiresAuth?: boolean
        roles?: string[]
    }
};

declare module 'vue-qr/src/packages/vue-qr.vue'{}

export default {}
