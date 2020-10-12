import React from 'react';

const ProjectIntroduction = () => {
  return (
    <div className="site-section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="heading-39101 mb-5">
              <span className="backdrop">VHCM</span>
              <span className="subtitle-39191">Khám phá</span>
              <h1>Câu chuyện của chúng tôi</h1>
            </div>
            <p>
              Chủ tịch Hồ Chí Minh là tượng trưng cho tinh hoa của dân tộc, cho
              ý chí kiên cường, bất khuất của nhân dân Việt Nam Anh hùng. Người
              đã hiến dâng trọn đời cho sự nghiệp cách mạng của Đảng và dân tộc
              ta, hết lòng, hết sức phụng sự Tổ quốc, phục vụ nhân dân. Tư tưởng
              Hồ Chí Minh, thời đại Hồ Chí Minh, tấm gương đạo đức và phong cách
              Hồ Chí Minh sáng mãi trong lòng người dân Việt Nam, là di sản hết
              sức quý báu cho các thế hệ muôn đời sau.
            </p>
            <p>
              Với tất cả niềm kính yêu và mãi mãi ghi nhớ công ơn Người, chúng
              tôi muốn xây dựng một hệ thống Chatbot với bộ dữ liệu thu thập từ
              website <a href="http://hochiminh.vn">hochiminh.vn</a> để đưa hình
              ảnh Bác đến gần hơn với nhân dân Việt Nam.
            </p>
            <p>
              Do hạn chế về mặt nguồn lực, nhóm mới chỉ có khả năng dựng máy chủ
              nhỏ, và phục vụ cho một đối tượng nhỏ công chúng, bước đầu là
              những người có hiểu biết về lãnh tụ Hồ Chính Minh, tương tác với
              hệ thống để đánh giá, góp ý xây dựng hoàn thiện hệ thống, cũng như
              cung cấp các mẫu câu hỏi và dữ liệu chính xác để training cho hệ
              thống.
            </p>
          </div>
          <div className="col-md-6" style={{ display: 'grid' }}>
            <img alt="Bác Hồ" className="img-project-introduction" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectIntroduction;
