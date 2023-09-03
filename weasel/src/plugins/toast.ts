import Toast, {
    POSITION,
    useToast
} from 'vue-toastification';
import type {
    App,
    Plugin
} from 'vue';

export const ToastPlugin: Plugin = {
    install(app: App) {
        app.use(Toast, {
            position: POSITION.TOP_RIGHT,

            timeout: 3000,
            closeOnClick: true,
            pauseOnFocusLoss: false,
            pauseOnHover: true,
            draggable: false,
            showCloseButtonOnHover: true,
            hideProgressBar: false,

        });

        app.config.globalProperties.$toast = useToast();
        app.provide('toast', useToast());
    },
};