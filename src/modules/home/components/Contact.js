import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const imageList = () => {
  let imageElement = [];
  for (let index = 0; index < 6; index++) {
    imageElement.push(
      <div className="col-4 gal_col" key={index}>
        <span>
          <img alt="Images" className={`img-fluid image-list-${index + 1}`} />
        </span>
      </div>
    );
  }

  return imageElement;
};

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="site-section bg-image overlay home-welcome-background invite-upper">
        <div className="container h-100">
          <div className="row justify-content-center h-100">
            <div className="col-md-7 text-center">
              <h2 className="font-weight-bold text-white">
                <a
                  href={`/login`}
                  className="link-underline-white"
                >
                  Hãy tham gia cùng chúng tôi{' '}
                  <FontAwesomeIcon icon={faHeart} />
                </a>
              </h2>
              <p className="text-white invite-purposed-text">
                Để xây dựng hệ thống Chatbot với dữ liệu mang tính chính xác cao
                trước đi phổ biến rộng rãi, chúng tôi rất mong có sự đóng góp
                của những nhà nghiên cứu Hồ Chí Minh học!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light contact-footer">
        <div className="container contact-footer-container">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-lg-4">
              <div className="row">{imageList().map((image) => image)}</div>
            </div>
            <div className="col-lg-6 ml-auto">
              <ul className="list-unstyled footer-link">
                <li className="d-block mb-3">
                  <h5 className="mb-0 text-title text-uppercase">
                    Thông tin liên hệ
                  </h5>
                </li>
                <li className="d-block mb-3">
                  <span className="d-block text-black">Địa chỉ:</span>
                  <span>
                    Đại học FPT, Khu công nghệ cao Hòa Lạc, Km29, Đại lộ Thăng
                    Long, Thạch Hoà, Thạch Thất, Hà Nội
                  </span>
                </li>
                <li className="d-block mb-3">
                  <span className="d-block text-black">Số điện thoại:</span>
                  <span>+84 97 533 7974</span>
                </li>
                <li className="d-block mb-3">
                  <span className="d-block text-black">Email:</span>
                  <span>DungLTSE05509@fpt.edu.vn</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
