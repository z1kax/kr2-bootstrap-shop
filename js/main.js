// Ждем загрузки HTML
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. ЛОГИКА ГОРИЗОНТАЛЬНОГО СВАЙПА (на главной)
  const wrapper = document.getElementById('swipeWrapper');
  if (wrapper) {
    wrapper.addEventListener('wheel', (evt) => {
      if (evt.deltaY !== 0) {
        evt.preventDefault();
        wrapper.scrollLeft += evt.deltaY;
      }
    }, { passive: false });
  }

  // 2. ЛОГИКА МОДАЛЬНОГО ОКНА В КАТАЛОГЕ
  const modalForm = document.getElementById('modal-order-form');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  const modalToastEl = document.getElementById('modalToast');
  const orderModalEl = document.getElementById('orderModal');

  if (modalSubmitBtn && modalForm && modalToastEl && orderModalEl) {
    modalSubmitBtn.addEventListener('click', () => {
      // Проверяем валидность полей (required)
      if (modalForm.checkValidity()) {
        // Показываем уведомление
        const toast = new bootstrap.Toast(modalToastEl);
        toast.show();
        
        // Закрываем модалку
        const modalInstance = bootstrap.Modal.getInstance(orderModalEl);
        modalInstance.hide();
        
        // Очищаем форму
        modalForm.reset();
      } else {
        // Если поля пустые, показываем стандартные подсказки браузера
        modalForm.reportValidity();
      }
    });
  }

  // 3. ЛОГИКА ОСНОВНОЙ ФОРМЫ ЗАЯВКИ (на странице order.html)
  const orderForm = document.getElementById('orderForm');
  const successToastEl = document.getElementById('successToast');

  if (orderForm && successToastEl) {
    orderForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Отменяем перезагрузку страницы
      
      if (this.checkValidity()) {
        const toast = new bootstrap.Toast(successToastEl);
        toast.show();
        this.reset(); // Очищаем форму
      } else {
        this.reportValidity();
      }
    });
  }
});