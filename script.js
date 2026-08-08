document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. HIỆU ỨNG GIỌT NƯỚC (SCROLL FADE-UP) ---
    // Sử dụng Intersection Observer để phát hiện khi phần tử vào khung hình
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Kích hoạt khi 15% phần tử xuất hiện
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class visible để CSS thực hiện hiệu ứng nổi lên
                entry.target.classList.add('visible');
                // Hủy theo dõi sau khi đã xuất hiện để tối ưu hiệu năng
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Bắt đầu theo dõi tất cả các phần tử có class .fade-up
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => observer.observe(el));


    // --- 2. LOGIC BĂNG CHUYỀN (CAROUSEL) ---
    const carousel = document.getElementById('carousel');
    const btnLeft = document.getElementById('slide-left');
    const btnRight = document.getElementById('slide-right');

    // Khoảng cách cuộn mỗi lần bấm (có thể điều chỉnh bằng chiều rộng của card + gap)
    const scrollAmount = 320; 

    btnRight.addEventListener('click', () => {
        carousel.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    btnLeft.addEventListener('click', () => {
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
});
// --- LOGIC CHO DROPDOWN LỌC THỜI GIAN (TRANG NEWS) ---
const timeFilterDropdown = document.getElementById('timeFilter');
if (timeFilterDropdown) {
    const selected = timeFilterDropdown.querySelector('.dropdown-selected');
    const optionsList = timeFilterDropdown.querySelector('.dropdown-options');
    const options = timeFilterDropdown.querySelectorAll('.dropdown-options li');
    const spanText = selected.querySelector('span');

    // Bật/tắt menu khi click vào
    selected.addEventListener('click', () => {
        optionsList.classList.toggle('active');
    });

    // Thay đổi text khi chọn một mốc thời gian
    options.forEach(option => {
        option.addEventListener('click', () => {
            spanText.innerHTML = option.innerHTML; // Cập nhật text
            optionsList.classList.remove('active'); // Đóng menu
        });
    });

    // Tự động đóng menu nếu click ra ngoài vùng dropdown
    document.addEventListener('click', (e) => {
        if (!timeFilterDropdown.contains(e.target)) {
            optionsList.classList.remove('active');
        }
    });
}
// --- LOGIC CHO TRANG CHI TIẾT ĐỘNG VẬT (Băng chuyền & Modal Media) ---
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Logic cho băng chuyền Media (hoạt động giống trang chủ)
    const mediaCarousel = document.getElementById('media-carousel');
    const btnMediaLeft = document.getElementById('media-left');
    const btnMediaRight = document.getElementById('media-right');

    if (mediaCarousel && btnMediaLeft && btnMediaRight) {
        const mediaScrollAmount = 370; // Chiều rộng thẻ + gap
        btnMediaRight.addEventListener('click', () => mediaCarousel.scrollBy({ left: mediaScrollAmount, behavior: 'smooth' }));
        btnMediaLeft.addEventListener('click', () => mediaCarousel.scrollBy({ left: -mediaScrollAmount, behavior: 'smooth' }));
    }

    // 2. Logic cho Modal xem Video/Ảnh
    const mediaCards = document.querySelectorAll('.media-card');
    const modal = document.getElementById('mediaModal');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close-modal');

    if (modal) {
        mediaCards.forEach(card => {
            card.addEventListener('click', () => {
                const type = card.getAttribute('data-type');
                const src = card.getAttribute('data-src');
                
                // Hiển thị Modal
                modal.classList.add('active');

                // Nạp nội dung tương ứng vào Modal
                if (type === 'video') {
                    // Thêm tham số ?autoplay=1 để tự động phát video khi mở modal
                    modalBody.innerHTML = `<iframe src="${src}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
                } else if (type === 'image') {
                    modalBody.innerHTML = `<img src="${src}" alt="Zoomed Image">`;
                }
            });
        });

        // Hàm đóng Modal
        const closeMediaModal = () => {
            modal.classList.remove('active');
            // CỰC KỲ QUAN TRỌNG: Làm rỗng modalBody để tắt tiếng video YouTube khi đóng
            setTimeout(() => { modalBody.innerHTML = ''; }, 300); 
        };

        // Đóng khi bấm nút X
        closeModal.addEventListener('click', closeMediaModal);

        // Đóng khi click ra vùng đen bên ngoài nội dung
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeMediaModal();
            }
        });
    }
});