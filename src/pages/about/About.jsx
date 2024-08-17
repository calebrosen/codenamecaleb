import React from 'react';

const AboutMe = () => {
  return (
    <div className="about-container">
      <div className="profile-picture">
        <img src="/path/to/your/profile.jpg" alt="Profile Picture" />
      </div>
      <div className="about-content">
        <h1 className="about-me">Hey there! I'm Caleb.</h1>
        <p>
          I’m a full-stack developer who loves turning ideas into real things. I'm constantly adding new things as I think of them, so, look around. Stay a while. Or don't. I don't care.
        </p>
        <p>
          By the way, you can view the entire source code of this website <a href='https://github.com/calebrosen/codenamecaleb' target='_blank'>here</a>, if you're interested. Or don't. Like I said, I don't care.
        </p>
      </div>
    </div>
  );
};

export default AboutMe;
