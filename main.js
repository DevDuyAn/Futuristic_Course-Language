// Dữ liệu mẫu (mở rộng thêm ảnh)
let languages = [
    { id: 1, name: "HTML", price: 1000, category: "Frontend", hasSlot: true, level: "beginner", duration: "2w" },
    { id: 2, name: "CSS", price: 500, category: "Frontend", hasSlot: false, level: "beginner", duration: "2w" },
    { id: 3, name: "JavaScript", price: 1500, category: "Frontend", hasSlot: true, level: "intermediate", duration: "4w" },
    { id: 4, name: "Python", price: 2000, category: "Backend", hasSlot: true, level: "beginner", duration: "4w" },
    { id: 5, name: "C++", price: 2500, category: "Backend", hasSlot: false, level: "advanced", duration: "6w" },
    { id: 6, name: "Java", price: 2200, category: "Backend", hasSlot: true, level: "intermediate", duration: "5w" },
    { id: 7, name: "TypeScript", price: 2300, category: "Frontend", hasSlot: true, level: "intermediate", duration: "5w" }
];

let cart = [];

// Trạng thái bộ lọc
let filterToggle = "products_all";
let keyword_search = "";
let categoryType = "";
let sortType = "";

// Element Header & Form
const toggleAddForm_btn = document.getElementById("toggleAddForm_btn");
const addForm_container = document.getElementById("addForm_container");
const form_title = document.getElementById("form_title");

// Inputs form
const product_id = document.getElementById("product_id");
const product_name = document.getElementById("product_name");
const product_price = document.getElementById("product_price");
const product_category = document.getElementById("product_category");
const product_level = document.getElementById("product_level");
const product_duration = document.getElementById("product_duration");
const product_instock = document.getElementById("product_instock");

const productAdd_btn = document.getElementById("productAdd_btn");
const productCancelEdit_btn = document.getElementById("productCancelEdit_btn");

// Filter & Search
const product_search = document.getElementById("product_search");
const products_all = document.getElementById("products_all");
const product_instock_filter = document.getElementById("product_instock_filter");
const product_outOfStock_filter = document.getElementById("product_outOfStock_filter");
const filter_category = document.getElementById("filter_category");
const filter_price = document.getElementById("filter_price");

// Container
const products_list = document.getElementById("products_list");
const cartProducts_list = document.getElementById("cartProducts_list");
const cart_footer = document.getElementById("cart_footer");
const total_price_display = document.getElementById("total_price_display");
const checkout_btn = document.getElementById("checkout_btn");

// Modal
const success_modal = document.getElementById("success_modal");
const close_modal_btn = document.getElementById("close_modal_btn");

// Trạng thái Edit
let isEditing = false;
let editingId = null;

// Helper: Lấy ảnh dựa theo tên môn học
function getImageUrl(name) {
    const n = name.toLowerCase();
    if (n.includes("html")) return "../AnVerse/img/html.png";
    if (n.includes("css")) return "../AnVerse/img/css.png";
    if (n.includes("java") && !n.includes("javascript")) return "../AnVerse/img/Java.png";
    if (n.includes("javascript") || n.includes("js")) return "../AnVerse/img/js.png";
    if (n.includes("python")) return "../AnVerse/img/python.png";
    if (n.includes("c++") || n.includes("cpp")) return "../AnVerse/img/c++.png";
    return "../AnVerse/img/Code.png"; // Ảnh mặc định nếu không khớp
}

// ---------------- CÁC HÀM RENDER ---------------- //

function renderCourses() {
    products_list.innerHTML = "";

    let arr_courses = [...languages];

    // 1. Search
    if (keyword_search) {
        arr_courses = arr_courses.filter(item =>
            item.id.toString().includes(keyword_search) ||
            item.name.toLowerCase().includes(keyword_search) ||
            item.category.toLowerCase().includes(keyword_search)
        );
    }

    // 2. Toggle (Còn chỗ / Hết chỗ)
    if (filterToggle === "product_instock") {
        arr_courses = arr_courses.filter(item => item.hasSlot);
    } else if (filterToggle === "product_outOfStock") {
        arr_courses = arr_courses.filter(item => !item.hasSlot);
    }

    // 3. Category
    if (categoryType) {
        arr_courses = arr_courses.filter(item => item.category === categoryType);
    }

    // 4. Sort
    if (sortType === "asc") {
        arr_courses.sort((a, b) => a.price - b.price);
    } else if (sortType === "desc") {
        arr_courses.sort((a, b) => b.price - a.price);
    }

    // 5. Loop & Render
    arr_courses.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("glass-panel", "course-card");

        const imgSrc = getImageUrl(item.name);
        const slotText = item.hasSlot ? "Còn chỗ" : "Hết chỗ";
        const slotClass = item.hasSlot ? "status-true" : "status-false";

        card.innerHTML = `
            <div class="course-img-wrapper">
                <img src="${imgSrc}" alt="${item.name}" class="course-img">
            </div>
            <h3 class="course-title">${item.name}</h3>
            <div class="course-price">${item.price}$</div>
            
            <div class="course-meta">
                <span class="badge">${item.category}</span>
                <span class="badge">${item.level}</span>
                <span class="badge">${item.duration}</span>
                <span class="badge ${slotClass}">${slotText}</span>
            </div>

            <!-- Overlay Actions khi Hover -->
            <div class="card-overlay">
                <button class="btn btn-primary edit-btn">Sửa</button>
                <button class="btn btn-danger delete-btn">Xóa</button>
                <button class="btn btn-success add-cart-btn">Thêm vào giỏ</button>
            </div>
        `;

        // Gắn sự kiện cho các nút trong overlay
        const editBtn = card.querySelector(".edit-btn");
        const deleteBtn = card.querySelector(".delete-btn");
        const addCartBtn = card.querySelector(".add-cart-btn");

        // Action Xóa
        deleteBtn.addEventListener("click", () => {
            languages = languages.filter(t => t.id !== item.id);
            renderCourses();
        });

        // Action Sửa
        editBtn.addEventListener("click", () => {
            isEditing = true;
            editingId = item.id;
            
            // Đổ data lên form
            product_id.value = item.id;
            product_name.value = item.name;
            product_price.value = item.price;
            product_category.value = item.category;
            product_level.value = item.level;
            product_duration.value = item.duration;
            product_instock.checked = item.hasSlot;

            // Đổi giao diện form
            product_id.disabled = true; // Không cho sửa ID
            form_title.textContent = "Chỉnh sửa khóa học";
            productAdd_btn.textContent = "Lưu";
            productAdd_btn.classList.remove("btn-success");
            productAdd_btn.classList.add("btn-primary");
            productCancelEdit_btn.classList.remove("hidden");

            // Mở accordion form nếu đang đóng
            addForm_container.classList.remove("hidden");
            window.scrollTo({ top: 0, behavior: 'smooth' }); // cuộn trang web đến vị trí mong muốn
        });

        // Action Thêm Giỏ Hàng
        addCartBtn.addEventListener("click", () => {
            const existingProduct = cart.find(p => p.id === item.id);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({
                    ...item, // spread operator (lấy toàn bộ dữ liệu cũ từ item, rồi thêm quantity)
                    quantity: 1
                });
            }
            renderCart();
        });

        products_list.appendChild(card);
    });
}

function renderCart() {
    cartProducts_list.innerHTML = "";

    if (cart.length === 0) {
        cartProducts_list.innerHTML = `<div class="empty-cart">Giỏ hàng trống</div>`;
        cart_footer.classList.add("hidden");
        return;
    }

    cart_footer.classList.remove("hidden");

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const imgSrc = getImageUrl(item.name);
        const slotText = item.hasSlot ? "Còn chỗ" : "Hết chỗ";
        const slotColor = item.hasSlot ? "var(--success-color)" : "var(--danger-color)";

        cartItem.innerHTML = `
            <img src="${imgSrc}" class="cart-item-img" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price}$</div>
                <div class="cart-item-meta">
                    <span style="color: ${slotColor}">• ${slotText}</span> | ${item.level} | ${item.duration} | ${item.category}
                </div>
                <div class="cart-item-actions">
                    <button class="btn-qty decrease-btn">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="btn-qty increase-btn">+</button>
                    <button class="btn-remove-cart">Xóa</button>
                </div>
            </div>
        `;

        // Tăng
        cartItem.querySelector(".increase-btn").addEventListener("click", () => {
            item.quantity++;
            renderCart();
        });

        // Giảm
        cartItem.querySelector(".decrease-btn").addEventListener("click", () => {
            item.quantity--;
            if (item.quantity <= 0) {
                cart = cart.filter(p => p.id !== item.id);
            }
            renderCart();
        });

        // Xóa
        cartItem.querySelector(".btn-remove-cart").addEventListener("click", () => {
            cart = cart.filter(p => p.id !== item.id);
            renderCart();
        });

        cartProducts_list.appendChild(cartItem);
    });

    total_price_display.textContent = `${total}$`;
}


// ---------------- CÁC SỰ KIỆN ---------------- //

// Toggle Accordion Form
toggleAddForm_btn.addEventListener("click", () => {
    addForm_container.classList.toggle("hidden");
    if(!isEditing) {
        resetForm();
    }
});

function resetForm() {
    isEditing = false;
    editingId = null;
    product_id.disabled = false;
    product_id.value = "";
    product_name.value = "";
    product_price.value = "";
    product_category.value = "Frontend";
    product_level.value = "beginner";
    product_duration.value = "";
    product_instock.checked = true;

    form_title.textContent = "Thêm khóa học mới";
    productAdd_btn.textContent = "Thêm khóa học";
    productAdd_btn.classList.remove("btn-primary");
    productAdd_btn.classList.add("btn-success");
    productCancelEdit_btn.classList.add("hidden");
}

// Xử lý Thêm / Lưu Form
productAdd_btn.addEventListener("click", () => {
    const vId = Number(product_id.value.trim());
    const vName = product_name.value.trim();
    const vPrice = Number(product_price.value.trim());
    const vCategory = product_category.value;
    const vLevel = product_level.value;
    const vDuration = product_duration.value.trim();
    const vInstock = product_instock.checked;

    if (!vId || !vName || !vPrice || !vDuration) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    if (isEditing) {
        // Lưu chỉnh sửa
        const course = languages.find(p => p.id === editingId);
        if (course) {
            course.name = vName;
            course.price = vPrice;
            course.category = vCategory;
            course.level = vLevel;
            course.duration = vDuration;
            course.hasSlot = vInstock;
        }
    } else {
        // Thêm mới
        const isDuplicate = languages.some(p => p.id === vId);
        if (isDuplicate) {
            alert("Mã khóa học (ID) đã tồn tại!");
            return;
        }

        languages.push({
            id: vId,
            name: vName,
            price: vPrice,
            category: vCategory,
            level: vLevel,
            duration: vDuration,
            hasSlot: vInstock
        });
    }

    resetForm();
    addForm_container.classList.add("hidden"); // Đóng form
    renderCourses();
});

// Xử lý Hủy chỉnh sửa
productCancelEdit_btn.addEventListener("click", () => {
    resetForm();
    addForm_container.classList.add("hidden");
});

// Search
product_search.addEventListener("input", (e) => {
    keyword_search = e.target.value.trim().toLowerCase();
    renderCourses();
});

// Filter Toggle Buttons
function updateActiveFilterBtn(activeBtn) {
    [products_all, product_instock_filter, product_outOfStock_filter].forEach(btn => btn.classList.remove("active"));
    activeBtn.classList.add("active");
}

products_all.addEventListener("click", (e) => {
    filterToggle = "products_all";
    updateActiveFilterBtn(e.target);
    renderCourses();
});

product_instock_filter.addEventListener("click", (e) => {
    filterToggle = "product_instock";
    updateActiveFilterBtn(e.target);
    renderCourses();
});

product_outOfStock_filter.addEventListener("click", (e) => {
    filterToggle = "product_outOfStock";
    updateActiveFilterBtn(e.target);
    renderCourses();
});

// Filter Select (Category & Price)
filter_category.addEventListener("change", (e) => {
    categoryType = e.target.value;
    renderCourses();
});

filter_price.addEventListener("change", (e) => {
    sortType = e.target.value;
    renderCourses();
});

// Checkout
checkout_btn.addEventListener("click", () => {
    if(cart.length > 0) {
        // Hiện modal
        success_modal.classList.remove("hidden");
        // Clear cart
        cart = [];
        renderCart();
    }
});

// Đóng Modal
close_modal_btn.addEventListener("click", () => {
    success_modal.classList.add("hidden");
});

// Render lần đầu
renderCourses();
renderCart();
