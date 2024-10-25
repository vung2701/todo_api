// Đổi từ require sang import
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSMongoose from '@adminjs/mongoose';
import Todo from './models/Todo.js';
import User from './models/User.js';

AdminJS.registerAdapter(AdminJSMongoose);

const adminJs = new AdminJS({
    resources: [
        { resource: Todo },
        {
            resource: User,
            options: {
                properties: {
                    password: {
                        isVisible: { list: false, edit: true, filter: false, show: false },
                    },
                },
                actions: {
                    new: {
                        before: async (request) => {
                            if (request.payload.password) {
                                const bcrypt = await import('bcryptjs');
                                const hashedPassword = await bcrypt.hash(request.payload.password, 10);
                                request.payload.password = hashedPassword;
                            }
                            return request;
                        },
                    },
                },
            },
        },
    ],
    rootPath: '/admin',
    branding: {
        companyName: 'Todo Admin',
    },
});

const router = AdminJSExpress.buildRouter(adminJs);

export default router;
