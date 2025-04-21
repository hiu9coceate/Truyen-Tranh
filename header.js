document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử (Đảm bảo ID đúng với HTML của bạn: ss2, oss1, cs)
    const nutBamS2 = document.getElementById('ss2');      // Nút icon tìm kiếm
    const phanTuOs1 = document.getElementById('oss1');    // Khung tìm kiếm hiện ra
    const nutDongCs = document.getElementById('cs');      // Nút đóng 'X' bên trong oss1

    // --- Xử lý nút Hiện (#ss2) ---
    if (nutBamS2 && phanTuOs1) {
        nutBamS2.addEventListener('click', function() {
            // Chỉ thêm class 'visible' để hiện #oss1
            phanTuOs1.classList.add('visible');
        });
    } else {
        if (!nutBamS2) console.error("Lỗi: Không tìm thấy nút nào có id='ss2'.");
    }

    // --- Xử lý nút Đóng (#cs) ---
    if (nutDongCs && phanTuOs1) {
        nutDongCs.addEventListener('click', function() {
            // Chỉ gỡ bỏ class 'visible' để ẩn #oss1
            phanTuOs1.classList.remove('visible');
        });
    } else {
        if (!phanTuOs1) console.error("Lỗi: Không tìm thấy phần tử nào có id='oss1'.");
        if (!nutDongCs) console.error("Lỗi: Không tìm thấy nút nào có id='cs'.");
    }

    // --- Xử lý TỰ ĐỘNG ẨN khi RESIZE ra ngoài khoảng 630-1090px ---
    let resizeTimeout; // Biến để debounce
    const minWidthToShow = 630; // Ngưỡng dưới (theo media query ẩn #ss2)
    const maxWidthToShow = 1089; // Ngưỡng trên (theo media query hiện #ss2)

    function checkSizeAndHide() {
        if (!phanTuOs1) return; // Thoát nếu oss1 không tồn tại

        const currentWidth = window.innerWidth; // Lấy chiều rộng hiện tại

        // Kiểm tra: Nếu chiều rộng nằm NGOÀI khoảng [630, 1090] VÀ oss1 đang hiện
        if ((currentWidth < minWidthToShow || currentWidth > maxWidthToShow) && phanTuOs1.classList.contains('visible')) {
            // Thì tự động ẩn oss1 đi
            phanTuOs1.classList.remove('visible');
            console.log('Tự động ẩn #oss1 do resize ra ngoài khoảng hiển thị của nút #ss2');
        }
    }

    // Lắng nghe sự kiện 'resize' trên cửa sổ window
    window.addEventListener('resize', function() {
        // Debounce: Trì hoãn việc thực thi checkSizeAndHide
        // để tránh chạy quá nhiều lần khi đang kéo thả resize.
        clearTimeout(resizeTimeout); // Xóa timeout cũ nếu có
        // Đặt timeout mới, chỉ chạy hàm check sau 150ms không resize nữa
        resizeTimeout = setTimeout(checkSizeAndHide, 150);
    });

    // Optional: Kiểm tra ngay khi tải trang xong
    // để ẩn đi nếu ban đầu tải trang ở kích thước không hợp lệ mà oss1 lỡ có class 'visible'
    // checkSizeAndHide();

}); // Kết thúc 

document.addEventListener('DOMContentLoaded', function() {
    const buttonBtnM = document.getElementById('btnM');
    const elementM1 = document.getElementById('M1');
    const maxWidthToShow = 630; // Đặt ngưỡng kích thước tối đa

    // --- Xử lý nút Hiện/Ẩn (#btnM) ---
    if (buttonBtnM && elementM1) {
        buttonBtnM.addEventListener('click', function() {
            // **Kiểm tra kích thước màn hình TRƯỚC KHI toggle**
            if (window.innerWidth <= maxWidthToShow) {
                // Chỉ cho phép toggle (hiện/ẩn) nếu màn hình <= 630px
                elementM1.classList.toggle('visible');
            } else {
                // Nếu màn hình > 630px, không làm gì cả khi bấm nút
                // Hoặc đảm bảo M1 luôn ẩn ở kích thước này
                elementM1.classList.remove('visible');
                console.log(`Màn hình > ${maxWidthToShow}px, nút không có tác dụng.`);
            }
        });
    } else {
        if (!buttonBtnM) console.error("Lỗi: Không tìm thấy nút với id='btnM'.");
        if (!elementM1) console.error("Lỗi: Không tìm thấy phần tử với id='M1'.");
    }

    // --- Xử lý TỰ ĐỘNG ẨN khi RESIZE lớn hơn 630px ---
    let resizeTimeout; // Biến cho debounce

    function checkSizeAndHideIfNeeded() {
        if (!elementM1) return; // Thoát nếu M1 không tồn tại

        const currentWidth = window.innerWidth;

        // Kiểm tra: Nếu chiều rộng hiện tại LỚN HƠN ngưỡng
        // VÀ element M1 đang có class 'visible' (đang hiện)
        if (currentWidth > maxWidthToShow && elementM1.classList.contains('visible')) {
            // Thì tự động ẩn M1 đi bằng cách gỡ bỏ class 'visible'
            elementM1.classList.remove('visible');
            console.log(`Tự động ẩn M1 do resize > ${maxWidthToShow}px`);
        }
    }

    // Lắng nghe sự kiện 'resize' trên cửa sổ window
    window.addEventListener('resize', function() {
        // Debounce để tối ưu hiệu năng
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(checkSizeAndHideIfNeeded, 150); // Chạy sau 150ms ngừng resize
    });

    // Rất quan trọng: Kiểm tra kích thước ngay khi tải trang xong
    // để đảm bảo M1 ẩn nếu trang được tải ở kích thước > 630px
    checkSizeAndHideIfNeeded();

}); // Kết thúc DOMContentLoaded listener