# OceanFood Backend API

Backend API cho ứng dụng bán hải sản trực tuyến OceanFood, được xây dựng với Node.js, Express.js và MongoDB.

## 🚀 Tính năng

- **Quản lý sản phẩm**: CRUD operations cho sản phẩm hải sản
- **Quản lý danh mục**: Tổ chức sản phẩm theo categories và types
- **Quản lý thương hiệu**: Brands management
- **Giỏ hàng**: Shopping cart functionality
- **Danh sách yêu thích**: Favorite products management
- **Cẩm nang**: Handbook articles management
- **API Documentation**: Swagger UI integration
- **Database Seeding**: Tự động tạo dữ liệu mẫu

## 🛠️ Công nghệ sử dụng

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB với Mongoose ODM
- **Documentation**: Swagger/OpenAPI 3.0
- **Environment**: dotenv
- **CORS**: Cross-Origin Resource Sharing

## 📦 Cài đặt

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd OceanFood_BE
   ```

2. **Cài đặt dependencies**

   ```bash
   npm install
   ```

3. **Cấu hình environment**

   ```bash
   cp .env.example .env
   ```

   Chỉnh sửa file `.env` với thông tin phù hợp:

   ```
   MONGODB_URI=mongodb://localhost:27017/oceanfood
   PORT=3000
   NODE_ENV=development
   SEED_DATABASE=true
   ```

4. **Khởi động MongoDB**
   Đảm bảo MongoDB đang chạy trên hệ thống của bạn.

5. **Chạy ứng dụng**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📚 API Documentation

Sau khi khởi động server, truy cập:

- API Documentation: http://localhost:3000/api
- Health Check: http://localhost:3000/api/health

## 🗂️ Cấu trúc thư mục

```
src/
├── controllers/          # Request handlers
│   ├── brandController.js
│   ├── categoryController.js
│   ├── productController.js
│   ├── cartController.js
│   └── ...
├── models/              # MongoDB schemas
│   ├── Brand.js
│   ├── Category.js
│   ├── Product.js
│   └── ...
├── routes/              # API routes
│   ├── brandRoutes.js
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   └── index.js
├── services/            # Business logic
│   └── seedService.js
├── docs/               # Additional documentation
└── app.js              # Express app configuration
```

## 🔌 API Endpoints

### Brands

- `GET /api/brands` - Lấy danh sách thương hiệu
- `POST /api/brands` - Tạo thương hiệu mới
- `GET /api/brands/:id` - Lấy thông tin thương hiệu
- `PUT /api/brands/:id` - Cập nhật thương hiệu
- `DELETE /api/brands/:id` - Xóa thương hiệu

### Categories

- `GET /api/categories` - Lấy danh sách danh mục
- `POST /api/categories` - Tạo danh mục mới
- `GET /api/categories/:key` - Lấy thông tin danh mục
- `PUT /api/categories/:key` - Cập nhật danh mục
- `DELETE /api/categories/:key` - Xóa danh mục

### Products

- `GET /api/products` - Lấy danh sách sản phẩm (có filter, search, pagination)
- `POST /api/products` - Tạo sản phẩm mới
- `GET /api/products/:id` - Lấy thông tin sản phẩm
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm
- `GET /api/products/featured` - Lấy sản phẩm nổi bật
- `GET /api/products/new` - Lấy sản phẩm mới
- `GET /api/products/category/:category` - Lấy sản phẩm theo danh mục

### Cart

- `GET /api/cart/:userId` - Lấy giỏ hàng
- `POST /api/cart/:userId/add` - Thêm sản phẩm vào giỏ
- `PUT /api/cart/:userId/item/:itemId` - Cập nhật số lượng
- `DELETE /api/cart/:userId/item/:itemId` - Xóa sản phẩm khỏi giỏ
- `DELETE /api/cart/:userId/clear` - Xóa toàn bộ giỏ hàng

### Favorites

- `GET /api/favorites/:userId` - Lấy danh sách yêu thích
- `POST /api/favorites/:userId/add` - Thêm vào yêu thích
- `DELETE /api/favorites/:userId/remove/:productId` - Xóa khỏi yêu thích
- `GET /api/favorites/:userId/check/:productId` - Kiểm tra yêu thích

### Handbook

- `GET /api/handbook` - Lấy danh sách bài viết cẩm nang
- `POST /api/handbook` - Tạo bài viết mới
- `GET /api/handbook/:slug` - Lấy bài viết theo slug
- `PUT /api/handbook/:id` - Cập nhật bài viết
- `DELETE /api/handbook/:id` - Xóa bài viết

## 🎯 Query Parameters

### Products API

```
GET /api/products?page=1&limit=10&category=seafood&search=tôm&sort=-createdAt
```

Supported parameters:

- `page`: Số trang (default: 1)
- `limit`: Số items per page (default: 10)
- `category`: Lọc theo danh mục
- `type`: Lọc theo loại sản phẩm
- `brand`: Lọc theo thương hiệu
- `minPrice`, `maxPrice`: Lọc theo khoảng giá
- `inStock`: Lọc sản phẩm còn hàng
- `isNew`: Lọc sản phẩm mới
- `isFeatured`: Lọc sản phẩm nổi bật
- `search`: Tìm kiếm theo tên, mô tả, tags
- `sort`: Sắp xếp (price, -price, name, -createdAt)

## 🌱 Database Seeding

API tự động tạo dữ liệu mẫu khi `SEED_DATABASE=true` trong file `.env`.

Dữ liệu mẫu bao gồm:

- 5 thương hiệu
- 10 danh mục sản phẩm
- 7 loại sản phẩm
- 5 sản phẩm mẫu
- 2 bài viết cẩm nang mẫu

## 🧪 Testing

```bash
# Test API endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/products
curl http://localhost:3000/api/brands
```

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **Development Team** - OceanFood Project

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- MongoDB team for the database
- Swagger team for API documentation tools
"# OceanFood_BE" 
