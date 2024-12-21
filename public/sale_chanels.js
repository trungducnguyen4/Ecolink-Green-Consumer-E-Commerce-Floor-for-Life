
document.addEventListener('DOMContentLoaded', function() {
    const orderRows = document.querySelectorAll('.order-table-body-item');
    const statusFilters = {
        'all-orders': 'Tất cả',
        'pending-orders': 'Chờ xác nhận',
        'ready-to-ship-orders': 'Chờ lấy hàng',
        'shipping-orders': 'Đang giao',
        'delivered-orders': 'Đã giao',
        'returned-orders': 'Trả hàng/Hoàn tiền/Hủy'
    };

    function filterOrders(status) {
        orderRows.forEach(row => {
            const orderStatus = row.querySelector('.order-table-body-item-status').textContent.trim();
            if (status === 'Tất cả' || orderStatus === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.header-text-right-sale').forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            document.querySelectorAll('.header-text-right-sale').forEach(item => item.classList.remove('header-active'));
            // Add active class to the clicked filter
            this.classList.add('header-active');
            // Filter orders based on the selected status
            const filterId = this.id;
            const status = statusFilters[filterId];
            filterOrders(status);
        });
    });

    // Initial filter to show all orders
    filterOrders('Tất cả');
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch delivery methods from the server
    function loadDeliveryMethods() {
        fetch('/delivery-methods')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const deliveryMethodSelect = document.getElementById('delivery-method-select');
                    data.methods.forEach(method => {
                        const option = document.createElement('option');
                        option.value = method.MaPTVC;
                        option.textContent = method.TenPTVC;
                        deliveryMethodSelect.appendChild(option);
                    });
                } else {
                    console.error('Failed to load delivery methods:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching delivery methods:', error);
            });
    }

    // Apply filter based on selected delivery method
    document.getElementById('apply-filter-btn').addEventListener('click', function() {
        const selectedMethod = document.getElementById('delivery-method-select').value;
        fetch(`/filter-orders?deliveryMethod=${selectedMethod}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const orderSectionBody = document.getElementById('order-section-body');
                    orderSectionBody.innerHTML = ''; // Clear existing orders
                    data.orders.forEach(order => {
                        const row = document.createElement('div');
                        row.classList.add('order-table-body-item', 'row');
                        row.innerHTML = `
                            <div class="order-table-body-item-product col-lg-3">
                                <img class="order-table-body-item-product-img" src="/product_image/${order.HinhChinh}" alt="${order.TenSP}">
                                <div class="order-table-body-item-product-infor">
                                    <div class="order-table-body-item-product-name">${order.TenSP}</div>
                                    <div class="order-table-body-item-product-type">150 ml</div>
                                </div>
                                <div class="order-table-body-item-product-quantity-frame">
                                    <div class="order-table-body-item-product-quantity-lb">x</div>
                                    <div class="order-table-body-item-product-quantity">${order.SoLuongSP}</div>
                                </div>
                            </div>
                            <div class="order-table-body-item-order col-lg-2">${order.MaDH}</div>
                            <div class="order-table-body-item-status col-lg-2">${order.TrangThai}</div>
                            <div class="order-table-body-item-quantity col-lg-2">${order.SoLuongSP}</div>
                            <div class="order-table-body-item-shipping col-lg-2">${order.TenPTVC}</div>
                            <div class="order-table-body-item-update col-lg-1">
                                <button class="btn-update-order" data-order-id="${order.MaDH}">Cập nhật</button>
                            </div>
                        `;
                        orderSectionBody.appendChild(row);
                    });

                    // Re-attach event listeners for update buttons
                    document.querySelectorAll('.btn-update-order').forEach(button => {
                        button.addEventListener('click', function() {
                            const orderId = this.dataset.orderId;
                            const statusOptions = ['Chờ xác nhận', 'Chờ lấy hàng', 'Đang giao', 'Đã giao', 'Trả hàng/ Hoàn tiền/ Hủy'];
                            const select = document.createElement('select');
                            select.classList.add('form-control');
                            statusOptions.forEach(status => {
                                const option = document.createElement('option');
                                option.value = status;
                                option.textContent = status;
                                select.appendChild(option);
                            });

                            Swal.fire({
                                title: 'Cập nhật trạng thái đơn hàng',
                                html: select.outerHTML,
                                showCancelButton: true,
                                confirmButtonText: 'Cập nhật',
                                cancelButtonText: 'Hủy',
                                preConfirm: () => {
                                    const selectedStatus = Swal.getPopup().querySelector('select').value;
                                    return { orderId, selectedStatus };
                                }
                            }).then(result => {
                                if (result.isConfirmed) {
                                    const { orderId, selectedStatus } = result.value;
                                    fetch('/update-order-status', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ orderId, selectedStatus }),
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Cập nhật thành công!',
                                                text: 'Trạng thái đơn hàng đã được cập nhật.',
                                                timer: 2000,
                                                timerProgressBar: true,
                                                showConfirmButton: false,
                                                didClose: () => {
                                                    location.reload(); // Reload the page to reflect changes
                                                }
                                            });
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Cập nhật thất bại!',
                                                text: data.message,
                                                timer: 3000,
                                                timerProgressBar: true,
                                                showConfirmButton: false
                                            });
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Lỗi hệ thống!',
                                            text: `Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng: ${error.message}`,
                                            timer: 3000,
                                            timerProgressBar: true,
                                            showConfirmButton: false
                                        });
                                    });
                                }
                            });
                        });
                    });
                } else {
                    console.error('Failed to filter orders:', data.message);
                }
            })
            .catch(error => {
                console.error('Error filtering orders:', error);
            });
    });

    // Reset filter
    document.getElementById('reset-filter-btn').addEventListener('click', function() {
        document.getElementById('delivery-method-select').value = '0';
        loadOrders(); // Reload all orders
    });

    // Load initial data
    loadDeliveryMethods();
    loadOrders();

    // Function to load all orders
    function loadOrders() {
        fetch('/orders')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const orderSectionBody = document.getElementById('order-section-body');
                    orderSectionBody.innerHTML = ''; // Clear existing orders
                    data.orders.forEach(order => {
                        const row = document.createElement('div');
                        row.classList.add('order-table-body-item', 'row');
                        row.innerHTML = `
                            <div class="order-table-body-item-product col-lg-3">
                                <img class="order-table-body-item-product-img" src="/product_image/${order.HinhChinh}" alt="${order.TenSP}">
                                <div class="order-table-body-item-product-infor">
                                    <div class="order-table-body-item-product-name">${order.TenSP}</div>
                                    <div class="order-table-body-item-product-type">150 ml</div>
                                </div>
                                <div class="order-table-body-item-product-quantity-frame">
                                    <div class="order-table-body-item-product-quantity-lb">x</div>
                                    <div class="order-table-body-item-product-quantity">${order.SoLuongSP}</div>
                                </div>
                            </div>
                            <div class="order-table-body-item-order col-lg-2">${order.MaDH}</div>
                            <div class="order-table-body-item-status col-lg-2">${order.TrangThai}</div>
                            <div class="order-table-body-item-quantity col-lg-2">${order.SoLuongSP}</div>
                            <div class="order-table-body-item-shipping col-lg-2">${order.TenPTVC}</div>
                            <div class="order-table-body-item-update col-lg-1">
                                <button class="btn-update-order" data-order-id="${order.MaDH}">Cập nhật</button>
                            </div>
                        `;
                        orderSectionBody.appendChild(row);
                    });

                    // Re-attach event listeners for update buttons
                    document.querySelectorAll('.btn-update-order').forEach(button => {
                        button.addEventListener('click', function() {
                            const orderId = this.dataset.orderId;
                            const statusOptions = ['Chờ xác nhận', 'Chờ lấy hàng', 'Đang giao', 'Đã giao', 'Trả hàng/ Hoàn tiền/ Hủy'];
                            const select = document.createElement('select');
                            select.classList.add('form-control');
                            statusOptions.forEach(status => {
                                const option = document.createElement('option');
                                option.value = status;
                                option.textContent = status;
                                select.appendChild(option);
                            });

                            Swal.fire({
                                title: 'Cập nhật trạng thái đơn hàng',
                                html: select.outerHTML,
                                showCancelButton: true,
                                confirmButtonText: 'Cập nhật',
                                cancelButtonText: 'Hủy',
                                preConfirm: () => {
                                    const selectedStatus = Swal.getPopup().querySelector('select').value;
                                    return { orderId, selectedStatus };
                                }
                            }).then(result => {
                                if (result.isConfirmed) {
                                    const { orderId, selectedStatus } = result.value;
                                    fetch('/update-order-status', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ orderId, selectedStatus }),
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            Swal.fire({
                                                icon: 'success',
                                                title: 'Cập nhật thành công!',
                                                text: 'Trạng thái đơn hàng đã được cập nhật.',
                                                timer: 2000,
                                                timerProgressBar: true,
                                                showConfirmButton: false,
                                                didClose: () => {
                                                    location.reload(); // Reload the page to reflect changes
                                                }
                                            });
                                        } else {
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Cập nhật thất bại!',
                                                text: data.message,
                                                timer: 3000,
                                                timerProgressBar: true,
                                                showConfirmButton: false
                                            });
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Lỗi hệ thống!',
                                            text: `Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng: ${error.message}`,
                                            timer: 3000,
                                            timerProgressBar: true,
                                            showConfirmButton: false
                                        });
                                    });
                                }
                            });
                        });
                    });
                } else {
                    console.error('Failed to load orders:', data.message);
                }
            })
            .catch(error => {
                console.error('Error loading orders:', error);
            });
    }

    // Toggle product section visibility
    document.getElementById('all-products-btn').addEventListener('click', function() {
        const productSection = document.getElementById('product-section');
        const orderSection = document.getElementById('order-section');
        const orderSectionBody = document.getElementById('order-section-body');
        const filterSection = document.getElementById('filter-section');
        const orderNumberSection = document.getElementById('order-number-section');
        if (productSection.style.display === 'none' || !productSection.style.display) {
            productSection.style.display = 'block';
            orderSection.style.display = 'none';
            orderSectionBody.style.display = 'none';
            filterSection.style.display = 'none';
            orderNumberSection.style.display = 'none';
            loadProducts(); // Load products when the section is shown
        } else {
            productSection.style.display = 'none';
            orderSection.style.display = 'block';
            orderSectionBody.style.display = 'block';
            filterSection.style.display = 'block';
            orderNumberSection.style.display = 'block';
        }
    });

    // Function to load products
    function loadProducts() {
        fetch('/seller-products')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const productTableBody = document.getElementById('product-table-body');
                    productTableBody.innerHTML = ''; // Clear existing products
                    data.products.forEach(product => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>
                                <img class="product-table-body-item-product-img" src="/product_image/${product.HinhChinh}" alt="${product.TenSP}">
                                <div class="product-table-body-item-product-infor">
                                    <div class="product-table-body-item-product-name">${product.TenSP}</div>
                                </div>
                            </td>
                            <td><span class="editable" data-field="SoLuongTon">${product.SoLuongTon}</span></td>
                            <td><span class="editable" data-field="DGBanMacDinh">${product.DGBanMacDinh}</span></td>
                            <td><span class="editable" data-field="MoTa">${product.MoTa}</span></td>
                            <td>
                                <button class="btn-edit" data-id="${product.MaSP}">Edit</button>
                                <button class="btn-save" data-id="${product.MaSP}" style="display: none;">Save</button>
                            </td>
                        `;
                        productTableBody.appendChild(row);
                    });

                    // Add event listeners for edit and save buttons
                    document.querySelectorAll('.btn-edit').forEach(button => {
                        button.addEventListener('click', function() {
                            const row = this.closest('tr');
                            row.querySelectorAll('.editable').forEach(span => {
                                const input = document.createElement('input');
                                input.type = 'text';
                                input.value = span.textContent;
                                input.dataset.field = span.dataset.field;
                                input.classList.add('editable-input');
                                span.replaceWith(input);
                            });
                            this.style.display = 'none';
                            row.querySelector('.btn-save').style.display = 'inline-block';
                        });
                    });

                    document.querySelectorAll('.btn-save').forEach(button => {
                        button.addEventListener('click', function() {
                            const row = this.closest('tr');
                            const productId = this.dataset.id;
                            const updatedData = {};
                            row.querySelectorAll('input').forEach(input => {
                                updatedData[input.dataset.field] = input.value;
                            });

                            fetch(`/update-product/${productId}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(updatedData),
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    row.querySelectorAll('input').forEach(input => {
                                        const span = document.createElement('span');
                                        span.classList.add('editable');
                                        span.dataset.field = input.dataset.field;
                                        span.textContent = input.value;
                                        input.replaceWith(span);
                                    });
                                    this.style.display = 'none';
                                    row.querySelector('.btn-edit').style.display = 'inline-block';
                                } else {
                                    console.error('Failed to update product:', data.message);
                                }
                            })
                            .catch(error => {
                                console.error('Error updating product:', error);
                            });
                        });
                    });
                } else {
                    console.error('Failed to load products:', data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const orderRows = document.querySelectorAll('.order-table-body-item');
    const statusFilters = {
        'all-orders': 'Tất cả',
        'pending-orders': 'Chờ xác nhận',
        'ready-to-ship-orders': 'Chờ lấy hàng',
        'shipping-orders': 'Đang giao',
        'delivered-orders': 'Đã giao',
        'returned-orders': 'Trả hàng/Hoàn tiền/Hủy'
    };

    function filterOrders(status) {
        orderRows.forEach(row => {
            const orderStatus = row.querySelector('.order-table-body-item-status').textContent.trim();
            if (status === 'Tất cả' || orderStatus === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.header-text-right-sale').forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            document.querySelectorAll('.header-text-right-sale').forEach(item => item.classList.remove('header-active'));
            // Add active class to the clicked filter
            this.classList.add('header-active');
            // Filter orders based on the selected status
            const filterId = this.id;
            const status = statusFilters[filterId];
            filterOrders(status);
        });
    });

    // Initial filter to show all orders
    filterOrders('Tất cả');
});
