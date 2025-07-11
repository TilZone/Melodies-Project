TÀI LIỆU DỰ ÁN: MELODIES MUSIC WEB APP
Tên dự án: Melodies - Ứng dụng nghe nhạc
Thời gian thực hiện: 24/06/2024 - 26/07/2024
Thành viên nhóm:
Oanh: UI Development, Audio Logic Integration, Home Page API Integration
Tuấn: Project Setup, State Management, API Handling, Search & Playlist UI/Logic

1. TỔNG QUAN DỰ ÁN
   Dự án "Melodies" là một trang web nghe nhạc (Music Streaming) được xây dựng với mục tiêu thực hành và áp dụng các công nghệ front-end hiện đại. Sản phẩm mô phỏng các chức năng cơ bản của một ứng dụng nghe nhạc thực tế, bao gồm tìm kiếm, phát nhạc, và quản lý playlist.
2. CÔNG NGHỆ SỬ DỤNG
   Framework/Library: ReactJS (sử dụng Vite)
   Ngôn ngữ: JavaScript
   Styling: Tailwind CSS
   Routing: React Router DOM v6
   State Management: Zustand (hoặc React Context)
   API Client: Axios
   Icons: Lucide React
   Deployment: Vercel / Netlify
3. CÁC TÍNH NĂNG CHÍNH ĐÃ HOÀN THIỆN
   Tìm kiếm: Người dùng có thể nhập tên bài hát để tìm kiếm.
   Phát nhạc: Ứng dụng có thể phát các file nhạc được cung cấp từ API.
   Điều khiển Player: Thanh Player cho phép người dùng Play/Pause, chuyển bài Next/Previous, và tua nhạc.
   Quản lý State toàn cục: Đảm bảo trạng thái của trình phát nhạc (bài hát hiện tại, danh sách phát, trạng thái phát/dừng) được quản lý đồng bộ trên toàn ứng dụng.
   Giao diện đáp ứng: Thiết kế giao diện tương thích tốt trên cả thiết bị mobile và desktop.
4. PHÂN CHIA CÔNG VIỆC VÀ QUÁ TRÌNH LÀM VIỆC
   Oanh:
   Chịu trách nhiệm chính trong việc xây dựng giao diện tĩnh từ Figma cho Trang chủ.
   Tích hợp logic audio vào component PlayerBar.
   Kết nối dữ liệu từ API vào giao diện Trang chủ và xử lý sự kiện phát nhạc.
   Tham gia vào việc sửa lỗi và deploy sản phẩm.
   Tuấn:
   Chịu trách nhiệm thiết lập cấu trúc dự án ban đầu, bao gồm router và các thư viện hỗ trợ.
   Xây dựng giao diện cho trang Tìm kiếm và trang Chi tiết Playlist.
   Thiết kế và triển khai global state bằng Zustand để quản lý trình phát nhạc.
   Xây dựng service giả lập API và hoàn thiện logic cho chức năng tìm kiếm.
   Quy trình làm việc:
   Nhóm sử dụng Trello để quản lý và theo dõi công việc theo từng tuần.
   Sử dụng Git và GitHub để quản lý phiên bản code.
   Thực hiện "combine code" (merge pull request) vào cuối mỗi tuần để đồng bộ hóa tiến độ và giải quyết các xung đột.
   Thường xuyên trao đổi qua Zalo/Discord để giải quyết các vấn đề phát sinh.
5. NHỮNG ĐIỀU HỌC ĐƯỢC VÀ THÁCH THỨC
   Học được:
   Cách làm việc nhóm hiệu quả qua Git và Trello.
   Hiểu sâu về React Hooks, quản lý state phức tạp với Zustand.
   Kỹ năng xử lý các tác vụ bất đồng bộ (API calls).
   Cách chia nhỏ giao diện thành các component có thể tái sử dụng.
   Thách thức:
   Quản lý state của trình phát nhạc là một thách thức lớn do tính chất liên tục và phức tạp của nó.
   Xử lý API không đồng bộ và tối ưu hóa hiệu suất ứng dụng.
   Đảm bảo tính đáp ứng của giao diện trên nhiều kích thước màn hình khác nhau.
