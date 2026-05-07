# GPT Image Batch Studio (PC + Mobile)

Ứng dụng web UI chuyên nghiệp để nhập danh sách prompt dạng bảng và tạo ảnh hàng loạt bằng OpenAI Images API.

## Tính năng

- Giao diện responsive tối ưu cho PC/Mobile.
- Bảng prompt: thêm/xóa dòng, dán hàng loạt từ nhiều dòng text.
- Chạy batch và hiển thị trạng thái thành công/thất bại từng prompt.
- Xem trước và tải ảnh PNG sau khi tạo.

## Lưu ý quan trọng

- ChatGPT Plus **không** cấp API key để gọi API.
- Bạn cần API key từ OpenAI Platform (billing riêng).
- Model đang dùng: `gpt-image-1`.

## Chạy local

```bash
cd apps/gpt-image2-batch-generator
npm install
npm start
```

Mở `http://localhost:3000`.
