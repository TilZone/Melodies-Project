##Tôi đang học làm web với reacjs tôi cần bạn xây dưng hoàn thiện cho tôi
1. Mục Tiêu và Chức Năng Chính

Dự án "Melodies" là một trang web nghe nhạc (Music Streaming) được xây dựng với mục tiêu thực hành và áp dụng các công nghệ front-end hiện đại. Sản phẩm mô phỏng các chức năng cơ bản của một ứng dụng nghe nhạc thực tế, bao gồm tìm kiếm, phát nhạc, và quản lý playlist.

Đây là link yêu cầu và các chức năng: 
https://docs.google.com/document/d/1qX9RHPqA8TGQ_-OIvcg-NfrzgBvVsfrKq0XY-HTdZvY/edit?tab=t.0#heading=h.iflr7xhk0rfi

Tối thiêu giao diện và 5 chức năng. đây là link document:
https://docs.google.com/document/d/1DGHUXZV3ZtPCAR3MjuDpIgDakf50RQ7FThhDxjMiU3g/edit?tab=t.0

Bởi vì làm nhóm 2 người nên bạn kia sẽ làm Trang Home,Trang Albums,Trang Login/Sign in/Loading. Còn tôi sẽ làm Trang Discover,Trang Artist,Trang Music (Lyrics)

2. Thiết Kế và Giao Diện Người Dùng (UI/UX)

Đây là link giao diện: 
https://www.figma.com/design/cErDM6ije8iYrw2yWsS5S6/Melodies-Web--Copy-?node-id=0-1&t=8wQ49RGayJ9PNg6i-1

và đây là export builderio của figma: 
https://builder.io/app/projects/a162f65641034ed68d87760cab24f363/glow-nest

sử dụng Ant Design( nếu cần hoặc không có thể bỏ),Tailwind CSS, hoặc các thư viện cần thiết
Phải tương thích với thiết bị di động ( có sẵn tong figma) - Responsive design, hỗ trợ chế độ tối - Dark mode
sẵn sàng cung cấp wireframe hoặc mockup (nếu có)

3. Quản Lý Dữ Liệu và Backend

Bạn hãy tự chọn dự định quản lý trạng thái (state management) trong React
sử dụng công nghệ backend Node.js
Loại cơ sở dữ liệu nào bạn muốn sử dụng? (Ví dụ: MongoDB, PostgreSQL, MySQL, Firebase Realtime Database, Firestore, v.v.)
Cần xây dựng api từ đầu

4. Yêu Cầu Kỹ Thuật Khác
Framework/Library: ReactJS (sử dụng Vite)
Ngôn ngữ: JavaScript
Styling: Tailwind CSS, antdesign
Routing: React Router DOM v6
State Management: Zustand (hoặc React Context)
API Client: Axios
Icons: Lucide React
Deployment: Vercel / Netlify

Mức độ kinh nghiệm với ReactJS Mới bắt đầu cần chi tiết

##tiêu chí đánh giá:

Kiến thức Chất lượng

Cơ bản
5
"Cài đặt và tạo dự án React
Cài đặt React bằng Create React App hoặc cài đặt thủ công.
Tạo một ứng dụng đơn giản React và khởi chạy nó."
"Cấu trúc component và JSX: Hiểu cách khai báo và sử dụng JSX để render các component.
Biết cách tạo và sử dụng functional components"
"Components và Props: Biết cách tạo và sử dụng functional components và class components.
Sử dụng props để truyền dữ liệu từ component cha xuống component con."
"Xử lý sự kiện:
Xử lý các sự kiện như click, submit, change bằng cách sử dụng onClick, onChange, onSubmit, ... trong React."
"Rendering Lists và Keys: Sử dụng vòng lặp để render danh sách các phần tử và đặt keys cho mỗi phần tử.
Hiểu tại sao keys là cần thiết và cách chúng giúp React hiệu quả hơn trong quản lý và cập nhật DOM."
"Form và controlled components: Xây dựng và quản lý các form trong React bằng cách sử dụng controlled components.
Hiểu cách sử dụng value và onChange để liên kết giá trị form với state."

Trung bình
7
"Hooks (useState, useEffect):
Sử dụng useState để quản lý state trong functional components.
Sử dụng useEffect để thực hiện các side effects trong functional components."
"Context API:
Sử dụng Context API để chia sẻ dữ liệu global giữa các component ở mức cao hơn."
"Higher-Order Components (HOCs):
Sử dụng HOCs để tái sử dụng logic và chức năng giữa các component."
Optimization và performance: Tối ưu hóa render và hiệu suất của ứng dụng React bằng cách sử dụng React.memo và useMemo
Forms và Formik/Yup: Sử dụng thư viện Formik và Yup để quản lý và xác thực các form phức tạp trong ứng dụng.
Error Handling và Error Boundaries: Xử lý lỗi và sử dụng Error Boundaries để bắt lỗi trong các component React.

Nâng cao
10
Advanced Routing và Code Splitting: Sử dụng dynamic routing và code splitting để tối ưu hóa tải trang và quản lý route phức tạp.
State Persistence: Lưu trữ và khôi phục trạng thái của ứng dụng React qua các phiên đăng nhập hoặc thay đổi route.
Class Component: Sử dụng Class Component trong việc tối ưu hiệu suất với lifecycle
