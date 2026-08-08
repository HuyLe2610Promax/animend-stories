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