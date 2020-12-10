import React, { Fragment } from 'react';
import { memberQuotes } from 'src/modules/home/index';
import avatarMale from 'src/static/images/img_avatar.png';
import avatarFemale from 'src/static/images/img_avatar_female.png';

const ProjectMember = () => {
  return (
    <div className="site-section h-100 p-4">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-10">
            <div className="heading-39101 mb-5">
              <span className="backdrop text-center">VHCM</span>
              <span className="subtitle-39191">Thành viên</span>
              <h1>Dự án</h1>
            </div>
          </div>
        </div>

        <div className="owl-carousel slide-one-item">
          <div className="row">
            {memberQuotes.map((member, index) => {
              return index <= 2 ? (
                <div className="col-md-4" key={index + member.member}>
                  <div className="testimonial-39191 d-flex">
                    <div className="col-md-3">
                      <img
                        alt="avatar"
                        src={
                          member.avatar === 'avatar-male'
                            ? avatarMale
                            : avatarFemale
                        }
                        className={`img-fluid-avatar ${member.avatar}`}
                      />
                    </div>
                    <div className="col-md-9">
                      <div>
                        <blockquote className="dancing-script">
                          &ldquo;{member.quote}&rdquo;
                        </blockquote>
                        <p>{member.member}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Fragment key={index}></Fragment>
              );
            })}
          </div>
          <div className="row">
            {memberQuotes.map((member, index) => {
              return index > 2 ? (
                <div className="col-md-4" key={index + member.member}>
                  <div className="testimonial-39191 d-flex">
                    <div className="col-md-3">
                      <img
                        alt="avatar"
                        src={
                          member.avatar === 'avatar-male'
                            ? avatarMale
                            : avatarFemale
                        }
                        className={`img-fluid-avatar ${member.avatar}`}
                      />
                    </div>
                    <div className="col-md-9">
                      <div>
                        <blockquote className="dancing-script">
                          &ldquo;{member.quote}&rdquo;
                        </blockquote>
                        <p>{member.member}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Fragment key={index}></Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMember;
