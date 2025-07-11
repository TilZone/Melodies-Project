# Melodies-Project Monorepo

## 1. Giới thiệu
Đây là repository chứa **toàn bộ mã nguồn frontend (ReactJS)** và **backend (NodeJS/Express)** của dự án Melodies.

- **Frontend:** `melodies-music-app/`
- **Backend:** `melodies-api/`

## 2. Hướng dẫn clone và setup

### Clone repo về máy
```bash
git clone https://github.com/TilZone/Melodies-Project.git
cd Melodies-Project
```

### Cài đặt và chạy frontend
```bash
cd melodies-music-app
npm install
npm run dev
```

### Cài đặt và chạy backend
```bash
cd melodies-api
npm install
npm run dev
```

## 3. Quy trình teamwork chuẩn

### 3.1. Tạo branch mới khi làm việc
- Mỗi tính năng/bugfix nên làm trên một branch riêng:
```bash
git checkout -b ten-tinh-nang
```

### 3.2. Commit và push code
```bash
git add .
git commit -m "Mô tả thay đổi"
git push -u origin ten-tinh-nang
```

### 3.3. Tạo Pull Request (PR)
- Vào GitHub, tạo PR từ branch vừa push lên vào branch `main`.
- Nhờ bạn cùng team review, thảo luận, rồi merge vào `main`.

### 3.4. Cập nhật code mới nhất từ team
```bash
git checkout main
git pull origin main
```

## 4. Lưu ý khi làm việc chung
- **Không commit trực tiếp lên `main`.**
- Luôn tạo branch mới cho mỗi tính năng/bugfix.
- Luôn tạo Pull Request để review trước khi merge.
- Thường xuyên pull code mới nhất về máy.
- Nếu có xung đột, chủ động trao đổi để giải quyết.

## 5. Hướng dẫn tạo branch (nhánh) mới
1. Đảm bảo bạn đang ở branch `main`:
   ```bash
   git checkout main
   git pull origin main
   ```
2. Tạo branch mới:
   ```bash
   git checkout -b ten-branch-cua-ban
   ```
3. Làm việc, commit, push như hướng dẫn ở trên.

## 6. Thêm thành viên vào repo
- Chủ repo vào GitHub → Settings → Collaborators (hoặc Manage access) → Add people → Nhập username GitHub của bạn bè → Gửi lời mời.
- Thành viên nhận email hoặc vào GitHub để accept lời mời.

## 7. Hỗ trợ
Nếu gặp lỗi hoặc cần hỗ trợ, hãy tạo Issue trên GitHub hoặc liên hệ trực tiếp với chủ repo.

---
**Chúc cả team làm việc hiệu quả!** 