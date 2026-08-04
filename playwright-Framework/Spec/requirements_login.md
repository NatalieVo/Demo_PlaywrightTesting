# Tài Liệu Yêu Cầu (Requirements Document)
## Module: Đăng Nhập (Login) — Perfex CRM Admin

- **Hệ thống:** Perfex CRM (Anh Tester Demo)
- **URL khảo sát:** https://crm.anhtester.com/admin/authentication
- **Ngày phân tích:** 03/08/2026
- **Phương pháp khảo sát:** Truy xuất trực tiếp HTML/DOM thực tế của trang (qua HTTP request) và thực hiện các request POST thử nghiệm (submit rỗng, sai định dạng email, sai mật khẩu, đăng nhập đúng) để ghi nhận chính xác các thông báo lỗi/luồng xử lý thật của hệ thống.
- **Lưu ý về công cụ:** Trong phiên làm việc này KHÔNG có sẵn Playwright MCP (browser tool) để mở trình duyệt thật (headed, 1920x1080). Toàn bộ dữ liệu trong tài liệu này được trích xuất từ HTML response thực tế của server (không suy đoán). Khuyến nghị: trước khi code automation, nên mở lại trang bằng trình duyệt thật (theo đúng flow `navigate → resize(1920x1080) → wait_for → snapshot`) để xác nhận lại locator trên giao diện trực quan trước khi hiện thực hoá.

---

## 1. Tổng Quan (Overview)

Trang **Đăng nhập (Login)** là điểm truy cập vào khu vực quản trị (Admin) của hệ thống Perfex CRM. Người dùng (Admin/Staff) nhập **Email** và **Mật khẩu** để xác thực và truy cập Dashboard quản trị. Trang hỗ trợ tuỳ chọn **"Remember me"** để duy trì phiên đăng nhập, và cung cấp liên kết **"Forgot Password?"** để khôi phục mật khẩu khi cần.

Trang sử dụng cơ chế bảo vệ **CSRF token** (trường ẩn `csrf_token_name`, sinh mới sau mỗi lần tải trang/submit).

---

## 2. Yêu Cầu Chức Năng (Functional Requirements)

### 2.1. Chức năng: Đăng nhập (Login)

- **Mô tả:** Là một người dùng quản trị (Admin/Staff), tôi muốn đăng nhập bằng Email và Mật khẩu để có thể truy cập vào khu vực quản trị của hệ thống.
- **Tiêu chí chấp nhận (Acceptance Criteria):**
  - AC1: Khi nhập đúng Email và Mật khẩu hợp lệ, hệ thống chuyển hướng (HTTP 303 redirect) đến trang Dashboard quản trị (`/admin/`).
  - AC2: Khi để trống trường Email, hệ thống hiển thị thông báo lỗi **"The Email Address field is required."** và không cho đăng nhập.
  - AC3: Khi để trống trường Password, hệ thống hiển thị thông báo lỗi **"The Password field is required."** và không cho đăng nhập.
  - AC4: Khi nhập Email sai định dạng (không chứa `@` hợp lệ), hệ thống hiển thị thông báo **"The Email Address field must contain a valid email address."**
  - AC5: Khi nhập đúng định dạng nhưng sai Email hoặc sai Mật khẩu, hệ thống hiển thị thông báo chung **"Invalid email or password"** (không tiết lộ cụ thể trường nào sai — tránh dò tài khoản).
  - AC6: Người dùng có thể chọn checkbox **"Remember me"** trước khi submit (tuỳ chọn, không bắt buộc).
  - AC7: Người dùng có thể nhấn liên kết **"Forgot Password?"** để chuyển sang trang khôi phục mật khẩu.

### 2.2. Chức năng: Quên mật khẩu (Forgot Password) — liên quan

- **Mô tả:** Là người dùng quên mật khẩu, tôi muốn nhập Email để nhận hướng dẫn khôi phục mật khẩu.
- **Tiêu chí chấp nhận:**
  - AC1: Trang `/admin/authentication/forgot_password` hiển thị form nhập Email và nút **"Confirm"**.
  - Ghi chú: Tài liệu này chỉ khảo sát ở mức bề mặt (field tồn tại); chi tiết validation/luồng email khôi phục nằm ngoài phạm vi module Login, cần khảo sát riêng nếu cần automation cho luồng này.

---

## 3. Đặc Tả Trường Dữ Liệu (Field Specifications)

| Tên Trường (Label) | Locator thực tế (id / name) | Loại UI | Bắt buộc | Validation Rules quan sát được | Ghi chú |
|---|---|---|---|---|---|
| Email Address | `id="email"`, `name="email"` | `<input type="email">` | Có | - Không được để trống → *"The Email Address field is required."*<br>- Phải đúng định dạng email → *"The Email Address field must contain a valid email address."* | Có `autofocus="1"` — tự động focus khi tải trang. Không có thuộc tính `maxlength`/`pattern` trong HTML. |
| Password | `id="password"`, `name="password"` | `<input type="password">` | Có | - Không được để trống → *"The Password field is required."* | Không có thuộc tính `maxlength`/`minlength` trong HTML. Validation độ mạnh mật khẩu (nếu có) chỉ áp dụng phía server khi xác thực, không thấy ràng buộc client-side. |
| Remember me | `id="remember"`, `name="remember"` | `<input type="checkbox">` | Không | Không có ràng buộc | Thuộc tính `value="estimate"` — có vẻ là giá trị mặc định sinh ra từ template dùng chung, không phản ánh nghiệp vụ (cần hỏi PO nếu cần xác nhận). |
| Login (nút submit) | `class="btn btn-primary btn-block"`, `type="submit"` | `<button>` | — | — | Không có `id`/`data-testid` riêng; nên định vị bằng `getByRole('button', { name: 'Login' })`. |
| Forgot Password? (link) | `href="/admin/authentication/forgot_password"` | `<a>` | — | — | Không có `id`/`data-testid`; định vị bằng `getByRole('link', { name: 'Forgot Password?' })`. |
| CSRF Token | `name="csrf_token_name"` (hidden input) | `<input type="hidden">` | — | Giá trị đổi mới mỗi lần tải/submit trang | Automation cần lấy giá trị động nếu test ở tầng HTTP; ở tầng UI (Playwright) không cần xử lý thủ công vì browser tự gửi kèm form. |

---

## 4. Luồng Xử Lý & Báo Lỗi (Business Rules & Validations)

### 4.1. Luồng đăng nhập thành công (Happy Path)
1. Người dùng truy cập `https://crm.anhtester.com/admin/authentication`.
2. Nhập Email hợp lệ đã đăng ký + Mật khẩu đúng.
3. (Tuỳ chọn) Tick "Remember me".
4. Nhấn nút **Login**.
5. Hệ thống trả về `HTTP 303 See Other`, chuyển hướng đến `https://crm.anhtester.com/admin/` (Dashboard).

*Đã xác minh thực tế với tài khoản `admin@example.com` / `123456` — đăng nhập thành công, redirect đúng như mô tả.*

### 4.2. Các thông báo lỗi đã xác nhận (verified qua HTTP response thực tế)

| Tình huống | Thông báo lỗi hiển thị |
|---|---|
| Bỏ trống Email | `The Email Address field is required.` |
| Bỏ trống Password | `The Password field is required.` |
| Email sai định dạng (vd: `notanemail`) | `The Email Address field must contain a valid email address.` |
| Email đúng định dạng nhưng sai Email hoặc sai Password | `Invalid email or password` |

- Các lỗi validate field rỗng/sai định dạng được render **ngay trong response của POST** (không redirect).
- Lỗi "Invalid email or password" được xử lý qua cơ chế **redirect (303) + flash message**: sau khi POST sai, server redirect về lại trang login, và thông báo lỗi chỉ xuất hiện sau khi trang được tải lại (GET) — automation cần đợi điều hướng hoàn tất trước khi assert thông báo lỗi này.

### 4.3. Quan sát khác (chưa được xác minh đầy đủ do giới hạn công cụ)

- Trong CSS của trang có tham chiếu đến class `.g-recaptcha` / `#rc-imageselect` (Google reCAPTCHA), nhưng **không xuất hiện trong DOM thực tế** khi khảo sát. Có thể tính năng này được bật/tắt tuỳ theo cấu hình hệ thống hoặc theo số lần đăng nhập sai liên tiếp (rate-limiting). **Chưa xác minh được** vì không muốn thực hiện brute-force nhiều lần trên hệ thống demo dùng chung.
- Chưa xác minh: có cơ chế khoá tài khoản (account lockout) sau N lần đăng nhập sai hay không.
- Chưa xác minh: session/cookie lifetime cụ thể khi tick "Remember me" so với không tick.
- Chưa kiểm tra giao diện trên các viewport khác ngoài việc đọc DOM tĩnh (khuyến nghị dùng Playwright MCP thật để chụp `snapshot`/`screenshot` ở `1920x1080` trước khi code automation).

---

## 5. Câu Hỏi / Làm Rõ Với PO-User

1. Giá trị `value="estimate"` trên checkbox "Remember me" có phải lỗi copy-paste từ module khác (module Estimate) trong Perfex CRM hay là chủ đích? Có ảnh hưởng đến logic test không?
2. Hệ thống có áp dụng giới hạn số lần đăng nhập sai (rate limit / captcha / khoá tài khoản tạm thời) không? Nếu có, ngưỡng là bao nhiêu lần?
3. Thời gian sống (session timeout) mặc định và khi bật "Remember me" là bao lâu?
4. Có yêu cầu độ phức tạp mật khẩu tối thiểu khi tạo tài khoản không (không thấy ràng buộc ở form Login vì đây là form xác thực, không phải form tạo mới)?

---

## 6. Phụ Lục — HTML Form Thực Tế (tham khảo cho automation)

```html
<form action="https://crm.anhtester.com/admin/authentication" method="post" accept-charset="utf-8">
  <input type="hidden" name="csrf_token_name" value="...">

  <div class="form-group">
    <label for="email" class="control-label">Email Address</label>
    <input type="email" id="email" name="email" class="form-control" autofocus="1">
  </div>

  <div class="form-group">
    <label for="password" class="control-label">Password</label>
    <input type="password" id="password" name="password" class="form-control">
  </div>

  <div class="form-group">
    <div class="checkbox checkbox-inline">
      <input type="checkbox" value="estimate" id="remember" name="remember">
      <label for="remember"> Remember me</label>
    </div>
  </div>

  <div class="form-group">
    <button type="submit" class="btn btn-primary btn-block">Login</button>
  </div>

  <div class="form-group">
    <a href="https://crm.anhtester.com/admin/authentication/forgot_password">Forgot Password?</a>
  </div>
</form>
```
