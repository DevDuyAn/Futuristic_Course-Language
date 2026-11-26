# 📦 ANCOURSE – FULL AI PROJECT SPEC (MASTER PROMPT)

---

## 🧠 1. PROJECT CONTEXT

Bạn là AI frontend developer.

Hãy tạo một website quản lý khóa học lập trình tên **AnCourse** dựa hoàn toàn trên dữ liệu và logic bên dưới.

⚠️ QUAN TRỌNG:
- Không thêm công nghệ ngoài kiến thức JS DOM cơ bản
- Không dùng framework (React, Vue, Next.js, etc.)
- Không dùng backend, API, localStorage
- Chỉ dùng HTML + CSS + JavaScript thuần
- Không vượt quá kiến thức người học cơ bản JS DOM
- Không overengineer

---

## 📊 2. DATA MODEL (SOURCE OF TRUTH)

let languages = [
    { id: 1, name: "HTML", price: 1000, category: "Frontend", hasSlot: true, level: "beginner", duration: "2w", image: "html.png" },
    { id: 2, name: "CSS", price: 500, category: "Frontend", hasSlot: false, level: "beginner", duration: "2w", image: "css.png" },
    { id: 3, name: "JavaScript", price: 1500, category: "Frontend", hasSlot: true, level: "intermediate", duration: "4w", image: "js.png" },
    { id: 4, name: "Python", price: 2000, category: "Backend", hasSlot: true, level: "beginner", duration: "4w", image: "python.png" },
    { id: 5, name: "C++", price: 2500, category: "Backend", hasSlot: false, level: "advanced", duration: "6w", image: "cpp.png" },
    { id: 6, name: "Java", price: 2200, category: "Backend", hasSlot: true, level: "intermediate", duration: "5w", image: "java.png" }
]

---

## 🖼️ 3. ASSETS RULE

Folder image: /AnVerse/img/

Mapping:
- HTML → html.png  
- CSS → css.png  
- JavaScript → js.png  
- Python → python.png  
- C++ → cpp.png  
- Java → java.png  

⚠️ RULE:
- Chỉ dùng ảnh trong folder
- Không dùng link ngoài
- Không import thư viện ảnh

---

## 🎨 4. UI / UX DESIGN RULES

- Futuristic UI
- Glassmorphism (blur + transparency)
- Hover 3D nhẹ (transform)
- Animation mượt (transition)
- Background là ảnh công nghệ
- UI thoáng, spacing rõ ràng
- Không màu gắt / neon quá mạnh
- Không layout rối

---

## 🧱 5. WEBSITE STRUCTURE

### 🧭 HEADER (Shopee style)

- Logo AnCourse (img)
- Search bar realtime (input event)
- Button: “Thêm khóa học”

---

### ➕ FORM THÊM KHÓA HỌC

Ẩn mặc định, hiện khi click.

Fields:
- id
- name
- price
- category
- hasSlot (checkbox)
- level
- duration
- image

Buttons:
- Add course
- Save (edit mode)
- Cancel (edit mode)

---

## 🔍 6. FILTER SYSTEM

- All
- Has slot
- No slot
- Category filter (select)
- Sort price:
  - asc
  - desc

---

## 📦 7. COURSE LIST (JS RENDER ONLY)

- Render từ array `languages`
- KHÔNG hardcode HTML

Card gồm:
- Image
- Name
- Price
- Category
- Level
- Duration
- Status hasSlot

Hover card hiển thị:
- Edit
- Delete
- Add to cart

---

## ✏️ 8. CRUD LOGIC

### ADD
- push vào array

### EDIT
- fill form theo id
- update object khi save
- cancel reset form

### DELETE
- filter remove khỏi array

---

## 🔍 9. SEARCH SYSTEM

Realtime search (input event)

Search theo:
- id
- name
- category

---

## 🛒 10. CART SYSTEM

cart = [
  { id: number, count: number }
]

---

### ADD TO CART
- nếu tồn tại → tăng count
- chưa tồn tại → push mới

---

### CART UI

#### Empty:
“Giỏ hàng trống”

#### Not empty:
Card style Shopee

---

### Layout cart item:

LEFT:
- image lớn

RIGHT:
- name
- price highlight
- status:
  - true → green
  - false → red
- level
- duration
- count

Buttons:
- increase
- decrease
- remove

---

### LOGIC:
- count = 0 → auto remove item

---

## 💰 11. CHECKOUT

- Tổng tiền = price * count
- Button: “Đăng ký khóa học”
- Popup:
  “Đăng ký khóa học thành công”

---

## ⚙️ 12. TECH CONSTRAINTS

- HTML + CSS + JS thuần
- Không framework
- Không API
- Không backend
- Không localStorage
- Không thư viện ngoài
- Chỉ DOM manipulation
- Event listeners đầy đủ
- Không vượt kiến thức JS cơ bản

---

## 🧠 13. ARCHITECTURE RULES

1. languages là source of truth
2. UI render từ data
3. mọi action phải re-render UI
4. không hardcode list HTML
5. state chỉ lưu trong JS variables

---

## 📱 14. RESPONSIVE RULES

Desktop:
- 2 cột (courses + cart)

Mobile:
- cart xuống dưới
- layout dọc
- spacing giữ nguyên đẹp

---

## 🏁 END

AI phải build toàn bộ hệ thống đúng spec này, không tự thêm logic ngoài yêu cầu.