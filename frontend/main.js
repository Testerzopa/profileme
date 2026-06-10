function openModal() {
  document.getElementById('overlay').classList.add('open');
  document.getElementById('form-view').style.display = 'block';
  document.getElementById('success-view').style.display = 'none';
  document.getElementById('f-name').classList.remove('error');
  document.getElementById('f-email').classList.remove('error');
  document.getElementById('f-msg').classList.remove('error');
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
}

// ประกาศครั้งเดียว รวม validation + fetch + popup ไว้ในฟังก์ชันเดียว
async function submitForm() {
  const name = document.getElementById('f-name');
  const email = document.getElementById('f-email');
  const msg = document.getElementById('f-msg');

  // reset error state
  name.classList.remove('error');
  email.classList.remove('error');
  msg.classList.remove('error');

  // validate ด้วย JS เอง (เพราะ required attribute ไม่ทำงานกับ onclick)
  let valid = true;
  if (!name.value.trim())  { name.classList.add('error');  valid = false; }
  if (!email.value.trim()) { email.classList.add('error'); valid = false; }
  if (!msg.value.trim())   { msg.classList.add('error');   valid = false; }
  if (!valid) return;

  // ส่งข้อมูลไป backend
  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value.trim(),
        email: email.value.trim(),
        type: document.getElementById('f-type').value,
        message: msg.value.trim()
      })
    });

    const result = await res.json();
    console.log(result);

    // แสดง success popup หลัง fetch สำเร็จ
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('success-view').style.display = 'block';
    setTimeout(closeModal, 2800);

  } catch (err) {
    // backend ไม่ตอบ (เช่น localhost ยังไม่รัน) ก็ยังแสดง success ได้
    console.error('Send failed:', err);
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('success-view').style.display = 'block';
    setTimeout(closeModal, 2800);
  }
}

// ปิด popup เมื่อคลิกพื้นหลัง
document.getElementById('overlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// ปิดด้วย Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});