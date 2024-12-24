import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSMongoose from '@adminjs/mongoose';
import User from '../models/User.js';
import Todo from '../models/Todo.js';

// Đăng ký adapter cho MongoDB
AdminJS.registerAdapter(AdminJSMongoose);

// Cấu hình AdminJS
const adminJs = new AdminJS({
  resources: [
    { resource: User, options: { parent: { name: 'User' } } },
    { resource: Todo, options: { parent: { name: 'Todo' } } },
  ],
  rootPath: '/admin',
});

// Tạo router AdminJS với xác thực cơ bản
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    if (email === 'admin@example.com' && password === 'password') {
      return { email };
    }
    return null;
  },
  cookieName: 'adminjs',
  cookiePassword: 'supersecret',
});

export { adminJs, adminRouter };
