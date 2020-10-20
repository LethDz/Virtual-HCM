import React from 'react';
import { connect } from 'react-redux';
import {
  getHomeExamples,
  editHomeExample,
  Contact,
  Welcome,
  ProjectIntroduction,
  ProjectMember,
  anchorsList,
} from 'src/modules/home/index';
import ReactFullpage from '@fullpage/react-fullpage';
import 'src/static/stylesheets/home.css';

const Home = () => {
  return (
    <div className="site-wrap" id="home-section">
      <ReactFullpage
        anchors={anchorsList}
        navigation={true}
        navigationPosition={'right'}
        slidesNavigation={false}
        scrollingSpeed={700}
        render={() => {
          return (
            <ReactFullpage.Wrapper>
              <div className="section">
                <Welcome />
              </div>
              <div className="section">
                <ProjectIntroduction />
              </div>
              <div className="section">
                <ProjectMember />
              </div>
              <div className="section">
                <Contact />
              </div>
            </ReactFullpage.Wrapper>
          );
        }}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  text: getHomeExamples(state),
});

const mapDispatchToProps = (dispatch) => ({
  editHomeExample: (text) => dispatch(editHomeExample(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
