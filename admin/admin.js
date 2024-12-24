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
    try {
      const user = await User.findOne({ email });
      if (user &&  user.comparePassword(password) && user.role === 'admin') {
        return user;
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
    return null;
  },
  cookieName: process.env.ADMIN_COOKIE_NAME || 'adminjs',
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD || 'supersecret',
});

export { adminJs, adminRouter };
