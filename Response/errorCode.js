const success = {
    status_code: "00000",
    message_th: "ทำรายการสำเร็จ",
    message_en: "Success",
};

const invalid_data = {
    status_code: "10001",
    message_th: "ข้อมูลไม่ครบถ้วน กรุณากรอกใหม่อีกครั้ง",
    message_en: "Invalid data",
};

const internal_server_error = {
    status_code: "71001",
    message_th: "ขออภัยในความไม่สะดวก ขณะนี้ระบบขัดข้อง กรุณาลองใหม่ภายหลัง",
    message_en: "Internal server error",
};

module.exports = {
    success,
    invalid_data,
    internal_server_error,
};
