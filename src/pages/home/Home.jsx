import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faDiscord, faSteam } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { motion } from 'framer-motion';

const copyDiscUserNameToClipboard = () => {
        const textToCopy = "im.caleb";
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            Swal.fire({
              title: 'Copied username!',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false,
              toast: true,
              position: 'top-center',
              customClass: {
                popup: 'my-popup',
              },
            });
          })
          .catch(err => {
            console.error("Failed to copy text: ", err);
          });
      };

const HomePage = () => {
    return (
        <div className="homeContainer">
            <div className="homeGlitchText" title="codenamecaleb.com">
                codenamecaleb.com
            </div>

            <div className="iconContainer">
                <a href='https://www.x.com/calebisdead' target='_blank'>
                    <div id="x_twitter" className='homeIcon pointer' alt='X/Twitter'>
                        <FontAwesomeIcon icon={faXTwitter} />
                    </div>
                </a>
                <a onClick={copyDiscUserNameToClipboard}>
                    <div id="discord" className='homeIcon pointer' alt='Discord username'>
                        <FontAwesomeIcon icon={faDiscord} />
                    </div>
                </a>
                <a href='http://steamcommunity.com/profiles/76561198258977132' target="_blank">
                    <div id="steam" className='homeIcon pointer' alt='Steam Link'>
                        <FontAwesomeIcon icon={faSteam} />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default HomePage;
