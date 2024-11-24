        // Initialize AOS
        AOS.init({
            duration: 1000,           // Durasi default
            easing: 'ease-in-out',    // Efek easing
            once: false,              // Animasi akan diulang setiap scroll
            mirror: true,             // Efek mirror saat scroll up
            offset: 50,               // Offset trigger animasi
            anchorPlacement: 'center-bottom', // Posisi anchor
            disable: 'mobile'         // Nonaktifkan di mobile untuk performa
        });

        // Refresh AOS saat window load
        window.addEventListener('load', () => {
            AOS.refresh();
        });

        // Custom Cursor
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.custom-cursor');
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scroll');
            } else {
                navbar.classList.remove('navbar-scroll');
            }
        });

        // Menu Filter
        document.querySelectorAll('.menu-filters .btn').forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                document.querySelector('.menu-filters .active').classList.remove('active');
                button.classList.add('active');
                
                // Filter menu items
                document.querySelectorAll('.menu-item').forEach(item => {
                    if(filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Smooth scroll untuk menu link
        document.querySelector('a[href="#menuSection"]').addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#menuSection').scrollIntoView({
                behavior: 'smooth'
            });
        });

        // Pagination functionality
        const itemsPerPage = 6; // Jumlah item per halaman
        const menuItems = document.querySelectorAll('.menu-item');
        
        function showPage(pageNumber) {
            const start = (pageNumber - 1) * itemsPerPage;
            const end = start + itemsPerPage;

            menuItems.forEach((item, index) => {
                if (index >= start && index < end) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Update active page
            document.querySelectorAll('.page-link').forEach(link => {
                link.parentElement.classList.remove('active');
                if (link.getAttribute('data-page') == pageNumber) {
                    link.parentElement.classList.add('active');
                }
            });
        }

        // Add click event listeners to pagination
        document.querySelectorAll('.page-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageNumber = parseInt(e.target.getAttribute('data-page'));
                showPage(pageNumber);
            });
        });

        // Show first page by default
        showPage(1);

        // Modify existing menu filter code
        document.querySelectorAll('.menu-filters .btn').forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                document.querySelector('.menu-filters .active').classList.remove('active');
                button.classList.add('active');
                
                // Filter menu items
                if (filter === 'all') {
                    showPage(1); // Reset ke halaman 1 untuk tampilan 'Semua'
                    document.querySelector('.pagination').style.display = 'flex';
                } else {
                    document.querySelector('.pagination').style.display = 'none';
                    menuItems.forEach(item => {
                        if (item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });

        // Scroll Position Handler
        document.addEventListener('DOMContentLoaded', function() {
            let lastScrollPosition = 0;
            const menuSection = document.getElementById('menuSection');

            // Fungsi untuk menyimpan posisi scroll
            function saveScrollPosition() {
                lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            }

            // Fungsi untuk mengembalikan posisi scroll
            function restoreScrollPosition() {
                window.scrollTo({
                    top: lastScrollPosition,
                    behavior: 'instant' // Menggunakan 'instant' untuk mencegah animasi
                });
            }

            // Handler untuk pagination
            document.querySelector('.pagination').addEventListener('click', function(e) {
                if (e.target.classList.contains('page-link')) {
                    e.preventDefault();
                    saveScrollPosition();
                    
                    // Tunggu render selesai
                    setTimeout(() => {
                        restoreScrollPosition();
                    }, 0);
                }
            });

            // Handler untuk filter buttons
            document.querySelectorAll('.menu-filters .btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Scroll ke awal section untuk filter baru
                    menuSection.scrollIntoView({
                        behavior: 'instant'
                    });
                });
            });

            // Tambahkan ke handler pagination yang sudah ada
            function showPage(pageNumber) {
                saveScrollPosition();
                
                // Existing pagination logic
                const start = (pageNumber - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                
                menuItems.forEach((item, index) => {
                    item.style.display = (index >= start && index < end) ? 'block' : 'none';
                });

                // Update active state
                document.querySelectorAll('.page-link').forEach(link => {
                    link.parentElement.classList.toggle('active', 
                        link.getAttribute('data-page') == pageNumber);
                });

                // Restore scroll setelah konten diupdate
                setTimeout(restoreScrollPosition, 0);
            }
        });

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });